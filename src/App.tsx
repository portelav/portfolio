import { FormEvent, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiOpenai,
  SiOpenjdk,
  SiPython,
} from "react-icons/si";
import { navItems, profile, projects, skills, stats } from "./content";
import avatarLucas from "./assets/avatar-lucas.png";

type IconName = "github" | "linkedin" | "mail" | "phone" | "arrow" | "code" | "spark";

const iconPaths: Record<IconName, string[]> = {
  github: [
    "M9 19c-4.2 1.4-4.2-2-6-2.4",
    "M15 22v-3.9c0-1 .1-1.4-.5-2 2.7-.3 5.5-1.3 5.5-6A4.6 4.6 0 0 0 18.7 6c.1-.4.5-1.9-.1-3.8 0 0-1.1-.3-3.6 1.4a12.3 12.3 0 0 0-6 0C6.4 1.9 5.3 2.2 5.3 2.2c-.6 1.9-.2 3.4-.1 3.8A4.6 4.6 0 0 0 4 9.6c0 4.6 2.8 5.7 5.5 6-.4.4-.7 1-.7 1.9V22",
  ],
  linkedin: [
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z",
    "M2 9h4v12H2z",
    "M4 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  ],
  mail: [
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z",
    "m22 6-10 7L2 6",
  ],
  phone: [
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z",
  ],
  arrow: ["M5 12h14", "m13 5 7 7-7 7"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
  spark: ["M12 2v4", "M12 18v4", "M4.9 4.9l2.8 2.8", "M16.3 16.3l2.8 2.8", "M2 12h4", "M18 12h4", "M4.9 19.1l2.8-2.8", "M16.3 7.7l2.8-2.8"],
};

const skillIcons: Record<string, IconType> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  python: SiPython,
  java: SiOpenjdk,
  github: SiGithub,
  ai: SiOpenai,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      {iconPaths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

function SectionReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("Enviar pelo WhatsApp");
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });
  const heroY = useTransform(smoothProgress, [0, 0.35], [0, -90]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0.35]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const text = [
      "Olá Lucas, vi seu portfólio e gostaria de conversar.",
      name ? `Nome: ${name}` : "",
      email ? `Email: ${email}` : "",
      message ? `Mensagem: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const params = new URLSearchParams({ text });

    setFormStatus("Abrindo WhatsApp...");
    window.open(`https://wa.me/${profile.whatsappNumber}?${params.toString()}`, "_blank", "noreferrer");
    window.setTimeout(() => setFormStatus("Enviar pelo WhatsApp"), 1400);
  }

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />

      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <nav aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero section" id="inicio" aria-labelledby="hero-title">
        <motion.div
          className="hero__content"
          style={shouldReduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
        >
          <div className="hero__copy">
            <p className="eyebrow">
              <Icon name="spark" />
              {profile.role}
            </p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="hero__tagline">{profile.tagline}</p>
            <p className="hero__description">{profile.description}</p>
            <div className="hero__meta" aria-label="Formação e localização">
              <span>{profile.education}</span>
              <span>{profile.location}</span>
            </div>

            <div className="hero__actions" aria-label="Links principais">
              <a className="button button--primary" href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
                GitHub
              </a>
              {profile.linkedin ? (
                <a className="button button--secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Icon name="linkedin" />
                  LinkedIn
                </a>
              ) : null}
              <a className="button button--ghost" href="#contato">
                <Icon name="mail" />
                Contato
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-label="Avatar estilizado de Lucas Portela">
            <div className="avatar-card">
              <div className="avatar-card__glow" />
              <div className="avatar">
                <img src={avatarLucas} alt="Avatar ilustrado de Lucas Portela" />
                <span className="avatar__ring" />
              </div>
              <div className="floating-chip floating-chip--top">Full stack</div>
              <div className="floating-chip floating-chip--bottom">Software</div>
            </div>
          </div>
        </motion.div>

        <div className="stats-grid" aria-label="Resumo do portfólio">
          {stats.map((item) => (
            <div className="stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <SectionReveal className="section split-section" >
        <div className="section__label" id="sobre">Sobre mim</div>
        <div className="about-panel">
          <h2>Aprendizado contínuo aplicado em projetos reais.</h2>
          <p>{profile.about}</p>
          <p>{profile.aboutComplement}</p>
        </div>
      </SectionReveal>

      <section className="section" id="habilidades" aria-labelledby="skills-title">
        <SectionReveal className="section-heading">
          <p className="eyebrow">Stack em evolução</p>
          <h2 id="skills-title">Habilidades principais</h2>
          <p>
            Tecnologias usadas em estudos, projetos acadêmicos e experimentos pessoais de software.
          </p>
        </SectionReveal>

        <div className="skills-grid">
          {skills.map((skill) => {
            const SkillIcon = skillIcons[skill.icon];

            return (
              <SectionReveal className="skill-card" key={skill.name}>
                <div className="skill-card__top">
                  <span
                    className="skill-logo"
                    style={{ "--skill-color": skill.color } as React.CSSProperties}
                  >
                    <SkillIcon aria-hidden="true" />
                  </span>
                  <strong>{skill.name}</strong>
                </div>
                <p>{skill.detail}</p>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      <section className="section" id="projetos" aria-labelledby="projects-title">
        <SectionReveal className="section-heading">
          <p className="eyebrow">Trabalhos selecionados</p>
          <h2 id="projects-title">Projetos</h2>
          <p>
            Cards com mockups estilizados para destacar problema, tecnologia e apresentação visual.
          </p>
        </SectionReveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <SectionReveal className={`project-card project-card--${project.accent}`} key={project.title}>
              <div className="project-card__mockup">
                <div className="mockup-window">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mockup-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mockup-badge">0{index + 1}</div>
              </div>
              <div className="project-card__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                  Ver projeto
                  <Icon name="arrow" />
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contato" aria-labelledby="contact-title">
        <SectionReveal className="contact-panel">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 id="contact-title">Vamos conversar sobre tecnologia?</h2>
            <p>
              Para contatos acadêmicos, oportunidades ou feedback sobre projetos, preencha o
              formulário para montar uma mensagem no WhatsApp. Atualmente em {profile.location}.
            </p>
            <div className="contact-links">
              <div className="contact-card contact-card--static">
                <Icon name="mail" />
                <span>
                  <strong>Email</strong>
                  <span>{profile.email}</span>
                </span>
              </div>
              <a className="contact-card" href={`https://wa.me/${profile.whatsappNumber}`} target="_blank" rel="noreferrer">
                <Icon name="phone" />
                <span>
                  <strong>WhatsApp</strong>
                  <span>{profile.phone}</span>
                </span>
              </a>
              <a className="contact-card" href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
                <span>
                  <strong>GitHub</strong>
                  <span>portelav</span>
                </span>
              </a>
              {profile.linkedin ? (
                <a className="contact-card" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Icon name="linkedin" />
                  <span>
                    <strong>LinkedIn</strong>
                    <span>Perfil profissional</span>
                  </span>
                </a>
              ) : null}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Labels visíveis mantêm o formulário acessível e fácil de editar. */}
            <label>
              Nome
              <input name="name" type="text" placeholder="Seu nome" autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="seu@email.com" autoComplete="email" />
            </label>
            <label>
              Mensagem
              <textarea name="message" placeholder="Escreva sua mensagem" rows={4} />
            </label>
            <button className="button button--primary" type="submit">
              <Icon name="phone" />
              {formStatus}
            </button>
          </form>
        </SectionReveal>
      </section>
    </main>
  );
}
