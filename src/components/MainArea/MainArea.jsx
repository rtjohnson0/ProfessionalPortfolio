import React, { useState, useEffect, useRef, useCallback } from 'react';
import Wrapped, { WrappedCard } from '../Wrapped/Wrapped';

const PlayIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const HomeIcon   = () => <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const ExpIcon    = () => <svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.51 15.5 1 13 1c-1.35 0-2.7.45-3.71 1.29L8 3.45l-1.29-1.16A5.23 5.23 0 0 0 3 1C.5 1-2 2.51-2 4.64c0 .48.11.92.18 1.36H-2c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1h24c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/><path d="M13 3c1.38 0 3 .95 3 1.64 0 .72-.56 1.36-1 1.36H9c-.44 0-1-.64-1-1.36C8 3.95 9.62 3 11 3h2z"/></svg>;
const ProjIcon   = () => <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const ContactIcon= () => <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;

const MobileNav = ({ currentSection, onNavigate }) => {
  const items = [
    { label: 'Home',       icon: <HomeIcon />,    index: 0 },
    { label: 'Experience', icon: <ExpIcon />,     index: 1 },
    { label: 'Projects',   icon: <ProjIcon />,    index: 2 },
    { label: 'Contact',    icon: <ContactIcon />, index: 3 },
  ];

  return (
    <nav className="rj-mobile-nav" aria-label="Mobile navigation">
      {items.map(item => (
        <button
          key={item.label}
          className={`rj-mobile-nav__item${currentSection === item.index ? ' rj-mobile-nav__item--active' : ''}`}
          onClick={() => onNavigate(item.index)}
        >
          {item.icon}
          <span>{item.label}</span>
          {currentSection === item.index && <div className="rj-mobile-nav__dot" />}
        </button>
      ))}
    </nav>
  );
};
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" style={{width:20,height:20}}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:24,height:24}}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
);
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
);
const ForwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
);

const experiences = [
  {
    num: 1, icon: '🚀', emoji_bg: '#1a3d2e',
    name: 'Platform Engineer', company: 'Red Ventures', duration: 'Jun 2023 – Present',
    bullets: [
      'Designed and shipped a custom Terraform provider in Golang adopted company-wide by 50+ engineers — any developer can launch a fully configured project from their CLI without touching raw Terraform config.',
      'Wrote Golang and Bash automation to scan for and remove unused AWS resources on a recurring schedule, reducing monthly cloud spend by 10% and saving $3,000 to $8,000 per month with no manual intervention.',
      'Built and maintained Terraform modules across 5+ high-traffic production environments supporting ECS and Lambda workloads, cutting provisioning time by 15% and preventing deployment failures from config drift.',
      'Sole owner of infrastructure incident response for 2+ years — independently resolved 75+ incidents and cut average resolution time by 40% through systematic root cause analysis and Git-tracked runbook documentation.',
    ],
    tags: ['Terraform', 'Golang', 'AWS', 'Docker', 'GitHub Actions', 'Bash', 'Splunk'],
  },
  {
    num: 2, icon: '💻', emoji_bg: '#1a2040',
    name: 'Software Engineer', company: 'Red Ventures', duration: 'May 2022 – Jun 2023',
    bullets: [
      'Built C# services to ingest and process call center wrap-up data for ADT, persisting structured records to AWS RDS with explicit error handling, retry logic, and dead-letter queuing.',
      'Built automated pipelines to generate encrypted compliance reports pushed to ADT on a 4-hour cycle via secure file transfer, replacing a manual error-prone process.',
      'Built an AWS Lambda integrated with the Slack API giving business stakeholders real-time control over traffic routing between primary and secondary sites without engineer intervention.',
      'Contributed to frontend development in React and TypeScript, building seasonal promotional pages for high-traffic sales campaigns using the Cohesion design system.',
    ],
    tags: ['C# / .NET', 'AWS Lambda', 'RDS', 'React', 'TypeScript', 'Slack API'],
  },
  {
    num: 3, icon: '👨‍🏫', emoji_bg: '#2d1a10',
    name: 'Technical Instructor', company: 'Road to Hire', duration: 'Jan 2020 – Jun 2022',
    bullets: [
      'Taught and mentored 150+ aspiring engineers through an intensive backend curriculum. 85% of graduates secured roles at Duke Energy, Bank of America, and NASCAR.',
      'Designed project-based lessons spanning the full stack: HTML, CSS, JavaScript, React, Node.js, .NET, SQL, AWS, Git, and Bash — aligned to what companies actually interview for.',
      'Built personalized growth plans and ran mock interview sessions focused on technical problem solving and communicating engineering decisions under pressure.',
      'Led outreach programs and coding workshops at local high schools, building early pipelines into tech careers for students with no prior exposure to software engineering.',
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'SQL', 'AWS', 'Curriculum Design'],
  },
  {
    num: 4, icon: '🎨', emoji_bg: '#2d1a3d',
    name: 'Founder & Lead Developer', company: 'FinePoint Designs', duration: '2024 – Present',
    bullets: [
      'Founded and run a web design studio building custom websites for small businesses in Charlotte, NC.',
      'Built and shipped client sites for Better Lyfe Media Group and Blasian J Ink using React, SCSS, and GitHub Pages.',
      'Designed the full brand identity, component system, and marketing site from the ground up with SEO, Open Graph, and structured data.',
    ],
    tags: ['React', 'SCSS', 'GitHub Pages', 'SEO', 'Web Design'],
  },
];

const projects = [
  {
    icon: '🏀', bg: '#1a2535',
    name: 'Chicago Bulls Analytics',
    desc: 'End-to-end data pipeline pulling raw NBA API data into structured datasets. React dashboard with shot efficiency breakdowns, lineup scores, and game-by-game trend charts.',
    tag: 'Python · SQL · React',
  },
  {
    icon: '🚢', bg: '#1a3d2e',
    name: 'Nuvy Platform',
    desc: 'Live deployed app that automates personal project launches. Golang API, React frontend, GitHub Actions CI/CD. Takes a user-uploaded app and provisions the full AWS hosting stack via Terraform.',
    tag: 'Golang · AWS · Terraform',
  },
  {
    icon: '🏗️', bg: '#0f2a1a',
    name: 'Custom Terraform Provider',
    desc: 'Built in Golang. Company-wide standard at Red Ventures — 50+ engineers can launch a fully configured project from their CLI under the org namespace without touching raw Terraform config.',
    tag: 'Golang · Terraform',
  },
  {
    icon: '💰', bg: '#3d2a1a',
    name: 'Cloud Cost Optimizer',
    desc: 'Golang and Bash scripts that scan for unused AWS resources on a recurring schedule. Saved $3K to $8K per month with zero manual intervention.',
    tag: 'Golang · AWS · Bash',
  },
  {
    icon: '🎨', bg: '#2d1a3d',
    name: 'FinePoint Designs',
    desc: 'Full marketing site for a web design studio. Dark editorial design, Spotify-style components, full SEO stack, GitHub Pages deployment.',
    tag: 'React · SCSS',
    url: 'https://www.finepointdesigns.com',
  },
  {
    icon: '⚙️', bg: '#1a2d3d',
    name: 'CI/CD Framework',
    desc: 'Reusable GitHub Actions workflow templates used across multiple product squads at Red Ventures. Removed all manual release steps from the engineering workflow.',
    tag: 'GitHub Actions · Bash',
  },
];

const skills = [
  { icon: '🏗️', name: 'Terraform',       cert: 'Certified 2023' },
  { icon: '☁️', name: 'AWS',             cert: 'Certified 2023' },
  { icon: '🐳', name: 'Docker',          cert: null             },
  { icon: '🐹', name: 'Golang',          cert: null             },
  { icon: '⚙️', name: 'GitHub Actions',  cert: null             },
  { icon: '📜', name: 'Bash',            cert: null             },
  { icon: '🔷', name: 'C# / .NET',       cert: null             },
  { icon: '🐍', name: 'Python',          cert: null             },
  { icon: '⚛️', name: 'React',           cert: null             },
  { icon: '🔷', name: 'TypeScript',      cert: null             },
  { icon: '🗄️', name: 'SQL',            cert: null             },
  { icon: '🔐', name: 'IAM / Security',  cert: null             },
];

const contactLinks = [
  { icon: '📧', label: 'Email',    value: 'reggiejohnson1997@gmail.com',              href: 'mailto:reggiejohnson1997@gmail.com'                                    },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/reginald-johnson-jr',      href: 'https://www.linkedin.com/in/reginald-johnson-jr-9aa348120'             },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/FinePo-nt',                     href: 'https://github.com/FinePo-nt'                                          },
  { icon: '📍', label: 'Location', value: 'Charlotte, NC 28277 — open to relocate',  href: null                                                                    },
];

const MainArea = ({ onMainRef, currentSection, onHireMe, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openExp, setOpenExp] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [wrappedOpen, setWrappedOpen] = useState(false);
  const mainRef = useRef(null);

  // Expose ref to App.js for scroll tracking
  const setRef = useCallback((el) => {
    mainRef.current = el;
    onMainRef?.(el);
  }, [onMainRef]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://formspree.io/f/xjgnkypd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          company: form.company,
          message: form.message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else console.error('Formspree error:', await res.text());
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <>
    {wrappedOpen && <Wrapped onClose={() => setWrappedOpen(false)} />}
    <main className="rj-main" ref={setRef}>
      {/* Topbar */}
      <div className={`rj-topbar${scrolled ? ' rj-topbar--scrolled' : ''}`}>
        <div className="rj-topbar__arrows">
          <div className="rj-topbar__arrow"><BackIcon /></div>
          <div className="rj-topbar__arrow"><ForwardIcon /></div>
        </div>
        <div className="rj-topbar__right">
          <button className="rj-topbar__open-btn" onClick={onHireMe}>Hire me</button>
          <div className="rj-topbar__avatar" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={`${process.env.PUBLIC_URL}/img/profilePicture.jpeg`} alt="RJ" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        </div>
      </div>

      {/* Hero / Artist header */}
      <div className="rj-hero" id="home">
        <div className="rj-hero__gradient" />
        <div className="rj-hero__inner">
          <div className="rj-hero__avatar" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/profilePicture.jpeg`}
              alt="Reggie Johnson"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <div className="rj-hero__info">
            <div className="rj-hero__verified">
              <CheckIcon /> Verified Engineer
            </div>
            <h1 className="rj-hero__name">Reggie Johnson</h1>
            <p className="rj-hero__role">Platform &amp; DevOps Engineer · Charlotte, NC · Open to relocate</p>
          </div>
        </div>
      </div>

      {/* Hero actions */}
      <div className="rj-hero-actions">
        <button className="rj-hero-actions__play" onClick={onHireMe}>
          <PlayIcon />
        </button>
        <a href="/resume.pdf" download className="rj-hero-actions__follow">Download Resume</a>
        <button className="rj-hero-actions__more"><MoreIcon /></button>
      </div>

      {/* Wrapped card entry point */}
      <WrappedCard onOpen={() => setWrappedOpen(true)} />

      {/* Experience — "Popular tracks" */}
      <section className="rj-section" id="experience">
        <div className="rj-section__header">
          <h2 className="rj-section__title">Experience</h2>
          <span className="rj-section__see-all">4+ years</span>
        </div>
        <div className="rj-tracks">
          {experiences.map((exp) => (
            <div key={exp.num}>
              <div
                className="rj-track"
                onClick={() => setOpenExp(openExp === exp.num ? null : exp.num)}
              >
                <span className="rj-track__num">{exp.num}</span>
                <div className="rj-track__play"><PlayIcon /></div>
                <div className="rj-track__info">
                  <div className="rj-track__img" style={{ background: exp.emoji_bg }}>{exp.icon}</div>
                  <div className="rj-track__text">
                    <p className="rj-track__name">{exp.name}</p>
                    <p className="rj-track__company">{exp.company}</p>
                  </div>
                </div>
                <span className="rj-track__duration">{exp.duration}</span>
              </div>
              {openExp === exp.num && (
                <div style={{ padding: '12px 16px 16px 68px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, margin: '0 0 4px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, display: 'flex', gap: 10 }}>
                        <span style={{ color: '#1DB954', flexShrink: 0 }}>▸</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 700, color: '#1DB954', background: 'rgba(29,185,84,0.12)', borderRadius: 20, padding: '3px 10px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects — card grid */}
      <section className="rj-section" id="projects">
        <div className="rj-section__header">
          <h2 className="rj-section__title">Projects</h2>
          <span className="rj-section__see-all">See all</span>
        </div>
        <div className="rj-card-grid">
          {projects.map((p) => (
            <div className="rj-card" key={p.name}>
              <div className="rj-card__img" style={{ background: p.bg }}>
                {p.icon}
                <div className="rj-card__play"><PlayIcon /></div>
              </div>
              <p className="rj-card__name">{p.name}</p>
              <p className="rj-card__desc">{p.desc}</p>
              <span className="rj-card__tag">{p.tag}</span>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 11, fontWeight: 700, color: '#1DB954', marginTop: 10,
                }}>
                  Live site →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="rj-section">
        <div className="rj-section__header">
          <h2 className="rj-section__title">Skills &amp; Tools</h2>
        </div>
        <div className="rj-skill-chips">
          {skills.map((s) => (
            <div className="rj-skill-chip" key={s.name}>
              <span className="rj-skill-chip__icon">{s.icon}</span>
              {s.name}
              {s.cert && <span className="rj-skill-chip__cert">{s.cert}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* About the artist */}
      <section className="rj-section">
        <div className="rj-section__header">
          <h2 className="rj-section__title">About the engineer</h2>
        </div>
        <div style={{
          borderRadius: 10,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1a3d2e 0%, #181818 100%)',
          position: 'relative',
        }}>
          {/* Header image area */}
          <div style={{
            height: 260,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/weddingPhoto.jpg`}
              alt="Reggie Johnson"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
              }}
            />
            {/* Dark gradient overlay so text below reads cleanly */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
              background: 'linear-gradient(transparent, #181818)',
            }} />
            {/* "About the engineer" label overlaid on photo */}
            <div style={{
              position: 'absolute', bottom: 16, left: 24,
              fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.02em',
            }}>
              About the engineer
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '20px 24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={`${process.env.PUBLIC_URL}/img/profilePicture.jpeg`} alt="Reggie Johnson" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Reginald Johnson</span>
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="12" fill="#3D8FF5"/>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff" transform="scale(0.7) translate(5,5)"/>
                  </svg>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <span style={{ color: '#1DB954', fontWeight: 600 }}>75+</span> incidents resolved &nbsp;·&nbsp;
                  <span style={{ color: '#1DB954', fontWeight: 600 }}>150+</span> students taught &nbsp;·&nbsp;
                  <span style={{ color: '#1DB954', fontWeight: 600 }}>4+</span> years experience
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/reginald-johnson-jr-9aa348120"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 22px',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  display: 'inline-block',
                  transition: 'border-color 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
              >
                Connect
              </a>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', marginBottom: 20, maxWidth: 600 }}>
              Platform Engineer with 4+ years building the infrastructure and tooling that engineering teams depend on.
              Started my career teaching 150+ engineers how to code, and that experience shaped how I approach platform
              work: I build for the engineer on the other side. At Red Ventures I designed a custom Terraform provider
              adopted company-wide by 50+ engineers, automated $3,000 to $8,000 per month in cloud savings through
              Golang and Bash scripting, and served as sole owner of infrastructure incident response for 2+ years.
              Core stack: Terraform, Golang, AWS, Docker, and GitHub Actions.
            </p>

            {/* Cert badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: '🏗️', name: 'HashiCorp Terraform Associate', org: 'HashiCorp · 2023', bg: '#1a2535' },
                { icon: '☁️', name: 'AWS Solutions Architect Associate', org: 'Amazon · 2023', bg: '#3d2a1a' },
              ].map(cert => (
                <div key={cert.name} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#282828', borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 6, background: cert.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{cert.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{cert.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{cert.org}</div>
                    <div style={{
                      fontSize: 9, fontWeight: 700, color: '#1DB954',
                      background: 'rgba(29,185,84,0.12)', borderRadius: 20,
                      padding: '2px 7px', marginTop: 4, display: 'inline-block',
                    }}>Verified</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="rj-section" id="contact">
        <div className="rj-section__header">
          <h2 className="rj-section__title">Get in touch</h2>
        </div>
        <div className="rj-contact-grid" style={{ marginBottom: 20 }}>
          {contactLinks.map((l) => (
            <div key={l.label}>
              {l.href ? (
                <a href={l.href} className="rj-contact-link" target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <div className="rj-contact-link__icon">{l.icon}</div>
                  <div>
                    <p className="rj-contact-link__label">{l.label}</p>
                    <p className="rj-contact-link__value">{l.value}</p>
                  </div>
                  <span className="rj-contact-link__arrow">→</span>
                </a>
              ) : (
                <div className="rj-contact-link" style={{ cursor: 'default' }}>
                  <div className="rj-contact-link__icon">{l.icon}</div>
                  <div>
                    <p className="rj-contact-link__label">{l.label}</p>
                    <p className="rj-contact-link__value">{l.value}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="rj-contact-success">
            <div className="rj-contact-success__icon">✓</div>
            <p className="rj-contact-success__title">Message received.</p>
            <p className="rj-contact-success__body">Thanks for reaching out. I will get back to you within one business day.</p>
          </div>
        ) : (
          <form className="rj-contact-form" onSubmit={handleSubmit}>
            <p className="rj-contact-form__title">Send a message</p>
            <div className="rj-contact-form__row">
              <div className="rj-contact-form__field">
                <label>Name</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required />
              </div>
              <div className="rj-contact-form__field">
                <label>Email</label>
                <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} required />
              </div>
            </div>
            <div className="rj-contact-form__field">
              <label>Company</label>
              <input type="text" placeholder="Where do you work?" value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} />
            </div>
            <div className="rj-contact-form__field">
              <label>Message</label>
              <textarea placeholder="Tell me about the role or what you are building." value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} required />
            </div>
            <button type="submit" className="rj-contact-form__submit">Send message</button>
          </form>
        )}
      </section>
    </main>
    <MobileNav currentSection={currentSection} onNavigate={onNavigate} />
    </>
  );
};

export default MainArea;