import React, { useState, useEffect, useCallback, useRef } from 'react';

const slides = [
  {
    id: 'intro',
    bg: ['#1a1a2e', '#16213e', '#0f3460'],
    accent: '#E94560',
    eyebrow: 'Your 2026',
    headline: 'It was a big year,\nReggie.',
    sub: 'Here\'s a look at the impact you made.',
    stat: null,
    emoji: '🎵',
  },
  {
    id: 'incidents',
    bg: ['#0d1b2a', '#1b2838', '#1a3a5c'],
    accent: '#1DB954',
    eyebrow: 'Top stat',
    headline: '75+',
    sub: 'incidents resolved solo at Red Ventures.\nThat\'s 40% faster than before you got there.',
    stat: { label: 'Avg resolution time improved', value: '40%', direction: 'faster' },
    emoji: '🔥',
  },
  {
    id: 'engineers',
    bg: ['#1a0a2e', '#2d1b69', '#1a1040'],
    accent: '#9b59b6',
    eyebrow: 'Your reach',
    headline: '50+',
    sub: 'engineers used the Terraform provider\nyou built from scratch.',
    stat: { label: 'Teams that adopted your code', value: '50+', direction: null },
    emoji: '🏗️',
  },
  {
    id: 'savings',
    bg: ['#1a2e0d', '#1e3a10', '#145214'],
    accent: '#1DB954',
    eyebrow: 'Cloud costs',
    headline: '$8K',
    sub: 'saved every month in AWS spend.\nRightsizing, reserved instances, tagging.',
    stat: { label: 'Monthly savings identified', value: '$3K–$8K', direction: null },
    emoji: '💰',
  },
  {
    id: 'students',
    bg: ['#2e1a0d', '#5c3317', '#3d2010'],
    accent: '#f39c12',
    eyebrow: 'As an instructor',
    headline: '150+',
    sub: 'students taught at Road to Hire.\n85% of them landed jobs.',
    stat: { label: 'Job placement rate', value: '85%', direction: null },
    emoji: '👨‍🏫',
  },
  {
    id: 'topskill',
    bg: ['#0a1628', '#0d1f3c', '#1a3a6b'],
    accent: '#3498db',
    eyebrow: 'Your top skill',
    headline: 'Terraform',
    sub: 'HashiCorp Certified. You\'ve been building\ninfrastructure as code since before it was cool.',
    stat: { label: 'Also certified in', value: 'AWS SAA', direction: null },
    emoji: '🏆',
  },
  {
    id: 'experience',
    bg: ['#1a0d2e', '#2d1654', '#1a0d40'],
    accent: '#e74c3c',
    eyebrow: 'Total experience',
    headline: '4+ years',
    sub: 'Platform engineering, teaching, and building\nyour own business. All at once.',
    stat: { label: 'Roles held', value: '3', direction: null },
    emoji: '⚡',
  },
  {
    id: 'outro',
    bg: ['#121212', '#1a1a1a', '#242424'],
    accent: '#1DB954',
    eyebrow: '2026 keeps going',
    headline: 'Ready to build\nsomething great.',
    sub: 'Open to full-time Platform / DevOps roles.\nLet\'s talk.',
    stat: null,
    emoji: '🚀',
    cta: true,
  },
];

const Wrapped = ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  // forward ref trick for useCallback
  const intervalRef2 = React.useRef(null);

  const goTo = useCallback((index, dir = 'next') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, 'next');
    else onClose?.();
  }, [current, goTo, onClose]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, 'prev');
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const tick = 80; // ms per tick
    const duration = 4000;
    let elapsed = 0;

    intervalRef2.current = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) {
        elapsed = 0;
        setCurrent(c => {
          if (c < slides.length - 1) return c + 1;
          onClose?.();
          return c;
        });
        setProgress(0);
      }
    }, tick);

    return () => clearInterval(intervalRef2.current);
  }, [current, paused, onClose]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'Escape')     onClose?.();
      if (e.key === ' ')          setPaused(p => !p);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, onClose]);

  const slide = slides[current];
  const bg = slide.bg;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: `linear-gradient(135deg, ${bg[0]} 0%, ${bg[1]} 50%, ${bg[2]} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.6s ease',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
      onClick={(e) => {
        // tap right half to advance, left half to go back
        const x = e.clientX / window.innerWidth;
        if (x > 0.5) next();
        else prev();
      }}
    >
      {/* Progress bars */}
      <div style={{
        display: 'flex',
        gap: 4,
        padding: '16px 20px 0',
        position: 'relative',
        zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.25)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              borderRadius: 2,
              background: '#fff',
              width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
              transition: i === current ? 'none' : 'width 0.3s',
            }} />
          </div>
        ))}
      </div>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        position: 'relative',
        zIndex: 2,
      }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#1DB954',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 900, color: '#000',
          }}>RJ</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Reggie Johnson</span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#000',
            background: '#1DB954', borderRadius: 20, padding: '2px 8px',
          }}>Wrapped</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setPaused(p => !p)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 20, cursor: 'pointer', padding: 4 }}
          >
            {paused ? '▶' : '⏸'}
          </button>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 22, cursor: 'pointer', padding: 4 }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main slide content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 48px 48px',
        opacity: animating ? 0 : 1,
        transform: animating
          ? `translateX(${direction === 'next' ? '-30px' : '30px'})`
          : 'translateX(0)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
        onClick={e => e.stopPropagation()}
      >
        {/* Big emoji */}
        <div style={{
          fontSize: 72,
          marginBottom: 24,
          filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))',
          lineHeight: 1,
        }}>
          {slide.emoji}
        </div>

        {/* Eyebrow */}
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: slide.accent,
          marginBottom: 16,
        }}>
          {slide.eyebrow}
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 'clamp(52px, 10vw, 96px)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          marginBottom: 24,
          whiteSpace: 'pre-line',
        }}>
          {slide.headline}
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 18,
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.70)',
          maxWidth: 480,
          whiteSpace: 'pre-line',
          marginBottom: slide.stat || slide.cta ? 36 : 0,
        }}>
          {slide.sub}
        </div>

        {/* Stat pill */}
        {slide.stat && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: `0.5px solid ${slide.accent}40`,
            borderRadius: 12,
            padding: '14px 20px',
            maxWidth: 320,
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              color: slide.accent,
              letterSpacing: '-0.02em',
            }}>
              {slide.stat.value}
            </div>
            <div style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.4,
            }}>
              {slide.stat.label}
              {slide.stat.direction && (
                <span style={{ color: slide.accent, marginLeft: 4 }}>
                  {slide.stat.direction}
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA on last slide */}
        {slide.cta && (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onClick={onClose}
              style={{
                background: '#1DB954',
                color: '#000',
                padding: '14px 32px',
                borderRadius: 20,
                fontSize: 15,
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              Get in touch
            </a>
            <a
              href="/resume.pdf"
              download
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 20,
                fontSize: 15,
                fontWeight: 700,
                border: '1.5px solid rgba(255,255,255,0.35)',
                display: 'inline-block',
              }}
            >
              Download resume
            </a>
          </div>
        )}
      </div>

      {/* Tap zones (invisible) */}
      <div style={{ position: 'absolute', inset: '80px 0 90px', display: 'flex', zIndex: 1 }}>
        <div style={{ flex: 1 }} onClick={prev} />
        <div style={{ flex: 1 }} onClick={next} />
      </div>

      {/* Bottom nav dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        padding: '0 0 24px',
        position: 'relative',
        zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i, i > current ? 'next' : 'prev'); }}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? '#1DB954' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s, background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// The entry point card shown in the main area
export const WrappedCard = ({ onOpen }) => (
  <div
    onClick={onOpen}
    style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      borderRadius: 8,
      padding: '20px 24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      transition: 'transform 0.2s, filter 0.2s',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 24px 8px',
    }}
    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.15)'}
    onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
  >
    {/* Background glow */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse at 80% 50%, rgba(229,57,70,0.2) 0%, transparent 60%)',
      pointerEvents: 'none',
    }} />

    <div style={{
      width: 56, height: 56, borderRadius: 8,
      background: 'linear-gradient(135deg, #E94560, #9b59b6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 28, flexShrink: 0,
      position: 'relative', zIndex: 1,
    }}>🎵</div>

    <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#E94560', marginBottom: 4,
      }}>Your year in review</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
        2026 Wrapped
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        75+ incidents · $8K saved · 150 students taught
      </div>
    </div>

    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: '#1DB954',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, position: 'relative', zIndex: 1,
      boxShadow: '0 4px 16px rgba(29,185,84,0.4)',
    }}>
      <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, marginLeft: 2 }}>
        <path d="M8 5v14l11-7z" fill="#000" />
      </svg>
    </div>
  </div>
);

export default Wrapped;