import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  InstancedMesh,
  LinearFilter,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  ShadowMaterial,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector3,
  VideoTexture,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// The notebook and phone of the projects section, drawn in code and driven by
// the scroll (FDD aparelhos-3d, ADR 0005). Plain Three.js, no React: the section
// component mounts it once the page is ready and disposes of it on the way out.

export type DeviceMedia = { computer: string | null; phone: string };

export type DevicesSceneOptions = {
  // Box the canvas fills. It sits inside the sticky stage.
  view: HTMLElement;
  // The whole section: its position on the page is the scroll timeline.
  section: HTMLElement;
  // The four text steps (title and three projects). Their positions on the
  // page are the scroll timeline.
  steps: HTMLElement[];
  media: readonly DeviceMedia[];
  paused: boolean;
  // Called once the first frame is on screen, so the stage can fade it in.
  onReady: () => void;
};

export type DevicesScene = {
  setPaused: (paused: boolean) => void;
  dispose: () => void;
};

type Screen = {
  video: HTMLVideoElement;
  texture: VideoTexture;
  aspect: number;
  fresh: boolean;
  tick: () => void;
  set: (src: string | null) => void;
  play: () => void;
  restart: () => void;
  pause: () => void;
  dispose: () => void;
};

const STEPS = 3;
// How long each text holds still, as a share of the screen: same as --hold.
const HOLD = 0.4;
const WIDE = "(min-aspect-ratio: 11/10)";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const bump = (a: number, m: number, b: number, x: number) =>
  smooth(a, m, x) * (1 - smooth(m, b, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function token(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// A flat rounded rectangle whose texture covers it edge to edge. `top` rounds
// the two upper corners separately, for the phone screen under the island.
function roundedRect(w: number, h: number, r: number, segments = 10, top = r) {
  const shape = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - top);
  shape.quadraticCurveTo(x + w, y + h, x + w - top, y + h);
  shape.lineTo(x + top, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - top);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geometry = new ShapeGeometry(shape, segments);
  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, (position.getX(i) + w / 2) / w, (position.getY(i) + h / 2) / h);
  }
  return geometry;
}

// A video drawn on a screen. The texture goes to the GPU only when the video
// has a new frame, not on every render, and has no mipmaps: rebuilding them
// for each HD frame was the main cost in the demo.
function videoScreen(aspect: number): Screen {
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.preload = "auto";

  // A VideoTexture, not a plain Texture: Three.js sizes a plain one from the
  // element's width attribute, which a video does not have, and it stays black.
  const texture = new VideoTexture(video);
  texture.colorSpace = SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;

  let src: string | null = null;
  let frameHandle = 0;
  const poll = typeof video.requestVideoFrameCallback !== "function";

  const screen: Screen = {
    video,
    texture,
    aspect,
    fresh: false,
    tick() {
      if (poll && video.readyState >= 2 && !video.paused) show();
    },
    set(next) {
      if (next === src) return;
      src = next;
      video.pause();
      if (next) video.src = next;
    },
    play() {
      if (!src) return;
      video.play().catch(() => {
        // Autoplay refused: the first frame stays on the screen.
      });
    },
    restart() {
      if (!src) return;
      video.currentTime = 0;
      screen.play();
    },
    pause() {
      video.pause();
    },
    dispose() {
      if (!poll) video.cancelVideoFrameCallback(frameHandle);
      video.removeEventListener("loadeddata", show);
      video.removeEventListener("seeked", show);
      video.removeEventListener("loadedmetadata", cover);
      video.pause();
      video.removeAttribute("src");
      video.load();
      texture.dispose();
    },
  };

  // Only a decoded frame goes to the GPU: uploading a video with no size yet
  // leaves the texture without storage, and it stays black.
  function show() {
    if (video.readyState < 2 || !video.videoWidth) return;
    texture.needsUpdate = true;
    screen.fresh = true;
  }

  // Crops the video to the screen's shape: sides on a wider video, the bottom
  // on a taller one, so the top of the page always shows.
  function cover() {
    const videoAspect = video.videoWidth / video.videoHeight;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    if (videoAspect > screen.aspect) {
      texture.repeat.x = screen.aspect / videoAspect;
      texture.offset.x = (1 - texture.repeat.x) / 2;
    } else {
      texture.repeat.y = videoAspect / screen.aspect;
      texture.offset.y = 1 - texture.repeat.y;
    }
  }

  if (!poll) {
    const onFrame = () => {
      show();
      frameHandle = video.requestVideoFrameCallback(onFrame);
    };
    frameHandle = video.requestVideoFrameCallback(onFrame);
  }
  // A paused video still needs its first frame, and any frame after a seek.
  video.addEventListener("loadeddata", show);
  video.addEventListener("seeked", show);
  video.addEventListener("loadedmetadata", cover);

  return screen;
}

// A soft round shadow under each device, cheaper than a tight shadow map.
function blobTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(0,0,0,0.45)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.18)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  return new CanvasTexture(canvas);
}

// Throws when the browser has no WebGL; the section then keeps its screenshots.
export function mountDevicesScene({
  view,
  section,
  steps,
  media,
  paused: startPaused,
  onReady,
}: DevicesSceneOptions): DevicesScene {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  // Native resolution, capped at 2x. If frames get slow, it steps down on its own.
  const maxRatio = Math.min(window.devicePixelRatio || 1, 2);
  let ratio = maxRatio;
  renderer.setPixelRatio(ratio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  // Redrawn only when something moved.
  renderer.shadowMap.autoUpdate = false;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = "absolute inset-0 block h-full w-full";
  view.append(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 200);
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(-3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -5,
    right: 5,
    top: 5,
    bottom: -5,
    near: 0.5,
    far: 25,
  });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 5;
  scene.add(key);

  const ground = new Mesh(
    new PlaneGeometry(40, 40),
    new ShadowMaterial({ opacity: 0.32 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // A rim of the accent colour behind the devices, which follows the theme.
  const rim = new DirectionalLight(new Color(token("--accent")), 2.2);
  rim.position.set(4, 2, -4);
  scene.add(rim);
  const onTheme = () => {
    rim.color.set(token("--accent"));
    renderer.shadowMap.needsUpdate = true;
  };
  const themeWatcher = new MutationObserver(onTheme);
  themeWatcher.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });

  /* ---------- materials ---------- */
  const aluminium = new MeshPhysicalMaterial({
    color: 0x8e9196,
    metalness: 1,
    roughness: 0.34,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  });
  const aluminiumDark = new MeshStandardMaterial({
    color: 0x2a2b2e,
    metalness: 0.6,
    roughness: 0.5,
  });
  const keyMaterial = new MeshStandardMaterial({
    color: 0x141416,
    metalness: 0.1,
    roughness: 0.65,
  });
  const glassBlack = new MeshPhysicalMaterial({
    color: 0x050506,
    metalness: 0,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
  const titanium = new MeshPhysicalMaterial({
    color: 0x3a3b40,
    metalness: 1,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  });
  const lens = new MeshPhysicalMaterial({
    color: 0x0a0c12,
    metalness: 0.2,
    roughness: 0.05,
    clearcoat: 1,
  });
  // Black with additive blending adds only the reflection: a glass sheen over the video.
  const sheen = new MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.06,
    metalness: 0,
    envMapIntensity: 0.55,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  /* ---------- notebook ---------- */
  const W = 3.2;
  const D = 2.15;
  const BASE = 0.085;
  const LID = 0.045;
  const laptop = new Group();
  const base = new Mesh(new RoundedBoxGeometry(W, BASE, D, 4, 0.04), aluminium);
  base.position.y = BASE / 2;
  laptop.add(base);

  const well = new Mesh(new PlaneGeometry(2.72, 1.02), aluminiumDark);
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, BASE + 0.0008, -0.42);
  laptop.add(well);

  const cols = 14;
  const rows = 6;
  const keyWidth = 0.165;
  const keyGap = 0.028;
  const keys = new InstancedMesh(
    new RoundedBoxGeometry(keyWidth, 0.02, keyWidth * 0.92, 2, 0.02),
    keyMaterial,
    cols * rows,
  );
  const matrix = new Matrix4();
  let keyIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x =
        -((cols - 1) * (keyWidth + keyGap)) / 2 + c * (keyWidth + keyGap);
      const z =
        -0.42 -
        ((rows - 1) * (keyWidth * 0.92 + keyGap)) / 2 +
        r * (keyWidth * 0.92 + keyGap);
      matrix.makeTranslation(x, BASE - 0.006, z);
      keys.setMatrixAt(keyIndex++, matrix);
    }
  }
  laptop.add(keys);

  const pad = new Mesh(
    new RoundedBoxGeometry(1.15, 0.006, 0.7, 2, 0.003),
    new MeshPhysicalMaterial({
      color: 0x9a9da2,
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 0.6,
    }),
  );
  pad.position.set(0, BASE - 0.001, 0.58);
  laptop.add(pad);

  const hinge = new Group();
  hinge.position.set(0, BASE + 0.009, -D / 2);
  laptop.add(hinge);
  const lid = new Mesh(new RoundedBoxGeometry(W, LID, D, 4, 0.02), aluminium);
  lid.position.set(0, LID / 2, D / 2);
  hinge.add(lid);
  const bezel = new Mesh(roundedRect(W - 0.06, D - 0.06, 0.05), glassBlack);
  bezel.rotation.x = Math.PI / 2;
  bezel.position.set(0, -0.0012, D / 2);
  hinge.add(bezel);

  // Same shape as the computer videos, 1920 x 1200.
  const SW = 2.96;
  const SH = SW / 1.6;
  const computerScreen = videoScreen(SW / SH);
  const computerMesh = new Mesh(
    new PlaneGeometry(SW, SH),
    new MeshBasicMaterial({ map: computerScreen.texture, toneMapped: false }),
  );
  computerMesh.rotation.x = Math.PI / 2;
  computerMesh.position.set(0, -0.0025, D / 2 + 0.06);
  hinge.add(computerMesh);
  const computerGlass = new Mesh(roundedRect(W - 0.06, D - 0.06, 0.05), sheen);
  computerGlass.rotation.x = Math.PI / 2;
  computerGlass.position.set(0, -0.0035, D / 2);
  hinge.add(computerGlass);
  const webcam = new Mesh(new CircleGeometry(0.018, 16), lens);
  webcam.rotation.x = Math.PI / 2;
  webcam.position.set(0, -0.003, D - 0.07);
  hinge.add(webcam);
  scene.add(laptop);

  /* ---------- phone ---------- */
  const PW = 0.86;
  const PH = 1.56;
  const PD = 0.08;
  // Drawn a bit larger than life, so its screen reads next to the notebook.
  const PS = 1.25;
  const phone = new Group();
  phone.rotation.order = "YXZ";
  const phoneInner = new Group();
  phoneInner.position.y = PH / 2;
  phone.add(phoneInner);
  phoneInner.add(
    new Mesh(new RoundedBoxGeometry(PW, PH, PD, 8, 0.11), titanium),
  );
  const front = new Mesh(roundedRect(PW - 0.024, PH - 0.024, 0.1), glassBlack);
  front.position.z = PD / 2 + 0.0005;
  phoneInner.add(front);

  // The phone videos are 9:16. The video fills the screen width, and a black
  // band on top holds the island.
  const CSW = PW - 0.06;
  const CSH = PH - 0.06;
  const VH = CSW / 0.5625;
  const BAND = CSH - VH;
  const phoneScreen = videoScreen(CSW / VH);
  const phoneMesh = new Mesh(
    roundedRect(CSW, VH, 0.085, 10, 0.012),
    new MeshBasicMaterial({ map: phoneScreen.texture, toneMapped: false }),
  );
  phoneMesh.position.set(0, -CSH / 2 + VH / 2, PD / 2 + 0.001);
  phoneInner.add(phoneMesh);
  const island = new Mesh(
    roundedRect(0.2, 0.056, 0.028),
    new MeshBasicMaterial({ color: 0x000000 }),
  );
  island.position.set(0, CSH / 2 - BAND / 2, PD / 2 + 0.0015);
  phoneInner.add(island);
  const phoneGlass = new Mesh(roundedRect(PW - 0.024, PH - 0.024, 0.1), sheen);
  phoneGlass.position.z = PD / 2 + 0.002;
  phoneInner.add(phoneGlass);
  const back = new Mesh(
    roundedRect(PW - 0.024, PH - 0.024, 0.1),
    new MeshPhysicalMaterial({
      color: 0x2c2d31,
      roughness: 0.45,
      metalness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.3,
    }),
  );
  back.rotation.y = Math.PI;
  back.position.z = -PD / 2 - 0.0005;
  phoneInner.add(back);
  const cameraBump = new Mesh(
    new RoundedBoxGeometry(0.3, 0.3, 0.025, 3, 0.06),
    titanium,
  );
  cameraBump.position.set(0.17, PH / 2 - 0.2, -PD / 2 - 0.01);
  phoneInner.add(cameraBump);
  for (const [x, y] of [
    [0.11, 0.06],
    [0.23, 0.06],
    [0.11, -0.06],
  ]) {
    const ring = new Mesh(
      new CylinderGeometry(0.058, 0.058, 0.03, 24),
      titanium,
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, PH / 2 - 0.2 + y, -PD / 2 - 0.03);
    phoneInner.add(ring);
    const glass = new Mesh(new CircleGeometry(0.044, 24), lens);
    glass.rotation.y = Math.PI;
    glass.position.set(x, PH / 2 - 0.2 + y, -PD / 2 - 0.0455);
    phoneInner.add(glass);
  }
  for (const [x, y, h] of [
    [PW / 2 + 0.004, 0.25, 0.22],
    [-PW / 2 - 0.004, 0.32, 0.09],
    [-PW / 2 - 0.004, 0.17, 0.14],
    [-PW / 2 - 0.004, 0.0, 0.14],
  ]) {
    const button = new Mesh(
      new RoundedBoxGeometry(0.012, h, 0.03, 2, 0.005),
      titanium,
    );
    button.position.set(x, y, 0);
    phoneInner.add(button);
  }
  scene.add(phone);

  for (const device of [laptop, phone]) {
    device.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = object.material !== sheen;
        object.receiveShadow = true;
      }
    });
  }

  const blob = blobTexture();
  const contactShadow = (w: number, d: number) => {
    const mesh = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        map: blob,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.set(w, d, 1);
    mesh.position.y = 0.002;
    scene.add(mesh);
    return mesh;
  };
  const laptopShadow = contactShadow(4.4, 3.2);
  const phoneShadow = contactShadow(1.3, 0.6);

  /* ---------- size ---------- */
  const wideQuery = matchMedia(WIDE);
  let wide = wideQuery.matches;
  let aspect = 1;
  function fit() {
    const w = view.clientWidth;
    const h = view.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    wide = wideQuery.matches;
    camera.updateProjectionMatrix();
  }
  const resizer = new ResizeObserver(fit);
  resizer.observe(view);
  fit();

  /* ---------- state ---------- */
  let paused = startPaused;
  let visible = false;
  // Each project's videos play only while its text is on screen, and start
  // over when it arrives.
  const windows = [
    [0.6, 1.47],
    [1.53, 2.47],
    [2.53, 3.01],
  ];
  let activeWindow = -1;
  const playScreens = () => {
    if (paused || !visible || activeWindow < 0) return;
    computerScreen.play();
    phoneScreen.play();
  };
  const pauseScreens = () => {
    computerScreen.pause();
    phoneScreen.pause();
  };

  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) playScreens();
    else pauseScreens();
  });
  visibility.observe(section);

  // The mouse tilts the devices a little. Touch does not, so a finger
  // scrolling the page never moves them sideways.
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // Scroll position as a step: 0 = title, 1 = first project at rest (its step
  // at the top of the screen, its text at its resting place), and so on. Each
  // text holds still for HOLD of a screen (CSS --hold), and the devices hold
  // with it; then both move on to the next one. Steps are measured, because a
  // long card makes its step taller than the screen.
  function progress() {
    const tops = steps.map((step) => step.getBoundingClientRect().top);
    if (tops[0] >= 0) return 0;
    const k = tops.findIndex((top, i) => i > 0 && top > 0) - 1;
    if (k < 0) return STEPS;
    const length = tops[k + 1] - tops[k];
    const scrolled = -tops[k];
    const hold = HOLD * (view.clientHeight || window.innerHeight);
    if (scrolled <= hold) return k;
    return k + (scrolled - hold) / Math.max(1, length - hold);
  }

  const perf = { sum: 0, count: 0, good: 0, start: performance.now() };
  const look = new Vector3();
  let s = progress();
  let time = 0;
  let last = performance.now();
  let lastRender = last;
  let project = -1;
  let frameNumber = 0;
  let frame = 0;
  let ready = false;

  function render(now: number) {
    frame = requestAnimationFrame(render);
    const elapsed = (now - last) / 1000;
    last = now;

    // Adaptive resolution: if the average frame is slower than about 50 fps,
    // draw fewer pixels. The first seconds are slow anyway, while shaders
    // compile and videos load, so they do not count.
    if (visible && elapsed < 0.25 && now - perf.start > 3000) {
      perf.sum += elapsed;
      perf.count++;
    }
    if (perf.count === 30) {
      const average = perf.sum / perf.count;
      if (average > 1 / 50 && ratio > 0.75) {
        ratio = Math.max(0.75, ratio - 0.25);
        perf.good = 0;
        renderer.setPixelRatio(ratio);
        fit();
      } else if (average < 1 / 58 && ratio < maxRatio && ++perf.good >= 3) {
        ratio = Math.min(maxRatio, ratio + 0.25);
        perf.good = 0;
        renderer.setPixelRatio(ratio);
        fit();
      }
      perf.sum = 0;
      perf.count = 0;
    }
    if (!visible && ready) return;

    frameNumber++;
    computerScreen.tick();
    phoneScreen.tick();
    const target = progress();
    const moving =
      Math.abs(target - s) > 0.0005 ||
      Math.abs(pointer.tx - pointer.x) > 0.002 ||
      Math.abs(pointer.ty - pointer.y) > 0.002;
    const fresh = computerScreen.fresh || phoneScreen.fresh;
    // Nothing scrolled and no new video frame: the idle sway only needs 30 fps.
    if (ready && !moving && !fresh && frameNumber % 2) return;
    computerScreen.fresh = false;
    phoneScreen.fresh = false;
    const step = Math.min((now - lastRender) / 1000, 0.05);
    lastRender = now;
    if (!paused) time += step;
    s += (target - s) * (1 - Math.exp(-step * 7));
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    // Shadows: redrawn while things move; during the sway, every third frame.
    renderer.shadowMap.needsUpdate =
      moving || frameNumber < 4 || (!paused && frameNumber % 3 === 0);

    // Which project is on the screens. Swaps happen while they face away.
    const current = s < 1.5 ? 0 : s < 2.5 ? 1 : 2;
    if (current !== project) {
      project = current;
      computerScreen.set(media[current]?.computer ?? null);
      phoneScreen.set(media[current]?.phone ?? null);
    }
    const win = windows.findIndex(([a, b]) => s >= a && s <= b);
    if (win !== activeWindow) {
      activeWindow = win;
      if (win >= 0 && !paused && visible) {
        computerScreen.restart();
        phoneScreen.restart();
      } else {
        pauseScreens();
      }
    }

    // Notebook lid: opens on arrival, nearly shuts between the first two
    // projects, and shuts for Crewz, which is phone only.
    const open =
      smooth(0.1, 0.85, s) *
      (1 - 0.88 * bump(1.1, 1.5, 1.9, s)) *
      (1 - smooth(2.05, 2.45, s));
    hinge.rotation.x = -open * 1.86;

    // Phone: lies flat, stands up, spins a full turn at each swap.
    const stand = smooth(0.2, 0.9, s);
    const spin = Math.PI * 2 * (smooth(1.1, 1.9, s) + smooth(2.1, 2.9, s));
    const crewz = smooth(2.25, 2.9, s);
    const side = lerp(1, -1, smooth(1.1, 1.9, s));
    const yaw =
      lerp(0.85, 0.32 * side, smooth(0, 1, s)) * (1 - crewz) + pointer.x * 0.12;

    laptop.position.set(lerp(-0.45, -1.6, crewz), 0, lerp(0, -2.4, crewz));
    laptop.rotation.y = yaw + crewz * 0.5;
    laptopShadow.position.set(laptop.position.x, 0.002, laptop.position.z);
    laptopShadow.rotation.z = laptop.rotation.y;

    const scale = lerp(1, 1.4, crewz) * PS;
    phone.position.set(
      lerp(wide ? 2.0 : 1.3, 0.2, crewz),
      (PD / 2) * scale * (1 - stand),
      lerp(wide ? 0.95 : 1.4, 1.2, crewz),
    );
    phone.scale.setScalar(scale);
    phone.rotation.set(
      lerp(-Math.PI / 2, 0, stand),
      yaw - 0.35 * (1 - crewz) + spin + Math.sin(time * 0.7) * 0.05,
      0,
    );
    phoneInner.position.y = PH / 2 + Math.sin(time * 0.9) * 0.015 * stand;
    const lie = (PH / 2) * scale * (1 - stand);
    const phoneYaw = phone.rotation.y;
    phoneShadow.position.set(
      phone.position.x - Math.sin(phoneYaw) * lie,
      0.002,
      phone.position.z - Math.cos(phoneYaw) * lie,
    );
    phoneShadow.scale.set(
      lerp(1.0, 1.4, stand) * scale,
      lerp(1.7, 0.55, stand) * scale,
      1,
    );
    phoneShadow.rotation.z = phoneYaw;

    // Camera: fits the scene, leaving the left for the text on a computer and
    // the bottom for the card on a phone.
    const tanH = Math.tan(MathUtils.degToRad(camera.fov / 2));
    let distance: number;
    let tx: number;
    let ty: number;
    if (wide) {
      distance = Math.max(2.9 / (tanH * aspect * 0.6), 2.0 / tanH);
      tx = 0.2 - tanH * distance * aspect * 0.32;
      ty = 0.75;
    } else {
      distance = Math.max(2.3 / (tanH * aspect), 1.9 / tanH);
      tx = -0.2;
      ty = 0.75 - tanH * distance * 0.3;
    }
    look.set(tx, ty, 0);
    camera.position.set(
      tx + pointer.x * 0.3,
      ty + distance * 0.32 - pointer.y * 0.2,
      distance,
    );
    camera.lookAt(look);

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady();
    }
  }
  frame = requestAnimationFrame(render);

  return {
    setPaused(next) {
      paused = next;
      if (paused) pauseScreens();
      else playScreens();
    },
    dispose() {
      cancelAnimationFrame(frame);
      themeWatcher.disconnect();
      resizer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
      computerScreen.dispose();
      phoneScreen.dispose();
      const materials = new Set<Material>();
      const geometries = new Set<BufferGeometry>();
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          geometries.add(object.geometry);
          for (const material of [object.material].flat())
            materials.add(material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      blob.dispose();
      environment.dispose();
      key.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
