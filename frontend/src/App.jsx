import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";

const C = {
  bg: "#0d0f1e",
  nav: "rgba(13,15,30,0.97)",
  surface: "#13162a",
  border: "#1e2240",
  accent: "#ff6b35",
  accentGlow: "rgba(255,107,53,0.15)",
  text: "#f5f0e8",
  muted: "#5a5f7a",
  sub: "#8b90aa",
};

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:${C.bg};color:${C.text};font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:10px;}
        a{text-decoration:none;color:inherit;}
        button{font-family:'Plus Jakarta Sans',sans-serif;}
        input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;}
        @keyframes navFade{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes menuSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes slideUp{from{opacity:0;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}
        .nl{color:${C.sub};font-size:13px;font-weight:600;padding:7px 14px;border-radius:8px;transition:all 0.18s;letter-spacing:0.02em;}
        .nl:hover{color:${C.text};background:${C.surface};}
        .nl.on{color:${C.accent};background:${C.accentGlow};}
        .ml{display:block;padding:14px 0;color:${C.sub};font-size:15px;font-weight:600;border-bottom:1px solid ${C.border};transition:color 0.18s;}
        .ml:hover,.ml.on{color:${C.accent};}
        @media(max-width:640px){.desk-nav{display:none!important;} .ham-btn{display:flex!important;}}
        @media(min-width:641px){.ham-btn{display:none!important;}}
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:4px;outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:${C.accent};cursor:pointer;box-shadow:0 0 0 3px rgba(255,107,53,0.2);}
        input[type=range]:focus{outline:none;}
      `}</style>

      <nav style={s.nav}>
        <NavLink to="/" style={s.logo}>
          <span style={s.logoDot} />
          <span>Vibe-On</span>
        </NavLink>
        <div style={s.navLinks} className="desk-nav">
          <NavLink to="/" end className={({ isActive }) => "nl" + (isActive ? " on" : "")}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "nl" + (isActive ? " on" : "")}>Admin</NavLink>
        </div>
        <button style={s.ham} className="ham-btn" onClick={() => setOpen(o => !o)}>
          <span style={{ ...s.bar, transform: open ? "rotate(45deg) translate(0,6px)" : "none" }} />
          <span style={{ ...s.bar, opacity: open ? 0 : 1 }} />
          <span style={{ ...s.bar, transform: open ? "rotate(-45deg) translate(0,-6px)" : "none" }} />
        </button>
      </nav>

      {open && (
        <div style={s.mobileMenu}>
          <NavLink to="/" end className={({ isActive }) => "ml" + (isActive ? " on" : "")}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "ml" + (isActive ? " on" : "")}>Admin</NavLink>
        </div>
      )}

      <main style={s.main}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserPanel />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const s = {
  root: { minHeight: "100vh", background: C.bg },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    height: 58, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 20px", background: C.nav, backdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
  },
  logo: { display: "flex", alignItems: "center", gap: 9, fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: "-0.03em" },
  logoDot: { width: 10, height: 10, borderRadius: "50%", background: C.accent, flexShrink: 0, boxShadow: "0 0 8px rgba(255,107,53,0.6)" },
  navLinks: { display: "flex", gap: 4 },
  ham: { display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 },
  bar: { width: 20, height: 2, background: C.text, borderRadius: 2, display: "block", transition: "all 0.22s ease" },
  mobileMenu: {
    position: "fixed", top: 58, left: 0, right: 0, zIndex: 999,
    background: C.surface, padding: "8px 20px 16px",
    borderBottom: `1px solid ${C.border}`, animation: "menuSlide 0.2s ease",
    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
  },
  main: { paddingTop: 58 },
};
