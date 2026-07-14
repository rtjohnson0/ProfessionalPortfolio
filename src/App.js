import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/main.scss';
import Sidebar  from './components/Sidebar/Sidebar';
import MainArea from './components/MainArea/MainArea';
import Player   from './components/Player/Player';

// All navigable sections in order
export const SECTIONS = [
  { id: 'home',       label: 'Reggie Johnson',       sub: 'Platform & DevOps Engineer', icon: '👤', color: '#1a3d2e' },
  { id: 'experience', label: 'Platform Engineer',     sub: 'Red Ventures · 2023–Present', icon: '🚀', color: '#1a3d2e' },
  { id: 'projects',   label: 'Projects',              sub: 'Things I have built',         icon: '🏗️', color: '#1a2d3d' },
  { id: 'contact',    label: 'Get in touch',          sub: 'Let\'s work together',        icon: '📧', color: '#2d1a3d' },
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress,  setScrollProgress]  = useState(0);
  const [shortcutsOpen,   setShortcutsOpen]   = useState(false);
  const mainRef = useRef(null);

  // Expose mainRef so MainArea can pass it up
  const handleMainRef = useCallback((el) => {
    mainRef.current = el;
  }, []);

  // Track scroll position and current section
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      setScrollProgress(total > 0 ? (scrollTop / total) * 100 : 0);

      // Detect which section is in view
      const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      let active = 0;
      sectionEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) active = i;
      });
      setCurrentSection(active);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Navigate to a section by index
  const goToSection = useCallback((index) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
    const el = document.getElementById(SECTIONS[clamped].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(clamped);
    }
  }, []);

  const goNext = useCallback(() => goToSection(currentSection + 1), [currentSection, goToSection]);
  const goPrev = useCallback(() => goToSection(currentSection - 1), [currentSection, goToSection]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      // Don't fire when typing in form fields
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': e.preventDefault(); goNext(); break;
        case 'ArrowLeft':  case 'ArrowUp':   e.preventDefault(); goPrev(); break;
        case 'h': case 'H': goToSection(0); break;
        case 'e': case 'E': goToSection(1); break;
        case 'p': case 'P': goToSection(2); break;
        case 'c': case 'C': goToSection(3); break;
        case '?':           setShortcutsOpen(o => !o); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, goToSection]);

  return (
    <div className="rj-shell">
      <Sidebar />
      <MainArea
        onMainRef={handleMainRef}
        currentSection={currentSection}
        onHireMe={() => goToSection(3)}
        onNavigate={goToSection}
      />
      <Player
        section={SECTIONS[currentSection]}
        sectionIndex={currentSection}
        sectionCount={SECTIONS.length}
        scrollProgress={scrollProgress}
        onPrev={goPrev}
        onNext={goNext}
        onShortcuts={() => setShortcutsOpen(o => !o)}
      />

      {/* Keyboard shortcuts panel */}
      {shortcutsOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            style={{
              background: '#282828', borderRadius: 12, padding: '28px 32px',
              minWidth: 320, border: '0.5px solid rgba(255,255,255,0.12)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
              Keyboard shortcuts
            </div>
            {[
              { keys: ['H'],     desc: 'Jump to top'       },
              { keys: ['E'],     desc: 'Experience'         },
              { keys: ['P'],     desc: 'Projects'           },
              { keys: ['C'],     desc: 'Contact'            },
              { keys: ['→','↓'], desc: 'Next section'       },
              { keys: ['←','↑'], desc: 'Previous section'   },
              { keys: ['?'],     desc: 'Toggle this panel'  },
            ].map(({ keys, desc }) => (
              <div key={desc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{desc}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {keys.map(k => (
                    <span key={k} style={{
                      background: '#3E3E3E', borderRadius: 4, padding: '2px 8px',
                      fontSize: 12, fontWeight: 600, color: '#fff', minWidth: 24, textAlign: 'center',
                    }}>{k}</span>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '0.5px solid rgba(255,255,255,0.1)', fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;