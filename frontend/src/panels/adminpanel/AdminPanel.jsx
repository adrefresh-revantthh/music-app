// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // function AdminPanel() {
// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [album, setAlbum] = useState("");
// // //   const [newAlbum, setNewAlbum] = useState("");
// // //   const [albums, setAlbums] = useState([]);
// // //   const [songs, setSongs] = useState([]);
// // //   const [audio, setAudio] = useState(null);
// // //   const [image, setImage] = useState(null);
// // //   const [editingId, setEditingId] = useState(null);

// // //   const fetchData = async () => {
// // //     const res = await axios.get("http://localhost:5000/api/songs");
// // //     setSongs(res.data);

// // //     const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // //     setAlbums(uniqueAlbums);
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const uploadOrUpdateSong = async () => {
// // //     const finalAlbum = album === "new" ? newAlbum : album;

// // //     if (!title || !finalAlbum) {
// // //       alert("Title and Album are required");
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append("title", title);
// // //     formData.append("artist", artist);
// // //     formData.append("album", finalAlbum);
// // //     if (audio) formData.append("audio", audio);
// // //     if (image) formData.append("image", image);

// // //     try {
// // //       if (editingId) {
// // //         await axios.put(
// // //           `http://localhost:5000/api/songs/${editingId}`,
// // //           formData
// // //         );
// // //         alert("Song updated");
// // //       } else {
// // //         if (!audio || !image) {
// // //           alert("Audio and image required for new song");
// // //           return;
// // //         }
// // //         await axios.post(
// // //           "http://localhost:5000/api/songs/create",
// // //           formData
// // //         );
// // //         alert("Song uploaded");
// // //       }

// // //       resetForm();
// // //       fetchData();

// // //     } catch (error) {
// // //       console.error(error);
// // //       alert("Operation failed");
// // //     }
// // //   };

// // //   const deleteSong = async (id) => {
// // //     if (!window.confirm("Delete this song?")) return;

// // //     await axios.delete(`http://localhost:5000/api/songs/${id}`);
// // //     fetchData();
// // //   };

// // //   const deleteAlbum = async () => {
// // //     if (!album || album === "new") {
// // //       alert("Select valid album");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // //     await axios.delete(
// // //       `http://localhost:5000/api/albums/${album}`
// // //     );

// // //     fetchData();
// // //     setAlbum("");
// // //   };

// // //   const editSong = (song) => {
// // //     setEditingId(song._id);
// // //     setTitle(song.title);
// // //     setArtist(song.artist);
// // //     setAlbum(song.album);
// // //   };

// // //   const resetForm = () => {
// // //     setTitle("");
// // //     setArtist("");
// // //     setAlbum("");
// // //     setNewAlbum("");
// // //     setAudio(null);
// // //     setImage(null);
// // //     setEditingId(null);
// // //   };

// // //   return (
// // //     <div style={styles.wrapper}>
// // //       <div style={styles.card}>
// // //         <h1 style={styles.heading}>
// // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // //         </h1>

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Song Title"
// // //           value={title}
// // //           onChange={(e) => setTitle(e.target.value)}
// // //         />

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Artist Name"
// // //           value={artist}
// // //           onChange={(e) => setArtist(e.target.value)}
// // //         />

// // //         <select
// // //           style={styles.input}
// // //           value={album}
// // //           onChange={(e) => setAlbum(e.target.value)}
// // //         >
// // //           <option value="">Select Album</option>
// // //           {albums.map((alb, index) => (
// // //             <option key={index} value={alb}>
// // //               {alb}
// // //             </option>
// // //           ))}
// // //           <option value="new">+ Create New Album</option>
// // //         </select>

// // //         {album === "new" && (
// // //           <input
// // //             style={styles.input}
// // //             placeholder="New Album Name"
// // //             value={newAlbum}
// // //             onChange={(e) => setNewAlbum(e.target.value)}
// // //           />
// // //         )}

// // //         <label style={styles.fileLabel}>
// // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // //           <input
// // //             type="file"
// // //             accept="audio/*"
// // //             onChange={(e) => setAudio(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <label style={styles.fileLabel}>
// // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => setImage(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // //           {editingId ? "Update Song" : "Upload Song"}
// // //         </button>

// // //         <button
// // //           style={{ ...styles.button, background: "linear-gradient(90deg, #ff7eb6, #ff4d94)" }}
// // //           onClick={deleteAlbum}
// // //         >
// // //           Delete Selected Album
// // //         </button>

// // //         {/* SONG LIST WITH EDIT + DELETE */}
// // //         <div style={{ marginTop: "20px" }}>
// // //           {songs.map(song => (
// // //             <div key={song._id} style={styles.songItem}>
// // //               <span>{song.title} - {song.album}</span>
// // //               <div>
// // //                 <button
// // //                   style={styles.smallBtn}
// // //                   onClick={() => editSong(song)}
// // //                 >
// // //                   Edit
// // //                 </button>
// // //                 <button
// // //                   style={styles.smallDelete}
// // //                   onClick={() => deleteSong(song._id)}
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   wrapper: {
// // //     width: "98vw",
// // //     minHeight: "100vh",
// // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     padding: "20px",
// // //     boxSizing: "border-box",
// // //     fontFamily: "Segoe UI, sans-serif",
// // //   },
// // //   card: {
// // //     width: "100%",
// // //     maxWidth: "500px",
// // //     background: "rgba(255,255,255,0.75)",
// // //     backdropFilter: "blur(12px)",
// // //     padding: "30px",
// // //     borderRadius: "25px",
// // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: "15px",
// // //   },
// // //   heading: {
// // //     textAlign: "center",
// // //     color: "#b03060",
// // //   },
// // //   input: {
// // //     padding: "12px",
// // //     borderRadius: "12px",
// // //     border: "1px solid #ffb6d9",
// // //     outline: "none",
// // //     fontSize: "14px",
// // //   },
// // //   fileLabel: {
// // //     background: "#ffe6f0",
// // //     padding: "12px",
// // //     borderRadius: "12px",
// // //     cursor: "pointer",
// // //     textAlign: "center",
// // //     color: "#b03060",
// // //     border: "1px solid #ffc0e0",
// // //   },
// // //   fileInput: { display: "none" },
// // //   button: {
// // //     marginTop: "10px",
// // //     padding: "14px",
// // //     borderRadius: "18px",
// // //     border: "none",
// // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // //     color: "white",
// // //     fontWeight: "600",
// // //     cursor: "pointer",
// // //   },
// // //   songItem: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: "10px",
// // //     padding: "8px",
// // //     background: "#ffe6f0",
// // //     borderRadius: "10px",
// // //   },
// // //   smallBtn: {
// // //     marginRight: "8px",
// // //     padding: "5px 10px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#ff9ecb",
// // //     color: "white",
// // //     cursor: "pointer",
// // //   },
// // //   smallDelete: {
// // //     padding: "5px 10px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#ff4d94",
// // //     color: "white",
// // //     cursor: "pointer",
// // //   }
// // // };

// // // export default AdminPanel;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const API = "https://music-app-f9t7.onrender.com/api";

// // // function AdminPanel() {
// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [album, setAlbum] = useState("");
// // //   const [newAlbum, setNewAlbum] = useState("");
// // //   const [albums, setAlbums] = useState([]);
// // //   const [songs, setSongs] = useState([]);
// // //   const [audio, setAudio] = useState(null);
// // //   const [image, setImage] = useState(null);
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // ---------------- FETCH DATA ----------------
// // //   const fetchData = async () => {
// // //     try {
// // //       const res = await axios.get(`${API}/`);
// // //       setSongs(res.data);

// // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // //       setAlbums(uniqueAlbums);
// // //     } catch (error) {
// // //       console.error("Fetch error:", error);
// // //       alert("Failed to fetch songs");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   // ---------------- CREATE / UPDATE ----------------
// // //   // ---------------- CREATE / UPDATE ----------------
// // // const uploadOrUpdateSong = async () => {
// // //   const finalAlbum = album === "new" ? newAlbum : album;

// // //   // ✅ Proper validation
// // //   if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // //     alert("Title, Artist and Album are required");
// // //     return;
// // //   }

// // //   // ✅ For create → audio & image must exist
// // //   if (!editingId && (!audio || !image)) {
// // //     alert("Audio and Image are required for new song");
// // //     return;
// // //   }

// // //   const formData = new FormData();

// // //   formData.append("title", title.trim());
// // //   formData.append("artist", artist.trim());
// // //   formData.append("album", finalAlbum.trim());

// // //   // ✅ Only append if present (important for update)
// // //   if (audio) formData.append("audio", audio);
// // //   if (image) formData.append("image", image);

// // //   try {
// // //     setLoading(true);

// // //     if (editingId) {
// // //       // UPDATE
// // //       await axios.put(`${API}/${editingId}`, formData);
// // //       alert("Song updated successfully");
// // //     } else {
// // //       // CREATE
// // //       await axios.post(`${API}/create`, formData, {
// // //         headers: {
// // //           "Content-Type": "multipart/form-data",
// // //         },
// // //       });
// // //       alert("Song uploaded successfully");
// // //     }

// // //     resetForm();
// // //     fetchData();
// // //   } catch (error) {
// // //     console.error("Upload error:", error.response?.data || error);
// // //     alert(error.response?.data?.message || "Upload failed");
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };


// // //   // ---------------- DELETE SONG ----------------
// // //   const deleteSong = async (id) => {
// // //     if (!window.confirm("Delete this song?")) return;

// // //     try {
// // //       await axios.delete(`${API}/${id}`);
// // //       alert("Song deleted");
// // //       fetchData();
// // //     } catch (error) {
// // //       console.error("Delete song error:", error.response?.data || error);
// // //       alert(error.response?.data?.message || "Delete failed");
// // //     }
// // //   };

// // //   // ---------------- DELETE ALBUM ----------------
// // //   const deleteAlbum = async () => {
// // //     if (!album || album === "new") {
// // //       alert("Select valid album");
// // //       return;
// // //     }

// // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // //     try {
// // //       await axios.delete(
// // //         `${API}/albums/${encodeURIComponent(album)}`
// // //       );
// // //       alert("Album deleted");
// // //       fetchData();
// // //       setAlbum("");
// // //     } catch (error) {
// // //       console.error("Delete album error:", error.response?.data || error);
// // //       alert(error.response?.data?.message || "Album delete failed");
// // //     }
// // //   };

// // //   // ---------------- EDIT MODE ----------------
// // //   const editSong = (song) => {
// // //     setEditingId(song._id);
// // //     setTitle(song.title);
// // //     setArtist(song.artist);
// // //     setAlbum(song.album);
// // //   };

// // //   const resetForm = () => {
// // //     setTitle("");
// // //     setArtist("");
// // //     setAlbum("");
// // //     setNewAlbum("");
// // //     setAudio(null);
// // //     setImage(null);
// // //     setEditingId(null);
// // //   };

// // //   // ---------------- UI ----------------
// // //   return (
// // //     <div style={styles.wrapper}>
// // //       <div style={styles.card}>
// // //         <h1 style={styles.heading}>
// // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // //         </h1>

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Song Title"
// // //           value={title}
// // //           onChange={(e) => setTitle(e.target.value)}
// // //         />

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Artist Name"
// // //           value={artist}
// // //           onChange={(e) => setArtist(e.target.value)}
// // //         />

// // //         <select
// // //           style={styles.input}
// // //           value={album}
// // //           onChange={(e) => setAlbum(e.target.value)}
// // //         >
// // //           <option value="">Select Album</option>
// // //           {albums.map((alb, index) => (
// // //             <option key={index} value={alb}>
// // //               {alb}
// // //             </option>
// // //           ))}
// // //           <option value="new">+ Create New Album</option>
// // //         </select>

// // //         {album === "new" && (
// // //           <input
// // //             style={styles.input}
// // //             placeholder="New Album Name"
// // //             value={newAlbum}
// // //             onChange={(e) => setNewAlbum(e.target.value)}
// // //           />
// // //         )}

// // //         <label style={styles.fileLabel}>
// // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // //           <input
// // //             type="file"
// // //             accept="audio/*"
// // //             onChange={(e) => setAudio(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <label style={styles.fileLabel}>
// // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => setImage(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <button
// // //           style={styles.button}
// // //           onClick={uploadOrUpdateSong}
// // //           disabled={loading}
// // //         >
// // //           {editingId ? "Update Song" : "Upload Song"}
// // //         </button>

// // //         <button
// // //           style={{ ...styles.button, background: "#ff4d94" }}
// // //           onClick={deleteAlbum}
// // //         >
// // //           Delete Selected Album
// // //         </button>

// // //         <div style={{ marginTop: "20px" }}>
// // //           {songs.map(song => (
// // //             <div key={song._id} style={styles.songItem}>
// // //               <span>{song.title} - {song.album}</span>
// // //               <div>
// // //                 <button
// // //                   style={styles.smallBtn}
// // //                   onClick={() => editSong(song)}
// // //                 >
// // //                   Edit
// // //                 </button>
// // //                 <button
// // //                   style={styles.smallDelete}
// // //                   onClick={() => deleteSong(song._id)}
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   wrapper: {
// // //     width: "98vw",
// // //     minHeight: "100vh",
// // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     padding: "20px",
// // //     boxSizing: "border-box",
// // //     fontFamily: "Segoe UI, sans-serif",
// // //   },
// // //   card: {
// // //     width: "100%",
// // //     maxWidth: "500px",
// // //     background: "rgba(255,255,255,0.75)",
// // //     backdropFilter: "blur(12px)",
// // //     padding: "30px",
// // //     borderRadius: "25px",
// // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: "15px",
// // //   },
// // //   heading: { textAlign: "center", color: "#b03060" },
// // //   input: {
// // //     padding: "12px",
// // //     borderRadius: "12px",
// // //     border: "1px solid #ffb6d9",
// // //     fontSize: "14px",
// // //   },
// // //   fileLabel: {
// // //     background: "#ffe6f0",
// // //     padding: "12px",
// // //     borderRadius: "12px",
// // //     cursor: "pointer",
// // //     textAlign: "center",
// // //     color: "#b03060",
// // //     border: "1px solid #ffc0e0",
// // //   },
// // //   fileInput: { display: "none" },
// // //   button: {
// // //     marginTop: "10px",
// // //     padding: "14px",
// // //     borderRadius: "18px",
// // //     border: "none",
// // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // //     color: "white",
// // //     fontWeight: "600",
// // //     cursor: "pointer",
// // //   },
// // //   songItem: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: "10px",
// // //     padding: "8px",
// // //     background: "#ffe6f0",
// // //     borderRadius: "10px",
// // //   },
// // //   smallBtn: {
// // //     marginRight: "8px",
// // //     padding: "5px 10px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#ff9ecb",
// // //     color: "white",
// // //     cursor: "pointer",
// // //   },
// // //   smallDelete: {
// // //     padding: "5px 10px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     background: "#ff4d94",
// // //     color: "white",
// // //     cursor: "pointer",
// // //   }
// // // };

// // // export default AdminPanel;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const API = "https://music-app-f9t7.onrender.com/api";

// // // function AdminPanel() {
// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [album, setAlbum] = useState("");
// // //   const [newAlbum, setNewAlbum] = useState("");
// // //   const [albums, setAlbums] = useState([]);
// // //   const [songs, setSongs] = useState([]);
// // //   const [audio, setAudio] = useState(null);
// // //   const [image, setImage] = useState(null);
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const fetchData = async () => {
// // //     try {
// // //       const res = await axios.get(`${API}/`);
// // //       setSongs(res.data);
// // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // //       setAlbums(uniqueAlbums);
// // //     } catch (error) {
// // //       alert("Failed to fetch songs");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   const uploadOrUpdateSong = async () => {
// // //     const finalAlbum = album === "new" ? newAlbum : album;

// // //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // //       alert("Title, Artist and Album are required");
// // //       return;
// // //     }

// // //     if (!editingId && (!audio || !image)) {
// // //       alert("Audio and Image required");
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append("title", title.trim());
// // //     formData.append("artist", artist.trim());
// // //     formData.append("album", finalAlbum.trim());

// // //     if (audio) formData.append("audio", audio);
// // //     if (image) formData.append("image", image);

// // //     try {
// // //       setLoading(true);

// // //       if (editingId) {
// // //         await axios.put(`${API}/${editingId}`, formData);
// // //         alert("Song updated");
// // //       } else {
// // //         await axios.post(`${API}/create`, formData, {
// // //           headers: { "Content-Type": "multipart/form-data" },
// // //         });
// // //         alert("Song uploaded");
// // //       }

// // //       resetForm();
// // //       fetchData();
// // //     } catch {
// // //       alert("Upload failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const deleteSong = async (id) => {
// // //     if (!window.confirm("Delete song?")) return;
// // //     await axios.delete(`${API}/${id}`);
// // //     fetchData();
// // //   };

// // //   const deleteAlbum = async () => {
// // //     if (!album || album === "new") return;
// // //     if (!window.confirm("Delete album?")) return;
// // //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// // //     fetchData();
// // //     setAlbum("");
// // //   };

// // //   const editSong = (song) => {
// // //     setEditingId(song._id);
// // //     setTitle(song.title);
// // //     setArtist(song.artist);
// // //     setAlbum(song.album);
// // //   };

// // //   const resetForm = () => {
// // //     setTitle("");
// // //     setArtist("");
// // //     setAlbum("");
// // //     setNewAlbum("");
// // //     setAudio(null);
// // //     setImage(null);
// // //     setEditingId(null);
// // //   };

// // //   return (
// // //     <div style={styles.wrapper}>
// // //       <div style={styles.card}>
// // //         <h1 style={styles.heading}>
// // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // //         </h1>

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Song Title"
// // //           value={title}
// // //           onChange={(e) => setTitle(e.target.value)}
// // //         />

// // //         <input
// // //           style={styles.input}
// // //           placeholder="Artist Name"
// // //           value={artist}
// // //           onChange={(e) => setArtist(e.target.value)}
// // //         />

// // //         <select
// // //           style={styles.input}
// // //           value={album}
// // //           onChange={(e) => setAlbum(e.target.value)}
// // //         >
// // //           <option value="">Select Album</option>
// // //           {albums.map((alb, i) => (
// // //             <option key={i} value={alb}>{alb}</option>
// // //           ))}
// // //           <option value="new">+ Create New Album</option>
// // //         </select>

// // //         {album === "new" && (
// // //           <input
// // //             style={styles.input}
// // //             placeholder="New Album"
// // //             value={newAlbum}
// // //             onChange={(e) => setNewAlbum(e.target.value)}
// // //           />
// // //         )}

// // //         <label style={styles.fileLabel}>
// // //           {audio ? audio.name : "Upload Audio"}
// // //           <input
// // //             type="file"
// // //             accept="audio/*"
// // //             onChange={(e) => setAudio(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <label style={styles.fileLabel}>
// // //           {image ? image.name : "Upload Image"}
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) => setImage(e.target.files[0])}
// // //             style={styles.fileInput}
// // //           />
// // //         </label>

// // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // //           {editingId ? "Update Song" : "Upload Song"}
// // //         </button>

// // //         <button
// // //           style={{ ...styles.button, background: "#9ddcff" }}
// // //           onClick={deleteAlbum}
// // //         >
// // //           Delete Album
// // //         </button>

// // //         <div style={{ marginTop: 20 }}>
// // //           {songs.map(song => (
// // //             <div key={song._id} style={styles.songItem}>
// // //               <span>{song.title} - {song.album}</span>
// // //               <div>
// // //                 <button
// // //                   style={styles.smallBtn}
// // //                   onClick={() => editSong(song)}
// // //                 >
// // //                   Edit
// // //                 </button>
// // //                 <button
// // //                   style={styles.smallDelete}
// // //                   onClick={() => deleteSong(song._id)}
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   wrapper: {
// // //     width: "98vw",
// // //     minHeight: "100vh",
   
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     fontFamily: "Segoe UI",
// // //     color: "black",
// // //   },

// // //   card: {
// // //     width: "100%",
// // //     maxWidth: "500px",
// // //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// // //     padding: 30,
// // //     borderRadius: 25,
// // //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: 15,
// // //   },

// // //   heading: { textAlign: "center", color: "black" },

// // //   input: {
// // //     padding: 12,
// // //     borderRadius: 12,
// // //     border: "1px solid #9ddcff",
// // //     fontSize: 14,
    
// // //   },

// // //   fileLabel: {
// // //     background: "#e6f6ff",
// // //     padding: 12,
// // //     borderRadius: 12,
// // //     cursor: "pointer",
// // //     textAlign: "center",
// // //     border: "1px solid #9ddcff",
// // //     color: "black",
// // //   },

// // //   fileInput: { display: "none" },

// // //   button: {
// // //     marginTop: 10,
// // //     padding: 14,
// // //     borderRadius: 18,
// // //     border: "none",
// // //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// // //     color: "black",
// // //     fontWeight: 600,
// // //     cursor: "pointer",
// // //   },

// // //   songItem: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     padding: 10,
// // //     background: "#eaf7ff",
// // //     borderRadius: 10,
// // //     marginBottom: 10,
// // //     color: "black",
// // //   },

// // //   smallBtn: {
// // //     padding: "5px 10px",
// // //     borderRadius: 8,
// // //     border: "none",
// // //     background: "#7ccfff",
// // //     color: "black",
// // //     cursor: "pointer",
// // //     marginRight: 8,
// // //   },

// // //   smallDelete: {
// // //     padding: "5px 10px",
// // //     borderRadius: 8,
// // //     border: "none",
// // //     background: "#ff9ad1",
// // //     color: "black",
// // //     cursor: "pointer",
// // //   },
// // // };

// // // export default AdminPanel;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const API = "https://music-app-f9t7.onrender.com/api";

// // function AdminPanel() {
// //   const [title, setTitle] = useState("");
// //   const [artist, setArtist] = useState("");
// //   const [album, setAlbum] = useState("");
// //   const [newAlbum, setNewAlbum] = useState("");
// //   const [albums, setAlbums] = useState([]);
// //   const [songs, setSongs] = useState([]);
// //   const [audio, setAudio] = useState(null);
// //   const [image, setImage] = useState(null);
// //   const [editingId, setEditingId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // NEW STATE (only for toggling songs visibility)
// //   const [showSongs, setShowSongs] = useState(false);

// //   const fetchData = async () => {
// //     try {
// //       const res = await axios.get(`${API}/`);
// //       setSongs(res.data);
// //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// //       setAlbums(uniqueAlbums);
// //     } catch (error) {
// //       alert("Failed to fetch songs");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const uploadOrUpdateSong = async () => {
// //     const finalAlbum = album === "new" ? newAlbum : album;

// //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// //       alert("Title, Artist and Album are required");
// //       return;
// //     }

// //     if (!editingId && (!audio || !image)) {
// //       alert("Audio and Image required");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("title", title.trim());
// //     formData.append("artist", artist.trim());
// //     formData.append("album", finalAlbum.trim());

// //     if (audio) formData.append("audio", audio);
// //     if (image) formData.append("image", image);

// //     try {
// //       setLoading(true);

// //       if (editingId) {
// //         await axios.put(`${API}/${editingId}`, formData);
// //         alert("Song updated");
// //       } else {
// //         await axios.post(`${API}/create`, formData, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         alert("Song uploaded");
// //       }

// //       resetForm();
// //       fetchData();
// //     } catch {
// //       alert("Upload failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteSong = async (id) => {
// //     if (!window.confirm("Delete song?")) return;
// //     await axios.delete(`${API}/${id}`);
// //     fetchData();
// //   };

// //   const deleteAlbum = async () => {
// //     if (!album || album === "new") return;
// //     if (!window.confirm("Delete album?")) return;
// //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// //     fetchData();
// //     setAlbum("");
// //   };

// //   const editSong = (song) => {
// //     setEditingId(song._id);
// //     setTitle(song.title);
// //     setArtist(song.artist);
// //     setAlbum(song.album);
// //   };

// //   const resetForm = () => {
// //     setTitle("");
// //     setArtist("");
// //     setAlbum("");
// //     setNewAlbum("");
// //     setAudio(null);
// //     setImage(null);
// //     setEditingId(null);
// //   };

// //   return (
// //     <div style={styles.wrapper}>
// //       <div style={styles.card}>
// //         <h1 style={styles.heading}>
// //           {editingId ? "Update Song" : "Admin Upload Panel"}
// //         </h1>

// //         <input
// //           style={styles.input}
// //           placeholder="Song Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //         />

// //         <input
// //           style={styles.input}
// //           placeholder="Artist Name"
// //           value={artist}
// //           onChange={(e) => setArtist(e.target.value)}
// //         />

// //         <select
// //           style={styles.input}
// //           value={album}
// //           onChange={(e) => setAlbum(e.target.value)}
// //         >
// //           <option value="">Select Album</option>
// //           {albums.map((alb, i) => (
// //             <option key={i} value={alb}>{alb}</option>
// //           ))}
// //           <option value="new">+ Create New Album</option>
// //         </select>

// //         {album === "new" && (
// //           <input
// //             style={styles.input}
// //             placeholder="New Album"
// //             value={newAlbum}
// //             onChange={(e) => setNewAlbum(e.target.value)}
// //           />
// //         )}

// //         <label style={styles.fileLabel}>
// //           {audio ? audio.name : "Upload Audio"}
// //           <input
// //             type="file"
// //             accept="audio/*"
// //             onChange={(e) => setAudio(e.target.files[0])}
// //             style={styles.fileInput}
// //           />
// //         </label>

// //         <label style={styles.fileLabel}>
// //           {image ? image.name : "Upload Image"}
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={(e) => setImage(e.target.files[0])}
// //             style={styles.fileInput}
// //           />
// //         </label>

// //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// //           {editingId ? "Update Song" : "Upload Song"}
// //         </button>

// //         <button
// //           style={{ ...styles.button, background: "#9ddcff" }}
// //           onClick={deleteAlbum}
// //         >
// //           Delete Album
// //         </button>

// //         {/* NEW BUTTON */}
// //         <button
// //           style={{ ...styles.button, background: "#eaf7ff" }}
// //           onClick={() => setShowSongs(!showSongs)}
// //         >
// //           Your Songs
// //         </button>

// //         {/* SONG LIST (Hidden initially) */}
// //         {showSongs && (
// //           <div style={styles.songListWrapper}>
// //             {songs.map(song => (
// //               <div key={song._id} style={styles.songItem}>
// //                 <span>{song.title} - {song.album}</span>
// //                 <div>
// //                   <button
// //                     style={styles.smallBtn}
// //                     onClick={() => editSong(song)}
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     style={styles.smallDelete}
// //                     onClick={() => deleteSong(song._id)}
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   wrapper: {
// //     width: "100%",
// //     minHeight: "100vh",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     fontFamily: "Segoe UI",
// //     color: "black",
// //     padding: 15,
// //     boxSizing: "border-box",
// //   },

// //   card: {
// //     width: "100%",
// //     maxWidth: "500px",
// //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// //     padding: 20,
// //     borderRadius: 25,
// //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// //     display: "flex",
// //     flexDirection: "column",
// //     gap: 15,
// //     boxSizing: "border-box",
// //   },

// //   heading: { textAlign: "center", color: "black" },

// //   input: {
// //     padding: 12,
// //     borderRadius: 12,
// //     border: "1px solid #9ddcff",
// //     fontSize: 14,
// //     width: "100%",
// //     boxSizing: "border-box",
// //   },

// //   fileLabel: {
// //     background: "#e6f6ff",
// //     padding: 12,
// //     borderRadius: 12,
// //     cursor: "pointer",
// //     textAlign: "center",
// //     border: "1px solid #9ddcff",
// //     color: "black",
// //     width: "100%",
// //     boxSizing: "border-box",
// //   },

// //   fileInput: { display: "none" },

// //   // ALL BUTTONS borderRadius 2px
// //   button: {
// //     marginTop: 10,
// //     padding: 14,
// //     borderRadius: 2,
// //     border: "none",
// //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// //     color: "black",
// //     fontWeight: 600,
// //     cursor: "pointer",
// //     width: "100%",
// //   },

// //   songListWrapper: {
// //     marginTop: 20,
// //     width: "100%",
// //   },

// //   songItem: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 10,
// //     background: "#eaf7ff",
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     color: "black",
// //     flexWrap: "wrap",
// //     gap: 10,
// //   },

// //   smallBtn: {
// //     padding: "5px 10px",
// //     borderRadius: 2,
// //     border: "none",
// //     background: "#7ccfff",
// //     color: "black",
// //     cursor: "pointer",
// //     marginRight: 8,
// //   },

// //   smallDelete: {
// //     padding: "5px 10px",
// //     borderRadius: 2,
// //     border: "none",
// //     background: "#ff9ad1",
// //     color: "black",
// //     cursor: "pointer",
// //   },
// // };

// // export default AdminPanel;

// import axios from "axios";
// import { FaPlus, FaTrash, FaEdit, FaUpload, FaMusic, FaSearch, FaTimes, FaCheck, FaChevronDown, FaList, FaCloudUploadAlt } from "react-icons/fa";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// const API = "https://music-app-f9t7.onrender.com/api";

// export default function AdminPanel() {
//   const [songs, setSongs] = useState([]);
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [activeView, setActiveView] = useState("upload"); // upload | songs | batch
//   const [showSongs, setShowSongs] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);

//   // Form
//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [album, setAlbum] = useState("");
//   const [newAlbum, setNewAlbum] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [image, setImage] = useState(null);

//   // Batch JSON upload
//   const [batchJson, setBatchJson] = useState("");
//   const [batchFile, setBatchFile] = useState(null);
//   const [batchLoading, setBatchLoading] = useState(false);
//   const [batchResults, setBatchResults] = useState([]);

//   const audioInputRef = useRef(null);
//   const imageInputRef = useRef(null);

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchData = async () => {
//     setFetchLoading(true);
//     try {
//       const res = await axios.get(`${API}/`);
//       setSongs(res.data);
//       setAlbums([...new Set(res.data.map(s => s.album))]);
//     } catch {
//       showToast("Failed to fetch songs", "error");
//     } finally {
//       setFetchLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const resetForm = () => {
//     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
//     setAudio(null); setImage(null); setEditingId(null);
//     if (audioInputRef.current) audioInputRef.current.value = "";
//     if (imageInputRef.current) imageInputRef.current.value = "";
//   };

//   const uploadOrUpdate = async () => {
//     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
//     if (!title.trim() || !artist.trim() || !finalAlbum) {
//       showToast("Title, Artist and Album required", "error"); return;
//     }
//     if (!editingId && (!audio || !image)) {
//       showToast("Audio and Image required for new song", "error"); return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("artist", artist.trim());
//     formData.append("album", finalAlbum);
//     if (audio) formData.append("audio", audio);
//     if (image) formData.append("image", image);

//     setLoading(true);
//     try {
//       if (editingId) {
//         await axios.put(`${API}/${editingId}`, formData);
//         showToast("Song updated successfully!");
//       } else {
//         await axios.post(`${API}/create`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//         showToast("Song uploaded successfully!");
//       }
//       resetForm();
//       fetchData();
//     } catch (err) {
//       showToast(err.response?.data?.message || "Operation failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteSong = async (id) => {
//     try {
//       await axios.delete(`${API}/${id}`);
//       showToast("Song deleted");
//       setDeleteConfirm(null);
//       fetchData();
//     } catch {
//       showToast("Delete failed", "error");
//     }
//   };

//   const deleteAlbum = async (albumName) => {
//     try {
//       await axios.delete(`${API}/albums/${encodeURIComponent(albumName)}`);
//       showToast(`Album "${albumName}" deleted`);
//       setDeleteConfirm(null);
//       fetchData();
//     } catch {
//       showToast("Album delete failed", "error");
//     }
//   };

//   const editSong = (song) => {
//     setEditingId(song._id);
//     setTitle(song.title);
//     setArtist(song.artist);
//     setAlbum(song.album);
//     setActiveView("upload");
//     window.scrollTo(0, 0);
//   };

//   // Batch upload via JSON
//   const handleBatchJsonUpload = async () => {
//     let parsed;
//     try { parsed = JSON.parse(batchJson); }
//     catch { showToast("Invalid JSON format", "error"); return; }
//     if (!Array.isArray(parsed)) { showToast("JSON must be an array of songs", "error"); return; }

//     setBatchLoading(true);
//     setBatchResults([]);
//     const results = [];

//     for (const item of parsed) {
//       try {
//         if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
//           results.push({ title: item.title || "?", status: "failed", error: "Missing fields" });
//           continue;
//         }
//         await axios.post(`${API}/create-from-url`, item);
//         results.push({ title: item.title, status: "success" });
//       } catch (err) {
//         results.push({ title: item.title || "?", status: "failed", error: err.response?.data?.message || "Failed" });
//       }
//     }

//     setBatchResults(results);
//     setBatchLoading(false);
//     const success = results.filter(r => r.status === "success").length;
//     showToast(`Batch done: ${success}/${parsed.length} uploaded`);
//     if (success > 0) fetchData();
//   };

//   const handleBatchFileRead = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => setBatchJson(ev.target.result);
//     reader.readAsText(file);
//   };

//   const filteredSongs = songs.filter(s =>
//     s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     s.album.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const albumGroups = songs.reduce((acc, s) => {
//     if (!acc[s.album]) acc[s.album] = [];
//     acc[s.album].push(s);
//     return acc;
//   }, {});

//   return (
//     <div style={a.root}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-thumb { background: #e0c8f0; border-radius: 10px; }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes spin2 { to { transform: rotate(360deg); } }
//         .fade-up { animation: fadeUp 0.3s ease; }
//         input:focus, select:focus, textarea:focus { outline: 2px solid #ff6db0 !important; outline-offset: 0; }
//         input::placeholder, textarea::placeholder { color: #b0a8c0; }
//         button:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.15s; }
//       `}</style>

//       {/* Toast */}
//       {toast && (
//         <div style={{...a.toast, background: toast.type === "error" ? "#ff4d7e" : "#22c55e"}} className="slide-in">
//           {toast.type === "success" ? <FaCheck size={12} /> : <FaTimes size={12} />}
//           {toast.msg}
//         </div>
//       )}

//       {/* Delete Confirm Modal */}
//       {deleteConfirm && (
//         <div style={a.modalOverlay} onClick={() => setDeleteConfirm(null)}>
//           <div style={a.modal} onClick={e => e.stopPropagation()}>
//             <h3 style={a.modalTitle}>Confirm Delete</h3>
//             <p style={a.modalText}>{deleteConfirm.message}</p>
//             <div style={a.modalActions}>
//               <button style={a.modalCancel} onClick={() => setDeleteConfirm(null)}>Cancel</button>
//               <button style={a.modalDelete} onClick={deleteConfirm.action}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div style={a.layout}>
//         {/* Sidebar */}
//         <div style={a.sidebar}>
//           <div style={a.logo}>⚡ Admin</div>
//           <div style={a.stats}>
//             <div style={a.statItem}><span style={a.statNum}>{songs.length}</span><span style={a.statLabel}>Songs</span></div>
//             <div style={a.statItem}><span style={a.statNum}>{albums.length}</span><span style={a.statLabel}>Albums</span></div>
//           </div>
//           {[
//             {id:"upload", icon:<FaUpload size={14}/>, label: editingId ? "Edit Song" : "Upload"},
//             {id:"songs", icon:<FaList size={14}/>, label:"Library"},
//             {id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Batch Upload"},
//           ].map(tab => (
//             <div key={tab.id} style={{...a.navItem, ...(activeView === tab.id ? a.navItemActive : {})}}
//               onClick={() => setActiveView(tab.id)}>
//               {tab.icon} {tab.label}
//             </div>
//           ))}
//         </div>
//         <div style={a.content}>
//           {/* Upload Form */}
//           {activeView === "upload" && (
//             <div style={a.card} className="fade-up">
//               <div style={a.cardHeader}>
//                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
//                 {editingId && <button style={a.cancelEditBtn} onClick={resetForm}>Cancel Edit</button>}
//               </div>

//               <div style={a.formGrid}>
//                 <div style={a.formGroup}>
//                   <label style={a.label}>Song Title *</label>
//                   <input style={a.input} placeholder="Enter song title" value={title} onChange={e => setTitle(e.target.value)} />
//                 </div>
//                 <div style={a.formGroup}>
//                   <label style={a.label}>Artist Name *</label>
//                   <input style={a.input} placeholder="Enter artist name" value={artist} onChange={e => setArtist(e.target.value)} />
//                 </div>
//                 <div style={a.formGroup}>
//                   <label style={a.label}>Album *</label>
//                   <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
//                     <option value="">Select Album</option>
//                     {albums.map((alb, i) => <option key={i} value={alb}>{alb}</option>)}
//                     <option value="__new__">+ Create New Album</option>
//                   </select>
//                 </div>
//                 {album === "__new__" && (
//                   <div style={a.formGroup}>
//                     <label style={a.label}>New Album Name *</label>
//                     <input style={a.input} placeholder="New album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
//                   </div>
//                 )}
//               </div>

//               <div style={a.uploadRow}>
//                 <label style={{...a.uploadBox, ...(audio ? a.uploadBoxFilled : {})}}>
//                   <FaMusic size={20} color={audio ? "#ff6db0" : "#b0a8c0"} />
//                   <span style={a.uploadBoxLabel}>{audio ? audio.name : "Upload Audio File"}</span>
//                   <span style={a.uploadBoxSub}>{audio ? `${(audio.size/1024/1024).toFixed(1)} MB` : "MP3, WAV, OGG"}</span>
//                   <input ref={audioInputRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{display:"none"}} />
//                 </label>

//                 <label style={{...a.uploadBox, ...(image ? a.uploadBoxFilled : {})}}>
//                   {image ? (
//                     <img src={URL.createObjectURL(image)} alt="" style={a.previewThumb} />
//                   ) : (
//                     <FaUpload size={20} color="#b0a8c0" />
//                   )}
//                   <span style={a.uploadBoxLabel}>{image ? image.name : "Upload Cover Image"}</span>
//                   <span style={a.uploadBoxSub}>{image ? `${(image.size/1024/1024).toFixed(1)} MB` : "JPG, PNG, WEBP"}</span>
//                   <input ref={imageInputRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{display:"none"}} />
//                 </label>
//               </div>

//               <button style={{...a.btn, ...(loading ? a.btnDisabled : {})}} onClick={uploadOrUpdate} disabled={loading}>
//                 {loading ? <span style={a.spinner} /> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
//               </button>
//             </div>
//           )}

//           {/* Library */}
//           {activeView === "songs" && (
//             <div className="fade-up">
//               <div style={a.libHeader}>
//                 <h2 style={a.cardTitle}>🎵 Library</h2>
//                 <div style={a.searchBar}>
//                   <FaSearch color="#b0a8c0" size={13} />
//                   <input style={a.searchInput} placeholder="Search songs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//                   {searchQuery && <button style={a.clearBtn} onClick={() => setSearchQuery("")}><FaTimes size={12} /></button>}
//                 </div>
//               </div>

//               {fetchLoading ? (
//                 <div style={a.loadingMsg}>Loading library...</div>
//               ) : (
//                 <>
//                   {/* Albums Section */}
//                   {!searchQuery && (
//                     <div style={a.albumList}>
//                       {Object.entries(albumGroups).map(([albumName, albumSongs]) => (
//                         <div key={albumName} style={a.albumGroup}>
//                           <div style={a.albumGroupHeader}>
//                             <div style={a.albumGroupLeft}>
//                               <img src={albumSongs[0]?.imageUrl} alt="" style={a.albumGroupImg} />
//                               <div>
//                                 <div style={a.albumGroupName}>{albumName}</div>
//                                 <div style={a.albumGroupCount}>{albumSongs.length} songs</div>
//                               </div>
//                             </div>
//                             <button style={a.deleteAlbumBtn} onClick={() => setDeleteConfirm({
//                               message: `Delete entire album "${albumName}" and all ${albumSongs.length} songs?`,
//                               action: () => deleteAlbum(albumName)
//                             })}>
//                               <FaTrash size={12} /> Delete Album
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {/* Songs list */}
//                   <div style={a.songsList}>
//                     {filteredSongs.map((song, i) => (
//                       <div key={song._id} style={a.songRow}>
//                         <div style={a.songLeft}>
//                           <span style={a.songIdx}>{i + 1}</span>
//                           <img src={song.imageUrl} alt="" style={a.songThumb} />
//                           <div style={a.songInfo}>
//                             <div style={a.songTitle}>{song.title}</div>
//                             <div style={a.songMeta}>{song.artist} · {song.album}</div>
//                           </div>
//                         </div>
//                         <div style={a.songActions}>
//                           <button style={a.editBtn} onClick={() => editSong(song)}><FaEdit size={13} /></button>
//                           <button style={a.deleteBtn} onClick={() => setDeleteConfirm({
//                             message: `Delete "${song.title}" by ${song.artist}?`,
//                             action: () => deleteSong(song._id)
//                           })}><FaTrash size={13} /></button>
//                         </div>
//                       </div>
//                     ))}
//                     {filteredSongs.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           {/* Batch Upload */}
//           {activeView === "batch" && (
//             <div style={a.card} className="fade-up">
//               <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
//               <p style={a.helpText}>Upload multiple songs at once using a JSON array. Each song must have: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>
              
//               <div style={a.jsonExample}>
//                 <div style={a.jsonExampleTitle}>Example Format:</div>
//                 <pre style={a.jsonPre}>{`[
//   {
//     "title": "Song Name",
//     "artist": "Artist Name",
//     "album": "Album Name",
//     "audioUrl": "https://...",
//     "imageUrl": "https://..."
//   }
// ]`}</pre>
//               </div>

//               <label style={a.fileJsonLabel}>
//                 <FaUpload size={14} /> Upload JSON File
//                 <input type="file" accept=".json" onChange={handleBatchFileRead} style={{display:"none"}} />
//               </label>
              
//               <div style={a.orDivider}><span>or paste JSON below</span></div>

//               <textarea
//                 style={a.jsonTextarea}
//                 placeholder='[{"title": "...", "artist": "...", "album": "...", "audioUrl": "...", "imageUrl": "..."}]'
//                 value={batchJson}
//                 onChange={e => setBatchJson(e.target.value)}
//                 rows={10}
//               />

//               <button style={{...a.btn, ...(batchLoading ? a.btnDisabled : {})}} onClick={handleBatchJsonUpload} disabled={batchLoading}>
//                 {batchLoading ? <><span style={a.spinner} /> Uploading...</> : "↑ Upload All Songs"}
//               </button>

//               {batchResults.length > 0 && (
//                 <div style={a.batchResults}>
//                   <div style={a.batchResultsTitle}>Results ({batchResults.filter(r=>r.status==="success").length}/{batchResults.length} success)</div>
//                   {batchResults.map((r, i) => (
//                     <div key={i} style={{...a.batchResultItem, borderLeft:`3px solid ${r.status==="success" ? "#22c55e" : "#ff4d7e"}`}}>
//                       <span>{r.status === "success" ? "✓" : "✗"} {r.title}</span>
//                       {r.error && <span style={a.batchError}>{r.error}</span>}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const PINK = "#ff6db0";
// const BLUE = "#5db8ff";
// const TEXT = "#1a1a2e";
// const MUTED = "#9098b1";
// const BG = "#f8f5ff";
// const CARD_BG = "#ffffff";
// const BORDER = "#ede8f7";

// const a = {
//   root: { fontFamily:"'Sora', sans-serif", background:BG, minHeight:"100vh", color:TEXT, position:"relative" },

//   toast: { position:"fixed", top:20, right:20, padding:"12px 20px", borderRadius:12, color:"#fff", fontSize:13, fontWeight:600, zIndex:9999, display:"flex", alignItems:"center", gap:8, boxShadow:"0 8px 24px rgba(0,0,0,0.15)", animation:"slideIn 0.3s ease" },

//   modalOverlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
//   modal: { background:CARD_BG, borderRadius:20, padding:28, maxWidth:360, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" },
//   modalTitle: { fontSize:18, fontWeight:700, marginBottom:8 },
//   modalText: { fontSize:14, color:MUTED, marginBottom:20, lineHeight:1.6 },
//   modalActions: { display:"flex", gap:12, justifyContent:"flex-end" },
//   modalCancel: { padding:"10px 20px", borderRadius:10, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", fontSize:13, fontWeight:600, color:TEXT },
//   modalDelete: { padding:"10px 20px", borderRadius:10, border:"none", background:"#ff4d7e", color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600 },

//   layout: { display:"flex", minHeight:"100vh" },
//   sidebar: { width:200, background:CARD_BG, borderRight:`1px solid ${BORDER}`, padding:"24px 16px", display:"flex", flexDirection:"column", gap:4, position:"sticky", top:0, height:"100vh", flexShrink:0 },
//   logo: { fontSize:18, fontWeight:700, color:PINK, padding:"0 12px", marginBottom:20 },
//   stats: { display:"flex", gap:12, marginBottom:20, padding:"12px", background:BG, borderRadius:12 },
//   statItem: { flex:1, textAlign:"center" },
//   statNum: { display:"block", fontSize:20, fontWeight:700, color:PINK },
//   statLabel: { fontSize:10, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
//   navItem: { display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, cursor:"pointer", color:MUTED, fontSize:13, fontWeight:500 },
//   navItemActive: { background:"#fff0f8", color:PINK, fontWeight:600 },

//   content: { flex:1, padding:24, maxWidth:900, overflowY:"auto" },

//   card: { background:CARD_BG, borderRadius:20, padding:28, boxShadow:"0 2px 20px rgba(0,0,0,0.05)", marginBottom:24, border:`1px solid ${BORDER}` },
//   cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 },
//   cardTitle: { fontSize:20, fontWeight:700, color:TEXT },
//   cancelEditBtn: { padding:"6px 14px", borderRadius:8, border:`1px solid ${PINK}`, background:"none", color:PINK, cursor:"pointer", fontSize:12, fontWeight:600 },

//   formGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginBottom:20 },
//   formGroup: { display:"flex", flexDirection:"column", gap:6 },
//   label: { fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
//   input: { padding:"12px 14px", borderRadius:10, border:`1.5px solid ${BORDER}`, fontSize:14, fontFamily:"inherit", color:TEXT, background:CARD_BG, transition:"border 0.2s" },

//   uploadRow: { display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" },
//   uploadBox: { flex:1, minWidth:200, border:`2px dashed ${BORDER}`, borderRadius:14, padding:20, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:BG, transition:"border 0.2s, background 0.2s" },
//   uploadBoxFilled: { borderColor:PINK, background:"#fff8fd" },
//   uploadBoxLabel: { fontSize:13, fontWeight:600, color:TEXT, textAlign:"center" },
//   uploadBoxSub: { fontSize:11, color:MUTED },
//   previewThumb: { width:48, height:48, borderRadius:8, objectFit:"cover" },

//   btn: { width:"100%", padding:"14px", borderRadius:12, border:"none", background:`linear-gradient(135deg, ${PINK}, ${BLUE})`, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 },
//   btnDisabled: { opacity:0.6, cursor:"not-allowed" },
//   spinner: { width:16, height:16, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin2 0.8s linear infinite" },

//   libHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 },
//   searchBar: { display:"flex", alignItems:"center", gap:10, background:CARD_BG, borderRadius:10, padding:"10px 14px", border:`1.5px solid ${BORDER}`, minWidth:220 },
//   searchInput: { border:"none", outline:"none", fontSize:13, fontFamily:"inherit", color:TEXT, background:"none", width:160 },
//   clearBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, display:"flex" },
//   loadingMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:40 },

//   albumList: { display:"flex", flexDirection:"column", gap:8, marginBottom:24 },
//   albumGroup: { background:CARD_BG, borderRadius:14, overflow:"hidden", border:`1px solid ${BORDER}` },
//   albumGroupHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px" },
//   albumGroupLeft: { display:"flex", alignItems:"center", gap:12 },
//   albumGroupImg: { width:44, height:44, borderRadius:8, objectFit:"cover" },
//   albumGroupName: { fontSize:14, fontWeight:600, color:TEXT },
//   albumGroupCount: { fontSize:11, color:MUTED },
//   deleteAlbumBtn: { display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", color:"#ff4d7e", cursor:"pointer", fontSize:12, fontWeight:600 },

//   songsList: { display:"flex", flexDirection:"column", gap:2 },
//   songRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, background:CARD_BG, border:`1px solid ${BORDER}`, marginBottom:4, gap:12 },
//   songLeft: { display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 },
//   songIdx: { fontSize:12, color:MUTED, width:20, textAlign:"center", flexShrink:0 },
//   songThumb: { width:44, height:44, borderRadius:8, objectFit:"cover", flexShrink:0 },
//   songInfo: { minWidth:0 },
//   songTitle: { fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   songMeta: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
//   songActions: { display:"flex", gap:8, flexShrink:0 },
//   editBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", color:BLUE, display:"flex" },
//   deleteBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", cursor:"pointer", color:"#ff4d7e", display:"flex" },
//   emptyMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:32 },

//   helpText: { fontSize:13, color:MUTED, lineHeight:1.7, marginBottom:20 },
//   code: { fontFamily:"'DM Mono', monospace", background:BG, padding:"2px 6px", borderRadius:4, fontSize:12 },
//   jsonExample: { background:BG, borderRadius:12, padding:16, marginBottom:16 },
//   jsonExampleTitle: { fontSize:12, fontWeight:600, color:MUTED, marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 },
//   jsonPre: { fontFamily:"'DM Mono', monospace", fontSize:12, color:TEXT, whiteSpace:"pre-wrap", lineHeight:1.6 },
//   fileJsonLabel: { display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:10, border:`1.5px dashed ${PINK}`, color:PINK, cursor:"pointer", fontSize:13, fontWeight:600, marginBottom:12 },
//   orDivider: { textAlign:"center", color:MUTED, fontSize:12, margin:"12px 0", position:"relative" },
//   jsonTextarea: { width:"100%", padding:"14px", borderRadius:12, border:`1.5px solid ${BORDER}`, fontSize:12, fontFamily:"'DM Mono', monospace", color:TEXT, resize:"vertical", lineHeight:1.6, background:BG, marginBottom:16 },
//   batchResults: { marginTop:20, border:`1px solid ${BORDER}`, borderRadius:12, overflow:"hidden" },
//   batchResultsTitle: { padding:"12px 16px", background:BG, fontSize:13, fontWeight:700, color:TEXT },
//   batchResultItem: { display:"flex", justifyContent:"space-between", padding:"10px 16px", borderBottom:`1px solid ${BORDER}`, fontSize:13 },
//   batchError: { color:"#ff4d7e", fontSize:11 },
// };
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
  FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
} from "react-icons/fa";

const API = "https://music-app-f9t7.onrender.com/api";

// ── Admins (username: password) ──
const ADMINS = {
  "admin": "vibe2024",
  "revanth": "revv@123",
  "superadmin": "music#999",
};

// ── Cached songs ──
let _cache = null;

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
export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [view, setView] = useState("upload"); // upload | library | batch
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // form
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);
  const imageRef = useRef(null);

  // batch
  const [batchJson, setBatchJson] = useState("");
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  // ─── AUTH ───
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginErr("");
    const pass = ADMINS[loginUser.trim().toLowerCase()];
    if (pass && pass === loginPass) {
      sessionStorage.setItem("vo_admin", loginUser);
      setAuthed(true);
    } else {
      setLoginErr("Invalid username or password.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("vo_admin");
    setAuthed(false);
    setLoginUser(""); setLoginPass("");
  };

  // ─── DATA ───
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async (force = false) => {
    setFetchLoading(true);
    try {
      if (_cache && !force) {
        setSongs(_cache);
        setAlbums([...new Set(_cache.map(s => s.album))]);
        setFetchLoading(false);
        return;
      }
      const res = await axios.get(`${API}/`);
      _cache = res.data;
      setSongs(res.data);
      setAlbums([...new Set(res.data.map(s => s.album))]);
    } catch {
      showToast("Failed to fetch songs", "error");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed]);

  const resetForm = () => {
    setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
    setAudio(null); setImage(null); setEditingId(null);
    if (audioRef.current) audioRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
  };

  const submit = async () => {
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
      if (editingId) {
        await axios.put(`${API}/${editingId}`, fd);
        showToast("Song updated!");
      } else {
        await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        showToast("Song uploaded!");
      }
      resetForm();
      _cache = null;
      fetchData(true);
    } catch (err) {
      showToast(err.response?.data?.message || "Upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      showToast("Song deleted");
      setConfirm(null);
      _cache = null;
      fetchData(true);
    } catch { showToast("Delete failed", "error"); }
  };

  const deleteAlbum = async (name) => {
    try {
      await axios.delete(`${API}/albums/${encodeURIComponent(name)}`);
      showToast(`Album "${name}" deleted`);
      setConfirm(null);
      _cache = null;
      fetchData(true);
    } catch { showToast("Album delete failed", "error"); }
  };

  const editSong = (song) => {
    setEditingId(song._id);
    setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
    setView("upload");
    window.scrollTo(0, 0);
  };

  // ─── BATCH ───
  const runBatch = async () => {
    let parsed;
    try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
    if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }

    setBatchLoading(true);
    setBatchResults([]);
    const results = [];

    for (const item of parsed) {
      if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
        results.push({ title: item.title || "?", status: "fail", error: "Missing fields" });
        continue;
      }
      try {
        await axios.post(`${API}/create-from-url`, { title: item.title, artist: item.artist, album: item.album, audioUrl: item.audioUrl, imageUrl: item.imageUrl });
        results.push({ title: item.title, status: "ok" });
      } catch (err) {
        results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
      }
    }

    setBatchResults(results);
    setBatchLoading(false);
    const ok = results.filter(r => r.status === "ok").length;
    showToast(`Batch: ${ok}/${parsed.length} uploaded`);
    if (ok > 0) { _cache = null; fetchData(true); }
  };

  const filtered = songs.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase()) ||
    s.album.toLowerCase().includes(search.toLowerCase())
  );

  const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

  // ─── LOGIN SCREEN ───
  if (!authed) {
    return (
      <div style={l.root}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
          *{box-sizing:border-box;margin:0;padding:0;}
          input:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
          @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        `}</style>
        <div style={l.card}>
          <div style={l.icon}><FaLock size={22} color={C.accent} /></div>
          <h1 style={l.title}>Admin Access</h1>
          <p style={l.sub}>Enter your credentials to continue</p>
          {loginErr && <div style={l.err}>{loginErr}</div>}
          <form onSubmit={handleLogin} style={l.form}>
            <div style={l.field}>
              <label style={l.label}>Username</label>
              <div style={l.inputWrap}>
                <FaUser size={13} color={C.muted} />
                <input style={l.input} type="text" placeholder="admin" value={loginUser}
                  onChange={e => setLoginUser(e.target.value)} autoFocus />
              </div>
            </div>
            <div style={l.field}>
              <label style={l.label}>Password</label>
              <div style={l.inputWrap}>
                <FaLock size={13} color={C.muted} />
                <input style={l.input} type={showPass ? "text" : "password"} placeholder="••••••••" value={loginPass}
                  onChange={e => setLoginPass(e.target.value)} />
                <button type="button" style={l.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash size={13} color={C.muted} /> : <FaEye size={13} color={C.muted} />}
                </button>
              </div>
            </div>
            <button type="submit" style={l.btn}>Sign In →</button>
          </form>
        </div>
      </div>
    );
  }

  // ─── ADMIN PANEL ───
  return (
    <div style={a.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
        input::placeholder,textarea::placeholder{color:${C.muted};}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin2{to{transform:rotate(360deg)}}
        @media(max-width:640px){
          .admin-layout{flex-direction:column!important;}
          .admin-sidebar{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;position:relative!important;height:auto!important;}
          .admin-sidebar-logo{display:none!important;}
          .admin-stats{display:none!important;}
          .sidebar-nav{flex-direction:row!important;gap:4px!important;flex:1!important;}
          .nav-item{padding:8px 14px!important;font-size:12px!important;}
          .form-grid{grid-template-columns:1fr!important;}
          .upload-row{flex-direction:column!important;}
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ ...a.toast, background: toast.type === "error" ? C.error : C.success, animation: "slideIn 0.25s ease" }}>
          {toast.type === "error" ? "✗" : "✓"} {toast.msg}
        </div>
      )}

      {/* Confirm modal */}
      {confirm && (
        <div style={a.overlay} onClick={() => setConfirm(null)}>
          <div style={a.modal} onClick={e => e.stopPropagation()}>
            <h3 style={a.modalTitle}>Confirm Delete</h3>
            <p style={a.modalMsg}>{confirm.msg}</p>
            <div style={a.modalBtns}>
              <button style={a.modalCancel} onClick={() => setConfirm(null)}>Cancel</button>
              <button style={a.modalDelete} onClick={confirm.action}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={a.layout} className="admin-layout">
        {/* Sidebar */}
        <div style={a.sidebar} className="admin-sidebar">
          <div style={a.sidebarLogo} className="admin-sidebar-logo">⚡ Admin</div>
          <div style={a.stats} className="admin-stats">
            <div style={a.stat}><span style={a.statN}>{songs.length}</span><span style={a.statL}>Songs</span></div>
            <div style={a.statDiv} />
            <div style={a.stat}><span style={a.statN}>{albums.length}</span><span style={a.statL}>Albums</span></div>
          </div>
          <div style={a.sidebarNav} className="sidebar-nav">
            {[
              { id: "upload", icon: <FaUpload size={13} />, label: editingId ? "Edit" : "Upload" },
              { id: "library", icon: <FaList size={13} />, label: "Library" },
              { id: "batch", icon: <FaCloudUploadAlt size={14} />, label: "Batch" },
            ].map(t => (
              <button key={t.id}
                style={{ ...a.navItem, ...(view === t.id ? a.navItemActive : {}) }}
                className="nav-item"
                onClick={() => setView(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button style={a.logoutBtn} onClick={logout}><FaSignOutAlt size={13} /> Logout</button>
        </div>

        {/* Content */}
        <div style={a.content}>

          {/* ── UPLOAD ── */}
          {view === "upload" && (
            <div style={a.card} key="upload">
              <div style={a.cardHead}>
                <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
                {editingId && <button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
              </div>

              <div style={a.formGrid} className="form-grid">
                <div style={a.field}>
                  <label style={a.label}>Song Title *</label>
                  <input style={a.input} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div style={a.field}>
                  <label style={a.label}>Artist *</label>
                  <input style={a.input} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} />
                </div>
                <div style={a.field}>
                  <label style={a.label}>Album *</label>
                  <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
                    <option value="">Select album</option>
                    {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
                    <option value="__new__">+ New Album</option>
                  </select>
                </div>
                {album === "__new__" && (
                  <div style={a.field}>
                    <label style={a.label}>New Album Name *</label>
                    <input style={a.input} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
                  </div>
                )}
              </div>

              <div style={a.uploadRow} className="upload-row">
                <label style={{ ...a.dropZone, ...(audio ? a.dropZoneFilled : {}) }}>
                  <FaMusic size={20} color={audio ? C.accent : C.muted} />
                  <span style={a.dropLabel}>{audio ? audio.name : "Upload Audio File"}</span>
                  <span style={a.dropSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
                  <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
                </label>

                <label style={{ ...a.dropZone, ...(image ? a.dropZoneFilled : {}) }}>
                  {image
                    ? <img src={URL.createObjectURL(image)} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
                    : <FaUpload size={20} color={C.muted} />
                  }
                  <span style={a.dropLabel}>{image ? image.name : "Upload Cover Image"}</span>
                  <span style={a.dropSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
                  <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
                </label>
              </div>

              <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submit} disabled={loading}>
                {loading
                  ? <><span style={a.spinner} /> {editingId ? "Updating..." : "Uploading..."}</>
                  : editingId ? "✓ Update Song" : "↑ Upload Song"
                }
              </button>
            </div>
          )}

          {/* ── LIBRARY ── */}
          {view === "library" && (
            <div key="library" style={{ animation: "fadeUp 0.25s ease" }}>
              <div style={a.libTop}>
                <h2 style={a.cardTitle}>Library</h2>
                <div style={a.searchWrap}>
                  <FaSearch size={12} color={C.muted} />
                  <input style={a.searchInput} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                  {search && <button style={a.clrBtn} onClick={() => setSearch("")}><FaTimes size={11} /></button>}
                </div>
              </div>

              {fetchLoading ? <div style={a.loadMsg}>Loading...</div> : <>
                {!search && Object.entries(albumGroups).length > 0 && (
                  <div style={a.albumGrid}>
                    {Object.entries(albumGroups).map(([name, list]) => (
                      <div key={name} style={a.albumRow}>
                        <div style={a.albumRowL}>
                          <img src={list[0]?.imageUrl} alt="" style={a.albumRowImg} loading="lazy" />
                          <div>
                            <div style={a.albumRowName}>{name}</div>
                            <div style={a.albumRowMeta}>{list.length} songs</div>
                          </div>
                        </div>
                        <button style={a.delAlbumBtn} onClick={() => setConfirm({ msg: `Delete album "${name}" and all ${list.length} songs?`, action: () => deleteAlbum(name) })}>
                          <FaTrash size={11} /> Album
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={a.songsList}>
                  <div style={a.songsListHead}>
                    {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : `All Songs (${songs.length})`}
                  </div>
                  {filtered.map((s, i) => (
                    <div key={s._id} style={a.songRow}>
                      <div style={a.songRowL}>
                        <span style={a.songIdx}>{i + 1}</span>
                        <img src={s.imageUrl} alt="" style={a.songImg} loading="lazy" />
                        <div style={a.songInfo}>
                          <div style={a.songTitle}>{s.title}</div>
                          <div style={a.songMeta}>{s.artist} · {s.album}</div>
                        </div>
                      </div>
                      <div style={a.songActions}>
                        <button style={a.editBtn} onClick={() => editSong(s)}><FaEdit size={12} /></button>
                        <button style={a.delBtn} onClick={() => setConfirm({ msg: `Delete "${s.title}"?`, action: () => deleteSong(s._id) })}><FaTrash size={12} /></button>
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
                </div>
              </>}
            </div>
          )}

          {/* ── BATCH ── */}
          {view === "batch" && (
            <div style={a.card} key="batch">
              <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
              <p style={a.helpText}>Upload multiple songs using a JSON array. Each item needs: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>

              <div style={a.exampleBox}>
                <div style={a.exampleTitle}>Example JSON</div>
                <pre style={a.pre}>{`[
  {
    "title": "Song Name",
    "artist": "Artist Name",
    "album": "Album Name",
    "audioUrl": "https://cdn.example.com/audio.mp3",
    "imageUrl": "https://cdn.example.com/cover.jpg"
  }
]`}</pre>
              </div>

              <label style={a.fileLabel}>
                <FaUpload size={12} /> Upload .json file
                <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
              </label>

              <div style={a.orRow}><span style={a.orText}>or paste below</span></div>

              <textarea style={a.textarea} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
                value={batchJson} onChange={e => setBatchJson(e.target.value)} />

              <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
                {batchLoading ? <><span style={a.spinner} /> Processing...</> : "↑ Upload All"}
              </button>

              {batchResults.length > 0 && (
                <div style={a.resultsBox}>
                  <div style={a.resultsTitle}>{batchResults.filter(r => r.status === "ok").length}/{batchResults.length} uploaded</div>
                  {batchResults.map((r, i) => (
                    <div key={i} style={{ ...a.resultRow, borderLeft: `3px solid ${r.status === "ok" ? C.accent : C.error}` }}>
                      <span style={{ color: r.status === "ok" ? C.accent : C.error }}>{r.status === "ok" ? "✓" : "✗"}</span>
                      <span style={a.resultName}>{r.title}</span>
                      {r.error && <span style={a.resultErr}>{r.error}</span>}
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

// ── LOGIN STYLES ──
const l = {
  root: { fontFamily: "'Outfit',sans-serif", minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.35s ease" },
  icon: { width: 52, height: 52, borderRadius: 14, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 },
  sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
  err: { background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 },
  inputWrap: { display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" },
  input: { flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" },
  eyeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 },
  btn: { marginTop: 8, padding: "13px", borderRadius: 12, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
};

// ── ADMIN STYLES ──
const a = {
  root: { fontFamily: "'Outfit',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, position: "relative" },
  toast: { position: "fixed", top: 80, right: 20, padding: "12px 18px", borderRadius: 10, color: "#0f0f0f", fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8 },

  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
  modalTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
  modalMsg: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
  modalBtns: { display: "flex", gap: 10, justifyContent: "flex-end" },
  modalCancel: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif" },
  modalDelete: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif" },

  layout: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "24px 14px", display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 0, height: "100vh", flexShrink: 0 },
  sidebarLogo: { fontSize: 17, fontWeight: 700, color: C.accent, padding: "0 8px", marginBottom: 16 },
  stats: { display: "flex", gap: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, overflow: "hidden" },
  stat: { flex: 1, textAlign: "center", padding: "12px 8px" },
  statN: { display: "block", fontSize: 18, fontWeight: 700, color: C.accent },
  statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
  statDiv: { width: 1, background: C.border },
  sidebarNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
  navItem: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, fontWeight: 500, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", textAlign: "left" },
  navItemActive: { background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}` },
  logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", marginTop: "auto" },

  content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },

  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 24, animation: "fadeUp 0.25s ease" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: 700 },
  cancelBtn: { padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.5 },
  input: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: "'Outfit',sans-serif", color: C.text, background: C.card },

  uploadRow: { display: "flex", gap: 16, marginBottom: 24 },
  dropZone: { flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", background: C.bg, transition: "border 0.2s" },
  dropZoneFilled: { borderColor: C.accent, background: C.accentDim },
  dropLabel: { fontSize: 12, fontWeight: 600, color: C.text, textAlign: "center" },
  dropSub: { fontSize: 11, color: C.muted },

  btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Outfit',sans-serif" },
  btnDis: { opacity: 0.5, cursor: "not-allowed" },
  spinner: { width: 14, height: 14, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0f0f0f", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

  libTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
  searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
  searchInput: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", fontFamily: "'Outfit',sans-serif", width: 160 },
  clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
  loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

  albumGrid: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 },
  albumRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 },
  albumRowL: { display: "flex", alignItems: "center", gap: 12 },
  albumRowImg: { width: 42, height: 42, borderRadius: 8, objectFit: "cover" },
  albumRowName: { fontSize: 14, fontWeight: 600 },
  albumRowMeta: { fontSize: 11, color: C.sub },
  delAlbumBtn: { display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", color: C.error, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

  songsList: { display: "flex", flexDirection: "column", gap: 3 },
  songsListHead: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, padding: "0 4px 10px" },
  songRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, gap: 12 },
  songRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
  songIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
  songImg: { width: 40, height: 40, borderRadius: 6, objectFit: "cover", flexShrink: 0 },
  songInfo: { minWidth: 0 },
  songTitle: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  songMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  songActions: { display: "flex", gap: 8, flexShrink: 0 },
  editBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", color: C.sub, display: "flex" },
  delBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", cursor: "pointer", color: C.error, display: "flex" },
  emptyMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },

  helpText: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
  code: { fontFamily: "'JetBrains Mono',monospace", background: C.card, border: `1px solid ${C.border}`, padding: "2px 6px", borderRadius: 4, fontSize: 11 },
  exampleBox: { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
  exampleTitle: { fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 },
  pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
  fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 14 },
  orRow: { margin: "12px 0", textAlign: "center" },
  orText: { fontSize: 12, color: C.muted },
  textarea: { width: "100%", padding: "14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text, resize: "vertical", lineHeight: 1.7, background: C.bg, marginBottom: 16 },
  resultsBox: { marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
  resultsTitle: { padding: "10px 16px", background: C.card, fontSize: 12, fontWeight: 700, color: C.sub, borderBottom: `1px solid ${C.border}` },
  resultRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },
  resultName: { flex: 1 },
  resultErr: { fontSize: 11, color: C.error },
};
