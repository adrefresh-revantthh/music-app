import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Icons (inline SVG to avoid import issues) ───────────────────────────────
const Icon = {
  Play: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  ),
  Pause: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
    </svg>
  ),
  PlaySm: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
  ),
  PauseSm: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
    </svg>
  ),
  Prev: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="3" height="16" rx="1"/>
    </svg>
  ),
  Next: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,4 15,12 5,20"/><rect x="16" y="4" width="3" height="16" rx="1"/>
    </svg>
  ),
  PrevSm: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="3" height="16" rx="1"/>
    </svg>
  ),
  NextSm: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,4 15,12 5,20"/><rect x="16" y="4" width="3" height="16" rx="1"/>
    </svg>
  ),
  Shuffle: ({ active }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#ff6b35" : "#5a5f7a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,3 21,3 21,8"/><line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21,16 21,21 16,21"/><line x1="4" y1="4" x2="9" y2="9"/>
    </svg>
  ),
  Repeat: ({ active }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#ff6b35" : "#5a5f7a"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17,1 21,5 17,9"/><path d="M3,11V9a4,4,0,0,1,4-4h14"/>
      <polyline points="7,23 3,19 7,15"/><path d="M21,13v2a4,4,0,0,1-4,4H3"/>
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#ff6b35" : "none"} stroke={filled ? "#ff6b35" : "#5a5f7a"} strokeWidth="2">
      <path d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06A5.5,5.5,0,0,0,20.84,4.61Z"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3,9.5L12,3l9,6.5V20a1,1,0,0,1-1,1H15V14H9v7H4a1,1,0,0,1-1-1Z"/>
    </svg>
  ),
  Music: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9,18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  ),
  Fav: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06A5.5,5.5,0,0,0,20.84,4.61Z"/>
    </svg>
  ),
  Volume: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54,8.46a5,5,0,0,1,0,7.07"/>
    </svg>
  ),
  Mute: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  ),
  Back: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  ),
  ChevDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  Dice: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="16" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="16" r="1.5" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ─── Constants ────────────────────────────────────────────────────────────────
const API = "https://music-app-f9t7.onrender.com/api";
let _cache = null;
let _promise = null;

function getSongs() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(`${API}/`).then(r => r.json()).then(d => { _cache = d; _promise = null; return d; });
  return _promise;
}

const C = {
  bg: "#0d0f1e",
  surface: "#13162a",
  card: "#181b30",
  cardHov: "#1e2240",
  border: "#1e2240",
  accent: "#ff6b35",
  accentLight: "#ff8c5a",
  accentGlow: "rgba(255,107,53,0.18)",
  accentDim: "rgba(255,107,53,0.08)",
  text: "#f5f0e8",
  sub: "#ffffff",
  muted: "#3d4260",
  dim: "#252845",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function UserPanel() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [albumView, setAlbumView] = useState(null);   // album name or null
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [search, setSearch] = useState("");
  const [favs, setFavs] = useState(() => { try { return JSON.parse(localStorage.getItem("vo_f2") || "[]"); } catch { return []; } });
  const [playerOpen, setPlayerOpen] = useState(false);
  const [recent, setRecent] = useState([]);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const seekingRef = useRef(false);

  // ─── Load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    getSongs().then(d => { setSongs(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  // RAF for smooth seek
  useEffect(() => {
    const tick = () => {
      if (audioRef.current && isPlaying && !seekingRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  // ─── Albums map ────────────────────────────────────────────────────────────
  const albums = songs.reduce((a, s) => { if (!a[s.album]) a[s.album] = []; a[s.album].push(s); return a; }, {});
  const albumNames = Object.keys(albums);

  // ─── Playback ──────────────────────────────────────────────────────────────
  const playSong = useCallback((song, list) => {
    if (list) setQueue(list);
    setCurrentSong(song);
    setIsPlaying(true);
    setRecent(p => [song, ...p.filter(x => x._id !== song._id)].slice(0, 12));
  }, []);

  // When currentSong changes, load and play
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !currentSong) return;
    a.src = currentSong.audioUrl;
    a.volume = muted ? 0 : volume;
    a.play().catch(() => {});
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !currentSong) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else { a.play().catch(() => {}); setIsPlaying(true); }
  };

  const navigate = (dir) => {
    if (!queue.length) return;
    const i = queue.findIndex(s => s._id === currentSong?._id);
    const next = dir === "next"
      ? (shuffle ? queue[Math.floor(Math.random() * queue.length)] : queue[(i + 1) % queue.length])
      : queue[(i - 1 + queue.length) % queue.length];
    playSong(next, queue);
  };

  const handleEnded = () => {
    if (repeat) { audioRef.current.currentTime = 0; audioRef.current.play(); }
    else navigate("next");
  };

  const seek = (val) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const toggleFav = (song, e) => {
    e?.stopPropagation();
    setFavs(p => {
      const n = p.some(s => s._id === song._id) ? p.filter(s => s._id !== song._id) : [...p, song];
      localStorage.setItem("vo_f2", JSON.stringify(n));
      return n;
    });
  };

  const isFav = id => favs.some(s => s._id === id);
  const fmt = t => { if (!t || isNaN(t)) return "0:00"; return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`; };
  const pct = duration ? (currentTime / duration) * 100 : 0;

  const searchRes = search.trim() ? songs.filter(s =>
    [s.title, s.artist, s.album].some(v => v.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  const playAlbum = (name) => {
    const list = albums[name] || [];
    if (list.length) playSong(list[0], list);
  };

  const playRandom = () => {
    if (!songs.length) return;
    const s = songs[Math.floor(Math.random() * songs.length)];
    playSong(s, songs);
    setPlayerOpen(true);
  };

  // ─── Song Row ──────────────────────────────────────────────────────────────
  const SongRow = ({ song, list, idx }) => {
    const active = currentSong?._id === song._id;
    return (
      <div
        style={{ ...p.row, ...(active ? p.rowActive : {}) }}
        onClick={() => { playSong(song, list); setPlayerOpen(true); }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.cardHov; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={p.rowL}>
          <div style={p.rowNum}>
            {active && isPlaying
              ? <span style={{ color: C.accent, fontSize: 10 }}>▶▶</span>
              : <span style={{ color: C.muted, fontSize: 12, fontFamily: "monospace" }}>{idx + 1}</span>
            }
          </div>
          <img src={song.imageUrl} alt="" style={p.rowImg} loading="lazy" />
          <div style={p.rowInfo}>
            <div style={{ ...p.rowTitle, ...(active ? { color: C.accent } : {}) }}>{song.title}</div>
            <div style={p.rowArtist}>{song.artist}</div>
          </div>
        </div>
        <div style={p.rowR}>
          <span style={p.rowAlbum}>{song.album}</span>
          <button style={p.heartBtn} onClick={e => toggleFav(song, e)}>
            <Icon.Heart filled={isFav(song._id)} />
          </button>
        </div>
      </div>
    );
  };

  // ─── Album Card ────────────────────────────────────────────────────────────
  const AlbumCard = ({ name }) => (
    <div style={p.albumCard}
      onClick={() => { setAlbumView(name); setTab("albums"); }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.accent; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = C.border; }}
    >
      <div style={p.albumImgWrap}>
        <img src={albums[name][0]?.imageUrl} alt={name} style={p.albumImg} loading="lazy" />
        <div style={p.albumPlay} onClick={e => { e.stopPropagation(); playAlbum(name); setPlayerOpen(true); }}>
          <div style={p.albumPlayCircle}><Icon.Play /></div>
        </div>
      </div>
      <div style={p.albumName}>{name}</div>
      <div style={p.albumMeta}>{albums[name].length} tracks</div>
    </div>
  );

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={p.root}>
      {/* BOTTOM TAB BAR */}
      <div style={p.tabBar}>
        {[
          { id: "home", label: "Home", Ico: Icon.Home },
          { id: "albums", label: "Albums", Ico: Icon.Music },
          { id: "search", label: "Search", Ico: Icon.Search },
          { id: "favs", label: "Favs", Ico: Icon.Fav },
        ].map(({ id, label, Ico }) => {
          const active = tab === id;
          return (
            <button key={id} style={{ ...p.tabBtn, ...(active ? p.tabBtnActive : {}) }}
              onClick={() => { setTab(id); if (id !== "albums") setAlbumView(null); }}>
              <span style={active ? { color: C.accent } : { color: C.muted }}><Ico /></span>
              <span style={{ ...p.tabLabel, ...(active ? { color: C.accent } : {}) }}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* MINI PLAYER BAR */}
      {currentSong && !playerOpen && (
        <div style={p.miniBar} onClick={() => setPlayerOpen(true)}>
          {/* progress strip */}
          <div style={{ position: "absolute", top: 0, left: 0, height: 2, width: `${pct}%`, background: C.accent, transition: "width 0.5s linear" }} />
          <img src={currentSong.imageUrl} alt="" style={p.miniImg} />
          <div style={p.miniInfo}>
            <div style={p.miniTitle}>{currentSong.title}</div>
            <div style={p.miniArtist}>{currentSong.artist}</div>
          </div>
          <div style={p.miniCtrl} onClick={e => e.stopPropagation()}>
            <button style={p.miniBtn} onClick={() => navigate("prev")}><Icon.PrevSm /></button>
            <button style={p.miniPlay} onClick={togglePlay}>
              {isPlaying ? <Icon.PauseSm /> : <Icon.PlaySm />}
            </button>
            <button style={p.miniBtn} onClick={() => navigate("next")}><Icon.NextSm /></button>
          </div>
        </div>
      )}

      {/* FULL PLAYER MODAL */}
      {playerOpen && currentSong && (
        <div style={p.fullPlayer}>
          {/* Blurred bg */}
          <div style={{ ...p.playerBg, backgroundImage: `url(${currentSong.imageUrl})` }} />
          <div style={p.playerBgOverlay} />

          <div style={p.playerContent}>
            {/* Header */}
            <div style={p.playerHeader}>
              <button style={p.playerCloseBtn} onClick={() => setPlayerOpen(false)}>
                <Icon.ChevDown />
              </button>
              <div style={p.playerNowPlaying}>
                <span style={p.playerNPLabel}>NOW PLAYING</span>
              </div>
              <button style={p.playerFavBtn} onClick={() => toggleFav(currentSong)}>
                <Icon.Heart filled={isFav(currentSong._id)} />
              </button>
            </div>

            {/* Cover */}
            <div style={p.playerCoverWrap}>
              <img
                src={currentSong.imageUrl}
                alt=""
                style={{ ...p.playerCover, ...(isPlaying ? { animation: "spin 20s linear infinite" } : {}) }}
              />
            </div>

            {/* Meta */}
            <div style={p.playerMeta}>
              <div style={p.playerTitle}>{currentSong.title}</div>
              <div style={p.playerArtist}>{currentSong.artist}</div>
              <div style={p.playerAlbumTag}>{currentSong.album}</div>
            </div>

            {/* Seek */}
            <div style={p.seekWrap}>
              <span style={p.seekTime}>{fmt(currentTime)}</span>
              <input
                type="range" min={0} max={duration || 0} value={currentTime}
                onMouseDown={() => { seekingRef.current = true; }}
                onMouseUp={e => { seekingRef.current = false; seek(+e.target.value); }}
                onChange={e => setCurrentTime(+e.target.value)}
                style={{ flex: 1, accentColor: C.accent, background: `linear-gradient(to right,${C.accent} ${pct}%,${C.muted} ${pct}%)` }}
              />
              <span style={p.seekTime}>{fmt(duration)}</span>
            </div>

            {/* Controls */}
            <div style={p.ctrlRow}>
              <button style={p.ctrlIcon} onClick={() => setShuffle(s => !s)}><Icon.Shuffle active={shuffle} /></button>
              <button style={p.ctrlNav} onClick={() => navigate("prev")}><Icon.Prev /></button>
              <button style={p.ctrlPlay} onClick={togglePlay}>
                {isPlaying ? <Icon.Pause /> : <Icon.Play />}
              </button>
              <button style={p.ctrlNav} onClick={() => navigate("next")}><Icon.Next /></button>
              <button style={p.ctrlIcon} onClick={() => setRepeat(r => !r)}><Icon.Repeat active={repeat} /></button>
            </div>

            {/* Volume */}
            <div style={p.volRow}>
              <button style={p.volBtn} onClick={() => setMuted(m => !m)}>
                {muted ? <Icon.Mute /> : <Icon.Volume />}
              </button>
              <input type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
                onChange={e => { setVolume(+e.target.value); setMuted(false); }}
                style={{ flex: 1, accentColor: C.accent }} />
            </div>

            {/* Queue preview */}
            {(() => {
              const idx = queue.findIndex(s => s._id === currentSong._id);
              const next3 = queue.slice(idx + 1, idx + 4);
              return next3.length > 0 ? (
                <div style={p.queueWrap}>
                  <div style={p.queueTitle}>UP NEXT</div>
                  {next3.map(s => (
                    <div key={s._id} style={p.queueItem} onClick={() => playSong(s, queue)}>
                      <img src={s.imageUrl} alt="" style={p.queueImg} loading="lazy" />
                      <div>
                        <div style={p.queueName}>{s.title}</div>
                        <div style={p.queueArtist}>{s.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div style={p.page}>
        {loading && (
          <div style={p.skeleGrid}>
            {[...Array(8)].map((_, i) => <div key={i} style={p.skele} />)}
          </div>
        )}

        {/* ── HOME ── */}
        {!loading && tab === "home" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={p.hero}>
              <div style={p.heroText}>
                <div style={p.heroEye}>Your music space</div>
                <h1 style={p.heroH1}>Feel every<br /><span style={{ color: C.accent }}>beat.</span></h1>
                <p style={p.heroSub}>{songs.length} songs across {albumNames.length} albums</p>
                <div style={p.heroActions}>
                  <button style={p.btnPrimary} onClick={playRandom}>
                    <Icon.Dice /> Surprise Me
                  </button>
                  <button style={p.btnGhost} onClick={() => { setTab("albums"); }}>
                    Browse →
                  </button>
                </div>
              </div>
              {currentSong && (
                <div style={p.heroCover} onClick={() => setPlayerOpen(true)}>
                  <img src={currentSong.imageUrl} alt="" style={{ ...p.heroCoverImg, ...(isPlaying ? { animation: "spin 18s linear infinite" } : {}) }} />
                  <div style={p.heroCoverGlow} />
                </div>
              )}
            </div>

            {recent.length > 0 && (
              <section style={p.sec}>
                <h2 style={p.secTitle}>Recently Played</h2>
                <div style={p.hScroll}>
                  {recent.map(s => (
                    <div key={s._id} style={p.miniCard} onClick={() => { playSong(s, songs); setPlayerOpen(true); }}>
                      <img src={s.imageUrl} alt="" style={p.miniCardImg} loading="lazy" />
                      <div style={p.miniCardTitle}>{s.title}</div>
                      <div style={p.miniCardSub}>{s.artist}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {favs.length > 0 && (
              <section style={p.sec}>
                <div style={p.secRow}>
                  <h2 style={p.secTitle}>Favorites</h2>
                  {favs.length > 4 && <button style={p.seeAll} onClick={() => setTab("favs")}>See all</button>}
                </div>
                <div style={p.songList}>
                  {favs.slice(0, 4).map((s, i) => <SongRow key={s._id} song={s} list={favs} idx={i} />)}
                </div>
              </section>
            )}

            <section style={p.sec}>
              <h2 style={p.secTitle}>Albums</h2>
              <div style={p.albumGrid}>
                {albumNames.map(n => <AlbumCard key={n} name={n} />)}
              </div>
            </section>
          </div>
        )}

        {/* ── ALBUMS ── */}
        {!loading && tab === "albums" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            {albumView ? (
              <>
                <button style={p.backBtn} onClick={() => setAlbumView(null)}>
                  <Icon.Back /> Albums
                </button>
                <div style={p.albumHead}>
                  <img src={albums[albumView]?.[0]?.imageUrl} alt="" style={p.albumHeadImg} />
                  <div>
                    <div style={p.albumHeadEye}>Album</div>
                    <h2 style={p.albumHeadTitle}>{albumView}</h2>
                    <div style={p.albumHeadMeta}>{albums[albumView]?.length} tracks</div>
                    <button style={p.btnPrimary} onClick={() => { playAlbum(albumView); setPlayerOpen(true); }}>
                      <Icon.Play /> Play All
                    </button>
                  </div>
                </div>
                <div style={p.songList}>
                  {albums[albumView]?.map((s, i) => <SongRow key={s._id} song={s} list={albums[albumView]} idx={i} />)}
                </div>
              </>
            ) : (
              <>
                <h2 style={p.pageTitle}>Albums</h2>
                <div style={p.albumGrid}>
                  {albumNames.map(n => <AlbumCard key={n} name={n} />)}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── SEARCH ── */}
        {!loading && tab === "search" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={p.searchBox}>
              <span style={{ color: C.muted, display: "flex" }}><Icon.Search /></span>
              <input style={p.searchInp} placeholder="Songs, artists, albums…"
                value={search} onChange={e => setSearch(e.target.value)} autoFocus />
              {search && (
                <button style={p.clearBtn} onClick={() => setSearch("")}>
                  <Icon.Close />
                </button>
              )}
            </div>
            {search ? (
              <>
                <div style={p.resultCount}>{searchRes.length} result{searchRes.length !== 1 ? "s" : ""}</div>
                <div style={p.songList}>
                  {searchRes.length === 0
                    ? <p style={p.empty}>Nothing found for "{search}"</p>
                    : searchRes.map((s, i) => <SongRow key={s._id} song={s} list={searchRes} idx={i} />)
                  }
                </div>
              </>
            ) : (
              <div style={p.songList}>
                <div style={p.allHead}>All Songs ({songs.length})</div>
                {songs.map((s, i) => <SongRow key={s._id} song={s} list={songs} idx={i} />)}
              </div>
            )}
          </div>
        )}

        {/* ── FAVS ── */}
        {!loading && tab === "favs" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <h2 style={p.pageTitle}>Favorites</h2>
            {favs.length === 0
              ? <p style={p.empty}>Tap ♥ on any song to add favorites.</p>
              : <div style={p.songList}>{favs.map((s, i) => <SongRow key={s._id} song={s} list={favs} idx={i} />)}</div>
            }
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const p = {
  root: { fontFamily: "'Plus Jakarta Sans',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, paddingBottom: 140 },
  page: { maxWidth: 880, margin: "0 auto", padding: "24px 16px" },

  // Tab Bar
  tabBar: {
    position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
    background: C.surface, borderTop: `1px solid ${C.border}`,
    display: "flex", height: 62,
    boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
  },
  tabBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: "8px 0" },
  tabBtnActive: {},
  tabLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 0.4, color: C.muted },

  // Mini player
  miniBar: {
    position: "fixed", bottom: 62, left: 0, right: 0, zIndex: 190,
    background: C.card, borderTop: `1px solid ${C.border}`,
    padding: "10px 16px", display: "flex", alignItems: "center", gap: 12,
    cursor: "pointer", boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
  },
  miniImg: { width: 44, height: 44, borderRadius: 10, objectFit: "cover", flexShrink: 0 },
  miniInfo: { flex: 1, minWidth: 0 },
  miniTitle: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  miniArtist: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  miniCtrl: { display: "flex", alignItems: "center", gap: 4 },
  miniBtn: { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: "8px", display: "flex", alignItems: "center" },
  miniPlay: {
    width: 36, height: 36, borderRadius: "50%", background: C.accent, border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
    boxShadow: "0 0 12px rgba(255,107,53,0.4)",
  },

  // Full Player
  fullPlayer: {
    position: "fixed", inset: 0, zIndex: 500,
    display: "flex", flexDirection: "column",
    animation: "slideUp 0.3s cubic-bezier(0.32,0.72,0,1)",
    overflow: "hidden",
  },
  playerBg: {
    position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center",
    filter: "blur(60px) saturate(1.4)", transform: "scale(1.2)",
  },
  playerBgOverlay: { position: "absolute", inset: 0, background: "rgba(13,15,30,0.82)" },
  playerContent: {
    position: "relative", zIndex: 1, flex: 1, overflowY: "auto",
    display: "flex", flexDirection: "column", padding: "0 24px 40px",
    maxWidth: 520, margin: "0 auto", width: "100%",
  },
  playerHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 10px" },
  playerCloseBtn: { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: 6, display: "flex", borderRadius: 8 },
  playerNowPlaying: { textAlign: "center" },
  playerNPLabel: { fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2 },
  playerFavBtn: { background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex" },
  playerCoverWrap: { display: "flex", justifyContent: "center", padding: "16px 0 24px" },
  playerCover: {
    width: "min(260px, 65vw)", height: "min(260px, 65vw)",
    borderRadius: "50%", objectFit: "cover",
    border: `3px solid rgba(255,107,53,0.3)`,
    boxShadow: "0 20px 60px rgba(255,107,53,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
  },
  playerMeta: { textAlign: "center", marginBottom: 20 },
  playerTitle: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 },
  playerArtist: { fontSize: 15, color: C.sub, marginBottom: 4 },
  playerAlbumTag: { fontSize: 12, color: C.accent, fontWeight: 600 },
  seekWrap: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22 },
  seekTime: { fontSize: 11, color: C.muted, width: 34, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
  ctrlRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 18 },
  ctrlIcon: { background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", borderRadius: 8 },
  ctrlNav: { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: 8, display: "flex", borderRadius: 8 },
  ctrlPlay: {
    width: 64, height: 64, borderRadius: "50%", background: C.accent, border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
    boxShadow: "0 0 0 8px rgba(255,107,53,0.12), 0 8px 24px rgba(255,107,53,0.4)",
  },
  volRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24, maxWidth: 300, margin: "0 auto 24px" },
  volBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
  queueWrap: { marginTop: 8 },
  queueTitle: { fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 2, marginBottom: 10 },
  queueItem: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", cursor: "pointer", borderBottom: `1px solid ${C.border}` },
  queueImg: { width: 40, height: 40, borderRadius: 8, objectFit: "cover" },
  queueName: { fontSize: 13, fontWeight: 600 },
  queueArtist: { fontSize: 11, color: C.sub },

  // Page sections
  sec: { marginTop: 36 },
  secRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  secTitle: { fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em" },
  seeAll: { background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 13, fontWeight: 600 },
  pageTitle: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 22 },

  // Hero
  hero: {
    background: `linear-gradient(135deg, ${C.surface} 0%, #1a1033 100%)`,
    borderRadius: 20, padding: "28px 24px", display: "flex",
    justifyContent: "space-between", alignItems: "center", gap: 16,
    border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 8,
  },
  heroText: { flex: 1, minWidth: 0 },
  heroEye: { fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  heroH1: { fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 },
  heroSub: { fontSize: 13, color: C.sub, marginBottom: 20 },
  heroActions: { display: "flex", gap: 10, flexWrap: "wrap" },
  heroCover: { flexShrink: 0, cursor: "pointer", position: "relative" },
  heroCoverImg: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}` },
  heroCoverGlow: { position: "absolute", inset: -8, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)", pointerEvents: "none" },

  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "10px 20px", borderRadius: 30, border: "none",
    background: C.accent, color: "#fff", fontWeight: 700, fontSize: 13,
    cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif",
    boxShadow: "0 4px 16px rgba(255,107,53,0.35)",
  },
  btnGhost: {
    padding: "10px 20px", borderRadius: 30, border: `1px solid ${C.border}`,
    background: "none", color: C.sub, fontWeight: 600, fontSize: 13,
    cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif",
  },

  // Horizontal scroll
  hScroll: { display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4, marginTop: 16 },
  miniCard: { flexShrink: 0, width: 130, cursor: "pointer" },
  miniCardImg: { width: 130, height: 130, borderRadius: 12, objectFit: "cover", display: "block", marginBottom: 8 },
  miniCardTitle: { fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  miniCardSub: { fontSize: 11, color: C.sub },

  // Album grid
  albumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16, marginTop: 16 },
  albumCard: { cursor: "pointer", borderRadius: 14, overflow: "hidden", background: C.card, border: `1px solid ${C.border}`, transition: "transform 0.2s, border-color 0.2s" },
  albumImgWrap: { position: "relative", overflow: "hidden" },
  albumImg: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
  albumPlay: {
    position: "absolute", inset: 0, background: "rgba(13,15,30,0.55)",
    display: "flex", alignItems: "center", justifyContent: "center", opacity: 0,
    transition: "opacity 0.2s",
  },
  albumPlayCircle: {
    width: 44, height: 44, borderRadius: "50%", background: C.accent,
    display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
    boxShadow: "0 4px 16px rgba(255,107,53,0.5)",
  },
  albumName: { padding: "10px 12px 3px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  albumMeta: { padding: "0 12px 10px", fontSize: 11, color: C.sub },

  // Album detail header
  albumHead: { display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-end", flexWrap: "wrap" },
  albumHeadImg: { width: 110, height: 110, borderRadius: 14, objectFit: "cover", flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
  albumHeadEye: { fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  albumHeadTitle: { fontSize: 24, fontWeight: 800, marginBottom: 4 },
  albumHeadMeta: { fontSize: 13, color: C.sub, marginBottom: 14 },
  backBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "none", border: `1px solid ${C.border}`,
    color: C.sub, padding: "8px 16px", borderRadius: 20, cursor: "pointer",
    fontSize: 13, fontWeight: 600, marginBottom: 20,
    fontFamily: "'Plus Jakarta Sans',sans-serif",
  },

  // Song rows
  songList: { display: "flex", flexDirection: "column", gap: 2 },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 10, cursor: "pointer", transition: "background 0.12s" },
  rowActive: { background: C.accentDim },
  rowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
  rowNum: { width: 24, textAlign: "center", flexShrink: 0 },
  rowImg: { width: 42, height: 42, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
  rowInfo: { minWidth: 0 },
  rowTitle: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 },
  rowArtist: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  rowR: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  rowAlbum: { fontSize: 11, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 100 },
  heartBtn: { background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" },

  // Search
  searchBox: { display: "flex", alignItems: "center", gap: 12, background: C.surface, borderRadius: 14, padding: "13px 16px", border: `1px solid ${C.border}`, marginBottom: 20 },
  searchInp: { flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif" },
  clearBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
  resultCount: { fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 0.5, marginBottom: 12, textTransform: "uppercase" },
  allHead: { fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 0.5, padding: "0 4px 12px", textTransform: "uppercase" },

  empty: { color: C.muted, fontSize: 14, textAlign: "center", padding: 48 },

  // Skeletons
  skeleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16, padding: "24px 16px" },
  skele: { aspectRatio: "1", borderRadius: 14, background: `linear-gradient(90deg, ${C.surface} 25%, ${C.card} 50%, ${C.surface} 75%)`, backgroundSize: "600px 100%", animation: "shimmer 1.4s infinite" },
};
