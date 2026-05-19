import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { navItems, profile, projects, skills, stats } from "./content";

type IconName = "github" | "linkedin" | "mail" | "arrow" | "code" | "spark";

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
  arrow: ["M5 12h14", "m13 5 7 7-7 7"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6"],
  spark: ["M12 2v4", "M12 18v4", "M4.9 4.9l2.8 2.8", "M16.3 16.3l2.8 2.8", "M2 12h4", "M18 12h4", "M4.9 19.1l2.8-2.8", "M16.3 7.7l2.8-2.8"],
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
  const [formStatus, setFormStatus] = useState("Enviar mensagem");
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
  });
  const heroY = useTransform(smoothProgress, [0, 0.35], [0, -90]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0.35]);

  const mailto = useMemo(() => {
    const params = new URLSearchParams({
      subject: "Contato pelo portfolio",
      body: "Ola Lucas, vi seu portfolio e gostaria de conversar.",
    });

    return `mailto:${profile.email}?${params.toString()}`;
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("Abrindo email...");
    window.location.href = mailto;
    window.setTimeout(() => setFormStatus("Enviar mensagem"), 1400);
  }

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />

      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Voltar ao inicio">
          <span className="brand__mark">LP</span>
          <span>Lucas Portela</span>
        </a>

        <nav aria-label="Navegacao principal">
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
            <div className="hero__meta" aria-label="Formacao e localizacao">
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
                <span className="avatar__initials">LP</span>
                <span className="avatar__ring" />
              </div>
              <div className="floating-chip floating-chip--top">Front-end</div>
              <div className="floating-chip floating-chip--bottom">Software</div>
            </div>
          </div>
        </motion.div>

        <div className="stats-grid" aria-label="Resumo do portfolio">
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
          <h2>Aprendizado continuo aplicado em projetos reais.</h2>
          <p>{profile.about}</p>
          <p>{profile.aboutComplement}</p>
        </div>
      </SectionReveal>

      <section className="section" id="habilidades" aria-labelledby="skills-title">
        <SectionReveal className="section-heading">
          <p className="eyebrow">Stack em evolucao</p>
          <h2 id="skills-title">Habilidades principais</h2>
          <p>
            Tecnologias usadas em estudos, projetos academicos e experimentos pessoais de software.
          </p>
        </SectionReveal>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SectionReveal className="skill-card" key={skill.name}>
              <div className="skill-card__top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{skill.name}</strong>
              </div>
              <p>{skill.detail}</p>
              <div className="skill-meter" aria-label={`${skill.name}: ${skill.level}%`}>
                <span style={{ "--level": `${skill.level}%` } as React.CSSProperties} />
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="section" id="projetos" aria-labelledby="projects-title">
        <SectionReveal className="section-heading">
          <p className="eyebrow">Trabalhos selecionados</p>
          <h2 id="projects-title">Projetos</h2>
          <p>
            Cards com mockups estilizados para destacar problema, tecnologia e apresentacao visual.
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
                <a className="project-link" href={profile.github} target="_blank" rel="noreferrer">
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
              Para contatos academicos, oportunidades ou feedback sobre projetos, use os links
              abaixo ou envie uma mensagem pelo formulario. Atualmente em {profile.location}.
            </p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" />
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" />
                GitHub
              </a>
              {profile.linkedin ? (
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Icon name="linkedin" />
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Labels visiveis mantem o formulario acessivel e facil de editar. */}
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
              <Icon name="mail" />
              {formStatus}
            </button>
          </form>
        </SectionReveal>
      </section>
    </main>
  );
}
