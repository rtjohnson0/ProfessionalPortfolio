import React, { useState } from 'react';

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
);
const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
    <path d="M6 18l8.5-6L6 6v12zm8.5-6L23 6v12z"/>
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" style={{width:16,height:16}}>
    <path d="M16 3h5v5M4 20L21 3M16 21h5v-5M4 4l5 5m7 7 5 5"/>
  </svg>
);
const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" style={{width:16,height:16}}>
    <path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);
const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}>
    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" style={{width:16,height:16}}>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1DB954" style={{width:16,height:16}}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const EqBars = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
    {[6, 12, 8, 14, 10, 7, 13].map((h, i) => (
      <div key={i} style={{
        width: 3, height: h, background: '#1DB954', borderRadius: 1,
        animation: `rj-eq ${0.8 + i * 0.12}s ease-in-out infinite alternate`,
        animationDelay: `${i * 0.07}s`,
      }} />
    ))}
    <style>{`
      @keyframes rj-eq {
        from { transform: scaleY(0.3); }
        to   { transform: scaleY(1); }
      }
    `}</style>
  </div>
);

const Player = ({ section, sectionIndex, sectionCount, scrollProgress, onPrev, onNext, onShortcuts }) => {
  const [vol, setVol] = useState(75);

  const pct = Math.round(scrollProgress ?? 0);

  // Format scroll % as fake timestamp e.g. 2:34
  const toTime = (p) => {
    const total = 10 * 60; // 10 min total
    const secs  = Math.round((p / 100) * total);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="rj-player">

      {/* LEFT — now playing info */}
      <div className="rj-player__left">
        <div className="rj-player__art" style={{ background: section?.color || '#1a3d2e', fontSize: 22 }}>
          {section?.icon || '💼'}
        </div>
        <div className="rj-player__track">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <EqBars />
          </div>
          <p className="rj-player__track-name" style={{ marginTop: 3 }}>
            {section?.label || 'Reggie Johnson'}
          </p>
          <p className="rj-player__track-sub">
            {section?.sub || 'Platform & DevOps Engineer'}
          </p>
        </div>
        <span className="rj-player__heart"><HeartIcon /></span>
      </div>

      {/* CENTER — controls + progress */}
      <div className="rj-player__center">
        <div className="rj-player__controls">
          <button className="rj-player__ctrl" title="Shuffle" style={{ opacity: 0.4, cursor: 'default' }}>
            <ShuffleIcon />
          </button>
          <button
            className="rj-player__ctrl"
            onClick={onPrev}
            title="Previous section (← or ↑)"
            style={{ opacity: sectionIndex === 0 ? 0.35 : 1 }}
          >
            <PrevIcon />
          </button>
          <button
            className="rj-player__ctrl-play"
            onClick={onNext}
            title="Next section (→ or ↓)"
          >
            <PlayIcon />
          </button>
          <button
            className="rj-player__ctrl"
            onClick={onNext}
            title="Next section"
            style={{ opacity: sectionIndex === sectionCount - 1 ? 0.35 : 1 }}
          >
            <NextIcon />
          </button>
          <button className="rj-player__ctrl" title="Repeat" style={{ opacity: 0.4, cursor: 'default' }}>
            <RepeatIcon />
          </button>
        </div>

        <div className="rj-player__progress">
          <span className="rj-player__time">{toTime(pct)}</span>
          <div className="rj-player__bar" title={`${pct}% through the page`}>
            <div className="rj-player__fill" style={{ width: `${pct}%`, transition: 'width 0.2s' }}>
              <div className="rj-player__thumb" style={{ opacity: 1 }} />
            </div>
          </div>
          <span className="rj-player__time">10:00</span>
        </div>

        {/* Section dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 4, justifyContent: 'center' }}>
          {Array.from({ length: sectionCount }).map((_, i) => (
            <div key={i} style={{
              width: i === sectionIndex ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: i === sectionIndex ? '#1DB954' : 'rgba(255,255,255,0.25)',
              transition: 'width 0.3s, background 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* RIGHT — volume + shortcuts */}
      <div className="rj-player__right">
        <button
          className="rj-player__ctrl"
          onClick={onShortcuts}
          title="Keyboard shortcuts (?)"
          style={{ color: 'rgba(255,255,255,0.6)', marginRight: 4 }}
        >
          <KeyboardIcon />
        </button>
        <div className="rj-player__vol">
          <VolumeIcon />
          <div
            className="rj-player__vol-bar"
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setVol(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="rj-player__vol-fill" style={{ width: `${vol}%` }} />
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Player;