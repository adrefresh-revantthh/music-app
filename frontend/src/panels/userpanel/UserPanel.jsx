import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { useTheme } from "../../App";
import {
  FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaHeart, FaSearch,
  FaVolumeUp, FaVolumeMute, FaTimes, FaHome, FaMusic, FaFire, FaListUl, FaPlus,
  FaMoon, FaTrash, FaCheck, FaStar, FaUser, FaPen, FaDownload, FaMobileAlt,
} from "react-icons/fa";

const API = "https://music-app-f9t7.onrender.com/api";
let _cache = null;
let _promise = null;
function fetchSongs() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(`${API}/`).then(r => r.json()).then(d => { _cache = d; return d; });
  return _promise;
}

// ── localStorage helpers ──
const loadJSON = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const genId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

// true Fisher–Yates shuffle — unbiased, and (unlike re-rolling a random
// index every time) never clusters the same handful of songs together
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SLEEP_PRESETS = [10, 15, 30, 45, 60];

// ── Skeleton components ──
const SkelCard = ({ C }) => (
  <div style={{ borderRadius:12, overflow:"hidden", background:C.card, border:`1px solid ${C.border}` }}>
    <div style={{ width:"100%", aspectRatio:"1", background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
    <div style={{ padding:"10px 12px" }}>
      <div style={{ height:12, borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:6 }}/>
      <div style={{ height:10, width:"60%", borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
    </div>
  </div>
);

const SkelRow = ({ C }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 10px", borderRadius:10 }}>
    <div style={{ width:22, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
    <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
    <div style={{ flex:1 }}>
      <div style={{ height:12, borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:6, width:"70%" }}/>
      <div style={{ height:10, borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", width:"45%" }}/>
    </div>
  </div>
);

const SkelMini = ({ C }) => (
  <div style={{ flexShrink:0, width:120 }}>
    <div style={{ width:120, height:120, borderRadius:10, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:8 }}/>
    <div style={{ height:11, borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:4 }}/>
    <div style={{ height:10, width:"60%", borderRadius:4, background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
  </div>
);

// ── SongRow / AlbumCard live at module scope (not re-declared inside
// UserPanel's render). Playback progress updates ~60x/sec via the rAF
// loop below; if these were declared inline they'd get a brand-new
// component identity on every single tick, forcing React to unmount +
// remount every row/card each frame — which is what was eating clicks on
// the heart/+ buttons ("not clicking at all"). memo() also skips re-render
// when nothing relevant changed. ──
const SongRow = memo(function SongRow({ song, list, index, showAdd = true, player }) {
  const { C, currentId, isPlaying, isFav, toggleFav, playSong, openPlayer, onAdd } = player;
  const active = currentId === song._id;
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 10px", borderRadius:10, cursor:"pointer", background:active?C.accentDim:"transparent", transition:"background 0.15s" }} onClick={() => { playSong(song,list); openPlayer(); }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
        <div style={{ width:22, textAlign:"center", fontSize:12, color:C.muted, flexShrink:0, fontFamily:"monospace" }}>{active && isPlaying ? <span style={{ color:C.accent }}>▶</span> : index+1}</div>
        <img src={song.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
        <div style={{ minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:active?C.accent:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:200, display:"flex", alignItems:"center", gap:6 }}>
            {song.title}
            {song.isFeatured && <FaStar size={9} color={C.accent} title="Featured"/>}
          </div>
          <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{song.artist}</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:2, flexShrink:0 }}>
        <span style={{ fontSize:11, color:C.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:100, marginRight:6 }} className="sat">{song.album}</span>
        {showAdd && (
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:9, display:"flex", borderRadius:"50%" }} title="Add to playlist" onClick={e => { e.stopPropagation(); onAdd(song); }}><FaPlus size={15} color={C.muted}/></button>
        )}
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:9, display:"flex", borderRadius:"50%" }} title="Favorite" onClick={e => toggleFav(song,e)}><FaHeart size={18} color={isFav(song._id)?C.accent:C.muted}/></button>
      </div>
    </div>
  );
});

const AlbumCard = memo(function AlbumCard({ name, songsInAlbum, player }) {
  const { C, playAlbum, openAlbum } = player;
  return (
    <div style={{ cursor:"pointer", borderRadius:12, overflow:"hidden", background:C.card, border:`1px solid ${C.border}` }} onClick={() => openAlbum(name)}>
      <div style={{ position:"relative" }}>
        <img src={songsInAlbum[0]?.imageUrl} alt={name} style={{ width:"100%", aspectRatio:"1", objectFit:"cover", display:"block" }} loading="lazy"/>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}
          onClick={e => { e.stopPropagation(); playAlbum(name); }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:C.accent, display:"flex", alignItems:"center", justifyContent:"center" }}><FaPlay size={14} color="#0f0f0f"/></div>
        </div>
      </div>
      <div style={{ padding:"10px 12px 4px", fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:C.text }}>{name}</div>
      <div style={{ padding:"0 12px 10px", fontSize:11, color:C.sub }}>{songsInAlbum.length} tracks</div>
    </div>
  );
});

export default function UserPanel() {
  const { C } = useTheme();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => loadJSON("vo_favs", []));
  const [playerOpen, setPlayerOpen] = useState(false);
  const [recent, setRecent] = useState([]);

  // ── visitor identity (name-only prompt -> localStorage id) ──
  const [user, setUser] = useState(() => loadJSON("vo_user", null));
  const [nameInput, setNameInput] = useState("");
  const [nameEditing, setNameEditing] = useState(false);
  const [nameEditValue, setNameEditValue] = useState("");

  // ── "download the app" (PWA install) prompt ──
  const [installEvent, setInstallEvent] = useState(null);   // captured beforeinstallprompt event
  const [showInstallStep, setShowInstallStep] = useState(false); // shown right after name entry
  const [installedFlag, setInstalledFlag] = useState(false);

  // ── playlists (fully local, scoped to this browser's generated id) ──
  const [playlists, setPlaylists] = useState(() => loadJSON("vo_playlists", []));
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [addMenuSong, setAddMenuSong] = useState(null); // song currently showing "add to playlist" picker

  // ── sleep timer ──
  const [sleepMenuOpen, setSleepMenuOpen] = useState(false);
  const [sleepEndAt, setSleepEndAt] = useState(null);
  const [sleepRemaining, setSleepRemaining] = useState(0);
  const sleepTimeoutRef = useRef(null);

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    fetchSongs().then(d => { setSongs(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const tick = () => { if (audioRef.current && !audioRef.current.paused) setCurrentTime(audioRef.current.currentTime); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => { localStorage.setItem("vo_playlists", JSON.stringify(playlists)); }, [playlists]);

  // ── PWA install prompt ──
  // We capture Chrome's beforeinstallprompt as early as possible (mount)
  // and call preventDefault() on it, which suppresses the browser's own
  // automatic install banner so we can show it ourselves at a moment we
  // choose (right after the name is entered) instead of whenever Chrome
  // feels like it.
  useEffect(() => {
    const onBeforeInstall = (e) => { e.preventDefault(); setInstallEvent(e); };
    const onInstalled = () => { setInstallEvent(null); setInstalledFlag(true); setShowInstallStep(false); };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const isStandalone = () => {
    try { return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator?.standalone === true; }
    catch { return false; }
  };

  const installApp = async () => {
    if (!installEvent) { setShowInstallStep(false); return; }
    try {
      installEvent.prompt();
      await installEvent.userChoice;
    } catch {}
    setInstallEvent(null);
    setShowInstallStep(false);
  };

  const albums = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
  const albumNames = Object.keys(albums);
  const featured = songs.filter(s => s.isFeatured);

  const playSong = useCallback((song, list) => {
    if (list) setQueue(list);
    setCurrentSong(song); setIsPlaying(true);
    setRecent(prev => [song, ...prev.filter(s => s._id !== song._id)].slice(0, 12));
  }, []);

  // ── FIXED: fully reset + reload the media element before playing a new
  // track, and only call play() once the browser reports it's actually
  // ready (canplay). This is what was causing "time keeps going but no
  // sound" on the 2nd+ track — play() was racing an in-flight src swap. ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    let cancelled = false;

    audio.pause();
    setCurrentTime(0);
    setDuration(0);
    try { audio.currentTime = 0; } catch {}
    audio.src = currentSong.audioUrl;
    audio.volume = isMuted ? 0 : volume;
    audio.load();

    const tryPlay = () => {
      if (cancelled) return;
      if (isPlaying) {
        const p = audio.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    };
    audio.addEventListener("canplay", tryPlay, { once: true });
    return () => { cancelled = true; audio.removeEventListener("canplay", tryPlay); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume; }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else {
      const p = audioRef.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      setIsPlaying(true);
    }
  };

  const navigate = (dir) => {
    if (!queue.length || !currentSong) return;
    const idx = queue.findIndex(s => s._id === currentSong._id);
    let next;
    if (dir==="next") {
      if (isShuffle && queue.length > 1) {
        // random, but never immediately repeats the song that's playing
        let randIdx;
        do { randIdx = Math.floor(Math.random()*queue.length); } while (randIdx === idx);
        next = queue[randIdx];
      } else {
        next = isShuffle ? queue[0] : queue[(idx+1)%queue.length];
      }
    } else next = queue[(idx-1+queue.length)%queue.length];
    playSong(next, queue);
  };

  const handleEnded = () => { if (isRepeat && audioRef.current) { audioRef.current.currentTime=0; audioRef.current.play().catch(()=>{}); } else navigate("next"); };
  const handleError = () => { if (currentSong) navigate("next"); };
  const seek = (val) => { if (audioRef.current) { audioRef.current.currentTime=val; setCurrentTime(val); } };

  // ── LOCK SCREEN / OS MEDIA CONTROLS (MediaSession API) ──
  // Shows title/artist/artwork on the lock screen + notification shade,
  // and wires the hardware/lock-screen play, pause, next & prev buttons
  // back into the same controls used inside the app.
  useEffect(() => {
    if (!("mediaSession" in navigator) || !currentSong) return;
    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: currentSong.imageUrl ? [
          { src: currentSong.imageUrl, sizes: "96x96",   type: "image/jpeg" },
          { src: currentSong.imageUrl, sizes: "256x256", type: "image/jpeg" },
          { src: currentSong.imageUrl, sizes: "512x512", type: "image/jpeg" },
        ] : [],
      });
    } catch {}
  }, [currentSong]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    // set() is forgiving — some browsers throw for handler names they
    // don't recognize, so each call gets its own try/catch instead of one
    // big one (a single failure shouldn't wipe out the rest).
    const set = (action, handler) => { try { navigator.mediaSession.setActionHandler(action, handler); } catch {} };

    set("play", () => {
      if (!audioRef.current) return;
      const p = audioRef.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      setIsPlaying(true);
    });
    set("pause", () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    });
    set("previoustrack", () => navigate("prev"));
    set("nexttrack", () => navigate("next"));
    // Explicitly mark seek-by-10s as unsupported. Chrome otherwise
    // synthesizes its own default seekbackward/seekforward buttons on the
    // lock screen notification (the extra ◀◀ / ▶▶ next to prev/next) —
    // passing null (not just omitting the call) is what actually hides them.
    set("seekbackward", null);
    set("seekforward", null);
    set("seekto", null);
    set("stop", null);

    return () => {
      set("play", null);
      set("pause", null);
      set("previoustrack", null);
      set("nexttrack", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, currentSong, isShuffle, isRepeat]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    try { navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused"; } catch {}
  }, [isPlaying]);

  const toggleFav = (song, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = prev.find(s => s._id===song._id) ? prev.filter(s => s._id!==song._id) : [...prev, song];
      localStorage.setItem("vo_favs", JSON.stringify(next));
      return next;
    });
  };

  const isFav = id => favorites.some(s => s._id===id);
  const fmt = t => { if (!t||isNaN(t)) return "0:00"; return `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`; };
  const progress = duration ? (currentTime/duration)*100 : 0;
  const searchResults = search.trim() ? songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()) || s.album.toLowerCase().includes(search.toLowerCase())) : [];
  const playAlbum = (name) => { const list=albums[name]||[]; if (list.length) playSong(list[0],list); };
  // Draws from the entire catalog (every album/playlist combined, not
  // just whatever you're currently browsing), true-shuffles the whole
  // thing with Fisher–Yates, and turns shuffle mode on so every next/prev
  // afterwards keeps feeling random instead of settling into album order.
  const playRandom = () => {
    if (!songs.length) return;
    const shuffled = shuffleArray(songs);
    // don't let the "random" pick land on the song already playing
    if (currentSong && shuffled.length > 1 && shuffled[0]._id === currentSong._id) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    setIsShuffle(true);
    playSong(shuffled[0], shuffled);
    setPlayerOpen(true);
  };

  // ── name prompt ──
  const submitName = () => {
    if (!nameInput.trim()) return;
    const u = { name: nameInput.trim(), id: genId() };
    localStorage.setItem("vo_user", JSON.stringify(u));
    setUser(u);
    if (!isStandalone()) setShowInstallStep(true);
  };

  // ── edit name (from Profile) ──
  const startEditName = () => { setNameEditValue(user?.name || ""); setNameEditing(true); };
  const saveEditName = () => {
    const trimmed = nameEditValue.trim();
    if (!trimmed) { setNameEditing(false); return; }
    const u = { ...user, name: trimmed };
    localStorage.setItem("vo_user", JSON.stringify(u));
    setUser(u);
    setNameEditing(false);
  };

  // ── playlists ──
  const createPlaylist = (name) => {
    const trimmed = (name ?? newPlaylistName).trim();
    if (!trimmed) return null;
    const pl = { id: genId(), name: trimmed, songIds: [] };
    setPlaylists(prev => [pl, ...prev]);
    setNewPlaylistName(""); setShowNewPlaylist(false);
    return pl;
  };
  const deletePlaylist = (id) => { setPlaylists(prev => prev.filter(p => p.id!==id)); if (selectedPlaylist?.id===id) setSelectedPlaylist(null); };
  const isInPlaylist = (pl, songId) => pl.songIds.includes(songId);
  const togglePlaylistSong = (playlistId, song) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id !== playlistId) return p;
      const has = p.songIds.includes(song._id);
      return { ...p, songIds: has ? p.songIds.filter(id => id!==song._id) : [...p.songIds, song._id] };
    }));
  };
  const playlistSongs = (pl) => pl.songIds.map(id => songs.find(s => s._id===id)).filter(Boolean);
  const playPlaylist = (pl) => { const list = playlistSongs(pl); if (list.length) playSong(list[0], list); };

  useEffect(() => {
    if (selectedPlaylist) {
      const fresh = playlists.find(p => p.id === selectedPlaylist.id);
      if (fresh) setSelectedPlaylist(fresh); else setSelectedPlaylist(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlists]);

  // ── sleep timer ──
  useEffect(() => {
    if (!sleepEndAt) { setSleepRemaining(0); return; }
    const iv = setInterval(() => {
      const rem = Math.max(0, sleepEndAt - Date.now());
      setSleepRemaining(rem);
      if (rem <= 0) clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, [sleepEndAt]);

  const setSleepTimer = (minutes) => {
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
    if (!minutes) { setSleepEndAt(null); setSleepMenuOpen(false); return; }
    const endAt = Date.now() + minutes*60*1000;
    setSleepEndAt(endAt);
    sleepTimeoutRef.current = setTimeout(() => {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      setSleepEndAt(null);
    }, minutes*60*1000);
    setSleepMenuOpen(false);
  };
  const sleepFmt = (ms) => { const s = Math.ceil(ms/1000); return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`; };

  // Stable-shaped bag of everything SongRow/AlbumCard need from this
  // render, so call sites stay simple. The individual functions inside
  // are recreated each render (cheap), but the *components* themselves
  // no longer are — that's what fixes the click issue.
  const player = {
    C,
    currentId: currentSong?._id,
    isPlaying,
    isFav,
    toggleFav,
    playSong,
    openPlayer: () => setPlayerOpen(true),
    onAdd: (song) => setAddMenuSong(song),
    playAlbum,
    openAlbum: (name) => { setSelectedAlbum(name); setTab("albums"); },
  };

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, paddingBottom:130 }}>

      {/* ── NAME PROMPT (first visit) ── */}
      {!user && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ width:"100%", maxWidth:360, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"32px 28px", animation:"fadeUp 0.3s ease" }}>
            <div style={{ width:48, height:48, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
              <FaMusic size={20} color={C.accent}/>
            </div>
            <h2 className="brand-font" style={{ fontSize:26, fontWeight:700, color:C.text, marginBottom:6 }}>Welcome to Loopz</h2>
            <p style={{ fontSize:13, color:C.sub, marginBottom:20 }}>What should we call you?</p>
            <form onSubmit={e => { e.preventDefault(); submitName(); }}>
              <input autoFocus style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card, marginBottom:16 }} placeholder="Your name" value={nameInput} onChange={e => setNameInput(e.target.value)}/>
              <button type="submit" style={{ width:"100%", padding:13, borderRadius:12, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Let's go →</button>
            </form>
          </div>
        </div>
      )}

      {/* ── DOWNLOAD APP (PWA install) — shown right after the name is entered ── */}
      {user && showInstallStep && (
        <div style={{ position:"fixed", inset:0, zIndex:1900, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ width:"100%", maxWidth:360, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"32px 28px", animation:"fadeUp 0.3s ease", textAlign:"center" }}>
            <div style={{ width:56, height:56, borderRadius:16, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, marginLeft:"auto", marginRight:"auto" }}>
              <FaMobileAlt size={24} color={C.accent}/>
            </div>
            <h2 className="brand-font" style={{ fontSize:24, fontWeight:700, color:C.text, marginBottom:8 }}>Get the Loopz app</h2>
            {installEvent ? (
              <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>Install Loopz on this device — no app store needed. Works offline-ready, opens instantly, feels native.</p>
            ) : (
              <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>Your browser doesn't support one-tap install here. On iPhone: tap the Share icon, then "Add to Home Screen."</p>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {installEvent && (
                <button style={{ width:"100%", padding:13, borderRadius:12, border:"none", background:C.accent, color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }} onClick={installApp}>
                  <FaDownload size={13}/> Download App
                </button>
              )}
              <button style={{ width:"100%", padding:13, borderRadius:12, border:`1px solid ${C.border}`, background:"none", color:C.sub, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => setShowInstallStep(false)}>
                {installEvent ? "Not now" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD TO PLAYLIST MODAL ── */}
      {addMenuSong && (
        <div style={{ position:"fixed", inset:0, zIndex:1500, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setAddMenuSong(null)}>
          <div style={{ width:"100%", maxWidth:340, background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:24 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:4 }}>Add to Playlist</h3>
            <p style={{ fontSize:12, color:C.sub, marginBottom:16, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{addMenuSong.title}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:4, maxHeight:220, overflowY:"auto", marginBottom:14 }}>
              {playlists.length === 0 && <p style={{ fontSize:12, color:C.muted, textAlign:"center", padding:"12px 0" }}>No playlists yet.</p>}
              {playlists.map(pl => (
                <button key={pl.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:10, border:`1px solid ${C.border}`, background:isInPlaylist(pl, addMenuSong._id)?C.accentDim:"none", color:C.text, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }}
                  onClick={() => togglePlaylistSong(pl.id, addMenuSong)}>
                  <span>{pl.name}</span>
                  {isInPlaylist(pl, addMenuSong._id) && <FaCheck size={12} color={C.accent}/>}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input style={{ flex:1, padding:"10px 12px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:13, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.bg }} placeholder="New playlist name" value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter") { const pl = createPlaylist(); if (pl) togglePlaylistSong(pl.id, addMenuSong); } }}/>
              <button style={{ padding:"10px 14px", borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }}
                onClick={() => { const pl = createPlaylist(); if (pl) togglePlaylistSong(pl.id, addMenuSong); }}>Add</button>
            </div>
            <button style={{ width:"100%", marginTop:14, padding:"10px", borderRadius:10, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={() => setAddMenuSong(null)}>Done</button>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, background:C.surface, borderTop:`1px solid ${C.border}`, display:"flex", height:60 }}>
        {[
          { id:"home",      icon:<FaHome size={16}/>,    label:"Home" },
          { id:"albums",    icon:<FaMusic size={16}/>,   label:"Albums" },
          { id:"search",    icon:<FaSearch size={16}/>,  label:"Search" },
          { id:"playlists", icon:<FaListUl size={16}/>,  label:"Playlists" },
          { id:"favs",      icon:<FaHeart size={16}/>,   label:"Favorites" },
          { id:"profile",   icon:<FaUser size={16}/>,    label:"Profile" },
        ].map(t => (
          <button key={t.id} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, background:"none", border:"none", cursor:"pointer", color:tab===t.id?C.accent:C.muted, fontSize:11 }}
            onClick={() => { setTab(t.id); setSelectedAlbum(null); setSelectedPlaylist(null); }}>
            {t.icon}
            <span style={{ fontSize:9.5, fontWeight:600, letterSpacing:0.2 }}>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"24px 16px" }}>

        {/* ── LOADING SKELETONS ── */}
        {loading && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:C.surface, borderRadius:16, padding:"28px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, marginBottom:8, border:`1px solid ${C.border}` }}>
              <div style={{ flex:1 }}>
                <div style={{ width:120, height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:12 }}/>
                <div style={{ width:180, height:32, borderRadius:6, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:12 }}/>
                <div style={{ width:"80%", height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:20 }}/>
                <div style={{ display:"flex", gap:10 }}>
                  <div style={{ width:100, height:36, borderRadius:30, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
                  <div style={{ width:80, height:36, borderRadius:30, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
                </div>
              </div>
              <div style={{ width:100, height:100, borderRadius:"50%", background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
            </div>
            <div style={{ marginTop:36 }}>
              <div style={{ width:160, height:14, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:16 }}/>
              <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:4 }}>
                {[...Array(5)].map((_,i) => <SkelMini key={i} C={C}/>)}
              </div>
            </div>
            <div style={{ marginTop:36 }}>
              <div style={{ width:80, height:14, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", marginBottom:16 }}/>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                {[...Array(8)].map((_,i) => <SkelCard key={i} C={C}/>)}
              </div>
            </div>
          </div>
        )}

        {/* ── HOME ── */}
        {!loading && tab==="home" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:`linear-gradient(135deg,${C.surface},${C.card})`, borderRadius:16, padding:"28px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, marginBottom:8, border:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:11, color:C.accent, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Hey {user?.name ? user.name.toUpperCase() : "THERE"}</div>
                <h1 className="brand-font" style={{ fontSize:46, fontWeight:700, letterSpacing:"0", lineHeight:1.1, marginBottom:8, color:C.text }}>Loopz</h1>
                <p style={{ fontSize:14, color:C.sub, marginBottom:20, textTransform:"uppercase", letterSpacing:1.5, fontWeight:600 }}>Live Louder</p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <button style={{ padding:"9px 20px", borderRadius:30, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={playRandom}>🎲 Random</button>
                  <button style={{ padding:"9px 20px", borderRadius:30, border:`1px solid ${C.border}`, background:"none", color:C.sub, fontWeight:500, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => setTab("albums")}>Browse →</button>
                </div>
              </div>
              {currentSong && (
                <div style={{ flexShrink:0, cursor:"pointer" }} onClick={() => setPlayerOpen(true)}>
                  <img src={currentSong.imageUrl} alt="" style={{ width:100, height:100, borderRadius:"50%", objectFit:"cover", border:`2px solid ${C.border}`, ...(isPlaying?{animation:"spin 12s linear infinite"}:{}) }}/>
                </div>
              )}
            </div>

            {recent.length > 0 && (
              <section style={{ marginTop:36 }}>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:C.text }}><FaFire size={14} style={{ color:C.accent }}/> Recently Played</h2>
                <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:4 }}>
                  {recent.map(s => (
                    <div key={s._id} style={{ flexShrink:0, width:120, cursor:"pointer" }} onClick={() => { playSong(s,songs); setPlayerOpen(true); }}>
                      <img src={s.imageUrl} alt="" style={{ width:120, height:120, borderRadius:10, objectFit:"cover", display:"block", marginBottom:8 }} loading="lazy"/>
                      <div style={{ fontSize:12, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:C.text }}>{s.title}</div>
                      <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {featured.length > 0 && (
              <section style={{ marginTop:36 }}>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:C.text }}><FaStar size={13} style={{ color:C.accent }}/> Featured</h2>
                <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:4 }}>
                  {featured.map(s => (
                    <div key={s._id} style={{ flexShrink:0, width:120, cursor:"pointer" }} onClick={() => { playSong(s,featured); setPlayerOpen(true); }}>
                      <img src={s.imageUrl} alt="" style={{ width:120, height:120, borderRadius:10, objectFit:"cover", display:"block", marginBottom:8 }} loading="lazy"/>
                      <div style={{ fontSize:12, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:C.text }}>{s.title}</div>
                      <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {favorites.length > 0 && (
              <section style={{ marginTop:36 }}>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:C.text }}><FaHeart size={12} style={{ color:C.accent }}/> Favorites</h2>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                  {favorites.slice(0,5).map((s,i) => <SongRow key={s._id} song={s} list={favorites} index={i} player={player}/>)}
                  {favorites.length > 5 && <div style={{ fontSize:13, color:C.accent, cursor:"pointer", padding:"10px 0", textAlign:"center" }} onClick={() => setTab("favs")}>See all {favorites.length} →</div>}
                </div>
              </section>
            )}

            {playlists.length > 0 && (
              <section style={{ marginTop:36 }}>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:C.text }}><FaListUl size={12} style={{ color:C.accent }}/> Your Playlists</h2>
                <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:4 }}>
                  {playlists.map(pl => (
                    <div key={pl.id} style={{ flexShrink:0, width:140, cursor:"pointer", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:14 }} onClick={() => { setSelectedPlaylist(pl); setTab("playlists"); }}>
                      <div style={{ width:"100%", aspectRatio:"1", borderRadius:8, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><FaListUl size={22} color={C.accent}/></div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pl.name}</div>
                      <div style={{ fontSize:11, color:C.sub }}>{pl.songIds.length} song{pl.songIds.length!==1?"s":""}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section style={{ marginTop:36 }}>
              <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, color:C.text }}>Albums</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                {albumNames.map(n => <AlbumCard key={n} name={n} songsInAlbum={albums[n]} player={player}/>)}
              </div>
            </section>
          </div>
        )}

        {/* ── ALBUMS ── */}
        {!loading && tab==="albums" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            {selectedAlbum ? (
              <>
                <button style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:`1px solid ${C.border}`, color:C.sub, padding:"7px 16px", borderRadius:20, cursor:"pointer", fontSize:13, marginBottom:20, fontFamily:"'Outfit',sans-serif" }} onClick={() => setSelectedAlbum(null)}>← Albums</button>
                <div style={{ display:"flex", gap:20, marginBottom:24, alignItems:"flex-end", flexWrap:"wrap" }}>
                  <img src={albums[selectedAlbum][0]?.imageUrl} alt="" style={{ width:110, height:110, borderRadius:12, objectFit:"cover", flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:C.accent, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Album</div>
                    <h2 style={{ fontSize:22, fontWeight:700, marginBottom:4, color:C.text }}>{selectedAlbum}</h2>
                    <div style={{ fontSize:13, color:C.sub, marginBottom:14 }}>{albums[selectedAlbum].length} tracks</div>
                    <button style={{ padding:"9px 20px", borderRadius:30, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => { playAlbum(selectedAlbum); setPlayerOpen(true); }}>▶ Play All</button>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{albums[selectedAlbum].map((s,i) => <SongRow key={s._id} song={s} list={albums[selectedAlbum]} index={i} player={player}/>)}</div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20, color:C.text }}>Albums</h2>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                  {albumNames.map(n => <AlbumCard key={n} name={n} songsInAlbum={albums[n]} player={player}/>)}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── SEARCH ── */}
        {!loading && tab==="search" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, background:C.surface, borderRadius:12, padding:"12px 16px", border:`1px solid ${C.border}`, marginBottom:20 }}>
              <FaSearch color={C.muted} size={14}/>
              <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:15, color:C.text, fontFamily:"'Outfit',sans-serif" }} placeholder="Songs, artists, albums..." value={search} onChange={e => setSearch(e.target.value)} autoFocus/>
              {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => setSearch("")}><FaTimes size={13}/></button>}
            </div>
            {search ? (
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                {searchResults.length===0 ? <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No results for "{search}"</p> : searchResults.map((s,i) => <SongRow key={s._id} song={s} list={searchResults} index={i} player={player}/>)}
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                <div style={{ fontSize:12, color:C.muted, fontWeight:600, letterSpacing:1, textTransform:"uppercase", padding:"0 4px 12px" }}>All Songs ({songs.length})</div>
                {songs.map((s,i) => <SongRow key={s._id} song={s} list={songs} index={i} player={player}/>)}
              </div>
            )}
          </div>
        )}

        {/* ── PLAYLISTS ── */}
        {!loading && tab==="playlists" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            {selectedPlaylist ? (
              <>
                <button style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:`1px solid ${C.border}`, color:C.sub, padding:"7px 16px", borderRadius:20, cursor:"pointer", fontSize:13, marginBottom:20, fontFamily:"'Outfit',sans-serif" }} onClick={() => setSelectedPlaylist(null)}>← Playlists</button>
                <div style={{ display:"flex", gap:20, marginBottom:24, alignItems:"flex-end", flexWrap:"wrap" }}>
                  <div style={{ width:110, height:110, borderRadius:12, background:C.card, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FaListUl size={34} color={C.accent}/></div>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:C.accent, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Playlist</div>
                    <h2 style={{ fontSize:22, fontWeight:700, marginBottom:4, color:C.text }}>{selectedPlaylist.name}</h2>
                    <div style={{ fontSize:13, color:C.sub, marginBottom:14 }}>{selectedPlaylist.songIds.length} tracks</div>
                    <div style={{ display:"flex", gap:10 }}>
                      <button style={{ padding:"9px 20px", borderRadius:30, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => { playPlaylist(selectedPlaylist); setPlayerOpen(true); }}>▶ Play All</button>
                      <button style={{ padding:"9px 20px", borderRadius:30, border:`1px solid ${C.border}`, background:"none", color:C.error, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:6 }} onClick={() => deletePlaylist(selectedPlaylist.id)}><FaTrash size={11}/> Delete</button>
                    </div>
                  </div>
                </div>
                {playlistSongs(selectedPlaylist).length === 0
                  ? <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No songs yet — tap the + on any song to add it here.</p>
                  : <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{playlistSongs(selectedPlaylist).map((s,i) => <SongRow key={s._id} song={s} list={playlistSongs(selectedPlaylist)} index={i} player={player}/>)}</div>}
              </>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, gap:12, flexWrap:"wrap" }}>
                  <h2 style={{ fontSize:22, fontWeight:700, color:C.text }}>Playlists</h2>
                  <button style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:20, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => setShowNewPlaylist(v => !v)}><FaPlus size={11}/> New Playlist</button>
                </div>
                {showNewPlaylist && (
                  <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                    <input autoFocus style={{ flex:1, padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.surface }} placeholder="Playlist name" value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)} onKeyDown={e => { if (e.key==="Enter") createPlaylist(); }}/>
                    <button style={{ padding:"11px 20px", borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => createPlaylist()}>Create</button>
                  </div>
                )}
                {playlists.length === 0 ? (
                  <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No playlists yet. Create one to start collecting songs.</p>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                    {playlists.map(pl => (
                      <div key={pl.id} style={{ cursor:"pointer", borderRadius:12, overflow:"hidden", background:C.card, border:`1px solid ${C.border}`, padding:14 }} onClick={() => setSelectedPlaylist(pl)}>
                        <div style={{ width:"100%", aspectRatio:"1", borderRadius:8, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, position:"relative" }}>
                          <FaListUl size={26} color={C.accent}/>
                          <button style={{ position:"absolute", top:6, right:6, background:"rgba(0,0,0,0.5)", border:"none", borderRadius:6, padding:6, cursor:"pointer", display:"flex" }} onClick={e => { e.stopPropagation(); deletePlaylist(pl.id); }}><FaTrash size={10} color="#fff"/></button>
                        </div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pl.name}</div>
                        <div style={{ fontSize:11, color:C.sub }}>{pl.songIds.length} song{pl.songIds.length!==1?"s":""}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── FAVS ── */}
        {!loading && tab==="favs" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20, color:C.text }}>Favorites</h2>
            {favorites.length===0 ? <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No favorites yet. Tap ♥ on any song.</p> : (
              <>
                <button style={{ marginBottom:16, padding:"9px 20px", borderRadius:30, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => { playSong(favorites[0], favorites); setPlayerOpen(true); }}>▶ Play All</button>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{favorites.map((s,i) => <SongRow key={s._id} song={s} list={favorites} index={i} player={player}/>)}</div>
              </>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {!loading && tab==="profile" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20, color:C.text }}>Profile</h2>

            <div style={{ display:"flex", alignItems:"center", gap:16, background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:20, marginBottom:24 }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:C.accent, flexShrink:0 }}>
                {(user?.name || "?").trim().charAt(0).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                {nameEditing ? (
                  <div style={{ display:"flex", gap:8 }}>
                    <input autoFocus style={{ flex:1, padding:"8px 12px", borderRadius:8, border:`1px solid ${C.border}`, fontSize:15, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.bg }}
                      value={nameEditValue} onChange={e => setNameEditValue(e.target.value)}
                      onKeyDown={e => { if (e.key==="Enter") saveEditName(); if (e.key==="Escape") setNameEditing(false); }}/>
                    <button style={{ padding:"8px 14px", borderRadius:8, border:"none", background:C.accent, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={saveEditName}>Save</button>
                  </div>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ fontSize:19, fontWeight:700, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.name || "Anonymous"}</div>
                    <button style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", color:C.muted }} title="Edit name" onClick={startEditName}><FaPen size={13}/></button>
                  </div>
                )}
                <div style={{ fontSize:12, color:C.sub, marginTop:4 }}>{favorites.length} favorite{favorites.length!==1?"s":""} · {playlists.length} playlist{playlists.length!==1?"s":""}</div>
              </div>
            </div>

            {!isStandalone() && (
              <button style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"13px", borderRadius:12, border:`1px solid ${C.accentBorder}`, background:C.accentDim, color:C.accent, fontWeight:700, fontSize:13, cursor:installEvent?"pointer":"default", fontFamily:"'Outfit',sans-serif", marginBottom:28, opacity:installEvent?1:0.6 }}
                disabled={!installEvent} onClick={installApp}>
                <FaDownload size={13}/> {installedFlag ? "App installed" : installEvent ? "Download App" : "Install not available in this browser"}
              </button>
            )}

            <section style={{ marginBottom:32 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <h3 style={{ fontSize:15, fontWeight:700, color:C.text, display:"flex", alignItems:"center", gap:8 }}><FaHeart size={12} style={{ color:C.accent }}/> Favorites ({favorites.length})</h3>
                {favorites.length>0 && <span style={{ fontSize:12, color:C.accent, cursor:"pointer" }} onClick={() => setTab("favs")}>View all →</span>}
              </div>
              {favorites.length===0
                ? <p style={{ color:C.muted, fontSize:13, padding:"8px 0" }}>No favorites yet. Tap ♥ on any song.</p>
                : <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{favorites.slice(0,5).map((s,i) => <SongRow key={s._id} song={s} list={favorites} index={i} player={player}/>)}</div>}
            </section>

            <section>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <h3 style={{ fontSize:15, fontWeight:700, color:C.text, display:"flex", alignItems:"center", gap:8 }}><FaListUl size={12} style={{ color:C.accent }}/> Playlists ({playlists.length})</h3>
                {playlists.length>0 && <span style={{ fontSize:12, color:C.accent, cursor:"pointer" }} onClick={() => setTab("playlists")}>View all →</span>}
              </div>
              {playlists.length===0 ? (
                <p style={{ color:C.muted, fontSize:13, padding:"8px 0" }}>No playlists yet.</p>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                  {playlists.map(pl => (
                    <div key={pl.id} style={{ cursor:"pointer", borderRadius:12, overflow:"hidden", background:C.card, border:`1px solid ${C.border}`, padding:14 }} onClick={() => { setSelectedPlaylist(pl); setTab("playlists"); }}>
                      <div style={{ width:"100%", aspectRatio:"1", borderRadius:8, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}><FaListUl size={22} color={C.accent}/></div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pl.name}</div>
                      <div style={{ fontSize:11, color:C.sub }}>{pl.songIds.length} song{pl.songIds.length!==1?"s":""}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      {/* ── MINI PLAYER ── */}
      {currentSong && !playerOpen && (
        <div style={{ position:"fixed", bottom:60, left:0, right:0, zIndex:190, background:C.surface, borderTop:`1px solid ${C.border}`, padding:"10px 16px", display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => setPlayerOpen(true)}>
          <img src={currentSong.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover", flexShrink:0 }}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:C.text }}>{currentSong.title}</div>
            <div style={{ fontSize:11, color:C.sub }}>{currentSong.artist}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:0 }} onClick={e => e.stopPropagation()}>
            <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", borderRadius:"50%" }} title="Add to playlist" onClick={() => setAddMenuSong(currentSong)}><FaPlus size={13} color={C.muted}/></button>
            <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex", borderRadius:"50%" }} title="Favorite" onClick={e => toggleFav(currentSong,e)}><FaHeart size={15} color={isFav(currentSong._id)?C.accent:C.muted}/></button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }} onClick={e => e.stopPropagation()}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.sub, padding:6, display:"flex" }} onClick={() => navigate("prev")}><FaBackward size={13}/></button>
            <button style={{ width:50, height:30, borderRadius:"10%", background:C.accent, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#0f0f0f" }} onClick={togglePlay}>{isPlaying?<FaPause size={20}/>:<FaPlay size={20}/>}</button>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.sub, padding:6, display:"flex" }} onClick={() => navigate("next")}><FaForward size={13}/></button>
          </div>
        </div>
      )}

      {/* ── FULL PLAYER ── */}
      {playerOpen && currentSong && (
        <div style={{ position:"fixed", inset:0, zIndex:500, background:C.bg, overflowY:"auto", display:"flex", flexDirection:"column", padding:"0 0 40px", marginTop:"50px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px" }}>
            <button style={{ background:"gray", border:`1px solid ${C.border}`, color:"black", width:76, height:36, borderRadius:"4px", cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={() => setPlayerOpen(false)}>Back</button>
            <span style={{ fontSize:12, fontWeight:600, color:C.muted, letterSpacing:1, textTransform:"uppercase" }}>Now Playing</span>
            <div style={{ display:"flex", alignItems:"center" }}>
              <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex" }} title="Add to playlist" onClick={() => setAddMenuSong(currentSong)}><FaPlus size={14} color={C.muted}/></button>
              <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex" }} title="Favorite" onClick={() => toggleFav(currentSong)}><FaHeart size={16} color={isFav(currentSong._id)?C.accent:C.muted}/></button>
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"center", padding:"10px 40px 24px" }}>
            <img src={currentSong.imageUrl} alt="" style={{ width:"min(240px,60vw)", height:"min(240px,60vw)", borderRadius:"50%", objectFit:"cover", border:`3px solid ${C.border}`, ...(isPlaying?{animation:"spin 12s linear infinite"}:{}) }}/>
          </div>

          <div style={{ textAlign:"center", padding:"0 24px 20px" }}>
            <div style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.02em", marginBottom:4, color:C.text }}>{currentSong.title}</div>
            <div style={{ fontSize:15, color:C.sub, marginBottom:4 }}>{currentSong.artist}</div>
            <div style={{ fontSize:12, color:C.accent, fontWeight:600 }}>{currentSong.album}</div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 24px 20px" }}>
            <span style={{ fontSize:11, color:C.muted, width:34, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{fmt(currentTime)}</span>
            <input type="range" min={0} max={duration||0} value={currentTime} onChange={e => seek(+e.target.value)} style={{ flex:1, accentColor:C.accent, background:`linear-gradient(to right,${C.accent} ${progress}%,${C.border} ${progress}%)` }}/>
            <span style={{ fontSize:11, color:C.muted, width:34, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{fmt(duration)}</span>
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:22, padding:"0 24px 16px" }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:isShuffle?C.accent:C.muted, padding:8, display:"flex", borderRadius:8 }} onClick={() => setIsShuffle(!isShuffle)}><FaRandom size={15}/></button>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.sub, padding:10, display:"flex" }} onClick={() => navigate("prev")}><FaBackward size={18}/></button>
            <button style={{ width:60, height:60, borderRadius:"50%", background:C.accent, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#0f0f0f" }} onClick={togglePlay}>{isPlaying?<FaPause size={20}/>:<FaPlay size={20}/>}</button>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.sub, padding:10, display:"flex" }} onClick={() => navigate("next")}><FaForward size={18}/></button>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:isRepeat?C.accent:C.muted, padding:8, display:"flex", borderRadius:8 }} onClick={() => setIsRepeat(!isRepeat)}><FaRedo size={15}/></button>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 28px 10px", maxWidth:320, margin:"0 auto", width:"100%" }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, padding:8, display:"flex" }} onClick={() => setIsMuted(!isMuted)}>{isMuted?<FaVolumeMute size={14}/>:<FaVolumeUp size={14}/>}</button>
            <input type="range" min={0} max={1} step={0.01} value={isMuted?0:volume} onChange={e => { setVolume(+e.target.value); setIsMuted(false); }} style={{ flex:1, accentColor:C.accent }}/>
          </div>

          {/* ── SLEEP TIMER ── */}
          <div style={{ display:"flex", justifyContent:"center", padding:"6px 24px 20px", position:"relative" }}>
            <button style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:20, border:`1px solid ${sleepEndAt?C.accentBorder:C.border}`, background:sleepEndAt?C.accentDim:"none", color:sleepEndAt?C.accent:C.sub, cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'Outfit',sans-serif" }}
              onClick={() => setSleepMenuOpen(v => !v)}>
              <FaMoon size={12}/> {sleepEndAt ? `Sleep in ${sleepFmt(sleepRemaining)}` : "Sleep Timer"}
            </button>
            {sleepMenuOpen && (
              <>
                <div style={{ position:"fixed", inset:0, zIndex:598 }} onClick={() => setSleepMenuOpen(false)}/>
                <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", zIndex:599, background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:8, display:"flex", flexDirection:"column", gap:2, minWidth:150, boxShadow:"0 12px 40px rgba(0,0,0,0.5)" }}>
                  {SLEEP_PRESETS.map(m => (
                    <button key={m} style={{ padding:"9px 14px", borderRadius:8, border:"none", background:"none", color:C.text, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif", textAlign:"left" }} onClick={() => setSleepTimer(m)}>{m} minutes</button>
                  ))}
                  {sleepEndAt && <button style={{ padding:"9px 14px", borderRadius:8, border:"none", background:"none", color:C.error, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif", textAlign:"left" }} onClick={() => setSleepTimer(0)}>Turn off</button>}
                </div>
              </>
            )}
          </div>

          {queue.length > 1 && (() => {
            const idx = queue.findIndex(s => s._id===currentSong._id);
            const upNext = queue.slice(idx+1, idx+4);
            return upNext.length > 0 ? (
              <div style={{ padding:"0 20px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.muted, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Up Next</div>
                {upNext.map(s => (
                  <div key={s._id} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", cursor:"pointer", borderBottom:`1px solid ${C.border}` }} onClick={() => playSong(s,queue)}>
                    <img src={s.imageUrl} alt="" style={{ width:38, height:38, borderRadius:6, objectFit:"cover" }} loading="lazy"/>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{s.title}</div>
                      <div style={{ fontSize:11, color:C.sub }}>{s.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null;
          })()}
        </div>
      )}

      <audio ref={audioRef} onLoadedMetadata={() => setDuration(audioRef.current?.duration||0)} onEnded={handleEnded} onError={handleError}/>
    </div>
  );
}
