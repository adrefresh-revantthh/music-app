import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Capture the PWA install prompt as early as physically possible — before
// React even mounts — and stash it on window. This avoids a race where
// Chrome fires beforeinstallprompt before UserPanel's own listener has
// attached (it happened intermittently, especially on a fast first load).
// UserPanel checks window.__loopzInstallPrompt on mount in addition to
// listening for the live event.
window.__loopzInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__loopzInstallPrompt = e;
});

// Register the service worker — PRODUCTION BUILDS ONLY.
//
// This is required for Chrome to consider the site installable at all (no
// service worker = beforeinstallprompt never fires, which is why "install
// not available" was showing). But on the Vite dev server it causes a much
// worse problem: the SW can serve a cached old JS bundle even after the
// source file changes, making it look like edits "aren't taking effect"
// even when they are. So: register it in prod, and actively clean up any
// SW that may have already been registered from earlier local testing so
// dev mode stops being haunted by a stale cache.
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  } else {
    // dev mode: unregister anything already there and clear caches it made
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    }).catch(() => {});
    if (window.caches) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
    }
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
