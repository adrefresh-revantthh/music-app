import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const Icon = {
  Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39,18.39A5,5,0,0,0,18,9h-1.26A8,8,0,1,0,3,16.3"/></svg>,
  Music: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  List: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Batch: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21,15v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>,
  Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11,4H4a2,2,0,0,0-2,2v14a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V13"/><path d="M18.5,2.5a2.121,2.121,0,0,1,3,3L12,15l-4,1,1-4Z"/></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Close: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7,11V7a5,5,0,0,1,10,0v4"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1,12S5,4,12,4s11,8,11,8-4,8-11,8S1,12,1,12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94,17.94A10.07,10.07,0,0,1,12,20C5,20,1,12,1,12a18.45,18.45,0,0,1,5.06-5.94"/><path d="M9.9,4.24A9.12,9.12,0,0,1,12,4c7,0,11,8,11,8a18.5,18.5,0,0,1-2.16,3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Logout: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,21H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H9"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>,
  Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

// ─── Constants ────────────────────────────────────────────────────────────────
const API = "https://music-app-f9t7.onrender.com/api";

const ADMINS = {
  "admin": "vibe2024",
  "revanth": "revv@123",
  "superadmin": "music#999",
};

let _cache = null;

const C = {
  bg: "#0d0f1e",
  surface: "#13162a",
  card: "#181b30",
  border: "#1e2240",
  accent: "#ff6b35",
  accentGlow: "rgba(255,107,53,0.14)",
  accentBorder: "rgba(255,107,53,0.3)",
  text: "#f5f0e8",
  sub: "#8b90aa",
  muted: "#3d4260",
  error: "#f87171",
  success: "#4ade80",
  dim: "#252845",
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_adm"));
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [view, setView] = useState("upload");
  const [albumFilter, setAlbumFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Single upload form
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);
  const imageRef = useRef(null);

  // Multi-file upload
  const [multiFiles, setMultiFiles] = useState([]); // [{audio, image, title, artist, album, status}]
  const [multiAlbum, setMultiAlbum] = useState("");
  const [multiNewAlbum, setMultiNewAlbum] = useState("");
  const [multiUploading, setMultiUploading] = useState(false);

  // Batch JSON
  const [batchJson, setBatchJson] = useState("");
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  // ─── AUTH ─────────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginErr("");
    const u = loginUser.trim().toLowerCase();
    if (ADMINS[u] && ADMINS[u] === loginPass) {
      sessionStorage.setItem("vo_adm", u);
      setAuthed(true);
    } else {
      setLoginErr("Incorrect username or password.");
    }
  };

  const logout = () => { sessionStorage.removeItem("vo_adm"); setAuthed(false); };

  // ─── DATA ─────────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchData = useCallback(async (force = false) => {
    setFetching(true);
    try {
      if (_cache && !force) {
        setSongs(_cache);
        setAlbums([...new Set(_cache.map(s => s.album))]);
        setFetching(false);
        return;
      }
      const res = await axios.get(`${API}/`);
      _cache = res.data;
      setSongs(res.data);
      setAlbums([...new Set(res.data.map(s => s.album))]);
    } catch { showToast("Failed to load songs", "error"); }
    finally { setFetching(false); }
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed]);

  const resetForm = () => {
    setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
    setAudio(null); setImage(null); setEditingId(null);
    if (audioRef.current) audioRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
  };

  // ─── Single Upload / Edit ─────────────────────────────────────────────────
  const submitSingle = async () => {
    const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
    if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
    if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }

    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("artist", artist.trim());
    fd.append("album", finalAlbum);
    if (audio) fd.append("audio", audio);
    if (image) fd.append("image", image);

    setLoading(true);
    try {
      if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
      else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
      resetForm(); _cache = null; fetchData(true);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
    finally { setLoading(false); }
  };

  // ─── Multi-file Upload ────────────────────────────────────────────────────
  // Pair audio + image files by matching base name
  const handleMultiAudioChange = (e) => {
    const files = Array.from(e.target.files);
    setMultiFiles(prev => {
      const updated = [...prev];
      files.forEach(f => {
        const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
        const existing = updated.find(x => x.base === base);
        if (existing) { existing.audio = f; }
        else { updated.push({ base, audio: f, image: null, title: f.name.replace(/\.[^.]+$/, ""), artist: "", status: "pending" }); }
      });
      return [...updated];
    });
  };

  const handleMultiImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMultiFiles(prev => {
      const updated = [...prev];
      files.forEach(f => {
        const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
        const existing = updated.find(x => x.base === base);
        if (existing) { existing.image = f; }
        else { updated.push({ base, audio: null, image: f, title: base, artist: "", status: "pending" }); }
      });
      return [...updated];
    });
  };

  const updateMultiField = (base, field, val) => {
    setMultiFiles(p => p.map(x => x.base === base ? { ...x, [field]: val } : x));
  };

  const removeMultiFile = (base) => setMultiFiles(p => p.filter(x => x.base !== base));

  const submitMulti = async () => {
    const finalAlbum = multiAlbum === "__new__" ? multiNewAlbum.trim() : multiAlbum;
    if (!finalAlbum) { showToast("Select or create an album", "error"); return; }
    const ready = multiFiles.filter(x => x.audio && x.image && x.title.trim() && x.artist.trim());
    if (!ready.length) { showToast("Each song needs audio, image, title & artist", "error"); return; }

    setMultiUploading(true);
    let successCount = 0;

    for (const item of ready) {
      setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "uploading" } : x));
      const fd = new FormData();
      fd.append("title", item.title.trim());
      fd.append("artist", item.artist.trim());
      fd.append("album", finalAlbum);
      fd.append("audio", item.audio);
      fd.append("image", item.image);
      try {
        await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "done" } : x));
        successCount++;
      } catch {
        setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "error" } : x));
      }
    }

    setMultiUploading(false);
    showToast(`${successCount}/${ready.length} songs uploaded!`);
    if (successCount > 0) { _cache = null; fetchData(true); }
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteSong = async (id) => {
    try { await axios.delete(`${API}/${id}`); showToast("Deleted"); setConfirm(null); _cache = null; fetchData(true); }
    catch { showToast("Delete failed", "error"); }
  };

  const deleteAlbum = async (name) => {
    try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`"${name}" deleted`); setConfirm(null); setAlbumFilter(null); _cache = null; fetchData(true); }
    catch { showToast("Album delete failed", "error"); }
  };

  const editSong = (song) => {
    setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
    setView("upload"); window.scrollTo(0, 0);
  };

  // ─── Batch JSON ───────────────────────────────────────────────────────────
  const runBatch = async () => {
    let parsed;
    try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
    if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }
    setBatchLoading(true); setBatchResults([]);
    const res = [];
    for (const item of parsed) {
      if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
        res.push({ title: item.title || "?", ok: false, msg: "Missing fields" }); continue;
      }
      try {
        await axios.post(`${API}/create-from-url`, item);
        res.push({ title: item.title, ok: true });
      } catch (e) { res.push({ title: item.title, ok: false, msg: e.response?.data?.message || "Failed" }); }
    }
    setBatchResults(res); setBatchLoading(false);
    const ok = res.filter(r => r.ok).length;
    showToast(`Batch: ${ok}/${parsed.length} uploaded`);
    if (ok > 0) { _cache = null; fetchData(true); }
  };

  const albumGroups = songs.reduce((a, s) => { if (!a[s.album]) a[s.album] = []; a[s.album].push(s); return a; }, {});
  const filtered = songs.filter(s => [s.title, s.artist, s.album].some(v => v.toLowerCase().includes(search.toLowerCase())));
  const viewSongs = albumFilter ? albumGroups[albumFilter] || [] : filtered;

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={l.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
          body{background:${C.bg};color:${C.text};font-family:'Plus Jakarta Sans',sans-serif;}
          @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
          input:focus{outline:1px solid ${C.accent}!important;}
          input::placeholder{color:${C.muted};}
        `}</style>
        <div style={l.card}>
          <div style={l.iconBox}><Icon.Lock /></div>
          <h1 style={l.title}>Admin Panel</h1>
          <p style={l.sub}>Sign in to manage your music</p>
          {loginErr && <div style={l.errBox}>{loginErr}</div>}
          <form onSubmit={handleLogin} style={l.form}>
            <div style={l.fld}>
              <label style={l.lbl}>Username</label>
              <input style={l.inp} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus />
            </div>
            <div style={l.fld}>
              <label style={l.lbl}>Password</label>
              <div style={l.pwWrap}>
                <input style={{ ...l.inp, paddingRight: 44 }} type={showPwd ? "text" : "password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                <button type="button" style={l.eyeBtn} onClick={() => setShowPwd(s => !s)}>
                  {showPwd ? <Icon.EyeOff /> : <Icon.Eye />}
                </button>
              </div>
            </div>
            <button style={l.btn} type="submit">Sign In</button>
          </form>
          <p style={l.hint}>Hint: try admin / vibe2024</p>
        </div>
      </div>
    );
  }

  // ─── ADMIN PANEL ──────────────────────────────────────────────────────────
  return (
    <div style={a.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}
        input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;}
        input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}
        input::placeholder,textarea::placeholder{color:${C.muted};}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin2{to{transform:rotate(360deg)}}
        .dropzone:hover{border-color:${C.accent}!important;background:${C.accentGlow}!important;}
        .song-row:hover{background:${C.card}!important;}
        .album-card:hover{border-color:${C.accent}!important;}
        @media(max-width:680px){
          .admin-layout{flex-direction:column!important;}
          .admin-sidebar{width:100%!important;flex-direction:row!important;height:auto!important;position:relative!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:10px 16px!important;overflow-x:auto!important;gap:4px!important;align-items:center!important;}
          .sidebar-logo{display:none!important;}
          .sidebar-stats{display:none!important;}
          .admin-content{padding:16px!important;}
          .form-2col{grid-template-columns:1fr!important;}
          .upload-row{flex-direction:column!important;}
          .multi-row{flex-wrap:wrap!important;}
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ ...a.toast, background: toast.type === "error" ? "#7f1d1d" : "#14532d", borderColor: toast.type === "error" ? C.error : C.success, color: toast.type === "error" ? C.error : C.success }}>
          {toast.type === "error" ? <Icon.Close /> : <Icon.Check />} {toast.msg}
        </div>
      )}

      {/* Confirm Modal */}
      {confirm && (
        <div style={a.overlay} onClick={() => setConfirm(null)}>
          <div style={a.modal} onClick={e => e.stopPropagation()}>
            <h3 style={a.modalH}>Confirm Delete</h3>
            <p style={a.modalP}>{confirm.msg}</p>
            <div style={a.modalFoot}>
              <button style={a.modalNo} onClick={() => setConfirm(null)}>Cancel</button>
              <button style={a.modalYes} onClick={confirm.fn}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={a.layout} className="admin-layout">
        {/* SIDEBAR */}
        <div style={a.sidebar} className="admin-sidebar">
          <div style={a.sidebarLogo} className="sidebar-logo">⚡ Admin</div>
          <div style={a.sideStats} className="sidebar-stats">
            <div style={a.statBox}>
              <span style={a.statN}>{songs.length}</span>
              <span style={a.statL}>Songs</span>
            </div>
            <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />
            <div style={a.statBox}>
              <span style={a.statN}>{albums.length}</span>
              <span style={a.statL}>Albums</span>
            </div>
          </div>
          <div style={a.sideNav}>
            {[
              { id: "upload", Ico: Icon.Upload, label: editingId ? "Edit" : "Upload" },
              { id: "multi", Ico: Icon.Batch, label: "Multi" },
              { id: "library", Ico: Icon.List, label: "Library" },
              { id: "batch", Ico: Icon.Batch, label: "JSON" },
            ].map(({ id, Ico, label }) => (
              <button key={id} style={{ ...a.navBtn, ...(view === id ? a.navBtnActive : {}) }} onClick={() => setView(id)}>
                <Ico /> <span>{label}</span>
              </button>
            ))}
          </div>
          <button style={a.logoutBtn} onClick={logout}><Icon.Logout /> <span style={{ fontSize: 12 }}>Logout</span></button>
        </div>

        {/* CONTENT */}
        <div style={a.content} className="admin-content">

          {/* ── SINGLE UPLOAD / EDIT ── */}
          {view === "upload" && (
            <div style={{ animation: "fadeUp 0.25s ease" }}>
              <div style={a.cardHead}>
                <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
                {editingId && <button style={a.cancelBtn} onClick={resetForm}><Icon.Close /> Cancel</button>}
              </div>

              <div style={a.form2col} className="form-2col">
                <div style={a.fld}><label style={a.lbl}>Song Title *</label><input style={a.inp} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} /></div>
                <div style={a.fld}><label style={a.lbl}>Artist *</label><input style={a.inp} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} /></div>
                <div style={a.fld}>
                  <label style={a.lbl}>Album *</label>
                  <select style={a.inp} value={album} onChange={e => setAlbum(e.target.value)}>
                    <option value="">Select album</option>
                    {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
                    <option value="__new__">+ New Album</option>
                  </select>
                </div>
                {album === "__new__" && (
                  <div style={a.fld}><label style={a.lbl}>New Album Name *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} /></div>
                )}
              </div>

              <div style={a.uploadRow} className="upload-row">
                <label style={a.dropZone} className="dropzone">
                  <Icon.Music />
                  <span style={a.dzLabel}>{audio ? audio.name : "Audio File"}</span>
                  <span style={a.dzSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
                  {audio && <span style={a.dzCheck}><Icon.Check /></span>}
                  <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
                </label>
                <label style={a.dropZone} className="dropzone">
                  {image
                    ? <img src={URL.createObjectURL(image)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} alt="" />
                    : <Icon.Upload />
                  }
                  <span style={a.dzLabel}>{image ? image.name : "Cover Image"}</span>
                  <span style={a.dzSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
                  {image && <span style={a.dzCheck}><Icon.Check /></span>}
                  <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
                </label>
              </div>

              <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submitSingle} disabled={loading}>
                {loading ? <><span style={a.spinner} /> {editingId ? "Updating…" : "Uploading…"}</> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
              </button>
            </div>
          )}

          {/* ── MULTI UPLOAD ── */}
          {view === "multi" && (
            <div style={{ animation: "fadeUp 0.25s ease" }}>
              <h2 style={a.cardTitle}>📂 Upload Multiple Songs</h2>
              <p style={a.helpTxt}>Match audio + image files by the same filename (e.g. <code style={a.code}>song1.mp3</code> + <code style={a.code}>song1.jpg</code>). Or upload separately and pair them below.</p>

              <div style={a.multiAlbumRow}>
                <div style={a.fld}>
                  <label style={a.lbl}>Album for all *</label>
                  <select style={a.inp} value={multiAlbum} onChange={e => setMultiAlbum(e.target.value)}>
                    <option value="">Select album</option>
                    {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
                    <option value="__new__">+ New Album</option>
                  </select>
                </div>
                {multiAlbum === "__new__" && (
                  <div style={a.fld}>
                    <label style={a.lbl}>Album Name *</label>
                    <input style={a.inp} value={multiNewAlbum} onChange={e => setMultiNewAlbum(e.target.value)} placeholder="New album" />
                  </div>
                )}
              </div>

              <div style={a.multiFileRow} className="upload-row">
                <label style={a.dropZone} className="dropzone">
                  <Icon.Music />
                  <span style={a.dzLabel}>Audio Files</span>
                  <span style={a.dzSub}>Select multiple MP3/WAV files</span>
                  <input type="file" accept="audio/*" multiple onChange={handleMultiAudioChange} style={{ display: "none" }} />
                </label>
                <label style={a.dropZone} className="dropzone">
                  <Icon.Upload />
                  <span style={a.dzLabel}>Cover Images</span>
                  <span style={a.dzSub}>Select multiple JPG/PNG files</span>
                  <input type="file" accept="image/*" multiple onChange={handleMultiImageChange} style={{ display: "none" }} />
                </label>
              </div>

              {multiFiles.length > 0 && (
                <>
                  <div style={a.multiList}>
                    {multiFiles.map(item => (
                      <div key={item.base} style={a.multiItem}>
                        <div style={a.multiItemHead}>
                          {item.image
                            ? <img src={URL.createObjectURL(item.image)} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} alt="" />
                            : <div style={a.multiImgPh}><Icon.Upload /></div>
                          }
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={a.multiFileName}>{item.base}</div>
                            <div style={a.multiFileStatus}>
                              <span style={{ color: item.audio ? C.success : C.error }}>{item.audio ? "✓" : "✗"} Audio</span>
                              <span style={{ marginLeft: 10, color: item.image ? C.success : C.error }}>{item.image ? "✓" : "✗"} Image</span>
                              {item.status === "done" && <span style={{ marginLeft: 10, color: C.success }}>✓ Uploaded</span>}
                              {item.status === "error" && <span style={{ marginLeft: 10, color: C.error }}>✗ Failed</span>}
                              {item.status === "uploading" && <span style={{ marginLeft: 10, color: C.accent }}>↑ Uploading…</span>}
                            </div>
                          </div>
                          <button style={a.removeBtn} onClick={() => removeMultiFile(item.base)}><Icon.Close /></button>
                        </div>
                        <div style={a.multiItemFields} className="form-2col">
                          <input style={a.inp} placeholder="Song Title *" value={item.title} onChange={e => updateMultiField(item.base, "title", e.target.value)} />
                          <input style={a.inp} placeholder="Artist *" value={item.artist} onChange={e => updateMultiField(item.base, "artist", e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{ ...a.btn, ...(multiUploading ? a.btnDis : {}) }} onClick={submitMulti} disabled={multiUploading}>
                    {multiUploading ? <><span style={a.spinner} /> Uploading all…</> : `↑ Upload All (${multiFiles.filter(x => x.audio && x.image).length} songs)`}
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── LIBRARY ── */}
          {view === "library" && (
            <div style={{ animation: "fadeUp 0.25s ease" }}>
              {albumFilter ? (
                <>
                  <button style={a.backBtn} onClick={() => { setAlbumFilter(null); setSearch(""); }}>
                    <Icon.Back /> All Albums
                  </button>
                  <div style={a.albumDetailHead}>
                    <img src={albumGroups[albumFilter]?.[0]?.imageUrl} alt="" style={a.albumDetailImg} />
                    <div>
                      <div style={a.albumDetailName}>{albumFilter}</div>
                      <div style={a.albumDetailMeta}>{albumGroups[albumFilter]?.length} songs</div>
                      <button style={a.delAlbumBtnLg} onClick={() => setConfirm({ msg: `Delete album "${albumFilter}" and all ${albumGroups[albumFilter]?.length} songs?`, fn: () => deleteAlbum(albumFilter) })}>
                        <Icon.Trash /> Delete Album
                      </button>
                    </div>
                  </div>
                  <div style={a.songList}>
                    {(albumGroups[albumFilter] || []).map((s, i) => (
                      <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={a.libHead}>
                    <h2 style={a.cardTitle}>Library</h2>
                    <div style={a.searchWrap}>
                      <span style={{ color: C.muted, display: "flex" }}><Icon.Search /></span>
                      <input style={a.searchInp} placeholder="Search songs…" value={search} onChange={e => setSearch(e.target.value)} />
                      {search && <button style={a.clrBtn} onClick={() => setSearch("")}><Icon.Close /></button>}
                    </div>
                  </div>
                  {fetching ? <div style={a.loadMsg}>Loading…</div> : (
                    search ? (
                      <div style={a.songList}>
                        <div style={a.listHead}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
                        {filtered.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
                        {filtered.length === 0 && <p style={a.empty}>No songs found.</p>}
                      </div>
                    ) : (
                      <>
                        <div style={a.albumGrid}>
                          {Object.entries(albumGroups).map(([name, list]) => (
                            <div key={name} style={a.albumCard} className="album-card" onClick={() => setAlbumFilter(name)}>
                              <img src={list[0]?.imageUrl} alt="" style={a.albumCardImg} loading="lazy" />
                              <div style={a.albumCardName}>{name}</div>
                              <div style={a.albumCardMeta}>{list.length} songs</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ ...a.listHead, marginTop: 28 }}>All Songs ({songs.length})</div>
                        <div style={a.songList}>
                          {songs.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
                        </div>
                      </>
                    )
                  )}
                </>
              )}
            </div>
          )}

          {/* ── BATCH JSON ── */}
          {view === "batch" && (
            <div style={{ animation: "fadeUp 0.25s ease" }}>
              <h2 style={a.cardTitle}>📦 Batch JSON Upload</h2>
              <p style={a.helpTxt}>Upload songs from URLs. Needs a backend endpoint <code style={a.code}>POST /api/create-from-url</code> that accepts JSON directly.</p>
              <div style={a.exBox}>
                <div style={a.exTitle}>Format</div>
                <pre style={a.pre}>{`[
  {
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "audioUrl": "https://cdn.example.com/audio.mp3",
    "imageUrl": "https://cdn.example.com/cover.jpg"
  }
]`}</pre>
              </div>
              <label style={a.fileLabel}>
                <Icon.Upload /> Upload .json File
                <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
              </label>
              <textarea style={a.ta} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
                value={batchJson} onChange={e => setBatchJson(e.target.value)} />
              <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
                {batchLoading ? <><span style={a.spinner} /> Processing…</> : "↑ Upload All"}
              </button>
              {batchResults.length > 0 && (
                <div style={a.resBox}>
                  <div style={a.resHead}>{batchResults.filter(r => r.ok).length}/{batchResults.length} uploaded</div>
                  {batchResults.map((r, i) => (
                    <div key={i} style={{ ...a.resRow, borderLeft: `3px solid ${r.ok ? C.success : C.error}` }}>
                      <span style={{ color: r.ok ? C.success : C.error }}>{r.ok ? "✓" : "✗"}</span>
                      <span style={{ flex: 1, fontSize: 13 }}>{r.title}</span>
                      {r.msg && <span style={{ fontSize: 11, color: C.error }}>{r.msg}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Song Row Component ───────────────────────────────────────────────────────
function SongRow({ song, idx, onEdit, onDelete }) {
  return (
    <div style={a.sRow} className="song-row">
      <div style={a.sRowL}>
        <span style={a.sIdx}>{idx + 1}</span>
        <img src={song.imageUrl} alt="" style={a.sImg} loading="lazy" />
        <div style={a.sInfo}>
          <div style={a.sTitle}>{song.title}</div>
          <div style={a.sMeta}>{song.artist} · {song.album}</div>
        </div>
      </div>
      <div style={a.sActs}>
        <button style={a.sEdit} onClick={() => onEdit(song)}><Icon.Edit /></button>
        <button style={a.sDel} onClick={() => onDelete(song._id)}><Icon.Trash /></button>
      </div>
    </div>
  );
}

// ─── LOGIN STYLES ──────────────────────────────────────────────────────────────
const l = {
  root: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" },
  card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.3s ease" },
  iconBox: { width: 52, height: 52, borderRadius: 14, background: C.accentGlow, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: C.accent },
  title: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6, color: C.text },
  sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
  errBox: { background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 18 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  fld: { display: "flex", flexDirection: "column", gap: 6 },
  lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.7 },
  inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },
  pwWrap: { position: "relative" },
  eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.sub, display: "flex" },
  btn: { marginTop: 8, padding: 14, borderRadius: 12, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,107,53,0.3)" },
  hint: { marginTop: 20, fontSize: 12, color: C.muted, textAlign: "center" },
};

// ─── ADMIN STYLES ─────────────────────────────────────────────────────────────
const a = {
  root: { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", position: "relative" },

  toast: { position: "fixed", top: 70, right: 16, padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8, border: "1px solid", animation: "slideIn 0.25s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },

  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
  modalH: { fontSize: 17, fontWeight: 800, marginBottom: 8, color: C.text },
  modalP: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
  modalFoot: { display: "flex", gap: 10, justifyContent: "flex-end" },
  modalNo: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600 },
  modalYes: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", fontSize: 13, fontWeight: 700 },

  layout: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "22px 14px", display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 58, height: "calc(100vh - 58px)", flexShrink: 0, overflowY: "auto" },
  sidebarLogo: { fontSize: 17, fontWeight: 800, color: C.accent, padding: "0 8px", marginBottom: 14, letterSpacing: "-0.02em" },
  sideStats: { display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 14, overflow: "hidden" },
  statBox: { flex: 1, textAlign: "center", padding: "12px 8px" },
  statN: { display: "block", fontSize: 18, fontWeight: 800, color: C.accent },
  statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
  sideNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
  navBtn: { display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.sub, fontSize: 13, fontWeight: 600, textAlign: "left" },
  navBtnActive: { background: C.accentGlow, color: C.accent, border: `1px solid ${C.accentBorder}` },
  logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.muted, fontSize: 13, marginTop: "auto" },

  content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  cardTitle: { fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 },
  cancelBtn: { display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 12, fontWeight: 600 },
  backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600, marginBottom: 20 },

  form2col: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
  fld: { display: "flex", flexDirection: "column", gap: 6 },
  lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6 },
  inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },

  uploadRow: { display: "flex", gap: 14, marginBottom: 20 },
  dropZone: {
    flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    cursor: "pointer", background: C.bg, transition: "border 0.2s, background 0.2s", color: C.sub, position: "relative",
  },
  dzLabel: { fontSize: 13, fontWeight: 600, color: C.text, textAlign: "center" },
  dzSub: { fontSize: 11, color: C.muted },
  dzCheck: { position: "absolute", top: 10, right: 10, color: C.success },

  btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(255,107,53,0.25)" },
  btnDis: { opacity: 0.5, cursor: "not-allowed" },
  spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

  multiAlbumRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
  multiFileRow: { display: "flex", gap: 14, marginBottom: 20 },
  multiList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 },
  multiItem: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 },
  multiItemHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
  multiImgPh: { width: 40, height: 40, borderRadius: 8, background: C.dim, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, flexShrink: 0 },
  multiFileName: { fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  multiFileStatus: { fontSize: 11, marginTop: 2 },
  multiItemFields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  removeBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, display: "flex", flexShrink: 0 },

  helpTxt: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
  code: { fontFamily: "'JetBrains Mono',monospace", background: C.dim, padding: "2px 6px", borderRadius: 4, fontSize: 11, color: C.accent },
  exBox: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
  exTitle: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 700 },
  pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
  fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 14 },
  ta: { width: "100%", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 12, resize: "vertical", lineHeight: 1.7, marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" },
  resBox: { marginTop: 18, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
  resHead: { padding: "10px 16px", background: C.dim, fontSize: 12, fontWeight: 700, borderBottom: `1px solid ${C.border}`, color: C.sub },
  resRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },

  libHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
  searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
  searchInp: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", width: 160 },
  clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
  loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

  albumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14, marginBottom: 10 },
  albumCard: { cursor: "pointer", borderRadius: 12, overflow: "hidden", background: C.card, border: `1px solid ${C.border}`, transition: "border-color 0.2s" },
  albumCardImg: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
  albumCardName: { padding: "9px 10px 3px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  albumCardMeta: { padding: "0 10px 9px", fontSize: 11, color: C.sub },

  albumDetailHead: { display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-end", flexWrap: "wrap" },
  albumDetailImg: { width: 100, height: 100, borderRadius: 12, objectFit: "cover", flexShrink: 0 },
  albumDetailName: { fontSize: 22, fontWeight: 800, marginBottom: 4 },
  albumDetailMeta: { fontSize: 13, color: C.sub, marginBottom: 14 },
  delAlbumBtnLg: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.07)", color: C.error, fontSize: 13, fontWeight: 600 },

  listHead: { fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "0 4px 10px" },
  songList: { display: "flex", flexDirection: "column", gap: 4 },
  sRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, transition: "background 0.12s", gap: 12 },
  sRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
  sIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
  sImg: { width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
  sInfo: { minWidth: 0 },
  sTitle: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  sMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  sActs: { display: "flex", gap: 8, flexShrink: 0 },
  sEdit: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", color: C.sub, display: "flex" },
  sDel: { padding: "7px 10px", borderRadius: 7, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)", color: C.error, display: "flex" },
  empty: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },
};
