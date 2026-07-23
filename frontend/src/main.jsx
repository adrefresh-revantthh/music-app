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

// Register the service worker. This is required for Chrome to consider the
// site installable at all (no service worker = beforeinstallprompt never
// fires, which is why "install not available" was showing).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
