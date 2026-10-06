"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import {
  profile,
  skills,
  tools,
  experience,
  archive,
  education,
  beltItems,
  type Role,
} from "@/src/data/resume";

/* ---------------------------------------------------------------------------
 * Motion vocabulary — the "production line" system
 * ------------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };

/** Scroll-triggered section reveal */
function Reveal({
  children,
  delay = 0,
  className,
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 8 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

const chainItem: Variants = {
  hidden: { opacity: 0, x: -44 },
  show: { opacity: 1, x: 0, transition: spring },
};

function Chain({
  children,
  className,
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? "show" : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Chain child: slides in off the belt */
function Part({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={chainItem}
      transition={{ ...spring, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/** Blinking machine status light */
function Led({ color = "var(--green)" }: { color?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="led" aria-hidden="true">
      <motion.span
        className="led-dot"
        style={{
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
        animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function SectionHead({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="kicker">
        <Led />
        {`sector ${index} // ${label}`}
      </div>
      <h2>{title}</h2>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------ */

function ConveyorBelt() {
  const reduced = useReducedMotion();
  const loop = [...beltItems, ...beltItems];
  return (
    <div className="belt" aria-hidden="true">
      <motion.div
        className="belt-track"
        initial={{ x: 0 }}
        animate={reduced ? { x: 0 } : { x: "-50%" }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 26, repeat: Infinity, ease: "linear" }
        }
      >
        {loop.map((word, i) => (
          <span key={i} className="belt-item">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const words = profile.name.split(" ");
  const chips = [
    { label: profile.location, href: undefined },
    { label: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: "linkedin ↗", href: profile.linkedin },
  ];

  return (
    <section className="section" id="about" aria-label="Introduction">
      <div className="panel" style={{ margin: 0 }}>
        <div className="hero-stage">
          {/* name — word by word off the assembly line */}
          <motion.h1
            className="hero-name"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.14 } },
            }}
          >
            {words.map((w, i) => (
              <motion.span
                key={w}
                className={i === words.length - 1 ? "accent" : undefined}
                style={{ marginRight: "0.28em", display: "inline-block" }}
                variants={{
                  hidden: { opacity: 0, y: reduced ? 8 : 34, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: reduced ? 0 : 0.7, ease: EASE },
                  },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-title"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0 : 0.5, ease: EASE }}
          >
            ▸ {profile.title}
          </motion.p>

          <motion.p
            className="hero-blurb"
            initial={{ opacity: 0, y: reduced ? 4 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.7, duration: reduced ? 0 : 0.6, ease: EASE }}
          >
            Eighteen years of shipping the web — from Photoshop-to-HTML in a
            Philippine agency in 2007 to leading React / Next.js front-ends in
            Singapore today. I build interfaces the way Factorio builds factories:
            small parts, chained together, running at full belt speed.
          </motion.p>

          {/* contact chips */}
          <motion.div
            className="hero-chips"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : 0.9 } },
            }}
          >
            {chips.map((c) => (
              <motion.span
                key={c.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  show: { opacity: 1, scale: 1, transition: spring },
                }}
              >
                {c.href ? (
                  <a className="chip" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {c.label}
                  </a>
                ) : (
                  <span className="chip">{c.label}</span>
                )}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: reduced ? 4 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 1.25, duration: reduced ? 0 : 0.55, ease: EASE }}
          >
            <a className="button-green" href="#experience">
              View experience
            </a>
            <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn profile
            </a>
          </motion.div>

          <ConveyorBelt />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Skills
 * ------------------------------------------------------------------------ */

function SkillRow({ name, years }: { name: string; years: number }) {
  const reduced = useReducedMotion();
  const pct = Math.max((years / profile.yearsTotal) * 100, 6);
  return (
    <div className="skill-row">
      <div className="skill-head">
        <span className="skill-name">{name}</span>
        <span className="skill-years">
          {years} {years === 1 ? "yr" : "yrs"}
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-fill"
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduced ? 0 : 1.1,
            ease: EASE,
          }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section className="section" id="skills" aria-label="Skills">
      <SectionHead index="01" label="skills" title="Production capacity" />
      <div className="panels2">
        <div>
          <div className="panel">
            <h2>Core stack — years on the line</h2>
            <div className="panel-inset p8">
              <Chain stagger={0.06}>
                {skills.map((s) => (
                  <Part key={s.name}>
                    <SkillRow {...s} />
                  </Part>
                ))}
              </Chain>
            </div>
          </div>
        </div>
        <div>
          <div className="panel">
            <h2>Tooling</h2>
            <div className="panel-inset p8">
              <Chain className="tools-grid" stagger={0.05}>
                {tools.map((t) => (
                  <Part key={t} className="text-center">
                    <span className="tag" style={{ display: "block" }}>
                      {t}
                    </span>
                  </Part>
                ))}
              </Chain>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Experience
 * ------------------------------------------------------------------------ */

function RoleCard({ role, delay = 0 }: { role: Role; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <Part className="role-card" delay={delay}>
      <span className="role-node" aria-hidden="true">
        <Led />
      </span>
      <p className="role-dates">{role.dates}</p>
      <h3>{role.company}</h3>
      <p className="role-role">{role.role}</p>
      {role.note && <p className="role-note">{role.note}</p>}
      {role.projects?.map((p) => (
        <div key={p.name} className="project">
          <span className="project-name">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.name} ↗
              </a>
            ) : (
              p.name
            )}
          </span>
          <motion.div
            className="tags"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduced ? 0 : 0.05, delayChildren: reduced ? 0 : 0.3 } },
              }}
            >
              {p.tags.map((t) => (
                <motion.span
                  key={t}
                  className="tag"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3, ease: EASE } },
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
        </div>
      ))}
    </Part>
  );
}

function ExperienceSection() {
  const reduced = useReducedMotion();
  return (
    <section className="section" id="experience" aria-label="Experience">
      <SectionHead index="02" label="experience" title="Assembly line — recent output" />
      <div className="panel">
        <div className="panel-inset p8">
          <div className="timeline">
            {/* the spine draws itself as the section enters view */}
            <motion.div
              className="timeline-line"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: reduced ? 0 : 1.4, ease: EASE }}
            />
            <Chain stagger={0}>
              {experience.map((r, i) => (
                <RoleCard key={`${r.company}-${r.dates}`} role={r} delay={reduced ? 0 : i * 0.15} />
              ))}
            </Chain>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-inset p8">
          <h2>Earlier shifts — the archive</h2>
          <Chain className="archive-grid" stagger={0.08}>
            {archive.map((r) => (
              <Part key={`${r.company}-${r.dates}`}>
                <div className="archive-row">
                  <p className="role-dates">{r.dates}</p>
                  <h3>{r.company}</h3>
                  <p className="role-role">{r.role}</p>
                  <p className="role-note">{r.blurb}</p>
                </div>
              </Part>
            ))}
          </Chain>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Education
 * ------------------------------------------------------------------------ */

function EducationSection() {
  return (
    <section className="section" id="education" aria-label="Education">
      <SectionHead index="03" label="education" title="Foundry" />
      <div className="panels2">
        {education.map((e, i) => (
          <div key={e.school}>
            <Part className="edu-card panel" delay={i * 0.12}>
              <p className="role-dates">{e.dates}</p>
              <h3>{e.school}</h3>
              <p className="role-role">{e.degree}</p>
            </Part>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Contact + footer
 * ------------------------------------------------------------------------ */

function ContactSection() {
  const reduced = useReducedMotion();
  return (
    <section className="section" id="contact" aria-label="Contact">
      <SectionHead index="04" label="contact" title="Open a delivery route" />
      <div className="panel">
        <div className="panel-inset p8">
          <div className="flex flex-wrap" style={{ gap: 12, alignItems: "center" }}>
            <motion.a
              className="button-green"
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0, x: reduced ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              {profile.email}
            </motion.a>
            <motion.a
              className="button"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: reduced ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15, ease: EASE }}
            >
              LinkedIn ↗
            </motion.a>
            <motion.a
              className="button"
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              initial={{ opacity: 0, x: reduced ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.3, ease: EASE }}
            >
              {profile.phone}
            </motion.a>
          </div>
          <p style={{ color: "var(--muted)", marginTop: 16, marginBottom: 0 }}>
            Singapore · open to lead / senior front-end roles — React, Next.js,
            TypeScript, and anything that moves like a production line.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const reduced = useReducedMotion();
  return (
    <footer className="footer">
      <div className="footer-inner panel" style={{ margin: 0 }}>
        <nav className="footer-links" aria-label="Contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="separator">|</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span className="separator">|</span>
          <a href="#skills">Skills</a>
          <span className="separator">|</span>
          <a href="#experience">Experience</a>
          <span className="separator">|</span>
          <a href="#education">Education</a>
        </nav>
        {/* the rocket, re-skinned as a production-line vent */}
        <div className="footer-rocket" aria-hidden="true">
          <motion.svg
            className="rocket"
            viewBox="0 0 78 120"
            animate={reduced ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M39 4c8 10 12 22 12 34v44H27V38c0-12 4-24 12-34z" fill="#5a5a5a" />
            <circle cx="39" cy="38" r="8" fill="#7dcaed" opacity="0.8" />
            <path d="M27 62 12 84v-20zM51 62l15 22V64z" fill="#8e8e8e" />
            <motion.path
              d="M33 82h12l-6 22z"
              fill="#ffa200"
              style={{ transformOrigin: "top" }}
              animate={reduced ? undefined : { opacity: [1, 0.4, 1], scaleY: [1, 1.25, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>
        <div className="footer-copyright">
          <span>
            Built on the factorio.com layout · {profile.name} ·{" "}
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------ */

export default function Portfolio() {
  return (
    <>
      {/* top bar — factory status readout */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <nav className="links" aria-label="Site sections">
            <Led />
            <a href="#about">About</a>
            <span className="separator">|</span>
            <a href="#skills">Skills</a>
            <span className="separator">|</span>
            <a href="#experience">Experience</a>
            <span className="separator">|</span>
            <a href="#education">Education</a>
            <span className="separator">|</span>
            <a href="#contact">Contact</a>
          </nav>
          <div className="links user-controls">
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)" }}>
              BELT SPEED 100%
            </span>
          </div>
        </div>
      </div>

      {/* header — factorio-style wordmark + nav */}
      <header>
        <div className="header-inner">
          <a className="header-logo" href="#about" style={{ width: "auto" }} aria-label="Home">
            <span className="wordmark">
              francis<span className="accent" style={{ color: "var(--green)" }}>.declaro</span>
            </span>
          </a>
          <nav className="header-links" aria-label="Main">
            <a className="button" href="#experience">
              Experience
            </a>
            <a className="button" href="#skills">
              Skills
            </a>
            <a className="button-green" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </nav>
        </div>
      </header>

      <main className="container">
        <Hero />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
