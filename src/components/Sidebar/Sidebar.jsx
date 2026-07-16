import React, { useState } from 'react';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/></svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);
const LibraryIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M3 6h2v12H3zm4-2h2v16H7zm4 4h2v12h-2zm4-6h2v20h-2zm4 2h2v16h-2z"/></svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{width:18,height:18}}><path d="M12 5v14M5 12h14"/></svg>
);

const libItems = [
  { icon: '🏗️', name: 'Terraform Provider',  sub: 'Project · Golang',              bg: '#1a3d2e' },
  { icon: '🚢', name: 'Nuvy Platform',       sub: 'Live · nuvy-peach.vercel.app',  bg: '#1a3d2e' },
  { icon: '🎨', name: 'FinePoint Designs',   sub: 'Live · finepo-nt.github.io',    bg: '#2d1a3d' },
  { icon: '☁️', name: 'AWS Architecture',    sub: 'Skill · Certified',             bg: '#3d2a1a' },
  { icon: '🚀', name: 'Red Ventures',        sub: 'Experience',                    bg: '#1a3d2e' },
  { icon: '👨‍🏫', name: 'Road to Hire',      sub: 'Experience',                    bg: '#1a2535' },
];

const Sidebar = () => {
  const [active, setActive] = useState('home');

  return (
    <aside className="rj-sidebar">
      <div className="rj-sidebar__top">
        <div className="rj-sidebar__logo">
          <div className="rj-sidebar__logo-icon" style={{ padding: 0, overflow: 'hidden' }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/profilePicture.jpeg`}
              alt="Reggie Johnson"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          <span className="rj-sidebar__logo-name">Reggie Johnson</span>
        </div>
        <nav className="rj-sidebar__nav">
          {[
            { id: 'home',       label: 'Home',     Icon: HomeIcon    },
            { id: 'experience', label: 'Experience', Icon: SearchIcon },
            { id: 'projects',   label: 'Projects', Icon: LibraryIcon },
          ].map(({ id, label, Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rj-sidebar__nav-item${active === id ? ' rj-sidebar__nav-item--active' : ''}`}
              onClick={() => setActive(id)}
            >
              <Icon /> {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="rj-sidebar__library">
        <div className="rj-sidebar__lib-header">
          <div className="rj-sidebar__lib-title">
            <LibraryIcon /> Your Library
          </div>
          <PlusIcon />
        </div>
        <div className="rj-sidebar__lib-items">
          {libItems.map(item => (
            <div className="rj-sidebar__lib-item" key={item.name}>
              <div className="rj-sidebar__lib-img" style={{ background: item.bg }}>
                {item.icon}
              </div>
              <div className="rj-sidebar__lib-info">
                <p className="rj-sidebar__lib-name">{item.name}</p>
                <p className="rj-sidebar__lib-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;