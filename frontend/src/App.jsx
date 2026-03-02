import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";

const C = {
  bg: "#0f0f12",
  surface: "#18181b",
  card: "#1f1f23",
  border: "#2a2a2f",
  accent: "#f59e0b",
  accentDim: "rgba(245,158,11,0.08)",
  accentBorder: "rgba(245,158,11,0.25)",
  text: "#f4f4f5",
  sub: "#a1a1aa",
  muted: "#52525b",
  error: "#ef4444",
  success: "#22c55e",
};


function NavbarFooter({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = location.pathname === "/admin";

  return (
    <div style={styles.shell}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'Outfit', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.dim}; border-radius: 10px; }
        a { text-decoration: none; color: inherit; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .nav-link { color: ${C.muted}; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 8px; transition: all 0.2s; letter-spacing: 0.01em; }
        .nav-link:hover { color: ${C.text}; background: ${C.surface}; }
        .nav-link.active { color: ${C.accent}; background: ${C.accentDim}; }
        .mobile-link { display: block; color: ${C.muted}; font-size: 16px; font-weight: 500; padding: 14px 0; border-bottom: 1px solid ${C.border}; transition: color 0.2s; }
        .mobile-link:hover, .mobile-link.active { color: ${C.accent}; }
        @media(max-width:640px) { .desk-nav { display:none!important; } .ham-btn { display:flex!important; } }
        @media(min-width:641px) { .ham-btn { display:none!important; } }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <NavLink to="/" style={styles.logo}>
          <span style={styles.logoIcon}>◈</span>
          <span>Vibe-On</span>
        </NavLink>

        {/* Desktop links */}
        <div style={styles.navLinks}>
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Admin</NavLink>
        </div>

        {/* Hamburger */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span style={{ ...styles.bar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...styles.bar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <NavLink to="/" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Admin</NavLink>
        </div>
      )}

      {/* Page Content */}
      <main style={styles.main}>{children}</main>

      {/* Footer */}
     
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavbarFooter>
        <Routes>
          <Route path="/" element={<UserPanel />} />
          <Route path="/user" element={<UserPanel />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </NavbarFooter>
    </BrowserRouter>
  );
}

const styles = {
  shell: { display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', sans-serif" },

  navbar: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    height: 50, display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", background: "rgba(15,15,15,0.92)", backdropFilter: "blur(16px)",
    borderBottom: `1px solid ${C.border}`,
  },
  logo: { display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" },
  logoIcon: { color: C.accent, fontSize: 20 },
  navLinks: { display: "flex", gap: 4, "@media(max-width:640px)": { display: "none" } },
  hamburger: {
    display: "none", flexDirection: "column", gap: 5, background: "none", border: "none",
    cursor: "pointer", padding: 8,
    // shown via media query override in CSS
  },
  bar: { width: 22, height: 2, background: C.text, borderRadius: 2, display: "block", transition: "all 0.25s" },

  mobileMenu: {
    position: "fixed", top: 60, left: 0, right: 0, zIndex: 999,
    background: C.surface, padding: "8px 24px 16px",
    borderBottom: `1px solid ${C.border}`, animation: "fadeIn 0.2s ease",
  },

  main: { flex: 1, paddingTop: 60 },

  footer: { borderTop: `1px solid ${C.border}`, padding: "24px", marginTop: "auto" },
  footerInner: {
    maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center",
    justifyContent: "space-between", flexWrap: "wrap", gap: 16,
  },
  footerLeft: { display: "flex", flexDirection: "column", gap: 4 },
  footerLogo: { fontSize: 15, fontWeight: 700, color: C.accent },
  footerTagline: { fontSize: 12, color: C.muted },
  footerLinks: { display: "flex", gap: 20 },
  footerLink: { fontSize: 13, color: C.muted, transition: "color 0.2s" },
  footerRight: { fontSize: 12, color: C.muted },
};
