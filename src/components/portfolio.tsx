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
function Led({ color = "var(--color-green)" }: { color?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-block h-2 w-2 shrink-0 rounded-[2px]" aria-hidden="true">
      <motion.span
        className="block h-full w-full rounded-[2px]"
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
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
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
        className="relative flex h-full items-center gap-4 will-change-transform"
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
    <section className="relative my-7 md:my-10" id="about" aria-label="Introduction">
      <div className="panel" style={{ margin: 0 }}>
        <div className="hero-stage">
          {/* name — word by word off the assembly line */}
          <motion.h1
            className="text-ink mb-3 text-[clamp(34px,6.2vw,68px)] leading-[1.04] tracking-[-1px] text-shadow-[0_2px_0_rgba(0,0,0,0.5),0_0_32px_rgba(94,182,99,0.25)]"
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
                className={i === words.length - 1 ? "text-green" : undefined}
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
            className="mb-5 font-mono text-[clamp(13px,2vw,18px)] uppercase tracking-[0.14em] text-amber"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0 : 0.5, ease: EASE }}
          >
            ▸ {profile.title}
          </motion.p>

          <motion.p
            className="mb-6 mt-0 max-w-[62ch] text-[#cfcaba]"
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
            className="mb-7 flex flex-wrap gap-2.5"
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
            className="flex flex-wrap gap-3"
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
    <div className="mb-3.5 last:mb-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-ink">{name}</span>
        <span className="font-mono text-[11px] text-muted whitespace-nowrap">
          {years} {years === 1 ? "yr" : "yrs"}
        </span>
      </div>
      <div className="relative h-3 overflow-hidden border-2 border-[#232223] bg-[#17151a] shadow-[inset_0_0_6px_rgba(0,0,0,0.6)]">
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
    <section className="relative my-7 md:my-10" id="skills" aria-label="Skills">
      <SectionHead index="01" label="skills" title="Production capacity" />
      <div className="md:flex">
        <div className="w-full md:w-1/2">
          <div className="panel">
            <h2>Core stack — years on the line</h2>
            <div className="panel-inset">
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
        <div className="w-full md:w-1/2 md:ml-3.5">
          <div className="panel">
            <h2>Tooling</h2>
            <div className="panel-inset">
              <Chain className="grid gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]" stagger={0.05}>
                {tools.map((t) => (
                  <Part key={t} className="text-center">
                    <span className="border border-[#3a3738] rounded-[2px] bg-black/30 px-1.75 py-0.5 font-mono text-[10.5px] tracking-[0.04em] text-muted whitespace-nowrap" style={{ display: "block" }}>
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
      <span
        className="absolute -left-[27px] top-3.5 h-3 w-3 rounded-full bg-green shadow-[0_0_10px_var(--color-machine-glow),inset_0_0_3px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      >
        <Led />
      </span>
      <p className="role-dates">{role.dates}</p>
      <h3>{role.company}</h3>
      <p className="role-role">{role.role}</p>
      {role.note && <p className="role-note">{role.note}</p>}
      {role.projects?.map((p) => (
        <div key={p.name} className="mb-2.5 last:mb-0">
          <span className="font-bold text-heading">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.name} ↗
              </a>
            ) : (
              p.name
            )}
          </span>
          <motion.div
            className="mt-1.5 flex flex-wrap gap-1.5"
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
                  className="border border-[#3a3738] rounded-[2px] bg-black/30 px-1.75 py-0.5 font-mono text-[10.5px] tracking-[0.04em] text-muted whitespace-nowrap"
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
    <section className="relative my-7 md:my-10" id="experience" aria-label="Experience">
      <SectionHead index="02" label="experience" title="Assembly line — recent output" />
      <div className="panel">
        <div className="panel-inset">
          <div className="relative pl-7">
            {/* the spine draws itself as the section enters view */}
            <motion.div
              className="absolute top-1 bottom-1 left-2 w-1 origin-top bg-[linear-gradient(180deg,var(--color-green)_0%,var(--color-amber)_55%,#5a5651_100%)] shadow-[0_0_12px_rgba(94,182,99,0.35)]"
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
        <div className="panel-inset">
          <h2>Earlier shifts — the archive</h2>
          <Chain className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]" stagger={0.08}>
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
    <section className="relative my-7 md:my-10" id="education" aria-label="Education">
      <SectionHead index="03" label="education" title="Foundry" />
      <div className="md:flex">
        {education.map((e, i) => (
          <div key={e.school} className={`w-full${i > 0 ? " md:ml-3.5" : ""} md:w-1/2`}>
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
    <section className="relative my-7 md:my-10" id="contact" aria-label="Contact">
      <SectionHead index="04" label="contact" title="Open a delivery route" />
      <div className="panel">
        <div className="panel-inset">
          <div className="flex flex-wrap items-center gap-3">
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
          <p className="mt-4 text-muted">
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
    <footer className="mx-auto w-[1200px] max-w-full px-4">
      <div className="panel flex p-2" style={{ margin: 0 }}>
        <nav className="footer-links" aria-label="Contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="mx-2 select-none text-[#ccc]">|</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span className="mx-2 select-none text-[#ccc]">|</span>
          <a href="#skills">Skills</a>
          <span className="mx-2 select-none text-[#ccc]">|</span>
          <a href="#experience">Experience</a>
          <span className="mx-2 select-none text-[#ccc]">|</span>
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
      <div className="w-full bg-black/50 p-4">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-baseline justify-center px-4 leading-[1.3] md:justify-between">
          <nav className="flex w-full flex-wrap items-baseline justify-center md:flex-nowrap md:w-auto md:justify-start" aria-label="Site sections">
            <Led />
            <a className="whitespace-nowrap" href="#about">About</a>
            <span className="mx-2 select-none text-[#ccc]">|</span>
            <a className="whitespace-nowrap" href="#skills">Skills</a>
            <span className="mx-2 select-none text-[#ccc]">|</span>
            <a className="whitespace-nowrap" href="#experience">Experience</a>
            <span className="mx-2 select-none text-[#ccc]">|</span>
            <a className="whitespace-nowrap" href="#education">Education</a>
            <span className="mx-2 select-none text-[#ccc]">|</span>
            <a className="whitespace-nowrap" href="#contact">Contact</a>
          </nav>
          <div className="flex w-full flex-wrap items-baseline justify-center md:flex-nowrap md:w-auto md:justify-start">
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--color-muted)" }}>
              BELT SPEED 100%
            </span>
          </div>
        </div>
      </div>

      {/* header — factorio-style wordmark + nav */}
      <header>
        <div className="mx-auto my-8 flex-wrap items-center gap-4 max-w-[1200px] px-4 lg:flex">
          <a className="header-logo" href="#about" style={{ width: "auto" }} aria-label="Home">
            <span className="wordmark">
              francis<span className="text-green">.declaro</span>
            </span>
          </a>
          <nav className="flex flex-wrap lg:ml-auto lg:justify-end" aria-label="Main">
            <a className="button my-0 mb-2 ml-1 mr-0" href="#experience">
              Experience
            </a>
            <a className="button my-0 mb-2 ml-1 mr-0" href="#skills">
              Skills
            </a>
            <a className="button-green my-0 mb-2 ml-1 mr-0" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-[1200px] max-w-full px-4">
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
