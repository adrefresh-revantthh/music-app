
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaHeart, FaSearch, FaVolumeUp, FaVolumeMute, FaTimes, FaHome, FaMusic, FaFire } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";

// const API = "https://music-app-f9t7.onrender.com/api";

// // ── module-level cache so songs load once per session ──
// let _cache = null;
// let _promise = null;

// function fetchSongs() {
//   if (_cache) return Promise.resolve(_cache);
//   if (_promise) return _promise;
//   _promise = fetch(`${API}/`).then(r => r.json()).then(d => { _cache = d; return d; });
//   return _promise;
// }
// const C = {
//   bg: "#0f0f12",
//   surface: "#18181b",
//   card: "#1f1f23",
//   border: "#2a2a2f",
//   accent: "#f59e0b",
//   accentDim: "rgba(245,158,11,0.08)",
//   accentBorder: "rgba(245,158,11,0.25)",
//   text: "#f4f4f5",
//   sub: "#a1a1aa",
//   muted: "#52525b",
//   error: "#ef4444",
//   success: "#22c55e",
// };

// export default function UserPanel() {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("home");
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [queue, setQueue] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isShuffle, setIsShuffle] = useState(false);
//   const [isRepeat, setIsRepeat] = useState(false);
//   const [volume, setVolume] = useState(0.8);
//   const [isMuted, setIsMuted] = useState(false);
//   const [search, setSearch] = useState("");
//   const [favorites, setFavorites] = useState(() => {
//     try { return JSON.parse(localStorage.getItem("vo_favs") || "[]"); } catch { return []; }
//   });
//   const [playerOpen, setPlayerOpen] = useState(false);
//   const [recent, setRecent] = useState([]);

//   const audioRef = useRef(null);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     fetchSongs().then(d => { setSongs(d); setLoading(false); }).catch(() => setLoading(false));
//   }, []);

//   // smooth progress via rAF
//   useEffect(() => {
//     const tick = () => {
//       if (audioRef.current && !audioRef.current.paused) {
//         setCurrentTime(audioRef.current.currentTime);
//       }
//       rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, []);

//   const albums = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
//   const albumNames = Object.keys(albums);

//   const playSong = useCallback((song, list) => {
//     if (list) setQueue(list);
//     setCurrentSong(song);
//     setIsPlaying(true);
//     setRecent(prev => [song, ...prev.filter(s => s._id !== song._id)].slice(0, 12));
//   }, []);

//   useEffect(() => {
//     if (!audioRef.current || !currentSong) return;
//     audioRef.current.src = currentSong.audioUrl;
//     audioRef.current.volume = isMuted ? 0 : volume;
//     if (isPlaying) audioRef.current.play().catch(() => {});
//   }, [currentSong]);

//   useEffect(() => {
//     if (!audioRef.current) return;
//     audioRef.current.volume = isMuted ? 0 : volume;
//   }, [volume, isMuted]);

//   const togglePlay = () => {
//     if (!audioRef.current || !currentSong) return;
//     if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
//     else { audioRef.current.play().catch(() => {}); setIsPlaying(true); }
//   };

//   const navigate = (dir) => {
//     if (!queue.length || !currentSong) return;
//     const idx = queue.findIndex(s => s._id === currentSong._id);
//     let next;
//     if (dir === "next") next = isShuffle ? queue[Math.floor(Math.random() * queue.length)] : queue[(idx + 1) % queue.length];
//     else next = queue[(idx - 1 + queue.length) % queue.length];
//     playSong(next, queue);
//   };

//   const handleEnded = () => {
//     if (isRepeat && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); }
//     else navigate("next");
//   };

//   const seek = (val) => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = val;
//     setCurrentTime(val);
//   };

//   const toggleFav = (song, e) => {
//     if (e) e.stopPropagation();
//     setFavorites(prev => {
//       const next = prev.find(s => s._id === song._id) ? prev.filter(s => s._id !== song._id) : [...prev, song];
//       localStorage.setItem("vo_favs", JSON.stringify(next));
//       return next;
//     });
//   };

//   const isFav = id => favorites.some(s => s._id === id);

//   const fmt = t => {
//     if (!t || isNaN(t)) return "0:00";
//     return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   const searchResults = search.trim() ? songs.filter(s =>
//     s.title.toLowerCase().includes(search.toLowerCase()) ||
//     s.artist.toLowerCase().includes(search.toLowerCase()) ||
//     s.album.toLowerCase().includes(search.toLowerCase())
//   ) : [];

//   const playAlbum = (name) => {
//     const list = albums[name] || [];
//     if (list.length) playSong(list[0], list);
//   };

//   const playRandom = () => {
//     if (!songs.length) return;
//     const s = songs[Math.floor(Math.random() * songs.length)];
//     playSong(s, songs);
//     setPlayerOpen(true);
//   };

//   // ─── SONG ROW ───
//   const SongRow = ({ song, list, index }) => {
//     const active = currentSong?._id === song._id;
//     return (
//       <div style={{ ...u.songRow, ...(active ? u.songRowActive : {}) }} onClick={() => { playSong(song, list); setPlayerOpen(true); }}>
//         <div style={u.songRowL}>
//           <div style={u.songNum}>{active && isPlaying ? <span style={{ color: C.accent }}>▶</span> : index + 1}</div>
//           <img src={song.imageUrl} alt="" style={u.songThumb} loading="lazy" />
//           <div style={u.songMeta}>
//             <div style={{ ...u.songTitle, ...(active ? { color: C.accent } : {}) }}>{song.title}</div>
//             <div style={u.songArtist}>{song.artist}</div>
//           </div>
//         </div>
//         <div style={u.songRowR}>
//           <span style={u.songAlbumTag}>{song.album}</span>
//           <button style={u.heartBtn} onClick={e => toggleFav(song, e)}>
//             <FaHeart size={13} color={isFav(song._id) ? C.accent : C.muted} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // ─── ALBUM CARD ───
//   const AlbumCard = ({ name }) => (
//     <div style={u.albumCard} onClick={() => { setSelectedAlbum(name); setTab("albums"); }}>
//       <div style={u.albumThumbWrap}>
//         <img src={albums[name][0]?.imageUrl} alt={name} style={u.albumThumb} loading="lazy" />
//         <div style={u.albumOverlay} onClick={e => { e.stopPropagation(); playAlbum(name); }}>
//           <div style={u.playCircle}><FaPlay size={14} color="#8b4e4e" /></div>
//         </div>
//       </div>
//       <div style={u.albumName}>{name}</div>
//       <div style={u.albumCount}>{albums[name].length} tracks</div>
//     </div>
//   );

//   return (
//     <div style={u.root}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
//         @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
//         input[type=range]{ -webkit-appearance:none; height:3px; border-radius:4px; outline:none; cursor:pointer; }
//         input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:12px; height:12px; border-radius:50%; background:${C.accent}; cursor:pointer; }
//         /* Hamburger show on mobile */
//         @media(max-width:640px){
//           .desk-nav{display:none!important;}
//           .ham-btn{display:flex!important;}
//         }
//         /* Responsive album grid */
//         @media(max-width:480px){
//           .album-grid{ grid-template-columns: repeat(2,1fr)!important; }
//           .song-album-tag{ display:none!important; }
//         }
//         @media(max-width:380px){
//           .album-grid{ grid-template-columns: repeat(2,1fr)!important; }
//         }
//       `}</style>

//       {/* BOTTOM TAB BAR */}
//       <div style={u.tabBar}>
//         {[
//           { id: "home", icon: <FaHome size={17} />, label: "Home" },
//           { id: "albums", icon: <FaMusic size={17} />, label: "Albums" },
//           { id: "search", icon: <FaSearch size={17} />, label: "Search" },
//           { id: "favs", icon: <FaHeart size={17} />, label: "Favs" },
//         ].map(t => (
//           <button key={t.id} style={{ ...u.tabItem, ...(tab === t.id ? u.tabItemActive : {}) }}
//             onClick={() => { setTab(t.id); setSelectedAlbum(null); }}>
//             <span style={tab === t.id ? { color: C.accent } : {}}>{t.icon}</span>
//             <span style={u.tabLabel}>{t.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* PAGE CONTENT */}
//       <div style={u.page}>
//         {loading && (
//           <div style={u.skeleGrid}>
//             {[...Array(8)].map((_, i) => <div key={i} style={u.skele} />)}
//           </div>
//         )}

//         {!loading && tab === "home" && (
//           <div style={{ animation: "slideUp 0.3s ease" }}>
//             {/* Hero */}
//             <div style={u.hero}>
//               <div>
//                 <div style={u.heroEyebrow}>Vibe With Revanth</div>
//                 <h1 style={u.heroH1}>Vibe-On</h1>
//                 <p style={u.heroSub}>Discover. Play. Feel every beat.
                  
//                 </p>
//                 <div style={u.heroActions}>
//                   <button style={u.btnPrimary} onClick={() => { playRandom(); }}>🎲 Random</button>
//                   <button style={u.btnGhost} onClick={() => setTab("albums")}>Browse →</button>
//                 </div>
//               </div>
//               {currentSong && (
//                 <div style={u.heroArt} onClick={() => setPlayerOpen(true)}>
//                   <img src={currentSong.imageUrl} alt="" style={{ ...u.heroImg, ...(isPlaying ? { animation: "spin 12s linear infinite" } : {}) }} />
//                 </div>
//               )}
//             </div>

//             {/* Recent */}
//             {recent.length > 0 && (
//               <section style={u.section}>
//                 <h2 style={u.sectionTitle}><FaFire size={14} style={{ color: C.accent }} /> Recently Played</h2>
//                 <div style={u.hScroll}>
//                   {recent.map(s => (
//                     <div key={s._id} style={u.miniCard} onClick={() => { playSong(s, songs); setPlayerOpen(true); }}>
//                       <img src={s.imageUrl} alt="" style={u.miniImg} loading="lazy" />
//                       <div style={u.miniTitle}>{s.title}</div>
//                       <div style={u.miniSub}>{s.artist}</div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* Favs preview */}
//             {favorites.length > 0 && (
//               <section style={u.section}>
//                 <h2 style={u.sectionTitle}><FaHeart size={12} style={{ color: C.accent }} /> Favorites</h2>
//                 <div style={u.songList}>
//                   {favorites.slice(0, 5).map((s, i) => <SongRow key={s._id} song={s} list={favorites} index={i} />)}
//                   {favorites.length > 5 && <div style={u.seeAll} onClick={() => setTab("favs")}>See all {favorites.length} →</div>}
//                 </div>
//               </section>
//             )}

//             {/* Albums preview */}
//             <section style={u.section}>
//               <h2 style={u.sectionTitle}>Albums</h2>
//               <div style={u.albumGrid} className="album-grid">
//                 {albumNames.map(n => <AlbumCard key={n} name={n} />)}
//               </div>
//             </section>
//           </div>
//         )}

//         {!loading && tab === "albums" && (
//           <div style={{ animation: "slideUp 0.3s ease" }}>
//             {selectedAlbum ? (
//               <>
//                 <button style={u.backBtn} onClick={() => setSelectedAlbum(null)}>← Albums</button>
//                 <div style={u.albumHead}>
//                   <img src={albums[selectedAlbum][0]?.imageUrl} alt="" style={u.albumHeadImg} />
//                   <div>
//                     <div style={u.albumHeadLabel}>Album</div>
//                     <h2 style={u.albumHeadTitle}>{selectedAlbum}</h2>
//                     <div style={u.albumHeadMeta}>{albums[selectedAlbum].length} tracks</div>
//                     <button style={u.btnPrimary} onClick={() => { playAlbum(selectedAlbum); setPlayerOpen(true); }}>▶ Play All</button>
//                   </div>
//                 </div>
//                 <div style={u.songList}>
//                   {albums[selectedAlbum].map((s, i) => <SongRow key={s._id} song={s} list={albums[selectedAlbum]} index={i} />)}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 style={u.pageTitle}>Albums</h2>
//                 <div style={u.albumGrid} className="album-grid">
//                   {albumNames.map(n => <AlbumCard key={n} name={n} />)}
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {!loading && tab === "search" && (
//           <div style={{ animation: "slideUp 0.3s ease" }}>
//             <div style={u.searchBox}>
//               <FaSearch color={C.muted} size={14} />
//               <input style={u.searchInput} placeholder="Songs, artists, albums..." value={search}
//                 onChange={e => setSearch(e.target.value)} autoFocus />
//               {search && <button style={u.clearBtn} onClick={() => setSearch("")}><FaTimes size={13} /></button>}
//             </div>
//             {search ? (
//               <div style={u.songList}>
//                 {searchResults.length === 0
//                   ? <p style={u.empty}>No results for "{search}"</p>
//                   : searchResults.map((s, i) => <SongRow key={s._id} song={s} list={searchResults} index={i} />)
//                 }
//               </div>
//             ) : (
//               <div style={u.songList}>
//                 <div style={u.allSongsHead}>All Songs ({songs.length})</div>
//                 {songs.map((s, i) => <SongRow key={s._id} song={s} list={songs} index={i} />)}
//               </div>
//             )}
//           </div>
//         )}

//         {!loading && tab === "favs" && (
//           <div style={{ animation: "slideUp 0.3s ease" }}>
//             <h2 style={u.pageTitle}>Favorites</h2>
//             {favorites.length === 0
//               ? <p style={u.empty}>No favorites yet. Tap ♥ on any song.</p>
//               : <div style={u.songList}>{favorites.map((s, i) => <SongRow key={s._id} song={s} list={favorites} index={i} />)}</div>
//             }
//           </div>
//         )}
//       </div>

//       {/* MINI PLAYER */}
//       {currentSong && !playerOpen && (
//         <div style={u.miniPlayer} onClick={() => setPlayerOpen(true)}>
//           <div style={u.miniPlayerProgress} />
//           <img src={currentSong.imageUrl} alt="" style={u.miniPlayerImg} />
//           <div style={u.miniPlayerInfo}>
//             <div style={u.miniPlayerTitle}>{currentSong.title}</div>
//             <div style={u.miniPlayerSub}>{currentSong.artist}</div>
//           </div>
//           <div style={u.miniPlayerCtrl} onClick={e => e.stopPropagation()}>
//             <button style={u.iconBtn} onClick={() => navigate("prev")}><FaBackward size={13} /></button>
//             <button style={u.fpPlayBtn2} onClick={togglePlay}>{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}</button>
//             <button style={u.iconBtn} onClick={() => navigate("next")}><FaForward size={13} /></button>
//           </div>
//         </div>
//       )}

//       {/* FULL PLAYER */}
//       {playerOpen && currentSong && (
//         <div style={u.fullPlayer}>
       
//           <div style={u.fpTop}>
//             <button style={u.fpClose} onClick={() => setPlayerOpen(false)}>Back

// </button>
//             <span style={u.fpNowPlaying}>Now Playing</span>
//             <button style={u.fpFav} onClick={() => toggleFav(currentSong)}>
//               <FaHeart size={16} color={isFav(currentSong._id) ? C.accent : C.muted} />
//             </button>
//           </div>

//           <div style={u.fpImgWrap}>
//             <img src={currentSong.imageUrl} alt="" style={{ ...u.fpImg, ...(isPlaying ? { animation: "spin 12s linear infinite" } : {}) }} />
//           </div>

//           <div style={u.fpMeta}>
//             <div style={u.fpTitle}>{currentSong.title}</div>
//             <div style={u.fpArtist}>{currentSong.artist}</div>
//             <div style={u.fpAlbum}>{currentSong.album}</div>
//           </div>

//           <div style={u.fpSeekRow}>
//             <span style={u.fpTime}>{fmt(currentTime)}</span>
//             <input type="range" min={0} max={duration || 0} value={currentTime}
//               onChange={e => seek(+e.target.value)}
//               style={{ flex: 1, accentColor: C.accent, background: `linear-gradient(to right, ${C.accent} ${progress}%, ${C.dim} ${progress}%)` }} />
//             <span style={u.fpTime}>{fmt(duration)}</span>
//           </div>

//           <div style={u.fpCtrl}>
//             <button style={{ ...u.fpIconBtn, ...(isShuffle ? u.fpIconActive : {}) }} onClick={() => setIsShuffle(!isShuffle)}><FaRandom size={15} /></button>
//             <button style={u.fpCtrlBtn} onClick={() => navigate("prev")}><FaBackward size={18} /></button>
//             <button style={u.fpPlayBtn} onClick={togglePlay}>{isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}</button>
//             <button style={u.fpCtrlBtn} onClick={() => navigate("next")}><FaForward size={18} /></button>
//             <button style={{ ...u.fpIconBtn, ...(isRepeat ? u.fpIconActive : {}) }} onClick={() => setIsRepeat(!isRepeat)}><FaRedo size={15} /></button>
//           </div>

//           <div style={u.fpVol}>
//             <button style={u.fpIconBtn} onClick={() => setIsMuted(!isMuted)}>
//               {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
//             </button>
//             <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume}
//               onChange={e => { setVolume(+e.target.value); setIsMuted(false); }}
//               style={{ flex: 1, accentColor: C.accent }} />
//           </div>

//           {/* Up next */}
//           {queue.length > 1 && (() => {
//             const idx = queue.findIndex(s => s._id === currentSong._id);
//             const upNext = queue.slice(idx + 1, idx + 4);
//             return upNext.length > 0 ? (
//               <div style={u.fpQueue}>
//                 <div style={u.fpQueueTitle}>Up Nexts</div>
//                 {upNext.map(s => (
//                   <div key={s._id} style={u.fpQueueItem} onClick={() => playSong(s, queue)}>
//                     <img src={s.imageUrl} alt="" style={u.fpQueueImg} loading="lazy" />
//                     <div>
//                       <div style={u.fpQueueName}>{s.title}</div>
//                       <div style={u.fpQueueArtist}>{s.artist}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : null;
//           })()}
//         </div>
//       )}

//       <audio ref={audioRef}
//         onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
//         onEnded={handleEnded}
//       />
//     </div>
//   );
// }

// const u = {
//   root: { fontFamily: "'Outfit',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, paddingBottom: 130 },
//   page: { maxWidth: 860, margin: "0 auto", padding: "24px 16px" },

//   // Tab bar
//   tabBar: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", height: 60 },
//   tabItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 11 },
//   tabItemActive: { color: C.accent },
//   tabLabel: { fontSize: 10, fontWeight: 600, letterSpacing: 0.3 },

//   // Hero
//   hero: { background: C.surface, borderRadius: 16, padding: "28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 8, border: `1px solid ${C.border}` },
//   heroEyebrow: { fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
//   heroH1: { fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 ,color:"white"},
//   heroSub: { fontSize: 14, color: C.sub, marginBottom: 20 },
//   heroActions: { display: "flex", gap: 10, flexWrap: "wrap" },
//   heroArt: { flexShrink: 0, cursor: "pointer" },
//   heroImg: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}` },

//   btnPrimary: { padding: "9px 20px", borderRadius: 30, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
//   btnGhost: { padding: "9px 20px", borderRadius: 30, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "'Outfit',sans-serif" },

//   section: { marginTop: 36 },
//   sectionTitle: { fontSize: 15, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 ,color:"white"},
//   pageTitle: { fontSize: 22, fontWeight: 700, marginBottom: 20, letterSpacing: "-0.02em" },
//   seeAll: { fontSize: 13, color: C.accent, cursor: "pointer", padding: "10px 0", textAlign: "center" },

//   // Horizontal scroll
//   hScroll: { display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 },
//   miniCard: { flexShrink: 0, width: 120, cursor: "pointer" },
//   miniImg: { width: 120, height: 120, borderRadius: 10, objectFit: "cover", display: "block", marginBottom: 8 },
//   miniTitle: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//   miniSub: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },

//   // Album grid
//   albumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 },
//   albumCard: { cursor: "pointer", borderRadius: 12, overflow: "hidden", background: C.card, border: `1px solid ${C.border}` },
//   albumThumbWrap: { position: "relative" },
//   albumThumb: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
//   albumOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" },
//   playCircle: { width: 40, height: 40, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" },
//   albumName: { padding: "10px 12px 4px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//   albumCount: { padding: "0 12px 10px", fontSize: 11, color: C.sub },

//   // Album header
//   albumHead: { display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-end", flexWrap: "wrap" },
//   albumHeadImg: { width: 110, height: 110, borderRadius: 12, objectFit: "cover", flexShrink: 0 },
//   albumHeadLabel: { fontSize: 11, fontWeight: 600, color: C.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
//   albumHeadTitle: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
//   albumHeadMeta: { fontSize: 13, color: C.sub, marginBottom: 14 },
//   backBtn: { display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: `1px solid ${C.border}`, color: C.sub, padding: "7px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, marginBottom: 20, fontFamily: "'Outfit',sans-serif" },

//   // Song rows
//   songList: { display: "flex", flexDirection: "column", gap: 2 },
//   songRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 10px", borderRadius: 10, cursor: "pointer", transition: "background 0.15s" },
//   songRowActive: { background: C.accentDim },
//   songRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
//   songNum: { width: 22, textAlign: "center", fontSize: 12, color: C.muted, flexShrink: 0, fontFamily: "monospace" },
//   songThumb: { width: 42, height: 42, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
//   songMeta: { minWidth: 0 },
//   songTitle: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 },
//   songArtist: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//   songRowR: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
//   songAlbumTag: { fontSize: 11, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 100 },
//   heartBtn: { background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" },

//   // Search
//   searchBox: { display: "flex", alignItems: "center", gap: 10, background: C.surface, borderRadius: 12, padding: "12px 16px", border: `1px solid ${C.border}`, marginBottom: 20 },
//   searchInput: { flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: C.text, fontFamily: "'Outfit',sans-serif" },
//   clearBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
//   allSongsHead: { fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", padding: "0 4px 12px" },
//   empty: { color: C.muted, fontSize: 14, textAlign: "center", padding: 48 },

//   // Skeleton
//   skeleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16, padding: "24px 16px" },
//   skele: { aspectRatio: "1", borderRadius: 12, background: `linear-gradient(90deg, ${C.surface} 25%, ${C.dim} 50%, ${C.surface} 75%)`, backgroundSize: "400px 100%", animation: "shimmer 1.4s infinite" },

//   // Mini player
//   miniPlayer: { position: "fixed", bottom: 60, left: 0, right: 0, zIndex: 190, background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
//   miniPlayerImg: { width: 42, height: 42, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
//   miniPlayerInfo: { flex: 1, minWidth: 0 },
//   miniPlayerTitle: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
//   miniPlayerSub: { fontSize: 11, color: C.sub },
//   miniPlayerCtrl: { display: "flex", alignItems: "center", gap: 6 },
//   iconBtn: { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: 6, display: "flex" },
//   playBtnSm: { width: 34, height: 34, borderRadius: "50%", background: C.accent, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f" },

//   // Full player
//   fullPlayer: { position: "fixed", inset: 0, zIndex: 500, background: C.bg, overflowY: "auto", display: "flex", flexDirection: "column", padding: "0 0 40px", marginTop:'50px' },
//   fpTop: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" },
//   fpClose: { background: "gray", border: `1px solid ${C.border}`, color: "black", width: 76, height: 36, borderRadius: "4px", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" },
//   fpNowPlaying: { fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: "uppercase" },
//   fpFav: { background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex" },
//   fpImgWrap: { display: "flex", justifyContent: "center", padding: "10px 40px 24px" },
//   fpImg: { width: "min(240px, 60vw)", height: "min(240px, 60vw)", borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.dim}` },
//   fpMeta: { textAlign: "center", padding: "0 24px 20px" },
//   fpTitle: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 },
//   fpArtist: { fontSize: 15, color: C.sub, marginBottom: 4 },
//   fpAlbum: { fontSize: 12, color: C.accent, fontWeight: 600 },
//   fpSeekRow: { display: "flex", alignItems: "center", gap: 10, padding: "0 24px 20px" },
//   fpTime: { fontSize: 11, color: C.muted, width: 34, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
//   fpCtrl: { display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "0 24px 16px" },
//   fpIconBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 8, display: "flex", borderRadius: 8 },
//   fpIconActive: { color: C.accent },
//   fpCtrlBtn: { background: "none", border: "none", cursor: "pointer", color: C.sub, padding: 10, display: "flex" },
//   fpPlayBtn: { width: 60, height: 60, borderRadius: "50%", background: C.accent, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f" },
//     fpPlayBtn2: { width: 50, height:30, borderRadius: "10%", background: C.accent, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f0f0f" },

//   fpVol: { display: "flex", alignItems: "center", gap: 10, padding: "0 28px 24px", maxWidth: 320, margin: "0 auto", width: "100%" },
//   fpQueue: { padding: "0 20px" },
//   fpQueueTitle: { fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 },
//   fpQueueItem: { display: "flex", alignItems: "center", gap: 12, padding: "8px 0", cursor: "pointer", borderBottom: `1px solid ${C.border}` },
//   fpQueueImg: { width: 38, height: 38, borderRadius: 6, objectFit: "cover" },
//   fpQueueName: { fontSize: 13, fontWeight: 600 },
//   fpQueueArtist: { fontSize: 11, color: C.sub },
// };
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaSearch, FaHeart, FaHome, FaMusic, FaBars, FaTimes, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// const API = "https://music-app-f9t7.onrender.com/api";

// // Cache songs in memory to avoid refetching
// let songsCache = null;

// export default function UserPanel() {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isShuffle, setIsShuffle] = useState(false);
//   const [isRepeat, setIsRepeat] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("home"); // home | albums | search | favorites
//   const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("vibe_favs") || "[]"));
//   const [mobilePlayerOpen, setMobilePlayerOpen] = useState(false);
//   const [queue, setQueue] = useState([]);
//   const [queueIndex, setQueueIndex] = useState(0);
//   const [recentlyPlayed, setRecentlyPlayed] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const audioRef = useRef(null);

//   // Fetch with cache
//   useEffect(() => {
//     if (songsCache) {
//       setSongs(songsCache);
//       setLoading(false);
//       return;
//     }
//     fetch(`${API}/`)
//       .then(r => r.json())
//       .then(data => {
//         songsCache = data;
//         setSongs(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const albums = songs.reduce((acc, s) => {
//     if (!acc[s.album]) acc[s.album] = [];
//     acc[s.album].push(s);
//     return acc;
//   }, {});

//   const albumNames = Object.keys(albums);

//   const currentSongs = selectedAlbum ? albums[selectedAlbum] || [] : queue;

//   const playSong = useCallback((song, songList = []) => {
//     if (songList.length) setQueue(songList);
//     setCurrentSong(song);
//     setIsPlaying(true);
//     setMobilePlayerOpen(true);
//     setRecentlyPlayed(prev => {
//       const filtered = prev.filter(s => s._id !== song._id);
//       return [song, ...filtered].slice(0, 10);
//     });
//   }, []);

//   const togglePlay = () => {
//     if (!audioRef.current || !currentSong) return;
//     isPlaying ? audioRef.current.pause() : audioRef.current.play();
//     setIsPlaying(!isPlaying);
//   };

//   const getNext = useCallback(() => {
//     if (!queue.length) return null;
//     const idx = queue.findIndex(s => s._id === currentSong?._id);
//     if (isShuffle) return queue[Math.floor(Math.random() * queue.length)];
//     return queue[(idx + 1) % queue.length];
//   }, [queue, currentSong, isShuffle]);

//   const getPrev = useCallback(() => {
//     if (!queue.length) return null;
//     const idx = queue.findIndex(s => s._id === currentSong?._id);
//     return queue[(idx - 1 + queue.length) % queue.length];
//   }, [queue, currentSong]);

//   const nextSong = () => { const n = getNext(); if (n) playSong(n); };
//   const prevSong = () => { const p = getPrev(); if (p) playSong(p); };

//   const handleEnded = () => {
//     if (isRepeat && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); }
//     else nextSong();
//   };

//   useEffect(() => {
//     if (audioRef.current && currentSong && isPlaying) {
//       audioRef.current.play().catch(() => {});
//     }
//   }, [currentSong]);

//   useEffect(() => {
//     if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
//   }, [volume, isMuted]);

//   const toggleFav = (song) => {
//     setFavorites(prev => {
//       const exists = prev.find(s => s._id === song._id);
//       const next = exists ? prev.filter(s => s._id !== song._id) : [...prev, song];
//       localStorage.setItem("vibe_favs", JSON.stringify(next));
//       return next;
//     });
//   };

//   const isFav = (song) => favorites.some(s => s._id === song?._id);

//   const formatTime = (t) => {
//     if (!t || isNaN(t)) return "0:00";
//     const m = Math.floor(t / 60), s = Math.floor(t % 60);
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   const searchResults = searchQuery.trim()
//     ? songs.filter(s =>
//         s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         s.album.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : [];

//   const playRandom = () => {
//     if (!songs.length) return;
//     const random = songs[Math.floor(Math.random() * songs.length)];
//     playSong(random, songs);
//   };

//   const playAlbum = (albumName) => {
//     const albumSongs = albums[albumName];
//     if (albumSongs?.length) { setQueue(albumSongs); playSong(albumSongs[0], albumSongs); }
//     setSelectedAlbum(albumName);
//     setActiveTab("albums");
//   };

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   // ---- RENDER SECTIONS ----

//   const renderHome = () => (
//     <div style={s.section}>
//       {/* Hero */}
//       <div style={s.hero}>
//         <div style={s.heroText}>
//           <div style={s.heroTag}>🎵 Your Music Space</div>
//           <h1 style={s.heroTitle}>Vibe-On</h1>
//           <p style={s.heroSub}>Discover, play, and feel every beat.</p>
//           <div style={s.heroActions}>
//             <button style={s.heroBtn} onClick={playRandom}>🎲 Random Play</button>
//             <button style={{...s.heroBtn, ...s.heroBtnSecondary}} onClick={() => setActiveTab("albums")}>Browse Albums →</button>
//           </div>
//         </div>
//         <div style={s.heroArt}>
//           <div style={s.vinylOuter}>
//             <div style={s.vinylInner}>
//               {currentSong ? (
//                 <img src={currentSong.imageUrl} alt="" style={s.vinylImg} />
//               ) : (
//                 <div style={s.vinylPlaceholder}>🎵</div>
//               )}
//             </div>
//             {isPlaying && <div style={s.vinylSpin} />}
//           </div>
//         </div>
//       </div>

//       {/* Recently Played */}
//       {recentlyPlayed.length > 0 && (
//         <div style={s.subsection}>
//           <h2 style={s.sectionTitle}>Recently Played</h2>
//           <div style={s.horizontalScroll}>
//             {recentlyPlayed.map(song => (
//               <div key={song._id} style={s.miniCard} onClick={() => playSong(song, songs)}>
//                 <img src={song.imageUrl} alt="" style={s.miniCardImg} />
//                 <div style={s.miniCardTitle}>{song.title}</div>
//                 <div style={s.miniCardArtist}>{song.artist}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Favorites */}
//       {favorites.length > 0 && (
//         <div style={s.subsection}>
//           <h2 style={s.sectionTitle}>❤️ Favorites</h2>
//           <div style={s.songGrid}>
//             {favorites.slice(0, 6).map(song => renderSongRow(song, favorites))}
//           </div>
//         </div>
//       )}

//       {/* All Albums */}
//       <div style={s.subsection}>
//         <h2 style={s.sectionTitle}>Albums</h2>
//         <div style={s.albumsGrid}>
//           {albumNames.map(name => (
//             <div key={name} style={s.albumCard} onClick={() => playAlbum(name)}>
//               <div style={s.albumImgWrap}>
//                 <img src={albums[name][0]?.imageUrl} alt={name} style={s.albumImg} />
//                 <div style={s.albumPlayOverlay}><FaPlay size={20} color="#fff" /></div>
//               </div>
//               <div style={s.albumName}>{name}</div>
//               <div style={s.albumMeta}>{albums[name].length} tracks</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderAlbums = () => (
//     <div style={s.section}>
//       {selectedAlbum ? (
//         <>
//           <button style={s.backBtn} onClick={() => setSelectedAlbum(null)}>← Back to Albums</button>
//           <div style={s.albumHeader}>
//             <img src={albums[selectedAlbum]?.[0]?.imageUrl} alt="" style={s.albumHeaderImg} />
//             <div>
//               <div style={s.albumHeaderTag}>Album</div>
//               <h2 style={s.albumHeaderTitle}>{selectedAlbum}</h2>
//               <p style={s.albumHeaderMeta}>{albums[selectedAlbum]?.length} Tracks</p>
//               <button style={s.playAllBtn} onClick={() => { const songs = albums[selectedAlbum]; playSong(songs[0], songs); }}>▶ Play All</button>
//             </div>
//           </div>
//           <div style={s.songGrid}>
//             {albums[selectedAlbum]?.map((song, i) => renderSongRow(song, albums[selectedAlbum], i))}
//           </div>
//         </>
//       ) : (
//         <>
//           <h2 style={s.sectionTitle}>All Albums</h2>
//           <div style={s.albumsGrid}>
//             {albumNames.map(name => (
//               <div key={name} style={s.albumCard} onClick={() => setSelectedAlbum(name)}>
//                 <div style={s.albumImgWrap}>
//                   <img src={albums[name][0]?.imageUrl} alt={name} style={s.albumImg} />
//                   <div style={s.albumPlayOverlay}><FaPlay size={20} color="#fff" /></div>
//                 </div>
//                 <div style={s.albumName}>{name}</div>
//                 <div style={s.albumMeta}>{albums[name].length} tracks</div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );

//   const renderSearch = () => (
//     <div style={s.section}>
//       <h2 style={s.sectionTitle}>Search</h2>
//       <div style={s.searchBar}>
//         <FaSearch color="#ff6db0" />
//         <input
//           style={s.searchInput}
//           placeholder="Songs, artists, albums..."
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//           autoFocus
//         />
//         {searchQuery && <button style={s.clearBtn} onClick={() => setSearchQuery("")}><FaTimes size={14} /></button>}
//       </div>
//       {searchQuery && (
//         <div style={s.songGrid}>
//           {searchResults.length === 0
//             ? <p style={s.emptyMsg}>No results for "{searchQuery}"</p>
//             : searchResults.map(song => renderSongRow(song, searchResults))
//           }
//         </div>
//       )}
//       {!searchQuery && (
//         <div style={s.subsection}>
//           <h3 style={s.sectionTitle}>All Songs</h3>
//           <div style={s.songGrid}>
//             {songs.map(song => renderSongRow(song, songs))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderFavorites = () => (
//     <div style={s.section}>
//       <h2 style={s.sectionTitle}>❤️ Favorites</h2>
//       {favorites.length === 0
//         ? <p style={s.emptyMsg}>No favorites yet. Tap the heart on any song!</p>
//         : <div style={s.songGrid}>{favorites.map(song => renderSongRow(song, favorites))}</div>
//       }
//     </div>
//   );

//   const renderSongRow = (song, list = [], idx) => {
//     const active = currentSong?._id === song._id;
//     return (
//       <div key={song._id} style={{...s.songRow, ...(active ? s.songRowActive : {})}} onClick={() => playSong(song, list)}>
//         <div style={s.songRowLeft}>
//           <div style={s.songRowNum}>{active && isPlaying ? <span style={s.playingDot}>▶</span> : (idx !== undefined ? idx + 1 : "")}</div>
//           <img src={song.imageUrl} alt="" style={s.songRowImg} />
//           <div>
//             <div style={{...s.songRowTitle, ...(active ? s.songRowTitleActive : {})}}>{song.title}</div>
//             <div style={s.songRowArtist}>{song.artist}</div>
//           </div>
//         </div>
//         <div style={s.songRowRight}>
//           <span style={s.songRowAlbum}>{song.album}</span>
//           <button style={s.favBtn} onClick={e => { e.stopPropagation(); toggleFav(song); }}>
//             <FaHeart color={isFav(song) ? "#ff6db0" : "#ccc"} size={14} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={s.root}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 4px; height: 4px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: #ffb3d9; border-radius: 10px; }
//         @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
//         .spin { animation: spin 3s linear infinite; }
//         .fadeUp { animation: fadeUp 0.4s ease; }
//       `}</style>

//       {/* Sidebar */}
//       <div style={{...s.sidebar, ...(sidebarOpen ? s.sidebarOpen : {})}}>
//         <div style={s.sidebarLogo}>🎵 Vibe-On</div>
//         {[
//           {id:"home", icon:<FaHome/>, label:"Home"},
//           {id:"albums", icon:<FaMusic/>, label:"Albums"},
//           {id:"search", icon:<FaSearch/>, label:"Search"},
//           {id:"favorites", icon:<FaHeart/>, label:"Favorites"},
//         ].map(tab => (
//           <div key={tab.id} style={{...s.sidebarItem, ...(activeTab===tab.id ? s.sidebarItemActive : {})}}
//             onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}>
//             <span style={s.sidebarIcon}>{tab.icon}</span>
//             <span>{tab.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && <div style={s.overlay} onClick={() => setSidebarOpen(false)} />}

//       {/* Main */}
//       <div style={s.main}>
//         {/* Top Bar */}
//         <div style={s.topbar}>
//           <button style={s.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}><FaBars /></button>
//           <div style={s.topbarTitle}>
//             {activeTab === "home" && "Home"}
//             {activeTab === "albums" && (selectedAlbum || "Albums")}
//             {activeTab === "search" && "Search"}
//             {activeTab === "favorites" && "Favorites"}
//           </div>
//           <button style={s.randomBtn} onClick={playRandom} title="Random Song">🎲</button>
//         </div>

//         {/* Bottom Nav (mobile) */}
//         <div style={s.bottomNav}>
//           {[
//             {id:"home", icon:<FaHome size={18}/>, label:"Home"},
//             {id:"albums", icon:<FaMusic size={18}/>, label:"Albums"},
//             {id:"search", icon:<FaSearch size={18}/>, label:"Search"},
//             {id:"favorites", icon:<FaHeart size={18}/>, label:"Favs"},
//           ].map(tab => (
//             <div key={tab.id} style={{...s.bottomNavItem, ...(activeTab===tab.id ? s.bottomNavItemActive : {})}}
//               onClick={() => setActiveTab(tab.id)}>
//               {tab.icon}
//               <span style={s.bottomNavLabel}>{tab.label}</span>
//             </div>
//           ))}
//         </div>

//         {/* Content */}
//         <div style={s.contentArea}>
//           {loading ? (
//             <div style={s.skeletonGrid}>
//               {[1,2,3,4,5,6].map(i => <div key={i} style={s.skeleton} />)}
//             </div>
//           ) : (
//             <div className="fadeUp">
//               {activeTab === "home" && renderHome()}
//               {activeTab === "albums" && renderAlbums()}
//               {activeTab === "search" && renderSearch()}
//               {activeTab === "favorites" && renderFavorites()}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Now Playing Bar */}
//       {currentSong && (
//         <div style={s.nowPlayingBar} onClick={() => setMobilePlayerOpen(true)}>
//           <img src={currentSong.imageUrl} alt="" style={s.npImg} />
//           <div style={s.npInfo}>
//             <div style={s.npTitle}>{currentSong.title}</div>
//             <div style={s.npArtist}>{currentSong.artist}</div>
//           </div>
//           <div style={s.npControls} onClick={e => e.stopPropagation()}>
//             <button style={s.npBtn} onClick={prevSong}><FaBackward size={14} /></button>
//             <button style={{...s.npBtn, ...s.npPlayBtn}} onClick={togglePlay}>
//               {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
//             </button>
//             <button style={s.npBtn} onClick={nextSong}><FaForward size={14} /></button>
//           </div>
//           <div style={s.npProgress}>
//             <div style={{...s.npProgressFill, width: `${progress}%`}} />
//           </div>
//         </div>
//       )}

//       {/* Full Player Modal */}
//       {mobilePlayerOpen && currentSong && (
//         <div style={s.playerModal}>
//           <button style={s.closePlayer} onClick={() => setMobilePlayerOpen(false)}>↓ Close</button>
          
//           <div style={s.playerInner}>
//             <div style={s.playerImgWrap}>
//               <img src={currentSong.imageUrl} alt="" style={{...s.playerImg, ...(isPlaying ? {animation:"spin 8s linear infinite"} : {})}} />
//             </div>

//             <div style={s.playerMeta}>
//               <div style={s.playerTitle}>{currentSong.title}</div>
//               <div style={s.playerArtist}>{currentSong.artist}</div>
//               <div style={s.playerAlbum}>{currentSong.album}</div>
//             </div>

//             <button style={s.playerFavBtn} onClick={() => toggleFav(currentSong)}>
//               <FaHeart color={isFav(currentSong) ? "#ff6db0" : "#ccc"} size={20} />
//             </button>

//             <div style={s.progressBarWrap}>
//               <span style={s.timeLabel}>{formatTime(currentTime)}</span>
//               <input type="range" min="0" max={duration||0} value={currentTime}
//                 onChange={e => { audioRef.current.currentTime = e.target.value; setCurrentTime(+e.target.value); }}
//                 style={s.progressBar} />
//               <span style={s.timeLabel}>{formatTime(duration)}</span>
//             </div>

//             <div style={s.playerControls}>
//               <button style={{...s.ctrlBtn, ...(isShuffle ? s.ctrlBtnActive : {})}} onClick={() => setIsShuffle(!isShuffle)}>
//                 <FaRandom size={16} />
//               </button>
//               <button style={s.ctrlBtnLg} onClick={prevSong}><FaBackward size={18} /></button>
//               <button style={s.playPauseBtn} onClick={togglePlay}>
//                 {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
//               </button>
//               <button style={s.ctrlBtnLg} onClick={nextSong}><FaForward size={18} /></button>
//               <button style={{...s.ctrlBtn, ...(isRepeat ? s.ctrlBtnActive : {})}} onClick={() => setIsRepeat(!isRepeat)}>
//                 <FaRedo size={16} />
//               </button>
//             </div>

//             <div style={s.volumeRow}>
//               <button style={s.volBtn} onClick={() => setIsMuted(!isMuted)}>
//                 {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
//               </button>
//               <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
//                 onChange={e => { setVolume(+e.target.value); setIsMuted(false); }}
//                 style={s.volumeBar} />
//             </div>

//             {/* Queue */}
//             {queue.length > 1 && (
//               <div style={s.queueWrap}>
//                 <div style={s.queueTitle}>Up Next</div>
//                 {queue.slice(queue.findIndex(s => s._id === currentSong._id) + 1, queue.findIndex(s => s._id === currentSong._id) + 4).map(song => (
//                   <div key={song._id} style={s.queueItem} onClick={() => playSong(song, queue)}>
//                     <img src={song.imageUrl} alt="" style={s.queueImg} />
//                     <div>
//                       <div style={s.queueItemTitle}>{song.title}</div>
//                       <div style={s.queueItemArtist}>{song.artist}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <audio ref={audioRef} src={currentSong?.audioUrl}
//             onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
//             onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
//             onEnded={handleEnded}
//           />
//         </div>
//       )}

//       {/* Hidden audio when player closed */}
//       {!mobilePlayerOpen && currentSong && (
//         <audio ref={audioRef} src={currentSong?.audioUrl}
//           onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
//           onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
//           onEnded={handleEnded}
//         />
//       )}
//     </div>
//   );
// }

// const PINK = "#ff6db0";
// const BLUE = "#5db8ff";
// const BG = "#fdf6fb";
// const CARD = "#fff";
// const TEXT = "#1a1a2e";
// const MUTED = "#9098b1";

// const s = {
//   root: { fontFamily:"'Sora', sans-serif", background:BG, minHeight:"100vh", display:"flex", color:TEXT, position:"relative" },

//   // Sidebar
//   sidebar: { width:220, background:CARD, borderRight:"1px solid #f0e6f7", padding:"24px 16px", display:"flex", flexDirection:"column", gap:4, position:"fixed", left:0, top:0, bottom:0, zIndex:200, transform:"translateX(-100%)", transition:"transform 0.3s ease" },
//   sidebarOpen: { transform:"translateX(0)" },
//   sidebarLogo: { fontSize:20, fontWeight:700, color:PINK, marginBottom:24, padding:"0 12px" },
//   sidebarItem: { display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:12, cursor:"pointer", color:MUTED, fontSize:14, fontWeight:500 },
//   sidebarItemActive: { background:"#fff0f8", color:PINK, fontWeight:600 },
//   sidebarIcon: { fontSize:16 },
//   overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:199 },

//   // Main
//   main: { flex:1, display:"flex", flexDirection:"column", minHeight:"100vh" },
//   topbar: { position:"sticky", top:0, background:BG, borderBottom:"1px solid #f0e6f7", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:100, backdropFilter:"blur(10px)" },
//   menuBtn: { background:"none", border:"none", fontSize:18, cursor:"pointer", color:TEXT, padding:6 },
//   topbarTitle: { fontWeight:700, fontSize:18, color:TEXT },
//   randomBtn: { background:"none", border:"none", fontSize:20, cursor:"pointer", padding:6 },

//   // Bottom Nav
//   bottomNav: { position:"fixed", bottom:currentSong => currentSong ? 72 : 0, left:0, right:0, background:CARD, borderTop:"1px solid #f0e6f7", display:"flex", zIndex:150, boxShadow:"0 -2px 20px rgba(255,109,176,0.08)" },
//   bottomNavItem: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"10px 0 8px", cursor:"pointer", color:MUTED },
//   bottomNavItemActive: { color:PINK },
//   bottomNavLabel: { fontSize:10, fontWeight:600 },

//   contentArea: { flex:1, overflowY:"auto", padding:"0 0 160px" },
//   section: { padding:"20px 16px" },
//   subsection: { marginTop:32 },
//   sectionTitle: { fontSize:18, fontWeight:700, marginBottom:16, color:TEXT },

//   // Hero
//   hero: { background:`linear-gradient(135deg, #fff0f8 0%, #e8f4ff 100%)`, borderRadius:20, padding:24, display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, marginBottom:8, overflow:"hidden", position:"relative" },
//   heroText: { flex:1, minWidth:0 },
//   heroTag: { fontSize:12, color:PINK, fontWeight:600, marginBottom:8 },
//   heroTitle: { fontSize:36, fontWeight:700, color:TEXT, lineHeight:1.1, marginBottom:8 },
//   heroSub: { fontSize:14, color:MUTED, marginBottom:20 },
//   heroActions: { display:"flex", gap:10, flexWrap:"wrap" },
//   heroBtn: { padding:"10px 18px", borderRadius:30, border:"none", background:`linear-gradient(90deg, ${PINK}, ${BLUE})`, color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer" },
//   heroBtnSecondary: { background:"rgba(255,109,176,0.1)", color:PINK },
//   heroArt: { flexShrink:0 },
//   vinylOuter: { width:110, height:110, borderRadius:"50%", background:`linear-gradient(135deg, #f8d7ea, #c9e8ff)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" },
//   vinylInner: { width:80, height:80, borderRadius:"50%", overflow:"hidden", background:"#eee", display:"flex", alignItems:"center", justifyContent:"center" },
//   vinylImg: { width:"100%", height:"100%", objectFit:"cover" },
//   vinylPlaceholder: { fontSize:28 },
//   vinylSpin: { position:"absolute", inset:0, borderRadius:"50%", border:"2px dashed rgba(255,109,176,0.4)", animation:"spin 4s linear infinite" },

//   // Horizontal scroll
//   horizontalScroll: { display:"flex", gap:16, overflowX:"auto", paddingBottom:8 },
//   miniCard: { flexShrink:0, width:120, cursor:"pointer" },
//   miniCardImg: { width:120, height:120, borderRadius:12, objectFit:"cover", display:"block", marginBottom:8 },
//   miniCardTitle: { fontSize:12, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   miniCardArtist: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },

//   // Albums
//   albumsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:16 },
//   albumCard: { cursor:"pointer", borderRadius:14, overflow:"hidden", background:CARD, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", transition:"transform 0.2s" },
//   albumImgWrap: { position:"relative", overflow:"hidden" },
//   albumImg: { width:"100%", aspectRatio:"1", objectFit:"cover", display:"block", transition:"transform 0.3s" },
//   albumPlayOverlay: { position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s" },
//   albumName: { padding:"10px 10px 4px", fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   albumMeta: { padding:"0 10px 10px", fontSize:11, color:MUTED },

//   // Album Header
//   albumHeader: { display:"flex", gap:20, marginBottom:24, alignItems:"flex-end", flexWrap:"wrap" },
//   albumHeaderImg: { width:120, height:120, borderRadius:16, objectFit:"cover", flexShrink:0 },
//   albumHeaderTag: { fontSize:11, fontWeight:600, color:PINK, textTransform:"uppercase", letterSpacing:1, marginBottom:6 },
//   albumHeaderTitle: { fontSize:24, fontWeight:700, color:TEXT, marginBottom:4 },
//   albumHeaderMeta: { fontSize:13, color:MUTED, marginBottom:12 },
//   playAllBtn: { padding:"10px 22px", borderRadius:30, border:"none", background:`linear-gradient(90deg, ${PINK}, ${BLUE})`, color:"#fff", fontWeight:600, cursor:"pointer", fontSize:13 },
//   backBtn: { background:"none", border:`1px solid ${PINK}`, color:PINK, padding:"8px 16px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:500, marginBottom:20 },

//   // Song rows
//   songGrid: { display:"flex", flexDirection:"column", gap:2 },
//   songRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:12, cursor:"pointer", transition:"background 0.15s" },
//   songRowActive: { background:`linear-gradient(90deg, rgba(255,109,176,0.08), rgba(93,184,255,0.08))` },
//   songRowLeft: { display:"flex", alignItems:"center", gap:12, minWidth:0 },
//   songRowNum: { width:20, textAlign:"center", fontSize:12, color:MUTED, flexShrink:0 },
//   playingDot: { color:PINK, fontSize:12 },
//   songRowImg: { width:44, height:44, borderRadius:8, objectFit:"cover", flexShrink:0 },
//   songRowTitle: { fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:160 },
//   songRowTitleActive: { color:PINK },
//   songRowArtist: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:160 },
//   songRowRight: { display:"flex", alignItems:"center", gap:12, flexShrink:0 },
//   songRowAlbum: { fontSize:11, color:MUTED, display:"none" }, // hidden on mobile, shown via media
//   favBtn: { background:"none", border:"none", cursor:"pointer", padding:4, display:"flex" },

//   // Search
//   searchBar: { display:"flex", alignItems:"center", gap:12, background:CARD, borderRadius:14, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", marginBottom:20 },
//   searchInput: { flex:1, border:"none", outline:"none", fontSize:15, fontFamily:"inherit", background:"none", color:TEXT },
//   clearBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, display:"flex" },
//   emptyMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:40 },

//   // Skeleton
//   skeletonGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:16, padding:20 },
//   skeleton: { aspectRatio:"1", borderRadius:14, background:"linear-gradient(90deg, #f5e8f2 25%, #ecdff0 50%, #f5e8f2 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.4s infinite" },

//   // Now Playing Bar
//   nowPlayingBar: { position:"fixed", bottom:60, left:0, right:0, background:CARD, borderTop:"1px solid #f0e6f7", padding:"10px 16px", display:"flex", alignItems:"center", gap:12, zIndex:140, cursor:"pointer", boxShadow:"0 -4px 20px rgba(255,109,176,0.12)" },
//   npImg: { width:44, height:44, borderRadius:10, objectFit:"cover", flexShrink:0 },
//   npInfo: { flex:1, minWidth:0 },
//   npTitle: { fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   npArtist: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   npControls: { display:"flex", alignItems:"center", gap:8, flexShrink:0 },
//   npBtn: { background:"none", border:"none", cursor:"pointer", color:TEXT, padding:6, display:"flex" },
//   npPlayBtn: { background:`linear-gradient(135deg, ${PINK}, ${BLUE})`, borderRadius:"50%", color:"#fff", width:36, height:36, alignItems:"center", justifyContent:"center" },
//   npProgress: { position:"absolute", bottom:0, left:0, right:0, height:2, background:"#f0e6f7" },
//   npProgressFill: { height:"100%", background:`linear-gradient(90deg, ${PINK}, ${BLUE})`, transition:"width 0.5s linear" },

//   // Player Modal
//   playerModal: { position:"fixed", inset:0, background:BG, zIndex:300, overflowY:"auto", display:"flex", flexDirection:"column" },
//   closePlayer: { background:"none", border:"none", color:MUTED, padding:"16px 20px", cursor:"pointer", fontSize:13, fontWeight:600, textAlign:"left" },
//   playerInner: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"0 24px 40px", maxWidth:480, margin:"0 auto", width:"100%" },
//   playerImgWrap: { width:220, height:220, borderRadius:"50%", overflow:"hidden", marginBottom:28, boxShadow:"0 20px 60px rgba(255,109,176,0.3)" },
//   playerImg: { width:"100%", height:"100%", objectFit:"cover" },
//   playerMeta: { textAlign:"center", marginBottom:8 },
//   playerTitle: { fontSize:22, fontWeight:700, color:TEXT, marginBottom:4 },
//   playerArtist: { fontSize:15, color:MUTED, marginBottom:2 },
//   playerAlbum: { fontSize:12, color:PINK, fontWeight:600 },
//   playerFavBtn: { background:"none", border:"none", cursor:"pointer", marginTop:12, marginBottom:8 },
//   progressBarWrap: { display:"flex", alignItems:"center", gap:10, width:"100%", marginTop:16 },
//   timeLabel: { fontSize:11, color:MUTED, width:32, textAlign:"center", flexShrink:0 },
//   progressBar: { flex:1, accentColor:PINK, height:4, cursor:"pointer" },
//   playerControls: { display:"flex", alignItems:"center", gap:20, marginTop:24 },
//   ctrlBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, padding:8, display:"flex", borderRadius:8 },
//   ctrlBtnActive: { color:PINK },
//   ctrlBtnLg: { background:"none", border:"none", cursor:"pointer", color:TEXT, padding:10, display:"flex" },
//   playPauseBtn: { width:64, height:64, borderRadius:"50%", background:`linear-gradient(135deg, ${PINK}, ${BLUE})`, border:"none", cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 24px rgba(255,109,176,0.4)` },
//   volumeRow: { display:"flex", alignItems:"center", gap:10, marginTop:20, width:"100%", maxWidth:280 },
//   volBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, display:"flex" },
//   volumeBar: { flex:1, accentColor:PINK },
//   queueWrap: { width:"100%", marginTop:28 },
//   queueTitle: { fontSize:13, fontWeight:700, color:TEXT, marginBottom:12, textTransform:"uppercase", letterSpacing:1 },
//   queueItem: { display:"flex", alignItems:"center", gap:12, padding:"8px 0", cursor:"pointer", borderBottom:"1px solid #f5e8f2" },
//   queueImg: { width:40, height:40, borderRadius:8, objectFit:"cover" },
//   queueItemTitle: { fontSize:13, fontWeight:600, color:TEXT },
//   queueItemArtist: { fontSize:11, color:MUTED },
// };
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaHeart, FaSearch, FaVolumeUp, FaVolumeMute, FaTimes, FaHome, FaMusic, FaFire, FaPalette } from "react-icons/fa";

const API = "https://music-app-f9t7.onrender.com/api";

let _cache = null;
let _promise = null;
function fetchSongs() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(`${API}/`).then(r => r.json()).then(d => { _cache = d; return d; });
  return _promise;
}

const THEMES = {
  Amber:  { bg:"#0f0f12",surface:"#18181b",card:"#1f1f23",border:"#2a2a2f",accent:"#f59e0b",accentDim:"rgba(245,158,11,0.08)",accentBorder:"rgba(245,158,11,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
  Purple: { bg:"#0d0d14",surface:"#16162a",card:"#1e1e35",border:"#2d2d4a",accent:"#a855f7",accentDim:"rgba(168,85,247,0.08)",accentBorder:"rgba(168,85,247,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
  Cyan:   { bg:"#020f12",surface:"#071a1f",card:"#0c2530",border:"#0e3040",accent:"#06b6d4",accentDim:"rgba(6,182,212,0.08)",accentBorder:"rgba(6,182,212,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
  Rose:   { bg:"#120a0a",surface:"#1c1010",card:"#261515",border:"#3a1f1f",accent:"#f43f5e",accentDim:"rgba(244,63,94,0.08)",accentBorder:"rgba(244,63,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#fbbf24",success:"#22c55e" },
  Green:  { bg:"#090f0a",surface:"#101a10",card:"#162416",border:"#1e3520",accent:"#22c55e",accentDim:"rgba(34,197,94,0.08)",accentBorder:"rgba(34,197,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
};
const THEME_NAMES = Object.keys(THEMES);

// ─── Skeleton components ───
const SkelCard = ({ C }) => (
  <div style={{borderRadius:12,overflow:"hidden",background:C.card,border:`1px solid ${C.border}`}}>
    <div style={{width:"100%",aspectRatio:"1",background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite"}}/>
    <div style={{padding:"10px 12px 10px"}}>
      <div style={{height:12,borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:6}}/>
      <div style={{height:10,width:"60%",borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite"}}/>
    </div>
  </div>
);

const SkelRow = ({ C }) => (
  <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 10px",borderRadius:10}}>
    <div style={{width:22,height:12,borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",flexShrink:0}}/>
    <div style={{width:42,height:42,borderRadius:8,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",flexShrink:0}}/>
    <div style={{flex:1}}>
      <div style={{height:12,borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:6,width:"70%"}}/>
      <div style={{height:10,borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",width:"45%"}}/>
    </div>
  </div>
);

const SkelMini = ({ C }) => (
  <div style={{flexShrink:0,width:120}}>
    <div style={{width:120,height:120,borderRadius:10,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:8}}/>
    <div style={{height:11,borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:4}}/>
    <div style={{height:10,width:"60%",borderRadius:4,background:`linear-gradient(90deg,${C.surface} 25%,${C.border} 50%,${C.surface} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite"}}/>
  </div>
);

export default function UserPanel() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem("vo_user_theme") || "Amber");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const C = THEMES[themeName] || THEMES.Amber;
  const pickTheme = (n) => { setThemeName(n); localStorage.setItem("vo_user_theme", n); setShowThemePicker(false); };

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
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem("vo_favs") || "[]"); } catch { return []; } });
  const [playerOpen, setPlayerOpen] = useState(false);
  const [recent, setRecent] = useState([]);

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

  const albums = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
  const albumNames = Object.keys(albums);

  const playSong = useCallback((song, list) => {
    if (list) setQueue(list);
    setCurrentSong(song); setIsPlaying(true);
    setRecent(prev => [song, ...prev.filter(s => s._id !== song._id)].slice(0, 12));
  }, []);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.volume = isMuted ? 0 : volume;
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentSong]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume; }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setIsPlaying(true); }
  };

  const navigate = (dir) => {
    if (!queue.length || !currentSong) return;
    const idx = queue.findIndex(s => s._id === currentSong._id);
    let next;
    if (dir === "next") next = isShuffle ? queue[Math.floor(Math.random() * queue.length)] : queue[(idx + 1) % queue.length];
    else next = queue[(idx - 1 + queue.length) % queue.length];
    playSong(next, queue);
  };

  const handleEnded = () => { if (isRepeat && audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } else navigate("next"); };
  const seek = (val) => { if (audioRef.current) { audioRef.current.currentTime = val; setCurrentTime(val); } };

  const toggleFav = (song, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = prev.find(s => s._id === song._id) ? prev.filter(s => s._id !== song._id) : [...prev, song];
      localStorage.setItem("vo_favs", JSON.stringify(next));
      return next;
    });
  };

  const isFav = id => favorites.some(s => s._id === id);
  const fmt = t => { if (!t || isNaN(t)) return "0:00"; return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`; };
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const searchResults = search.trim() ? songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()) || s.album.toLowerCase().includes(search.toLowerCase())) : [];
  const playAlbum = (name) => { const list = albums[name] || []; if (list.length) playSong(list[0], list); };
  const playRandom = () => { if (!songs.length) return; const s = songs[Math.floor(Math.random() * songs.length)]; playSong(s, songs); setPlayerOpen(true); };

  const u = makeUserStyles(C);

  const SongRow = ({ song, list, index }) => {
    const active = currentSong?._id === song._id;
    return (
      <div style={{...u.songRow,...(active?u.songRowActive:{})}} onClick={() => { playSong(song, list); setPlayerOpen(true); }}>
        <div style={u.songRowL}>
          <div style={u.songNum}>{active && isPlaying ? <span style={{color:C.accent}}>▶</span> : index + 1}</div>
          <img src={song.imageUrl} alt="" style={u.songThumb} loading="lazy"/>
          <div style={u.songMeta}>
            <div style={{...u.songTitle,...(active?{color:C.accent}:{})}}>{song.title}</div>
            <div style={u.songArtist}>{song.artist}</div>
          </div>
        </div>
        <div style={u.songRowR}>
          <span style={u.songAlbumTag} className="sat">{song.album}</span>
          <button style={u.heartBtn} onClick={e => toggleFav(song, e)}><FaHeart size={13} color={isFav(song._id) ? C.accent : C.muted}/></button>
        </div>
      </div>
    );
  };

  const AlbumCard = ({ name }) => (
    <div style={u.albumCard} onClick={() => { setSelectedAlbum(name); setTab("albums"); }}>
      <div style={u.albumThumbWrap}>
        <img src={albums[name][0]?.imageUrl} alt={name} style={u.albumThumb} loading="lazy"/>
        <div style={u.albumOverlay} onClick={e => { e.stopPropagation(); playAlbum(name); }}>
          <div style={u.playCircle}><FaPlay size={14} color="#0f0f0f"/></div>
        </div>
      </div>
      <div style={u.albumName}>{name}</div>
      <div style={u.albumCount}>{albums[name].length} tracks</div>
    </div>
  );

  return (
    <div style={u.root}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}input[type=range]{-webkit-appearance:none;height:3px;border-radius:4px;outline:none;cursor:pointer;}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:${C.accent};cursor:pointer;}@media(max-width:480px){.agrid{grid-template-columns:repeat(2,1fr)!important;}.sat{display:none!important;}}`}</style>

      {/* Theme Picker */}
      {showThemePicker&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowThemePicker(false)}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,maxWidth:320,width:"100%"}} onClick={e=>e.stopPropagation()}>
            <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:C.text}}>Choose Theme</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {THEME_NAMES.map(n=>(
                <button key={n} onClick={()=>pickTheme(n)} style={{padding:"8px 18px",borderRadius:8,border:`2px solid ${themeName===n?THEMES[n].accent:THEMES[n].border}`,background:THEMES[n].surface,color:THEMES[n].accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13}}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={u.tabBar}>
        {[{id:"home",icon:<FaHome size={17}/>,label:"Home"},{id:"albums",icon:<FaMusic size={17}/>,label:"Albums"},{id:"search",icon:<FaSearch size={17}/>,label:"Search"},{id:"favs",icon:<FaHeart size={17}/>,label:"Favs"}].map(t=>(
          <button key={t.id} style={{...u.tabItem,...(tab===t.id?u.tabItemActive:{})}} onClick={()=>{setTab(t.id);setSelectedAlbum(null);}}>
            <span style={tab===t.id?{color:C.accent}:{}}>{t.icon}</span>
            <span style={u.tabLabel}>{t.label}</span>
          </button>
        ))}
        <button style={{...u.tabItem}} onClick={()=>setShowThemePicker(true)}>
          <span><FaPalette size={17} color={C.muted}/></span>
          <span style={u.tabLabel}>Theme</span>
        </button>
      </div>

      <div style={u.page}>
        {/* Loading skeletons */}
        {loading&&(
          <div style={{animation:"slideUp 0.3s ease"}}>
            {/* Hero skeleton */}
            <div style={{background:C.surface,borderRadius:16,padding:"28px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:8,border:`1px solid ${C.border}`}}>
              <div style={{flex:1}}>
                <div style={{width:120,height:10,borderRadius:4,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:12}}/>
                <div style={{width:180,height:32,borderRadius:6,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:12}}/>
                <div style={{width:"80%",height:12,borderRadius:4,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:20}}/>
                <div style={{display:"flex",gap:10}}>
                  <div style={{width:100,height:36,borderRadius:30,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite"}}/>
                  <div style={{width:80,height:36,borderRadius:30,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite"}}/>
                </div>
              </div>
              <div style={{width:100,height:100,borderRadius:"50%",background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",flexShrink:0}}/>
            </div>
            {/* Recent skeleton */}
            <div style={{marginTop:36}}>
              <div style={{width:160,height:14,borderRadius:4,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:16}}/>
              <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:4}}>
                {[...Array(5)].map((_,i)=><SkelMini key={i} C={C}/>)}
              </div>
            </div>
            {/* Albums skeleton */}
            <div style={{marginTop:36}}>
              <div style={{width:80,height:14,borderRadius:4,background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`,backgroundSize:"400px 100%",animation:"shimmer 1.4s infinite",marginBottom:16}}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:16}} className="agrid">
                {[...Array(8)].map((_,i)=><SkelCard key={i} C={C}/>)}
              </div>
            </div>
          </div>
        )}

        {!loading&&tab==="home"&&(
          <div style={{animation:"slideUp 0.3s ease"}}>
            <div style={u.hero}>
              <div>
                <div style={u.heroEyebrow}>Vibe With Revanth</div>
                <h1 style={u.heroH1}>Vibe-On</h1>
                <p style={u.heroSub}>Discover. Play. Feel every beat.</p>
                <div style={u.heroActions}>
                  <button style={u.btnPrimary} onClick={()=>{playRandom();}}>🎲 Random</button>
                  <button style={u.btnGhost} onClick={()=>setTab("albums")}>Browse →</button>
                </div>
              </div>
              {currentSong&&(
                <div style={{flexShrink:0,cursor:"pointer"}} onClick={()=>setPlayerOpen(true)}>
                  <img src={currentSong.imageUrl} alt="" style={{...u.heroImg,...(isPlaying?{animation:"spin 12s linear infinite"}:{})}}/>
                </div>
              )}
            </div>

            {recent.length>0&&(
              <section style={u.section}>
                <h2 style={u.sectionTitle}><FaFire size={14} style={{color:C.accent}}/> Recently Played</h2>
                <div style={u.hScroll}>
                  {recent.map(s=>(
                    <div key={s._id} style={u.miniCard} onClick={()=>{playSong(s,songs);setPlayerOpen(true);}}>
                      <img src={s.imageUrl} alt="" style={u.miniImg} loading="lazy"/>
                      <div style={u.miniTitle}>{s.title}</div>
                      <div style={u.miniSub}>{s.artist}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {favorites.length>0&&(
              <section style={u.section}>
                <h2 style={u.sectionTitle}><FaHeart size={12} style={{color:C.accent}}/> Favorites</h2>
                <div style={u.songList}>
                  {favorites.slice(0,5).map((s,i)=><SongRow key={s._id} song={s} list={favorites} index={i}/>)}
                  {favorites.length>5&&<div style={{fontSize:13,color:C.accent,cursor:"pointer",padding:"10px 0",textAlign:"center"}} onClick={()=>setTab("favs")}>See all {favorites.length} →</div>}
                </div>
              </section>
            )}

            <section style={u.section}>
              <h2 style={u.sectionTitle}>Albums</h2>
              <div style={u.albumGrid} className="agrid">
                {albumNames.map(n=><AlbumCard key={n} name={n}/>)}
              </div>
            </section>
          </div>
        )}

        {!loading&&tab==="albums"&&(
          <div style={{animation:"slideUp 0.3s ease"}}>
            {selectedAlbum?(
              <>
                <button style={u.backBtn} onClick={()=>setSelectedAlbum(null)}>← Albums</button>
                <div style={u.albumHead}>
                  <img src={albums[selectedAlbum][0]?.imageUrl} alt="" style={u.albumHeadImg}/>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:C.accent,letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Album</div>
                    <h2 style={{fontSize:22,fontWeight:700,marginBottom:4,color:C.text}}>{selectedAlbum}</h2>
                    <div style={{fontSize:13,color:C.sub,marginBottom:14}}>{albums[selectedAlbum].length} tracks</div>
                    <button style={u.btnPrimary} onClick={()=>{playAlbum(selectedAlbum);setPlayerOpen(true);}}>▶ Play All</button>
                  </div>
                </div>
                <div style={u.songList}>{albums[selectedAlbum].map((s,i)=><SongRow key={s._id} song={s} list={albums[selectedAlbum]} index={i}/>)}</div>
              </>
            ):(
              <>
                <h2 style={{fontSize:22,fontWeight:700,marginBottom:20,letterSpacing:"-0.02em",color:C.text}}>Albums</h2>
                <div style={u.albumGrid} className="agrid">{albumNames.map(n=><AlbumCard key={n} name={n}/>)}</div>
              </>
            )}
          </div>
        )}

        {!loading&&tab==="search"&&(
          <div style={{animation:"slideUp 0.3s ease"}}>
            <div style={u.searchBox}>
              <FaSearch color={C.muted} size={14}/>
              <input style={u.searchInput} placeholder="Songs, artists, albums..." value={search} onChange={e=>setSearch(e.target.value)} autoFocus/>
              {search&&<button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex"}} onClick={()=>setSearch("")}><FaTimes size={13}/></button>}
            </div>
            {search?(
              <div style={u.songList}>
                {searchResults.length===0?<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:48}}>No results for "{search}"</p>:searchResults.map((s,i)=><SongRow key={s._id} song={s} list={searchResults} index={i}/>)}
              </div>
            ):(
              <div style={u.songList}>
                <div style={{fontSize:12,color:C.muted,fontWeight:600,letterSpacing:1,textTransform:"uppercase",padding:"0 4px 12px"}}>All Songs ({songs.length})</div>
                {songs.map((s,i)=><SongRow key={s._id} song={s} list={songs} index={i}/>)}
              </div>
            )}
          </div>
        )}

        {!loading&&tab==="favs"&&(
          <div style={{animation:"slideUp 0.3s ease"}}>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:20,color:C.text}}>Favorites</h2>
            {favorites.length===0?<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:48}}>No favorites yet. Tap ♥ on any song.</p>:<div style={u.songList}>{favorites.map((s,i)=><SongRow key={s._id} song={s} list={favorites} index={i}/>)}</div>}
          </div>
        )}
      </div>

      {currentSong&&!playerOpen&&(
        <div style={u.miniPlayer} onClick={()=>setPlayerOpen(true)}>
          <img src={currentSong.imageUrl} alt="" style={u.miniPlayerImg}/>
          <div style={u.miniPlayerInfo}>
            <div style={u.miniPlayerTitle}>{currentSong.title}</div>
            <div style={{fontSize:11,color:C.sub}}>{currentSong.artist}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}} onClick={e=>e.stopPropagation()}>
            <button style={{background:"none",border:"none",cursor:"pointer",color:C.sub,padding:6,display:"flex"}} onClick={()=>navigate("prev")}><FaBackward size={13}/></button>
            <button style={{width:50,height:30,borderRadius:"10%",background:C.accent,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#0f0f0f"}} onClick={togglePlay}>{isPlaying?<FaPause size={20}/>:<FaPlay size={20}/>}</button>
            <button style={{background:"none",border:"none",cursor:"pointer",color:C.sub,padding:6,display:"flex"}} onClick={()=>navigate("next")}><FaForward size={13}/></button>
          </div>
        </div>
      )}

      {playerOpen&&currentSong&&(
        <div style={u.fullPlayer}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px"}}>
            <button style={{background:"gray",border:`1px solid ${C.border}`,color:"black",width:76,height:36,borderRadius:"4px",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setPlayerOpen(false)}>Back</button>
            <span style={{fontSize:12,fontWeight:600,color:C.muted,letterSpacing:1,textTransform:"uppercase"}}>Now Playing</span>
            <button style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex"}} onClick={()=>toggleFav(currentSong)}><FaHeart size={16} color={isFav(currentSong._id)?C.accent:C.muted}/></button>
          </div>

          <div style={{display:"flex",justifyContent:"center",padding:"10px 40px 24px"}}>
            <img src={currentSong.imageUrl} alt="" style={{width:"min(240px,60vw)",height:"min(240px,60vw)",borderRadius:"50%",objectFit:"cover",border:`3px solid ${C.border}`,...(isPlaying?{animation:"spin 12s linear infinite"}:{})}}/>
          </div>

          <div style={{textAlign:"center",padding:"0 24px 20px"}}>
            <div style={{fontSize:22,fontWeight:700,letterSpacing:"-0.02em",marginBottom:4,color:C.text}}>{currentSong.title}</div>
            <div style={{fontSize:15,color:C.sub,marginBottom:4}}>{currentSong.artist}</div>
            <div style={{fontSize:12,color:C.accent,fontWeight:600}}>{currentSong.album}</div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 24px 20px"}}>
            <span style={{fontSize:11,color:C.muted,width:34,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{fmt(currentTime)}</span>
            <input type="range" min={0} max={duration||0} value={currentTime} onChange={e=>seek(+e.target.value)} style={{flex:1,accentColor:C.accent,background:`linear-gradient(to right,${C.accent} ${progress}%,${C.border} ${progress}%)`}}/>
            <span style={{fontSize:11,color:C.muted,width:34,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{fmt(duration)}</span>
          </div>

          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:22,padding:"0 24px 16px"}}>
            <button style={{background:"none",border:"none",cursor:"pointer",color:isShuffle?C.accent:C.muted,padding:8,display:"flex",borderRadius:8}} onClick={()=>setIsShuffle(!isShuffle)}><FaRandom size={15}/></button>
            <button style={{background:"none",border:"none",cursor:"pointer",color:C.sub,padding:10,display:"flex"}} onClick={()=>navigate("prev")}><FaBackward size={18}/></button>
            <button style={{width:60,height:60,borderRadius:"50%",background:C.accent,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#0f0f0f"}} onClick={togglePlay}>{isPlaying?<FaPause size={20}/>:<FaPlay size={20}/>}</button>
            <button style={{background:"none",border:"none",cursor:"pointer",color:C.sub,padding:10,display:"flex"}} onClick={()=>navigate("next")}><FaForward size={18}/></button>
            <button style={{background:"none",border:"none",cursor:"pointer",color:isRepeat?C.accent:C.muted,padding:8,display:"flex",borderRadius:8}} onClick={()=>setIsRepeat(!isRepeat)}><FaRedo size={15}/></button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 28px 24px",maxWidth:320,margin:"0 auto",width:"100%"}}>
            <button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,padding:8,display:"flex",borderRadius:8}} onClick={()=>setIsMuted(!isMuted)}>{isMuted?<FaVolumeMute size={14}/>:<FaVolumeUp size={14}/>}</button>
            <input type="range" min={0} max={1} step={0.01} value={isMuted?0:volume} onChange={e=>{setVolume(+e.target.value);setIsMuted(false);}} style={{flex:1,accentColor:C.accent}}/>
          </div>

          {queue.length>1&&(()=>{
            const idx=queue.findIndex(s=>s._id===currentSong._id);
            const upNext=queue.slice(idx+1,idx+4);
            return upNext.length>0?(
              <div style={{padding:"0 20px"}}>
                <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>Up Next</div>
                {upNext.map(s=>(
                  <div key={s._id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",cursor:"pointer",borderBottom:`1px solid ${C.border}`}} onClick={()=>playSong(s,queue)}>
                    <img src={s.imageUrl} alt="" style={{width:38,height:38,borderRadius:6,objectFit:"cover"}} loading="lazy"/>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text}}>{s.title}</div>
                      <div style={{fontSize:11,color:C.sub}}>{s.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            ):null;
          })()}
        </div>
      )}

      <audio ref={audioRef} onLoadedMetadata={()=>setDuration(audioRef.current?.duration||0)} onEnded={handleEnded}/>
    </div>
  );
}

function makeUserStyles(C) {
  return {
    root:{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,paddingBottom:130},
    page:{maxWidth:860,margin:"0 auto",padding:"24px 16px"},
    tabBar:{position:"fixed",bottom:0,left:0,right:0,zIndex:200,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",height:60},
    tabItem:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:11},
    tabItemActive:{color:C.accent},
    tabLabel:{fontSize:10,fontWeight:600,letterSpacing:0.3},
    hero:{background:C.surface,borderRadius:16,padding:"28px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:8,border:`1px solid ${C.border}`},
    heroEyebrow:{fontSize:11,color:C.accent,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:8},
    heroH1:{fontSize:38,fontWeight:700,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:8,color:"white"},
    heroSub:{fontSize:14,color:C.sub,marginBottom:20},
    heroActions:{display:"flex",gap:10,flexWrap:"wrap"},
    heroImg:{width:100,height:100,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.border}`},
    btnPrimary:{padding:"9px 20px",borderRadius:30,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
    btnGhost:{padding:"9px 20px",borderRadius:30,border:`1px solid ${C.border}`,background:"none",color:C.sub,fontWeight:500,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"},
    section:{marginTop:36},
    sectionTitle:{fontSize:15,fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:8,color:"white"},
    hScroll:{display:"flex",gap:14,overflowX:"auto",paddingBottom:4},
    miniCard:{flexShrink:0,width:120,cursor:"pointer"},
    miniImg:{width:120,height:120,borderRadius:10,objectFit:"cover",display:"block",marginBottom:8},
    miniTitle:{fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.text},
    miniSub:{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},
    albumGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:16},
    albumCard:{cursor:"pointer",borderRadius:12,overflow:"hidden",background:C.card,border:`1px solid ${C.border}`},
    albumThumbWrap:{position:"relative"},
    albumThumb:{width:"100%",aspectRatio:"1",objectFit:"cover",display:"block"},
    albumOverlay:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s"},
    playCircle:{width:40,height:40,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center"},
    albumName:{padding:"10px 12px 4px",fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.text},
    albumCount:{padding:"0 12px 10px",fontSize:11,color:C.sub},
    albumHead:{display:"flex",gap:20,marginBottom:24,alignItems:"flex-end",flexWrap:"wrap"},
    albumHeadImg:{width:110,height:110,borderRadius:12,objectFit:"cover",flexShrink:0},
    backBtn:{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:`1px solid ${C.border}`,color:C.sub,padding:"7px 16px",borderRadius:20,cursor:"pointer",fontSize:13,marginBottom:20,fontFamily:"'Outfit',sans-serif"},
    songList:{display:"flex",flexDirection:"column",gap:2},
    songRow:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 10px",borderRadius:10,cursor:"pointer",transition:"background 0.15s"},
    songRowActive:{background:C.accentDim},
    songRowL:{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1},
    songNum:{width:22,textAlign:"center",fontSize:12,color:C.muted,flexShrink:0,fontFamily:"monospace"},
    songThumb:{width:42,height:42,borderRadius:8,objectFit:"cover",flexShrink:0},
    songMeta:{minWidth:0},
    songTitle:{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:200,color:C.text},
    songArtist:{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},
    songRowR:{display:"flex",alignItems:"center",gap:10,flexShrink:0},
    songAlbumTag:{fontSize:11,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:100},
    heartBtn:{background:"none",border:"none",cursor:"pointer",padding:4,display:"flex"},
    searchBox:{display:"flex",alignItems:"center",gap:10,background:C.surface,borderRadius:12,padding:"12px 16px",border:`1px solid ${C.border}`,marginBottom:20},
    searchInput:{flex:1,background:"none",border:"none",outline:"none",fontSize:15,color:C.text,fontFamily:"'Outfit',sans-serif"},
    miniPlayer:{position:"fixed",bottom:60,left:0,right:0,zIndex:190,background:C.surface,borderTop:`1px solid ${C.border}`,padding:"10px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"},
    miniPlayerImg:{width:42,height:42,borderRadius:8,objectFit:"cover",flexShrink:0},
    miniPlayerInfo:{flex:1,minWidth:0},
    miniPlayerTitle:{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",color:C.text},
    fullPlayer:{position:"fixed",inset:0,zIndex:500,background:C.bg,overflowY:"auto",display:"flex",flexDirection:"column",padding:"0 0 40px",marginTop:"50px"},
  };
}