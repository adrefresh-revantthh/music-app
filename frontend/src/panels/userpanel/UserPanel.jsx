import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../../App";
import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo, FaHeart, FaSearch, FaVolumeUp, FaVolumeMute, FaTimes, FaHome, FaMusic, FaFire } from "react-icons/fa";

const API = "https://music-app-f9t7.onrender.com/api";
let _cache = null;
let _promise = null;
function fetchSongs() {
  if (_cache) return Promise.resolve(_cache);
  if (_promise) return _promise;
  _promise = fetch(`${API}/`).then(r => r.json()).then(d => { _cache = d; return d; });
  return _promise;
}

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

  const albums = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
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
    if (dir==="next") next = isShuffle ? queue[Math.floor(Math.random()*queue.length)] : queue[(idx+1)%queue.length];
    else next = queue[(idx-1+queue.length)%queue.length];
    playSong(next, queue);
  };

  const handleEnded = () => { if (isRepeat && audioRef.current) { audioRef.current.currentTime=0; audioRef.current.play(); } else navigate("next"); };
  const seek = (val) => { if (audioRef.current) { audioRef.current.currentTime=val; setCurrentTime(val); } };

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
  const playRandom = () => { if (!songs.length) return; const s=songs[Math.floor(Math.random()*songs.length)]; playSong(s,songs); setPlayerOpen(true); };

  const SongRow = ({ song, list, index }) => {
    const active = currentSong?._id === song._id;
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 10px", borderRadius:10, cursor:"pointer", background:active?C.accentDim:"transparent", transition:"background 0.15s" }} onClick={() => { playSong(song,list); setPlayerOpen(true); }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
          <div style={{ width:22, textAlign:"center", fontSize:12, color:C.muted, flexShrink:0, fontFamily:"monospace" }}>{active && isPlaying ? <span style={{ color:C.accent }}>▶</span> : index+1}</div>
          <img src={song.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:active?C.accent:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:200 }}>{song.title}</div>
            <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{song.artist}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <span style={{ fontSize:11, color:C.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:100 }} className="sat">{song.album}</span>
          <button style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex" }} onClick={e => toggleFav(song,e)}><FaHeart size={13} color={isFav(song._id)?C.accent:C.muted}/></button>
        </div>
      </div>
    );
  };

  const AlbumCard = ({ name }) => (
    <div style={{ cursor:"pointer", borderRadius:12, overflow:"hidden", background:C.card, border:`1px solid ${C.border}` }} onClick={() => { setSelectedAlbum(name); setTab("albums"); }}>
      <div style={{ position:"relative" }}>
        <img src={albums[name][0]?.imageUrl} alt={name} style={{ width:"100%", aspectRatio:"1", objectFit:"cover", display:"block" }} loading="lazy"/>
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}
          onClick={e => { e.stopPropagation(); playAlbum(name); }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:C.accent, display:"flex", alignItems:"center", justifyContent:"center" }}><FaPlay size={14} color="#0f0f0f"/></div>
        </div>
      </div>
      <div style={{ padding:"10px 12px 4px", fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:C.text }}>{name}</div>
      <div style={{ padding:"0 12px 10px", fontSize:11, color:C.sub }}>{albums[name].length} tracks</div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, paddingBottom:130 }}>

      {/* Tab Bar */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, background:C.surface, borderTop:`1px solid ${C.border}`, display:"flex", height:60 }}>
        {[
          { id:"home",   icon:<FaHome size={17}/>,   label:"Home" },
          { id:"albums", icon:<FaMusic size={17}/>,  label:"Albums" },
          { id:"search", icon:<FaSearch size={17}/>, label:"Search" },
          { id:"favs",   icon:<FaHeart size={17}/>,  label:"Favs" },
        ].map(t => (
          <button key={t.id} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, background:"none", border:"none", cursor:"pointer", color:tab===t.id?C.accent:C.muted, fontSize:11 }}
            onClick={() => { setTab(t.id); setSelectedAlbum(null); }}>
            {t.icon}
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:0.3 }}>{t.label}</span>
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
            <div style={{ background:C.surface, borderRadius:16, padding:"28px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:20, marginBottom:8, border:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontSize:11, color:C.accent, fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Vibe With Revanth</div>
                <h1 style={{ fontSize:38, fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:8, color:"white" }}>Vibe-On</h1>
                <p style={{ fontSize:14, color:C.sub, marginBottom:20 }}>Discover. Play. Feel every beat.</p>
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
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:"white" }}><FaFire size={14} style={{ color:C.accent }}/> Recently Played</h2>
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

            {favorites.length > 0 && (
              <section style={{ marginTop:36 }}>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8, color:"white" }}><FaHeart size={12} style={{ color:C.accent }}/> Favorites</h2>
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                  {favorites.slice(0,5).map((s,i) => <SongRow key={s._id} song={s} list={favorites} index={i}/>)}
                  {favorites.length > 5 && <div style={{ fontSize:13, color:C.accent, cursor:"pointer", padding:"10px 0", textAlign:"center" }} onClick={() => setTab("favs")}>See all {favorites.length} →</div>}
                </div>
              </section>
            )}

            <section style={{ marginTop:36 }}>
              <h2 style={{ fontSize:15, fontWeight:700, marginBottom:16, color:"white" }}>Albums</h2>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                {albumNames.map(n => <AlbumCard key={n} name={n}/>)}
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
                <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{albums[selectedAlbum].map((s,i) => <SongRow key={s._id} song={s} list={albums[selectedAlbum]} index={i}/>)}</div>
              </>
            ) : (
              <>
                <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20, color:C.text }}>Albums</h2>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:16 }} className="agrid">
                  {albumNames.map(n => <AlbumCard key={n} name={n}/>)}
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
                {searchResults.length===0 ? <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No results for "{search}"</p> : searchResults.map((s,i) => <SongRow key={s._id} song={s} list={searchResults} index={i}/>)}
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                <div style={{ fontSize:12, color:C.muted, fontWeight:600, letterSpacing:1, textTransform:"uppercase", padding:"0 4px 12px" }}>All Songs ({songs.length})</div>
                {songs.map((s,i) => <SongRow key={s._id} song={s} list={songs} index={i}/>)}
              </div>
            )}
          </div>
        )}

        {/* ── FAVS ── */}
        {!loading && tab==="favs" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20, color:C.text }}>Favorites</h2>
            {favorites.length===0 ? <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:48 }}>No favorites yet. Tap ♥ on any song.</p> : <div style={{ display:"flex", flexDirection:"column", gap:2 }}>{favorites.map((s,i) => <SongRow key={s._id} song={s} list={favorites} index={i}/>)}</div>}
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
            <button style={{ background:"none", border:"none", cursor:"pointer", padding:8, display:"flex" }} onClick={() => toggleFav(currentSong)}><FaHeart size={16} color={isFav(currentSong._id)?C.accent:C.muted}/></button>
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

          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 28px 24px", maxWidth:320, margin:"0 auto", width:"100%" }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, padding:8, display:"flex" }} onClick={() => setIsMuted(!isMuted)}>{isMuted?<FaVolumeMute size={14}/>:<FaVolumeUp size={14}/>}</button>
            <input type="range" min={0} max={1} step={0.01} value={isMuted?0:volume} onChange={e => { setVolume(+e.target.value); setIsMuted(false); }} style={{ flex:1, accentColor:C.accent }}/>
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

      <audio ref={audioRef} onLoadedMetadata={() => setDuration(audioRef.current?.duration||0)} onEnded={handleEnded}/>
    </div>
  );
}