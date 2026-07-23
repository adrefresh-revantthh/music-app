
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";
import { FaSun, FaMoon } from "react-icons/fa";

// Loopz's fixed brand palette — black / red / white / grays, with the same
// "blood red" accent in both modes. Two modes only (dark / light), not the
// old 5-color picker.
export const LOOPZ_THEMES = {
  dark: {
    bg:"#0a0a0b", surface:"#141416", card:"#1c1c1f", border:"#2c2c30",
    accent:"#C8102A", accentDim:"rgba(200,16,42,0.12)", accentBorder:"rgba(200,16,42,0.35)",
    text:"#f5f5f6", sub:"#a8a8ad", muted:"#5c5c62",
    error:"#ff4433", success:"#22c55e",
  },
  light: {
    bg:"#ffffff", surface:"#f5f5f6", card:"#ffffff", border:"#e2e2e5",
    accent:"#C8102A", accentDim:"rgba(200,16,42,0.08)", accentBorder:"rgba(200,16,42,0.28)",
    text:"#121214", sub:"#4d4d52", muted:"#8c8c92",
    error:"#d9291d", success:"#16a34a",
  },
};
// kept around in case anything still imports the old single-theme name
export const LOOPZ_THEME = LOOPZ_THEMES.dark;

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

function NavbarFooter({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { C, mode, toggleMode } = useTheme();

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:C.bg, fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @font-face {
          font-family: 'Paperoz';
          src: url('/fonts/Paperoz.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .brand-font { font-family:'Paperoz', cursive; }
        /* Single site-wide font per request — !important is needed here
           because every component sets fontFamily:'Outfit' inline, and
           inline styles normally beat stylesheet rules; !important is the
           one thing that still wins over that without editing every
           component individually. */
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; font-family:'Paperoz', cursive !important; }
        body { background:${C.bg}; color:${C.text}; font-family:'Paperoz', cursive; transition:background 0.2s ease, color 0.2s ease; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:10px; }
        a { text-decoration:none; color:inherit; }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes spin2   { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .nav-link { color:${C.muted}; font-size:12px; font-weight:500; padding:6px 14px; border-radius:8px; transition:all 0.2s; letter-spacing:0.01em; }
        .nav-link:hover { color:${C.text}; background:${C.surface}; }
        .nav-link.active { color:${C.accent}; background:${C.accentDim}; }
        .mobile-link { display:block; color:${C.muted}; font-size:16px; font-weight:500; padding:14px 0; border-bottom:1px solid ${C.border}; transition:color 0.2s; }
        .mobile-link:hover, .mobile-link.active { color:${C.accent}; }
        .theme-toggle { display:flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; border:1px solid ${C.border}; background:${C.surface}; color:${C.text}; cursor:pointer; }
        .theme-toggle:hover { border-color:${C.accentBorder}; color:${C.accent}; }
        input:focus, select:focus, textarea:focus { outline:1px solid ${C.accent}!important; outline-offset:0; }
        input::placeholder, textarea::placeholder { color:${C.muted}; }
        select option { background:${C.card}; color:${C.text}; }
        input[type=range] { -webkit-appearance:none; height:3px; border-radius:4px; outline:none; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:${C.accent}; cursor:pointer; }
        @media(max-width:640px) { .desk-nav{display:none!important;} .ham-btn{display:flex!important;} }
        @media(min-width:641px) { .ham-btn{display:none!important;} }
        @media(max-width:480px) { .agrid{grid-template-columns:repeat(2,1fr)!important;} .sat{display:none!important;} }
        @media(max-width:640px) {
          .al{flex-direction:column!important;}
          .sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}
          .sl{display:none!important;} .ss{display:none!important;}
          .sn{flex-direction:row!important;gap:4px!important;flex:1!important;}
          .ni{padding:8px 14px!important;font-size:12px!important;}
          .fg{grid-template-columns:1fr!important;}
          .ur{flex-direction:column!important;}
        }
      `}</style>

      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        height:50, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 24px", background:mode==="dark" ? "rgba(15,15,18,0.95)" : "rgba(255,255,255,0.9)", backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.border}`,
      }}>
        <NavLink to="/" style={{ display:"flex", alignItems:"center", gap:8, fontSize:22, fontWeight:700, color:C.text, letterSpacing:"0.01em" }}>
          <img src="/icon-192.png" alt="" width={28} height={28}/>
          <span className="brand-font">Loopz</span>
        </NavLink>

        <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:8 }}>
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Admin</NavLink>
          <button className="theme-toggle" onClick={toggleMode} title={mode==="dark" ? "Switch to light mode" : "Switch to dark mode"} style={{ marginLeft:8 }}>
            {mode==="dark" ? <FaSun size={14}/> : <FaMoon size={14}/>}
          </button>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }} className="ham-btn">
          <button className="theme-toggle" onClick={toggleMode} title={mode==="dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {mode==="dark" ? <FaSun size={14}/> : <FaMoon size={14}/>}
          </button>
          <button style={{
            display:"flex", flexDirection:"column", gap:5, background:"none",
            border:"none", cursor:"pointer", padding:8,
          }} onClick={() => setMenuOpen(m => !m)}>
            <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
            <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", opacity:menuOpen?0:1 }}/>
            <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position:"fixed", top:50, left:0, right:0, zIndex:999,
          background:C.surface, padding:"8px 24px 20px",
          borderBottom:`1px solid ${C.border}`, animation:"fadeIn 0.2s ease",
        }}>
          <NavLink to="/" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Admin</NavLink>
        </div>
      )}

      <main style={{ flex:1, paddingTop:50 }}>{children}</main>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem("loopz_theme_mode") || "dark"; } catch { return "dark"; }
  });

  useEffect(() => {
    try { localStorage.setItem("loopz_theme_mode", mode); } catch {}
    const C = LOOPZ_THEMES[mode];
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", C.bg);
  }, [mode]);

  const toggleMode = () => setMode(m => (m === "dark" ? "light" : "dark"));
  const C = LOOPZ_THEMES[mode];

  return (
    <ThemeContext.Provider value={{ C, mode, toggleMode }}>
      <BrowserRouter>
        <NavbarFooter>
          <Routes>
            <Route path="/"      element={<UserPanel />} />
            <Route path="/user"  element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </NavbarFooter>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
