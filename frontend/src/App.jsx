import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div style={styles.appWrapper}>
        
        {/* Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>Vibe-On</div>

          {!isMobile && (
            <div style={styles.links}>
              <NavLink to="/user" style={({isActive}) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
              <NavLink to="/admin" style={({isActive}) => isActive ? styles.activeLink : styles.link}>Admin</NavLink>
            
            </div>
          )}

          {isMobile && (
            <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <NavLink to="/user" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/admin" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Admin</NavLink>
           
          </div>
        )}

        {/* Content */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/user" element={<UserPanel />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContainer}>
            
            <div style={styles.footerLeft}>
              <h3 style={styles.footerLogo}>Powered By: Revanth-Revv</h3>
              <p style={styles.footerText}>
                Simple music. Clean experience.
              </p>
            </div>

            <div style={styles.footerRight}>
              <NavLink to="/user" style={styles.footerLink}>Home</NavLink>
              <NavLink to="/admin" style={styles.footerLink}>Admin</NavLink>
              <NavLink to="/ai" style={styles.footerLink}>AI</NavLink>
            </div>

          </div>

          <div style={styles.footerBottom}>
            © {new Date().getFullYear()} Revanth-Revv
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

const styles = {
  appWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#ffffff",
  },

  /* NAVBAR */
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    borderBottom: "2px solid #4da6ff",
    zIndex: 1000,
  },

  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ff4fa3",
  },

  links: {
    display: "flex",
    gap: "30px",
  },

  link: {
    textDecoration: "none",
    color: "#4da6ff",
    fontWeight: "500",
  },

  activeLink: {
    textDecoration: "none",
    color: "#ff4fa3",
    fontWeight: "600",
  },

  hamburger: {
    fontSize: "26px",
    cursor: "pointer",
    color: "#4da6ff",
  },

  mobileMenu: {
    position: "fixed",
    top: "70px",
    right: 0,
    width: "220px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "20px",
    borderLeft: "2px solid #4da6ff",
  },

  mobileLink: {
    textDecoration: "none",
    color: "#4da6ff",
    fontWeight: "500",
  },

  content: {
    flex: 1,
    paddingTop: "90px",
  },

  /* FOOTER */
  footer: {
    backgroundColor: "#ffffff",
    borderTop: "2px solid #4da6ff",
    padding: "40px 5% 20px",
  },

  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },

  footerLeft: {
    minWidth: "200px",
  },

  footerLogo: {
    margin: 0,
  
     color: "#000000",
    fontWeight: "700",
  },

  footerText: {
    marginTop: "8px",
    fontSize: "14px",
     color: " #4da6ff",
  },

  footerRight: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  footerLink: {
    textDecoration: "none",
       color: "#ff4fa3",
    fontSize: "14px",
    fontWeight: "500",
  },

  footerBottom: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "13px",
    color: "#999",
  },
};

export default App;