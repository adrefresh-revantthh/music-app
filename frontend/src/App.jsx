// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
// // import AdminPanel from "./panels/adminpanel/AdminPanel";
// // import UserPanel from "./panels/userpanel/UserPanel";

// // const C = {
// //   bg: "#0f0f12",
// //   surface: "#18181b",
// //   card: "#1f1f23",
// //   border: "#2a2a2f",
// //   accent: "#f59e0b",
// //   accentDim: "rgba(245,158,11,0.08)",
// //   accentBorder: "rgba(245,158,11,0.25)",
// //   text: "#f4f4f5",
// //   sub: "#a1a1aa",
// //   muted: "#52525b",
// //   error: "#ef4444",
// //   success: "#22c55e",
// // };


// // function NavbarFooter({ children }) {
// //   const location = useLocation();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const isAdmin = location.pathname === "/admin";

// //   return (
// //     <div style={styles.shell}>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// //         body { background: ${C.bg}; color: ${C.text}; font-family: 'Outfit', sans-serif; }
// //         ::-webkit-scrollbar { width: 4px; height: 4px; }
// //         ::-webkit-scrollbar-track { background: transparent; }
// //         ::-webkit-scrollbar-thumb { background: ${C.dim}; border-radius: 10px; }
// //         a { text-decoration: none; color: inherit; }
// //         @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
// //         .nav-link { color: ${C.muted}; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 8px; transition: all 0.2s; letter-spacing: 0.01em; }
// //         .nav-link:hover { color: ${C.text}; background: ${C.surface}; }
// //         .nav-link.active { color: ${C.accent}; background: ${C.accentDim}; }
// //         .mobile-link { display: block; color: ${C.muted}; font-size: 16px; font-weight: 500; padding: 14px 0; border-bottom: 1px solid ${C.border}; transition: color 0.2s; }
// //         .mobile-link:hover, .mobile-link.active { color: ${C.accent}; }
// //         @media(max-width:640px) { .desk-nav { display:none!important; } .ham-btn { display:flex!important; } }
// //         @media(min-width:641px) { .ham-btn { display:none!important; } }
// //       `}</style>

// //       {/* Navbar */}
// //       <nav style={styles.navbar}>
// //         <NavLink to="/" style={styles.logo}>
// //           <span style={styles.logoIcon}>◈</span>
// //           <span>Vibe-On</span>
// //         </NavLink>

// //         {/* Desktop links */}
// //         <div style={styles.navLinks}>
// //           <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
// //           <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Admin</NavLink>
// //         </div>

// //         {/* Hamburger */}
// //         <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
// //           <span style={{ ...styles.bar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
// //           <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
// //           <span style={{ ...styles.bar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
// //         </button>
// //       </nav>

// //       {/* Mobile menu */}
// //       {menuOpen && (
// //         <div style={styles.mobileMenu}>
// //           <NavLink to="/" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Home</NavLink>
// //           <NavLink to="/admin" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Admin</NavLink>
// //         </div>
// //       )}

// //       {/* Page Content */}
// //       <main style={styles.main}>{children}</main>

// //       {/* Footer */}
     
// //     </div>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <NavbarFooter>
// //         <Routes>
// //           <Route path="/" element={<UserPanel />} />
// //           <Route path="/user" element={<UserPanel />} />
// //           <Route path="/admin" element={<AdminPanel />} />
// //         </Routes>
// //       </NavbarFooter>
// //     </BrowserRouter>
// //   );
// // }

// // const styles = {
// //   shell: { display: "flex", flexDirection: "column", minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', sans-serif" },

// //   navbar: {
// //     position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
// //     height: 50, display: "flex", alignItems: "center", justifyContent: "space-between",
// //     padding: "0 24px", background: "rgba(15,15,15,0.92)", backdropFilter: "blur(16px)",
// //     borderBottom: `1px solid ${C.border}`,
// //   },
// //   logo: { display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" },
// //   logoIcon: { color: C.accent, fontSize: 20 },
// //   navLinks: { display: "flex", gap: 4, "@media(max-width:640px)": { display: "none" } },
// //   hamburger: {
// //     display: "none", flexDirection: "column", gap: 5, background: "none", border: "none",
// //     cursor: "pointer", padding: 8,
// //     // shown via media query override in CSS
// //   },
// //   bar: { width: 22, height: 2, background: C.text, borderRadius: 2, display: "block", transition: "all 0.25s" },

// //   mobileMenu: {
// //     position: "fixed", top: 60, left: 0, right: 0, zIndex: 999,
// //     background: C.surface, padding: "8px 24px 16px",
// //     borderBottom: `1px solid ${C.border}`, animation: "fadeIn 0.2s ease",
// //   },

// //   main: { flex: 1, paddingTop: 60 },

// //   footer: { borderTop: `1px solid ${C.border}`, padding: "24px", marginTop: "auto" },
// //   footerInner: {
// //     maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center",
// //     justifyContent: "space-between", flexWrap: "wrap", gap: 16,
// //   },
// //   footerLeft: { display: "flex", flexDirection: "column", gap: 4 },
// //   footerLogo: { fontSize: 15, fontWeight: 700, color: C.accent },
// //   footerTagline: { fontSize: 12, color: C.muted },
// //   footerLinks: { display: "flex", gap: 20 },
// //   footerLink: { fontSize: 13, color: C.muted, transition: "color 0.2s" },
// //   footerRight: { fontSize: 12, color: C.muted },
// // };
// import React, { useState, createContext, useContext } from "react";
// import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
// import AdminPanel from "./panels/adminpanel/AdminPanel";
// import UserPanel from "./panels/userpanel/UserPanel";
// import { FaPalette } from "react-icons/fa";

// // ══════════════════════════════════════════
// // THEMES - Single source of truth
// // ══════════════════════════════════════════
// export const THEMES = {
//   Amber:  { bg:"#0f0f12", surface:"#18181b", card:"#1f1f23", border:"#2a2a2f", accent:"#f59e0b", accentDim:"rgba(245,158,11,0.08)", accentBorder:"rgba(245,158,11,0.25)", text:"#f4f4f5", sub:"#a1a1aa", muted:"#52525b", error:"#ef4444", success:"#22c55e" },
//   Purple: { bg:"#0d0d14", surface:"#16162a", card:"#1e1e35", border:"#2d2d4a", accent:"#a855f7", accentDim:"rgba(168,85,247,0.08)", accentBorder:"rgba(168,85,247,0.25)", text:"#f4f4f5", sub:"#a1a1aa", muted:"#52525b", error:"#ef4444", success:"#22c55e" },
//   Cyan:   { bg:"#020f12", surface:"#071a1f", card:"#0c2530", border:"#0e3040", accent:"#06b6d4", accentDim:"rgba(6,182,212,0.08)", accentBorder:"rgba(6,182,212,0.25)", text:"#f4f4f5", sub:"#a1a1aa", muted:"#52525b", error:"#ef4444", success:"#22c55e" },
//   Rose:   { bg:"#120a0a", surface:"#1c1010", card:"#261515", border:"#3a1f1f", accent:"#f43f5e", accentDim:"rgba(244,63,94,0.08)", accentBorder:"rgba(244,63,94,0.25)", text:"#f4f4f5", sub:"#a1a1aa", muted:"#52525b", error:"#fbbf24", success:"#22c55e" },
//   Green:  { bg:"#090f0a", surface:"#101a10", card:"#162416", border:"#1e3520", accent:"#22c55e", accentDim:"rgba(34,197,94,0.08)", accentBorder:"rgba(34,197,94,0.25)", text:"#f4f4f5", sub:"#a1a1aa", muted:"#52525b", error:"#ef4444", success:"#22c55e" },
// };
// export const THEME_NAMES = Object.keys(THEMES);

// // ══════════════════════════════════════════
// // THEME CONTEXT - shared across all panels
// // ══════════════════════════════════════════
// export const ThemeContext = createContext(null);
// export const useTheme = () => useContext(ThemeContext);

// // ══════════════════════════════════════════
// // NAVBAR
// // ══════════════════════════════════════════
// function NavbarFooter({ children, themeName, setThemeName }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);
//   const C = THEMES[themeName];

//   const pickTheme = (n) => {
//     setThemeName(n);
//     localStorage.setItem("vo_theme", n);
//     setShowPicker(false);
//     setMenuOpen(false);
//   };

//   return (
//     <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:C.bg, fontFamily:"'Outfit',sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         body { background:${C.bg}; color:${C.text}; font-family:'Outfit',sans-serif; }
//         ::-webkit-scrollbar { width:4px; height:4px; }
//         ::-webkit-scrollbar-track { background:transparent; }
//         ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:10px; }
//         a { text-decoration:none; color:inherit; }
//         @keyframes fadeIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
//         @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         @keyframes spin2   { to{transform:rotate(360deg)} }
//         @keyframes slideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//         .nav-link { color:${C.muted}; font-size:12px; font-weight:500; padding:6px 14px; border-radius:8px; transition:all 0.2s; letter-spacing:0.01em; }
//         .nav-link:hover { color:${C.text}; background:${C.surface}; }
//         .nav-link.active { color:${C.accent}; background:${C.accentDim}; }
//         .mobile-link { display:block; color:${C.muted}; font-size:16px; font-weight:500; padding:14px 0; border-bottom:1px solid ${C.border}; transition:color 0.2s; }
//         .mobile-link:hover, .mobile-link.active { color:${C.accent}; }
//         input:focus, select:focus, textarea:focus { outline:1px solid ${C.accent}!important; outline-offset:0; }
//         input::placeholder, textarea::placeholder { color:${C.muted}; }
//         select option { background:${C.card}; color:${C.text}; }
//         input[type=range] { -webkit-appearance:none; height:3px; border-radius:4px; outline:none; cursor:pointer; }
//         input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:${C.accent}; cursor:pointer; }
//         @media(max-width:640px) { .desk-nav{display:none!important;} .ham-btn{display:flex!important;} }
//         @media(min-width:641px) { .ham-btn{display:none!important;} }
//         @media(max-width:480px) { .agrid{grid-template-columns:repeat(2,1fr)!important;} .sat{display:none!important;} }
//         @media(max-width:640px) {
//           .al{flex-direction:column!important;}
//           .sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}
//           .sl{display:none!important;} .ss{display:none!important;}
//           .sn{flex-direction:row!important;gap:4px!important;flex:1!important;}
//           .ni{padding:8px 14px!important;font-size:12px!important;}
//           .fg{grid-template-columns:1fr!important;}
//           .ur{flex-direction:column!important;}
//         }
//       `}</style>

//       {/* ── NAVBAR ── */}
//       <nav style={{
//         position:"fixed", top:0, left:0, right:0, zIndex:1000,
//         height:50, display:"flex", alignItems:"center", justifyContent:"space-between",
//         padding:"0 24px", background:"rgba(15,15,18,0.95)", backdropFilter:"blur(16px)",
//         borderBottom:`1px solid ${C.border}`,
//       }}>
//         {/* Logo */}
//         <NavLink to="/" style={{ display:"flex", alignItems:"center", gap:8, fontSize:18, fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>
//           <span style={{ color:C.accent, fontSize:20 }}>◈</span>
//           <span>Vibe-On</span>
//         </NavLink>

//         {/* Desktop nav */}
//         <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:4 }}>
//           <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
//           <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Admin</NavLink>

//           {/* Theme dropdown */}
//           <div style={{ position:"relative", marginLeft:4 }}>
//             <button onClick={() => setShowPicker(p => !p)} style={{
//               display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:8,
//               background:C.accentDim, border:`1px solid ${C.accentBorder}`,
//               color:C.accent, cursor:"pointer", fontSize:12, fontWeight:600,
//               fontFamily:"'Outfit',sans-serif", transition:"all 0.2s",
//             }}>
//               {/* colored dot shows current theme accent */}
//               <span style={{ width:8, height:8, borderRadius:"50%", background:C.accent, display:"inline-block" }}/>
//               {themeName}
//               <FaPalette size={11}/>
//             </button>

//             {showPicker && (
//               <>
//                 {/* backdrop */}
//                 <div style={{ position:"fixed", inset:0, zIndex:1998 }} onClick={() => setShowPicker(false)}/>
//                 <div style={{
//                   position:"absolute", top:"calc(100% + 8px)", right:0, zIndex:1999,
//                   background:C.card, border:`1px solid ${C.border}`, borderRadius:12,
//                   padding:8, display:"flex", flexDirection:"column", gap:2,
//                   minWidth:140, animation:"fadeIn 0.18s ease",
//                   boxShadow:"0 12px 40px rgba(0,0,0,0.5)",
//                 }}>
//                   {THEME_NAMES.map(n => (
//                     <button key={n} onClick={() => pickTheme(n)} style={{
//                       display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
//                       borderRadius:8, cursor:"pointer", fontFamily:"'Outfit',sans-serif",
//                       fontSize:13, fontWeight:600, border:"none", textAlign:"left",
//                       background: themeName === n ? THEMES[n].accentDim : "transparent",
//                       color: THEMES[n].accent,
//                       transition:"background 0.15s",
//                     }}>
//                       <span style={{ width:10, height:10, borderRadius:"50%", background:THEMES[n].accent, flexShrink:0 }}/>
//                       {n}
//                       {themeName === n && <span style={{ marginLeft:"auto", fontSize:12, color:C.accent }}>✓</span>}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Hamburger */}
//         <button className="ham-btn" style={{
//           flexDirection:"column", gap:5, background:"none",
//           border:"none", cursor:"pointer", padding:8,
//         }} onClick={() => setMenuOpen(m => !m)} aria-label="menu">
//           <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
//           <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", opacity:menuOpen?0:1 }}/>
//           <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
//         </button>
//       </nav>

//       {/* ── MOBILE MENU ── */}
//       {menuOpen && (
//         <div style={{
//           position:"fixed", top:50, left:0, right:0, zIndex:999,
//           background:C.surface, padding:"8px 24px 20px",
//           borderBottom:`1px solid ${C.border}`, animation:"fadeIn 0.2s ease",
//         }}>
//           <NavLink to="/" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Home</NavLink>
//           <NavLink to="/admin" className={({ isActive }) => "mobile-link" + (isActive ? " active" : "")} onClick={() => setMenuOpen(false)}>Admin</NavLink>

//           {/* Mobile theme picker */}
//           <div style={{ paddingTop:16 }}>
//             <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>Theme</div>
//             <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
//               {THEME_NAMES.map(n => (
//                 <button key={n} onClick={() => pickTheme(n)} style={{
//                   padding:"7px 16px", borderRadius:8, cursor:"pointer",
//                   fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:600,
//                   border:`2px solid ${themeName === n ? THEMES[n].accent : THEMES[n].border}`,
//                   background: themeName === n ? THEMES[n].accentDim : THEMES[n].surface,
//                   color: THEMES[n].accent,
//                   display:"flex", alignItems:"center", gap:6,
//                 }}>
//                   <span style={{ width:8, height:8, borderRadius:"50%", background:THEMES[n].accent }}/>
//                   {n}
//                   {themeName === n && "✓"}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── CONTENT ── */}
//       <main style={{ flex:1, paddingTop:50 }}>{children}</main>
//     </div>
//   );
// }

// // ══════════════════════════════════════════
// // APP - wraps everything with ThemeContext
// // ══════════════════════════════════════════
// export default function App() {
//   const [themeName, setThemeName] = useState(
//     () => localStorage.getItem("vo_theme") || "Amber"
//   );

//   return (
//     <ThemeContext.Provider value={{ themeName, C: THEMES[themeName] }}>
//       <BrowserRouter>
//         <NavbarFooter themeName={themeName} setThemeName={setThemeName}>
//           <Routes>
//             <Route path="/"      element={<UserPanel />} />
//             <Route path="/user"  element={<UserPanel />} />
//             <Route path="/admin" element={<AdminPanel />} />
//           </Routes>
//         </NavbarFooter>
//       </BrowserRouter>
//     </ThemeContext.Provider>
//   );
// }
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";

// Sonexa's single, fixed brand palette — dark, with the brand red as the
// only accent. (There used to be a 5-color theme picker here; removed
// per request in favor of one standard look.)
export const SONEXA_THEME = {
  bg:"#0d0d10", surface:"#17171b", card:"#1e1e23", border:"#2a2a30",
  accent:"#ff5a1d", accentDim:"rgba(255,127,80,0.12)", accentBorder:"rgba(255,127,80,0.32)",
  text:"#f5f5f6", sub:"#a8a8ad", muted:"#5c5c62",
  error:"#ff2929", success:"#22c55e",
};
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

function NavbarFooter({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const C = SONEXA_THEME;

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:C.bg, fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @font-face {
          font-family: 'Orange Vintage';
          src: url('/fonts/OrangeVintage.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .brand-font { font-family:'Orange Vintage', serif; }
        /* Single site-wide font per request — !important is needed here
           because every component sets fontFamily:'Outfit' inline, and
           inline styles normally beat stylesheet rules; !important is the
           one thing that still wins over that without editing every
           component individually. */
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; font-family:'Orange Vintage', serif !important; }
        body { background:${C.bg}; color:${C.text}; font-family:'Orange Vintage', serif; }
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
        padding:"0 24px", background:"rgba(15,15,18,0.95)", backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.border}`,
      }}>
        <NavLink to="/" style={{ display:"flex", alignItems:"center", gap:8, fontSize:22, fontWeight:700, color:C.text, letterSpacing:"0.01em" }}>
          <img src="/favicon-1.png" alt="" width={160} height={80}/>
          <span className="brand-font">Sonexa</span>
        </NavLink>

        <div className="desk-nav" style={{ display:"flex", alignItems:"center", gap:4 }}>
          <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Admin</NavLink>
        </div>
{/* grdfg */}
        <button className="ham-btn" style={{
          flexDirection:"column", gap:5, background:"none",
          border:"none", cursor:"pointer", padding:8,
        }} onClick={() => setMenuOpen(m => !m)}>
          <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
          <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", opacity:menuOpen?0:1 }}/>
          <span style={{ width:22, height:2, background:C.text, borderRadius:2, display:"block", transition:"all 0.25s", transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
        </button>
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
  return (
    <ThemeContext.Provider value={{ C: SONEXA_THEME }}>
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