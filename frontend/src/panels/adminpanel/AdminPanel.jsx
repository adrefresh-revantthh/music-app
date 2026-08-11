// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import axios from "axios";

// // // // // // // // // function AdminPanel() {
// // // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // // //   const [editingId, setEditingId] = useState(null);

// // // // // // // // //   const fetchData = async () => {
// // // // // // // // //     const res = await axios.get("http://localhost:5000/api/songs");
// // // // // // // // //     setSongs(res.data);

// // // // // // // // //     const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // // //     setAlbums(uniqueAlbums);
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchData();
// // // // // // // // //   }, []);

// // // // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // // //     if (!title || !finalAlbum) {
// // // // // // // // //       alert("Title and Album are required");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append("title", title);
// // // // // // // // //     formData.append("artist", artist);
// // // // // // // // //     formData.append("album", finalAlbum);
// // // // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // // // //     if (image) formData.append("image", image);

// // // // // // // // //     try {
// // // // // // // // //       if (editingId) {
// // // // // // // // //         await axios.put(
// // // // // // // // //           `http://localhost:5000/api/songs/${editingId}`,
// // // // // // // // //           formData
// // // // // // // // //         );
// // // // // // // // //         alert("Song updated");
// // // // // // // // //       } else {
// // // // // // // // //         if (!audio || !image) {
// // // // // // // // //           alert("Audio and image required for new song");
// // // // // // // // //           return;
// // // // // // // // //         }
// // // // // // // // //         await axios.post(
// // // // // // // // //           "http://localhost:5000/api/songs/create",
// // // // // // // // //           formData
// // // // // // // // //         );
// // // // // // // // //         alert("Song uploaded");
// // // // // // // // //       }

// // // // // // // // //       resetForm();
// // // // // // // // //       fetchData();

// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error(error);
// // // // // // // // //       alert("Operation failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const deleteSong = async (id) => {
// // // // // // // // //     if (!window.confirm("Delete this song?")) return;

// // // // // // // // //     await axios.delete(`http://localhost:5000/api/songs/${id}`);
// // // // // // // // //     fetchData();
// // // // // // // // //   };

// // // // // // // // //   const deleteAlbum = async () => {
// // // // // // // // //     if (!album || album === "new") {
// // // // // // // // //       alert("Select valid album");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // // // // // // // //     await axios.delete(
// // // // // // // // //       `http://localhost:5000/api/albums/${album}`
// // // // // // // // //     );

// // // // // // // // //     fetchData();
// // // // // // // // //     setAlbum("");
// // // // // // // // //   };

// // // // // // // // //   const editSong = (song) => {
// // // // // // // // //     setEditingId(song._id);
// // // // // // // // //     setTitle(song.title);
// // // // // // // // //     setArtist(song.artist);
// // // // // // // // //     setAlbum(song.album);
// // // // // // // // //   };

// // // // // // // // //   const resetForm = () => {
// // // // // // // // //     setTitle("");
// // // // // // // // //     setArtist("");
// // // // // // // // //     setAlbum("");
// // // // // // // // //     setNewAlbum("");
// // // // // // // // //     setAudio(null);
// // // // // // // // //     setImage(null);
// // // // // // // // //     setEditingId(null);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={styles.wrapper}>
// // // // // // // // //       <div style={styles.card}>
// // // // // // // // //         <h1 style={styles.heading}>
// // // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // // //         </h1>

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Song Title"
// // // // // // // // //           value={title}
// // // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Artist Name"
// // // // // // // // //           value={artist}
// // // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <select
// // // // // // // // //           style={styles.input}
// // // // // // // // //           value={album}
// // // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // // //         >
// // // // // // // // //           <option value="">Select Album</option>
// // // // // // // // //           {albums.map((alb, index) => (
// // // // // // // // //             <option key={index} value={alb}>
// // // // // // // // //               {alb}
// // // // // // // // //             </option>
// // // // // // // // //           ))}
// // // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // // //         </select>

// // // // // // // // //         {album === "new" && (
// // // // // // // // //           <input
// // // // // // // // //             style={styles.input}
// // // // // // // // //             placeholder="New Album Name"
// // // // // // // // //             value={newAlbum}
// // // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // // //           />
// // // // // // // // //         )}

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="audio/*"
// // // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="image/*"
// // // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // // //         </button>

// // // // // // // // //         <button
// // // // // // // // //           style={{ ...styles.button, background: "linear-gradient(90deg, #ff7eb6, #ff4d94)" }}
// // // // // // // // //           onClick={deleteAlbum}
// // // // // // // // //         >
// // // // // // // // //           Delete Selected Album
// // // // // // // // //         </button>

// // // // // // // // //         {/* SONG LIST WITH EDIT + DELETE */}
// // // // // // // // //         <div style={{ marginTop: "20px" }}>
// // // // // // // // //           {songs.map(song => (
// // // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // // //               <div>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallBtn}
// // // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // // //                 >
// // // // // // // // //                   Edit
// // // // // // // // //                 </button>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallDelete}
// // // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // // //                 >
// // // // // // // // //                   Delete
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>

// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = {
// // // // // // // // //   wrapper: {
// // // // // // // // //     width: "98vw",
// // // // // // // // //     minHeight: "100vh",
// // // // // // // // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "center",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     padding: "20px",
// // // // // // // // //     boxSizing: "border-box",
// // // // // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // // // // //   },
// // // // // // // // //   card: {
// // // // // // // // //     width: "100%",
// // // // // // // // //     maxWidth: "500px",
// // // // // // // // //     background: "rgba(255,255,255,0.75)",
// // // // // // // // //     backdropFilter: "blur(12px)",
// // // // // // // // //     padding: "30px",
// // // // // // // // //     borderRadius: "25px",
// // // // // // // // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // // // // // // // //     display: "flex",
// // // // // // // // //     flexDirection: "column",
// // // // // // // // //     gap: "15px",
// // // // // // // // //   },
// // // // // // // // //   heading: {
// // // // // // // // //     textAlign: "center",
// // // // // // // // //     color: "#b03060",
// // // // // // // // //   },
// // // // // // // // //   input: {
// // // // // // // // //     padding: "12px",
// // // // // // // // //     borderRadius: "12px",
// // // // // // // // //     border: "1px solid #ffb6d9",
// // // // // // // // //     outline: "none",
// // // // // // // // //     fontSize: "14px",
// // // // // // // // //   },
// // // // // // // // //   fileLabel: {
// // // // // // // // //     background: "#ffe6f0",
// // // // // // // // //     padding: "12px",
// // // // // // // // //     borderRadius: "12px",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //     textAlign: "center",
// // // // // // // // //     color: "#b03060",
// // // // // // // // //     border: "1px solid #ffc0e0",
// // // // // // // // //   },
// // // // // // // // //   fileInput: { display: "none" },
// // // // // // // // //   button: {
// // // // // // // // //     marginTop: "10px",
// // // // // // // // //     padding: "14px",
// // // // // // // // //     borderRadius: "18px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // // // // // // // //     color: "white",
// // // // // // // // //     fontWeight: "600",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },
// // // // // // // // //   songItem: {
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "space-between",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     marginBottom: "10px",
// // // // // // // // //     padding: "8px",
// // // // // // // // //     background: "#ffe6f0",
// // // // // // // // //     borderRadius: "10px",
// // // // // // // // //   },
// // // // // // // // //   smallBtn: {
// // // // // // // // //     marginRight: "8px",
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: "8px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#ff9ecb",
// // // // // // // // //     color: "white",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },
// // // // // // // // //   smallDelete: {
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: "8px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#ff4d94",
// // // // // // // // //     color: "white",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export default AdminPanel;

// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import axios from "axios";

// // // // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // // // function AdminPanel() {
// // // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // //   // ---------------- FETCH DATA ----------------
// // // // // // // // //   const fetchData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // // // //       setSongs(res.data);

// // // // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // // //       setAlbums(uniqueAlbums);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Fetch error:", error);
// // // // // // // // //       alert("Failed to fetch songs");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchData();
// // // // // // // // //   }, []);

// // // // // // // // //   // ---------------- CREATE / UPDATE ----------------
// // // // // // // // //   // ---------------- CREATE / UPDATE ----------------
// // // // // // // // // const uploadOrUpdateSong = async () => {
// // // // // // // // //   const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // // //   // ✅ Proper validation
// // // // // // // // //   if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // // // //     alert("Title, Artist and Album are required");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   // ✅ For create → audio & image must exist
// // // // // // // // //   if (!editingId && (!audio || !image)) {
// // // // // // // // //     alert("Audio and Image are required for new song");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   const formData = new FormData();

// // // // // // // // //   formData.append("title", title.trim());
// // // // // // // // //   formData.append("artist", artist.trim());
// // // // // // // // //   formData.append("album", finalAlbum.trim());

// // // // // // // // //   // ✅ Only append if present (important for update)
// // // // // // // // //   if (audio) formData.append("audio", audio);
// // // // // // // // //   if (image) formData.append("image", image);

// // // // // // // // //   try {
// // // // // // // // //     setLoading(true);

// // // // // // // // //     if (editingId) {
// // // // // // // // //       // UPDATE
// // // // // // // // //       await axios.put(`${API}/${editingId}`, formData);
// // // // // // // // //       alert("Song updated successfully");
// // // // // // // // //     } else {
// // // // // // // // //       // CREATE
// // // // // // // // //       await axios.post(`${API}/create`, formData, {
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //       alert("Song uploaded successfully");
// // // // // // // // //     }

// // // // // // // // //     resetForm();
// // // // // // // // //     fetchData();
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Upload error:", error.response?.data || error);
// // // // // // // // //     alert(error.response?.data?.message || "Upload failed");
// // // // // // // // //   } finally {
// // // // // // // // //     setLoading(false);
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // //   // ---------------- DELETE SONG ----------------
// // // // // // // // //   const deleteSong = async (id) => {
// // // // // // // // //     if (!window.confirm("Delete this song?")) return;

// // // // // // // // //     try {
// // // // // // // // //       await axios.delete(`${API}/${id}`);
// // // // // // // // //       alert("Song deleted");
// // // // // // // // //       fetchData();
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Delete song error:", error.response?.data || error);
// // // // // // // // //       alert(error.response?.data?.message || "Delete failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- DELETE ALBUM ----------------
// // // // // // // // //   const deleteAlbum = async () => {
// // // // // // // // //     if (!album || album === "new") {
// // // // // // // // //       alert("Select valid album");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // // // // // // // //     try {
// // // // // // // // //       await axios.delete(
// // // // // // // // //         `${API}/albums/${encodeURIComponent(album)}`
// // // // // // // // //       );
// // // // // // // // //       alert("Album deleted");
// // // // // // // // //       fetchData();
// // // // // // // // //       setAlbum("");
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Delete album error:", error.response?.data || error);
// // // // // // // // //       alert(error.response?.data?.message || "Album delete failed");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ---------------- EDIT MODE ----------------
// // // // // // // // //   const editSong = (song) => {
// // // // // // // // //     setEditingId(song._id);
// // // // // // // // //     setTitle(song.title);
// // // // // // // // //     setArtist(song.artist);
// // // // // // // // //     setAlbum(song.album);
// // // // // // // // //   };

// // // // // // // // //   const resetForm = () => {
// // // // // // // // //     setTitle("");
// // // // // // // // //     setArtist("");
// // // // // // // // //     setAlbum("");
// // // // // // // // //     setNewAlbum("");
// // // // // // // // //     setAudio(null);
// // // // // // // // //     setImage(null);
// // // // // // // // //     setEditingId(null);
// // // // // // // // //   };

// // // // // // // // //   // ---------------- UI ----------------
// // // // // // // // //   return (
// // // // // // // // //     <div style={styles.wrapper}>
// // // // // // // // //       <div style={styles.card}>
// // // // // // // // //         <h1 style={styles.heading}>
// // // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // // //         </h1>

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Song Title"
// // // // // // // // //           value={title}
// // // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Artist Name"
// // // // // // // // //           value={artist}
// // // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <select
// // // // // // // // //           style={styles.input}
// // // // // // // // //           value={album}
// // // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // // //         >
// // // // // // // // //           <option value="">Select Album</option>
// // // // // // // // //           {albums.map((alb, index) => (
// // // // // // // // //             <option key={index} value={alb}>
// // // // // // // // //               {alb}
// // // // // // // // //             </option>
// // // // // // // // //           ))}
// // // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // // //         </select>

// // // // // // // // //         {album === "new" && (
// // // // // // // // //           <input
// // // // // // // // //             style={styles.input}
// // // // // // // // //             placeholder="New Album Name"
// // // // // // // // //             value={newAlbum}
// // // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // // //           />
// // // // // // // // //         )}

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="audio/*"
// // // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="image/*"
// // // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <button
// // // // // // // // //           style={styles.button}
// // // // // // // // //           onClick={uploadOrUpdateSong}
// // // // // // // // //           disabled={loading}
// // // // // // // // //         >
// // // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // // //         </button>

// // // // // // // // //         <button
// // // // // // // // //           style={{ ...styles.button, background: "#ff4d94" }}
// // // // // // // // //           onClick={deleteAlbum}
// // // // // // // // //         >
// // // // // // // // //           Delete Selected Album
// // // // // // // // //         </button>

// // // // // // // // //         <div style={{ marginTop: "20px" }}>
// // // // // // // // //           {songs.map(song => (
// // // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // // //               <div>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallBtn}
// // // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // // //                 >
// // // // // // // // //                   Edit
// // // // // // // // //                 </button>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallDelete}
// // // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // // //                 >
// // // // // // // // //                   Delete
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>

// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = {
// // // // // // // // //   wrapper: {
// // // // // // // // //     width: "98vw",
// // // // // // // // //     minHeight: "100vh",
// // // // // // // // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "center",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     padding: "20px",
// // // // // // // // //     boxSizing: "border-box",
// // // // // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // // // // //   },
// // // // // // // // //   card: {
// // // // // // // // //     width: "100%",
// // // // // // // // //     maxWidth: "500px",
// // // // // // // // //     background: "rgba(255,255,255,0.75)",
// // // // // // // // //     backdropFilter: "blur(12px)",
// // // // // // // // //     padding: "30px",
// // // // // // // // //     borderRadius: "25px",
// // // // // // // // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // // // // // // // //     display: "flex",
// // // // // // // // //     flexDirection: "column",
// // // // // // // // //     gap: "15px",
// // // // // // // // //   },
// // // // // // // // //   heading: { textAlign: "center", color: "#b03060" },
// // // // // // // // //   input: {
// // // // // // // // //     padding: "12px",
// // // // // // // // //     borderRadius: "12px",
// // // // // // // // //     border: "1px solid #ffb6d9",
// // // // // // // // //     fontSize: "14px",
// // // // // // // // //   },
// // // // // // // // //   fileLabel: {
// // // // // // // // //     background: "#ffe6f0",
// // // // // // // // //     padding: "12px",
// // // // // // // // //     borderRadius: "12px",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //     textAlign: "center",
// // // // // // // // //     color: "#b03060",
// // // // // // // // //     border: "1px solid #ffc0e0",
// // // // // // // // //   },
// // // // // // // // //   fileInput: { display: "none" },
// // // // // // // // //   button: {
// // // // // // // // //     marginTop: "10px",
// // // // // // // // //     padding: "14px",
// // // // // // // // //     borderRadius: "18px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // // // // // // // //     color: "white",
// // // // // // // // //     fontWeight: "600",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },
// // // // // // // // //   songItem: {
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "space-between",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     marginBottom: "10px",
// // // // // // // // //     padding: "8px",
// // // // // // // // //     background: "#ffe6f0",
// // // // // // // // //     borderRadius: "10px",
// // // // // // // // //   },
// // // // // // // // //   smallBtn: {
// // // // // // // // //     marginRight: "8px",
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: "8px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#ff9ecb",
// // // // // // // // //     color: "white",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },
// // // // // // // // //   smallDelete: {
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: "8px",
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#ff4d94",
// // // // // // // // //     color: "white",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export default AdminPanel;

// // // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // // import axios from "axios";

// // // // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // // // function AdminPanel() {
// // // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // //   const fetchData = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // // // //       setSongs(res.data);
// // // // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // // //       setAlbums(uniqueAlbums);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       alert("Failed to fetch songs");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchData();
// // // // // // // // //   }, []);

// // // // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // // // //       alert("Title, Artist and Album are required");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     if (!editingId && (!audio || !image)) {
// // // // // // // // //       alert("Audio and Image required");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append("title", title.trim());
// // // // // // // // //     formData.append("artist", artist.trim());
// // // // // // // // //     formData.append("album", finalAlbum.trim());

// // // // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // // // //     if (image) formData.append("image", image);

// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);

// // // // // // // // //       if (editingId) {
// // // // // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // // // // //         alert("Song updated");
// // // // // // // // //       } else {
// // // // // // // // //         await axios.post(`${API}/create`, formData, {
// // // // // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // // // // //         });
// // // // // // // // //         alert("Song uploaded");
// // // // // // // // //       }

// // // // // // // // //       resetForm();
// // // // // // // // //       fetchData();
// // // // // // // // //     } catch {
// // // // // // // // //       alert("Upload failed");
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const deleteSong = async (id) => {
// // // // // // // // //     if (!window.confirm("Delete song?")) return;
// // // // // // // // //     await axios.delete(`${API}/${id}`);
// // // // // // // // //     fetchData();
// // // // // // // // //   };

// // // // // // // // //   const deleteAlbum = async () => {
// // // // // // // // //     if (!album || album === "new") return;
// // // // // // // // //     if (!window.confirm("Delete album?")) return;
// // // // // // // // //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// // // // // // // // //     fetchData();
// // // // // // // // //     setAlbum("");
// // // // // // // // //   };

// // // // // // // // //   const editSong = (song) => {
// // // // // // // // //     setEditingId(song._id);
// // // // // // // // //     setTitle(song.title);
// // // // // // // // //     setArtist(song.artist);
// // // // // // // // //     setAlbum(song.album);
// // // // // // // // //   };

// // // // // // // // //   const resetForm = () => {
// // // // // // // // //     setTitle("");
// // // // // // // // //     setArtist("");
// // // // // // // // //     setAlbum("");
// // // // // // // // //     setNewAlbum("");
// // // // // // // // //     setAudio(null);
// // // // // // // // //     setImage(null);
// // // // // // // // //     setEditingId(null);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={styles.wrapper}>
// // // // // // // // //       <div style={styles.card}>
// // // // // // // // //         <h1 style={styles.heading}>
// // // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // // //         </h1>

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Song Title"
// // // // // // // // //           value={title}
// // // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <input
// // // // // // // // //           style={styles.input}
// // // // // // // // //           placeholder="Artist Name"
// // // // // // // // //           value={artist}
// // // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <select
// // // // // // // // //           style={styles.input}
// // // // // // // // //           value={album}
// // // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // // //         >
// // // // // // // // //           <option value="">Select Album</option>
// // // // // // // // //           {albums.map((alb, i) => (
// // // // // // // // //             <option key={i} value={alb}>{alb}</option>
// // // // // // // // //           ))}
// // // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // // //         </select>

// // // // // // // // //         {album === "new" && (
// // // // // // // // //           <input
// // // // // // // // //             style={styles.input}
// // // // // // // // //             placeholder="New Album"
// // // // // // // // //             value={newAlbum}
// // // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // // //           />
// // // // // // // // //         )}

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {audio ? audio.name : "Upload Audio"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="audio/*"
// // // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // // //           {image ? image.name : "Upload Image"}
// // // // // // // // //           <input
// // // // // // // // //             type="file"
// // // // // // // // //             accept="image/*"
// // // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // // //             style={styles.fileInput}
// // // // // // // // //           />
// // // // // // // // //         </label>

// // // // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // // //         </button>

// // // // // // // // //         <button
// // // // // // // // //           style={{ ...styles.button, background: "#9ddcff" }}
// // // // // // // // //           onClick={deleteAlbum}
// // // // // // // // //         >
// // // // // // // // //           Delete Album
// // // // // // // // //         </button>

// // // // // // // // //         <div style={{ marginTop: 20 }}>
// // // // // // // // //           {songs.map(song => (
// // // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // // //               <div>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallBtn}
// // // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // // //                 >
// // // // // // // // //                   Edit
// // // // // // // // //                 </button>
// // // // // // // // //                 <button
// // // // // // // // //                   style={styles.smallDelete}
// // // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // // //                 >
// // // // // // // // //                   Delete
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>

// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const styles = {
// // // // // // // // //   wrapper: {
// // // // // // // // //     width: "98vw",
// // // // // // // // //     minHeight: "100vh",
   
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "center",
// // // // // // // // //     alignItems: "center",
// // // // // // // // //     fontFamily: "Segoe UI",
// // // // // // // // //     color: "black",
// // // // // // // // //   },

// // // // // // // // //   card: {
// // // // // // // // //     width: "100%",
// // // // // // // // //     maxWidth: "500px",
// // // // // // // // //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// // // // // // // // //     padding: 30,
// // // // // // // // //     borderRadius: 25,
// // // // // // // // //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// // // // // // // // //     display: "flex",
// // // // // // // // //     flexDirection: "column",
// // // // // // // // //     gap: 15,
// // // // // // // // //   },

// // // // // // // // //   heading: { textAlign: "center", color: "black" },

// // // // // // // // //   input: {
// // // // // // // // //     padding: 12,
// // // // // // // // //     borderRadius: 12,
// // // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // // //     fontSize: 14,
    
// // // // // // // // //   },

// // // // // // // // //   fileLabel: {
// // // // // // // // //     background: "#e6f6ff",
// // // // // // // // //     padding: 12,
// // // // // // // // //     borderRadius: 12,
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //     textAlign: "center",
// // // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // // //     color: "black",
// // // // // // // // //   },

// // // // // // // // //   fileInput: { display: "none" },

// // // // // // // // //   button: {
// // // // // // // // //     marginTop: 10,
// // // // // // // // //     padding: 14,
// // // // // // // // //     borderRadius: 18,
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// // // // // // // // //     color: "black",
// // // // // // // // //     fontWeight: 600,
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },

// // // // // // // // //   songItem: {
// // // // // // // // //     display: "flex",
// // // // // // // // //     justifyContent: "space-between",
// // // // // // // // //     padding: 10,
// // // // // // // // //     background: "#eaf7ff",
// // // // // // // // //     borderRadius: 10,
// // // // // // // // //     marginBottom: 10,
// // // // // // // // //     color: "black",
// // // // // // // // //   },

// // // // // // // // //   smallBtn: {
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: 8,
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#7ccfff",
// // // // // // // // //     color: "black",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //     marginRight: 8,
// // // // // // // // //   },

// // // // // // // // //   smallDelete: {
// // // // // // // // //     padding: "5px 10px",
// // // // // // // // //     borderRadius: 8,
// // // // // // // // //     border: "none",
// // // // // // // // //     background: "#ff9ad1",
// // // // // // // // //     color: "black",
// // // // // // // // //     cursor: "pointer",
// // // // // // // // //   },
// // // // // // // // // };

// // // // // // // // // export default AdminPanel;
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";

// // // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // // function AdminPanel() {
// // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   // NEW STATE (only for toggling songs visibility)
// // // // // // // //   const [showSongs, setShowSongs] = useState(false);

// // // // // // // //   const fetchData = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // // //       setSongs(res.data);
// // // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // //       setAlbums(uniqueAlbums);
// // // // // // // //     } catch (error) {
// // // // // // // //       alert("Failed to fetch songs");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // // //       alert("Title, Artist and Album are required");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (!editingId && (!audio || !image)) {
// // // // // // // //       alert("Audio and Image required");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append("title", title.trim());
// // // // // // // //     formData.append("artist", artist.trim());
// // // // // // // //     formData.append("album", finalAlbum.trim());

// // // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // // //     if (image) formData.append("image", image);

// // // // // // // //     try {
// // // // // // // //       setLoading(true);

// // // // // // // //       if (editingId) {
// // // // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // // // //         alert("Song updated");
// // // // // // // //       } else {
// // // // // // // //         await axios.post(`${API}/create`, formData, {
// // // // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // // // //         });
// // // // // // // //         alert("Song uploaded");
// // // // // // // //       }

// // // // // // // //       resetForm();
// // // // // // // //       fetchData();
// // // // // // // //     } catch {
// // // // // // // //       alert("Upload failed");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const deleteSong = async (id) => {
// // // // // // // //     if (!window.confirm("Delete song?")) return;
// // // // // // // //     await axios.delete(`${API}/${id}`);
// // // // // // // //     fetchData();
// // // // // // // //   };

// // // // // // // //   const deleteAlbum = async () => {
// // // // // // // //     if (!album || album === "new") return;
// // // // // // // //     if (!window.confirm("Delete album?")) return;
// // // // // // // //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// // // // // // // //     fetchData();
// // // // // // // //     setAlbum("");
// // // // // // // //   };

// // // // // // // //   const editSong = (song) => {
// // // // // // // //     setEditingId(song._id);
// // // // // // // //     setTitle(song.title);
// // // // // // // //     setArtist(song.artist);
// // // // // // // //     setAlbum(song.album);
// // // // // // // //   };

// // // // // // // //   const resetForm = () => {
// // // // // // // //     setTitle("");
// // // // // // // //     setArtist("");
// // // // // // // //     setAlbum("");
// // // // // // // //     setNewAlbum("");
// // // // // // // //     setAudio(null);
// // // // // // // //     setImage(null);
// // // // // // // //     setEditingId(null);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={styles.wrapper}>
// // // // // // // //       <div style={styles.card}>
// // // // // // // //         <h1 style={styles.heading}>
// // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // //         </h1>

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Song Title"
// // // // // // // //           value={title}
// // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Artist Name"
// // // // // // // //           value={artist}
// // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <select
// // // // // // // //           style={styles.input}
// // // // // // // //           value={album}
// // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // //         >
// // // // // // // //           <option value="">Select Album</option>
// // // // // // // //           {albums.map((alb, i) => (
// // // // // // // //             <option key={i} value={alb}>{alb}</option>
// // // // // // // //           ))}
// // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // //         </select>

// // // // // // // //         {album === "new" && (
// // // // // // // //           <input
// // // // // // // //             style={styles.input}
// // // // // // // //             placeholder="New Album"
// // // // // // // //             value={newAlbum}
// // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // //           />
// // // // // // // //         )}

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {audio ? audio.name : "Upload Audio"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="audio/*"
// // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {image ? image.name : "Upload Image"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="image/*"
// // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // //         </button>

// // // // // // // //         <button
// // // // // // // //           style={{ ...styles.button, background: "#9ddcff" }}
// // // // // // // //           onClick={deleteAlbum}
// // // // // // // //         >
// // // // // // // //           Delete Album
// // // // // // // //         </button>

// // // // // // // //         {/* NEW BUTTON */}
// // // // // // // //         <button
// // // // // // // //           style={{ ...styles.button, background: "#eaf7ff" }}
// // // // // // // //           onClick={() => setShowSongs(!showSongs)}
// // // // // // // //         >
// // // // // // // //           Your Songs
// // // // // // // //         </button>

// // // // // // // //         {/* SONG LIST (Hidden initially) */}
// // // // // // // //         {showSongs && (
// // // // // // // //           <div style={styles.songListWrapper}>
// // // // // // // //             {songs.map(song => (
// // // // // // // //               <div key={song._id} style={styles.songItem}>
// // // // // // // //                 <span>{song.title} - {song.album}</span>
// // // // // // // //                 <div>
// // // // // // // //                   <button
// // // // // // // //                     style={styles.smallBtn}
// // // // // // // //                     onClick={() => editSong(song)}
// // // // // // // //                   >
// // // // // // // //                     Edit
// // // // // // // //                   </button>
// // // // // // // //                   <button
// // // // // // // //                     style={styles.smallDelete}
// // // // // // // //                     onClick={() => deleteSong(song._id)}
// // // // // // // //                   >
// // // // // // // //                     Delete
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = {
// // // // // // // //   wrapper: {
// // // // // // // //     width: "100%",
// // // // // // // //     minHeight: "100vh",
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     fontFamily: "Segoe UI",
// // // // // // // //     color: "black",
// // // // // // // //     padding: 15,
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //   },

// // // // // // // //   card: {
// // // // // // // //     width: "100%",
// // // // // // // //     maxWidth: "500px",
// // // // // // // //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// // // // // // // //     padding: 20,
// // // // // // // //     borderRadius: 25,
// // // // // // // //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// // // // // // // //     display: "flex",
// // // // // // // //     flexDirection: "column",
// // // // // // // //     gap: 15,
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //   },

// // // // // // // //   heading: { textAlign: "center", color: "black" },

// // // // // // // //   input: {
// // // // // // // //     padding: 12,
// // // // // // // //     borderRadius: 12,
// // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // //     fontSize: 14,
// // // // // // // //     width: "100%",
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //   },

// // // // // // // //   fileLabel: {
// // // // // // // //     background: "#e6f6ff",
// // // // // // // //     padding: 12,
// // // // // // // //     borderRadius: 12,
// // // // // // // //     cursor: "pointer",
// // // // // // // //     textAlign: "center",
// // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // //     color: "black",
// // // // // // // //     width: "100%",
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //   },

// // // // // // // //   fileInput: { display: "none" },

// // // // // // // //   // ALL BUTTONS borderRadius 2px
// // // // // // // //   button: {
// // // // // // // //     marginTop: 10,
// // // // // // // //     padding: 14,
// // // // // // // //     borderRadius: 2,
// // // // // // // //     border: "none",
// // // // // // // //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// // // // // // // //     color: "black",
// // // // // // // //     fontWeight: 600,
// // // // // // // //     cursor: "pointer",
// // // // // // // //     width: "100%",
// // // // // // // //   },

// // // // // // // //   songListWrapper: {
// // // // // // // //     marginTop: 20,
// // // // // // // //     width: "100%",
// // // // // // // //   },

// // // // // // // //   songItem: {
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     alignItems: "center",
// // // // // // // //     padding: 10,
// // // // // // // //     background: "#eaf7ff",
// // // // // // // //     borderRadius: 10,
// // // // // // // //     marginBottom: 10,
// // // // // // // //     color: "black",
// // // // // // // //     flexWrap: "wrap",
// // // // // // // //     gap: 10,
// // // // // // // //   },

// // // // // // // //   smallBtn: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: 2,
// // // // // // // //     border: "none",
// // // // // // // //     background: "#7ccfff",
// // // // // // // //     color: "black",
// // // // // // // //     cursor: "pointer",
// // // // // // // //     marginRight: 8,
// // // // // // // //   },

// // // // // // // //   smallDelete: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: 2,
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff9ad1",
// // // // // // // //     color: "black",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // // };

// // // // // // // // export default AdminPanel;

// // // // // // // import axios from "axios";
// // // // // // // import { FaPlus, FaTrash, FaEdit, FaUpload, FaMusic, FaSearch, FaTimes, FaCheck, FaChevronDown, FaList, FaCloudUploadAlt } from "react-icons/fa";
// // // // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // export default function AdminPanel() {
// // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // // // // //   const [activeView, setActiveView] = useState("upload"); // upload | songs | batch
// // // // // // //   const [showSongs, setShowSongs] = useState(false);
// // // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // //   const [toast, setToast] = useState(null);
// // // // // // //   const [deleteConfirm, setDeleteConfirm] = useState(null);

// // // // // // //   // Form
// // // // // // //   const [title, setTitle] = useState("");
// // // // // // //   const [artist, setArtist] = useState("");
// // // // // // //   const [album, setAlbum] = useState("");
// // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // //   const [image, setImage] = useState(null);

// // // // // // //   // Batch JSON upload
// // // // // // //   const [batchJson, setBatchJson] = useState("");
// // // // // // //   const [batchFile, setBatchFile] = useState(null);
// // // // // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // // // // //   const [batchResults, setBatchResults] = useState([]);

// // // // // // //   const audioInputRef = useRef(null);
// // // // // // //   const imageInputRef = useRef(null);

// // // // // // //   const showToast = (msg, type = "success") => {
// // // // // // //     setToast({ msg, type });
// // // // // // //     setTimeout(() => setToast(null), 3000);
// // // // // // //   };

// // // // // // //   const fetchData = async () => {
// // // // // // //     setFetchLoading(true);
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // //       setSongs(res.data);
// // // // // // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // // // // // //     } catch {
// // // // // // //       showToast("Failed to fetch songs", "error");
// // // // // // //     } finally {
// // // // // // //       setFetchLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => { fetchData(); }, []);

// // // // // // //   const resetForm = () => {
// // // // // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // // // // // //     setAudio(null); setImage(null); setEditingId(null);
// // // // // // //     if (audioInputRef.current) audioInputRef.current.value = "";
// // // // // // //     if (imageInputRef.current) imageInputRef.current.value = "";
// // // // // // //   };

// // // // // // //   const uploadOrUpdate = async () => {
// // // // // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum) {
// // // // // // //       showToast("Title, Artist and Album required", "error"); return;
// // // // // // //     }
// // // // // // //     if (!editingId && (!audio || !image)) {
// // // // // // //       showToast("Audio and Image required for new song", "error"); return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append("title", title.trim());
// // // // // // //     formData.append("artist", artist.trim());
// // // // // // //     formData.append("album", finalAlbum);
// // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // //     if (image) formData.append("image", image);

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       if (editingId) {
// // // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // // //         showToast("Song updated successfully!");
// // // // // // //       } else {
// // // // // // //         await axios.post(`${API}/create`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// // // // // // //         showToast("Song uploaded successfully!");
// // // // // // //       }
// // // // // // //       resetForm();
// // // // // // //       fetchData();
// // // // // // //     } catch (err) {
// // // // // // //       showToast(err.response?.data?.message || "Operation failed", "error");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteSong = async (id) => {
// // // // // // //     try {
// // // // // // //       await axios.delete(`${API}/${id}`);
// // // // // // //       showToast("Song deleted");
// // // // // // //       setDeleteConfirm(null);
// // // // // // //       fetchData();
// // // // // // //     } catch {
// // // // // // //       showToast("Delete failed", "error");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteAlbum = async (albumName) => {
// // // // // // //     try {
// // // // // // //       await axios.delete(`${API}/albums/${encodeURIComponent(albumName)}`);
// // // // // // //       showToast(`Album "${albumName}" deleted`);
// // // // // // //       setDeleteConfirm(null);
// // // // // // //       fetchData();
// // // // // // //     } catch {
// // // // // // //       showToast("Album delete failed", "error");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const editSong = (song) => {
// // // // // // //     setEditingId(song._id);
// // // // // // //     setTitle(song.title);
// // // // // // //     setArtist(song.artist);
// // // // // // //     setAlbum(song.album);
// // // // // // //     setActiveView("upload");
// // // // // // //     window.scrollTo(0, 0);
// // // // // // //   };

// // // // // // //   // Batch upload via JSON
// // // // // // //   const handleBatchJsonUpload = async () => {
// // // // // // //     let parsed;
// // // // // // //     try { parsed = JSON.parse(batchJson); }
// // // // // // //     catch { showToast("Invalid JSON format", "error"); return; }
// // // // // // //     if (!Array.isArray(parsed)) { showToast("JSON must be an array of songs", "error"); return; }

// // // // // // //     setBatchLoading(true);
// // // // // // //     setBatchResults([]);
// // // // // // //     const results = [];

// // // // // // //     for (const item of parsed) {
// // // // // // //       try {
// // // // // // //         if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // // // // // //           results.push({ title: item.title || "?", status: "failed", error: "Missing fields" });
// // // // // // //           continue;
// // // // // // //         }
// // // // // // //         await axios.post(`${API}/create-from-url`, item);
// // // // // // //         results.push({ title: item.title, status: "success" });
// // // // // // //       } catch (err) {
// // // // // // //         results.push({ title: item.title || "?", status: "failed", error: err.response?.data?.message || "Failed" });
// // // // // // //       }
// // // // // // //     }

// // // // // // //     setBatchResults(results);
// // // // // // //     setBatchLoading(false);
// // // // // // //     const success = results.filter(r => r.status === "success").length;
// // // // // // //     showToast(`Batch done: ${success}/${parsed.length} uploaded`);
// // // // // // //     if (success > 0) fetchData();
// // // // // // //   };

// // // // // // //   const handleBatchFileRead = (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     if (!file) return;
// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = (ev) => setBatchJson(ev.target.result);
// // // // // // //     reader.readAsText(file);
// // // // // // //   };

// // // // // // //   const filteredSongs = songs.filter(s =>
// // // // // // //     s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // // //     s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // // //     s.album.toLowerCase().includes(searchQuery.toLowerCase())
// // // // // // //   );

// // // // // // //   const albumGroups = songs.reduce((acc, s) => {
// // // // // // //     if (!acc[s.album]) acc[s.album] = [];
// // // // // // //     acc[s.album].push(s);
// // // // // // //     return acc;
// // // // // // //   }, {});

// // // // // // //   return (
// // // // // // //     <div style={a.root}>
// // // // // // //       <style>{`
// // // // // // //         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');
// // // // // // //         * { box-sizing: border-box; margin: 0; padding: 0; }
// // // // // // //         ::-webkit-scrollbar { width: 4px; }
// // // // // // //         ::-webkit-scrollbar-thumb { background: #e0c8f0; border-radius: 10px; }
// // // // // // //         @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
// // // // // // //         @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
// // // // // // //         @keyframes spin2 { to { transform: rotate(360deg); } }
// // // // // // //         .fade-up { animation: fadeUp 0.3s ease; }
// // // // // // //         input:focus, select:focus, textarea:focus { outline: 2px solid #ff6db0 !important; outline-offset: 0; }
// // // // // // //         input::placeholder, textarea::placeholder { color: #b0a8c0; }
// // // // // // //         button:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.15s; }
// // // // // // //       `}</style>

// // // // // // //       {/* Toast */}
// // // // // // //       {toast && (
// // // // // // //         <div style={{...a.toast, background: toast.type === "error" ? "#ff4d7e" : "#22c55e"}} className="slide-in">
// // // // // // //           {toast.type === "success" ? <FaCheck size={12} /> : <FaTimes size={12} />}
// // // // // // //           {toast.msg}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Delete Confirm Modal */}
// // // // // // //       {deleteConfirm && (
// // // // // // //         <div style={a.modalOverlay} onClick={() => setDeleteConfirm(null)}>
// // // // // // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // // // // // //             <h3 style={a.modalTitle}>Confirm Delete</h3>
// // // // // // //             <p style={a.modalText}>{deleteConfirm.message}</p>
// // // // // // //             <div style={a.modalActions}>
// // // // // // //               <button style={a.modalCancel} onClick={() => setDeleteConfirm(null)}>Cancel</button>
// // // // // // //               <button style={a.modalDelete} onClick={deleteConfirm.action}>Delete</button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <div style={a.layout}>
// // // // // // //         {/* Sidebar */}
// // // // // // //         <div style={a.sidebar}>
// // // // // // //           <div style={a.logo}>⚡ Admin</div>
// // // // // // //           <div style={a.stats}>
// // // // // // //             <div style={a.statItem}><span style={a.statNum}>{songs.length}</span><span style={a.statLabel}>Songs</span></div>
// // // // // // //             <div style={a.statItem}><span style={a.statNum}>{albums.length}</span><span style={a.statLabel}>Albums</span></div>
// // // // // // //           </div>
// // // // // // //           {[
// // // // // // //             {id:"upload", icon:<FaUpload size={14}/>, label: editingId ? "Edit Song" : "Upload"},
// // // // // // //             {id:"songs", icon:<FaList size={14}/>, label:"Library"},
// // // // // // //             {id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Batch Upload"},
// // // // // // //           ].map(tab => (
// // // // // // //             <div key={tab.id} style={{...a.navItem, ...(activeView === tab.id ? a.navItemActive : {})}}
// // // // // // //               onClick={() => setActiveView(tab.id)}>
// // // // // // //               {tab.icon} {tab.label}
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //         <div style={a.content}>
// // // // // // //           {/* Upload Form */}
// // // // // // //           {activeView === "upload" && (
// // // // // // //             <div style={a.card} className="fade-up">
// // // // // // //               <div style={a.cardHeader}>
// // // // // // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // // // // // //                 {editingId && <button style={a.cancelEditBtn} onClick={resetForm}>Cancel Edit</button>}
// // // // // // //               </div>

// // // // // // //               <div style={a.formGrid}>
// // // // // // //                 <div style={a.formGroup}>
// // // // // // //                   <label style={a.label}>Song Title *</label>
// // // // // // //                   <input style={a.input} placeholder="Enter song title" value={title} onChange={e => setTitle(e.target.value)} />
// // // // // // //                 </div>
// // // // // // //                 <div style={a.formGroup}>
// // // // // // //                   <label style={a.label}>Artist Name *</label>
// // // // // // //                   <input style={a.input} placeholder="Enter artist name" value={artist} onChange={e => setArtist(e.target.value)} />
// // // // // // //                 </div>
// // // // // // //                 <div style={a.formGroup}>
// // // // // // //                   <label style={a.label}>Album *</label>
// // // // // // //                   <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
// // // // // // //                     <option value="">Select Album</option>
// // // // // // //                     {albums.map((alb, i) => <option key={i} value={alb}>{alb}</option>)}
// // // // // // //                     <option value="__new__">+ Create New Album</option>
// // // // // // //                   </select>
// // // // // // //                 </div>
// // // // // // //                 {album === "__new__" && (
// // // // // // //                   <div style={a.formGroup}>
// // // // // // //                     <label style={a.label}>New Album Name *</label>
// // // // // // //                     <input style={a.input} placeholder="New album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
// // // // // // //                   </div>
// // // // // // //                 )}
// // // // // // //               </div>

// // // // // // //               <div style={a.uploadRow}>
// // // // // // //                 <label style={{...a.uploadBox, ...(audio ? a.uploadBoxFilled : {})}}>
// // // // // // //                   <FaMusic size={20} color={audio ? "#ff6db0" : "#b0a8c0"} />
// // // // // // //                   <span style={a.uploadBoxLabel}>{audio ? audio.name : "Upload Audio File"}</span>
// // // // // // //                   <span style={a.uploadBoxSub}>{audio ? `${(audio.size/1024/1024).toFixed(1)} MB` : "MP3, WAV, OGG"}</span>
// // // // // // //                   <input ref={audioInputRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{display:"none"}} />
// // // // // // //                 </label>

// // // // // // //                 <label style={{...a.uploadBox, ...(image ? a.uploadBoxFilled : {})}}>
// // // // // // //                   {image ? (
// // // // // // //                     <img src={URL.createObjectURL(image)} alt="" style={a.previewThumb} />
// // // // // // //                   ) : (
// // // // // // //                     <FaUpload size={20} color="#b0a8c0" />
// // // // // // //                   )}
// // // // // // //                   <span style={a.uploadBoxLabel}>{image ? image.name : "Upload Cover Image"}</span>
// // // // // // //                   <span style={a.uploadBoxSub}>{image ? `${(image.size/1024/1024).toFixed(1)} MB` : "JPG, PNG, WEBP"}</span>
// // // // // // //                   <input ref={imageInputRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{display:"none"}} />
// // // // // // //                 </label>
// // // // // // //               </div>

// // // // // // //               <button style={{...a.btn, ...(loading ? a.btnDisabled : {})}} onClick={uploadOrUpdate} disabled={loading}>
// // // // // // //                 {loading ? <span style={a.spinner} /> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {/* Library */}
// // // // // // //           {activeView === "songs" && (
// // // // // // //             <div className="fade-up">
// // // // // // //               <div style={a.libHeader}>
// // // // // // //                 <h2 style={a.cardTitle}>🎵 Library</h2>
// // // // // // //                 <div style={a.searchBar}>
// // // // // // //                   <FaSearch color="#b0a8c0" size={13} />
// // // // // // //                   <input style={a.searchInput} placeholder="Search songs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
// // // // // // //                   {searchQuery && <button style={a.clearBtn} onClick={() => setSearchQuery("")}><FaTimes size={12} /></button>}
// // // // // // //                 </div>
// // // // // // //               </div>

// // // // // // //               {fetchLoading ? (
// // // // // // //                 <div style={a.loadingMsg}>Loading library...</div>
// // // // // // //               ) : (
// // // // // // //                 <>
// // // // // // //                   {/* Albums Section */}
// // // // // // //                   {!searchQuery && (
// // // // // // //                     <div style={a.albumList}>
// // // // // // //                       {Object.entries(albumGroups).map(([albumName, albumSongs]) => (
// // // // // // //                         <div key={albumName} style={a.albumGroup}>
// // // // // // //                           <div style={a.albumGroupHeader}>
// // // // // // //                             <div style={a.albumGroupLeft}>
// // // // // // //                               <img src={albumSongs[0]?.imageUrl} alt="" style={a.albumGroupImg} />
// // // // // // //                               <div>
// // // // // // //                                 <div style={a.albumGroupName}>{albumName}</div>
// // // // // // //                                 <div style={a.albumGroupCount}>{albumSongs.length} songs</div>
// // // // // // //                               </div>
// // // // // // //                             </div>
// // // // // // //                             <button style={a.deleteAlbumBtn} onClick={() => setDeleteConfirm({
// // // // // // //                               message: `Delete entire album "${albumName}" and all ${albumSongs.length} songs?`,
// // // // // // //                               action: () => deleteAlbum(albumName)
// // // // // // //                             })}>
// // // // // // //                               <FaTrash size={12} /> Delete Album
// // // // // // //                             </button>
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                       ))}
// // // // // // //                     </div>
// // // // // // //                   )}

// // // // // // //                   {/* Songs list */}
// // // // // // //                   <div style={a.songsList}>
// // // // // // //                     {filteredSongs.map((song, i) => (
// // // // // // //                       <div key={song._id} style={a.songRow}>
// // // // // // //                         <div style={a.songLeft}>
// // // // // // //                           <span style={a.songIdx}>{i + 1}</span>
// // // // // // //                           <img src={song.imageUrl} alt="" style={a.songThumb} />
// // // // // // //                           <div style={a.songInfo}>
// // // // // // //                             <div style={a.songTitle}>{song.title}</div>
// // // // // // //                             <div style={a.songMeta}>{song.artist} · {song.album}</div>
// // // // // // //                           </div>
// // // // // // //                         </div>
// // // // // // //                         <div style={a.songActions}>
// // // // // // //                           <button style={a.editBtn} onClick={() => editSong(song)}><FaEdit size={13} /></button>
// // // // // // //                           <button style={a.deleteBtn} onClick={() => setDeleteConfirm({
// // // // // // //                             message: `Delete "${song.title}" by ${song.artist}?`,
// // // // // // //                             action: () => deleteSong(song._id)
// // // // // // //                           })}><FaTrash size={13} /></button>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     ))}
// // // // // // //                     {filteredSongs.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
// // // // // // //                   </div>
// // // // // // //                 </>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           )}

// // // // // // //           {/* Batch Upload */}
// // // // // // //           {activeView === "batch" && (
// // // // // // //             <div style={a.card} className="fade-up">
// // // // // // //               <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
// // // // // // //               <p style={a.helpText}>Upload multiple songs at once using a JSON array. Each song must have: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>
              
// // // // // // //               <div style={a.jsonExample}>
// // // // // // //                 <div style={a.jsonExampleTitle}>Example Format:</div>
// // // // // // //                 <pre style={a.jsonPre}>{`[
// // // // // // //   {
// // // // // // //     "title": "Song Name",
// // // // // // //     "artist": "Artist Name",
// // // // // // //     "album": "Album Name",
// // // // // // //     "audioUrl": "https://...",
// // // // // // //     "imageUrl": "https://..."
// // // // // // //   }
// // // // // // // ]`}</pre>
// // // // // // //               </div>

// // // // // // //               <label style={a.fileJsonLabel}>
// // // // // // //                 <FaUpload size={14} /> Upload JSON File
// // // // // // //                 <input type="file" accept=".json" onChange={handleBatchFileRead} style={{display:"none"}} />
// // // // // // //               </label>
              
// // // // // // //               <div style={a.orDivider}><span>or paste JSON below</span></div>

// // // // // // //               <textarea
// // // // // // //                 style={a.jsonTextarea}
// // // // // // //                 placeholder='[{"title": "...", "artist": "...", "album": "...", "audioUrl": "...", "imageUrl": "..."}]'
// // // // // // //                 value={batchJson}
// // // // // // //                 onChange={e => setBatchJson(e.target.value)}
// // // // // // //                 rows={10}
// // // // // // //               />

// // // // // // //               <button style={{...a.btn, ...(batchLoading ? a.btnDisabled : {})}} onClick={handleBatchJsonUpload} disabled={batchLoading}>
// // // // // // //                 {batchLoading ? <><span style={a.spinner} /> Uploading...</> : "↑ Upload All Songs"}
// // // // // // //               </button>

// // // // // // //               {batchResults.length > 0 && (
// // // // // // //                 <div style={a.batchResults}>
// // // // // // //                   <div style={a.batchResultsTitle}>Results ({batchResults.filter(r=>r.status==="success").length}/{batchResults.length} success)</div>
// // // // // // //                   {batchResults.map((r, i) => (
// // // // // // //                     <div key={i} style={{...a.batchResultItem, borderLeft:`3px solid ${r.status==="success" ? "#22c55e" : "#ff4d7e"}`}}>
// // // // // // //                       <span>{r.status === "success" ? "✓" : "✗"} {r.title}</span>
// // // // // // //                       {r.error && <span style={a.batchError}>{r.error}</span>}
// // // // // // //                     </div>
// // // // // // //                   ))}
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // const PINK = "#ff6db0";
// // // // // // // const BLUE = "#5db8ff";
// // // // // // // const TEXT = "#1a1a2e";
// // // // // // // const MUTED = "#9098b1";
// // // // // // // const BG = "#f8f5ff";
// // // // // // // const CARD_BG = "#ffffff";
// // // // // // // const BORDER = "#ede8f7";

// // // // // // // const a = {
// // // // // // //   root: { fontFamily:"'Sora', sans-serif", background:BG, minHeight:"100vh", color:TEXT, position:"relative" },

// // // // // // //   toast: { position:"fixed", top:20, right:20, padding:"12px 20px", borderRadius:12, color:"#fff", fontSize:13, fontWeight:600, zIndex:9999, display:"flex", alignItems:"center", gap:8, boxShadow:"0 8px 24px rgba(0,0,0,0.15)", animation:"slideIn 0.3s ease" },

// // // // // // //   modalOverlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
// // // // // // //   modal: { background:CARD_BG, borderRadius:20, padding:28, maxWidth:360, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" },
// // // // // // //   modalTitle: { fontSize:18, fontWeight:700, marginBottom:8 },
// // // // // // //   modalText: { fontSize:14, color:MUTED, marginBottom:20, lineHeight:1.6 },
// // // // // // //   modalActions: { display:"flex", gap:12, justifyContent:"flex-end" },
// // // // // // //   modalCancel: { padding:"10px 20px", borderRadius:10, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", fontSize:13, fontWeight:600, color:TEXT },
// // // // // // //   modalDelete: { padding:"10px 20px", borderRadius:10, border:"none", background:"#ff4d7e", color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600 },

// // // // // // //   layout: { display:"flex", minHeight:"100vh" },
// // // // // // //   sidebar: { width:200, background:CARD_BG, borderRight:`1px solid ${BORDER}`, padding:"24px 16px", display:"flex", flexDirection:"column", gap:4, position:"sticky", top:0, height:"100vh", flexShrink:0 },
// // // // // // //   logo: { fontSize:18, fontWeight:700, color:PINK, padding:"0 12px", marginBottom:20 },
// // // // // // //   stats: { display:"flex", gap:12, marginBottom:20, padding:"12px", background:BG, borderRadius:12 },
// // // // // // //   statItem: { flex:1, textAlign:"center" },
// // // // // // //   statNum: { display:"block", fontSize:20, fontWeight:700, color:PINK },
// // // // // // //   statLabel: { fontSize:10, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // // //   navItem: { display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, cursor:"pointer", color:MUTED, fontSize:13, fontWeight:500 },
// // // // // // //   navItemActive: { background:"#fff0f8", color:PINK, fontWeight:600 },

// // // // // // //   content: { flex:1, padding:24, maxWidth:900, overflowY:"auto" },

// // // // // // //   card: { background:CARD_BG, borderRadius:20, padding:28, boxShadow:"0 2px 20px rgba(0,0,0,0.05)", marginBottom:24, border:`1px solid ${BORDER}` },
// // // // // // //   cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 },
// // // // // // //   cardTitle: { fontSize:20, fontWeight:700, color:TEXT },
// // // // // // //   cancelEditBtn: { padding:"6px 14px", borderRadius:8, border:`1px solid ${PINK}`, background:"none", color:PINK, cursor:"pointer", fontSize:12, fontWeight:600 },

// // // // // // //   formGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginBottom:20 },
// // // // // // //   formGroup: { display:"flex", flexDirection:"column", gap:6 },
// // // // // // //   label: { fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // // //   input: { padding:"12px 14px", borderRadius:10, border:`1.5px solid ${BORDER}`, fontSize:14, fontFamily:"inherit", color:TEXT, background:CARD_BG, transition:"border 0.2s" },

// // // // // // //   uploadRow: { display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" },
// // // // // // //   uploadBox: { flex:1, minWidth:200, border:`2px dashed ${BORDER}`, borderRadius:14, padding:20, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:BG, transition:"border 0.2s, background 0.2s" },
// // // // // // //   uploadBoxFilled: { borderColor:PINK, background:"#fff8fd" },
// // // // // // //   uploadBoxLabel: { fontSize:13, fontWeight:600, color:TEXT, textAlign:"center" },
// // // // // // //   uploadBoxSub: { fontSize:11, color:MUTED },
// // // // // // //   previewThumb: { width:48, height:48, borderRadius:8, objectFit:"cover" },

// // // // // // //   btn: { width:"100%", padding:"14px", borderRadius:12, border:"none", background:`linear-gradient(135deg, ${PINK}, ${BLUE})`, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 },
// // // // // // //   btnDisabled: { opacity:0.6, cursor:"not-allowed" },
// // // // // // //   spinner: { width:16, height:16, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin2 0.8s linear infinite" },

// // // // // // //   libHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 },
// // // // // // //   searchBar: { display:"flex", alignItems:"center", gap:10, background:CARD_BG, borderRadius:10, padding:"10px 14px", border:`1.5px solid ${BORDER}`, minWidth:220 },
// // // // // // //   searchInput: { border:"none", outline:"none", fontSize:13, fontFamily:"inherit", color:TEXT, background:"none", width:160 },
// // // // // // //   clearBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, display:"flex" },
// // // // // // //   loadingMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:40 },

// // // // // // //   albumList: { display:"flex", flexDirection:"column", gap:8, marginBottom:24 },
// // // // // // //   albumGroup: { background:CARD_BG, borderRadius:14, overflow:"hidden", border:`1px solid ${BORDER}` },
// // // // // // //   albumGroupHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px" },
// // // // // // //   albumGroupLeft: { display:"flex", alignItems:"center", gap:12 },
// // // // // // //   albumGroupImg: { width:44, height:44, borderRadius:8, objectFit:"cover" },
// // // // // // //   albumGroupName: { fontSize:14, fontWeight:600, color:TEXT },
// // // // // // //   albumGroupCount: { fontSize:11, color:MUTED },
// // // // // // //   deleteAlbumBtn: { display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", color:"#ff4d7e", cursor:"pointer", fontSize:12, fontWeight:600 },

// // // // // // //   songsList: { display:"flex", flexDirection:"column", gap:2 },
// // // // // // //   songRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, background:CARD_BG, border:`1px solid ${BORDER}`, marginBottom:4, gap:12 },
// // // // // // //   songLeft: { display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 },
// // // // // // //   songIdx: { fontSize:12, color:MUTED, width:20, textAlign:"center", flexShrink:0 },
// // // // // // //   songThumb: { width:44, height:44, borderRadius:8, objectFit:"cover", flexShrink:0 },
// // // // // // //   songInfo: { minWidth:0 },
// // // // // // //   songTitle: { fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
// // // // // // //   songMeta: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
// // // // // // //   songActions: { display:"flex", gap:8, flexShrink:0 },
// // // // // // //   editBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", color:BLUE, display:"flex" },
// // // // // // //   deleteBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", cursor:"pointer", color:"#ff4d7e", display:"flex" },
// // // // // // //   emptyMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:32 },

// // // // // // //   helpText: { fontSize:13, color:MUTED, lineHeight:1.7, marginBottom:20 },
// // // // // // //   code: { fontFamily:"'DM Mono', monospace", background:BG, padding:"2px 6px", borderRadius:4, fontSize:12 },
// // // // // // //   jsonExample: { background:BG, borderRadius:12, padding:16, marginBottom:16 },
// // // // // // //   jsonExampleTitle: { fontSize:12, fontWeight:600, color:MUTED, marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // // //   jsonPre: { fontFamily:"'DM Mono', monospace", fontSize:12, color:TEXT, whiteSpace:"pre-wrap", lineHeight:1.6 },
// // // // // // //   fileJsonLabel: { display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:10, border:`1.5px dashed ${PINK}`, color:PINK, cursor:"pointer", fontSize:13, fontWeight:600, marginBottom:12 },
// // // // // // //   orDivider: { textAlign:"center", color:MUTED, fontSize:12, margin:"12px 0", position:"relative" },
// // // // // // //   jsonTextarea: { width:"100%", padding:"14px", borderRadius:12, border:`1.5px solid ${BORDER}`, fontSize:12, fontFamily:"'DM Mono', monospace", color:TEXT, resize:"vertical", lineHeight:1.6, background:BG, marginBottom:16 },
// // // // // // //   batchResults: { marginTop:20, border:`1px solid ${BORDER}`, borderRadius:12, overflow:"hidden" },
// // // // // // //   batchResultsTitle: { padding:"12px 16px", background:BG, fontSize:13, fontWeight:700, color:TEXT },
// // // // // // //   batchResultItem: { display:"flex", justifyContent:"space-between", padding:"10px 16px", borderBottom:`1px solid ${BORDER}`, fontSize:13 },
// // // // // // //   batchError: { color:"#ff4d7e", fontSize:11 },
// // // // // // // };
// // // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // // import axios from "axios";
// // // // // // import {
// // // // // //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// // // // // //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
// // // // // // } from "react-icons/fa";

// // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // ── Admins (username: password) ──
// // // // // // const ADMINS = {
// // // // // //   "admin": "vibe2024",
// // // // // //   "revanth": "revv@123",
// // // // // //   "superadmin": "music#999",
// // // // // // };

// // // // // // // ── Cached songs ──
// // // // // // let _cache = null;

// // // // // // const C = {
// // // // // //   bg: "#0f0f12",
// // // // // //   surface: "#18181b",
// // // // // //   card: "#1f1f23",
// // // // // //   border: "#2a2a2f",
// // // // // //   accent: "#f59e0b",
// // // // // //   accentDim: "rgba(245,158,11,0.08)",
// // // // // //   accentBorder: "rgba(245,158,11,0.25)",
// // // // // //   text: "#f4f4f5",
// // // // // //   sub: "#a1a1aa",
// // // // // //   muted: "#52525b",
// // // // // //   error: "#ef4444",
// // // // // //   success: "#22c55e",
// // // // // // };
// // // // // // export default function AdminPanel() {
// // // // // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// // // // // //   const [loginUser, setLoginUser] = useState("");
// // // // // //   const [loginPass, setLoginPass] = useState("");
// // // // // //   const [showPass, setShowPass] = useState(false);
// // // // // //   const [loginErr, setLoginErr] = useState("");

// // // // // //   const [songs, setSongs] = useState([]);
// // // // // //   const [albums, setAlbums] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // // // //   const [view, setView] = useState("upload"); // upload | library | batch
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [toast, setToast] = useState(null);
// // // // // //   const [confirm, setConfirm] = useState(null);
// // // // // //   const [editingId, setEditingId] = useState(null);

// // // // // //   // form
// // // // // //   const [title, setTitle] = useState("");
// // // // // //   const [artist, setArtist] = useState("");
// // // // // //   const [album, setAlbum] = useState("");
// // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // //   const [audio, setAudio] = useState(null);
// // // // // //   const [image, setImage] = useState(null);
// // // // // //   const audioRef = useRef(null);
// // // // // //   const imageRef = useRef(null);

// // // // // //   // batch
// // // // // //   const [batchJson, setBatchJson] = useState("");
// // // // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // // // //   const [batchResults, setBatchResults] = useState([]);

// // // // // //   // ─── AUTH ───
// // // // // //   const handleLogin = (e) => {
// // // // // //     e.preventDefault();
// // // // // //     setLoginErr("");
// // // // // //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// // // // // //     if (pass && pass === loginPass) {
// // // // // //       sessionStorage.setItem("vo_admin", loginUser);
// // // // // //       setAuthed(true);
// // // // // //     } else {
// // // // // //       setLoginErr("Invalid username or password.");
// // // // // //     }
// // // // // //   };

// // // // // //   const logout = () => {
// // // // // //     sessionStorage.removeItem("vo_admin");
// // // // // //     setAuthed(false);
// // // // // //     setLoginUser(""); setLoginPass("");
// // // // // //   };

// // // // // //   // ─── DATA ───
// // // // // //   const showToast = (msg, type = "success") => {
// // // // // //     setToast({ msg, type });
// // // // // //     setTimeout(() => setToast(null), 3000);
// // // // // //   };

// // // // // //   const fetchData = useCallback(async (force = false) => {
// // // // // //     setFetchLoading(true);
// // // // // //     try {
// // // // // //       if (_cache && !force) {
// // // // // //         setSongs(_cache);
// // // // // //         setAlbums([...new Set(_cache.map(s => s.album))]);
// // // // // //         setFetchLoading(false);
// // // // // //         return;
// // // // // //       }
// // // // // //       const res = await axios.get(`${API}/`);
// // // // // //       _cache = res.data;
// // // // // //       setSongs(res.data);
// // // // // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // // // // //     } catch {
// // // // // //       showToast("Failed to fetch songs", "error");
// // // // // //     } finally {
// // // // // //       setFetchLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // // // // //   const resetForm = () => {
// // // // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // // // // //     setAudio(null); setImage(null); setEditingId(null);
// // // // // //     if (audioRef.current) audioRef.current.value = "";
// // // // // //     if (imageRef.current) imageRef.current.value = "";
// // // // // //   };

// // // // // //   const submit = async () => {
// // // // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // // // // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }

// // // // // //     const fd = new FormData();
// // // // // //     fd.append("title", title.trim());
// // // // // //     fd.append("artist", artist.trim());
// // // // // //     fd.append("album", finalAlbum);
// // // // // //     if (audio) fd.append("audio", audio);
// // // // // //     if (image) fd.append("image", image);

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       if (editingId) {
// // // // // //         await axios.put(`${API}/${editingId}`, fd);
// // // // // //         showToast("Song updated!");
// // // // // //       } else {
// // // // // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // // // // //         showToast("Song uploaded!");
// // // // // //       }
// // // // // //       resetForm();
// // // // // //       _cache = null;
// // // // // //       fetchData(true);
// // // // // //     } catch (err) {
// // // // // //       showToast(err.response?.data?.message || "Upload failed", "error");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteSong = async (id) => {
// // // // // //     try {
// // // // // //       await axios.delete(`${API}/${id}`);
// // // // // //       showToast("Song deleted");
// // // // // //       setConfirm(null);
// // // // // //       _cache = null;
// // // // // //       fetchData(true);
// // // // // //     } catch { showToast("Delete failed", "error"); }
// // // // // //   };

// // // // // //   const deleteAlbum = async (name) => {
// // // // // //     try {
// // // // // //       await axios.delete(`${API}/albums/${encodeURIComponent(name)}`);
// // // // // //       showToast(`Album "${name}" deleted`);
// // // // // //       setConfirm(null);
// // // // // //       _cache = null;
// // // // // //       fetchData(true);
// // // // // //     } catch { showToast("Album delete failed", "error"); }
// // // // // //   };

// // // // // //   const editSong = (song) => {
// // // // // //     setEditingId(song._id);
// // // // // //     setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
// // // // // //     setView("upload");
// // // // // //     window.scrollTo(0, 0);
// // // // // //   };

// // // // // //   // ─── BATCH ───
// // // // // //   const runBatch = async () => {
// // // // // //     let parsed;
// // // // // //     try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
// // // // // //     if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }

// // // // // //     setBatchLoading(true);
// // // // // //     setBatchResults([]);
// // // // // //     const results = [];

// // // // // //     for (const item of parsed) {
// // // // // //       if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // // // // //         results.push({ title: item.title || "?", status: "fail", error: "Missing fields" });
// // // // // //         continue;
// // // // // //       }
// // // // // //       try {
// // // // // //         await axios.post(`${API}/create-from-url`, { title: item.title, artist: item.artist, album: item.album, audioUrl: item.audioUrl, imageUrl: item.imageUrl });
// // // // // //         results.push({ title: item.title, status: "ok" });
// // // // // //       } catch (err) {
// // // // // //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// // // // // //       }
// // // // // //     }

// // // // // //     setBatchResults(results);
// // // // // //     setBatchLoading(false);
// // // // // //     const ok = results.filter(r => r.status === "ok").length;
// // // // // //     showToast(`Batch: ${ok}/${parsed.length} uploaded`);
// // // // // //     if (ok > 0) { _cache = null; fetchData(true); }
// // // // // //   };

// // // // // //   const filtered = songs.filter(s =>
// // // // // //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// // // // // //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// // // // // //     s.album.toLowerCase().includes(search.toLowerCase())
// // // // // //   );

// // // // // //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

// // // // // //   // ─── LOGIN SCREEN ───
// // // // // //   if (!authed) {
// // // // // //     return (
// // // // // //       <div style={l.root}>
// // // // // //         <style>{`
// // // // // //           @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
// // // // // //           *{box-sizing:border-box;margin:0;padding:0;}
// // // // // //           input:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
// // // // // //           @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// // // // // //         `}</style>
// // // // // //         <div style={l.card}>
// // // // // //           <div style={l.icon}><FaLock size={22} color={C.accent} /></div>
// // // // // //           <h1 style={l.title}>Admin Access</h1>
// // // // // //           <p style={l.sub}>Enter your credentials to continue</p>
// // // // // //           {loginErr && <div style={l.err}>{loginErr}</div>}
// // // // // //           <form onSubmit={handleLogin} style={l.form}>
// // // // // //             <div style={l.field}>
// // // // // //               <label style={l.label}>Username</label>
// // // // // //               <div style={l.inputWrap}>
// // // // // //                 <FaUser size={13} color={C.muted} />
// // // // // //                 <input style={l.input} type="text" placeholder="admin" value={loginUser}
// // // // // //                   onChange={e => setLoginUser(e.target.value)} autoFocus />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <div style={l.field}>
// // // // // //               <label style={l.label}>Password</label>
// // // // // //               <div style={l.inputWrap}>
// // // // // //                 <FaLock size={13} color={C.muted} />
// // // // // //                 <input style={l.input} type={showPass ? "text" : "password"} placeholder="••••••••" value={loginPass}
// // // // // //                   onChange={e => setLoginPass(e.target.value)} />
// // // // // //                 <button type="button" style={l.eyeBtn} onClick={() => setShowPass(!showPass)}>
// // // // // //                   {showPass ? <FaEyeSlash size={13} color={C.muted} /> : <FaEye size={13} color={C.muted} />}
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <button type="submit" style={l.btn}>Sign In →</button>
// // // // // //           </form>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   // ─── ADMIN PANEL ───
// // // // // //   return (
// // // // // //     <div style={a.root}>
// // // // // //       <style>{`
// // // // // //         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
// // // // // //         *{box-sizing:border-box;margin:0;padding:0;}
// // // // // //         input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
// // // // // //         input::placeholder,textarea::placeholder{color:${C.muted};}
// // // // // //         @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// // // // // //         @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
// // // // // //         @keyframes spin2{to{transform:rotate(360deg)}}
// // // // // //         @media(max-width:640px){
// // // // // //           .admin-layout{flex-direction:column!important;}
// // // // // //           .admin-sidebar{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;position:relative!important;height:auto!important;}
// // // // // //           .admin-sidebar-logo{display:none!important;}
// // // // // //           .admin-stats{display:none!important;}
// // // // // //           .sidebar-nav{flex-direction:row!important;gap:4px!important;flex:1!important;}
// // // // // //           .nav-item{padding:8px 14px!important;font-size:12px!important;}
// // // // // //           .form-grid{grid-template-columns:1fr!important;}
// // // // // //           .upload-row{flex-direction:column!important;}
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       {/* Toast */}
// // // // // //       {toast && (
// // // // // //         <div style={{ ...a.toast, background: toast.type === "error" ? C.error : C.success, animation: "slideIn 0.25s ease" }}>
// // // // // //           {toast.type === "error" ? "✗" : "✓"} {toast.msg}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Confirm modal */}
// // // // // //       {confirm && (
// // // // // //         <div style={a.overlay} onClick={() => setConfirm(null)}>
// // // // // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // // // // //             <h3 style={a.modalTitle}>Confirm Delete</h3>
// // // // // //             <p style={a.modalMsg}>{confirm.msg}</p>
// // // // // //             <div style={a.modalBtns}>
// // // // // //               <button style={a.modalCancel} onClick={() => setConfirm(null)}>Cancel</button>
// // // // // //               <button style={a.modalDelete} onClick={confirm.action}>Delete</button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div style={a.layout} className="admin-layout">
// // // // // //         {/* Sidebar */}
// // // // // //         <div style={a.sidebar} className="admin-sidebar">
// // // // // //           <div style={a.sidebarLogo} className="admin-sidebar-logo">⚡ Admin</div>
// // // // // //           <div style={a.stats} className="admin-stats">
// // // // // //             <div style={a.stat}><span style={a.statN}>{songs.length}</span><span style={a.statL}>Songs</span></div>
// // // // // //             <div style={a.statDiv} />
// // // // // //             <div style={a.stat}><span style={a.statN}>{albums.length}</span><span style={a.statL}>Albums</span></div>
// // // // // //           </div>
// // // // // //           <div style={a.sidebarNav} className="sidebar-nav">
// // // // // //             {[
// // // // // //               { id: "upload", icon: <FaUpload size={13} />, label: editingId ? "Edit" : "Upload" },
// // // // // //               { id: "library", icon: <FaList size={13} />, label: "Library" },
// // // // // //               { id: "batch", icon: <FaCloudUploadAlt size={14} />, label: "Batch" },
// // // // // //             ].map(t => (
// // // // // //               <button key={t.id}
// // // // // //                 style={{ ...a.navItem, ...(view === t.id ? a.navItemActive : {}) }}
// // // // // //                 className="nav-item"
// // // // // //                 onClick={() => setView(t.id)}>
// // // // // //                 {t.icon} {t.label}
// // // // // //               </button>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //           <button style={a.logoutBtn} onClick={logout}><FaSignOutAlt size={13} /> Logout</button>
// // // // // //         </div>

// // // // // //         {/* Content */}
// // // // // //         <div style={a.content}>

// // // // // //           {/* ── UPLOAD ── */}
// // // // // //           {view === "upload" && (
// // // // // //             <div style={a.card} key="upload">
// // // // // //               <div style={a.cardHead}>
// // // // // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // // // // //                 {editingId && <button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// // // // // //               </div>

// // // // // //               <div style={a.formGrid} className="form-grid">
// // // // // //                 <div style={a.field}>
// // // // // //                   <label style={a.label}>Song Title *</label>
// // // // // //                   <input style={a.input} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} />
// // // // // //                 </div>
// // // // // //                 <div style={a.field}>
// // // // // //                   <label style={a.label}>Artist *</label>
// // // // // //                   <input style={a.input} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} />
// // // // // //                 </div>
// // // // // //                 <div style={a.field}>
// // // // // //                   <label style={a.label}>Album *</label>
// // // // // //                   <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
// // // // // //                     <option value="">Select album</option>
// // // // // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // // // // //                     <option value="__new__">+ New Album</option>
// // // // // //                   </select>
// // // // // //                 </div>
// // // // // //                 {album === "__new__" && (
// // // // // //                   <div style={a.field}>
// // // // // //                     <label style={a.label}>New Album Name *</label>
// // // // // //                     <input style={a.input} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               <div style={a.uploadRow} className="upload-row">
// // // // // //                 <label style={{ ...a.dropZone, ...(audio ? a.dropZoneFilled : {}) }}>
// // // // // //                   <FaMusic size={20} color={audio ? C.accent : C.muted} />
// // // // // //                   <span style={a.dropLabel}>{audio ? audio.name : "Upload Audio File"}</span>
// // // // // //                   <span style={a.dropSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
// // // // // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
// // // // // //                 </label>

// // // // // //                 <label style={{ ...a.dropZone, ...(image ? a.dropZoneFilled : {}) }}>
// // // // // //                   {image
// // // // // //                     ? <img src={URL.createObjectURL(image)} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
// // // // // //                     : <FaUpload size={20} color={C.muted} />
// // // // // //                   }
// // // // // //                   <span style={a.dropLabel}>{image ? image.name : "Upload Cover Image"}</span>
// // // // // //                   <span style={a.dropSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
// // // // // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
// // // // // //                 </label>
// // // // // //               </div>

// // // // // //               <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submit} disabled={loading}>
// // // // // //                 {loading
// // // // // //                   ? <><span style={a.spinner} /> {editingId ? "Updating..." : "Uploading..."}</>
// // // // // //                   : editingId ? "✓ Update Song" : "↑ Upload Song"
// // // // // //                 }
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* ── LIBRARY ── */}
// // // // // //           {view === "library" && (
// // // // // //             <div key="library" style={{ animation: "fadeUp 0.25s ease" }}>
// // // // // //               <div style={a.libTop}>
// // // // // //                 <h2 style={a.cardTitle}>Library</h2>
// // // // // //                 <div style={a.searchWrap}>
// // // // // //                   <FaSearch size={12} color={C.muted} />
// // // // // //                   <input style={a.searchInput} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
// // // // // //                   {search && <button style={a.clrBtn} onClick={() => setSearch("")}><FaTimes size={11} /></button>}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {fetchLoading ? <div style={a.loadMsg}>Loading...</div> : <>
// // // // // //                 {!search && Object.entries(albumGroups).length > 0 && (
// // // // // //                   <div style={a.albumGrid}>
// // // // // //                     {Object.entries(albumGroups).map(([name, list]) => (
// // // // // //                       <div key={name} style={a.albumRow}>
// // // // // //                         <div style={a.albumRowL}>
// // // // // //                           <img src={list[0]?.imageUrl} alt="" style={a.albumRowImg} loading="lazy" />
// // // // // //                           <div>
// // // // // //                             <div style={a.albumRowName}>{name}</div>
// // // // // //                             <div style={a.albumRowMeta}>{list.length} songs</div>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         <button style={a.delAlbumBtn} onClick={() => setConfirm({ msg: `Delete album "${name}" and all ${list.length} songs?`, action: () => deleteAlbum(name) })}>
// // // // // //                           <FaTrash size={11} /> Album
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                   </div>
// // // // // //                 )}

// // // // // //                 <div style={a.songsList}>
// // // // // //                   <div style={a.songsListHead}>
// // // // // //                     {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : `All Songs (${songs.length})`}
// // // // // //                   </div>
// // // // // //                   {filtered.map((s, i) => (
// // // // // //                     <div key={s._id} style={a.songRow}>
// // // // // //                       <div style={a.songRowL}>
// // // // // //                         <span style={a.songIdx}>{i + 1}</span>
// // // // // //                         <img src={s.imageUrl} alt="" style={a.songImg} loading="lazy" />
// // // // // //                         <div style={a.songInfo}>
// // // // // //                           <div style={a.songTitle}>{s.title}</div>
// // // // // //                           <div style={a.songMeta}>{s.artist} · {s.album}</div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div style={a.songActions}>
// // // // // //                         <button style={a.editBtn} onClick={() => editSong(s)}><FaEdit size={12} /></button>
// // // // // //                         <button style={a.delBtn} onClick={() => setConfirm({ msg: `Delete "${s.title}"?`, action: () => deleteSong(s._id) })}><FaTrash size={12} /></button>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                   {filtered.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
// // // // // //                 </div>
// // // // // //               </>}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* ── BATCH ── */}
// // // // // //           {view === "batch" && (
// // // // // //             <div style={a.card} key="batch">
// // // // // //               <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
// // // // // //               <p style={a.helpText}>Upload multiple songs using a JSON array. Each item needs: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>

// // // // // //               <div style={a.exampleBox}>
// // // // // //                 <div style={a.exampleTitle}>Example JSON</div>
// // // // // //                 <pre style={a.pre}>{`[
// // // // // //   {
// // // // // //     "title": "Song Name",
// // // // // //     "artist": "Artist Name",
// // // // // //     "album": "Album Name",
// // // // // //     "audioUrl": "https://cdn.example.com/audio.mp3",
// // // // // //     "imageUrl": "https://cdn.example.com/cover.jpg"
// // // // // //   }
// // // // // // ]`}</pre>
// // // // // //               </div>

// // // // // //               <label style={a.fileLabel}>
// // // // // //                 <FaUpload size={12} /> Upload .json file
// // // // // //                 <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
// // // // // //               </label>

// // // // // //               <div style={a.orRow}><span style={a.orText}>or paste below</span></div>

// // // // // //               <textarea style={a.textarea} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
// // // // // //                 value={batchJson} onChange={e => setBatchJson(e.target.value)} />

// // // // // //               <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
// // // // // //                 {batchLoading ? <><span style={a.spinner} /> Processing...</> : "↑ Upload All"}
// // // // // //               </button>

// // // // // //               {batchResults.length > 0 && (
// // // // // //                 <div style={a.resultsBox}>
// // // // // //                   <div style={a.resultsTitle}>{batchResults.filter(r => r.status === "ok").length}/{batchResults.length} uploaded</div>
// // // // // //                   {batchResults.map((r, i) => (
// // // // // //                     <div key={i} style={{ ...a.resultRow, borderLeft: `3px solid ${r.status === "ok" ? C.accent : C.error}` }}>
// // // // // //                       <span style={{ color: r.status === "ok" ? C.accent : C.error }}>{r.status === "ok" ? "✓" : "✗"}</span>
// // // // // //                       <span style={a.resultName}>{r.title}</span>
// // // // // //                       {r.error && <span style={a.resultErr}>{r.error}</span>}
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // ── LOGIN STYLES ──
// // // // // // const l = {
// // // // // //   root: { fontFamily: "'Outfit',sans-serif", minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // // // // //   card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.35s ease" },
// // // // // //   icon: { width: 52, height: 52, borderRadius: 14, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
// // // // // //   title: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 },
// // // // // //   sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
// // // // // //   err: { background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 20 },
// // // // // //   form: { display: "flex", flexDirection: "column", gap: 16 },
// // // // // //   field: { display: "flex", flexDirection: "column", gap: 6 },
// // // // // //   label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 },
// // // // // //   inputWrap: { display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" },
// // // // // //   input: { flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" },
// // // // // //   eyeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 },
// // // // // //   btn: { marginTop: 8, padding: "13px", borderRadius: 12, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
// // // // // // };

// // // // // // // ── ADMIN STYLES ──
// // // // // // const a = {
// // // // // //   root: { fontFamily: "'Outfit',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, position: "relative" },
// // // // // //   toast: { position: "fixed", top: 80, right: 20, padding: "12px 18px", borderRadius: 10, color: "#0f0f0f", fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8 },

// // // // // //   overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // // // // //   modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
// // // // // //   modalTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
// // // // // //   modalMsg: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
// // // // // //   modalBtns: { display: "flex", gap: 10, justifyContent: "flex-end" },
// // // // // //   modalCancel: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif" },
// // // // // //   modalDelete: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif" },

// // // // // //   layout: { display: "flex", minHeight: "100vh" },
// // // // // //   sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "24px 14px", display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 0, height: "100vh", flexShrink: 0 },
// // // // // //   sidebarLogo: { fontSize: 17, fontWeight: 700, color: C.accent, padding: "0 8px", marginBottom: 16 },
// // // // // //   stats: { display: "flex", gap: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, overflow: "hidden" },
// // // // // //   stat: { flex: 1, textAlign: "center", padding: "12px 8px" },
// // // // // //   statN: { display: "block", fontSize: 18, fontWeight: 700, color: C.accent },
// // // // // //   statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
// // // // // //   statDiv: { width: 1, background: C.border },
// // // // // //   sidebarNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
// // // // // //   navItem: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, fontWeight: 500, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", textAlign: "left" },
// // // // // //   navItemActive: { background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}` },
// // // // // //   logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", marginTop: "auto" },

// // // // // //   content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },

// // // // // //   card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 24, animation: "fadeUp 0.25s ease" },
// // // // // //   cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
// // // // // //   cardTitle: { fontSize: 18, fontWeight: 700 },
// // // // // //   cancelBtn: { padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

// // // // // //   formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
// // // // // //   field: { display: "flex", flexDirection: "column", gap: 6 },
// // // // // //   label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.5 },
// // // // // //   input: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: "'Outfit',sans-serif", color: C.text, background: C.card },

// // // // // //   uploadRow: { display: "flex", gap: 16, marginBottom: 24 },
// // // // // //   dropZone: { flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", background: C.bg, transition: "border 0.2s" },
// // // // // //   dropZoneFilled: { borderColor: C.accent, background: C.accentDim },
// // // // // //   dropLabel: { fontSize: 12, fontWeight: 600, color: C.text, textAlign: "center" },
// // // // // //   dropSub: { fontSize: 11, color: C.muted },

// // // // // //   btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Outfit',sans-serif" },
// // // // // //   btnDis: { opacity: 0.5, cursor: "not-allowed" },
// // // // // //   spinner: { width: 14, height: 14, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0f0f0f", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

// // // // // //   libTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
// // // // // //   searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
// // // // // //   searchInput: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", fontFamily: "'Outfit',sans-serif", width: 160 },
// // // // // //   clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
// // // // // //   loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

// // // // // //   albumGrid: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 },
// // // // // //   albumRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 },
// // // // // //   albumRowL: { display: "flex", alignItems: "center", gap: 12 },
// // // // // //   albumRowImg: { width: 42, height: 42, borderRadius: 8, objectFit: "cover" },
// // // // // //   albumRowName: { fontSize: 14, fontWeight: 600 },
// // // // // //   albumRowMeta: { fontSize: 11, color: C.sub },
// // // // // //   delAlbumBtn: { display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", color: C.error, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

// // // // // //   songsList: { display: "flex", flexDirection: "column", gap: 3 },
// // // // // //   songsListHead: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, padding: "0 4px 10px" },
// // // // // //   songRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, gap: 12 },
// // // // // //   songRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
// // // // // //   songIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
// // // // // //   songImg: { width: 40, height: 40, borderRadius: 6, objectFit: "cover", flexShrink: 0 },
// // // // // //   songInfo: { minWidth: 0 },
// // // // // //   songTitle: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // // // //   songMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // // // //   songActions: { display: "flex", gap: 8, flexShrink: 0 },
// // // // // //   editBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", color: C.sub, display: "flex" },
// // // // // //   delBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", cursor: "pointer", color: C.error, display: "flex" },
// // // // // //   emptyMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },

// // // // // //   helpText: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
// // // // // //   code: { fontFamily: "'JetBrains Mono',monospace", background: C.card, border: `1px solid ${C.border}`, padding: "2px 6px", borderRadius: 4, fontSize: 11 },
// // // // // //   exampleBox: { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
// // // // // //   exampleTitle: { fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 },
// // // // // //   pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
// // // // // //   fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 14 },
// // // // // //   orRow: { margin: "12px 0", textAlign: "center" },
// // // // // //   orText: { fontSize: 12, color: C.muted },
// // // // // //   textarea: { width: "100%", padding: "14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text, resize: "vertical", lineHeight: 1.7, background: C.bg, marginBottom: 16 },
// // // // // //   resultsBox: { marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
// // // // // //   resultsTitle: { padding: "10px 16px", background: C.card, fontSize: 12, fontWeight: 700, color: C.sub, borderBottom: `1px solid ${C.border}` },
// // // // // //   resultRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },
// // // // // //   resultName: { flex: 1 },
// // // // // //   resultErr: { fontSize: 11, color: C.error },
// // // // // // };
// // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // import axios from "axios";
// // // // // import {
// // // // //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// // // // //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash, FaPalette
// // // // // } from "react-icons/fa";

// // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // const ADMINS = { "admin": "vibe2024", "revanth": "revv@123", "superadmin": "music#999" };

// // // // // let _cache = null;

// // // // // const THEMES = {
// // // // //   Amber: { bg:"#0f0f12",surface:"#18181b",card:"#1f1f23",border:"#2a2a2f",accent:"#f59e0b",accentDim:"rgba(245,158,11,0.08)",accentBorder:"rgba(245,158,11,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // // //   Purple: { bg:"#0d0d14",surface:"#16162a",card:"#1e1e35",border:"#2d2d4a",accent:"#a855f7",accentDim:"rgba(168,85,247,0.08)",accentBorder:"rgba(168,85,247,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // // //   Cyan:   { bg:"#020f12",surface:"#071a1f",card:"#0c2530",border:"#0e3040",accent:"#06b6d4",accentDim:"rgba(6,182,212,0.08)",accentBorder:"rgba(6,182,212,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // // //   Rose:   { bg:"#120a0a",surface:"#1c1010",card:"#261515",border:"#3a1f1f",accent:"#f43f5e",accentDim:"rgba(244,63,94,0.08)",accentBorder:"rgba(244,63,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#fbbf24",success:"#22c55e" },
// // // // //   Green:  { bg:"#090f0a",surface:"#101a10",card:"#162416",border:"#1e3520",accent:"#22c55e",accentDim:"rgba(34,197,94,0.08)",accentBorder:"rgba(34,197,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // // // };
// // // // // const THEME_NAMES = Object.keys(THEMES);

// // // // // const SkeletonRow = ({ C }) => (
// // // // //   <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,marginBottom:3}}>
// // // // //     <div style={{width:20,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //     <div style={{width:40,height:40,borderRadius:6,background:C.border,animation:"shimmer 1.4s infinite",flexShrink:0}}/>
// // // // //     <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
// // // // //       <div style={{width:"60%",height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //       <div style={{width:"40%",height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //     </div>
// // // // //   </div>
// // // // // );

// // // // // const SkeletonAlbum = ({ C }) => (
// // // // //   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:8}}>
// // // // //     <div style={{display:"flex",alignItems:"center",gap:12}}>
// // // // //       <div style={{width:42,height:42,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //       <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //         <div style={{width:120,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //         <div style={{width:70,height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //       </div>
// // // // //     </div>
// // // // //     <div style={{width:80,height:28,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // // //   </div>
// // // // // );

// // // // // export default function AdminPanel() {
// // // // //   const [themeName, setThemeName] = useState(() => localStorage.getItem("vo_admin_theme") || "Amber");
// // // // //   const [showThemePicker, setShowThemePicker] = useState(false);
// // // // //   const C = THEMES[themeName] || THEMES.Amber;
// // // // //   const pickTheme = (n) => { setThemeName(n); localStorage.setItem("vo_admin_theme", n); setShowThemePicker(false); };

// // // // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// // // // //   const [loginUser, setLoginUser] = useState("");
// // // // //   const [loginPass, setLoginPass] = useState("");
// // // // //   const [showPass, setShowPass] = useState(false);
// // // // //   const [loginErr, setLoginErr] = useState("");

// // // // //   const [songs, setSongs] = useState([]);
// // // // //   const [albums, setAlbums] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // // //   const [view, setView] = useState("upload");
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [toast, setToast] = useState(null);
// // // // //   const [confirm, setConfirm] = useState(null);
// // // // //   const [editingId, setEditingId] = useState(null);

// // // // //   const [title, setTitle] = useState("");
// // // // //   const [artist, setArtist] = useState("");
// // // // //   const [album, setAlbum] = useState("");
// // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // //   const [audio, setAudio] = useState(null);
// // // // //   const [image, setImage] = useState(null);
// // // // //   const audioRef = useRef(null);
// // // // //   const imageRef = useRef(null);

// // // // //   const [bulkItems, setBulkItems] = useState([{ title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // // //   const [batchResults, setBatchResults] = useState([]);
// // // // //   const [batchProgress, setBatchProgress] = useState(0);

// // // // //   const handleLogin = (e) => {
// // // // //     e.preventDefault(); setLoginErr("");
// // // // //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// // // // //     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
// // // // //     else setLoginErr("Invalid username or password.");
// // // // //   };

// // // // //   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };

// // // // //   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

// // // // //   const fetchData = useCallback(async (force = false) => {
// // // // //     setFetchLoading(true);
// // // // //     try {
// // // // //       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
// // // // //       const res = await axios.get(`${API}/`);
// // // // //       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
// // // // //     } catch { showToast("Failed to fetch songs", "error"); }
// // // // //     finally { setFetchLoading(false); }
// // // // //   }, []);

// // // // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // // // //   const resetForm = () => {
// // // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
// // // // //     if (audioRef.current) audioRef.current.value = "";
// // // // //     if (imageRef.current) imageRef.current.value = "";
// // // // //   };

// // // // //   const submit = async () => {
// // // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // // // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
// // // // //     const fd = new FormData();
// // // // //     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
// // // // //     if (audio) fd.append("audio", audio);
// // // // //     if (image) fd.append("image", image);
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// // // // //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// // // // //       resetForm(); _cache = null; fetchData(true);
// // // // //     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
// // // // //     finally { setLoading(false); }
// // // // //   };

// // // // //   const deleteSong = async (id) => {
// // // // //     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
// // // // //     catch { showToast("Delete failed", "error"); }
// // // // //   };

// // // // //   const deleteAlbum = async (name) => {
// // // // //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
// // // // //     catch { showToast("Album delete failed", "error"); }
// // // // //   };

// // // // //   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

// // // // //   const addBulkItem = () => setBulkItems(p => [...p, { title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // // // //   const removeBulkItem = (i) => setBulkItems(p => p.filter((_,idx) => idx !== i));
// // // // //   const updateBulkItem = (i, k, v) => setBulkItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

// // // // //   const runBulkUpload = async () => {
// // // // //     for (let i = 0; i < bulkItems.length; i++) {
// // // // //       const item = bulkItems[i];
// // // // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // // // //       if (!item.title || !item.artist || !fa) { showToast(`Item ${i+1}: Title, Artist, Album required`, "error"); return; }
// // // // //       if (!item.audio || !item.image) { showToast(`Item ${i+1}: Audio & Image required`, "error"); return; }
// // // // //     }
// // // // //     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
// // // // //     const results = [];
// // // // //     for (let i = 0; i < bulkItems.length; i++) {
// // // // //       const item = bulkItems[i];
// // // // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // // // //       const fd = new FormData();
// // // // //       fd.append("title", item.title.trim()); fd.append("artist", item.artist.trim()); fd.append("album", fa);
// // // // //       fd.append("audio", item.audio); fd.append("image", item.image);
// // // // //       try {
// // // // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // // // //         results.push({ title: item.title, status: "ok" });
// // // // //       } catch (err) {
// // // // //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// // // // //       }
// // // // //       setBatchProgress(Math.round(((i+1)/bulkItems.length)*100));
// // // // //       setBatchResults([...results]);
// // // // //     }
// // // // //     setBatchLoading(false);
// // // // //     const ok = results.filter(r => r.status === "ok").length;
// // // // //     showToast(`Bulk: ${ok}/${bulkItems.length} uploaded`, ok === bulkItems.length ? "success" : "error");
// // // // //     if (ok > 0) { _cache = null; fetchData(true); }
// // // // //   };

// // // // //   const filtered = songs.filter(s =>
// // // // //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// // // // //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// // // // //     s.album.toLowerCase().includes(search.toLowerCase())
// // // // //   );
// // // // //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
// // // // //   const a = makeStyles(C);

// // // // //   if (!authed) {
// // // // //     return (
// // // // //       <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
// // // // //         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:1px solid ${C.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
// // // // //         <div style={{width:"100%",maxWidth:400,background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"36px 32px",animation:"fadeUp 0.35s ease"}}>
// // // // //           <div style={{width:52,height:52,borderRadius:14,background:C.accentDim,border:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><FaLock size={22} color={C.accent}/></div>
// // // // //           <h1 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:6}}>Admin Access</h1>
// // // // //           <p style={{fontSize:13,color:C.sub,marginBottom:28}}>Enter your credentials to continue</p>
// // // // //           {loginErr && <div style={{background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.3)",color:C.error,fontSize:13,padding:"10px 14px",borderRadius:10,marginBottom:20}}>{loginErr}</div>}
// // // // //           <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:16}}>
// // // // //             {[{label:"Username",type:"text",val:loginUser,set:setLoginUser,icon:<FaUser size={13} color={C.muted}/>},{label:"Password",type:showPass?"text":"password",val:loginPass,set:setLoginPass,icon:<FaLock size={13} color={C.muted}/>}].map(({label,type,val,set,icon},i)=>(
// // // // //               <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //                 <label style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
// // // // //                 <div style={{display:"flex",alignItems:"center",gap:10,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
// // // // //                   {icon}
// // // // //                   <input style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14,color:C.text,fontFamily:"'Outfit',sans-serif"}} type={type} value={val} onChange={e=>set(e.target.value)} autoFocus={i===0}/>
// // // // //                   {i===1&&<button type="button" style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:0}} onClick={()=>setShowPass(!showPass)}>{showPass?<FaEyeSlash size={13} color={C.muted}/>:<FaEye size={13} color={C.muted}/>}</button>}
// // // // //                 </div>
// // // // //               </div>
// // // // //             ))}
// // // // //             <button type="submit" style={{marginTop:8,padding:"13px",borderRadius:12,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Sign In →</button>
// // // // //           </form>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div style={a.root}>
// // // // //       <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}input::placeholder,textarea::placeholder{color:${C.muted};}select option{background:${C.card};color:${C.text};}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin2{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}@media(max-width:640px){.al{flex-direction:column!important;}.sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}.sl{display:none!important;}.ss{display:none!important;}.sn{flex-direction:row!important;gap:4px!important;flex:1!important;}.ni{padding:8px 14px!important;font-size:12px!important;}.fg{grid-template-columns:1fr!important;}.ur{flex-direction:column!important;}}`}</style>

// // // // //       {toast&&<div style={{...a.toast,background:toast.type==="error"?C.error:C.success,animation:"slideIn 0.25s ease"}}>{toast.type==="error"?"✗":"✓"} {toast.msg}</div>}

// // // // //       {confirm&&(
// // // // //         <div style={a.overlay} onClick={()=>setConfirm(null)}>
// // // // //           <div style={a.modal} onClick={e=>e.stopPropagation()}>
// // // // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.text}}>Confirm Delete</h3>
// // // // //             <p style={{fontSize:13,color:C.sub,marginBottom:24,lineHeight:1.6}}>{confirm.msg}</p>
// // // // //             <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
// // // // //               <button style={a.mCancel} onClick={()=>setConfirm(null)}>Cancel</button>
// // // // //               <button style={a.mDelete} onClick={confirm.action}>Delete</button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {showThemePicker&&(
// // // // //         <div style={a.overlay} onClick={()=>setShowThemePicker(false)}>
// // // // //           <div style={{...a.modal,maxWidth:320}} onClick={e=>e.stopPropagation()}>
// // // // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:C.text}}>Choose Theme</h3>
// // // // //             <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
// // // // //               {THEME_NAMES.map(n=>(
// // // // //                 <button key={n} onClick={()=>pickTheme(n)} style={{padding:"8px 18px",borderRadius:8,border:`2px solid ${themeName===n?THEMES[n].accent:THEMES[n].border}`,background:THEMES[n].surface,color:THEMES[n].accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13}}>{n}</button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <div style={a.layout} className="al">
// // // // //         <div style={a.sidebar} className="sb">
// // // // //           <div style={{fontSize:17,fontWeight:700,color:C.accent,padding:"0 8px",marginBottom:16}} className="sl">⚡ Admin</div>
// // // // //           <div style={{display:"flex",gap:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}} className="ss">
// // // // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{songs.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Songs</span></div>
// // // // //             <div style={{width:1,background:C.border}}/>
// // // // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{albums.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Albums</span></div>
// // // // //           </div>
// // // // //           <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}} className="sn">
// // // // //             {[{id:"upload",icon:<FaUpload size={13}/>,label:editingId?"Edit":"Upload"},{id:"library",icon:<FaList size={13}/>,label:"Library"},{id:"batch",icon:<FaCloudUploadAlt size={14}/>,label:"Bulk"}].map(t=>(
// // // // //               <button key={t.id} style={{...a.navItem,...(view===t.id?a.navItemActive:{})}} className="ni" onClick={()=>setView(t.id)}>{t.icon} {t.label}</button>
// // // // //             ))}
// // // // //           </div>
// // // // //           <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.accent,fontSize:13,background:C.accentDim,border:`1px solid ${C.accentBorder}`,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setShowThemePicker(true)}><FaPalette size={13}/> Theme</button>
// // // // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,background:"none",border:"none",fontFamily:"'Outfit',sans-serif"}} onClick={logout}><FaSignOutAlt size={13}/> Logout</button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div style={{flex:1,padding:"28px 24px",maxWidth:800,overflowY:"auto"}}>
// // // // //           {view==="upload"&&(
// // // // //             <div style={a.card}>
// // // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
// // // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
// // // // //                 {editingId&&<button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// // // // //               </div>
// // // // //               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}} className="fg">
// // // // //                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i)=>(
// // // // //                   <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //                     <label style={a.label}>{label}</label>
// // // // //                     <input style={a.inp} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
// // // // //                   </div>
// // // // //                 ))}
// // // // //                 <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //                   <label style={a.label}>Album *</label>
// // // // //                   <select style={a.inp} value={album} onChange={e=>setAlbum(e.target.value)}>
// // // // //                     <option value="">Select album</option>
// // // // //                     {albums.map((al,i)=><option key={i} value={al}>{al}</option>)}
// // // // //                     <option value="__new__">+ New Album</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 {album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e=>setNewAlbum(e.target.value)}/></div>}
// // // // //               </div>
// // // // //               <div style={{display:"flex",gap:16,marginBottom:24}} className="ur">
// // // // //                 <label style={{...a.dz,...(audio?a.dzF:{})}}>
// // // // //                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
// // // // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{audio?audio.name:"Upload Audio File"}</span>
// // // // //                   <span style={{fontSize:11,color:C.muted}}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
// // // // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e=>setAudio(e.target.files[0])} style={{display:"none"}}/>
// // // // //                 </label>
// // // // //                 <label style={{...a.dz,...(image?a.dzF:{})}}>
// // // // //                   {image?<img src={URL.createObjectURL(image)} alt="" style={{width:48,height:48,borderRadius:8,objectFit:"cover"}}/>:<FaUpload size={20} color={C.muted}/>}
// // // // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{image?image.name:"Upload Cover Image"}</span>
// // // // //                   <span style={{fontSize:11,color:C.muted}}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
// // // // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} style={{display:"none"}}/>
// // // // //                 </label>
// // // // //               </div>
// // // // //               <button style={{...a.btn,...(loading?a.btnD:{})}} onClick={submit} disabled={loading}>
// // // // //                 {loading?<><span style={a.spin}/>{editingId?"Updating...":"Uploading..."}</>:editingId?"✓ Update Song":"↑ Upload Song"}
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           {view==="library"&&(
// // // // //             <div style={{animation:"fadeUp 0.25s ease"}}>
// // // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
// // // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>Library</h2>
// // // // //                 <div style={{display:"flex",alignItems:"center",gap:8,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px"}}>
// // // // //                   <FaSearch size={12} color={C.muted}/>
// // // // //                   <input style={{border:"none",outline:"none",fontSize:13,color:C.text,background:"none",fontFamily:"'Outfit',sans-serif",width:160}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
// // // // //                   {search&&<button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex"}} onClick={()=>setSearch("")}><FaTimes size={11}/></button>}
// // // // //                 </div>
// // // // //               </div>
// // // // //               {fetchLoading?(
// // // // //                 <div>
// // // // //                   {[...Array(3)].map((_,i)=><SkeletonAlbum key={i} C={C}/>)}
// // // // //                   <div style={{marginTop:16}}>{[...Array(6)].map((_,i)=><SkeletonRow key={i} C={C}/>)}</div>
// // // // //                 </div>
// // // // //               ):(
// // // // //                 <>
// // // // //                   {!search&&Object.entries(albumGroups).length>0&&(
// // // // //                     <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
// // // // //                       {Object.entries(albumGroups).map(([name,list])=>(
// // // // //                         <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12}}>
// // // // //                           <div style={{display:"flex",alignItems:"center",gap:12}}>
// // // // //                             <img src={list[0]?.imageUrl} alt="" style={{width:42,height:42,borderRadius:8,objectFit:"cover"}} loading="lazy"/>
// // // // //                             <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{name}</div><div style={{fontSize:11,color:C.sub}}>{list.length} songs</div></div>
// // // // //                           </div>
// // // // //                           <button style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",color:C.error,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setConfirm({msg:`Delete album "${name}" and all ${list.length} songs?`,action:()=>deleteAlbum(name)})}>
// // // // //                             <FaTrash size={11}/> Album
// // // // //                           </button>
// // // // //                         </div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   )}
// // // // //                   <div style={{display:"flex",flexDirection:"column",gap:3}}>
// // // // //                     <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:0.6,padding:"0 4px 10px"}}>{search?`${filtered.length} result${filtered.length!==1?"s":""}`:`All Songs (${songs.length})`}</div>
// // // // //                     {filtered.map((s,i)=>(
// // // // //                       <div key={s._id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,gap:12}}>
// // // // //                         <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1}}>
// // // // //                           <span style={{fontSize:11,color:C.muted,width:20,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{i+1}</span>
// // // // //                           <img src={s.imageUrl} alt="" style={{width:40,height:40,borderRadius:6,objectFit:"cover",flexShrink:0}} loading="lazy"/>
// // // // //                           <div style={{minWidth:0}}>
// // // // //                             <div style={{fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title}</div>
// // // // //                             <div style={{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.artist} · {s.album}</div>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div style={{display:"flex",gap:8,flexShrink:0}}>
// // // // //                           <button style={{padding:"7px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:"none",cursor:"pointer",color:C.sub,display:"flex"}} onClick={()=>editSong(s)}><FaEdit size={12}/></button>
// // // // //                           <button style={{padding:"7px 10px",borderRadius:7,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",cursor:"pointer",color:C.error,display:"flex"}} onClick={()=>setConfirm({msg:`Delete "${s.title}"?`,action:()=>deleteSong(s._id)})}><FaTrash size={12}/></button>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                     {filtered.length===0&&<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:32}}>No songs found.</p>}
// // // // //                   </div>
// // // // //                 </>
// // // // //               )}
// // // // //             </div>
// // // // //           )}

// // // // //           {view==="batch"&&(
// // // // //             <div style={a.card}>
// // // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
// // // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>📦 Bulk Upload Songs</h2>
// // // // //                 <button style={a.cancelBtn} onClick={addBulkItem}>+ Add Song</button>
// // // // //               </div>
// // // // //               <p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:20}}>Add multiple songs below. Each needs title, artist, album, audio file and cover image. Uploaded one-by-one to the server.</p>

// // // // //               {bulkItems.map((item,i)=>(
// // // // //                 <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:14}}>
// // // // //                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
// // // // //                     <span style={{fontSize:12,fontWeight:700,color:C.accent}}>Song {i+1}</span>
// // // // //                     {bulkItems.length>1&&<button onClick={()=>removeBulkItem(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.error,display:"flex"}}><FaTimes size={13}/></button>}
// // // // //                   </div>
// // // // //                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}} className="fg">
// // // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Title *</label><input style={a.inp} placeholder="Song title" value={item.title} onChange={e=>updateBulkItem(i,"title",e.target.value)}/></div>
// // // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Artist *</label><input style={a.inp} placeholder="Artist" value={item.artist} onChange={e=>updateBulkItem(i,"artist",e.target.value)}/></div>
// // // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // // //                       <label style={a.label}>Album *</label>
// // // // //                       <select style={a.inp} value={item.album} onChange={e=>updateBulkItem(i,"album",e.target.value)}>
// // // // //                         <option value="">Select album</option>
// // // // //                         {albums.map((al,ai)=><option key={ai} value={al}>{al}</option>)}
// // // // //                         <option value="__new__">+ New Album</option>
// // // // //                       </select>
// // // // //                     </div>
// // // // //                     {item.album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={item.newAlbum||""} onChange={e=>updateBulkItem(i,"newAlbum",e.target.value)}/></div>}
// // // // //                   </div>
// // // // //                   <div style={{display:"flex",gap:10}} className="ur">
// // // // //                     <label style={{...a.dz,flex:1,...(item.audio?a.dzF:{})}}>
// // // // //                       <FaMusic size={16} color={item.audio?C.accent:C.muted}/>
// // // // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.audio?item.audio.name:"Audio File"}</span>
// // // // //                       <span style={{fontSize:10,color:C.muted}}>{item.audio?`${(item.audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV"}</span>
// // // // //                       <input type="file" accept="audio/*" onChange={e=>updateBulkItem(i,"audio",e.target.files[0])} style={{display:"none"}}/>
// // // // //                     </label>
// // // // //                     <label style={{...a.dz,flex:1,...(item.image?a.dzF:{})}}>
// // // // //                       {item.image?<img src={URL.createObjectURL(item.image)} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover"}}/>:<FaUpload size={16} color={C.muted}/>}
// // // // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.image?item.image.name:"Cover Image"}</span>
// // // // //                       <span style={{fontSize:10,color:C.muted}}>{item.image?`${(item.image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG"}</span>
// // // // //                       <input type="file" accept="image/*" onChange={e=>updateBulkItem(i,"image",e.target.files[0])} style={{display:"none"}}/>
// // // // //                     </label>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}

// // // // //               <button style={{...a.cancelBtn,display:"flex",alignItems:"center",gap:8,marginBottom:14,width:"100%",justifyContent:"center",padding:"10px"}} onClick={addBulkItem}>+ Add Another Song</button>

// // // // //               {batchLoading&&(
// // // // //                 <div style={{marginBottom:16}}>
// // // // //                   <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}><span>Uploading...</span><span>{batchProgress}%</span></div>
// // // // //                   <div style={{height:6,background:C.border,borderRadius:4,overflow:"hidden"}}>
// // // // //                     <div style={{height:"100%",width:`${batchProgress}%`,background:C.accent,borderRadius:4,transition:"width 0.3s ease"}}/>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               <button style={{...a.btn,...(batchLoading?a.btnD:{})}} onClick={runBulkUpload} disabled={batchLoading}>
// // // // //                 {batchLoading?<><span style={a.spin}/>Uploading...</>:`↑ Upload All (${bulkItems.length})`}
// // // // //               </button>

// // // // //               {batchResults.length>0&&(
// // // // //                 <div style={{marginTop:20,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
// // // // //                   <div style={{padding:"10px 16px",background:C.card,fontSize:12,fontWeight:700,color:C.sub,borderBottom:`1px solid ${C.border}`}}>{batchResults.filter(r=>r.status==="ok").length}/{batchResults.length} uploaded</div>
// // // // //                   {batchResults.map((r,i)=>(
// // // // //                     <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.text,borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}`}}>
// // // // //                       <span style={{color:r.status==="ok"?C.accent:C.error}}>{r.status==="ok"?"✓":"✗"}</span>
// // // // //                       <span style={{flex:1}}>{r.title}</span>
// // // // //                       {r.error&&<span style={{fontSize:11,color:C.error}}>{r.error}</span>}
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function makeStyles(C) {
// // // // //   return {
// // // // //     root:{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,position:"relative"},
// // // // //     toast:{position:"fixed",top:80,right:20,padding:"12px 18px",borderRadius:10,color:"#0f0f0f",fontSize:13,fontWeight:700,zIndex:9999,display:"flex",alignItems:"center",gap:8},
// // // // //     overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:20},
// // // // //     modal:{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,maxWidth:360,width:"100%"},
// // // // //     mCancel:{padding:"9px 20px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:13,fontFamily:"'Outfit',sans-serif"},
// // // // //     mDelete:{padding:"9px 20px",borderRadius:8,border:"none",background:C.error,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Outfit',sans-serif"},
// // // // //     layout:{display:"flex",minHeight:"100vh"},
// // // // //     sidebar:{width:200,background:C.surface,borderRight:`1px solid ${C.border}`,padding:"24px 14px",display:"flex",flexDirection:"column",gap:8,position:"sticky",top:0,height:"100vh",flexShrink:0},
// // // // //     navItem:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,fontWeight:500,background:"none",border:"none",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
// // // // //     navItemActive:{background:C.accentDim,color:C.accent,border:`1px solid ${C.accentBorder}`},
// // // // //     card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:28,marginBottom:24,animation:"fadeUp 0.25s ease"},
// // // // //     cancelBtn:{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"},
// // // // //     label:{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.5},
// // // // //     inp:{padding:"11px 14px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:14,fontFamily:"'Outfit',sans-serif",color:C.text,background:C.card},
// // // // //     dz:{flex:1,border:`1.5px dashed ${C.border}`,borderRadius:12,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",background:C.bg,transition:"border 0.2s"},
// // // // //     dzF:{borderColor:C.accent,background:C.accentDim},
// // // // //     btn:{width:"100%",padding:14,borderRadius:10,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Outfit',sans-serif"},
// // // // //     btnD:{opacity:0.5,cursor:"not-allowed"},
// // // // //     spin:{width:14,height:14,border:"2px solid rgba(0,0,0,0.2)",borderTopColor:"#0f0f0f",borderRadius:"50%",animation:"spin2 0.8s linear infinite",display:"inline-block"},
// // // // //   };
// // // // // }
// // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // import axios from "axios";

// // // // // ─── Inline SVG Icons ────────────────────────────────────────────────────────
// // // // const Icon = {
// // // //   Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39,18.39A5,5,0,0,0,18,9h-1.26A8,8,0,1,0,3,16.3"/></svg>,
// // // //   Music: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
// // // //   List: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
// // // //   Batch: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21,15v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
// // // //   Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>,
// // // //   Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11,4H4a2,2,0,0,0-2,2v14a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V13"/><path d="M18.5,2.5a2.121,2.121,0,0,1,3,3L12,15l-4,1,1-4Z"/></svg>,
// // // //   Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
// // // //   Close: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
// // // //   Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7,11V7a5,5,0,0,1,10,0v4"/></svg>,
// // // //   Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1,12S5,4,12,4s11,8,11,8-4,8-11,8S1,12,1,12Z"/><circle cx="12" cy="12" r="3"/></svg>,
// // // //   EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94,17.94A10.07,10.07,0,0,1,12,20C5,20,1,12,1,12a18.45,18.45,0,0,1,5.06-5.94"/><path d="M9.9,4.24A9.12,9.12,0,0,1,12,4c7,0,11,8,11,8a18.5,18.5,0,0,1-2.16,3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
// // // //   Logout: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,21H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H9"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
// // // //   Check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>,
// // // //   Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>,
// // // //   Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
// // // // };

// // // // // ─── Constants ────────────────────────────────────────────────────────────────
// // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // const ADMINS = {
// // // //   "admin": "vibe2024",
// // // //   "revanth": "revv@123",
// // // //   "superadmin": "music#999",
// // // // };

// // // // let _cache = null;

// // // // const C = {
// // // //   bg: "#0d0f1e",
// // // //   surface: "#13162a",
// // // //   card: "#181b30",
// // // //   border: "#1e2240",
// // // //   accent: "#ff6b35",
// // // //   accentGlow: "rgba(255,107,53,0.14)",
// // // //   accentBorder: "rgba(255,107,53,0.3)",
// // // //   text: "#f5f0e8",
// // // //   sub: "#8b90aa",
// // // //   muted: "#3d4260",
// // // //   error: "#f87171",
// // // //   success: "#4ade80",
// // // //   dim: "#252845",
// // // // };

// // // // // ─── MAIN ─────────────────────────────────────────────────────────────────────
// // // // export default function AdminPanel() {
// // // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_adm"));
// // // //   const [loginUser, setLoginUser] = useState("");
// // // //   const [loginPass, setLoginPass] = useState("");
// // // //   const [showPwd, setShowPwd] = useState(false);
// // // //   const [loginErr, setLoginErr] = useState("");

// // // //   const [songs, setSongs] = useState([]);
// // // //   const [albums, setAlbums] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [fetching, setFetching] = useState(true);
// // // //   const [view, setView] = useState("upload");
// // // //   const [albumFilter, setAlbumFilter] = useState(null);
// // // //   const [search, setSearch] = useState("");
// // // //   const [toast, setToast] = useState(null);
// // // //   const [confirm, setConfirm] = useState(null);
// // // //   const [editingId, setEditingId] = useState(null);

// // // //   // Single upload form
// // // //   const [title, setTitle] = useState("");
// // // //   const [artist, setArtist] = useState("");
// // // //   const [album, setAlbum] = useState("");
// // // //   const [newAlbum, setNewAlbum] = useState("");
// // // //   const [audio, setAudio] = useState(null);
// // // //   const [image, setImage] = useState(null);
// // // //   const audioRef = useRef(null);
// // // //   const imageRef = useRef(null);

// // // //   // Multi-file upload
// // // //   const [multiFiles, setMultiFiles] = useState([]); // [{audio, image, title, artist, album, status}]
// // // //   const [multiAlbum, setMultiAlbum] = useState("");
// // // //   const [multiNewAlbum, setMultiNewAlbum] = useState("");
// // // //   const [multiUploading, setMultiUploading] = useState(false);

// // // //   // Batch JSON
// // // //   const [batchJson, setBatchJson] = useState("");
// // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // //   const [batchResults, setBatchResults] = useState([]);

// // // //   // ─── AUTH ─────────────────────────────────────────────────────────────────
// // // //   const handleLogin = (e) => {
// // // //     e.preventDefault();
// // // //     setLoginErr("");
// // // //     const u = loginUser.trim().toLowerCase();
// // // //     if (ADMINS[u] && ADMINS[u] === loginPass) {
// // // //       sessionStorage.setItem("vo_adm", u);
// // // //       setAuthed(true);
// // // //     } else {
// // // //       setLoginErr("Incorrect username or password.");
// // // //     }
// // // //   };

// // // //   const logout = () => { sessionStorage.removeItem("vo_adm"); setAuthed(false); };

// // // //   // ─── DATA ─────────────────────────────────────────────────────────────────
// // // //   const showToast = (msg, type = "success") => {
// // // //     setToast({ msg, type });
// // // //     setTimeout(() => setToast(null), 3200);
// // // //   };

// // // //   const fetchData = useCallback(async (force = false) => {
// // // //     setFetching(true);
// // // //     try {
// // // //       if (_cache && !force) {
// // // //         setSongs(_cache);
// // // //         setAlbums([...new Set(_cache.map(s => s.album))]);
// // // //         setFetching(false);
// // // //         return;
// // // //       }
// // // //       const res = await axios.get(`${API}/`);
// // // //       _cache = res.data;
// // // //       setSongs(res.data);
// // // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // // //     } catch { showToast("Failed to load songs", "error"); }
// // // //     finally { setFetching(false); }
// // // //   }, []);

// // // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // // //   const resetForm = () => {
// // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // // //     setAudio(null); setImage(null); setEditingId(null);
// // // //     if (audioRef.current) audioRef.current.value = "";
// // // //     if (imageRef.current) imageRef.current.value = "";
// // // //   };

// // // //   // ─── Single Upload / Edit ─────────────────────────────────────────────────
// // // //   const submitSingle = async () => {
// // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }

// // // //     const fd = new FormData();
// // // //     fd.append("title", title.trim());
// // // //     fd.append("artist", artist.trim());
// // // //     fd.append("album", finalAlbum);
// // // //     if (audio) fd.append("audio", audio);
// // // //     if (image) fd.append("image", image);

// // // //     setLoading(true);
// // // //     try {
// // // //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// // // //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// // // //       resetForm(); _cache = null; fetchData(true);
// // // //     } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   // ─── Multi-file Upload ────────────────────────────────────────────────────
// // // //   // Pair audio + image files by matching base name
// // // //   const handleMultiAudioChange = (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     setMultiFiles(prev => {
// // // //       const updated = [...prev];
// // // //       files.forEach(f => {
// // // //         const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
// // // //         const existing = updated.find(x => x.base === base);
// // // //         if (existing) { existing.audio = f; }
// // // //         else { updated.push({ base, audio: f, image: null, title: f.name.replace(/\.[^.]+$/, ""), artist: "", status: "pending" }); }
// // // //       });
// // // //       return [...updated];
// // // //     });
// // // //   };

// // // //   const handleMultiImageChange = (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     setMultiFiles(prev => {
// // // //       const updated = [...prev];
// // // //       files.forEach(f => {
// // // //         const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
// // // //         const existing = updated.find(x => x.base === base);
// // // //         if (existing) { existing.image = f; }
// // // //         else { updated.push({ base, audio: null, image: f, title: base, artist: "", status: "pending" }); }
// // // //       });
// // // //       return [...updated];
// // // //     });
// // // //   };

// // // //   const updateMultiField = (base, field, val) => {
// // // //     setMultiFiles(p => p.map(x => x.base === base ? { ...x, [field]: val } : x));
// // // //   };

// // // //   const removeMultiFile = (base) => setMultiFiles(p => p.filter(x => x.base !== base));

// // // //   const submitMulti = async () => {
// // // //     const finalAlbum = multiAlbum === "__new__" ? multiNewAlbum.trim() : multiAlbum;
// // // //     if (!finalAlbum) { showToast("Select or create an album", "error"); return; }
// // // //     const ready = multiFiles.filter(x => x.audio && x.image && x.title.trim() && x.artist.trim());
// // // //     if (!ready.length) { showToast("Each song needs audio, image, title & artist", "error"); return; }

// // // //     setMultiUploading(true);
// // // //     let successCount = 0;

// // // //     for (const item of ready) {
// // // //       setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "uploading" } : x));
// // // //       const fd = new FormData();
// // // //       fd.append("title", item.title.trim());
// // // //       fd.append("artist", item.artist.trim());
// // // //       fd.append("album", finalAlbum);
// // // //       fd.append("audio", item.audio);
// // // //       fd.append("image", item.image);
// // // //       try {
// // // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // // //         setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "done" } : x));
// // // //         successCount++;
// // // //       } catch {
// // // //         setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "error" } : x));
// // // //       }
// // // //     }

// // // //     setMultiUploading(false);
// // // //     showToast(`${successCount}/${ready.length} songs uploaded!`);
// // // //     if (successCount > 0) { _cache = null; fetchData(true); }
// // // //   };

// // // //   // ─── Delete ───────────────────────────────────────────────────────────────
// // // //   const deleteSong = async (id) => {
// // // //     try { await axios.delete(`${API}/${id}`); showToast("Deleted"); setConfirm(null); _cache = null; fetchData(true); }
// // // //     catch { showToast("Delete failed", "error"); }
// // // //   };

// // // //   const deleteAlbum = async (name) => {
// // // //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`"${name}" deleted`); setConfirm(null); setAlbumFilter(null); _cache = null; fetchData(true); }
// // // //     catch { showToast("Album delete failed", "error"); }
// // // //   };

// // // //   const editSong = (song) => {
// // // //     setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
// // // //     setView("upload"); window.scrollTo(0, 0);
// // // //   };

// // // //   // ─── Batch JSON ───────────────────────────────────────────────────────────
// // // //   const runBatch = async () => {
// // // //     let parsed;
// // // //     try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
// // // //     if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }
// // // //     setBatchLoading(true); setBatchResults([]);
// // // //     const res = [];
// // // //     for (const item of parsed) {
// // // //       if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // // //         res.push({ title: item.title || "?", ok: false, msg: "Missing fields" }); continue;
// // // //       }
// // // //       try {
// // // //         await axios.post(`${API}/create-from-url`, item);
// // // //         res.push({ title: item.title, ok: true });
// // // //       } catch (e) { res.push({ title: item.title, ok: false, msg: e.response?.data?.message || "Failed" }); }
// // // //     }
// // // //     setBatchResults(res); setBatchLoading(false);
// // // //     const ok = res.filter(r => r.ok).length;
// // // //     showToast(`Batch: ${ok}/${parsed.length} uploaded`);
// // // //     if (ok > 0) { _cache = null; fetchData(true); }
// // // //   };

// // // //   const albumGroups = songs.reduce((a, s) => { if (!a[s.album]) a[s.album] = []; a[s.album].push(s); return a; }, {});
// // // //   const filtered = songs.filter(s => [s.title, s.artist, s.album].some(v => v.toLowerCase().includes(search.toLowerCase())));
// // // //   const viewSongs = albumFilter ? albumGroups[albumFilter] || [] : filtered;

// // // //   // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
// // // //   if (!authed) {
// // // //     return (
// // // //       <div style={l.root}>
// // // //         <style>{`
// // // //           @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// // // //           *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
// // // //           body{background:${C.bg};color:${C.text};font-family:'Plus Jakarta Sans',sans-serif;}
// // // //           @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// // // //           input:focus{outline:1px solid ${C.accent}!important;}
// // // //           input::placeholder{color:${C.muted};}
// // // //         `}</style>
// // // //         <div style={l.card}>
// // // //           <div style={l.iconBox}><Icon.Lock /></div>
// // // //           <h1 style={l.title}>Admin Panel</h1>
// // // //           <p style={l.sub}>Sign in to manage your music</p>
// // // //           {loginErr && <div style={l.errBox}>{loginErr}</div>}
// // // //           <form onSubmit={handleLogin} style={l.form}>
// // // //             <div style={l.fld}>
// // // //               <label style={l.lbl}>Username</label>
// // // //               <input style={l.inp} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus />
// // // //             </div>
// // // //             <div style={l.fld}>
// // // //               <label style={l.lbl}>Password</label>
// // // //               <div style={l.pwWrap}>
// // // //                 <input style={{ ...l.inp, paddingRight: 44 }} type={showPwd ? "text" : "password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
// // // //                 <button type="button" style={l.eyeBtn} onClick={() => setShowPwd(s => !s)}>
// // // //                   {showPwd ? <Icon.EyeOff /> : <Icon.Eye />}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //             <button style={l.btn} type="submit">Sign In</button>
// // // //           </form>
// // // //           <p style={l.hint}>Hint: try admin / vibe2024</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ─── ADMIN PANEL ──────────────────────────────────────────────────────────
// // // //   return (
// // // //     <div style={a.root}>
// // // //       <style>{`
// // // //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
// // // //         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
// // // //         button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}
// // // //         input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;}
// // // //         input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}
// // // //         input::placeholder,textarea::placeholder{color:${C.muted};}
// // // //         @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// // // //         @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
// // // //         @keyframes spin2{to{transform:rotate(360deg)}}
// // // //         .dropzone:hover{border-color:${C.accent}!important;background:${C.accentGlow}!important;}
// // // //         .song-row:hover{background:${C.card}!important;}
// // // //         .album-card:hover{border-color:${C.accent}!important;}
// // // //         @media(max-width:680px){
// // // //           .admin-layout{flex-direction:column!important;}
// // // //           .admin-sidebar{width:100%!important;flex-direction:row!important;height:auto!important;position:relative!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:10px 16px!important;overflow-x:auto!important;gap:4px!important;align-items:center!important;}
// // // //           .sidebar-logo{display:none!important;}
// // // //           .sidebar-stats{display:none!important;}
// // // //           .admin-content{padding:16px!important;}
// // // //           .form-2col{grid-template-columns:1fr!important;}
// // // //           .upload-row{flex-direction:column!important;}
// // // //           .multi-row{flex-wrap:wrap!important;}
// // // //         }
// // // //       `}</style>

// // // //       {/* Toast */}
// // // //       {toast && (
// // // //         <div style={{ ...a.toast, background: toast.type === "error" ? "#7f1d1d" : "#14532d", borderColor: toast.type === "error" ? C.error : C.success, color: toast.type === "error" ? C.error : C.success }}>
// // // //           {toast.type === "error" ? <Icon.Close /> : <Icon.Check />} {toast.msg}
// // // //         </div>
// // // //       )}

// // // //       {/* Confirm Modal */}
// // // //       {confirm && (
// // // //         <div style={a.overlay} onClick={() => setConfirm(null)}>
// // // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // // //             <h3 style={a.modalH}>Confirm Delete</h3>
// // // //             <p style={a.modalP}>{confirm.msg}</p>
// // // //             <div style={a.modalFoot}>
// // // //               <button style={a.modalNo} onClick={() => setConfirm(null)}>Cancel</button>
// // // //               <button style={a.modalYes} onClick={confirm.fn}>Delete</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <div style={a.layout} className="admin-layout">
// // // //         {/* SIDEBAR */}
// // // //         <div style={a.sidebar} className="admin-sidebar">
// // // //           <div style={a.sidebarLogo} className="sidebar-logo">⚡ Admin</div>
// // // //           <div style={a.sideStats} className="sidebar-stats">
// // // //             <div style={a.statBox}>
// // // //               <span style={a.statN}>{songs.length}</span>
// // // //               <span style={a.statL}>Songs</span>
// // // //             </div>
// // // //             <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />
// // // //             <div style={a.statBox}>
// // // //               <span style={a.statN}>{albums.length}</span>
// // // //               <span style={a.statL}>Albums</span>
// // // //             </div>
// // // //           </div>
// // // //           <div style={a.sideNav}>
// // // //             {[
// // // //               { id: "upload", Ico: Icon.Upload, label: editingId ? "Edit" : "Upload" },
// // // //               { id: "multi", Ico: Icon.Batch, label: "Multi" },
// // // //               { id: "library", Ico: Icon.List, label: "Library" },
// // // //               { id: "batch", Ico: Icon.Batch, label: "JSON" },
// // // //             ].map(({ id, Ico, label }) => (
// // // //               <button key={id} style={{ ...a.navBtn, ...(view === id ? a.navBtnActive : {}) }} onClick={() => setView(id)}>
// // // //                 <Ico /> <span>{label}</span>
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //           <button style={a.logoutBtn} onClick={logout}><Icon.Logout /> <span style={{ fontSize: 12 }}>Logout</span></button>
// // // //         </div>

// // // //         {/* CONTENT */}
// // // //         <div style={a.content} className="admin-content">

// // // //           {/* ── SINGLE UPLOAD / EDIT ── */}
// // // //           {view === "upload" && (
// // // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // // //               <div style={a.cardHead}>
// // // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // // //                 {editingId && <button style={a.cancelBtn} onClick={resetForm}><Icon.Close /> Cancel</button>}
// // // //               </div>

// // // //               <div style={a.form2col} className="form-2col">
// // // //                 <div style={a.fld}><label style={a.lbl}>Song Title *</label><input style={a.inp} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} /></div>
// // // //                 <div style={a.fld}><label style={a.lbl}>Artist *</label><input style={a.inp} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} /></div>
// // // //                 <div style={a.fld}>
// // // //                   <label style={a.lbl}>Album *</label>
// // // //                   <select style={a.inp} value={album} onChange={e => setAlbum(e.target.value)}>
// // // //                     <option value="">Select album</option>
// // // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // // //                     <option value="__new__">+ New Album</option>
// // // //                   </select>
// // // //                 </div>
// // // //                 {album === "__new__" && (
// // // //                   <div style={a.fld}><label style={a.lbl}>New Album Name *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} /></div>
// // // //                 )}
// // // //               </div>

// // // //               <div style={a.uploadRow} className="upload-row">
// // // //                 <label style={a.dropZone} className="dropzone">
// // // //                   <Icon.Music />
// // // //                   <span style={a.dzLabel}>{audio ? audio.name : "Audio File"}</span>
// // // //                   <span style={a.dzSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
// // // //                   {audio && <span style={a.dzCheck}><Icon.Check /></span>}
// // // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
// // // //                 </label>
// // // //                 <label style={a.dropZone} className="dropzone">
// // // //                   {image
// // // //                     ? <img src={URL.createObjectURL(image)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} alt="" />
// // // //                     : <Icon.Upload />
// // // //                   }
// // // //                   <span style={a.dzLabel}>{image ? image.name : "Cover Image"}</span>
// // // //                   <span style={a.dzSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
// // // //                   {image && <span style={a.dzCheck}><Icon.Check /></span>}
// // // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
// // // //                 </label>
// // // //               </div>

// // // //               <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submitSingle} disabled={loading}>
// // // //                 {loading ? <><span style={a.spinner} /> {editingId ? "Updating…" : "Uploading…"}</> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           {/* ── MULTI UPLOAD ── */}
// // // //           {view === "multi" && (
// // // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // // //               <h2 style={a.cardTitle}>📂 Upload Multiple Songs</h2>
// // // //               <p style={a.helpTxt}>Match audio + image files by the same filename (e.g. <code style={a.code}>song1.mp3</code> + <code style={a.code}>song1.jpg</code>). Or upload separately and pair them below.</p>

// // // //               <div style={a.multiAlbumRow}>
// // // //                 <div style={a.fld}>
// // // //                   <label style={a.lbl}>Album for all *</label>
// // // //                   <select style={a.inp} value={multiAlbum} onChange={e => setMultiAlbum(e.target.value)}>
// // // //                     <option value="">Select album</option>
// // // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // // //                     <option value="__new__">+ New Album</option>
// // // //                   </select>
// // // //                 </div>
// // // //                 {multiAlbum === "__new__" && (
// // // //                   <div style={a.fld}>
// // // //                     <label style={a.lbl}>Album Name *</label>
// // // //                     <input style={a.inp} value={multiNewAlbum} onChange={e => setMultiNewAlbum(e.target.value)} placeholder="New album" />
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <div style={a.multiFileRow} className="upload-row">
// // // //                 <label style={a.dropZone} className="dropzone">
// // // //                   <Icon.Music />
// // // //                   <span style={a.dzLabel}>Audio Files</span>
// // // //                   <span style={a.dzSub}>Select multiple MP3/WAV files</span>
// // // //                   <input type="file" accept="audio/*" multiple onChange={handleMultiAudioChange} style={{ display: "none" }} />
// // // //                 </label>
// // // //                 <label style={a.dropZone} className="dropzone">
// // // //                   <Icon.Upload />
// // // //                   <span style={a.dzLabel}>Cover Images</span>
// // // //                   <span style={a.dzSub}>Select multiple JPG/PNG files</span>
// // // //                   <input type="file" accept="image/*" multiple onChange={handleMultiImageChange} style={{ display: "none" }} />
// // // //                 </label>
// // // //               </div>

// // // //               {multiFiles.length > 0 && (
// // // //                 <>
// // // //                   <div style={a.multiList}>
// // // //                     {multiFiles.map(item => (
// // // //                       <div key={item.base} style={a.multiItem}>
// // // //                         <div style={a.multiItemHead}>
// // // //                           {item.image
// // // //                             ? <img src={URL.createObjectURL(item.image)} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} alt="" />
// // // //                             : <div style={a.multiImgPh}><Icon.Upload /></div>
// // // //                           }
// // // //                           <div style={{ flex: 1, minWidth: 0 }}>
// // // //                             <div style={a.multiFileName}>{item.base}</div>
// // // //                             <div style={a.multiFileStatus}>
// // // //                               <span style={{ color: item.audio ? C.success : C.error }}>{item.audio ? "✓" : "✗"} Audio</span>
// // // //                               <span style={{ marginLeft: 10, color: item.image ? C.success : C.error }}>{item.image ? "✓" : "✗"} Image</span>
// // // //                               {item.status === "done" && <span style={{ marginLeft: 10, color: C.success }}>✓ Uploaded</span>}
// // // //                               {item.status === "error" && <span style={{ marginLeft: 10, color: C.error }}>✗ Failed</span>}
// // // //                               {item.status === "uploading" && <span style={{ marginLeft: 10, color: C.accent }}>↑ Uploading…</span>}
// // // //                             </div>
// // // //                           </div>
// // // //                           <button style={a.removeBtn} onClick={() => removeMultiFile(item.base)}><Icon.Close /></button>
// // // //                         </div>
// // // //                         <div style={a.multiItemFields} className="form-2col">
// // // //                           <input style={a.inp} placeholder="Song Title *" value={item.title} onChange={e => updateMultiField(item.base, "title", e.target.value)} />
// // // //                           <input style={a.inp} placeholder="Artist *" value={item.artist} onChange={e => updateMultiField(item.base, "artist", e.target.value)} />
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                   <button style={{ ...a.btn, ...(multiUploading ? a.btnDis : {}) }} onClick={submitMulti} disabled={multiUploading}>
// // // //                     {multiUploading ? <><span style={a.spinner} /> Uploading all…</> : `↑ Upload All (${multiFiles.filter(x => x.audio && x.image).length} songs)`}
// // // //                   </button>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {/* ── LIBRARY ── */}
// // // //           {view === "library" && (
// // // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // // //               {albumFilter ? (
// // // //                 <>
// // // //                   <button style={a.backBtn} onClick={() => { setAlbumFilter(null); setSearch(""); }}>
// // // //                     <Icon.Back /> All Albums
// // // //                   </button>
// // // //                   <div style={a.albumDetailHead}>
// // // //                     <img src={albumGroups[albumFilter]?.[0]?.imageUrl} alt="" style={a.albumDetailImg} />
// // // //                     <div>
// // // //                       <div style={a.albumDetailName}>{albumFilter}</div>
// // // //                       <div style={a.albumDetailMeta}>{albumGroups[albumFilter]?.length} songs</div>
// // // //                       <button style={a.delAlbumBtnLg} onClick={() => setConfirm({ msg: `Delete album "${albumFilter}" and all ${albumGroups[albumFilter]?.length} songs?`, fn: () => deleteAlbum(albumFilter) })}>
// // // //                         <Icon.Trash /> Delete Album
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div style={a.songList}>
// // // //                     {(albumGroups[albumFilter] || []).map((s, i) => (
// // // //                       <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />
// // // //                     ))}
// // // //                   </div>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div style={a.libHead}>
// // // //                     <h2 style={a.cardTitle}>Library</h2>
// // // //                     <div style={a.searchWrap}>
// // // //                       <span style={{ color: C.muted, display: "flex" }}><Icon.Search /></span>
// // // //                       <input style={a.searchInp} placeholder="Search songs…" value={search} onChange={e => setSearch(e.target.value)} />
// // // //                       {search && <button style={a.clrBtn} onClick={() => setSearch("")}><Icon.Close /></button>}
// // // //                     </div>
// // // //                   </div>
// // // //                   {fetching ? <div style={a.loadMsg}>Loading…</div> : (
// // // //                     search ? (
// // // //                       <div style={a.songList}>
// // // //                         <div style={a.listHead}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
// // // //                         {filtered.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
// // // //                         {filtered.length === 0 && <p style={a.empty}>No songs found.</p>}
// // // //                       </div>
// // // //                     ) : (
// // // //                       <>
// // // //                         <div style={a.albumGrid}>
// // // //                           {Object.entries(albumGroups).map(([name, list]) => (
// // // //                             <div key={name} style={a.albumCard} className="album-card" onClick={() => setAlbumFilter(name)}>
// // // //                               <img src={list[0]?.imageUrl} alt="" style={a.albumCardImg} loading="lazy" />
// // // //                               <div style={a.albumCardName}>{name}</div>
// // // //                               <div style={a.albumCardMeta}>{list.length} songs</div>
// // // //                             </div>
// // // //                           ))}
// // // //                         </div>
// // // //                         <div style={{ ...a.listHead, marginTop: 28 }}>All Songs ({songs.length})</div>
// // // //                         <div style={a.songList}>
// // // //                           {songs.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
// // // //                         </div>
// // // //                       </>
// // // //                     )
// // // //                   )}
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {/* ── BATCH JSON ── */}
// // // //           {view === "batch" && (
// // // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // // //               <h2 style={a.cardTitle}>📦 Batch JSON Upload</h2>
// // // //               <p style={a.helpTxt}>Upload songs from URLs. Needs a backend endpoint <code style={a.code}>POST /api/create-from-url</code> that accepts JSON directly.</p>
// // // //               <div style={a.exBox}>
// // // //                 <div style={a.exTitle}>Format</div>
// // // //                 <pre style={a.pre}>{`[
// // // //   {
// // // //     "title": "Song Title",
// // // //     "artist": "Artist Name",
// // // //     "album": "Album Name",
// // // //     "audioUrl": "https://cdn.example.com/audio.mp3",
// // // //     "imageUrl": "https://cdn.example.com/cover.jpg"
// // // //   }
// // // // ]`}</pre>
// // // //               </div>
// // // //               <label style={a.fileLabel}>
// // // //                 <Icon.Upload /> Upload .json File
// // // //                 <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
// // // //               </label>
// // // //               <textarea style={a.ta} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
// // // //                 value={batchJson} onChange={e => setBatchJson(e.target.value)} />
// // // //               <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
// // // //                 {batchLoading ? <><span style={a.spinner} /> Processing…</> : "↑ Upload All"}
// // // //               </button>
// // // //               {batchResults.length > 0 && (
// // // //                 <div style={a.resBox}>
// // // //                   <div style={a.resHead}>{batchResults.filter(r => r.ok).length}/{batchResults.length} uploaded</div>
// // // //                   {batchResults.map((r, i) => (
// // // //                     <div key={i} style={{ ...a.resRow, borderLeft: `3px solid ${r.ok ? C.success : C.error}` }}>
// // // //                       <span style={{ color: r.ok ? C.success : C.error }}>{r.ok ? "✓" : "✗"}</span>
// // // //                       <span style={{ flex: 1, fontSize: 13 }}>{r.title}</span>
// // // //                       {r.msg && <span style={{ fontSize: 11, color: C.error }}>{r.msg}</span>}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── Song Row Component ───────────────────────────────────────────────────────
// // // // function SongRow({ song, idx, onEdit, onDelete }) {
// // // //   return (
// // // //     <div style={a.sRow} className="song-row">
// // // //       <div style={a.sRowL}>
// // // //         <span style={a.sIdx}>{idx + 1}</span>
// // // //         <img src={song.imageUrl} alt="" style={a.sImg} loading="lazy" />
// // // //         <div style={a.sInfo}>
// // // //           <div style={a.sTitle}>{song.title}</div>
// // // //           <div style={a.sMeta}>{song.artist} · {song.album}</div>
// // // //         </div>
// // // //       </div>
// // // //       <div style={a.sActs}>
// // // //         <button style={a.sEdit} onClick={() => onEdit(song)}><Icon.Edit /></button>
// // // //         <button style={a.sDel} onClick={() => onDelete(song._id)}><Icon.Trash /></button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ─── LOGIN STYLES ──────────────────────────────────────────────────────────────
// // // // const l = {
// // // //   root: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" },
// // // //   card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.3s ease" },
// // // //   iconBox: { width: 52, height: 52, borderRadius: 14, background: C.accentGlow, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: C.accent },
// // // //   title: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6, color: C.text },
// // // //   sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
// // // //   errBox: { background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 18 },
// // // //   form: { display: "flex", flexDirection: "column", gap: 16 },
// // // //   fld: { display: "flex", flexDirection: "column", gap: 6 },
// // // //   lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.7 },
// // // //   inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },
// // // //   pwWrap: { position: "relative" },
// // // //   eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.sub, display: "flex" },
// // // //   btn: { marginTop: 8, padding: 14, borderRadius: 12, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,107,53,0.3)" },
// // // //   hint: { marginTop: 20, fontSize: 12, color: C.muted, textAlign: "center" },
// // // // };

// // // // // ─── ADMIN STYLES ─────────────────────────────────────────────────────────────
// // // // const a = {
// // // //   root: { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", position: "relative" },

// // // //   toast: { position: "fixed", top: 70, right: 16, padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8, border: "1px solid", animation: "slideIn 0.25s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },

// // // //   overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // // //   modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
// // // //   modalH: { fontSize: 17, fontWeight: 800, marginBottom: 8, color: C.text },
// // // //   modalP: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
// // // //   modalFoot: { display: "flex", gap: 10, justifyContent: "flex-end" },
// // // //   modalNo: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600 },
// // // //   modalYes: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", fontSize: 13, fontWeight: 700 },

// // // //   layout: { display: "flex", minHeight: "100vh" },
// // // //   sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "22px 14px", display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 58, height: "calc(100vh - 58px)", flexShrink: 0, overflowY: "auto" },
// // // //   sidebarLogo: { fontSize: 17, fontWeight: 800, color: C.accent, padding: "0 8px", marginBottom: 14, letterSpacing: "-0.02em" },
// // // //   sideStats: { display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 14, overflow: "hidden" },
// // // //   statBox: { flex: 1, textAlign: "center", padding: "12px 8px" },
// // // //   statN: { display: "block", fontSize: 18, fontWeight: 800, color: C.accent },
// // // //   statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
// // // //   sideNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
// // // //   navBtn: { display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.sub, fontSize: 13, fontWeight: 600, textAlign: "left" },
// // // //   navBtnActive: { background: C.accentGlow, color: C.accent, border: `1px solid ${C.accentBorder}` },
// // // //   logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.muted, fontSize: 13, marginTop: "auto" },

// // // //   content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },
// // // //   cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
// // // //   cardTitle: { fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 },
// // // //   cancelBtn: { display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 12, fontWeight: 600 },
// // // //   backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600, marginBottom: 20 },

// // // //   form2col: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
// // // //   fld: { display: "flex", flexDirection: "column", gap: 6 },
// // // //   lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6 },
// // // //   inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },

// // // //   uploadRow: { display: "flex", gap: 14, marginBottom: 20 },
// // // //   dropZone: {
// // // //     flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px",
// // // //     display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
// // // //     cursor: "pointer", background: C.bg, transition: "border 0.2s, background 0.2s", color: C.sub, position: "relative",
// // // //   },
// // // //   dzLabel: { fontSize: 13, fontWeight: 600, color: C.text, textAlign: "center" },
// // // //   dzSub: { fontSize: 11, color: C.muted },
// // // //   dzCheck: { position: "absolute", top: 10, right: 10, color: C.success },

// // // //   btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(255,107,53,0.25)" },
// // // //   btnDis: { opacity: 0.5, cursor: "not-allowed" },
// // // //   spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

// // // //   multiAlbumRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
// // // //   multiFileRow: { display: "flex", gap: 14, marginBottom: 20 },
// // // //   multiList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 },
// // // //   multiItem: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 },
// // // //   multiItemHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
// // // //   multiImgPh: { width: 40, height: 40, borderRadius: 8, background: C.dim, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, flexShrink: 0 },
// // // //   multiFileName: { fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // //   multiFileStatus: { fontSize: 11, marginTop: 2 },
// // // //   multiItemFields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
// // // //   removeBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, display: "flex", flexShrink: 0 },

// // // //   helpTxt: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
// // // //   code: { fontFamily: "'JetBrains Mono',monospace", background: C.dim, padding: "2px 6px", borderRadius: 4, fontSize: 11, color: C.accent },
// // // //   exBox: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
// // // //   exTitle: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 700 },
// // // //   pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
// // // //   fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 14 },
// // // //   ta: { width: "100%", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 12, resize: "vertical", lineHeight: 1.7, marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" },
// // // //   resBox: { marginTop: 18, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
// // // //   resHead: { padding: "10px 16px", background: C.dim, fontSize: 12, fontWeight: 700, borderBottom: `1px solid ${C.border}`, color: C.sub },
// // // //   resRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },

// // // //   libHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
// // // //   searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
// // // //   searchInp: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", width: 160 },
// // // //   clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
// // // //   loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

// // // //   albumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14, marginBottom: 10 },
// // // //   albumCard: { cursor: "pointer", borderRadius: 12, overflow: "hidden", background: C.card, border: `1px solid ${C.border}`, transition: "border-color 0.2s" },
// // // //   albumCardImg: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
// // // //   albumCardName: { padding: "9px 10px 3px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // //   albumCardMeta: { padding: "0 10px 9px", fontSize: 11, color: C.sub },

// // // //   albumDetailHead: { display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-end", flexWrap: "wrap" },
// // // //   albumDetailImg: { width: 100, height: 100, borderRadius: 12, objectFit: "cover", flexShrink: 0 },
// // // //   albumDetailName: { fontSize: 22, fontWeight: 800, marginBottom: 4 },
// // // //   albumDetailMeta: { fontSize: 13, color: C.sub, marginBottom: 14 },
// // // //   delAlbumBtnLg: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.07)", color: C.error, fontSize: 13, fontWeight: 600 },

// // // //   listHead: { fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "0 4px 10px" },
// // // //   songList: { display: "flex", flexDirection: "column", gap: 4 },
// // // //   sRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, transition: "background 0.12s", gap: 12 },
// // // //   sRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
// // // //   sIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
// // // //   sImg: { width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
// // // //   sInfo: { minWidth: 0 },
// // // //   sTitle: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // //   sMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // //   sActs: { display: "flex", gap: 8, flexShrink: 0 },
// // // //   sEdit: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", color: C.sub, display: "flex" },
// // // //   sDel: { padding: "7px 10px", borderRadius: 7, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)", color: C.error, display: "flex" },
// // // //   empty: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },
// // // // };
// // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // import axios from "axios";
// // // import { useTheme } from "../../App";
// // // import {
// // //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// // //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash, FaPalette
// // // } from "react-icons/fa";

// // // const API = "https://music-app-f9t7.onrender.com/api";

// // // const ADMINS = { "admin": "vibe2024", "revanth": "revv@123", "superadmin": "music#999" };

// // // let _cache = null;

// // // const THEMES = {
// // //   Amber: { bg:"#0f0f12",surface:"#18181b",card:"#1f1f23",border:"#2a2a2f",accent:"#f59e0b",accentDim:"rgba(245,158,11,0.08)",accentBorder:"rgba(245,158,11,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // //   Purple: { bg:"#0d0d14",surface:"#16162a",card:"#1e1e35",border:"#2d2d4a",accent:"#a855f7",accentDim:"rgba(168,85,247,0.08)",accentBorder:"rgba(168,85,247,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // //   Cyan:   { bg:"#020f12",surface:"#071a1f",card:"#0c2530",border:"#0e3040",accent:"#06b6d4",accentDim:"rgba(6,182,212,0.08)",accentBorder:"rgba(6,182,212,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // //   Rose:   { bg:"#120a0a",surface:"#1c1010",card:"#261515",border:"#3a1f1f",accent:"#f43f5e",accentDim:"rgba(244,63,94,0.08)",accentBorder:"rgba(244,63,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#fbbf24",success:"#22c55e" },
// // //   Green:  { bg:"#090f0a",surface:"#101a10",card:"#162416",border:"#1e3520",accent:"#22c55e",accentDim:"rgba(34,197,94,0.08)",accentBorder:"rgba(34,197,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // };
// // // const THEME_NAMES = Object.keys(THEMES);

// // // const SkeletonRow = ({ C }) => (
// // //   <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,marginBottom:3}}>
// // //     <div style={{width:20,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //     <div style={{width:40,height:40,borderRadius:6,background:C.border,animation:"shimmer 1.4s infinite",flexShrink:0}}/>
// // //     <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
// // //       <div style={{width:"60%",height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //       <div style={{width:"40%",height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //     </div>
// // //   </div>
// // // );

// // // const SkeletonAlbum = ({ C }) => (
// // //   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:8}}>
// // //     <div style={{display:"flex",alignItems:"center",gap:12}}>
// // //       <div style={{width:42,height:42,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //       <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // //         <div style={{width:120,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //         <div style={{width:70,height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //       </div>
// // //     </div>
// // //     <div style={{width:80,height:28,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // //   </div>
// // // );

// // // export default function AdminPanel() {
// // //   const [themeName, setThemeName] = useState(() => localStorage.getItem("vo_admin_theme") || "Amber");
// // //   const [showThemePicker, setShowThemePicker] = useState(false);
// // //   const C = THEMES[themeName] || THEMES.Amber;
// // //   const pickTheme = (n) => { setThemeName(n); localStorage.setItem("vo_admin_theme", n); setShowThemePicker(false); };

// // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// // //   const [loginUser, setLoginUser] = useState("");
// // //   const [loginPass, setLoginPass] = useState("");
// // //   const [showPass, setShowPass] = useState(false);
// // //   const [loginErr, setLoginErr] = useState("");

// // //   const [songs, setSongs] = useState([]);
// // //   const [albums, setAlbums] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [fetchLoading, setFetchLoading] = useState(true);
// // //   const [view, setView] = useState("upload");
// // //   const [search, setSearch] = useState("");
// // //   const [toast, setToast] = useState(null);
// // //   const [confirm, setConfirm] = useState(null);
// // //   const [editingId, setEditingId] = useState(null);

// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [album, setAlbum] = useState("");
// // //   const [newAlbum, setNewAlbum] = useState("");
// // //   const [audio, setAudio] = useState(null);
// // //   const [image, setImage] = useState(null);
// // //   const audioRef = useRef(null);
// // //   const imageRef = useRef(null);

// // //   const [bulkItems, setBulkItems] = useState([{ title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // //   const [batchLoading, setBatchLoading] = useState(false);
// // //   const [batchResults, setBatchResults] = useState([]);
// // //   const [batchProgress, setBatchProgress] = useState(0);

// // //   const handleLogin = (e) => {
// // //     e.preventDefault(); setLoginErr("");
// // //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// // //     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
// // //     else setLoginErr("Invalid username or password.");
// // //   };

// // //   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };

// // //   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

// // //   const fetchData = useCallback(async (force = false) => {
// // //     setFetchLoading(true);
// // //     try {
// // //       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
// // //       const res = await axios.get(`${API}/`);
// // //       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
// // //     } catch { showToast("Failed to fetch songs", "error"); }
// // //     finally { setFetchLoading(false); }
// // //   }, []);

// // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // //   const resetForm = () => {
// // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
// // //     if (audioRef.current) audioRef.current.value = "";
// // //     if (imageRef.current) imageRef.current.value = "";
// // //   };

// // //   const submit = async () => {
// // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
// // //     const fd = new FormData();
// // //     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
// // //     if (audio) fd.append("audio", audio);
// // //     if (image) fd.append("image", image);
// // //     setLoading(true);
// // //     try {
// // //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// // //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// // //       resetForm(); _cache = null; fetchData(true);
// // //     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
// // //     finally { setLoading(false); }
// // //   };

// // //   const deleteSong = async (id) => {
// // //     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
// // //     catch { showToast("Delete failed", "error"); }
// // //   };

// // //   const deleteAlbum = async (name) => {
// // //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
// // //     catch { showToast("Album delete failed", "error"); }
// // //   };

// // //   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

// // //   const addBulkItem = () => setBulkItems(p => [...p, { title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // //   const removeBulkItem = (i) => setBulkItems(p => p.filter((_,idx) => idx !== i));
// // //   const updateBulkItem = (i, k, v) => setBulkItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

// // //   const runBulkUpload = async () => {
// // //     for (let i = 0; i < bulkItems.length; i++) {
// // //       const item = bulkItems[i];
// // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // //       if (!item.title || !item.artist || !fa) { showToast(`Item ${i+1}: Title, Artist, Album required`, "error"); return; }
// // //       if (!item.audio || !item.image) { showToast(`Item ${i+1}: Audio & Image required`, "error"); return; }
// // //     }
// // //     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
// // //     const results = [];
// // //     for (let i = 0; i < bulkItems.length; i++) {
// // //       const item = bulkItems[i];
// // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // //       const fd = new FormData();
// // //       fd.append("title", item.title.trim()); fd.append("artist", item.artist.trim()); fd.append("album", fa);
// // //       fd.append("audio", item.audio); fd.append("image", item.image);
// // //       try {
// // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // //         results.push({ title: item.title, status: "ok" });
// // //       } catch (err) {
// // //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// // //       }
// // //       setBatchProgress(Math.round(((i+1)/bulkItems.length)*100));
// // //       setBatchResults([...results]);
// // //     }
// // //     setBatchLoading(false);
// // //     const ok = results.filter(r => r.status === "ok").length;
// // //     showToast(`Bulk: ${ok}/${bulkItems.length} uploaded`, ok === bulkItems.length ? "success" : "error");
// // //     if (ok > 0) { _cache = null; fetchData(true); }
// // //   };

// // //   const filtered = songs.filter(s =>
// // //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// // //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// // //     s.album.toLowerCase().includes(search.toLowerCase())
// // //   );
// // //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
// // //   const a = makeStyles(C);

// // //   if (!authed) {
// // //     return (
// // //       <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
// // //         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:1px solid ${C.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
// // //         <div style={{width:"100%",maxWidth:400,background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"36px 32px",animation:"fadeUp 0.35s ease"}}>
// // //           <div style={{width:52,height:52,borderRadius:14,background:C.accentDim,border:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><FaLock size={22} color={C.accent}/></div>
// // //           <h1 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:6}}>Admin Access</h1>
// // //           <p style={{fontSize:13,color:C.sub,marginBottom:28}}>Enter your credentials to continue</p>
// // //           {loginErr && <div style={{background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.3)",color:C.error,fontSize:13,padding:"10px 14px",borderRadius:10,marginBottom:20}}>{loginErr}</div>}
// // //           <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:16}}>
// // //             {[{label:"Username",type:"text",val:loginUser,set:setLoginUser,icon:<FaUser size={13} color={C.muted}/>},{label:"Password",type:showPass?"text":"password",val:loginPass,set:setLoginPass,icon:<FaLock size={13} color={C.muted}/>}].map(({label,type,val,set,icon},i)=>(
// // //               <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // //                 <label style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
// // //                 <div style={{display:"flex",alignItems:"center",gap:10,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
// // //                   {icon}
// // //                   <input style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14,color:C.text,fontFamily:"'Outfit',sans-serif"}} type={type} value={val} onChange={e=>set(e.target.value)} autoFocus={i===0}/>
// // //                   {i===1&&<button type="button" style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:0}} onClick={()=>setShowPass(!showPass)}>{showPass?<FaEyeSlash size={13} color={C.muted}/>:<FaEye size={13} color={C.muted}/>}</button>}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             <button type="submit" style={{marginTop:8,padding:"13px",borderRadius:12,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Sign In →</button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={a.root}>
// // //       <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}input::placeholder,textarea::placeholder{color:${C.muted};}select option{background:${C.card};color:${C.text};}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin2{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}@media(max-width:640px){.al{flex-direction:column!important;}.sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}.sl{display:none!important;}.ss{display:none!important;}.sn{flex-direction:row!important;gap:4px!important;flex:1!important;}.ni{padding:8px 14px!important;font-size:12px!important;}.fg{grid-template-columns:1fr!important;}.ur{flex-direction:column!important;}}`}</style>

// // //       {toast&&<div style={{...a.toast,background:toast.type==="error"?C.error:C.success,animation:"slideIn 0.25s ease"}}>{toast.type==="error"?"✗":"✓"} {toast.msg}</div>}

// // //       {confirm&&(
// // //         <div style={a.overlay} onClick={()=>setConfirm(null)}>
// // //           <div style={a.modal} onClick={e=>e.stopPropagation()}>
// // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.text}}>Confirm Delete</h3>
// // //             <p style={{fontSize:13,color:C.sub,marginBottom:24,lineHeight:1.6}}>{confirm.msg}</p>
// // //             <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
// // //               <button style={a.mCancel} onClick={()=>setConfirm(null)}>Cancel</button>
// // //               <button style={a.mDelete} onClick={confirm.action}>Delete</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {showThemePicker&&(
// // //         <div style={a.overlay} onClick={()=>setShowThemePicker(false)}>
// // //           <div style={{...a.modal,maxWidth:320}} onClick={e=>e.stopPropagation()}>
// // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:C.text}}>Choose Theme</h3>
// // //             <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
// // //               {THEME_NAMES.map(n=>(
// // //                 <button key={n} onClick={()=>pickTheme(n)} style={{padding:"8px 18px",borderRadius:8,border:`2px solid ${themeName===n?THEMES[n].accent:THEMES[n].border}`,background:THEMES[n].surface,color:THEMES[n].accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13}}>{n}</button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div style={a.layout} className="al">
// // //         <div style={a.sidebar} className="sb">
// // //           <div style={{fontSize:17,fontWeight:700,color:C.accent,padding:"0 8px",marginBottom:16}} className="sl">⚡ Admin</div>
// // //           <div style={{display:"flex",gap:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}} className="ss">
// // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{songs.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Songs</span></div>
// // //             <div style={{width:1,background:C.border}}/>
// // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{albums.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Albums</span></div>
// // //           </div>
// // //           <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}} className="sn">
// // //             {[{id:"upload",icon:<FaUpload size={13}/>,label:editingId?"Edit":"Upload"},{id:"library",icon:<FaList size={13}/>,label:"Library"},{id:"batch",icon:<FaCloudUploadAlt size={14}/>,label:"Bulk"}].map(t=>(
// // //               <button key={t.id} style={{...a.navItem,...(view===t.id?a.navItemActive:{})}} className="ni" onClick={()=>setView(t.id)}>{t.icon} {t.label}</button>
// // //             ))}
// // //           </div>
// // //           <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.accent,fontSize:13,background:C.accentDim,border:`1px solid ${C.accentBorder}`,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setShowThemePicker(true)}><FaPalette size={13}/> Theme</button>
// // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,background:"none",border:"none",fontFamily:"'Outfit',sans-serif"}} onClick={logout}><FaSignOutAlt size={13}/> Logout</button>
// // //           </div>
// // //         </div>

// // //         <div style={{flex:1,padding:"28px 24px",maxWidth:800,overflowY:"auto"}}>
// // //           {view==="upload"&&(
// // //             <div style={a.card}>
// // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
// // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
// // //                 {editingId&&<button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// // //               </div>
// // //               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}} className="fg">
// // //                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i)=>(
// // //                   <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // //                     <label style={a.label}>{label}</label>
// // //                     <input style={a.inp} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
// // //                   </div>
// // //                 ))}
// // //                 <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // //                   <label style={a.label}>Album *</label>
// // //                   <select style={a.inp} value={album} onChange={e=>setAlbum(e.target.value)}>
// // //                     <option value="">Select album</option>
// // //                     {albums.map((al,i)=><option key={i} value={al}>{al}</option>)}
// // //                     <option value="__new__">+ New Album</option>
// // //                   </select>
// // //                 </div>
// // //                 {album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e=>setNewAlbum(e.target.value)}/></div>}
// // //               </div>
// // //               <div style={{display:"flex",gap:16,marginBottom:24}} className="ur">
// // //                 <label style={{...a.dz,...(audio?a.dzF:{})}}>
// // //                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
// // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{audio?audio.name:"Upload Audio File"}</span>
// // //                   <span style={{fontSize:11,color:C.muted}}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
// // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e=>setAudio(e.target.files[0])} style={{display:"none"}}/>
// // //                 </label>
// // //                 <label style={{...a.dz,...(image?a.dzF:{})}}>
// // //                   {image?<img src={URL.createObjectURL(image)} alt="" style={{width:48,height:48,borderRadius:8,objectFit:"cover"}}/>:<FaUpload size={20} color={C.muted}/>}
// // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{image?image.name:"Upload Cover Image"}</span>
// // //                   <span style={{fontSize:11,color:C.muted}}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
// // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} style={{display:"none"}}/>
// // //                 </label>
// // //               </div>
// // //               <button style={{...a.btn,...(loading?a.btnD:{})}} onClick={submit} disabled={loading}>
// // //                 {loading?<><span style={a.spin}/>{editingId?"Updating...":"Uploading..."}</>:editingId?"✓ Update Song":"↑ Upload Song"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {view==="library"&&(
// // //             <div style={{animation:"fadeUp 0.25s ease"}}>
// // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
// // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>Library</h2>
// // //                 <div style={{display:"flex",alignItems:"center",gap:8,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px"}}>
// // //                   <FaSearch size={12} color={C.muted}/>
// // //                   <input style={{border:"none",outline:"none",fontSize:13,color:C.text,background:"none",fontFamily:"'Outfit',sans-serif",width:160}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
// // //                   {search&&<button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex"}} onClick={()=>setSearch("")}><FaTimes size={11}/></button>}
// // //                 </div>
// // //               </div>
// // //               {fetchLoading?(
// // //                 <div>
// // //                   {[...Array(3)].map((_,i)=><SkeletonAlbum key={i} C={C}/>)}
// // //                   <div style={{marginTop:16}}>{[...Array(6)].map((_,i)=><SkeletonRow key={i} C={C}/>)}</div>
// // //                 </div>
// // //               ):(
// // //                 <>
// // //                   {!search&&Object.entries(albumGroups).length>0&&(
// // //                     <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
// // //                       {Object.entries(albumGroups).map(([name,list])=>(
// // //                         <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12}}>
// // //                           <div style={{display:"flex",alignItems:"center",gap:12}}>
// // //                             <img src={list[0]?.imageUrl} alt="" style={{width:42,height:42,borderRadius:8,objectFit:"cover"}} loading="lazy"/>
// // //                             <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{name}</div><div style={{fontSize:11,color:C.sub}}>{list.length} songs</div></div>
// // //                           </div>
// // //                           <button style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",color:C.error,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setConfirm({msg:`Delete album "${name}" and all ${list.length} songs?`,action:()=>deleteAlbum(name)})}>
// // //                             <FaTrash size={11}/> Album
// // //                           </button>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                   <div style={{display:"flex",flexDirection:"column",gap:3}}>
// // //                     <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:0.6,padding:"0 4px 10px"}}>{search?`${filtered.length} result${filtered.length!==1?"s":""}`:`All Songs (${songs.length})`}</div>
// // //                     {filtered.map((s,i)=>(
// // //                       <div key={s._id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,gap:12}}>
// // //                         <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1}}>
// // //                           <span style={{fontSize:11,color:C.muted,width:20,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{i+1}</span>
// // //                           <img src={s.imageUrl} alt="" style={{width:40,height:40,borderRadius:6,objectFit:"cover",flexShrink:0}} loading="lazy"/>
// // //                           <div style={{minWidth:0}}>
// // //                             <div style={{fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title}</div>
// // //                             <div style={{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.artist} · {s.album}</div>
// // //                           </div>
// // //                         </div>
// // //                         <div style={{display:"flex",gap:8,flexShrink:0}}>
// // //                           <button style={{padding:"7px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:"none",cursor:"pointer",color:C.sub,display:"flex"}} onClick={()=>editSong(s)}><FaEdit size={12}/></button>
// // //                           <button style={{padding:"7px 10px",borderRadius:7,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",cursor:"pointer",color:C.error,display:"flex"}} onClick={()=>setConfirm({msg:`Delete "${s.title}"?`,action:()=>deleteSong(s._id)})}><FaTrash size={12}/></button>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                     {filtered.length===0&&<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:32}}>No songs found.</p>}
// // //                   </div>
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {view==="batch"&&(
// // //             <div style={a.card}>
// // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
// // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>📦 Bulk Upload Songs</h2>
// // //                 <button style={a.cancelBtn} onClick={addBulkItem}>+ Add Song</button>
// // //               </div>
// // //               <p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:20}}>Add multiple songs below. Each needs title, artist, album, audio file and cover image. Uploaded one-by-one to the server.</p>

// // //               {bulkItems.map((item,i)=>(
// // //                 <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:14}}>
// // //                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
// // //                     <span style={{fontSize:12,fontWeight:700,color:C.accent}}>Song {i+1}</span>
// // //                     {bulkItems.length>1&&<button onClick={()=>removeBulkItem(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.error,display:"flex"}}><FaTimes size={13}/></button>}
// // //                   </div>
// // //                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}} className="fg">
// // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Title *</label><input style={a.inp} placeholder="Song title" value={item.title} onChange={e=>updateBulkItem(i,"title",e.target.value)}/></div>
// // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Artist *</label><input style={a.inp} placeholder="Artist" value={item.artist} onChange={e=>updateBulkItem(i,"artist",e.target.value)}/></div>
// // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // //                       <label style={a.label}>Album *</label>
// // //                       <select style={a.inp} value={item.album} onChange={e=>updateBulkItem(i,"album",e.target.value)}>
// // //                         <option value="">Select album</option>
// // //                         {albums.map((al,ai)=><option key={ai} value={al}>{al}</option>)}
// // //                         <option value="__new__">+ New Album</option>
// // //                       </select>
// // //                     </div>
// // //                     {item.album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={item.newAlbum||""} onChange={e=>updateBulkItem(i,"newAlbum",e.target.value)}/></div>}
// // //                   </div>
// // //                   <div style={{display:"flex",gap:10}} className="ur">
// // //                     <label style={{...a.dz,flex:1,...(item.audio?a.dzF:{})}}>
// // //                       <FaMusic size={16} color={item.audio?C.accent:C.muted}/>
// // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.audio?item.audio.name:"Audio File"}</span>
// // //                       <span style={{fontSize:10,color:C.muted}}>{item.audio?`${(item.audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV"}</span>
// // //                       <input type="file" accept="audio/*" onChange={e=>updateBulkItem(i,"audio",e.target.files[0])} style={{display:"none"}}/>
// // //                     </label>
// // //                     <label style={{...a.dz,flex:1,...(item.image?a.dzF:{})}}>
// // //                       {item.image?<img src={URL.createObjectURL(item.image)} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover"}}/>:<FaUpload size={16} color={C.muted}/>}
// // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.image?item.image.name:"Cover Image"}</span>
// // //                       <span style={{fontSize:10,color:C.muted}}>{item.image?`${(item.image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG"}</span>
// // //                       <input type="file" accept="image/*" onChange={e=>updateBulkItem(i,"image",e.target.files[0])} style={{display:"none"}}/>
// // //                     </label>
// // //                   </div>
// // //                 </div>
// // //               ))}

// // //               <button style={{...a.cancelBtn,display:"flex",alignItems:"center",gap:8,marginBottom:14,width:"100%",justifyContent:"center",padding:"10px"}} onClick={addBulkItem}>+ Add Another Song</button>

// // //               {batchLoading&&(
// // //                 <div style={{marginBottom:16}}>
// // //                   <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}><span>Uploading...</span><span>{batchProgress}%</span></div>
// // //                   <div style={{height:6,background:C.border,borderRadius:4,overflow:"hidden"}}>
// // //                     <div style={{height:"100%",width:`${batchProgress}%`,background:C.accent,borderRadius:4,transition:"width 0.3s ease"}}/>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               <button style={{...a.btn,...(batchLoading?a.btnD:{})}} onClick={runBulkUpload} disabled={batchLoading}>
// // //                 {batchLoading?<><span style={a.spin}/>Uploading...</>:`↑ Upload All (${bulkItems.length})`}
// // //               </button>

// // //               {batchResults.length>0&&(
// // //                 <div style={{marginTop:20,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
// // //                   <div style={{padding:"10px 16px",background:C.card,fontSize:12,fontWeight:700,color:C.sub,borderBottom:`1px solid ${C.border}`}}>{batchResults.filter(r=>r.status==="ok").length}/{batchResults.length} uploaded</div>
// // //                   {batchResults.map((r,i)=>(
// // //                     <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.text,borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}`}}>
// // //                       <span style={{color:r.status==="ok"?C.accent:C.error}}>{r.status==="ok"?"✓":"✗"}</span>
// // //                       <span style={{flex:1}}>{r.title}</span>
// // //                       {r.error&&<span style={{fontSize:11,color:C.error}}>{r.error}</span>}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function makeStyles(C) {
// // //   return {
// // //     root:{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,position:"relative"},
// // //     toast:{position:"fixed",top:80,right:20,padding:"12px 18px",borderRadius:10,color:"#0f0f0f",fontSize:13,fontWeight:700,zIndex:9999,display:"flex",alignItems:"center",gap:8},
// // //     overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:20},
// // //     modal:{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,maxWidth:360,width:"100%"},
// // //     mCancel:{padding:"9px 20px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:13,fontFamily:"'Outfit',sans-serif"},
// // //     mDelete:{padding:"9px 20px",borderRadius:8,border:"none",background:C.error,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Outfit',sans-serif"},
// // //     layout:{display:"flex",minHeight:"100vh"},
// // //     sidebar:{width:200,background:C.surface,borderRight:`1px solid ${C.border}`,padding:"24px 14px",display:"flex",flexDirection:"column",gap:8,position:"sticky",top:0,height:"100vh",flexShrink:0},
// // //     navItem:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,fontWeight:500,background:"none",border:"none",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
// // //     navItemActive:{background:C.accentDim,color:C.accent,border:`1px solid ${C.accentBorder}`},
// // //     card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:28,marginBottom:24,animation:"fadeUp 0.25s ease"},
// // //     cancelBtn:{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"},
// // //     label:{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.5},
// // //     inp:{padding:"11px 14px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:14,fontFamily:"'Outfit',sans-serif",color:C.text,background:C.card},
// // //     dz:{flex:1,border:`1.5px dashed ${C.border}`,borderRadius:12,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",background:C.bg,transition:"border 0.2s"},
// // //     dzF:{borderColor:C.accent,background:C.accentDim},
// // //     btn:{width:"100%",padding:14,borderRadius:10,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Outfit',sans-serif"},
// // //     btnD:{opacity:0.5,cursor:"not-allowed"},
// // //     spin:{width:14,height:14,border:"2px solid rgba(0,0,0,0.2)",borderTopColor:"#0f0f0f",borderRadius:"50%",animation:"spin2 0.8s linear infinite",display:"inline-block"},
// // //   };
// // // }
// // import React, { useState, useEffect, useRef, useCallback } from "react";
// // import axios from "axios";
// // import { useTheme } from "../../App";
// // import {
// //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
// // } from "react-icons/fa";

// // const API = "https://music-app-f9t7.onrender.com/api";
// // const ADMINS = { "admin":"vibe2024", "revanth":"revv@123", "superadmin":"music#999" };
// // let _cache = null;

// // const SkeletonRow = ({ C }) => (
// //   <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, marginBottom:3 }}>
// //     <div style={{ width:20, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //     <div style={{ width:40, height:40, borderRadius:6, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
// //     <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
// //       <div style={{ width:"60%", height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //       <div style={{ width:"40%", height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //     </div>
// //   </div>
// // );

// // const SkeletonAlbum = ({ C }) => (
// //   <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:8 }}>
// //     <div style={{ display:"flex", alignItems:"center", gap:12 }}>
// //       <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //       <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //         <div style={{ width:120, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //         <div style={{ width:70, height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //       </div>
// //     </div>
// //     <div style={{ width:80, height:28, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
// //   </div>
// // );

// // export default function AdminPanel() {
// //   const { C } = useTheme();

// //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// //   const [loginUser, setLoginUser] = useState("");
// //   const [loginPass, setLoginPass] = useState("");
// //   const [showPass, setShowPass] = useState(false);
// //   const [loginErr, setLoginErr] = useState("");

// //   const [songs, setSongs] = useState([]);
// //   const [albums, setAlbums] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [view, setView] = useState("upload");
// //   const [search, setSearch] = useState("");
// //   const [toast, setToast] = useState(null);
// //   const [confirm, setConfirm] = useState(null);
// //   const [editingId, setEditingId] = useState(null);

// //   const [title, setTitle] = useState("");
// //   const [artist, setArtist] = useState("");
// //   const [album, setAlbum] = useState("");
// //   const [newAlbum, setNewAlbum] = useState("");
// //   const [audio, setAudio] = useState(null);
// //   const [image, setImage] = useState(null);
// //   const audioRef = useRef(null);
// //   const imageRef = useRef(null);

// //   // ── BULK STATE ──
// //   const [batchJson, setBatchJson] = useState("");
// //   const [batchMeta, setBatchMeta] = useState([]); // parsed JSON metadata
// //   const [batchAudioFiles, setBatchAudioFiles] = useState({}); // { filename: File }
// //   const [batchImageFiles, setBatchImageFiles] = useState({}); // { filename: File }
// //   const [batchLoading, setBatchLoading] = useState(false);
// //   const [batchResults, setBatchResults] = useState([]);
// //   const [batchProgress, setBatchProgress] = useState(0);
// //   const [batchError, setBatchError] = useState("");
// //   const [batchMatched, setBatchMatched] = useState([]); // matched items preview

// //   const handleLogin = (e) => {
// //     e.preventDefault(); setLoginErr("");
// //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// //     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
// //     else setLoginErr("Invalid username or password.");
// //   };

// //   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };
// //   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

// //   const fetchData = useCallback(async (force = false) => {
// //     setFetchLoading(true);
// //     try {
// //       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
// //       const res = await axios.get(`${API}/`);
// //       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
// //     } catch { showToast("Failed to fetch songs", "error"); }
// //     finally { setFetchLoading(false); }
// //   }, []);

// //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// //   const resetForm = () => {
// //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
// //     if (audioRef.current) audioRef.current.value = "";
// //     if (imageRef.current) imageRef.current.value = "";
// //   };

// //   const submit = async () => {
// //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
// //     const fd = new FormData();
// //     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
// //     if (audio) fd.append("audio", audio);
// //     if (image) fd.append("image", image);
// //     setLoading(true);
// //     try {
// //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } }); showToast("Song uploaded!"); }
// //       resetForm(); _cache = null; fetchData(true);
// //     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
// //     finally { setLoading(false); }
// //   };

// //   const deleteSong = async (id) => {
// //     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
// //     catch { showToast("Delete failed", "error"); }
// //   };

// //   const deleteAlbum = async (name) => {
// //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
// //     catch { showToast("Album delete failed", "error"); }
// //   };

// //   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

// //   // ── BULK: Parse JSON ──
// //   const parseJson = (text) => {
// //     setBatchError("");
// //     setBatchMeta([]);
// //     setBatchMatched([]);
// //     if (!text.trim()) return;
// //     try {
// //       const parsed = JSON.parse(text);
// //       if (!Array.isArray(parsed)) { setBatchError("JSON must be an array [ ... ]"); return; }
// //       setBatchMeta(parsed);
// //       recomputeMatches(parsed, batchAudioFiles, batchImageFiles);
// //     } catch (e) {
// //       setBatchError("Invalid JSON: " + e.message);
// //     }
// //   };

// //   // ── BULK: Match files to metadata by filename ──
// //   const recomputeMatches = (meta, audioFiles, imageFiles) => {
// //     const matched = meta.map((item, i) => {
// //       const audioFile = audioFiles[item.audioFile] || null;
// //       const imageFile = imageFiles[item.imageFile] || null;
// //       return { ...item, audioFile, imageFile, index: i };
// //     });
// //     setBatchMatched(matched);
// //   };

// //   const handleAudioFiles = (files) => {
// //     const map = {};
// //     Array.from(files).forEach(f => { map[f.name] = f; });
// //     setBatchAudioFiles(map);
// //     if (batchMeta.length) recomputeMatches(batchMeta, map, batchImageFiles);
// //   };

// //   const handleImageFiles = (files) => {
// //     const map = {};
// //     Array.from(files).forEach(f => { map[f.name] = f; });
// //     setBatchImageFiles(map);
// //     if (batchMeta.length) recomputeMatches(batchMeta, batchAudioFiles, map);
// //   };

// //   // ── BULK: Upload all ──
// //   const runBulkUpload = async () => {
// //     if (!batchMatched.length) { showToast("No songs to upload", "error"); return; }
// //     const unmatched = batchMatched.filter(i => !i.audioFile || !i.imageFile);
// //     if (unmatched.length) { showToast(`${unmatched.length} song(s) missing files. Check matches.`, "error"); return; }

// //     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
// //     const results = [];

// //     for (let i = 0; i < batchMatched.length; i++) {
// //       const item = batchMatched[i];
// //       const fd = new FormData();
// //       fd.append("title", item.title.trim());
// //       fd.append("artist", item.artist.trim());
// //       fd.append("album", item.album.trim());
// //       fd.append("audio", item.audioFile);
// //       fd.append("image", item.imageFile);
// //       try {
// //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } });
// //         results.push({ title: item.title, status: "ok" });
// //       } catch (err) {
// //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// //       }
// //       setBatchProgress(Math.round(((i+1)/batchMatched.length)*100));
// //       setBatchResults([...results]);
// //     }

// //     setBatchLoading(false);
// //     const ok = results.filter(r => r.status === "ok").length;
// //     showToast(`Bulk: ${ok}/${batchMatched.length} uploaded`, ok === batchMatched.length ? "success" : "error");
// //     if (ok > 0) { _cache = null; fetchData(true); }
// //   };

// //   const filtered = songs.filter(s =>
// //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// //     s.album.toLowerCase().includes(search.toLowerCase())
// //   );
// //   const albumGroups = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

// //   // ── LOGIN ──
// //   if (!authed) {
// //     return (
// //       <div style={{ fontFamily:"'Outfit',sans-serif", minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
// //         <div style={{ width:"100%", maxWidth:400, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 32px", animation:"fadeUp 0.35s ease" }}>
// //           <div style={{ width:52, height:52, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
// //             <FaLock size={22} color={C.accent}/>
// //           </div>
// //           <h1 style={{ fontSize:24, fontWeight:700, color:C.text, marginBottom:6 }}>Admin Access</h1>
// //           <p style={{ fontSize:13, color:C.sub, marginBottom:28 }}>Enter your credentials to continue</p>
// //           {loginErr && <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:C.error, fontSize:13, padding:"10px 14px", borderRadius:10, marginBottom:20 }}>{loginErr}</div>}
// //           <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
// //             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
// //               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
// //                 <FaUser size={13} color={C.muted}/>
// //                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus/>
// //               </div>
// //             </div>
// //             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
// //               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
// //                 <FaLock size={13} color={C.muted}/>
// //                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type={showPass?"text":"password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}/>
// //                 <button type="button" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:0 }} onClick={() => setShowPass(!showPass)}>
// //                   {showPass ? <FaEyeSlash size={13} color={C.muted}/> : <FaEye size={13} color={C.muted}/>}
// //                 </button>
// //               </div>
// //             </div>
// //             <button type="submit" style={{ marginTop:8, padding:"13px", borderRadius:12, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sign In →</button>
// //           </form>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, position:"relative" }}>

// //       {toast && (
// //         <div style={{ position:"fixed", top:70, right:20, padding:"12px 18px", borderRadius:10, color:"#0f0f0f", fontSize:13, fontWeight:700, zIndex:9999, display:"flex", alignItems:"center", gap:8, background:toast.type==="error"?C.error:C.success, animation:"slideIn 0.25s ease" }}>
// //           {toast.type==="error"?"✗":"✓"} {toast.msg}
// //         </div>
// //       )}

// //       {confirm && (
// //         <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setConfirm(null)}>
// //           <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, maxWidth:360, width:"100%" }} onClick={e => e.stopPropagation()}>
// //             <h3 style={{ fontSize:17, fontWeight:700, marginBottom:8, color:C.text }}>Confirm Delete</h3>
// //             <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>{confirm.msg}</p>
// //             <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
// //               <button style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={() => setConfirm(null)}>Cancel</button>
// //               <button style={{ padding:"9px 20px", borderRadius:8, border:"none", background:C.error, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif" }} onClick={confirm.action}>Delete</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div style={{ display:"flex", minHeight:"100vh" }} className="al">
// //         {/* Sidebar */}
// //         <div style={{ width:200, background:C.surface, borderRight:`1px solid ${C.border}`, padding:"24px 14px", display:"flex", flexDirection:"column", gap:8, position:"sticky", top:0, height:"100vh", flexShrink:0 }} className="sb">
// //           <div style={{ fontSize:17, fontWeight:700, color:C.accent, padding:"0 8px", marginBottom:16 }} className="sl">⚡ Admin</div>
// //           <div style={{ display:"flex", gap:0, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:16, overflow:"hidden" }} className="ss">
// //             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
// //               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{songs.length}</span>
// //               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Songs</span>
// //             </div>
// //             <div style={{ width:1, background:C.border }}/>
// //             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
// //               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{albums.length}</span>
// //               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Albums</span>
// //             </div>
// //           </div>
// //           <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }} className="sn">
// //             {[
// //               { id:"upload", icon:<FaUpload size={13}/>, label:editingId?"Edit":"Upload" },
// //               { id:"library", icon:<FaList size={13}/>, label:"Library" },
// //               { id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Bulk" },
// //             ].map(t => (
// //               <button key={t.id}
// //                 style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, background:view===t.id?C.accentDim:"none", color:view===t.id?C.accent:C.sub, border:view===t.id?`1px solid ${C.accentBorder}`:"none", fontFamily:"'Outfit',sans-serif", textAlign:"left" }}
// //                 className="ni"
// //                 onClick={() => setView(t.id)}>
// //                 {t.icon} {t.label}
// //               </button>
// //             ))}
// //           </div>
// //           <button style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", color:C.sub, fontSize:13, background:"none", border:"none", fontFamily:"'Outfit',sans-serif" }} onClick={logout}>
// //             <FaSignOutAlt size={13}/> Logout
// //           </button>
// //         </div>

// //         {/* Content */}
// //         <div style={{ flex:1, padding:"28px 24px", maxWidth:800, overflowY:"auto" }}>

// //           {/* ── UPLOAD ── */}
// //           {view==="upload" && (
// //             <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:24, animation:"fadeUp 0.25s ease" }}>
// //               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
// //                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
// //                 {editingId && <button style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={resetForm}>✕ Cancel</button>}
// //               </div>
// //               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }} className="fg">
// //                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i) => (
// //                   <div key={i} style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
// //                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder={ph} value={val} onChange={e => set(e.target.value)}/>
// //                   </div>
// //                 ))}
// //                 <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //                   <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album *</label>
// //                   <select style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={album} onChange={e => setAlbum(e.target.value)}>
// //                     <option value="">Select album</option>
// //                     {albums.map((al,i) => <option key={i} value={al}>{al}</option>)}
// //                     <option value="__new__">+ New Album</option>
// //                   </select>
// //                 </div>
// //                 {album==="__new__" && (
// //                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
// //                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>New Album *</label>
// //                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)}/>
// //                   </div>
// //                 )}
// //               </div>
// //               <div style={{ display:"flex", gap:16, marginBottom:24 }} className="ur">
// //                 <label style={{ flex:1, border:`1.5px dashed ${audio?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:audio?C.accentDim:C.bg }}>
// //                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
// //                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{audio?audio.name:"Upload Audio File"}</span>
// //                   <span style={{ fontSize:11, color:C.muted }}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
// //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display:"none" }}/>
// //                 </label>
// //                 <label style={{ flex:1, border:`1.5px dashed ${image?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:image?C.accentDim:C.bg }}>
// //                   {image ? <img src={URL.createObjectURL(image)} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }}/> : <FaUpload size={20} color={C.muted}/>}
// //                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{image?image.name:"Upload Cover Image"}</span>
// //                   <span style={{ fontSize:11, color:C.muted }}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
// //                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display:"none" }}/>
// //                 </label>
// //               </div>
// //               <button style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:loading?0.5:1 }} onClick={submit} disabled={loading}>
// //                 {loading ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>{editingId?"Updating...":"Uploading..."}</> : editingId?"✓ Update Song":"↑ Upload Song"}
// //               </button>
// //             </div>
// //           )}

// //           {/* ── LIBRARY ── */}
// //           {view==="library" && (
// //             <div style={{ animation:"fadeUp 0.25s ease" }}>
// //               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
// //                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>Library</h2>
// //                 <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 14px" }}>
// //                   <FaSearch size={12} color={C.muted}/>
// //                   <input style={{ border:"none", outline:"none", fontSize:13, color:C.text, background:"none", fontFamily:"'Outfit',sans-serif", width:160 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/>
// //                   {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => setSearch("")}><FaTimes size={11}/></button>}
// //                 </div>
// //               </div>
// //               {fetchLoading ? (
// //                 <div>
// //                   {[...Array(3)].map((_,i) => <SkeletonAlbum key={i} C={C}/>)}
// //                   <div style={{ marginTop:16 }}>{[...Array(6)].map((_,i) => <SkeletonRow key={i} C={C}/>)}</div>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {!search && Object.entries(albumGroups).length > 0 && (
// //                     <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
// //                       {Object.entries(albumGroups).map(([name,list]) => (
// //                         <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
// //                           <div style={{ display:"flex", alignItems:"center", gap:12 }}>
// //                             <img src={list[0]?.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover" }} loading="lazy"/>
// //                             <div>
// //                               <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{name}</div>
// //                               <div style={{ fontSize:11, color:C.sub }}>{list.length} songs</div>
// //                             </div>
// //                           </div>
// //                           <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", color:C.error, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }}
// //                             onClick={() => setConfirm({ msg:`Delete album "${name}" and all ${list.length} songs?`, action:() => deleteAlbum(name) })}>
// //                             <FaTrash size={11}/> Album
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                   <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
// //                     <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, padding:"0 4px 10px" }}>
// //                       {search ? `${filtered.length} result${filtered.length!==1?"s":""}` : `All Songs (${songs.length})`}
// //                     </div>
// //                     {filtered.map((s,i) => (
// //                       <div key={s._id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, gap:12 }}>
// //                         <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
// //                           <span style={{ fontSize:11, color:C.muted, width:20, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{i+1}</span>
// //                           <img src={s.imageUrl} alt="" style={{ width:40, height:40, borderRadius:6, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
// //                           <div style={{ minWidth:0 }}>
// //                             <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title}</div>
// //                             <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist} · {s.album}</div>
// //                           </div>
// //                         </div>
// //                         <div style={{ display:"flex", gap:8, flexShrink:0 }}>
// //                           <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", color:C.sub, display:"flex" }} onClick={() => editSong(s)}><FaEdit size={12}/></button>
// //                           <button style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", cursor:"pointer", color:C.error, display:"flex" }}
// //                             onClick={() => setConfirm({ msg:`Delete "${s.title}"?`, action:() => deleteSong(s._id) })}><FaTrash size={12}/></button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                     {filtered.length===0 && <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:32 }}>No songs found.</p>}
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           )}

// //           {/* ── BULK UPLOAD ── */}
// //           {view==="batch" && (
// //             <div style={{ animation:"fadeUp 0.25s ease" }}>

// //               {/* HOW TO USE */}
// //               <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:24, marginBottom:20 }}>
// //                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:16 }}>📦 Bulk Upload via JSON</h2>

// //                 {/* JSON Format Guide */}
// //                 <div style={{ background:C.bg, border:`1px solid ${C.accentBorder}`, borderRadius:12, padding:16, marginBottom:20 }}>
// //                   <div style={{ fontSize:11, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>📋 JSON Format</div>
// //                   <p style={{ fontSize:12, color:C.sub, marginBottom:10, lineHeight:1.7 }}>
// //                     Each item needs: <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>title</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>artist</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>album</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>audioFile</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>imageFile</code>
// //                   </p>
// //                   <pre style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.sub, background:C.card, padding:14, borderRadius:8, overflowX:"auto", lineHeight:1.8 }}>{`[
// //   {
// //     "title": "Blinding Lights",
// //     "artist": "The Weeknd",
// //     "album": "After Hours",
// //     "audioFile": "blinding_lights.mp3",
// //     "imageFile": "after_hours.jpg"
// //   },
// //   {
// //     "title": "Levitating",
// //     "artist": "Dua Lipa",
// //     "album": "Future Nostalgia",
// //     "audioFile": "levitating.mp3",
// //     "imageFile": "future_nostalgia.jpg"
// //   }
// // ]`}</pre>
// //                   <p style={{ fontSize:11, color:C.muted, marginTop:10, lineHeight:1.7 }}>
// //                     ⚠️ <strong style={{ color:C.text }}>audioFile</strong> and <strong style={{ color:C.text }}>imageFile</strong> must exactly match the filenames you select below.
// //                   </p>
// //                 </div>

// //                 {/* Step 1: JSON */}
// //                 <div style={{ marginBottom:20 }}>
// //                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
// //                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>1</span>
// //                     Paste or upload your JSON
// //                   </div>

// //                   <label style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:8, border:`1px dashed ${C.accentBorder}`, color:C.accent, cursor:"pointer", fontSize:12, fontWeight:600, marginBottom:10, fontFamily:"'Outfit',sans-serif" }}>
// //                     <FaUpload size={11}/> Upload .json file
// //                     <input type="file" accept=".json" onChange={e => {
// //                       const f = e.target.files[0];
// //                       if (!f) return;
// //                       const r = new FileReader();
// //                       r.onload = ev => { setBatchJson(ev.target.result); parseJson(ev.target.result); };
// //                       r.readAsText(f);
// //                     }} style={{ display:"none" }}/>
// //                   </label>

// //                   <textarea
// //                     style={{ width:"100%", padding:14, borderRadius:10, border:`1px solid ${batchError?C.error:C.border}`, fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:C.text, resize:"vertical", lineHeight:1.7, background:C.bg, display:"block" }}
// //                     rows={8}
// //                     placeholder={`[\n  {\n    "title": "Song Name",\n    "artist": "Artist",\n    "album": "Album",\n    "audioFile": "song.mp3",\n    "imageFile": "cover.jpg"\n  }\n]`}
// //                     value={batchJson}
// //                     onChange={e => { setBatchJson(e.target.value); parseJson(e.target.value); }}
// //                   />
// //                   {batchError && <div style={{ fontSize:12, color:C.error, marginTop:6 }}>⚠ {batchError}</div>}
// //                   {batchMeta.length > 0 && !batchError && <div style={{ fontSize:12, color:C.success, marginTop:6 }}>✓ {batchMeta.length} song(s) parsed from JSON</div>}
// //                 </div>

// //                 {/* Step 2: Audio Files */}
// //                 <div style={{ marginBottom:20 }}>
// //                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
// //                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>2</span>
// //                     Select all audio files
// //                   </div>
// //                   <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"20px", border:`1.5px dashed ${Object.keys(batchAudioFiles).length?C.accent:C.border}`, borderRadius:12, cursor:"pointer", background:Object.keys(batchAudioFiles).length?C.accentDim:C.bg }}>
// //                     <FaMusic size={22} color={Object.keys(batchAudioFiles).length?C.accent:C.muted}/>
// //                     <span style={{ fontSize:13, fontWeight:600, color:C.text }}>
// //                       {Object.keys(batchAudioFiles).length ? `${Object.keys(batchAudioFiles).length} audio file(s) selected` : "Click to select all MP3/WAV files"}
// //                     </span>
// //                     <span style={{ fontSize:11, color:C.muted }}>You can select multiple files at once</span>
// //                     {Object.keys(batchAudioFiles).length > 0 && (
// //                       <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4, justifyContent:"center" }}>
// //                         {Object.keys(batchAudioFiles).map(name => (
// //                           <span key={name} style={{ fontSize:10, background:C.card, border:`1px solid ${C.border}`, padding:"3px 8px", borderRadius:20, color:C.sub }}>{name}</span>
// //                         ))}
// //                       </div>
// //                     )}
// //                     <input type="file" accept="audio/*" multiple onChange={e => handleAudioFiles(e.target.files)} style={{ display:"none" }}/>
// //                   </label>
// //                 </div>

// //                 {/* Step 3: Image Files */}
// //                 <div style={{ marginBottom:20 }}>
// //                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
// //                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>3</span>
// //                     Select all cover images
// //                   </div>
// //                   <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"20px", border:`1.5px dashed ${Object.keys(batchImageFiles).length?C.accent:C.border}`, borderRadius:12, cursor:"pointer", background:Object.keys(batchImageFiles).length?C.accentDim:C.bg }}>
// //                     <FaUpload size={22} color={Object.keys(batchImageFiles).length?C.accent:C.muted}/>
// //                     <span style={{ fontSize:13, fontWeight:600, color:C.text }}>
// //                       {Object.keys(batchImageFiles).length ? `${Object.keys(batchImageFiles).length} image(s) selected` : "Click to select all cover images"}
// //                     </span>
// //                     <span style={{ fontSize:11, color:C.muted }}>You can select multiple files at once</span>
// //                     {Object.keys(batchImageFiles).length > 0 && (
// //                       <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4, justifyContent:"center" }}>
// //                         {Object.keys(batchImageFiles).map(name => (
// //                           <span key={name} style={{ fontSize:10, background:C.card, border:`1px solid ${C.border}`, padding:"3px 8px", borderRadius:20, color:C.sub }}>{name}</span>
// //                         ))}
// //                       </div>
// //                     )}
// //                     <input type="file" accept="image/*" multiple onChange={e => handleImageFiles(e.target.files)} style={{ display:"none" }}/>
// //                   </label>
// //                 </div>

// //                 {/* Step 4: Preview matches */}
// //                 {batchMatched.length > 0 && (
// //                   <div style={{ marginBottom:20 }}>
// //                     <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
// //                       <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>4</span>
// //                       Preview & verify matches
// //                     </div>
// //                     <div style={{ border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
// //                       <div style={{ padding:"10px 16px", background:C.card, fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 60px 60px", gap:8 }}>
// //                         <span>Title</span><span>Artist</span><span>Album</span><span>Audio</span><span>Image</span>
// //                       </div>
// //                       {batchMatched.map((item, i) => (
// //                         <div key={i} style={{ padding:"10px 16px", borderBottom:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 60px 60px", gap:8, alignItems:"center", background: (!item.audioFile||!item.imageFile) ? "rgba(239,68,68,0.05)" : "transparent" }}>
// //                           <span style={{ fontSize:12, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.title}</span>
// //                           <span style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.artist}</span>
// //                           <span style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.album}</span>
// //                           <span style={{ fontSize:16, textAlign:"center" }}>{item.audioFile ? "✅" : "❌"}</span>
// //                           <span style={{ fontSize:16, textAlign:"center" }}>{item.imageFile ? "✅" : "❌"}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                     <div style={{ fontSize:12, color:C.muted, marginTop:8 }}>
// //                       ✅ {batchMatched.filter(i => i.audioFile && i.imageFile).length} ready &nbsp;·&nbsp;
// //                       ❌ {batchMatched.filter(i => !i.audioFile || !i.imageFile).length} missing files
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Progress bar */}
// //                 {batchLoading && (
// //                   <div style={{ marginBottom:16 }}>
// //                     <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:6 }}>
// //                       <span>Uploading...</span><span>{batchProgress}%</span>
// //                     </div>
// //                     <div style={{ height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
// //                       <div style={{ height:"100%", width:`${batchProgress}%`, background:C.accent, borderRadius:4, transition:"width 0.3s ease" }}/>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <button
// //                   style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:(batchLoading||!batchMatched.length)?0.5:1 }}
// //                   onClick={runBulkUpload}
// //                   disabled={batchLoading || !batchMatched.length}>
// //                   {batchLoading
// //                     ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>Uploading...</>
// //                     : `↑ Upload All (${batchMatched.filter(i => i.audioFile && i.imageFile).length} ready)`
// //                   }
// //                 </button>

// //                 {/* Results */}
// //                 {batchResults.length > 0 && (
// //                   <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
// //                     <div style={{ padding:"10px 16px", background:C.card, fontSize:12, fontWeight:700, color:C.sub, borderBottom:`1px solid ${C.border}` }}>
// //                       {batchResults.filter(r => r.status==="ok").length}/{batchResults.length} uploaded
// //                     </div>
// //                     {batchResults.map((r,i) => (
// //                       <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.text, borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}` }}>
// //                         <span style={{ color:r.status==="ok"?C.accent:C.error }}>{r.status==="ok"?"✓":"✗"}</span>
// //                         <span style={{ flex:1 }}>{r.title}</span>
// //                         {r.error && <span style={{ fontSize:11, color:C.error }}>{r.error}</span>}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import { useTheme } from "../../App";
// import {
//   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
//   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash,
//   FaCompactDisc, FaPlus, FaExchangeAlt, FaImage, FaStar, FaRegStar
// } from "react-icons/fa";

// const API = "https://music-app-f9t7.onrender.com/api";
// const ADMINS = { "admin":"vibe2024", "revanth":"revv@123", "superadmin":"music#999","vyshu":"vyshu@123" };
// let _cache = null;

// const SkeletonRow = ({ C }) => (
//   <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, marginBottom:3 }}>
//     <div style={{ width:20, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//     <div style={{ width:40, height:40, borderRadius:6, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
//     <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
//       <div style={{ width:"60%", height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       <div style={{ width:"40%", height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//     </div>
//   </div>
// );

// const SkeletonAlbum = ({ C }) => (
//   <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:8 }}>
//     <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//       <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//         <div style={{ width:120, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//         <div style={{ width:70, height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       </div>
//     </div>
//     <div style={{ width:80, height:28, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//   </div>
// );

// export default function AdminPanel() {
//   const { C } = useTheme();

//   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
//   const [loginUser, setLoginUser] = useState("");
//   const [loginPass, setLoginPass] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loginErr, setLoginErr] = useState("");

//   const [songs, setSongs] = useState([]);
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [view, setView] = useState("upload");
//   const [search, setSearch] = useState("");
//   const [toast, setToast] = useState(null);
//   const [confirm, setConfirm] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [album, setAlbum] = useState("");
//   const [newAlbum, setNewAlbum] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [image, setImage] = useState(null);
//   const audioRef = useRef(null);
//   const imageRef = useRef(null);

//   // ── BULK STATE ──
//   const [batchJson, setBatchJson] = useState("");
//   const [batchParsed, setBatchParsed] = useState([]);
//   const [batchError, setBatchError] = useState("");
//   const [batchLoading, setBatchLoading] = useState(false);
//   const [batchResults, setBatchResults] = useState([]);
//   const [batchProgress, setBatchProgress] = useState(0);

//   // ── ALBUM MANAGEMENT STATE ──
//   const [albumDocs, setAlbumDocs] = useState([]);
//   const [albumsLoading, setAlbumsLoading] = useState(false);
//   const [showCreateAlbum, setShowCreateAlbum] = useState(false);
//   const [newAlbumName, setNewAlbumName] = useState("");
//   const [newAlbumImage, setNewAlbumImage] = useState(null);
//   const [albumSaving, setAlbumSaving] = useState(false);
//   const [editingAlbum, setEditingAlbum] = useState(null); // name of album being edited
//   const [editAlbumName, setEditAlbumName] = useState("");
//   const [editAlbumImage, setEditAlbumImage] = useState(null);

//   // ── MOVE SONG STATE ──
//   const [movingSongId, setMovingSongId] = useState(null);
//   const [moveTarget, setMoveTarget] = useState("");
//   const [moveNewAlbum, setMoveNewAlbum] = useState("");
//   const [moveSaving, setMoveSaving] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault(); setLoginErr("");
//     const pass = ADMINS[loginUser.trim().toLowerCase()];
//     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
//     else setLoginErr("Invalid username or password.");
//   };

//   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };
//   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

//   const fetchData = useCallback(async (force = false) => {
//     setFetchLoading(true);
//     try {
//       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
//       const res = await axios.get(`${API}/`);
//       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
//     } catch { showToast("Failed to fetch songs", "error"); }
//     finally { setFetchLoading(false); }
//   }, []);

//   const fetchAlbums = useCallback(async () => {
//     setAlbumsLoading(true);
//     try {
//       const res = await axios.get(`${API}/albums`);
//       setAlbumDocs(res.data);
//     } catch { showToast("Failed to fetch albums", "error"); }
//     finally { setAlbumsLoading(false); }
//   }, []);

//   useEffect(() => { if (authed) { fetchData(); fetchAlbums(); } }, [authed]);

//   const resetForm = () => {
//     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
//     if (audioRef.current) audioRef.current.value = "";
//     if (imageRef.current) imageRef.current.value = "";
//   };

//   const submit = async () => {
//     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
//     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
//     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
//     const fd = new FormData();
//     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
//     if (audio) fd.append("audio", audio);
//     if (image) fd.append("image", image);
//     setLoading(true);
//     try {
//       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
//       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } }); showToast("Song uploaded!"); }
//       resetForm(); _cache = null; fetchData(true);
//     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
//     finally { setLoading(false); }
//   };

//   const deleteSong = async (id) => {
//     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
//     catch { showToast("Delete failed", "error"); }
//   };

//   const deleteAlbum = async (name) => {
//     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); fetchAlbums(); }
//     catch { showToast("Album delete failed", "error"); }
//   };

//   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

//   // ── CREATE A NEW (DYNAMIC) ALBUM, OPTIONALLY WITH A COVER ──
//   const createAlbumSubmit = async () => {
//     if (!newAlbumName.trim()) { showToast("Album name required", "error"); return; }
//     const fd = new FormData();
//     fd.append("name", newAlbumName.trim());
//     if (newAlbumImage) fd.append("image", newAlbumImage);
//     setAlbumSaving(true);
//     try {
//       await axios.post(`${API}/albums`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       showToast("Album created!");
//       setNewAlbumName(""); setNewAlbumImage(null); setShowCreateAlbum(false);
//       fetchAlbums();
//     } catch (err) { showToast(err.response?.data?.message || "Could not create album", "error"); }
//     finally { setAlbumSaving(false); }
//   };

//   const startEditAlbum = (a) => { setEditingAlbum(a.name); setEditAlbumName(a.name); setEditAlbumImage(null); };

//   // ── RENAME / CHANGE COVER — COVER CASCADES TO EVERY SONG IN THE ALBUM ──
//   const saveAlbumEdit = async () => {
//     if (!editingAlbum) return;
//     const fd = new FormData();
//     if (editAlbumName.trim() && editAlbumName.trim() !== editingAlbum) fd.append("newName", editAlbumName.trim());
//     if (editAlbumImage) fd.append("image", editAlbumImage);
//     setAlbumSaving(true);
//     try {
//       await axios.put(`${API}/albums/${encodeURIComponent(editingAlbum)}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       showToast("Album updated — cover applied to all its songs!");
//       setEditingAlbum(null); setEditAlbumName(""); setEditAlbumImage(null);
//       _cache = null; fetchData(true); fetchAlbums();
//     } catch (err) { showToast(err.response?.data?.message || "Could not update album", "error"); }
//     finally { setAlbumSaving(false); }
//   };

//   // ── MOVE A SONG INTO ANOTHER (EXISTING OR NEW) ALBUM ──
//   const startMoveSong = (song) => { setMovingSongId(song._id); setMoveTarget(song.album); setMoveNewAlbum(""); };

//   const saveMoveSong = async () => {
//     const target = moveTarget === "__new__" ? moveNewAlbum.trim() : moveTarget;
//     if (!target) { showToast("Pick or name a target album", "error"); return; }
//     const fd = new FormData();
//     fd.append("album", target);
//     setMoveSaving(true);
//     try {
//       await axios.put(`${API}/${movingSongId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       showToast(`Moved to "${target}"`);
//       setMovingSongId(null); setMoveTarget(""); setMoveNewAlbum("");
//       _cache = null; fetchData(true); fetchAlbums();
//     } catch (err) { showToast(err.response?.data?.message || "Move failed", "error"); }
//     finally { setMoveSaving(false); }
//   };

//   // ── FEATURE / UNFEATURE A SONG (SPOTIFY-STYLE HIGHLIGHT) ──
//   const toggleFeatured = async (song) => {
//     try {
//       const fd = new FormData();
//       fd.append("isFeatured", (!song.isFeatured).toString());
//       await axios.put(`${API}/${song._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
//       _cache = null; fetchData(true);
//     } catch { showToast("Could not update featured state", "error"); }
//   };

//   // ── PARSE JSON ──
//   const parseJson = (text) => {
//     setBatchError(""); setBatchParsed([]);
//     if (!text.trim()) return;
//     try {
//       const parsed = JSON.parse(text);
//       if (!Array.isArray(parsed)) { setBatchError("Must be a JSON array [ ... ]"); return; }
//       // Validate each item
//       const invalid = parsed.filter(i => !i.title || !i.artist || !i.album || !i.audioUrl || !i.imageUrl);
//       if (invalid.length) {
//         setBatchError(`${invalid.length} item(s) missing required fields. Each needs: title, artist, album, audioUrl, imageUrl`);
//         return;
//       }
//       setBatchParsed(parsed);
//     } catch (e) {
//       setBatchError("Invalid JSON: " + e.message);
//     }
//   };

//   // ── BULK UPLOAD (URLs only, no files) ──
//   const runBulkUpload = async () => {
//     if (!batchParsed.length) { showToast("No songs to upload", "error"); return; }
//     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
//     const results = [];
//     for (let i = 0; i < batchParsed.length; i++) {
//       const item = batchParsed[i];
//       try {
//         await axios.post(`${API}/create-from-url`, {
//           title: item.title.trim(),
//           artist: item.artist.trim(),
//           album: item.album.trim(),
//           audioUrl: item.audioUrl.trim(),
//           imageUrl: item.imageUrl.trim(),
//         });
//         results.push({ title: item.title, status: "ok" });
//       } catch (err) {
//         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
//       }
//       setBatchProgress(Math.round(((i+1)/batchParsed.length)*100));
//       setBatchResults([...results]);
//     }
//     setBatchLoading(false);
//     const ok = results.filter(r => r.status === "ok").length;
//     showToast(`Bulk: ${ok}/${batchParsed.length} uploaded`, ok === batchParsed.length ? "success" : "error");
//     if (ok > 0) { _cache = null; fetchData(true); }
//   };

//   const filtered = songs.filter(s =>
//     s.title.toLowerCase().includes(search.toLowerCase()) ||
//     s.artist.toLowerCase().includes(search.toLowerCase()) ||
//     s.album.toLowerCase().includes(search.toLowerCase())
//   );
//   const albumGroups = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

//   // ── LOGIN ──
//   if (!authed) {
//     return (
//       <div style={{ fontFamily:"'Outfit',sans-serif", minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
//         <div style={{ width:"100%", maxWidth:400, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 32px", animation:"fadeUp 0.35s ease" }}>
//           <div style={{ width:52, height:52, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
//             <FaLock size={22} color={C.accent}/>
//           </div>
//           <h1 style={{ fontSize:24, fontWeight:700, color:C.text, marginBottom:6 }}>Admin Access</h1>
//           <p style={{ fontSize:13, color:C.sub, marginBottom:28 }}>Enter your credentials to continue</p>
//           {loginErr && <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:C.error, fontSize:13, padding:"10px 14px", borderRadius:10, marginBottom:20 }}>{loginErr}</div>}
//           <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
//               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
//                 <FaUser size={13} color={C.muted}/>
//                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus/>
//               </div>
//             </div>
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
//               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
//                 <FaLock size={13} color={C.muted}/>
//                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type={showPass?"text":"password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}/>
//                 <button type="button" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:0 }} onClick={() => setShowPass(!showPass)}>
//                   {showPass ? <FaEyeSlash size={13} color={C.muted}/> : <FaEye size={13} color={C.muted}/>}
//                 </button>
//               </div>
//             </div>
//             <button type="submit" style={{ marginTop:8, padding:"13px", borderRadius:12, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sign In →</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, position:"relative" }}>

//       {toast && (
//         <div style={{ position:"fixed", top:70, right:20, padding:"12px 18px", borderRadius:10, color:"#0f0f0f", fontSize:13, fontWeight:700, zIndex:9999, display:"flex", alignItems:"center", gap:8, background:toast.type==="error"?C.error:C.success, animation:"slideIn 0.25s ease" }}>
//           {toast.type==="error"?"✗":"✓"} {toast.msg}
//         </div>
//       )}

//       {confirm && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setConfirm(null)}>
//           <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, maxWidth:360, width:"100%" }} onClick={e => e.stopPropagation()}>
//             <h3 style={{ fontSize:17, fontWeight:700, marginBottom:8, color:C.text }}>Confirm Delete</h3>
//             <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>{confirm.msg}</p>
//             <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
//               <button style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={() => setConfirm(null)}>Cancel</button>
//               <button style={{ padding:"9px 20px", borderRadius:8, border:"none", background:C.error, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif" }} onClick={confirm.action}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div style={{ display:"flex", minHeight:"100vh" }} className="al">
//         {/* Sidebar */}
//         <div style={{ width:200, background:C.surface, borderRight:`1px solid ${C.border}`, padding:"24px 14px", display:"flex", flexDirection:"column", gap:8, position:"sticky", top:0, height:"100vh", flexShrink:0 }} className="sb">
//           <div style={{ fontSize:17, fontWeight:700, color:C.accent, padding:"0 8px", marginBottom:16 }} className="sl">⚡ Admin</div>
//           <div style={{ display:"flex", gap:0, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:16, overflow:"hidden" }} className="ss">
//             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
//               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{songs.length}</span>
//               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Songs</span>
//             </div>
//             <div style={{ width:1, background:C.border }}/>
//             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
//               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{albums.length}</span>
//               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Albums</span>
//             </div>
//           </div>
//           <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }} className="sn">
//             {[
//               { id:"upload", icon:<FaUpload size={13}/>, label:editingId?"Edit":"Upload" },
//               { id:"library", icon:<FaList size={13}/>, label:"Library" },
//               { id:"albums", icon:<FaCompactDisc size={13}/>, label:"Albums" },
//               { id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Bulk" },
//             ].map(t => (
//               <button key={t.id}
//                 style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, background:view===t.id?C.accentDim:"none", color:view===t.id?C.accent:C.sub, border:view===t.id?`1px solid ${C.accentBorder}`:"none", fontFamily:"'Outfit',sans-serif", textAlign:"left" }}
//                 className="ni"
//                 onClick={() => setView(t.id)}>
//                 {t.icon} {t.label}
//               </button>
//             ))}
//           </div>
//           <button style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", color:C.sub, fontSize:13, background:"none", border:"none", fontFamily:"'Outfit',sans-serif" }} onClick={logout}>
//             <FaSignOutAlt size={13}/> Logout
//           </button>
//         </div>

//         {/* Content */}
//         <div style={{ flex:1, padding:"28px 24px", maxWidth:800, overflowY:"auto" }}>

//           {/* ── UPLOAD ── */}
//           {view==="upload" && (
//             <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:24, animation:"fadeUp 0.25s ease" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
//                 {editingId && <button style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={resetForm}>✕ Cancel</button>}
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }} className="fg">
//                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i) => (
//                   <div key={i} style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
//                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder={ph} value={val} onChange={e => set(e.target.value)}/>
//                   </div>
//                 ))}
//                 <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                   <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album *</label>
//                   <select style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={album} onChange={e => setAlbum(e.target.value)}>
//                     <option value="">Select album</option>
//                     {[...new Set([...albums, ...albumDocs.map(a => a.name)])].map((al,i) => <option key={i} value={al}>{al}</option>)}
//                     <option value="__new__">+ New Album</option>
//                   </select>
//                 </div>
//                 {album==="__new__" && (
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>New Album *</label>
//                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)}/>
//                   </div>
//                 )}
//               </div>
//               <div style={{ display:"flex", gap:16, marginBottom:24 }} className="ur">
//                 <label style={{ flex:1, border:`1.5px dashed ${audio?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:audio?C.accentDim:C.bg }}>
//                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
//                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{audio?audio.name:"Upload Audio File"}</span>
//                   <span style={{ fontSize:11, color:C.muted }}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
//                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display:"none" }}/>
//                 </label>
//                 <label style={{ flex:1, border:`1.5px dashed ${image?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:image?C.accentDim:C.bg }}>
//                   {image ? <img src={URL.createObjectURL(image)} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }}/> : <FaUpload size={20} color={C.muted}/>}
//                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{image?image.name:"Upload Cover Image"}</span>
//                   <span style={{ fontSize:11, color:C.muted }}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
//                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display:"none" }}/>
//                 </label>
//               </div>
//               <button style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:loading?0.5:1 }} onClick={submit} disabled={loading}>
//                 {loading ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>{editingId?"Updating...":"Uploading..."}</> : editingId?"✓ Update Song":"↑ Upload Song"}
//               </button>
//             </div>
//           )}

//           {/* ── LIBRARY ── */}
//           {view==="library" && (
//             <div style={{ animation:"fadeUp 0.25s ease" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>Library</h2>
//                 <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 14px" }}>
//                   <FaSearch size={12} color={C.muted}/>
//                   <input style={{ border:"none", outline:"none", fontSize:13, color:C.text, background:"none", fontFamily:"'Outfit',sans-serif", width:160 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/>
//                   {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => setSearch("")}><FaTimes size={11}/></button>}
//                 </div>
//               </div>
//               {fetchLoading ? (
//                 <div>
//                   {[...Array(3)].map((_,i) => <SkeletonAlbum key={i} C={C}/>)}
//                   <div style={{ marginTop:16 }}>{[...Array(6)].map((_,i) => <SkeletonRow key={i} C={C}/>)}</div>
//                 </div>
//               ) : (
//                 <>
//                   {!search && Object.entries(albumGroups).length > 0 && (
//                     <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
//                       {Object.entries(albumGroups).map(([name,list]) => (
//                         <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
//                           <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                             <img src={list[0]?.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover" }} loading="lazy"/>
//                             <div>
//                               <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{name}</div>
//                               <div style={{ fontSize:11, color:C.sub }}>{list.length} songs</div>
//                             </div>
//                           </div>
//                           <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", color:C.error, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }}
//                             onClick={() => setConfirm({ msg:`Delete album "${name}" and all ${list.length} songs?`, action:() => deleteAlbum(name) })}>
//                             <FaTrash size={11}/> Album
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
//                     <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, padding:"0 4px 10px" }}>
//                       {search ? `${filtered.length} result${filtered.length!==1?"s":""}` : `All Songs (${songs.length})`}
//                     </div>
//                     {filtered.map((s,i) => (
//                       <div key={s._id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, gap:12 }}>
//                         <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
//                           <span style={{ fontSize:11, color:C.muted, width:20, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{i+1}</span>
//                           <img src={s.imageUrl} alt="" style={{ width:40, height:40, borderRadius:6, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
//                           <div style={{ minWidth:0 }}>
//                             <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title}</div>
//                             <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist} · {s.album}</div>
//                           </div>
//                         </div>
//                         <div style={{ display:"flex", gap:8, flexShrink:0 }}>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${s.isFeatured?C.accentBorder:C.border}`, background:s.isFeatured?C.accentDim:"none", cursor:"pointer", color:s.isFeatured?C.accent:C.sub, display:"flex" }} title={s.isFeatured?"Unfeature":"Feature"} onClick={() => toggleFeatured(s)}>{s.isFeatured?<FaStar size={12}/>:<FaRegStar size={12}/>}</button>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", color:C.sub, display:"flex" }} title="Move to album" onClick={() => startMoveSong(s)}><FaExchangeAlt size={12}/></button>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", color:C.sub, display:"flex" }} onClick={() => editSong(s)}><FaEdit size={12}/></button>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", cursor:"pointer", color:C.error, display:"flex" }}
//                             onClick={() => setConfirm({ msg:`Delete "${s.title}"?`, action:() => deleteSong(s._id) })}><FaTrash size={12}/></button>
//                         </div>
//                       </div>
//                     ))}
//                     {filtered.length===0 && <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:32 }}>No songs found.</p>}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           {/* ── ALBUMS (DYNAMIC ALBUM MANAGEMENT) ── */}
//           {view==="albums" && (
//             <div style={{ animation:"fadeUp 0.25s ease" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>Albums</h2>
//                 <button style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:8, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }} onClick={() => setShowCreateAlbum(v => !v)}>
//                   <FaPlus size={11}/> New Album
//                 </button>
//               </div>

//               {showCreateAlbum && (
//                 <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:20, marginBottom:20 }}>
//                   <div style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"flex-end" }} className="ur">
//                     <div style={{ display:"flex", flexDirection:"column", gap:6, flex:1, minWidth:160 }}>
//                       <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album Name *</label>
//                       <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="e.g. Midnight Vibes" value={newAlbumName} onChange={e => setNewAlbumName(e.target.value)}/>
//                     </div>
//                     <label style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 14px", borderRadius:10, border:`1.5px dashed ${newAlbumImage?C.accent:C.border}`, cursor:"pointer", color:C.sub, fontSize:12, background:newAlbumImage?C.accentDim:C.bg }}>
//                       <FaImage size={13}/> {newAlbumImage ? newAlbumImage.name : "Cover (optional)"}
//                       <input type="file" accept="image/*" style={{ display:"none" }} onChange={e => setNewAlbumImage(e.target.files[0])}/>
//                     </label>
//                     <button style={{ padding:"11px 22px", borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", opacity:albumSaving?0.6:1 }} disabled={albumSaving} onClick={createAlbumSubmit}>
//                       {albumSaving?"Saving...":"Create"}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {albumsLoading ? (
//                 <div>{[...Array(3)].map((_,i) => <SkeletonAlbum key={i} C={C}/>)}</div>
//               ) : albumDocs.length === 0 ? (
//                 <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:32 }}>No albums yet. Create one above, or upload a song.</p>
//               ) : (
//                 <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16 }} className="agrid">
//                   {albumDocs.map(a => (
//                     <div key={a.name} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
//                       {editingAlbum === a.name ? (
//                         <div style={{ padding:14, display:"flex", flexDirection:"column", gap:10 }}>
//                           <img src={editAlbumImage ? URL.createObjectURL(editAlbumImage) : a.coverImage} alt="" style={{ width:"100%", aspectRatio:"1", objectFit:"cover", borderRadius:8, background:C.card }}/>
//                           <input style={{ padding:"8px 10px", borderRadius:8, border:`1px solid ${C.border}`, fontSize:13, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={editAlbumName} onChange={e => setEditAlbumName(e.target.value)}/>
//                           <label style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px", borderRadius:8, border:`1.5px dashed ${C.border}`, cursor:"pointer", color:C.sub, fontSize:11 }}>
//                             <FaImage size={11}/> {editAlbumImage ? editAlbumImage.name : "Change cover"}
//                             <input type="file" accept="image/*" style={{ display:"none" }} onChange={e => setEditAlbumImage(e.target.files[0])}/>
//                           </label>
//                           <div style={{ display:"flex", gap:8 }}>
//                             <button style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={() => setEditingAlbum(null)}>Cancel</button>
//                             <button style={{ flex:1, padding:"8px", borderRadius:8, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif", opacity:albumSaving?0.6:1 }} disabled={albumSaving} onClick={saveAlbumEdit}>{albumSaving?"...":"Save"}</button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <div style={{ position:"relative" }}>
//                             {a.coverImage
//                               ? <img src={a.coverImage} alt={a.name} style={{ width:"100%", aspectRatio:"1", objectFit:"cover", display:"block" }} loading="lazy"/>
//                               : <div style={{ width:"100%", aspectRatio:"1", background:C.card, display:"flex", alignItems:"center", justifyContent:"center" }}><FaCompactDisc size={28} color={C.muted}/></div>}
//                           </div>
//                           <div style={{ padding:"10px 12px" }}>
//                             <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</div>
//                             <div style={{ fontSize:11, color:C.sub, marginBottom:10 }}>{a.songCount} song{a.songCount!==1?"s":""}</div>
//                             <div style={{ display:"flex", gap:8 }}>
//                               <button style={{ flex:1, padding:"7px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:11, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }} onClick={() => startEditAlbum(a)}><FaEdit size={10}/> Edit</button>
//                               <button style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", color:C.error, cursor:"pointer", display:"flex" }}
//                                 onClick={() => setConfirm({ msg:`Delete album "${a.name}"${a.songCount?` and all ${a.songCount} songs`:""}?`, action:() => deleteAlbum(a.name) })}><FaTrash size={11}/></button>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── MOVE SONG MODAL ── */}
//           {movingSongId && (
//             <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setMovingSongId(null)}>
//               <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, maxWidth:360, width:"100%" }} onClick={e => e.stopPropagation()}>
//                 <h3 style={{ fontSize:17, fontWeight:700, marginBottom:16, color:C.text, display:"flex", alignItems:"center", gap:8 }}><FaExchangeAlt size={14}/> Move to Album</h3>
//                 <select style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.bg, marginBottom:12 }} value={moveTarget} onChange={e => setMoveTarget(e.target.value)}>
//                   {[...new Set([...albums, ...albumDocs.map(a => a.name)])].map((al,i) => <option key={i} value={al}>{al}</option>)}
//                   <option value="__new__">+ New Album</option>
//                 </select>
//                 {moveTarget === "__new__" && (
//                   <input style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.bg, marginBottom:12 }} placeholder="New album name" value={moveNewAlbum} onChange={e => setMoveNewAlbum(e.target.value)}/>
//                 )}
//                 <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
//                   <button style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={() => setMovingSongId(null)}>Cancel</button>
//                   <button style={{ padding:"9px 20px", borderRadius:8, border:"none", background:C.accent, color:"#0f0f0f", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Outfit',sans-serif", opacity:moveSaving?0.6:1 }} disabled={moveSaving} onClick={saveMoveSong}>{moveSaving?"Moving...":"Move"}</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ── BULK UPLOAD ── */}
//           {view==="batch" && (
//             <div style={{ animation:"fadeUp 0.25s ease" }}>
//               <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:20 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:6 }}>📦 Bulk Upload via JSON</h2>
//                 <p style={{ fontSize:13, color:C.sub, marginBottom:20, lineHeight:1.7 }}>
//                   Upload songs to <strong style={{ color:C.accent }}>Cloudinary</strong> first to get URLs, then paste JSON here. No file picking needed.
//                 </p>

//                 {/* JSON Format */}
//                 <div style={{ background:C.bg, border:`1px solid ${C.accentBorder}`, borderRadius:12, padding:16, marginBottom:20 }}>
//                   <div style={{ fontSize:11, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>📋 Required JSON Format</div>
//                   <pre style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.sub, background:C.card, padding:14, borderRadius:8, overflowX:"auto", lineHeight:1.9 }}>{`[
//   {
//     "title": "Blinding Lights",
//     "artist": "The Weeknd",
//     "album": "After Hours",
//     "audioUrl": "https://res.cloudinary.com/xxx/songs/audio/song.mp3",
//     "imageUrl": "https://res.cloudinary.com/xxx/songs/images/cover.jpg"
//   },
//   {
//     "title": "Levitating",
//     "artist": "Dua Lipa",
//     "album": "Future Nostalgia",
//     "audioUrl": "https://res.cloudinary.com/xxx/songs/audio/levi.mp3",
//     "imageUrl": "https://res.cloudinary.com/xxx/songs/images/fn.jpg"
//   }
// ]`}</pre>
//                 </div>

//                 {/* Upload .json file */}
//                 <label style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:8, border:`1px dashed ${C.accentBorder}`, color:C.accent, cursor:"pointer", fontSize:12, fontWeight:600, marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>
//                   <FaUpload size={11}/> Upload .json file
//                   <input type="file" accept=".json" onChange={e => {
//                     const f = e.target.files[0];
//                     if (!f) return;
//                     const r = new FileReader();
//                     r.onload = ev => { setBatchJson(ev.target.result); parseJson(ev.target.result); };
//                     r.readAsText(f);
//                   }} style={{ display:"none" }}/>
//                 </label>

//                 <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>— or paste JSON below —</div>

//                 {/* Textarea */}
//                 <textarea
//                   style={{ width:"100%", padding:14, borderRadius:10, border:`1px solid ${batchError?C.error:C.border}`, fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:C.text, resize:"vertical", lineHeight:1.7, background:C.bg, display:"block", marginBottom:8 }}
//                   rows={10}
//                   placeholder={`[\n  {\n    "title": "...",\n    "artist": "...",\n    "album": "...",\n    "audioUrl": "https://...",\n    "imageUrl": "https://..."\n  }\n]`}
//                   value={batchJson}
//                   onChange={e => { setBatchJson(e.target.value); parseJson(e.target.value); }}
//                 />

//                 {/* Error / success feedback */}
//                 {batchError && (
//                   <div style={{ fontSize:12, color:C.error, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", padding:"10px 14px", borderRadius:8, marginBottom:16 }}>
//                     ⚠ {batchError}
//                   </div>
//                 )}
//                 {batchParsed.length > 0 && !batchError && (
//                   <div style={{ fontSize:12, color:C.success, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", padding:"10px 14px", borderRadius:8, marginBottom:16 }}>
//                     ✓ {batchParsed.length} song(s) ready to upload
//                   </div>
//                 )}

//                 {/* Preview table */}
//                 {batchParsed.length > 0 && !batchError && (
//                   <div style={{ border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:20 }}>
//                     <div style={{ padding:"10px 16px", background:C.card, fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>
//                       Preview — {batchParsed.length} songs
//                     </div>
//                     {batchParsed.map((item,i) => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", borderBottom:`1px solid ${C.border}` }}>
//                         <img src={item.imageUrl} alt="" style={{ width:36, height:36, borderRadius:6, objectFit:"cover", flexShrink:0 }}
//                           onError={e => { e.target.style.display="none"; }}/>
//                         <div style={{ flex:1, minWidth:0 }}>
//                           <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.title}</div>
//                           <div style={{ fontSize:11, color:C.sub }}>{item.artist} · {item.album}</div>
//                         </div>
//                         <div style={{ display:"flex", flexDirection:"column", gap:2, flexShrink:0, alignItems:"flex-end" }}>
//                           <span style={{ fontSize:10, color:C.muted }}>🎵 {item.audioUrl.split("/").pop()}</span>
//                           <span style={{ fontSize:10, color:C.muted }}>🖼 {item.imageUrl.split("/").pop()}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Progress */}
//                 {batchLoading && (
//                   <div style={{ marginBottom:16 }}>
//                     <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:6 }}>
//                       <span>Uploading {batchResults.length + 1} of {batchParsed.length}...</span>
//                       <span>{batchProgress}%</span>
//                     </div>
//                     <div style={{ height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
//                       <div style={{ height:"100%", width:`${batchProgress}%`, background:C.accent, borderRadius:4, transition:"width 0.3s ease" }}/>
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload button */}
//                 <button
//                   style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:(batchLoading || !batchParsed.length || !!batchError) ? 0.5 : 1 }}
//                   onClick={runBulkUpload}
//                   disabled={batchLoading || !batchParsed.length || !!batchError}>
//                   {batchLoading
//                     ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>Uploading...</>
//                     : `↑ Upload All (${batchParsed.length} songs)`
//                   }
//                 </button>

//                 {/* Results */}
//                 {batchResults.length > 0 && (
//                   <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
//                     <div style={{ padding:"10px 16px", background:C.card, fontSize:12, fontWeight:700, color:C.sub, borderBottom:`1px solid ${C.border}` }}>
//                       {batchResults.filter(r => r.status==="ok").length}/{batchResults.length} uploaded
//                     </div>
//                     {batchResults.map((r,i) => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.text, borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}` }}>
//                         <span style={{ color:r.status==="ok"?C.accent:C.error }}>{r.status==="ok"?"✓":"✗"}</span>
//                         <span style={{ flex:1 }}>{r.title}</span>
//                         {r.error && <span style={{ fontSize:11, color:C.error }}>{r.error}</span>}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";

// // // // // // // // function AdminPanel() {
// // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // //   const [editingId, setEditingId] = useState(null);

// // // // // // // //   const fetchData = async () => {
// // // // // // // //     const res = await axios.get("http://localhost:5000/api/songs");
// // // // // // // //     setSongs(res.data);

// // // // // // // //     const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // //     setAlbums(uniqueAlbums);
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // //     if (!title || !finalAlbum) {
// // // // // // // //       alert("Title and Album are required");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append("title", title);
// // // // // // // //     formData.append("artist", artist);
// // // // // // // //     formData.append("album", finalAlbum);
// // // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // // //     if (image) formData.append("image", image);

// // // // // // // //     try {
// // // // // // // //       if (editingId) {
// // // // // // // //         await axios.put(
// // // // // // // //           `http://localhost:5000/api/songs/${editingId}`,
// // // // // // // //           formData
// // // // // // // //         );
// // // // // // // //         alert("Song updated");
// // // // // // // //       } else {
// // // // // // // //         if (!audio || !image) {
// // // // // // // //           alert("Audio and image required for new song");
// // // // // // // //           return;
// // // // // // // //         }
// // // // // // // //         await axios.post(
// // // // // // // //           "http://localhost:5000/api/songs/create",
// // // // // // // //           formData
// // // // // // // //         );
// // // // // // // //         alert("Song uploaded");
// // // // // // // //       }

// // // // // // // //       resetForm();
// // // // // // // //       fetchData();

// // // // // // // //     } catch (error) {
// // // // // // // //       console.error(error);
// // // // // // // //       alert("Operation failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const deleteSong = async (id) => {
// // // // // // // //     if (!window.confirm("Delete this song?")) return;

// // // // // // // //     await axios.delete(`http://localhost:5000/api/songs/${id}`);
// // // // // // // //     fetchData();
// // // // // // // //   };

// // // // // // // //   const deleteAlbum = async () => {
// // // // // // // //     if (!album || album === "new") {
// // // // // // // //       alert("Select valid album");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // // // // // // //     await axios.delete(
// // // // // // // //       `http://localhost:5000/api/albums/${album}`
// // // // // // // //     );

// // // // // // // //     fetchData();
// // // // // // // //     setAlbum("");
// // // // // // // //   };

// // // // // // // //   const editSong = (song) => {
// // // // // // // //     setEditingId(song._id);
// // // // // // // //     setTitle(song.title);
// // // // // // // //     setArtist(song.artist);
// // // // // // // //     setAlbum(song.album);
// // // // // // // //   };

// // // // // // // //   const resetForm = () => {
// // // // // // // //     setTitle("");
// // // // // // // //     setArtist("");
// // // // // // // //     setAlbum("");
// // // // // // // //     setNewAlbum("");
// // // // // // // //     setAudio(null);
// // // // // // // //     setImage(null);
// // // // // // // //     setEditingId(null);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={styles.wrapper}>
// // // // // // // //       <div style={styles.card}>
// // // // // // // //         <h1 style={styles.heading}>
// // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // //         </h1>

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Song Title"
// // // // // // // //           value={title}
// // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Artist Name"
// // // // // // // //           value={artist}
// // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <select
// // // // // // // //           style={styles.input}
// // // // // // // //           value={album}
// // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // //         >
// // // // // // // //           <option value="">Select Album</option>
// // // // // // // //           {albums.map((alb, index) => (
// // // // // // // //             <option key={index} value={alb}>
// // // // // // // //               {alb}
// // // // // // // //             </option>
// // // // // // // //           ))}
// // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // //         </select>

// // // // // // // //         {album === "new" && (
// // // // // // // //           <input
// // // // // // // //             style={styles.input}
// // // // // // // //             placeholder="New Album Name"
// // // // // // // //             value={newAlbum}
// // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // //           />
// // // // // // // //         )}

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="audio/*"
// // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="image/*"
// // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // //         </button>

// // // // // // // //         <button
// // // // // // // //           style={{ ...styles.button, background: "linear-gradient(90deg, #ff7eb6, #ff4d94)" }}
// // // // // // // //           onClick={deleteAlbum}
// // // // // // // //         >
// // // // // // // //           Delete Selected Album
// // // // // // // //         </button>

// // // // // // // //         {/* SONG LIST WITH EDIT + DELETE */}
// // // // // // // //         <div style={{ marginTop: "20px" }}>
// // // // // // // //           {songs.map(song => (
// // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // //               <div>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallBtn}
// // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // //                 >
// // // // // // // //                   Edit
// // // // // // // //                 </button>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallDelete}
// // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // //                 >
// // // // // // // //                   Delete
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = {
// // // // // // // //   wrapper: {
// // // // // // // //     width: "98vw",
// // // // // // // //     minHeight: "100vh",
// // // // // // // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     padding: "20px",
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // // // //   },
// // // // // // // //   card: {
// // // // // // // //     width: "100%",
// // // // // // // //     maxWidth: "500px",
// // // // // // // //     background: "rgba(255,255,255,0.75)",
// // // // // // // //     backdropFilter: "blur(12px)",
// // // // // // // //     padding: "30px",
// // // // // // // //     borderRadius: "25px",
// // // // // // // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // // // // // // //     display: "flex",
// // // // // // // //     flexDirection: "column",
// // // // // // // //     gap: "15px",
// // // // // // // //   },
// // // // // // // //   heading: {
// // // // // // // //     textAlign: "center",
// // // // // // // //     color: "#b03060",
// // // // // // // //   },
// // // // // // // //   input: {
// // // // // // // //     padding: "12px",
// // // // // // // //     borderRadius: "12px",
// // // // // // // //     border: "1px solid #ffb6d9",
// // // // // // // //     outline: "none",
// // // // // // // //     fontSize: "14px",
// // // // // // // //   },
// // // // // // // //   fileLabel: {
// // // // // // // //     background: "#ffe6f0",
// // // // // // // //     padding: "12px",
// // // // // // // //     borderRadius: "12px",
// // // // // // // //     cursor: "pointer",
// // // // // // // //     textAlign: "center",
// // // // // // // //     color: "#b03060",
// // // // // // // //     border: "1px solid #ffc0e0",
// // // // // // // //   },
// // // // // // // //   fileInput: { display: "none" },
// // // // // // // //   button: {
// // // // // // // //     marginTop: "10px",
// // // // // // // //     padding: "14px",
// // // // // // // //     borderRadius: "18px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // // // // // // //     color: "white",
// // // // // // // //     fontWeight: "600",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // //   songItem: {
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     alignItems: "center",
// // // // // // // //     marginBottom: "10px",
// // // // // // // //     padding: "8px",
// // // // // // // //     background: "#ffe6f0",
// // // // // // // //     borderRadius: "10px",
// // // // // // // //   },
// // // // // // // //   smallBtn: {
// // // // // // // //     marginRight: "8px",
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: "8px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff9ecb",
// // // // // // // //     color: "white",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // //   smallDelete: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: "8px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff4d94",
// // // // // // // //     color: "white",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export default AdminPanel;

// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";

// // // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // // function AdminPanel() {
// // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   // ---------------- FETCH DATA ----------------
// // // // // // // //   const fetchData = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // // //       setSongs(res.data);

// // // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // //       setAlbums(uniqueAlbums);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Fetch error:", error);
// // // // // // // //       alert("Failed to fetch songs");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   // ---------------- CREATE / UPDATE ----------------
// // // // // // // //   // ---------------- CREATE / UPDATE ----------------
// // // // // // // // const uploadOrUpdateSong = async () => {
// // // // // // // //   const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // //   // ✅ Proper validation
// // // // // // // //   if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // // //     alert("Title, Artist and Album are required");
// // // // // // // //     return;
// // // // // // // //   }

// // // // // // // //   // ✅ For create → audio & image must exist
// // // // // // // //   if (!editingId && (!audio || !image)) {
// // // // // // // //     alert("Audio and Image are required for new song");
// // // // // // // //     return;
// // // // // // // //   }

// // // // // // // //   const formData = new FormData();

// // // // // // // //   formData.append("title", title.trim());
// // // // // // // //   formData.append("artist", artist.trim());
// // // // // // // //   formData.append("album", finalAlbum.trim());

// // // // // // // //   // ✅ Only append if present (important for update)
// // // // // // // //   if (audio) formData.append("audio", audio);
// // // // // // // //   if (image) formData.append("image", image);

// // // // // // // //   try {
// // // // // // // //     setLoading(true);

// // // // // // // //     if (editingId) {
// // // // // // // //       // UPDATE
// // // // // // // //       await axios.put(`${API}/${editingId}`, formData);
// // // // // // // //       alert("Song updated successfully");
// // // // // // // //     } else {
// // // // // // // //       // CREATE
// // // // // // // //       await axios.post(`${API}/create`, formData, {
// // // // // // // //         headers: {
// // // // // // // //           "Content-Type": "multipart/form-data",
// // // // // // // //         },
// // // // // // // //       });
// // // // // // // //       alert("Song uploaded successfully");
// // // // // // // //     }

// // // // // // // //     resetForm();
// // // // // // // //     fetchData();
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Upload error:", error.response?.data || error);
// // // // // // // //     alert(error.response?.data?.message || "Upload failed");
// // // // // // // //   } finally {
// // // // // // // //     setLoading(false);
// // // // // // // //   }
// // // // // // // // };


// // // // // // // //   // ---------------- DELETE SONG ----------------
// // // // // // // //   const deleteSong = async (id) => {
// // // // // // // //     if (!window.confirm("Delete this song?")) return;

// // // // // // // //     try {
// // // // // // // //       await axios.delete(`${API}/${id}`);
// // // // // // // //       alert("Song deleted");
// // // // // // // //       fetchData();
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Delete song error:", error.response?.data || error);
// // // // // // // //       alert(error.response?.data?.message || "Delete failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- DELETE ALBUM ----------------
// // // // // // // //   const deleteAlbum = async () => {
// // // // // // // //     if (!album || album === "new") {
// // // // // // // //       alert("Select valid album");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (!window.confirm(`Delete entire album "${album}"?`)) return;

// // // // // // // //     try {
// // // // // // // //       await axios.delete(
// // // // // // // //         `${API}/albums/${encodeURIComponent(album)}`
// // // // // // // //       );
// // // // // // // //       alert("Album deleted");
// // // // // // // //       fetchData();
// // // // // // // //       setAlbum("");
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Delete album error:", error.response?.data || error);
// // // // // // // //       alert(error.response?.data?.message || "Album delete failed");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ---------------- EDIT MODE ----------------
// // // // // // // //   const editSong = (song) => {
// // // // // // // //     setEditingId(song._id);
// // // // // // // //     setTitle(song.title);
// // // // // // // //     setArtist(song.artist);
// // // // // // // //     setAlbum(song.album);
// // // // // // // //   };

// // // // // // // //   const resetForm = () => {
// // // // // // // //     setTitle("");
// // // // // // // //     setArtist("");
// // // // // // // //     setAlbum("");
// // // // // // // //     setNewAlbum("");
// // // // // // // //     setAudio(null);
// // // // // // // //     setImage(null);
// // // // // // // //     setEditingId(null);
// // // // // // // //   };

// // // // // // // //   // ---------------- UI ----------------
// // // // // // // //   return (
// // // // // // // //     <div style={styles.wrapper}>
// // // // // // // //       <div style={styles.card}>
// // // // // // // //         <h1 style={styles.heading}>
// // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // //         </h1>

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Song Title"
// // // // // // // //           value={title}
// // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Artist Name"
// // // // // // // //           value={artist}
// // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <select
// // // // // // // //           style={styles.input}
// // // // // // // //           value={album}
// // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // //         >
// // // // // // // //           <option value="">Select Album</option>
// // // // // // // //           {albums.map((alb, index) => (
// // // // // // // //             <option key={index} value={alb}>
// // // // // // // //               {alb}
// // // // // // // //             </option>
// // // // // // // //           ))}
// // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // //         </select>

// // // // // // // //         {album === "new" && (
// // // // // // // //           <input
// // // // // // // //             style={styles.input}
// // // // // // // //             placeholder="New Album Name"
// // // // // // // //             value={newAlbum}
// // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // //           />
// // // // // // // //         )}

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {audio ? `Audio: ${audio.name}` : "Upload Audio File"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="audio/*"
// // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {image ? `Image: ${image.name}` : "Upload Cover Image"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="image/*"
// // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <button
// // // // // // // //           style={styles.button}
// // // // // // // //           onClick={uploadOrUpdateSong}
// // // // // // // //           disabled={loading}
// // // // // // // //         >
// // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // //         </button>

// // // // // // // //         <button
// // // // // // // //           style={{ ...styles.button, background: "#ff4d94" }}
// // // // // // // //           onClick={deleteAlbum}
// // // // // // // //         >
// // // // // // // //           Delete Selected Album
// // // // // // // //         </button>

// // // // // // // //         <div style={{ marginTop: "20px" }}>
// // // // // // // //           {songs.map(song => (
// // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // //               <div>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallBtn}
// // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // //                 >
// // // // // // // //                   Edit
// // // // // // // //                 </button>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallDelete}
// // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // //                 >
// // // // // // // //                   Delete
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = {
// // // // // // // //   wrapper: {
// // // // // // // //     width: "98vw",
// // // // // // // //     minHeight: "100vh",
// // // // // // // //     background: "linear-gradient(135deg, #fff0f6, #ffd6e7, #ffc2dc)",
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     padding: "20px",
// // // // // // // //     boxSizing: "border-box",
// // // // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // // // //   },
// // // // // // // //   card: {
// // // // // // // //     width: "100%",
// // // // // // // //     maxWidth: "500px",
// // // // // // // //     background: "rgba(255,255,255,0.75)",
// // // // // // // //     backdropFilter: "blur(12px)",
// // // // // // // //     padding: "30px",
// // // // // // // //     borderRadius: "25px",
// // // // // // // //     boxShadow: "0 15px 35px rgba(255,105,180,0.2)",
// // // // // // // //     display: "flex",
// // // // // // // //     flexDirection: "column",
// // // // // // // //     gap: "15px",
// // // // // // // //   },
// // // // // // // //   heading: { textAlign: "center", color: "#b03060" },
// // // // // // // //   input: {
// // // // // // // //     padding: "12px",
// // // // // // // //     borderRadius: "12px",
// // // // // // // //     border: "1px solid #ffb6d9",
// // // // // // // //     fontSize: "14px",
// // // // // // // //   },
// // // // // // // //   fileLabel: {
// // // // // // // //     background: "#ffe6f0",
// // // // // // // //     padding: "12px",
// // // // // // // //     borderRadius: "12px",
// // // // // // // //     cursor: "pointer",
// // // // // // // //     textAlign: "center",
// // // // // // // //     color: "#b03060",
// // // // // // // //     border: "1px solid #ffc0e0",
// // // // // // // //   },
// // // // // // // //   fileInput: { display: "none" },
// // // // // // // //   button: {
// // // // // // // //     marginTop: "10px",
// // // // // // // //     padding: "14px",
// // // // // // // //     borderRadius: "18px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "linear-gradient(90deg, #ff8ecf, #ff5fa2)",
// // // // // // // //     color: "white",
// // // // // // // //     fontWeight: "600",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // //   songItem: {
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     alignItems: "center",
// // // // // // // //     marginBottom: "10px",
// // // // // // // //     padding: "8px",
// // // // // // // //     background: "#ffe6f0",
// // // // // // // //     borderRadius: "10px",
// // // // // // // //   },
// // // // // // // //   smallBtn: {
// // // // // // // //     marginRight: "8px",
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: "8px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff9ecb",
// // // // // // // //     color: "white",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // //   smallDelete: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: "8px",
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff4d94",
// // // // // // // //     color: "white",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export default AdminPanel;

// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";

// // // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // // function AdminPanel() {
// // // // // // // //   const [title, setTitle] = useState("");
// // // // // // // //   const [artist, setArtist] = useState("");
// // // // // // // //   const [album, setAlbum] = useState("");
// // // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   const fetchData = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // // //       setSongs(res.data);
// // // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // // //       setAlbums(uniqueAlbums);
// // // // // // // //     } catch (error) {
// // // // // // // //       alert("Failed to fetch songs");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchData();
// // // // // // // //   }, []);

// // // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // // //       alert("Title, Artist and Album are required");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     if (!editingId && (!audio || !image)) {
// // // // // // // //       alert("Audio and Image required");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append("title", title.trim());
// // // // // // // //     formData.append("artist", artist.trim());
// // // // // // // //     formData.append("album", finalAlbum.trim());

// // // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // // //     if (image) formData.append("image", image);

// // // // // // // //     try {
// // // // // // // //       setLoading(true);

// // // // // // // //       if (editingId) {
// // // // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // // // //         alert("Song updated");
// // // // // // // //       } else {
// // // // // // // //         await axios.post(`${API}/create`, formData, {
// // // // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // // // //         });
// // // // // // // //         alert("Song uploaded");
// // // // // // // //       }

// // // // // // // //       resetForm();
// // // // // // // //       fetchData();
// // // // // // // //     } catch {
// // // // // // // //       alert("Upload failed");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const deleteSong = async (id) => {
// // // // // // // //     if (!window.confirm("Delete song?")) return;
// // // // // // // //     await axios.delete(`${API}/${id}`);
// // // // // // // //     fetchData();
// // // // // // // //   };

// // // // // // // //   const deleteAlbum = async () => {
// // // // // // // //     if (!album || album === "new") return;
// // // // // // // //     if (!window.confirm("Delete album?")) return;
// // // // // // // //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// // // // // // // //     fetchData();
// // // // // // // //     setAlbum("");
// // // // // // // //   };

// // // // // // // //   const editSong = (song) => {
// // // // // // // //     setEditingId(song._id);
// // // // // // // //     setTitle(song.title);
// // // // // // // //     setArtist(song.artist);
// // // // // // // //     setAlbum(song.album);
// // // // // // // //   };

// // // // // // // //   const resetForm = () => {
// // // // // // // //     setTitle("");
// // // // // // // //     setArtist("");
// // // // // // // //     setAlbum("");
// // // // // // // //     setNewAlbum("");
// // // // // // // //     setAudio(null);
// // // // // // // //     setImage(null);
// // // // // // // //     setEditingId(null);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div style={styles.wrapper}>
// // // // // // // //       <div style={styles.card}>
// // // // // // // //         <h1 style={styles.heading}>
// // // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // // //         </h1>

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Song Title"
// // // // // // // //           value={title}
// // // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <input
// // // // // // // //           style={styles.input}
// // // // // // // //           placeholder="Artist Name"
// // // // // // // //           value={artist}
// // // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // // //         />

// // // // // // // //         <select
// // // // // // // //           style={styles.input}
// // // // // // // //           value={album}
// // // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // // //         >
// // // // // // // //           <option value="">Select Album</option>
// // // // // // // //           {albums.map((alb, i) => (
// // // // // // // //             <option key={i} value={alb}>{alb}</option>
// // // // // // // //           ))}
// // // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // // //         </select>

// // // // // // // //         {album === "new" && (
// // // // // // // //           <input
// // // // // // // //             style={styles.input}
// // // // // // // //             placeholder="New Album"
// // // // // // // //             value={newAlbum}
// // // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // // //           />
// // // // // // // //         )}

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {audio ? audio.name : "Upload Audio"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="audio/*"
// // // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <label style={styles.fileLabel}>
// // // // // // // //           {image ? image.name : "Upload Image"}
// // // // // // // //           <input
// // // // // // // //             type="file"
// // // // // // // //             accept="image/*"
// // // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // // //             style={styles.fileInput}
// // // // // // // //           />
// // // // // // // //         </label>

// // // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // // //         </button>

// // // // // // // //         <button
// // // // // // // //           style={{ ...styles.button, background: "#9ddcff" }}
// // // // // // // //           onClick={deleteAlbum}
// // // // // // // //         >
// // // // // // // //           Delete Album
// // // // // // // //         </button>

// // // // // // // //         <div style={{ marginTop: 20 }}>
// // // // // // // //           {songs.map(song => (
// // // // // // // //             <div key={song._id} style={styles.songItem}>
// // // // // // // //               <span>{song.title} - {song.album}</span>
// // // // // // // //               <div>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallBtn}
// // // // // // // //                   onClick={() => editSong(song)}
// // // // // // // //                 >
// // // // // // // //                   Edit
// // // // // // // //                 </button>
// // // // // // // //                 <button
// // // // // // // //                   style={styles.smallDelete}
// // // // // // // //                   onClick={() => deleteSong(song._id)}
// // // // // // // //                 >
// // // // // // // //                   Delete
// // // // // // // //                 </button>
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // const styles = {
// // // // // // // //   wrapper: {
// // // // // // // //     width: "98vw",
// // // // // // // //     minHeight: "100vh",
   
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "center",
// // // // // // // //     alignItems: "center",
// // // // // // // //     fontFamily: "Segoe UI",
// // // // // // // //     color: "black",
// // // // // // // //   },

// // // // // // // //   card: {
// // // // // // // //     width: "100%",
// // // // // // // //     maxWidth: "500px",
// // // // // // // //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// // // // // // // //     padding: 30,
// // // // // // // //     borderRadius: 25,
// // // // // // // //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// // // // // // // //     display: "flex",
// // // // // // // //     flexDirection: "column",
// // // // // // // //     gap: 15,
// // // // // // // //   },

// // // // // // // //   heading: { textAlign: "center", color: "black" },

// // // // // // // //   input: {
// // // // // // // //     padding: 12,
// // // // // // // //     borderRadius: 12,
// // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // //     fontSize: 14,
    
// // // // // // // //   },

// // // // // // // //   fileLabel: {
// // // // // // // //     background: "#e6f6ff",
// // // // // // // //     padding: 12,
// // // // // // // //     borderRadius: 12,
// // // // // // // //     cursor: "pointer",
// // // // // // // //     textAlign: "center",
// // // // // // // //     border: "1px solid #9ddcff",
// // // // // // // //     color: "black",
// // // // // // // //   },

// // // // // // // //   fileInput: { display: "none" },

// // // // // // // //   button: {
// // // // // // // //     marginTop: 10,
// // // // // // // //     padding: 14,
// // // // // // // //     borderRadius: 18,
// // // // // // // //     border: "none",
// // // // // // // //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// // // // // // // //     color: "black",
// // // // // // // //     fontWeight: 600,
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },

// // // // // // // //   songItem: {
// // // // // // // //     display: "flex",
// // // // // // // //     justifyContent: "space-between",
// // // // // // // //     padding: 10,
// // // // // // // //     background: "#eaf7ff",
// // // // // // // //     borderRadius: 10,
// // // // // // // //     marginBottom: 10,
// // // // // // // //     color: "black",
// // // // // // // //   },

// // // // // // // //   smallBtn: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: 8,
// // // // // // // //     border: "none",
// // // // // // // //     background: "#7ccfff",
// // // // // // // //     color: "black",
// // // // // // // //     cursor: "pointer",
// // // // // // // //     marginRight: 8,
// // // // // // // //   },

// // // // // // // //   smallDelete: {
// // // // // // // //     padding: "5px 10px",
// // // // // // // //     borderRadius: 8,
// // // // // // // //     border: "none",
// // // // // // // //     background: "#ff9ad1",
// // // // // // // //     color: "black",
// // // // // // // //     cursor: "pointer",
// // // // // // // //   },
// // // // // // // // };

// // // // // // // // export default AdminPanel;
// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";

// // // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // // function AdminPanel() {
// // // // // // //   const [title, setTitle] = useState("");
// // // // // // //   const [artist, setArtist] = useState("");
// // // // // // //   const [album, setAlbum] = useState("");
// // // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // // //   const [albums, setAlbums] = useState([]);
// // // // // // //   const [songs, setSongs] = useState([]);
// // // // // // //   const [audio, setAudio] = useState(null);
// // // // // // //   const [image, setImage] = useState(null);
// // // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   // NEW STATE (only for toggling songs visibility)
// // // // // // //   const [showSongs, setShowSongs] = useState(false);

// // // // // // //   const fetchData = async () => {
// // // // // // //     try {
// // // // // // //       const res = await axios.get(`${API}/`);
// // // // // // //       setSongs(res.data);
// // // // // // //       const uniqueAlbums = [...new Set(res.data.map(song => song.album))];
// // // // // // //       setAlbums(uniqueAlbums);
// // // // // // //     } catch (error) {
// // // // // // //       alert("Failed to fetch songs");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   const uploadOrUpdateSong = async () => {
// // // // // // //     const finalAlbum = album === "new" ? newAlbum : album;

// // // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum.trim()) {
// // // // // // //       alert("Title, Artist and Album are required");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (!editingId && (!audio || !image)) {
// // // // // // //       alert("Audio and Image required");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append("title", title.trim());
// // // // // // //     formData.append("artist", artist.trim());
// // // // // // //     formData.append("album", finalAlbum.trim());

// // // // // // //     if (audio) formData.append("audio", audio);
// // // // // // //     if (image) formData.append("image", image);

// // // // // // //     try {
// // // // // // //       setLoading(true);

// // // // // // //       if (editingId) {
// // // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // // //         alert("Song updated");
// // // // // // //       } else {
// // // // // // //         await axios.post(`${API}/create`, formData, {
// // // // // // //           headers: { "Content-Type": "multipart/form-data" },
// // // // // // //         });
// // // // // // //         alert("Song uploaded");
// // // // // // //       }

// // // // // // //       resetForm();
// // // // // // //       fetchData();
// // // // // // //     } catch {
// // // // // // //       alert("Upload failed");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteSong = async (id) => {
// // // // // // //     if (!window.confirm("Delete song?")) return;
// // // // // // //     await axios.delete(`${API}/${id}`);
// // // // // // //     fetchData();
// // // // // // //   };

// // // // // // //   const deleteAlbum = async () => {
// // // // // // //     if (!album || album === "new") return;
// // // // // // //     if (!window.confirm("Delete album?")) return;
// // // // // // //     await axios.delete(`${API}/albums/${encodeURIComponent(album)}`);
// // // // // // //     fetchData();
// // // // // // //     setAlbum("");
// // // // // // //   };

// // // // // // //   const editSong = (song) => {
// // // // // // //     setEditingId(song._id);
// // // // // // //     setTitle(song.title);
// // // // // // //     setArtist(song.artist);
// // // // // // //     setAlbum(song.album);
// // // // // // //   };

// // // // // // //   const resetForm = () => {
// // // // // // //     setTitle("");
// // // // // // //     setArtist("");
// // // // // // //     setAlbum("");
// // // // // // //     setNewAlbum("");
// // // // // // //     setAudio(null);
// // // // // // //     setImage(null);
// // // // // // //     setEditingId(null);
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div style={styles.wrapper}>
// // // // // // //       <div style={styles.card}>
// // // // // // //         <h1 style={styles.heading}>
// // // // // // //           {editingId ? "Update Song" : "Admin Upload Panel"}
// // // // // // //         </h1>

// // // // // // //         <input
// // // // // // //           style={styles.input}
// // // // // // //           placeholder="Song Title"
// // // // // // //           value={title}
// // // // // // //           onChange={(e) => setTitle(e.target.value)}
// // // // // // //         />

// // // // // // //         <input
// // // // // // //           style={styles.input}
// // // // // // //           placeholder="Artist Name"
// // // // // // //           value={artist}
// // // // // // //           onChange={(e) => setArtist(e.target.value)}
// // // // // // //         />

// // // // // // //         <select
// // // // // // //           style={styles.input}
// // // // // // //           value={album}
// // // // // // //           onChange={(e) => setAlbum(e.target.value)}
// // // // // // //         >
// // // // // // //           <option value="">Select Album</option>
// // // // // // //           {albums.map((alb, i) => (
// // // // // // //             <option key={i} value={alb}>{alb}</option>
// // // // // // //           ))}
// // // // // // //           <option value="new">+ Create New Album</option>
// // // // // // //         </select>

// // // // // // //         {album === "new" && (
// // // // // // //           <input
// // // // // // //             style={styles.input}
// // // // // // //             placeholder="New Album"
// // // // // // //             value={newAlbum}
// // // // // // //             onChange={(e) => setNewAlbum(e.target.value)}
// // // // // // //           />
// // // // // // //         )}

// // // // // // //         <label style={styles.fileLabel}>
// // // // // // //           {audio ? audio.name : "Upload Audio"}
// // // // // // //           <input
// // // // // // //             type="file"
// // // // // // //             accept="audio/*"
// // // // // // //             onChange={(e) => setAudio(e.target.files[0])}
// // // // // // //             style={styles.fileInput}
// // // // // // //           />
// // // // // // //         </label>

// // // // // // //         <label style={styles.fileLabel}>
// // // // // // //           {image ? image.name : "Upload Image"}
// // // // // // //           <input
// // // // // // //             type="file"
// // // // // // //             accept="image/*"
// // // // // // //             onChange={(e) => setImage(e.target.files[0])}
// // // // // // //             style={styles.fileInput}
// // // // // // //           />
// // // // // // //         </label>

// // // // // // //         <button style={styles.button} onClick={uploadOrUpdateSong}>
// // // // // // //           {editingId ? "Update Song" : "Upload Song"}
// // // // // // //         </button>

// // // // // // //         <button
// // // // // // //           style={{ ...styles.button, background: "#9ddcff" }}
// // // // // // //           onClick={deleteAlbum}
// // // // // // //         >
// // // // // // //           Delete Album
// // // // // // //         </button>

// // // // // // //         {/* NEW BUTTON */}
// // // // // // //         <button
// // // // // // //           style={{ ...styles.button, background: "#eaf7ff" }}
// // // // // // //           onClick={() => setShowSongs(!showSongs)}
// // // // // // //         >
// // // // // // //           Your Songs
// // // // // // //         </button>

// // // // // // //         {/* SONG LIST (Hidden initially) */}
// // // // // // //         {showSongs && (
// // // // // // //           <div style={styles.songListWrapper}>
// // // // // // //             {songs.map(song => (
// // // // // // //               <div key={song._id} style={styles.songItem}>
// // // // // // //                 <span>{song.title} - {song.album}</span>
// // // // // // //                 <div>
// // // // // // //                   <button
// // // // // // //                     style={styles.smallBtn}
// // // // // // //                     onClick={() => editSong(song)}
// // // // // // //                   >
// // // // // // //                     Edit
// // // // // // //                   </button>
// // // // // // //                   <button
// // // // // // //                     style={styles.smallDelete}
// // // // // // //                     onClick={() => deleteSong(song._id)}
// // // // // // //                   >
// // // // // // //                     Delete
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = {
// // // // // // //   wrapper: {
// // // // // // //     width: "100%",
// // // // // // //     minHeight: "100vh",
// // // // // // //     display: "flex",
// // // // // // //     justifyContent: "center",
// // // // // // //     alignItems: "center",
// // // // // // //     fontFamily: "Segoe UI",
// // // // // // //     color: "black",
// // // // // // //     padding: 15,
// // // // // // //     boxSizing: "border-box",
// // // // // // //   },

// // // // // // //   card: {
// // // // // // //     width: "100%",
// // // // // // //     maxWidth: "500px",
// // // // // // //     background: "linear-gradient(135deg,#ffe0f3,#d6f0ff)",
// // // // // // //     padding: 20,
// // // // // // //     borderRadius: 25,
// // // // // // //     boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
// // // // // // //     display: "flex",
// // // // // // //     flexDirection: "column",
// // // // // // //     gap: 15,
// // // // // // //     boxSizing: "border-box",
// // // // // // //   },

// // // // // // //   heading: { textAlign: "center", color: "black" },

// // // // // // //   input: {
// // // // // // //     padding: 12,
// // // // // // //     borderRadius: 12,
// // // // // // //     border: "1px solid #9ddcff",
// // // // // // //     fontSize: 14,
// // // // // // //     width: "100%",
// // // // // // //     boxSizing: "border-box",
// // // // // // //   },

// // // // // // //   fileLabel: {
// // // // // // //     background: "#e6f6ff",
// // // // // // //     padding: 12,
// // // // // // //     borderRadius: 12,
// // // // // // //     cursor: "pointer",
// // // // // // //     textAlign: "center",
// // // // // // //     border: "1px solid #9ddcff",
// // // // // // //     color: "black",
// // // // // // //     width: "100%",
// // // // // // //     boxSizing: "border-box",
// // // // // // //   },

// // // // // // //   fileInput: { display: "none" },

// // // // // // //   // ALL BUTTONS borderRadius 2px
// // // // // // //   button: {
// // // // // // //     marginTop: 10,
// // // // // // //     padding: 14,
// // // // // // //     borderRadius: 2,
// // // // // // //     border: "none",
// // // // // // //     background: "linear-gradient(90deg,#ff9ad1,#7ccfff)",
// // // // // // //     color: "black",
// // // // // // //     fontWeight: 600,
// // // // // // //     cursor: "pointer",
// // // // // // //     width: "100%",
// // // // // // //   },

// // // // // // //   songListWrapper: {
// // // // // // //     marginTop: 20,
// // // // // // //     width: "100%",
// // // // // // //   },

// // // // // // //   songItem: {
// // // // // // //     display: "flex",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     alignItems: "center",
// // // // // // //     padding: 10,
// // // // // // //     background: "#eaf7ff",
// // // // // // //     borderRadius: 10,
// // // // // // //     marginBottom: 10,
// // // // // // //     color: "black",
// // // // // // //     flexWrap: "wrap",
// // // // // // //     gap: 10,
// // // // // // //   },

// // // // // // //   smallBtn: {
// // // // // // //     padding: "5px 10px",
// // // // // // //     borderRadius: 2,
// // // // // // //     border: "none",
// // // // // // //     background: "#7ccfff",
// // // // // // //     color: "black",
// // // // // // //     cursor: "pointer",
// // // // // // //     marginRight: 8,
// // // // // // //   },

// // // // // // //   smallDelete: {
// // // // // // //     padding: "5px 10px",
// // // // // // //     borderRadius: 2,
// // // // // // //     border: "none",
// // // // // // //     background: "#ff9ad1",
// // // // // // //     color: "black",
// // // // // // //     cursor: "pointer",
// // // // // // //   },
// // // // // // // };

// // // // // // // export default AdminPanel;

// // // // // // import axios from "axios";
// // // // // // import { FaPlus, FaTrash, FaEdit, FaUpload, FaMusic, FaSearch, FaTimes, FaCheck, FaChevronDown, FaList, FaCloudUploadAlt } from "react-icons/fa";
// // // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // export default function AdminPanel() {
// // // // // //   const [songs, setSongs] = useState([]);
// // // // // //   const [albums, setAlbums] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // // // //   const [activeView, setActiveView] = useState("upload"); // upload | songs | batch
// // // // // //   const [showSongs, setShowSongs] = useState(false);
// // // // // //   const [searchQuery, setSearchQuery] = useState("");
// // // // // //   const [editingId, setEditingId] = useState(null);
// // // // // //   const [toast, setToast] = useState(null);
// // // // // //   const [deleteConfirm, setDeleteConfirm] = useState(null);

// // // // // //   // Form
// // // // // //   const [title, setTitle] = useState("");
// // // // // //   const [artist, setArtist] = useState("");
// // // // // //   const [album, setAlbum] = useState("");
// // // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // // //   const [audio, setAudio] = useState(null);
// // // // // //   const [image, setImage] = useState(null);

// // // // // //   // Batch JSON upload
// // // // // //   const [batchJson, setBatchJson] = useState("");
// // // // // //   const [batchFile, setBatchFile] = useState(null);
// // // // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // // // //   const [batchResults, setBatchResults] = useState([]);

// // // // // //   const audioInputRef = useRef(null);
// // // // // //   const imageInputRef = useRef(null);

// // // // // //   const showToast = (msg, type = "success") => {
// // // // // //     setToast({ msg, type });
// // // // // //     setTimeout(() => setToast(null), 3000);
// // // // // //   };

// // // // // //   const fetchData = async () => {
// // // // // //     setFetchLoading(true);
// // // // // //     try {
// // // // // //       const res = await axios.get(`${API}/`);
// // // // // //       setSongs(res.data);
// // // // // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // // // // //     } catch {
// // // // // //       showToast("Failed to fetch songs", "error");
// // // // // //     } finally {
// // // // // //       setFetchLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => { fetchData(); }, []);

// // // // // //   const resetForm = () => {
// // // // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // // // // //     setAudio(null); setImage(null); setEditingId(null);
// // // // // //     if (audioInputRef.current) audioInputRef.current.value = "";
// // // // // //     if (imageInputRef.current) imageInputRef.current.value = "";
// // // // // //   };

// // // // // //   const uploadOrUpdate = async () => {
// // // // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // // // //     if (!title.trim() || !artist.trim() || !finalAlbum) {
// // // // // //       showToast("Title, Artist and Album required", "error"); return;
// // // // // //     }
// // // // // //     if (!editingId && (!audio || !image)) {
// // // // // //       showToast("Audio and Image required for new song", "error"); return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append("title", title.trim());
// // // // // //     formData.append("artist", artist.trim());
// // // // // //     formData.append("album", finalAlbum);
// // // // // //     if (audio) formData.append("audio", audio);
// // // // // //     if (image) formData.append("image", image);

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       if (editingId) {
// // // // // //         await axios.put(`${API}/${editingId}`, formData);
// // // // // //         showToast("Song updated successfully!");
// // // // // //       } else {
// // // // // //         await axios.post(`${API}/create`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// // // // // //         showToast("Song uploaded successfully!");
// // // // // //       }
// // // // // //       resetForm();
// // // // // //       fetchData();
// // // // // //     } catch (err) {
// // // // // //       showToast(err.response?.data?.message || "Operation failed", "error");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteSong = async (id) => {
// // // // // //     try {
// // // // // //       await axios.delete(`${API}/${id}`);
// // // // // //       showToast("Song deleted");
// // // // // //       setDeleteConfirm(null);
// // // // // //       fetchData();
// // // // // //     } catch {
// // // // // //       showToast("Delete failed", "error");
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteAlbum = async (albumName) => {
// // // // // //     try {
// // // // // //       await axios.delete(`${API}/albums/${encodeURIComponent(albumName)}`);
// // // // // //       showToast(`Album "${albumName}" deleted`);
// // // // // //       setDeleteConfirm(null);
// // // // // //       fetchData();
// // // // // //     } catch {
// // // // // //       showToast("Album delete failed", "error");
// // // // // //     }
// // // // // //   };

// // // // // //   const editSong = (song) => {
// // // // // //     setEditingId(song._id);
// // // // // //     setTitle(song.title);
// // // // // //     setArtist(song.artist);
// // // // // //     setAlbum(song.album);
// // // // // //     setActiveView("upload");
// // // // // //     window.scrollTo(0, 0);
// // // // // //   };

// // // // // //   // Batch upload via JSON
// // // // // //   const handleBatchJsonUpload = async () => {
// // // // // //     let parsed;
// // // // // //     try { parsed = JSON.parse(batchJson); }
// // // // // //     catch { showToast("Invalid JSON format", "error"); return; }
// // // // // //     if (!Array.isArray(parsed)) { showToast("JSON must be an array of songs", "error"); return; }

// // // // // //     setBatchLoading(true);
// // // // // //     setBatchResults([]);
// // // // // //     const results = [];

// // // // // //     for (const item of parsed) {
// // // // // //       try {
// // // // // //         if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // // // // //           results.push({ title: item.title || "?", status: "failed", error: "Missing fields" });
// // // // // //           continue;
// // // // // //         }
// // // // // //         await axios.post(`${API}/create-from-url`, item);
// // // // // //         results.push({ title: item.title, status: "success" });
// // // // // //       } catch (err) {
// // // // // //         results.push({ title: item.title || "?", status: "failed", error: err.response?.data?.message || "Failed" });
// // // // // //       }
// // // // // //     }

// // // // // //     setBatchResults(results);
// // // // // //     setBatchLoading(false);
// // // // // //     const success = results.filter(r => r.status === "success").length;
// // // // // //     showToast(`Batch done: ${success}/${parsed.length} uploaded`);
// // // // // //     if (success > 0) fetchData();
// // // // // //   };

// // // // // //   const handleBatchFileRead = (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (!file) return;
// // // // // //     const reader = new FileReader();
// // // // // //     reader.onload = (ev) => setBatchJson(ev.target.result);
// // // // // //     reader.readAsText(file);
// // // // // //   };

// // // // // //   const filteredSongs = songs.filter(s =>
// // // // // //     s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // //     s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // // //     s.album.toLowerCase().includes(searchQuery.toLowerCase())
// // // // // //   );

// // // // // //   const albumGroups = songs.reduce((acc, s) => {
// // // // // //     if (!acc[s.album]) acc[s.album] = [];
// // // // // //     acc[s.album].push(s);
// // // // // //     return acc;
// // // // // //   }, {});

// // // // // //   return (
// // // // // //     <div style={a.root}>
// // // // // //       <style>{`
// // // // // //         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap');
// // // // // //         * { box-sizing: border-box; margin: 0; padding: 0; }
// // // // // //         ::-webkit-scrollbar { width: 4px; }
// // // // // //         ::-webkit-scrollbar-thumb { background: #e0c8f0; border-radius: 10px; }
// // // // // //         @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
// // // // // //         @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
// // // // // //         @keyframes spin2 { to { transform: rotate(360deg); } }
// // // // // //         .fade-up { animation: fadeUp 0.3s ease; }
// // // // // //         input:focus, select:focus, textarea:focus { outline: 2px solid #ff6db0 !important; outline-offset: 0; }
// // // // // //         input::placeholder, textarea::placeholder { color: #b0a8c0; }
// // // // // //         button:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.15s; }
// // // // // //       `}</style>

// // // // // //       {/* Toast */}
// // // // // //       {toast && (
// // // // // //         <div style={{...a.toast, background: toast.type === "error" ? "#ff4d7e" : "#22c55e"}} className="slide-in">
// // // // // //           {toast.type === "success" ? <FaCheck size={12} /> : <FaTimes size={12} />}
// // // // // //           {toast.msg}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Delete Confirm Modal */}
// // // // // //       {deleteConfirm && (
// // // // // //         <div style={a.modalOverlay} onClick={() => setDeleteConfirm(null)}>
// // // // // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // // // // //             <h3 style={a.modalTitle}>Confirm Delete</h3>
// // // // // //             <p style={a.modalText}>{deleteConfirm.message}</p>
// // // // // //             <div style={a.modalActions}>
// // // // // //               <button style={a.modalCancel} onClick={() => setDeleteConfirm(null)}>Cancel</button>
// // // // // //               <button style={a.modalDelete} onClick={deleteConfirm.action}>Delete</button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <div style={a.layout}>
// // // // // //         {/* Sidebar */}
// // // // // //         <div style={a.sidebar}>
// // // // // //           <div style={a.logo}>⚡ Admin</div>
// // // // // //           <div style={a.stats}>
// // // // // //             <div style={a.statItem}><span style={a.statNum}>{songs.length}</span><span style={a.statLabel}>Songs</span></div>
// // // // // //             <div style={a.statItem}><span style={a.statNum}>{albums.length}</span><span style={a.statLabel}>Albums</span></div>
// // // // // //           </div>
// // // // // //           {[
// // // // // //             {id:"upload", icon:<FaUpload size={14}/>, label: editingId ? "Edit Song" : "Upload"},
// // // // // //             {id:"songs", icon:<FaList size={14}/>, label:"Library"},
// // // // // //             {id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Batch Upload"},
// // // // // //           ].map(tab => (
// // // // // //             <div key={tab.id} style={{...a.navItem, ...(activeView === tab.id ? a.navItemActive : {})}}
// // // // // //               onClick={() => setActiveView(tab.id)}>
// // // // // //               {tab.icon} {tab.label}
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //         <div style={a.content}>
// // // // // //           {/* Upload Form */}
// // // // // //           {activeView === "upload" && (
// // // // // //             <div style={a.card} className="fade-up">
// // // // // //               <div style={a.cardHeader}>
// // // // // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // // // // //                 {editingId && <button style={a.cancelEditBtn} onClick={resetForm}>Cancel Edit</button>}
// // // // // //               </div>

// // // // // //               <div style={a.formGrid}>
// // // // // //                 <div style={a.formGroup}>
// // // // // //                   <label style={a.label}>Song Title *</label>
// // // // // //                   <input style={a.input} placeholder="Enter song title" value={title} onChange={e => setTitle(e.target.value)} />
// // // // // //                 </div>
// // // // // //                 <div style={a.formGroup}>
// // // // // //                   <label style={a.label}>Artist Name *</label>
// // // // // //                   <input style={a.input} placeholder="Enter artist name" value={artist} onChange={e => setArtist(e.target.value)} />
// // // // // //                 </div>
// // // // // //                 <div style={a.formGroup}>
// // // // // //                   <label style={a.label}>Album *</label>
// // // // // //                   <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
// // // // // //                     <option value="">Select Album</option>
// // // // // //                     {albums.map((alb, i) => <option key={i} value={alb}>{alb}</option>)}
// // // // // //                     <option value="__new__">+ Create New Album</option>
// // // // // //                   </select>
// // // // // //                 </div>
// // // // // //                 {album === "__new__" && (
// // // // // //                   <div style={a.formGroup}>
// // // // // //                     <label style={a.label}>New Album Name *</label>
// // // // // //                     <input style={a.input} placeholder="New album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
// // // // // //                   </div>
// // // // // //                 )}
// // // // // //               </div>

// // // // // //               <div style={a.uploadRow}>
// // // // // //                 <label style={{...a.uploadBox, ...(audio ? a.uploadBoxFilled : {})}}>
// // // // // //                   <FaMusic size={20} color={audio ? "#ff6db0" : "#b0a8c0"} />
// // // // // //                   <span style={a.uploadBoxLabel}>{audio ? audio.name : "Upload Audio File"}</span>
// // // // // //                   <span style={a.uploadBoxSub}>{audio ? `${(audio.size/1024/1024).toFixed(1)} MB` : "MP3, WAV, OGG"}</span>
// // // // // //                   <input ref={audioInputRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{display:"none"}} />
// // // // // //                 </label>

// // // // // //                 <label style={{...a.uploadBox, ...(image ? a.uploadBoxFilled : {})}}>
// // // // // //                   {image ? (
// // // // // //                     <img src={URL.createObjectURL(image)} alt="" style={a.previewThumb} />
// // // // // //                   ) : (
// // // // // //                     <FaUpload size={20} color="#b0a8c0" />
// // // // // //                   )}
// // // // // //                   <span style={a.uploadBoxLabel}>{image ? image.name : "Upload Cover Image"}</span>
// // // // // //                   <span style={a.uploadBoxSub}>{image ? `${(image.size/1024/1024).toFixed(1)} MB` : "JPG, PNG, WEBP"}</span>
// // // // // //                   <input ref={imageInputRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{display:"none"}} />
// // // // // //                 </label>
// // // // // //               </div>

// // // // // //               <button style={{...a.btn, ...(loading ? a.btnDisabled : {})}} onClick={uploadOrUpdate} disabled={loading}>
// // // // // //                 {loading ? <span style={a.spinner} /> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* Library */}
// // // // // //           {activeView === "songs" && (
// // // // // //             <div className="fade-up">
// // // // // //               <div style={a.libHeader}>
// // // // // //                 <h2 style={a.cardTitle}>🎵 Library</h2>
// // // // // //                 <div style={a.searchBar}>
// // // // // //                   <FaSearch color="#b0a8c0" size={13} />
// // // // // //                   <input style={a.searchInput} placeholder="Search songs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
// // // // // //                   {searchQuery && <button style={a.clearBtn} onClick={() => setSearchQuery("")}><FaTimes size={12} /></button>}
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               {fetchLoading ? (
// // // // // //                 <div style={a.loadingMsg}>Loading library...</div>
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   {/* Albums Section */}
// // // // // //                   {!searchQuery && (
// // // // // //                     <div style={a.albumList}>
// // // // // //                       {Object.entries(albumGroups).map(([albumName, albumSongs]) => (
// // // // // //                         <div key={albumName} style={a.albumGroup}>
// // // // // //                           <div style={a.albumGroupHeader}>
// // // // // //                             <div style={a.albumGroupLeft}>
// // // // // //                               <img src={albumSongs[0]?.imageUrl} alt="" style={a.albumGroupImg} />
// // // // // //                               <div>
// // // // // //                                 <div style={a.albumGroupName}>{albumName}</div>
// // // // // //                                 <div style={a.albumGroupCount}>{albumSongs.length} songs</div>
// // // // // //                               </div>
// // // // // //                             </div>
// // // // // //                             <button style={a.deleteAlbumBtn} onClick={() => setDeleteConfirm({
// // // // // //                               message: `Delete entire album "${albumName}" and all ${albumSongs.length} songs?`,
// // // // // //                               action: () => deleteAlbum(albumName)
// // // // // //                             })}>
// // // // // //                               <FaTrash size={12} /> Delete Album
// // // // // //                             </button>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                       ))}
// // // // // //                     </div>
// // // // // //                   )}

// // // // // //                   {/* Songs list */}
// // // // // //                   <div style={a.songsList}>
// // // // // //                     {filteredSongs.map((song, i) => (
// // // // // //                       <div key={song._id} style={a.songRow}>
// // // // // //                         <div style={a.songLeft}>
// // // // // //                           <span style={a.songIdx}>{i + 1}</span>
// // // // // //                           <img src={song.imageUrl} alt="" style={a.songThumb} />
// // // // // //                           <div style={a.songInfo}>
// // // // // //                             <div style={a.songTitle}>{song.title}</div>
// // // // // //                             <div style={a.songMeta}>{song.artist} · {song.album}</div>
// // // // // //                           </div>
// // // // // //                         </div>
// // // // // //                         <div style={a.songActions}>
// // // // // //                           <button style={a.editBtn} onClick={() => editSong(song)}><FaEdit size={13} /></button>
// // // // // //                           <button style={a.deleteBtn} onClick={() => setDeleteConfirm({
// // // // // //                             message: `Delete "${song.title}" by ${song.artist}?`,
// // // // // //                             action: () => deleteSong(song._id)
// // // // // //                           })}><FaTrash size={13} /></button>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     ))}
// // // // // //                     {filteredSongs.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
// // // // // //                   </div>
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* Batch Upload */}
// // // // // //           {activeView === "batch" && (
// // // // // //             <div style={a.card} className="fade-up">
// // // // // //               <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
// // // // // //               <p style={a.helpText}>Upload multiple songs at once using a JSON array. Each song must have: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>
              
// // // // // //               <div style={a.jsonExample}>
// // // // // //                 <div style={a.jsonExampleTitle}>Example Format:</div>
// // // // // //                 <pre style={a.jsonPre}>{`[
// // // // // //   {
// // // // // //     "title": "Song Name",
// // // // // //     "artist": "Artist Name",
// // // // // //     "album": "Album Name",
// // // // // //     "audioUrl": "https://...",
// // // // // //     "imageUrl": "https://..."
// // // // // //   }
// // // // // // ]`}</pre>
// // // // // //               </div>

// // // // // //               <label style={a.fileJsonLabel}>
// // // // // //                 <FaUpload size={14} /> Upload JSON File
// // // // // //                 <input type="file" accept=".json" onChange={handleBatchFileRead} style={{display:"none"}} />
// // // // // //               </label>
              
// // // // // //               <div style={a.orDivider}><span>or paste JSON below</span></div>

// // // // // //               <textarea
// // // // // //                 style={a.jsonTextarea}
// // // // // //                 placeholder='[{"title": "...", "artist": "...", "album": "...", "audioUrl": "...", "imageUrl": "..."}]'
// // // // // //                 value={batchJson}
// // // // // //                 onChange={e => setBatchJson(e.target.value)}
// // // // // //                 rows={10}
// // // // // //               />

// // // // // //               <button style={{...a.btn, ...(batchLoading ? a.btnDisabled : {})}} onClick={handleBatchJsonUpload} disabled={batchLoading}>
// // // // // //                 {batchLoading ? <><span style={a.spinner} /> Uploading...</> : "↑ Upload All Songs"}
// // // // // //               </button>

// // // // // //               {batchResults.length > 0 && (
// // // // // //                 <div style={a.batchResults}>
// // // // // //                   <div style={a.batchResultsTitle}>Results ({batchResults.filter(r=>r.status==="success").length}/{batchResults.length} success)</div>
// // // // // //                   {batchResults.map((r, i) => (
// // // // // //                     <div key={i} style={{...a.batchResultItem, borderLeft:`3px solid ${r.status==="success" ? "#22c55e" : "#ff4d7e"}`}}>
// // // // // //                       <span>{r.status === "success" ? "✓" : "✗"} {r.title}</span>
// // // // // //                       {r.error && <span style={a.batchError}>{r.error}</span>}
// // // // // //                     </div>
// // // // // //                   ))}
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // const PINK = "#ff6db0";
// // // // // // const BLUE = "#5db8ff";
// // // // // // const TEXT = "#1a1a2e";
// // // // // // const MUTED = "#9098b1";
// // // // // // const BG = "#f8f5ff";
// // // // // // const CARD_BG = "#ffffff";
// // // // // // const BORDER = "#ede8f7";

// // // // // // const a = {
// // // // // //   root: { fontFamily:"'Sora', sans-serif", background:BG, minHeight:"100vh", color:TEXT, position:"relative" },

// // // // // //   toast: { position:"fixed", top:20, right:20, padding:"12px 20px", borderRadius:12, color:"#fff", fontSize:13, fontWeight:600, zIndex:9999, display:"flex", alignItems:"center", gap:8, boxShadow:"0 8px 24px rgba(0,0,0,0.15)", animation:"slideIn 0.3s ease" },

// // // // // //   modalOverlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 },
// // // // // //   modal: { background:CARD_BG, borderRadius:20, padding:28, maxWidth:360, width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.2)" },
// // // // // //   modalTitle: { fontSize:18, fontWeight:700, marginBottom:8 },
// // // // // //   modalText: { fontSize:14, color:MUTED, marginBottom:20, lineHeight:1.6 },
// // // // // //   modalActions: { display:"flex", gap:12, justifyContent:"flex-end" },
// // // // // //   modalCancel: { padding:"10px 20px", borderRadius:10, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", fontSize:13, fontWeight:600, color:TEXT },
// // // // // //   modalDelete: { padding:"10px 20px", borderRadius:10, border:"none", background:"#ff4d7e", color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600 },

// // // // // //   layout: { display:"flex", minHeight:"100vh" },
// // // // // //   sidebar: { width:200, background:CARD_BG, borderRight:`1px solid ${BORDER}`, padding:"24px 16px", display:"flex", flexDirection:"column", gap:4, position:"sticky", top:0, height:"100vh", flexShrink:0 },
// // // // // //   logo: { fontSize:18, fontWeight:700, color:PINK, padding:"0 12px", marginBottom:20 },
// // // // // //   stats: { display:"flex", gap:12, marginBottom:20, padding:"12px", background:BG, borderRadius:12 },
// // // // // //   statItem: { flex:1, textAlign:"center" },
// // // // // //   statNum: { display:"block", fontSize:20, fontWeight:700, color:PINK },
// // // // // //   statLabel: { fontSize:10, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // //   navItem: { display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, cursor:"pointer", color:MUTED, fontSize:13, fontWeight:500 },
// // // // // //   navItemActive: { background:"#fff0f8", color:PINK, fontWeight:600 },

// // // // // //   content: { flex:1, padding:24, maxWidth:900, overflowY:"auto" },

// // // // // //   card: { background:CARD_BG, borderRadius:20, padding:28, boxShadow:"0 2px 20px rgba(0,0,0,0.05)", marginBottom:24, border:`1px solid ${BORDER}` },
// // // // // //   cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 },
// // // // // //   cardTitle: { fontSize:20, fontWeight:700, color:TEXT },
// // // // // //   cancelEditBtn: { padding:"6px 14px", borderRadius:8, border:`1px solid ${PINK}`, background:"none", color:PINK, cursor:"pointer", fontSize:12, fontWeight:600 },

// // // // // //   formGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginBottom:20 },
// // // // // //   formGroup: { display:"flex", flexDirection:"column", gap:6 },
// // // // // //   label: { fontSize:12, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // //   input: { padding:"12px 14px", borderRadius:10, border:`1.5px solid ${BORDER}`, fontSize:14, fontFamily:"inherit", color:TEXT, background:CARD_BG, transition:"border 0.2s" },

// // // // // //   uploadRow: { display:"flex", gap:16, marginBottom:24, flexWrap:"wrap" },
// // // // // //   uploadBox: { flex:1, minWidth:200, border:`2px dashed ${BORDER}`, borderRadius:14, padding:20, display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:BG, transition:"border 0.2s, background 0.2s" },
// // // // // //   uploadBoxFilled: { borderColor:PINK, background:"#fff8fd" },
// // // // // //   uploadBoxLabel: { fontSize:13, fontWeight:600, color:TEXT, textAlign:"center" },
// // // // // //   uploadBoxSub: { fontSize:11, color:MUTED },
// // // // // //   previewThumb: { width:48, height:48, borderRadius:8, objectFit:"cover" },

// // // // // //   btn: { width:"100%", padding:"14px", borderRadius:12, border:"none", background:`linear-gradient(135deg, ${PINK}, ${BLUE})`, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 },
// // // // // //   btnDisabled: { opacity:0.6, cursor:"not-allowed" },
// // // // // //   spinner: { width:16, height:16, border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin2 0.8s linear infinite" },

// // // // // //   libHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 },
// // // // // //   searchBar: { display:"flex", alignItems:"center", gap:10, background:CARD_BG, borderRadius:10, padding:"10px 14px", border:`1.5px solid ${BORDER}`, minWidth:220 },
// // // // // //   searchInput: { border:"none", outline:"none", fontSize:13, fontFamily:"inherit", color:TEXT, background:"none", width:160 },
// // // // // //   clearBtn: { background:"none", border:"none", cursor:"pointer", color:MUTED, display:"flex" },
// // // // // //   loadingMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:40 },

// // // // // //   albumList: { display:"flex", flexDirection:"column", gap:8, marginBottom:24 },
// // // // // //   albumGroup: { background:CARD_BG, borderRadius:14, overflow:"hidden", border:`1px solid ${BORDER}` },
// // // // // //   albumGroupHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px" },
// // // // // //   albumGroupLeft: { display:"flex", alignItems:"center", gap:12 },
// // // // // //   albumGroupImg: { width:44, height:44, borderRadius:8, objectFit:"cover" },
// // // // // //   albumGroupName: { fontSize:14, fontWeight:600, color:TEXT },
// // // // // //   albumGroupCount: { fontSize:11, color:MUTED },
// // // // // //   deleteAlbumBtn: { display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", color:"#ff4d7e", cursor:"pointer", fontSize:12, fontWeight:600 },

// // // // // //   songsList: { display:"flex", flexDirection:"column", gap:2 },
// // // // // //   songRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, background:CARD_BG, border:`1px solid ${BORDER}`, marginBottom:4, gap:12 },
// // // // // //   songLeft: { display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 },
// // // // // //   songIdx: { fontSize:12, color:MUTED, width:20, textAlign:"center", flexShrink:0 },
// // // // // //   songThumb: { width:44, height:44, borderRadius:8, objectFit:"cover", flexShrink:0 },
// // // // // //   songInfo: { minWidth:0 },
// // // // // //   songTitle: { fontSize:13, fontWeight:600, color:TEXT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
// // // // // //   songMeta: { fontSize:11, color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
// // // // // //   songActions: { display:"flex", gap:8, flexShrink:0 },
// // // // // //   editBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid ${BORDER}`, background:CARD_BG, cursor:"pointer", color:BLUE, display:"flex" },
// // // // // //   deleteBtn: { padding:"7px 10px", borderRadius:8, border:`1px solid #ffccd9`, background:"#fff8fa", cursor:"pointer", color:"#ff4d7e", display:"flex" },
// // // // // //   emptyMsg: { color:MUTED, fontSize:14, textAlign:"center", padding:32 },

// // // // // //   helpText: { fontSize:13, color:MUTED, lineHeight:1.7, marginBottom:20 },
// // // // // //   code: { fontFamily:"'DM Mono', monospace", background:BG, padding:"2px 6px", borderRadius:4, fontSize:12 },
// // // // // //   jsonExample: { background:BG, borderRadius:12, padding:16, marginBottom:16 },
// // // // // //   jsonExampleTitle: { fontSize:12, fontWeight:600, color:MUTED, marginBottom:8, textTransform:"uppercase", letterSpacing:0.5 },
// // // // // //   jsonPre: { fontFamily:"'DM Mono', monospace", fontSize:12, color:TEXT, whiteSpace:"pre-wrap", lineHeight:1.6 },
// // // // // //   fileJsonLabel: { display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:10, border:`1.5px dashed ${PINK}`, color:PINK, cursor:"pointer", fontSize:13, fontWeight:600, marginBottom:12 },
// // // // // //   orDivider: { textAlign:"center", color:MUTED, fontSize:12, margin:"12px 0", position:"relative" },
// // // // // //   jsonTextarea: { width:"100%", padding:"14px", borderRadius:12, border:`1.5px solid ${BORDER}`, fontSize:12, fontFamily:"'DM Mono', monospace", color:TEXT, resize:"vertical", lineHeight:1.6, background:BG, marginBottom:16 },
// // // // // //   batchResults: { marginTop:20, border:`1px solid ${BORDER}`, borderRadius:12, overflow:"hidden" },
// // // // // //   batchResultsTitle: { padding:"12px 16px", background:BG, fontSize:13, fontWeight:700, color:TEXT },
// // // // // //   batchResultItem: { display:"flex", justifyContent:"space-between", padding:"10px 16px", borderBottom:`1px solid ${BORDER}`, fontSize:13 },
// // // // // //   batchError: { color:"#ff4d7e", fontSize:11 },
// // // // // // };
// // // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // // import axios from "axios";
// // // // // import {
// // // // //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// // // // //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
// // // // // } from "react-icons/fa";

// // // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // // // ── Admins (username: password) ──
// // // // // const ADMINS = {
// // // // //   "admin": "vibe2024",
// // // // //   "revanth": "revv@123",
// // // // //   "superadmin": "music#999",
// // // // // };

// // // // // // ── Cached songs ──
// // // // // let _cache = null;

// // // // // const C = {
// // // // //   bg: "#0f0f12",
// // // // //   surface: "#18181b",
// // // // //   card: "#1f1f23",
// // // // //   border: "#2a2a2f",
// // // // //   accent: "#f59e0b",
// // // // //   accentDim: "rgba(245,158,11,0.08)",
// // // // //   accentBorder: "rgba(245,158,11,0.25)",
// // // // //   text: "#f4f4f5",
// // // // //   sub: "#a1a1aa",
// // // // //   muted: "#52525b",
// // // // //   error: "#ef4444",
// // // // //   success: "#22c55e",
// // // // // };
// // // // // export default function AdminPanel() {
// // // // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// // // // //   const [loginUser, setLoginUser] = useState("");
// // // // //   const [loginPass, setLoginPass] = useState("");
// // // // //   const [showPass, setShowPass] = useState(false);
// // // // //   const [loginErr, setLoginErr] = useState("");

// // // // //   const [songs, setSongs] = useState([]);
// // // // //   const [albums, setAlbums] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // // //   const [view, setView] = useState("upload"); // upload | library | batch
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [toast, setToast] = useState(null);
// // // // //   const [confirm, setConfirm] = useState(null);
// // // // //   const [editingId, setEditingId] = useState(null);

// // // // //   // form
// // // // //   const [title, setTitle] = useState("");
// // // // //   const [artist, setArtist] = useState("");
// // // // //   const [album, setAlbum] = useState("");
// // // // //   const [newAlbum, setNewAlbum] = useState("");
// // // // //   const [audio, setAudio] = useState(null);
// // // // //   const [image, setImage] = useState(null);
// // // // //   const audioRef = useRef(null);
// // // // //   const imageRef = useRef(null);

// // // // //   // batch
// // // // //   const [batchJson, setBatchJson] = useState("");
// // // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // // //   const [batchResults, setBatchResults] = useState([]);

// // // // //   // ─── AUTH ───
// // // // //   const handleLogin = (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoginErr("");
// // // // //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// // // // //     if (pass && pass === loginPass) {
// // // // //       sessionStorage.setItem("vo_admin", loginUser);
// // // // //       setAuthed(true);
// // // // //     } else {
// // // // //       setLoginErr("Invalid username or password.");
// // // // //     }
// // // // //   };

// // // // //   const logout = () => {
// // // // //     sessionStorage.removeItem("vo_admin");
// // // // //     setAuthed(false);
// // // // //     setLoginUser(""); setLoginPass("");
// // // // //   };

// // // // //   // ─── DATA ───
// // // // //   const showToast = (msg, type = "success") => {
// // // // //     setToast({ msg, type });
// // // // //     setTimeout(() => setToast(null), 3000);
// // // // //   };

// // // // //   const fetchData = useCallback(async (force = false) => {
// // // // //     setFetchLoading(true);
// // // // //     try {
// // // // //       if (_cache && !force) {
// // // // //         setSongs(_cache);
// // // // //         setAlbums([...new Set(_cache.map(s => s.album))]);
// // // // //         setFetchLoading(false);
// // // // //         return;
// // // // //       }
// // // // //       const res = await axios.get(`${API}/`);
// // // // //       _cache = res.data;
// // // // //       setSongs(res.data);
// // // // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // // // //     } catch {
// // // // //       showToast("Failed to fetch songs", "error");
// // // // //     } finally {
// // // // //       setFetchLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // // // //   const resetForm = () => {
// // // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // // // //     setAudio(null); setImage(null); setEditingId(null);
// // // // //     if (audioRef.current) audioRef.current.value = "";
// // // // //     if (imageRef.current) imageRef.current.value = "";
// // // // //   };

// // // // //   const submit = async () => {
// // // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // // // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }

// // // // //     const fd = new FormData();
// // // // //     fd.append("title", title.trim());
// // // // //     fd.append("artist", artist.trim());
// // // // //     fd.append("album", finalAlbum);
// // // // //     if (audio) fd.append("audio", audio);
// // // // //     if (image) fd.append("image", image);

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       if (editingId) {
// // // // //         await axios.put(`${API}/${editingId}`, fd);
// // // // //         showToast("Song updated!");
// // // // //       } else {
// // // // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // // // //         showToast("Song uploaded!");
// // // // //       }
// // // // //       resetForm();
// // // // //       _cache = null;
// // // // //       fetchData(true);
// // // // //     } catch (err) {
// // // // //       showToast(err.response?.data?.message || "Upload failed", "error");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const deleteSong = async (id) => {
// // // // //     try {
// // // // //       await axios.delete(`${API}/${id}`);
// // // // //       showToast("Song deleted");
// // // // //       setConfirm(null);
// // // // //       _cache = null;
// // // // //       fetchData(true);
// // // // //     } catch { showToast("Delete failed", "error"); }
// // // // //   };

// // // // //   const deleteAlbum = async (name) => {
// // // // //     try {
// // // // //       await axios.delete(`${API}/albums/${encodeURIComponent(name)}`);
// // // // //       showToast(`Album "${name}" deleted`);
// // // // //       setConfirm(null);
// // // // //       _cache = null;
// // // // //       fetchData(true);
// // // // //     } catch { showToast("Album delete failed", "error"); }
// // // // //   };

// // // // //   const editSong = (song) => {
// // // // //     setEditingId(song._id);
// // // // //     setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
// // // // //     setView("upload");
// // // // //     window.scrollTo(0, 0);
// // // // //   };

// // // // //   // ─── BATCH ───
// // // // //   const runBatch = async () => {
// // // // //     let parsed;
// // // // //     try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
// // // // //     if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }

// // // // //     setBatchLoading(true);
// // // // //     setBatchResults([]);
// // // // //     const results = [];

// // // // //     for (const item of parsed) {
// // // // //       if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // // // //         results.push({ title: item.title || "?", status: "fail", error: "Missing fields" });
// // // // //         continue;
// // // // //       }
// // // // //       try {
// // // // //         await axios.post(`${API}/create-from-url`, { title: item.title, artist: item.artist, album: item.album, audioUrl: item.audioUrl, imageUrl: item.imageUrl });
// // // // //         results.push({ title: item.title, status: "ok" });
// // // // //       } catch (err) {
// // // // //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// // // // //       }
// // // // //     }

// // // // //     setBatchResults(results);
// // // // //     setBatchLoading(false);
// // // // //     const ok = results.filter(r => r.status === "ok").length;
// // // // //     showToast(`Batch: ${ok}/${parsed.length} uploaded`);
// // // // //     if (ok > 0) { _cache = null; fetchData(true); }
// // // // //   };

// // // // //   const filtered = songs.filter(s =>
// // // // //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// // // // //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// // // // //     s.album.toLowerCase().includes(search.toLowerCase())
// // // // //   );

// // // // //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

// // // // //   // ─── LOGIN SCREEN ───
// // // // //   if (!authed) {
// // // // //     return (
// // // // //       <div style={l.root}>
// // // // //         <style>{`
// // // // //           @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
// // // // //           *{box-sizing:border-box;margin:0;padding:0;}
// // // // //           input:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
// // // // //           @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// // // // //         `}</style>
// // // // //         <div style={l.card}>
// // // // //           <div style={l.icon}><FaLock size={22} color={C.accent} /></div>
// // // // //           <h1 style={l.title}>Admin Access</h1>
// // // // //           <p style={l.sub}>Enter your credentials to continue</p>
// // // // //           {loginErr && <div style={l.err}>{loginErr}</div>}
// // // // //           <form onSubmit={handleLogin} style={l.form}>
// // // // //             <div style={l.field}>
// // // // //               <label style={l.label}>Username</label>
// // // // //               <div style={l.inputWrap}>
// // // // //                 <FaUser size={13} color={C.muted} />
// // // // //                 <input style={l.input} type="text" placeholder="admin" value={loginUser}
// // // // //                   onChange={e => setLoginUser(e.target.value)} autoFocus />
// // // // //               </div>
// // // // //             </div>
// // // // //             <div style={l.field}>
// // // // //               <label style={l.label}>Password</label>
// // // // //               <div style={l.inputWrap}>
// // // // //                 <FaLock size={13} color={C.muted} />
// // // // //                 <input style={l.input} type={showPass ? "text" : "password"} placeholder="••••••••" value={loginPass}
// // // // //                   onChange={e => setLoginPass(e.target.value)} />
// // // // //                 <button type="button" style={l.eyeBtn} onClick={() => setShowPass(!showPass)}>
// // // // //                   {showPass ? <FaEyeSlash size={13} color={C.muted} /> : <FaEye size={13} color={C.muted} />}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //             <button type="submit" style={l.btn}>Sign In →</button>
// // // // //           </form>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // ─── ADMIN PANEL ───
// // // // //   return (
// // // // //     <div style={a.root}>
// // // // //       <style>{`
// // // // //         @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
// // // // //         *{box-sizing:border-box;margin:0;padding:0;}
// // // // //         input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;outline-offset:0;}
// // // // //         input::placeholder,textarea::placeholder{color:${C.muted};}
// // // // //         @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// // // // //         @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
// // // // //         @keyframes spin2{to{transform:rotate(360deg)}}
// // // // //         @media(max-width:640px){
// // // // //           .admin-layout{flex-direction:column!important;}
// // // // //           .admin-sidebar{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;position:relative!important;height:auto!important;}
// // // // //           .admin-sidebar-logo{display:none!important;}
// // // // //           .admin-stats{display:none!important;}
// // // // //           .sidebar-nav{flex-direction:row!important;gap:4px!important;flex:1!important;}
// // // // //           .nav-item{padding:8px 14px!important;font-size:12px!important;}
// // // // //           .form-grid{grid-template-columns:1fr!important;}
// // // // //           .upload-row{flex-direction:column!important;}
// // // // //         }
// // // // //       `}</style>

// // // // //       {/* Toast */}
// // // // //       {toast && (
// // // // //         <div style={{ ...a.toast, background: toast.type === "error" ? C.error : C.success, animation: "slideIn 0.25s ease" }}>
// // // // //           {toast.type === "error" ? "✗" : "✓"} {toast.msg}
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Confirm modal */}
// // // // //       {confirm && (
// // // // //         <div style={a.overlay} onClick={() => setConfirm(null)}>
// // // // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // // // //             <h3 style={a.modalTitle}>Confirm Delete</h3>
// // // // //             <p style={a.modalMsg}>{confirm.msg}</p>
// // // // //             <div style={a.modalBtns}>
// // // // //               <button style={a.modalCancel} onClick={() => setConfirm(null)}>Cancel</button>
// // // // //               <button style={a.modalDelete} onClick={confirm.action}>Delete</button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       <div style={a.layout} className="admin-layout">
// // // // //         {/* Sidebar */}
// // // // //         <div style={a.sidebar} className="admin-sidebar">
// // // // //           <div style={a.sidebarLogo} className="admin-sidebar-logo">⚡ Admin</div>
// // // // //           <div style={a.stats} className="admin-stats">
// // // // //             <div style={a.stat}><span style={a.statN}>{songs.length}</span><span style={a.statL}>Songs</span></div>
// // // // //             <div style={a.statDiv} />
// // // // //             <div style={a.stat}><span style={a.statN}>{albums.length}</span><span style={a.statL}>Albums</span></div>
// // // // //           </div>
// // // // //           <div style={a.sidebarNav} className="sidebar-nav">
// // // // //             {[
// // // // //               { id: "upload", icon: <FaUpload size={13} />, label: editingId ? "Edit" : "Upload" },
// // // // //               { id: "library", icon: <FaList size={13} />, label: "Library" },
// // // // //               { id: "batch", icon: <FaCloudUploadAlt size={14} />, label: "Batch" },
// // // // //             ].map(t => (
// // // // //               <button key={t.id}
// // // // //                 style={{ ...a.navItem, ...(view === t.id ? a.navItemActive : {}) }}
// // // // //                 className="nav-item"
// // // // //                 onClick={() => setView(t.id)}>
// // // // //                 {t.icon} {t.label}
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //           <button style={a.logoutBtn} onClick={logout}><FaSignOutAlt size={13} /> Logout</button>
// // // // //         </div>

// // // // //         {/* Content */}
// // // // //         <div style={a.content}>

// // // // //           {/* ── UPLOAD ── */}
// // // // //           {view === "upload" && (
// // // // //             <div style={a.card} key="upload">
// // // // //               <div style={a.cardHead}>
// // // // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // // // //                 {editingId && <button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// // // // //               </div>

// // // // //               <div style={a.formGrid} className="form-grid">
// // // // //                 <div style={a.field}>
// // // // //                   <label style={a.label}>Song Title *</label>
// // // // //                   <input style={a.input} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} />
// // // // //                 </div>
// // // // //                 <div style={a.field}>
// // // // //                   <label style={a.label}>Artist *</label>
// // // // //                   <input style={a.input} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} />
// // // // //                 </div>
// // // // //                 <div style={a.field}>
// // // // //                   <label style={a.label}>Album *</label>
// // // // //                   <select style={a.input} value={album} onChange={e => setAlbum(e.target.value)}>
// // // // //                     <option value="">Select album</option>
// // // // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // // // //                     <option value="__new__">+ New Album</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 {album === "__new__" && (
// // // // //                   <div style={a.field}>
// // // // //                     <label style={a.label}>New Album Name *</label>
// // // // //                     <input style={a.input} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} />
// // // // //                   </div>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div style={a.uploadRow} className="upload-row">
// // // // //                 <label style={{ ...a.dropZone, ...(audio ? a.dropZoneFilled : {}) }}>
// // // // //                   <FaMusic size={20} color={audio ? C.accent : C.muted} />
// // // // //                   <span style={a.dropLabel}>{audio ? audio.name : "Upload Audio File"}</span>
// // // // //                   <span style={a.dropSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
// // // // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
// // // // //                 </label>

// // // // //                 <label style={{ ...a.dropZone, ...(image ? a.dropZoneFilled : {}) }}>
// // // // //                   {image
// // // // //                     ? <img src={URL.createObjectURL(image)} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
// // // // //                     : <FaUpload size={20} color={C.muted} />
// // // // //                   }
// // // // //                   <span style={a.dropLabel}>{image ? image.name : "Upload Cover Image"}</span>
// // // // //                   <span style={a.dropSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
// // // // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
// // // // //                 </label>
// // // // //               </div>

// // // // //               <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submit} disabled={loading}>
// // // // //                 {loading
// // // // //                   ? <><span style={a.spinner} /> {editingId ? "Updating..." : "Uploading..."}</>
// // // // //                   : editingId ? "✓ Update Song" : "↑ Upload Song"
// // // // //                 }
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* ── LIBRARY ── */}
// // // // //           {view === "library" && (
// // // // //             <div key="library" style={{ animation: "fadeUp 0.25s ease" }}>
// // // // //               <div style={a.libTop}>
// // // // //                 <h2 style={a.cardTitle}>Library</h2>
// // // // //                 <div style={a.searchWrap}>
// // // // //                   <FaSearch size={12} color={C.muted} />
// // // // //                   <input style={a.searchInput} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
// // // // //                   {search && <button style={a.clrBtn} onClick={() => setSearch("")}><FaTimes size={11} /></button>}
// // // // //                 </div>
// // // // //               </div>

// // // // //               {fetchLoading ? <div style={a.loadMsg}>Loading...</div> : <>
// // // // //                 {!search && Object.entries(albumGroups).length > 0 && (
// // // // //                   <div style={a.albumGrid}>
// // // // //                     {Object.entries(albumGroups).map(([name, list]) => (
// // // // //                       <div key={name} style={a.albumRow}>
// // // // //                         <div style={a.albumRowL}>
// // // // //                           <img src={list[0]?.imageUrl} alt="" style={a.albumRowImg} loading="lazy" />
// // // // //                           <div>
// // // // //                             <div style={a.albumRowName}>{name}</div>
// // // // //                             <div style={a.albumRowMeta}>{list.length} songs</div>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <button style={a.delAlbumBtn} onClick={() => setConfirm({ msg: `Delete album "${name}" and all ${list.length} songs?`, action: () => deleteAlbum(name) })}>
// // // // //                           <FaTrash size={11} /> Album
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 )}

// // // // //                 <div style={a.songsList}>
// // // // //                   <div style={a.songsListHead}>
// // // // //                     {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : `All Songs (${songs.length})`}
// // // // //                   </div>
// // // // //                   {filtered.map((s, i) => (
// // // // //                     <div key={s._id} style={a.songRow}>
// // // // //                       <div style={a.songRowL}>
// // // // //                         <span style={a.songIdx}>{i + 1}</span>
// // // // //                         <img src={s.imageUrl} alt="" style={a.songImg} loading="lazy" />
// // // // //                         <div style={a.songInfo}>
// // // // //                           <div style={a.songTitle}>{s.title}</div>
// // // // //                           <div style={a.songMeta}>{s.artist} · {s.album}</div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div style={a.songActions}>
// // // // //                         <button style={a.editBtn} onClick={() => editSong(s)}><FaEdit size={12} /></button>
// // // // //                         <button style={a.delBtn} onClick={() => setConfirm({ msg: `Delete "${s.title}"?`, action: () => deleteSong(s._id) })}><FaTrash size={12} /></button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))}
// // // // //                   {filtered.length === 0 && <p style={a.emptyMsg}>No songs found.</p>}
// // // // //                 </div>
// // // // //               </>}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* ── BATCH ── */}
// // // // //           {view === "batch" && (
// // // // //             <div style={a.card} key="batch">
// // // // //               <h2 style={a.cardTitle}>📦 Batch Upload via JSON</h2>
// // // // //               <p style={a.helpText}>Upload multiple songs using a JSON array. Each item needs: <code style={a.code}>title, artist, album, audioUrl, imageUrl</code></p>

// // // // //               <div style={a.exampleBox}>
// // // // //                 <div style={a.exampleTitle}>Example JSON</div>
// // // // //                 <pre style={a.pre}>{`[
// // // // //   {
// // // // //     "title": "Song Name",
// // // // //     "artist": "Artist Name",
// // // // //     "album": "Album Name",
// // // // //     "audioUrl": "https://cdn.example.com/audio.mp3",
// // // // //     "imageUrl": "https://cdn.example.com/cover.jpg"
// // // // //   }
// // // // // ]`}</pre>
// // // // //               </div>

// // // // //               <label style={a.fileLabel}>
// // // // //                 <FaUpload size={12} /> Upload .json file
// // // // //                 <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
// // // // //               </label>

// // // // //               <div style={a.orRow}><span style={a.orText}>or paste below</span></div>

// // // // //               <textarea style={a.textarea} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
// // // // //                 value={batchJson} onChange={e => setBatchJson(e.target.value)} />

// // // // //               <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
// // // // //                 {batchLoading ? <><span style={a.spinner} /> Processing...</> : "↑ Upload All"}
// // // // //               </button>

// // // // //               {batchResults.length > 0 && (
// // // // //                 <div style={a.resultsBox}>
// // // // //                   <div style={a.resultsTitle}>{batchResults.filter(r => r.status === "ok").length}/{batchResults.length} uploaded</div>
// // // // //                   {batchResults.map((r, i) => (
// // // // //                     <div key={i} style={{ ...a.resultRow, borderLeft: `3px solid ${r.status === "ok" ? C.accent : C.error}` }}>
// // // // //                       <span style={{ color: r.status === "ok" ? C.accent : C.error }}>{r.status === "ok" ? "✓" : "✗"}</span>
// // // // //                       <span style={a.resultName}>{r.title}</span>
// // // // //                       {r.error && <span style={a.resultErr}>{r.error}</span>}
// // // // //                     </div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ── LOGIN STYLES ──
// // // // // const l = {
// // // // //   root: { fontFamily: "'Outfit',sans-serif", minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // // // //   card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.35s ease" },
// // // // //   icon: { width: 52, height: 52, borderRadius: 14, background: C.accentDim, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
// // // // //   title: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 },
// // // // //   sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
// // // // //   err: { background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 20 },
// // // // //   form: { display: "flex", flexDirection: "column", gap: 16 },
// // // // //   field: { display: "flex", flexDirection: "column", gap: 6 },
// // // // //   label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.6 },
// // // // //   inputWrap: { display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" },
// // // // //   input: { flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: C.text, fontFamily: "'Outfit',sans-serif" },
// // // // //   eyeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 },
// // // // //   btn: { marginTop: 8, padding: "13px", borderRadius: 12, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Outfit',sans-serif" },
// // // // // };

// // // // // // ── ADMIN STYLES ──
// // // // // const a = {
// // // // //   root: { fontFamily: "'Outfit',sans-serif", background: C.bg, minHeight: "100vh", color: C.text, position: "relative" },
// // // // //   toast: { position: "fixed", top: 80, right: 20, padding: "12px 18px", borderRadius: 10, color: "#0f0f0f", fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8 },

// // // // //   overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // // // //   modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
// // // // //   modalTitle: { fontSize: 17, fontWeight: 700, marginBottom: 8 },
// // // // //   modalMsg: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
// // // // //   modalBtns: { display: "flex", gap: 10, justifyContent: "flex-end" },
// // // // //   modalCancel: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 13, fontFamily: "'Outfit',sans-serif" },
// // // // //   modalDelete: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit',sans-serif" },

// // // // //   layout: { display: "flex", minHeight: "100vh" },
// // // // //   sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "24px 14px", display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 0, height: "100vh", flexShrink: 0 },
// // // // //   sidebarLogo: { fontSize: 17, fontWeight: 700, color: C.accent, padding: "0 8px", marginBottom: 16 },
// // // // //   stats: { display: "flex", gap: 0, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, overflow: "hidden" },
// // // // //   stat: { flex: 1, textAlign: "center", padding: "12px 8px" },
// // // // //   statN: { display: "block", fontSize: 18, fontWeight: 700, color: C.accent },
// // // // //   statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
// // // // //   statDiv: { width: 1, background: C.border },
// // // // //   sidebarNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
// // // // //   navItem: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, fontWeight: 500, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", textAlign: "left" },
// // // // //   navItemActive: { background: C.accentDim, color: C.accent, border: `1px solid ${C.accentBorder}` },
// // // // //   logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, cursor: "pointer", color: C.sub, fontSize: 13, background: "none", border: "none", fontFamily: "'Outfit',sans-serif", marginTop: "auto" },

// // // // //   content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },

// // // // //   card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, marginBottom: 24, animation: "fadeUp 0.25s ease" },
// // // // //   cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
// // // // //   cardTitle: { fontSize: 18, fontWeight: 700 },
// // // // //   cancelBtn: { padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

// // // // //   formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 },
// // // // //   field: { display: "flex", flexDirection: "column", gap: 6 },
// // // // //   label: { fontSize: 11, fontWeight: 600, color: C.sub, textTransform: "uppercase", letterSpacing: 0.5 },
// // // // //   input: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: "'Outfit',sans-serif", color: C.text, background: C.card },

// // // // //   uploadRow: { display: "flex", gap: 16, marginBottom: 24 },
// // // // //   dropZone: { flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", background: C.bg, transition: "border 0.2s" },
// // // // //   dropZoneFilled: { borderColor: C.accent, background: C.accentDim },
// // // // //   dropLabel: { fontSize: 12, fontWeight: 600, color: C.text, textAlign: "center" },
// // // // //   dropSub: { fontSize: 11, color: C.muted },

// // // // //   btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#0f0f0f", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Outfit',sans-serif" },
// // // // //   btnDis: { opacity: 0.5, cursor: "not-allowed" },
// // // // //   spinner: { width: 14, height: 14, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0f0f0f", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

// // // // //   libTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
// // // // //   searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
// // // // //   searchInput: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", fontFamily: "'Outfit',sans-serif", width: 160 },
// // // // //   clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
// // // // //   loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

// // // // //   albumGrid: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 },
// // // // //   albumRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 },
// // // // //   albumRowL: { display: "flex", alignItems: "center", gap: 12 },
// // // // //   albumRowImg: { width: 42, height: 42, borderRadius: 8, objectFit: "cover" },
// // // // //   albumRowName: { fontSize: 14, fontWeight: 600 },
// // // // //   albumRowMeta: { fontSize: 11, color: C.sub },
// // // // //   delAlbumBtn: { display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", color: C.error, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit',sans-serif" },

// // // // //   songsList: { display: "flex", flexDirection: "column", gap: 3 },
// // // // //   songsListHead: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, padding: "0 4px 10px" },
// // // // //   songRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, background: C.surface, border: `1px solid ${C.border}`, gap: 12 },
// // // // //   songRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
// // // // //   songIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
// // // // //   songImg: { width: 40, height: 40, borderRadius: 6, objectFit: "cover", flexShrink: 0 },
// // // // //   songInfo: { minWidth: 0 },
// // // // //   songTitle: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // // //   songMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // // // //   songActions: { display: "flex", gap: 8, flexShrink: 0 },
// // // // //   editBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", color: C.sub, display: "flex" },
// // // // //   delBtn: { padding: "7px 10px", borderRadius: 7, border: `1px solid rgba(248,113,113,0.2)`, background: "rgba(248,113,113,0.06)", cursor: "pointer", color: C.error, display: "flex" },
// // // // //   emptyMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },

// // // // //   helpText: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
// // // // //   code: { fontFamily: "'JetBrains Mono',monospace", background: C.card, border: `1px solid ${C.border}`, padding: "2px 6px", borderRadius: 4, fontSize: 11 },
// // // // //   exampleBox: { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
// // // // //   exampleTitle: { fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 },
// // // // //   pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
// // // // //   fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 14 },
// // // // //   orRow: { margin: "12px 0", textAlign: "center" },
// // // // //   orText: { fontSize: 12, color: C.muted },
// // // // //   textarea: { width: "100%", padding: "14px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: C.text, resize: "vertical", lineHeight: 1.7, background: C.bg, marginBottom: 16 },
// // // // //   resultsBox: { marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
// // // // //   resultsTitle: { padding: "10px 16px", background: C.card, fontSize: 12, fontWeight: 700, color: C.sub, borderBottom: `1px solid ${C.border}` },
// // // // //   resultRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },
// // // // //   resultName: { flex: 1 },
// // // // //   resultErr: { fontSize: 11, color: C.error },
// // // // // };
// // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // import axios from "axios";
// // // // import {
// // // //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// // // //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash, FaPalette
// // // // } from "react-icons/fa";

// // // // const API = "https://music-app-f9t7.onrender.com/api";

// // // // const ADMINS = { "admin": "vibe2024", "revanth": "revv@123", "superadmin": "music#999" };

// // // // let _cache = null;

// // // // const THEMES = {
// // // //   Amber: { bg:"#0f0f12",surface:"#18181b",card:"#1f1f23",border:"#2a2a2f",accent:"#f59e0b",accentDim:"rgba(245,158,11,0.08)",accentBorder:"rgba(245,158,11,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // //   Purple: { bg:"#0d0d14",surface:"#16162a",card:"#1e1e35",border:"#2d2d4a",accent:"#a855f7",accentDim:"rgba(168,85,247,0.08)",accentBorder:"rgba(168,85,247,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // //   Cyan:   { bg:"#020f12",surface:"#071a1f",card:"#0c2530",border:"#0e3040",accent:"#06b6d4",accentDim:"rgba(6,182,212,0.08)",accentBorder:"rgba(6,182,212,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // //   Rose:   { bg:"#120a0a",surface:"#1c1010",card:"#261515",border:"#3a1f1f",accent:"#f43f5e",accentDim:"rgba(244,63,94,0.08)",accentBorder:"rgba(244,63,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#fbbf24",success:"#22c55e" },
// // // //   Green:  { bg:"#090f0a",surface:"#101a10",card:"#162416",border:"#1e3520",accent:"#22c55e",accentDim:"rgba(34,197,94,0.08)",accentBorder:"rgba(34,197,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // // // };
// // // // const THEME_NAMES = Object.keys(THEMES);

// // // // const SkeletonRow = ({ C }) => (
// // // //   <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,marginBottom:3}}>
// // // //     <div style={{width:20,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //     <div style={{width:40,height:40,borderRadius:6,background:C.border,animation:"shimmer 1.4s infinite",flexShrink:0}}/>
// // // //     <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
// // // //       <div style={{width:"60%",height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //       <div style={{width:"40%",height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const SkeletonAlbum = ({ C }) => (
// // // //   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:8}}>
// // // //     <div style={{display:"flex",alignItems:"center",gap:12}}>
// // // //       <div style={{width:42,height:42,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //       <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //         <div style={{width:120,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //         <div style={{width:70,height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //       </div>
// // // //     </div>
// // // //     <div style={{width:80,height:28,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// // // //   </div>
// // // // );

// // // // export default function AdminPanel() {
// // // //   const [themeName, setThemeName] = useState(() => localStorage.getItem("vo_admin_theme") || "Amber");
// // // //   const [showThemePicker, setShowThemePicker] = useState(false);
// // // //   const C = THEMES[themeName] || THEMES.Amber;
// // // //   const pickTheme = (n) => { setThemeName(n); localStorage.setItem("vo_admin_theme", n); setShowThemePicker(false); };

// // // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// // // //   const [loginUser, setLoginUser] = useState("");
// // // //   const [loginPass, setLoginPass] = useState("");
// // // //   const [showPass, setShowPass] = useState(false);
// // // //   const [loginErr, setLoginErr] = useState("");

// // // //   const [songs, setSongs] = useState([]);
// // // //   const [albums, setAlbums] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [fetchLoading, setFetchLoading] = useState(true);
// // // //   const [view, setView] = useState("upload");
// // // //   const [search, setSearch] = useState("");
// // // //   const [toast, setToast] = useState(null);
// // // //   const [confirm, setConfirm] = useState(null);
// // // //   const [editingId, setEditingId] = useState(null);

// // // //   const [title, setTitle] = useState("");
// // // //   const [artist, setArtist] = useState("");
// // // //   const [album, setAlbum] = useState("");
// // // //   const [newAlbum, setNewAlbum] = useState("");
// // // //   const [audio, setAudio] = useState(null);
// // // //   const [image, setImage] = useState(null);
// // // //   const audioRef = useRef(null);
// // // //   const imageRef = useRef(null);

// // // //   const [bulkItems, setBulkItems] = useState([{ title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // // //   const [batchLoading, setBatchLoading] = useState(false);
// // // //   const [batchResults, setBatchResults] = useState([]);
// // // //   const [batchProgress, setBatchProgress] = useState(0);

// // // //   const handleLogin = (e) => {
// // // //     e.preventDefault(); setLoginErr("");
// // // //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// // // //     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
// // // //     else setLoginErr("Invalid username or password.");
// // // //   };

// // // //   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };

// // // //   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

// // // //   const fetchData = useCallback(async (force = false) => {
// // // //     setFetchLoading(true);
// // // //     try {
// // // //       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
// // // //       const res = await axios.get(`${API}/`);
// // // //       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
// // // //     } catch { showToast("Failed to fetch songs", "error"); }
// // // //     finally { setFetchLoading(false); }
// // // //   }, []);

// // // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // // //   const resetForm = () => {
// // // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
// // // //     if (audioRef.current) audioRef.current.value = "";
// // // //     if (imageRef.current) imageRef.current.value = "";
// // // //   };

// // // //   const submit = async () => {
// // // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
// // // //     const fd = new FormData();
// // // //     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
// // // //     if (audio) fd.append("audio", audio);
// // // //     if (image) fd.append("image", image);
// // // //     setLoading(true);
// // // //     try {
// // // //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// // // //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// // // //       resetForm(); _cache = null; fetchData(true);
// // // //     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   const deleteSong = async (id) => {
// // // //     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
// // // //     catch { showToast("Delete failed", "error"); }
// // // //   };

// // // //   const deleteAlbum = async (name) => {
// // // //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
// // // //     catch { showToast("Album delete failed", "error"); }
// // // //   };

// // // //   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

// // // //   const addBulkItem = () => setBulkItems(p => [...p, { title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// // // //   const removeBulkItem = (i) => setBulkItems(p => p.filter((_,idx) => idx !== i));
// // // //   const updateBulkItem = (i, k, v) => setBulkItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

// // // //   const runBulkUpload = async () => {
// // // //     for (let i = 0; i < bulkItems.length; i++) {
// // // //       const item = bulkItems[i];
// // // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // // //       if (!item.title || !item.artist || !fa) { showToast(`Item ${i+1}: Title, Artist, Album required`, "error"); return; }
// // // //       if (!item.audio || !item.image) { showToast(`Item ${i+1}: Audio & Image required`, "error"); return; }
// // // //     }
// // // //     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
// // // //     const results = [];
// // // //     for (let i = 0; i < bulkItems.length; i++) {
// // // //       const item = bulkItems[i];
// // // //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// // // //       const fd = new FormData();
// // // //       fd.append("title", item.title.trim()); fd.append("artist", item.artist.trim()); fd.append("album", fa);
// // // //       fd.append("audio", item.audio); fd.append("image", item.image);
// // // //       try {
// // // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // // //         results.push({ title: item.title, status: "ok" });
// // // //       } catch (err) {
// // // //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// // // //       }
// // // //       setBatchProgress(Math.round(((i+1)/bulkItems.length)*100));
// // // //       setBatchResults([...results]);
// // // //     }
// // // //     setBatchLoading(false);
// // // //     const ok = results.filter(r => r.status === "ok").length;
// // // //     showToast(`Bulk: ${ok}/${bulkItems.length} uploaded`, ok === bulkItems.length ? "success" : "error");
// // // //     if (ok > 0) { _cache = null; fetchData(true); }
// // // //   };

// // // //   const filtered = songs.filter(s =>
// // // //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// // // //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// // // //     s.album.toLowerCase().includes(search.toLowerCase())
// // // //   );
// // // //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
// // // //   const a = makeStyles(C);

// // // //   if (!authed) {
// // // //     return (
// // // //       <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
// // // //         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:1px solid ${C.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
// // // //         <div style={{width:"100%",maxWidth:400,background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"36px 32px",animation:"fadeUp 0.35s ease"}}>
// // // //           <div style={{width:52,height:52,borderRadius:14,background:C.accentDim,border:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><FaLock size={22} color={C.accent}/></div>
// // // //           <h1 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:6}}>Admin Access</h1>
// // // //           <p style={{fontSize:13,color:C.sub,marginBottom:28}}>Enter your credentials to continue</p>
// // // //           {loginErr && <div style={{background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.3)",color:C.error,fontSize:13,padding:"10px 14px",borderRadius:10,marginBottom:20}}>{loginErr}</div>}
// // // //           <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:16}}>
// // // //             {[{label:"Username",type:"text",val:loginUser,set:setLoginUser,icon:<FaUser size={13} color={C.muted}/>},{label:"Password",type:showPass?"text":"password",val:loginPass,set:setLoginPass,icon:<FaLock size={13} color={C.muted}/>}].map(({label,type,val,set,icon},i)=>(
// // // //               <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //                 <label style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
// // // //                 <div style={{display:"flex",alignItems:"center",gap:10,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
// // // //                   {icon}
// // // //                   <input style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14,color:C.text,fontFamily:"'Outfit',sans-serif"}} type={type} value={val} onChange={e=>set(e.target.value)} autoFocus={i===0}/>
// // // //                   {i===1&&<button type="button" style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:0}} onClick={()=>setShowPass(!showPass)}>{showPass?<FaEyeSlash size={13} color={C.muted}/>:<FaEye size={13} color={C.muted}/>}</button>}
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //             <button type="submit" style={{marginTop:8,padding:"13px",borderRadius:12,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Sign In →</button>
// // // //           </form>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div style={a.root}>
// // // //       <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}input::placeholder,textarea::placeholder{color:${C.muted};}select option{background:${C.card};color:${C.text};}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin2{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}@media(max-width:640px){.al{flex-direction:column!important;}.sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}.sl{display:none!important;}.ss{display:none!important;}.sn{flex-direction:row!important;gap:4px!important;flex:1!important;}.ni{padding:8px 14px!important;font-size:12px!important;}.fg{grid-template-columns:1fr!important;}.ur{flex-direction:column!important;}}`}</style>

// // // //       {toast&&<div style={{...a.toast,background:toast.type==="error"?C.error:C.success,animation:"slideIn 0.25s ease"}}>{toast.type==="error"?"✗":"✓"} {toast.msg}</div>}

// // // //       {confirm&&(
// // // //         <div style={a.overlay} onClick={()=>setConfirm(null)}>
// // // //           <div style={a.modal} onClick={e=>e.stopPropagation()}>
// // // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.text}}>Confirm Delete</h3>
// // // //             <p style={{fontSize:13,color:C.sub,marginBottom:24,lineHeight:1.6}}>{confirm.msg}</p>
// // // //             <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
// // // //               <button style={a.mCancel} onClick={()=>setConfirm(null)}>Cancel</button>
// // // //               <button style={a.mDelete} onClick={confirm.action}>Delete</button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {showThemePicker&&(
// // // //         <div style={a.overlay} onClick={()=>setShowThemePicker(false)}>
// // // //           <div style={{...a.modal,maxWidth:320}} onClick={e=>e.stopPropagation()}>
// // // //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:C.text}}>Choose Theme</h3>
// // // //             <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
// // // //               {THEME_NAMES.map(n=>(
// // // //                 <button key={n} onClick={()=>pickTheme(n)} style={{padding:"8px 18px",borderRadius:8,border:`2px solid ${themeName===n?THEMES[n].accent:THEMES[n].border}`,background:THEMES[n].surface,color:THEMES[n].accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13}}>{n}</button>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <div style={a.layout} className="al">
// // // //         <div style={a.sidebar} className="sb">
// // // //           <div style={{fontSize:17,fontWeight:700,color:C.accent,padding:"0 8px",marginBottom:16}} className="sl">⚡ Admin</div>
// // // //           <div style={{display:"flex",gap:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}} className="ss">
// // // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{songs.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Songs</span></div>
// // // //             <div style={{width:1,background:C.border}}/>
// // // //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{albums.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Albums</span></div>
// // // //           </div>
// // // //           <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}} className="sn">
// // // //             {[{id:"upload",icon:<FaUpload size={13}/>,label:editingId?"Edit":"Upload"},{id:"library",icon:<FaList size={13}/>,label:"Library"},{id:"batch",icon:<FaCloudUploadAlt size={14}/>,label:"Bulk"}].map(t=>(
// // // //               <button key={t.id} style={{...a.navItem,...(view===t.id?a.navItemActive:{})}} className="ni" onClick={()=>setView(t.id)}>{t.icon} {t.label}</button>
// // // //             ))}
// // // //           </div>
// // // //           <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.accent,fontSize:13,background:C.accentDim,border:`1px solid ${C.accentBorder}`,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setShowThemePicker(true)}><FaPalette size={13}/> Theme</button>
// // // //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,background:"none",border:"none",fontFamily:"'Outfit',sans-serif"}} onClick={logout}><FaSignOutAlt size={13}/> Logout</button>
// // // //           </div>
// // // //         </div>

// // // //         <div style={{flex:1,padding:"28px 24px",maxWidth:800,overflowY:"auto"}}>
// // // //           {view==="upload"&&(
// // // //             <div style={a.card}>
// // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
// // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
// // // //                 {editingId&&<button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// // // //               </div>
// // // //               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}} className="fg">
// // // //                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i)=>(
// // // //                   <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //                     <label style={a.label}>{label}</label>
// // // //                     <input style={a.inp} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
// // // //                   </div>
// // // //                 ))}
// // // //                 <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //                   <label style={a.label}>Album *</label>
// // // //                   <select style={a.inp} value={album} onChange={e=>setAlbum(e.target.value)}>
// // // //                     <option value="">Select album</option>
// // // //                     {albums.map((al,i)=><option key={i} value={al}>{al}</option>)}
// // // //                     <option value="__new__">+ New Album</option>
// // // //                   </select>
// // // //                 </div>
// // // //                 {album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e=>setNewAlbum(e.target.value)}/></div>}
// // // //               </div>
// // // //               <div style={{display:"flex",gap:16,marginBottom:24}} className="ur">
// // // //                 <label style={{...a.dz,...(audio?a.dzF:{})}}>
// // // //                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
// // // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{audio?audio.name:"Upload Audio File"}</span>
// // // //                   <span style={{fontSize:11,color:C.muted}}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
// // // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e=>setAudio(e.target.files[0])} style={{display:"none"}}/>
// // // //                 </label>
// // // //                 <label style={{...a.dz,...(image?a.dzF:{})}}>
// // // //                   {image?<img src={URL.createObjectURL(image)} alt="" style={{width:48,height:48,borderRadius:8,objectFit:"cover"}}/>:<FaUpload size={20} color={C.muted}/>}
// // // //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{image?image.name:"Upload Cover Image"}</span>
// // // //                   <span style={{fontSize:11,color:C.muted}}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
// // // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} style={{display:"none"}}/>
// // // //                 </label>
// // // //               </div>
// // // //               <button style={{...a.btn,...(loading?a.btnD:{})}} onClick={submit} disabled={loading}>
// // // //                 {loading?<><span style={a.spin}/>{editingId?"Updating...":"Uploading..."}</>:editingId?"✓ Update Song":"↑ Upload Song"}
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           {view==="library"&&(
// // // //             <div style={{animation:"fadeUp 0.25s ease"}}>
// // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
// // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>Library</h2>
// // // //                 <div style={{display:"flex",alignItems:"center",gap:8,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px"}}>
// // // //                   <FaSearch size={12} color={C.muted}/>
// // // //                   <input style={{border:"none",outline:"none",fontSize:13,color:C.text,background:"none",fontFamily:"'Outfit',sans-serif",width:160}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
// // // //                   {search&&<button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex"}} onClick={()=>setSearch("")}><FaTimes size={11}/></button>}
// // // //                 </div>
// // // //               </div>
// // // //               {fetchLoading?(
// // // //                 <div>
// // // //                   {[...Array(3)].map((_,i)=><SkeletonAlbum key={i} C={C}/>)}
// // // //                   <div style={{marginTop:16}}>{[...Array(6)].map((_,i)=><SkeletonRow key={i} C={C}/>)}</div>
// // // //                 </div>
// // // //               ):(
// // // //                 <>
// // // //                   {!search&&Object.entries(albumGroups).length>0&&(
// // // //                     <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
// // // //                       {Object.entries(albumGroups).map(([name,list])=>(
// // // //                         <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12}}>
// // // //                           <div style={{display:"flex",alignItems:"center",gap:12}}>
// // // //                             <img src={list[0]?.imageUrl} alt="" style={{width:42,height:42,borderRadius:8,objectFit:"cover"}} loading="lazy"/>
// // // //                             <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{name}</div><div style={{fontSize:11,color:C.sub}}>{list.length} songs</div></div>
// // // //                           </div>
// // // //                           <button style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",color:C.error,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setConfirm({msg:`Delete album "${name}" and all ${list.length} songs?`,action:()=>deleteAlbum(name)})}>
// // // //                             <FaTrash size={11}/> Album
// // // //                           </button>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   )}
// // // //                   <div style={{display:"flex",flexDirection:"column",gap:3}}>
// // // //                     <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:0.6,padding:"0 4px 10px"}}>{search?`${filtered.length} result${filtered.length!==1?"s":""}`:`All Songs (${songs.length})`}</div>
// // // //                     {filtered.map((s,i)=>(
// // // //                       <div key={s._id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,gap:12}}>
// // // //                         <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1}}>
// // // //                           <span style={{fontSize:11,color:C.muted,width:20,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{i+1}</span>
// // // //                           <img src={s.imageUrl} alt="" style={{width:40,height:40,borderRadius:6,objectFit:"cover",flexShrink:0}} loading="lazy"/>
// // // //                           <div style={{minWidth:0}}>
// // // //                             <div style={{fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title}</div>
// // // //                             <div style={{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.artist} · {s.album}</div>
// // // //                           </div>
// // // //                         </div>
// // // //                         <div style={{display:"flex",gap:8,flexShrink:0}}>
// // // //                           <button style={{padding:"7px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:"none",cursor:"pointer",color:C.sub,display:"flex"}} onClick={()=>editSong(s)}><FaEdit size={12}/></button>
// // // //                           <button style={{padding:"7px 10px",borderRadius:7,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",cursor:"pointer",color:C.error,display:"flex"}} onClick={()=>setConfirm({msg:`Delete "${s.title}"?`,action:()=>deleteSong(s._id)})}><FaTrash size={12}/></button>
// // // //                         </div>
// // // //                       </div>
// // // //                     ))}
// // // //                     {filtered.length===0&&<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:32}}>No songs found.</p>}
// // // //                   </div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {view==="batch"&&(
// // // //             <div style={a.card}>
// // // //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
// // // //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>📦 Bulk Upload Songs</h2>
// // // //                 <button style={a.cancelBtn} onClick={addBulkItem}>+ Add Song</button>
// // // //               </div>
// // // //               <p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:20}}>Add multiple songs below. Each needs title, artist, album, audio file and cover image. Uploaded one-by-one to the server.</p>

// // // //               {bulkItems.map((item,i)=>(
// // // //                 <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:14}}>
// // // //                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
// // // //                     <span style={{fontSize:12,fontWeight:700,color:C.accent}}>Song {i+1}</span>
// // // //                     {bulkItems.length>1&&<button onClick={()=>removeBulkItem(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.error,display:"flex"}}><FaTimes size={13}/></button>}
// // // //                   </div>
// // // //                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}} className="fg">
// // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Title *</label><input style={a.inp} placeholder="Song title" value={item.title} onChange={e=>updateBulkItem(i,"title",e.target.value)}/></div>
// // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Artist *</label><input style={a.inp} placeholder="Artist" value={item.artist} onChange={e=>updateBulkItem(i,"artist",e.target.value)}/></div>
// // // //                     <div style={{display:"flex",flexDirection:"column",gap:6}}>
// // // //                       <label style={a.label}>Album *</label>
// // // //                       <select style={a.inp} value={item.album} onChange={e=>updateBulkItem(i,"album",e.target.value)}>
// // // //                         <option value="">Select album</option>
// // // //                         {albums.map((al,ai)=><option key={ai} value={al}>{al}</option>)}
// // // //                         <option value="__new__">+ New Album</option>
// // // //                       </select>
// // // //                     </div>
// // // //                     {item.album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={item.newAlbum||""} onChange={e=>updateBulkItem(i,"newAlbum",e.target.value)}/></div>}
// // // //                   </div>
// // // //                   <div style={{display:"flex",gap:10}} className="ur">
// // // //                     <label style={{...a.dz,flex:1,...(item.audio?a.dzF:{})}}>
// // // //                       <FaMusic size={16} color={item.audio?C.accent:C.muted}/>
// // // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.audio?item.audio.name:"Audio File"}</span>
// // // //                       <span style={{fontSize:10,color:C.muted}}>{item.audio?`${(item.audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV"}</span>
// // // //                       <input type="file" accept="audio/*" onChange={e=>updateBulkItem(i,"audio",e.target.files[0])} style={{display:"none"}}/>
// // // //                     </label>
// // // //                     <label style={{...a.dz,flex:1,...(item.image?a.dzF:{})}}>
// // // //                       {item.image?<img src={URL.createObjectURL(item.image)} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover"}}/>:<FaUpload size={16} color={C.muted}/>}
// // // //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.image?item.image.name:"Cover Image"}</span>
// // // //                       <span style={{fontSize:10,color:C.muted}}>{item.image?`${(item.image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG"}</span>
// // // //                       <input type="file" accept="image/*" onChange={e=>updateBulkItem(i,"image",e.target.files[0])} style={{display:"none"}}/>
// // // //                     </label>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}

// // // //               <button style={{...a.cancelBtn,display:"flex",alignItems:"center",gap:8,marginBottom:14,width:"100%",justifyContent:"center",padding:"10px"}} onClick={addBulkItem}>+ Add Another Song</button>

// // // //               {batchLoading&&(
// // // //                 <div style={{marginBottom:16}}>
// // // //                   <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}><span>Uploading...</span><span>{batchProgress}%</span></div>
// // // //                   <div style={{height:6,background:C.border,borderRadius:4,overflow:"hidden"}}>
// // // //                     <div style={{height:"100%",width:`${batchProgress}%`,background:C.accent,borderRadius:4,transition:"width 0.3s ease"}}/>
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               <button style={{...a.btn,...(batchLoading?a.btnD:{})}} onClick={runBulkUpload} disabled={batchLoading}>
// // // //                 {batchLoading?<><span style={a.spin}/>Uploading...</>:`↑ Upload All (${bulkItems.length})`}
// // // //               </button>

// // // //               {batchResults.length>0&&(
// // // //                 <div style={{marginTop:20,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
// // // //                   <div style={{padding:"10px 16px",background:C.card,fontSize:12,fontWeight:700,color:C.sub,borderBottom:`1px solid ${C.border}`}}>{batchResults.filter(r=>r.status==="ok").length}/{batchResults.length} uploaded</div>
// // // //                   {batchResults.map((r,i)=>(
// // // //                     <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.text,borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}`}}>
// // // //                       <span style={{color:r.status==="ok"?C.accent:C.error}}>{r.status==="ok"?"✓":"✗"}</span>
// // // //                       <span style={{flex:1}}>{r.title}</span>
// // // //                       {r.error&&<span style={{fontSize:11,color:C.error}}>{r.error}</span>}
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function makeStyles(C) {
// // // //   return {
// // // //     root:{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,position:"relative"},
// // // //     toast:{position:"fixed",top:80,right:20,padding:"12px 18px",borderRadius:10,color:"#0f0f0f",fontSize:13,fontWeight:700,zIndex:9999,display:"flex",alignItems:"center",gap:8},
// // // //     overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:20},
// // // //     modal:{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,maxWidth:360,width:"100%"},
// // // //     mCancel:{padding:"9px 20px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:13,fontFamily:"'Outfit',sans-serif"},
// // // //     mDelete:{padding:"9px 20px",borderRadius:8,border:"none",background:C.error,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Outfit',sans-serif"},
// // // //     layout:{display:"flex",minHeight:"100vh"},
// // // //     sidebar:{width:200,background:C.surface,borderRight:`1px solid ${C.border}`,padding:"24px 14px",display:"flex",flexDirection:"column",gap:8,position:"sticky",top:0,height:"100vh",flexShrink:0},
// // // //     navItem:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,fontWeight:500,background:"none",border:"none",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
// // // //     navItemActive:{background:C.accentDim,color:C.accent,border:`1px solid ${C.accentBorder}`},
// // // //     card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:28,marginBottom:24,animation:"fadeUp 0.25s ease"},
// // // //     cancelBtn:{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"},
// // // //     label:{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.5},
// // // //     inp:{padding:"11px 14px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:14,fontFamily:"'Outfit',sans-serif",color:C.text,background:C.card},
// // // //     dz:{flex:1,border:`1.5px dashed ${C.border}`,borderRadius:12,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",background:C.bg,transition:"border 0.2s"},
// // // //     dzF:{borderColor:C.accent,background:C.accentDim},
// // // //     btn:{width:"100%",padding:14,borderRadius:10,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Outfit',sans-serif"},
// // // //     btnD:{opacity:0.5,cursor:"not-allowed"},
// // // //     spin:{width:14,height:14,border:"2px solid rgba(0,0,0,0.2)",borderTopColor:"#0f0f0f",borderRadius:"50%",animation:"spin2 0.8s linear infinite",display:"inline-block"},
// // // //   };
// // // // }
// // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // import axios from "axios";

// // // // ─── Inline SVG Icons ────────────────────────────────────────────────────────
// // // const Icon = {
// // //   Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39,18.39A5,5,0,0,0,18,9h-1.26A8,8,0,1,0,3,16.3"/></svg>,
// // //   Music: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
// // //   List: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
// // //   Batch: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21,15v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
// // //   Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>,
// // //   Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11,4H4a2,2,0,0,0-2,2v14a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V13"/><path d="M18.5,2.5a2.121,2.121,0,0,1,3,3L12,15l-4,1,1-4Z"/></svg>,
// // //   Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
// // //   Close: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
// // //   Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7,11V7a5,5,0,0,1,10,0v4"/></svg>,
// // //   Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1,12S5,4,12,4s11,8,11,8-4,8-11,8S1,12,1,12Z"/><circle cx="12" cy="12" r="3"/></svg>,
// // //   EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94,17.94A10.07,10.07,0,0,1,12,20C5,20,1,12,1,12a18.45,18.45,0,0,1,5.06-5.94"/><path d="M9.9,4.24A9.12,9.12,0,0,1,12,4c7,0,11,8,11,8a18.5,18.5,0,0,1-2.16,3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
// // //   Logout: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9,21H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H9"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
// // //   Check: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>,
// // //   Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>,
// // //   Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
// // // };

// // // // ─── Constants ────────────────────────────────────────────────────────────────
// // // const API = "https://music-app-f9t7.onrender.com/api";

// // // const ADMINS = {
// // //   "admin": "vibe2024",
// // //   "revanth": "revv@123",
// // //   "superadmin": "music#999",
// // // };

// // // let _cache = null;

// // // const C = {
// // //   bg: "#0d0f1e",
// // //   surface: "#13162a",
// // //   card: "#181b30",
// // //   border: "#1e2240",
// // //   accent: "#ff6b35",
// // //   accentGlow: "rgba(255,107,53,0.14)",
// // //   accentBorder: "rgba(255,107,53,0.3)",
// // //   text: "#f5f0e8",
// // //   sub: "#8b90aa",
// // //   muted: "#3d4260",
// // //   error: "#f87171",
// // //   success: "#4ade80",
// // //   dim: "#252845",
// // // };

// // // // ─── MAIN ─────────────────────────────────────────────────────────────────────
// // // export default function AdminPanel() {
// // //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_adm"));
// // //   const [loginUser, setLoginUser] = useState("");
// // //   const [loginPass, setLoginPass] = useState("");
// // //   const [showPwd, setShowPwd] = useState(false);
// // //   const [loginErr, setLoginErr] = useState("");

// // //   const [songs, setSongs] = useState([]);
// // //   const [albums, setAlbums] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [fetching, setFetching] = useState(true);
// // //   const [view, setView] = useState("upload");
// // //   const [albumFilter, setAlbumFilter] = useState(null);
// // //   const [search, setSearch] = useState("");
// // //   const [toast, setToast] = useState(null);
// // //   const [confirm, setConfirm] = useState(null);
// // //   const [editingId, setEditingId] = useState(null);

// // //   // Single upload form
// // //   const [title, setTitle] = useState("");
// // //   const [artist, setArtist] = useState("");
// // //   const [album, setAlbum] = useState("");
// // //   const [newAlbum, setNewAlbum] = useState("");
// // //   const [audio, setAudio] = useState(null);
// // //   const [image, setImage] = useState(null);
// // //   const audioRef = useRef(null);
// // //   const imageRef = useRef(null);

// // //   // Multi-file upload
// // //   const [multiFiles, setMultiFiles] = useState([]); // [{audio, image, title, artist, album, status}]
// // //   const [multiAlbum, setMultiAlbum] = useState("");
// // //   const [multiNewAlbum, setMultiNewAlbum] = useState("");
// // //   const [multiUploading, setMultiUploading] = useState(false);

// // //   // Batch JSON
// // //   const [batchJson, setBatchJson] = useState("");
// // //   const [batchLoading, setBatchLoading] = useState(false);
// // //   const [batchResults, setBatchResults] = useState([]);

// // //   // ─── AUTH ─────────────────────────────────────────────────────────────────
// // //   const handleLogin = (e) => {
// // //     e.preventDefault();
// // //     setLoginErr("");
// // //     const u = loginUser.trim().toLowerCase();
// // //     if (ADMINS[u] && ADMINS[u] === loginPass) {
// // //       sessionStorage.setItem("vo_adm", u);
// // //       setAuthed(true);
// // //     } else {
// // //       setLoginErr("Incorrect username or password.");
// // //     }
// // //   };

// // //   const logout = () => { sessionStorage.removeItem("vo_adm"); setAuthed(false); };

// // //   // ─── DATA ─────────────────────────────────────────────────────────────────
// // //   const showToast = (msg, type = "success") => {
// // //     setToast({ msg, type });
// // //     setTimeout(() => setToast(null), 3200);
// // //   };

// // //   const fetchData = useCallback(async (force = false) => {
// // //     setFetching(true);
// // //     try {
// // //       if (_cache && !force) {
// // //         setSongs(_cache);
// // //         setAlbums([...new Set(_cache.map(s => s.album))]);
// // //         setFetching(false);
// // //         return;
// // //       }
// // //       const res = await axios.get(`${API}/`);
// // //       _cache = res.data;
// // //       setSongs(res.data);
// // //       setAlbums([...new Set(res.data.map(s => s.album))]);
// // //     } catch { showToast("Failed to load songs", "error"); }
// // //     finally { setFetching(false); }
// // //   }, []);

// // //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// // //   const resetForm = () => {
// // //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum("");
// // //     setAudio(null); setImage(null); setEditingId(null);
// // //     if (audioRef.current) audioRef.current.value = "";
// // //     if (imageRef.current) imageRef.current.value = "";
// // //   };

// // //   // ─── Single Upload / Edit ─────────────────────────────────────────────────
// // //   const submitSingle = async () => {
// // //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// // //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// // //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }

// // //     const fd = new FormData();
// // //     fd.append("title", title.trim());
// // //     fd.append("artist", artist.trim());
// // //     fd.append("album", finalAlbum);
// // //     if (audio) fd.append("audio", audio);
// // //     if (image) fd.append("image", image);

// // //     setLoading(true);
// // //     try {
// // //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// // //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// // //       resetForm(); _cache = null; fetchData(true);
// // //     } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
// // //     finally { setLoading(false); }
// // //   };

// // //   // ─── Multi-file Upload ────────────────────────────────────────────────────
// // //   // Pair audio + image files by matching base name
// // //   const handleMultiAudioChange = (e) => {
// // //     const files = Array.from(e.target.files);
// // //     setMultiFiles(prev => {
// // //       const updated = [...prev];
// // //       files.forEach(f => {
// // //         const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
// // //         const existing = updated.find(x => x.base === base);
// // //         if (existing) { existing.audio = f; }
// // //         else { updated.push({ base, audio: f, image: null, title: f.name.replace(/\.[^.]+$/, ""), artist: "", status: "pending" }); }
// // //       });
// // //       return [...updated];
// // //     });
// // //   };

// // //   const handleMultiImageChange = (e) => {
// // //     const files = Array.from(e.target.files);
// // //     setMultiFiles(prev => {
// // //       const updated = [...prev];
// // //       files.forEach(f => {
// // //         const base = f.name.replace(/\.[^.]+$/, "").toLowerCase();
// // //         const existing = updated.find(x => x.base === base);
// // //         if (existing) { existing.image = f; }
// // //         else { updated.push({ base, audio: null, image: f, title: base, artist: "", status: "pending" }); }
// // //       });
// // //       return [...updated];
// // //     });
// // //   };

// // //   const updateMultiField = (base, field, val) => {
// // //     setMultiFiles(p => p.map(x => x.base === base ? { ...x, [field]: val } : x));
// // //   };

// // //   const removeMultiFile = (base) => setMultiFiles(p => p.filter(x => x.base !== base));

// // //   const submitMulti = async () => {
// // //     const finalAlbum = multiAlbum === "__new__" ? multiNewAlbum.trim() : multiAlbum;
// // //     if (!finalAlbum) { showToast("Select or create an album", "error"); return; }
// // //     const ready = multiFiles.filter(x => x.audio && x.image && x.title.trim() && x.artist.trim());
// // //     if (!ready.length) { showToast("Each song needs audio, image, title & artist", "error"); return; }

// // //     setMultiUploading(true);
// // //     let successCount = 0;

// // //     for (const item of ready) {
// // //       setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "uploading" } : x));
// // //       const fd = new FormData();
// // //       fd.append("title", item.title.trim());
// // //       fd.append("artist", item.artist.trim());
// // //       fd.append("album", finalAlbum);
// // //       fd.append("audio", item.audio);
// // //       fd.append("image", item.image);
// // //       try {
// // //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// // //         setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "done" } : x));
// // //         successCount++;
// // //       } catch {
// // //         setMultiFiles(p => p.map(x => x.base === item.base ? { ...x, status: "error" } : x));
// // //       }
// // //     }

// // //     setMultiUploading(false);
// // //     showToast(`${successCount}/${ready.length} songs uploaded!`);
// // //     if (successCount > 0) { _cache = null; fetchData(true); }
// // //   };

// // //   // ─── Delete ───────────────────────────────────────────────────────────────
// // //   const deleteSong = async (id) => {
// // //     try { await axios.delete(`${API}/${id}`); showToast("Deleted"); setConfirm(null); _cache = null; fetchData(true); }
// // //     catch { showToast("Delete failed", "error"); }
// // //   };

// // //   const deleteAlbum = async (name) => {
// // //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`"${name}" deleted`); setConfirm(null); setAlbumFilter(null); _cache = null; fetchData(true); }
// // //     catch { showToast("Album delete failed", "error"); }
// // //   };

// // //   const editSong = (song) => {
// // //     setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album);
// // //     setView("upload"); window.scrollTo(0, 0);
// // //   };

// // //   // ─── Batch JSON ───────────────────────────────────────────────────────────
// // //   const runBatch = async () => {
// // //     let parsed;
// // //     try { parsed = JSON.parse(batchJson); } catch { showToast("Invalid JSON", "error"); return; }
// // //     if (!Array.isArray(parsed)) { showToast("Must be a JSON array", "error"); return; }
// // //     setBatchLoading(true); setBatchResults([]);
// // //     const res = [];
// // //     for (const item of parsed) {
// // //       if (!item.title || !item.artist || !item.album || !item.audioUrl || !item.imageUrl) {
// // //         res.push({ title: item.title || "?", ok: false, msg: "Missing fields" }); continue;
// // //       }
// // //       try {
// // //         await axios.post(`${API}/create-from-url`, item);
// // //         res.push({ title: item.title, ok: true });
// // //       } catch (e) { res.push({ title: item.title, ok: false, msg: e.response?.data?.message || "Failed" }); }
// // //     }
// // //     setBatchResults(res); setBatchLoading(false);
// // //     const ok = res.filter(r => r.ok).length;
// // //     showToast(`Batch: ${ok}/${parsed.length} uploaded`);
// // //     if (ok > 0) { _cache = null; fetchData(true); }
// // //   };

// // //   const albumGroups = songs.reduce((a, s) => { if (!a[s.album]) a[s.album] = []; a[s.album].push(s); return a; }, {});
// // //   const filtered = songs.filter(s => [s.title, s.artist, s.album].some(v => v.toLowerCase().includes(search.toLowerCase())));
// // //   const viewSongs = albumFilter ? albumGroups[albumFilter] || [] : filtered;

// // //   // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
// // //   if (!authed) {
// // //     return (
// // //       <div style={l.root}>
// // //         <style>{`
// // //           @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// // //           *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
// // //           body{background:${C.bg};color:${C.text};font-family:'Plus Jakarta Sans',sans-serif;}
// // //           @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// // //           input:focus{outline:1px solid ${C.accent}!important;}
// // //           input::placeholder{color:${C.muted};}
// // //         `}</style>
// // //         <div style={l.card}>
// // //           <div style={l.iconBox}><Icon.Lock /></div>
// // //           <h1 style={l.title}>Admin Panel</h1>
// // //           <p style={l.sub}>Sign in to manage your music</p>
// // //           {loginErr && <div style={l.errBox}>{loginErr}</div>}
// // //           <form onSubmit={handleLogin} style={l.form}>
// // //             <div style={l.fld}>
// // //               <label style={l.lbl}>Username</label>
// // //               <input style={l.inp} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus />
// // //             </div>
// // //             <div style={l.fld}>
// // //               <label style={l.lbl}>Password</label>
// // //               <div style={l.pwWrap}>
// // //                 <input style={{ ...l.inp, paddingRight: 44 }} type={showPwd ? "text" : "password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
// // //                 <button type="button" style={l.eyeBtn} onClick={() => setShowPwd(s => !s)}>
// // //                   {showPwd ? <Icon.EyeOff /> : <Icon.Eye />}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //             <button style={l.btn} type="submit">Sign In</button>
// // //           </form>
// // //           <p style={l.hint}>Hint: try admin / vibe2024</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // ─── ADMIN PANEL ──────────────────────────────────────────────────────────
// // //   return (
// // //     <div style={a.root}>
// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
// // //         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
// // //         button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}
// // //         input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif;}
// // //         input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}
// // //         input::placeholder,textarea::placeholder{color:${C.muted};}
// // //         @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
// // //         @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
// // //         @keyframes spin2{to{transform:rotate(360deg)}}
// // //         .dropzone:hover{border-color:${C.accent}!important;background:${C.accentGlow}!important;}
// // //         .song-row:hover{background:${C.card}!important;}
// // //         .album-card:hover{border-color:${C.accent}!important;}
// // //         @media(max-width:680px){
// // //           .admin-layout{flex-direction:column!important;}
// // //           .admin-sidebar{width:100%!important;flex-direction:row!important;height:auto!important;position:relative!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:10px 16px!important;overflow-x:auto!important;gap:4px!important;align-items:center!important;}
// // //           .sidebar-logo{display:none!important;}
// // //           .sidebar-stats{display:none!important;}
// // //           .admin-content{padding:16px!important;}
// // //           .form-2col{grid-template-columns:1fr!important;}
// // //           .upload-row{flex-direction:column!important;}
// // //           .multi-row{flex-wrap:wrap!important;}
// // //         }
// // //       `}</style>

// // //       {/* Toast */}
// // //       {toast && (
// // //         <div style={{ ...a.toast, background: toast.type === "error" ? "#7f1d1d" : "#14532d", borderColor: toast.type === "error" ? C.error : C.success, color: toast.type === "error" ? C.error : C.success }}>
// // //           {toast.type === "error" ? <Icon.Close /> : <Icon.Check />} {toast.msg}
// // //         </div>
// // //       )}

// // //       {/* Confirm Modal */}
// // //       {confirm && (
// // //         <div style={a.overlay} onClick={() => setConfirm(null)}>
// // //           <div style={a.modal} onClick={e => e.stopPropagation()}>
// // //             <h3 style={a.modalH}>Confirm Delete</h3>
// // //             <p style={a.modalP}>{confirm.msg}</p>
// // //             <div style={a.modalFoot}>
// // //               <button style={a.modalNo} onClick={() => setConfirm(null)}>Cancel</button>
// // //               <button style={a.modalYes} onClick={confirm.fn}>Delete</button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div style={a.layout} className="admin-layout">
// // //         {/* SIDEBAR */}
// // //         <div style={a.sidebar} className="admin-sidebar">
// // //           <div style={a.sidebarLogo} className="sidebar-logo">⚡ Admin</div>
// // //           <div style={a.sideStats} className="sidebar-stats">
// // //             <div style={a.statBox}>
// // //               <span style={a.statN}>{songs.length}</span>
// // //               <span style={a.statL}>Songs</span>
// // //             </div>
// // //             <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />
// // //             <div style={a.statBox}>
// // //               <span style={a.statN}>{albums.length}</span>
// // //               <span style={a.statL}>Albums</span>
// // //             </div>
// // //           </div>
// // //           <div style={a.sideNav}>
// // //             {[
// // //               { id: "upload", Ico: Icon.Upload, label: editingId ? "Edit" : "Upload" },
// // //               { id: "multi", Ico: Icon.Batch, label: "Multi" },
// // //               { id: "library", Ico: Icon.List, label: "Library" },
// // //               { id: "batch", Ico: Icon.Batch, label: "JSON" },
// // //             ].map(({ id, Ico, label }) => (
// // //               <button key={id} style={{ ...a.navBtn, ...(view === id ? a.navBtnActive : {}) }} onClick={() => setView(id)}>
// // //                 <Ico /> <span>{label}</span>
// // //               </button>
// // //             ))}
// // //           </div>
// // //           <button style={a.logoutBtn} onClick={logout}><Icon.Logout /> <span style={{ fontSize: 12 }}>Logout</span></button>
// // //         </div>

// // //         {/* CONTENT */}
// // //         <div style={a.content} className="admin-content">

// // //           {/* ── SINGLE UPLOAD / EDIT ── */}
// // //           {view === "upload" && (
// // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // //               <div style={a.cardHead}>
// // //                 <h2 style={a.cardTitle}>{editingId ? "✏️ Edit Song" : "🎵 Upload Song"}</h2>
// // //                 {editingId && <button style={a.cancelBtn} onClick={resetForm}><Icon.Close /> Cancel</button>}
// // //               </div>

// // //               <div style={a.form2col} className="form-2col">
// // //                 <div style={a.fld}><label style={a.lbl}>Song Title *</label><input style={a.inp} placeholder="e.g. Blinding Lights" value={title} onChange={e => setTitle(e.target.value)} /></div>
// // //                 <div style={a.fld}><label style={a.lbl}>Artist *</label><input style={a.inp} placeholder="e.g. The Weeknd" value={artist} onChange={e => setArtist(e.target.value)} /></div>
// // //                 <div style={a.fld}>
// // //                   <label style={a.lbl}>Album *</label>
// // //                   <select style={a.inp} value={album} onChange={e => setAlbum(e.target.value)}>
// // //                     <option value="">Select album</option>
// // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // //                     <option value="__new__">+ New Album</option>
// // //                   </select>
// // //                 </div>
// // //                 {album === "__new__" && (
// // //                   <div style={a.fld}><label style={a.lbl}>New Album Name *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} /></div>
// // //                 )}
// // //               </div>

// // //               <div style={a.uploadRow} className="upload-row">
// // //                 <label style={a.dropZone} className="dropzone">
// // //                   <Icon.Music />
// // //                   <span style={a.dzLabel}>{audio ? audio.name : "Audio File"}</span>
// // //                   <span style={a.dzSub}>{audio ? `${(audio.size / 1024 / 1024).toFixed(1)} MB` : "MP3 · WAV · OGG"}</span>
// // //                   {audio && <span style={a.dzCheck}><Icon.Check /></span>}
// // //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display: "none" }} />
// // //                 </label>
// // //                 <label style={a.dropZone} className="dropzone">
// // //                   {image
// // //                     ? <img src={URL.createObjectURL(image)} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} alt="" />
// // //                     : <Icon.Upload />
// // //                   }
// // //                   <span style={a.dzLabel}>{image ? image.name : "Cover Image"}</span>
// // //                   <span style={a.dzSub}>{image ? `${(image.size / 1024 / 1024).toFixed(1)} MB` : "JPG · PNG · WEBP"}</span>
// // //                   {image && <span style={a.dzCheck}><Icon.Check /></span>}
// // //                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display: "none" }} />
// // //                 </label>
// // //               </div>

// // //               <button style={{ ...a.btn, ...(loading ? a.btnDis : {}) }} onClick={submitSingle} disabled={loading}>
// // //                 {loading ? <><span style={a.spinner} /> {editingId ? "Updating…" : "Uploading…"}</> : (editingId ? "✓ Update Song" : "↑ Upload Song")}
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* ── MULTI UPLOAD ── */}
// // //           {view === "multi" && (
// // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // //               <h2 style={a.cardTitle}>📂 Upload Multiple Songs</h2>
// // //               <p style={a.helpTxt}>Match audio + image files by the same filename (e.g. <code style={a.code}>song1.mp3</code> + <code style={a.code}>song1.jpg</code>). Or upload separately and pair them below.</p>

// // //               <div style={a.multiAlbumRow}>
// // //                 <div style={a.fld}>
// // //                   <label style={a.lbl}>Album for all *</label>
// // //                   <select style={a.inp} value={multiAlbum} onChange={e => setMultiAlbum(e.target.value)}>
// // //                     <option value="">Select album</option>
// // //                     {albums.map((al, i) => <option key={i} value={al}>{al}</option>)}
// // //                     <option value="__new__">+ New Album</option>
// // //                   </select>
// // //                 </div>
// // //                 {multiAlbum === "__new__" && (
// // //                   <div style={a.fld}>
// // //                     <label style={a.lbl}>Album Name *</label>
// // //                     <input style={a.inp} value={multiNewAlbum} onChange={e => setMultiNewAlbum(e.target.value)} placeholder="New album" />
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div style={a.multiFileRow} className="upload-row">
// // //                 <label style={a.dropZone} className="dropzone">
// // //                   <Icon.Music />
// // //                   <span style={a.dzLabel}>Audio Files</span>
// // //                   <span style={a.dzSub}>Select multiple MP3/WAV files</span>
// // //                   <input type="file" accept="audio/*" multiple onChange={handleMultiAudioChange} style={{ display: "none" }} />
// // //                 </label>
// // //                 <label style={a.dropZone} className="dropzone">
// // //                   <Icon.Upload />
// // //                   <span style={a.dzLabel}>Cover Images</span>
// // //                   <span style={a.dzSub}>Select multiple JPG/PNG files</span>
// // //                   <input type="file" accept="image/*" multiple onChange={handleMultiImageChange} style={{ display: "none" }} />
// // //                 </label>
// // //               </div>

// // //               {multiFiles.length > 0 && (
// // //                 <>
// // //                   <div style={a.multiList}>
// // //                     {multiFiles.map(item => (
// // //                       <div key={item.base} style={a.multiItem}>
// // //                         <div style={a.multiItemHead}>
// // //                           {item.image
// // //                             ? <img src={URL.createObjectURL(item.image)} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} alt="" />
// // //                             : <div style={a.multiImgPh}><Icon.Upload /></div>
// // //                           }
// // //                           <div style={{ flex: 1, minWidth: 0 }}>
// // //                             <div style={a.multiFileName}>{item.base}</div>
// // //                             <div style={a.multiFileStatus}>
// // //                               <span style={{ color: item.audio ? C.success : C.error }}>{item.audio ? "✓" : "✗"} Audio</span>
// // //                               <span style={{ marginLeft: 10, color: item.image ? C.success : C.error }}>{item.image ? "✓" : "✗"} Image</span>
// // //                               {item.status === "done" && <span style={{ marginLeft: 10, color: C.success }}>✓ Uploaded</span>}
// // //                               {item.status === "error" && <span style={{ marginLeft: 10, color: C.error }}>✗ Failed</span>}
// // //                               {item.status === "uploading" && <span style={{ marginLeft: 10, color: C.accent }}>↑ Uploading…</span>}
// // //                             </div>
// // //                           </div>
// // //                           <button style={a.removeBtn} onClick={() => removeMultiFile(item.base)}><Icon.Close /></button>
// // //                         </div>
// // //                         <div style={a.multiItemFields} className="form-2col">
// // //                           <input style={a.inp} placeholder="Song Title *" value={item.title} onChange={e => updateMultiField(item.base, "title", e.target.value)} />
// // //                           <input style={a.inp} placeholder="Artist *" value={item.artist} onChange={e => updateMultiField(item.base, "artist", e.target.value)} />
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                   <button style={{ ...a.btn, ...(multiUploading ? a.btnDis : {}) }} onClick={submitMulti} disabled={multiUploading}>
// // //                     {multiUploading ? <><span style={a.spinner} /> Uploading all…</> : `↑ Upload All (${multiFiles.filter(x => x.audio && x.image).length} songs)`}
// // //                   </button>
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── LIBRARY ── */}
// // //           {view === "library" && (
// // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // //               {albumFilter ? (
// // //                 <>
// // //                   <button style={a.backBtn} onClick={() => { setAlbumFilter(null); setSearch(""); }}>
// // //                     <Icon.Back /> All Albums
// // //                   </button>
// // //                   <div style={a.albumDetailHead}>
// // //                     <img src={albumGroups[albumFilter]?.[0]?.imageUrl} alt="" style={a.albumDetailImg} />
// // //                     <div>
// // //                       <div style={a.albumDetailName}>{albumFilter}</div>
// // //                       <div style={a.albumDetailMeta}>{albumGroups[albumFilter]?.length} songs</div>
// // //                       <button style={a.delAlbumBtnLg} onClick={() => setConfirm({ msg: `Delete album "${albumFilter}" and all ${albumGroups[albumFilter]?.length} songs?`, fn: () => deleteAlbum(albumFilter) })}>
// // //                         <Icon.Trash /> Delete Album
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   <div style={a.songList}>
// // //                     {(albumGroups[albumFilter] || []).map((s, i) => (
// // //                       <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />
// // //                     ))}
// // //                   </div>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <div style={a.libHead}>
// // //                     <h2 style={a.cardTitle}>Library</h2>
// // //                     <div style={a.searchWrap}>
// // //                       <span style={{ color: C.muted, display: "flex" }}><Icon.Search /></span>
// // //                       <input style={a.searchInp} placeholder="Search songs…" value={search} onChange={e => setSearch(e.target.value)} />
// // //                       {search && <button style={a.clrBtn} onClick={() => setSearch("")}><Icon.Close /></button>}
// // //                     </div>
// // //                   </div>
// // //                   {fetching ? <div style={a.loadMsg}>Loading…</div> : (
// // //                     search ? (
// // //                       <div style={a.songList}>
// // //                         <div style={a.listHead}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
// // //                         {filtered.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
// // //                         {filtered.length === 0 && <p style={a.empty}>No songs found.</p>}
// // //                       </div>
// // //                     ) : (
// // //                       <>
// // //                         <div style={a.albumGrid}>
// // //                           {Object.entries(albumGroups).map(([name, list]) => (
// // //                             <div key={name} style={a.albumCard} className="album-card" onClick={() => setAlbumFilter(name)}>
// // //                               <img src={list[0]?.imageUrl} alt="" style={a.albumCardImg} loading="lazy" />
// // //                               <div style={a.albumCardName}>{name}</div>
// // //                               <div style={a.albumCardMeta}>{list.length} songs</div>
// // //                             </div>
// // //                           ))}
// // //                         </div>
// // //                         <div style={{ ...a.listHead, marginTop: 28 }}>All Songs ({songs.length})</div>
// // //                         <div style={a.songList}>
// // //                           {songs.map((s, i) => <SongRow key={s._id} song={s} idx={i} onEdit={editSong} onDelete={(id) => setConfirm({ msg: `Delete "${s.title}"?`, fn: () => deleteSong(id) })} />)}
// // //                         </div>
// // //                       </>
// // //                     )
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* ── BATCH JSON ── */}
// // //           {view === "batch" && (
// // //             <div style={{ animation: "fadeUp 0.25s ease" }}>
// // //               <h2 style={a.cardTitle}>📦 Batch JSON Upload</h2>
// // //               <p style={a.helpTxt}>Upload songs from URLs. Needs a backend endpoint <code style={a.code}>POST /api/create-from-url</code> that accepts JSON directly.</p>
// // //               <div style={a.exBox}>
// // //                 <div style={a.exTitle}>Format</div>
// // //                 <pre style={a.pre}>{`[
// // //   {
// // //     "title": "Song Title",
// // //     "artist": "Artist Name",
// // //     "album": "Album Name",
// // //     "audioUrl": "https://cdn.example.com/audio.mp3",
// // //     "imageUrl": "https://cdn.example.com/cover.jpg"
// // //   }
// // // ]`}</pre>
// // //               </div>
// // //               <label style={a.fileLabel}>
// // //                 <Icon.Upload /> Upload .json File
// // //                 <input type="file" accept=".json" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setBatchJson(ev.target.result); r.readAsText(f); } }} style={{ display: "none" }} />
// // //               </label>
// // //               <textarea style={a.ta} rows={10} placeholder='[{"title":"...","artist":"...","album":"...","audioUrl":"...","imageUrl":"..."}]'
// // //                 value={batchJson} onChange={e => setBatchJson(e.target.value)} />
// // //               <button style={{ ...a.btn, ...(batchLoading ? a.btnDis : {}) }} onClick={runBatch} disabled={batchLoading}>
// // //                 {batchLoading ? <><span style={a.spinner} /> Processing…</> : "↑ Upload All"}
// // //               </button>
// // //               {batchResults.length > 0 && (
// // //                 <div style={a.resBox}>
// // //                   <div style={a.resHead}>{batchResults.filter(r => r.ok).length}/{batchResults.length} uploaded</div>
// // //                   {batchResults.map((r, i) => (
// // //                     <div key={i} style={{ ...a.resRow, borderLeft: `3px solid ${r.ok ? C.success : C.error}` }}>
// // //                       <span style={{ color: r.ok ? C.success : C.error }}>{r.ok ? "✓" : "✗"}</span>
// // //                       <span style={{ flex: 1, fontSize: 13 }}>{r.title}</span>
// // //                       {r.msg && <span style={{ fontSize: 11, color: C.error }}>{r.msg}</span>}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Song Row Component ───────────────────────────────────────────────────────
// // // function SongRow({ song, idx, onEdit, onDelete }) {
// // //   return (
// // //     <div style={a.sRow} className="song-row">
// // //       <div style={a.sRowL}>
// // //         <span style={a.sIdx}>{idx + 1}</span>
// // //         <img src={song.imageUrl} alt="" style={a.sImg} loading="lazy" />
// // //         <div style={a.sInfo}>
// // //           <div style={a.sTitle}>{song.title}</div>
// // //           <div style={a.sMeta}>{song.artist} · {song.album}</div>
// // //         </div>
// // //       </div>
// // //       <div style={a.sActs}>
// // //         <button style={a.sEdit} onClick={() => onEdit(song)}><Icon.Edit /></button>
// // //         <button style={a.sDel} onClick={() => onDelete(song._id)}><Icon.Trash /></button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── LOGIN STYLES ──────────────────────────────────────────────────────────────
// // // const l = {
// // //   root: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" },
// // //   card: { width: "100%", maxWidth: 400, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 32px", animation: "fadeUp 0.3s ease" },
// // //   iconBox: { width: 52, height: 52, borderRadius: 14, background: C.accentGlow, border: `1px solid ${C.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: C.accent },
// // //   title: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 6, color: C.text },
// // //   sub: { fontSize: 13, color: C.sub, marginBottom: 28 },
// // //   errBox: { background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: C.error, fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 18 },
// // //   form: { display: "flex", flexDirection: "column", gap: 16 },
// // //   fld: { display: "flex", flexDirection: "column", gap: 6 },
// // //   lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.7 },
// // //   inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },
// // //   pwWrap: { position: "relative" },
// // //   eyeBtn: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.sub, display: "flex" },
// // //   btn: { marginTop: 8, padding: 14, borderRadius: 12, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,107,53,0.3)" },
// // //   hint: { marginTop: 20, fontSize: 12, color: C.muted, textAlign: "center" },
// // // };

// // // // ─── ADMIN STYLES ─────────────────────────────────────────────────────────────
// // // const a = {
// // //   root: { background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", position: "relative" },

// // //   toast: { position: "fixed", top: 70, right: 16, padding: "11px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 9999, display: "flex", alignItems: "center", gap: 8, border: "1px solid", animation: "slideIn 0.25s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" },

// // //   overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
// // //   modal: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 360, width: "100%" },
// // //   modalH: { fontSize: 17, fontWeight: 800, marginBottom: 8, color: C.text },
// // //   modalP: { fontSize: 13, color: C.sub, marginBottom: 24, lineHeight: 1.6 },
// // //   modalFoot: { display: "flex", gap: 10, justifyContent: "flex-end" },
// // //   modalNo: { padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600 },
// // //   modalYes: { padding: "9px 20px", borderRadius: 8, border: "none", background: C.error, color: "#fff", fontSize: 13, fontWeight: 700 },

// // //   layout: { display: "flex", minHeight: "100vh" },
// // //   sidebar: { width: 200, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "22px 14px", display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 58, height: "calc(100vh - 58px)", flexShrink: 0, overflowY: "auto" },
// // //   sidebarLogo: { fontSize: 17, fontWeight: 800, color: C.accent, padding: "0 8px", marginBottom: 14, letterSpacing: "-0.02em" },
// // //   sideStats: { display: "flex", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 14, overflow: "hidden" },
// // //   statBox: { flex: 1, textAlign: "center", padding: "12px 8px" },
// // //   statN: { display: "block", fontSize: 18, fontWeight: 800, color: C.accent },
// // //   statL: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 },
// // //   sideNav: { display: "flex", flexDirection: "column", gap: 2, flex: 1 },
// // //   navBtn: { display: "flex", alignItems: "center", gap: 9, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.sub, fontSize: 13, fontWeight: 600, textAlign: "left" },
// // //   navBtnActive: { background: C.accentGlow, color: C.accent, border: `1px solid ${C.accentBorder}` },
// // //   logoutBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: "none", border: "none", color: C.muted, fontSize: 13, marginTop: "auto" },

// // //   content: { flex: 1, padding: "28px 24px", maxWidth: 800, overflowY: "auto" },
// // //   cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
// // //   cardTitle: { fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 },
// // //   cancelBtn: { display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 12, fontWeight: 600 },
// // //   backBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: `1px solid ${C.border}`, background: "none", color: C.sub, fontSize: 13, fontWeight: 600, marginBottom: 20 },

// // //   form2col: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
// // //   fld: { display: "flex", flexDirection: "column", gap: 6 },
// // //   lbl: { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.6 },
// // //   inp: { padding: "11px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 14, width: "100%" },

// // //   uploadRow: { display: "flex", gap: 14, marginBottom: 20 },
// // //   dropZone: {
// // //     flex: 1, border: `1.5px dashed ${C.border}`, borderRadius: 12, padding: "20px 16px",
// // //     display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
// // //     cursor: "pointer", background: C.bg, transition: "border 0.2s, background 0.2s", color: C.sub, position: "relative",
// // //   },
// // //   dzLabel: { fontSize: 13, fontWeight: 600, color: C.text, textAlign: "center" },
// // //   dzSub: { fontSize: 11, color: C.muted },
// // //   dzCheck: { position: "absolute", top: 10, right: 10, color: C.success },

// // //   btn: { width: "100%", padding: 14, borderRadius: 10, border: "none", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(255,107,53,0.25)" },
// // //   btnDis: { opacity: 0.5, cursor: "not-allowed" },
// // //   spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin2 0.8s linear infinite", display: "inline-block" },

// // //   multiAlbumRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 },
// // //   multiFileRow: { display: "flex", gap: 14, marginBottom: 20 },
// // //   multiList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 },
// // //   multiItem: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 },
// // //   multiItemHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 },
// // //   multiImgPh: { width: 40, height: 40, borderRadius: 8, background: C.dim, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, flexShrink: 0 },
// // //   multiFileName: { fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // //   multiFileStatus: { fontSize: 11, marginTop: 2 },
// // //   multiItemFields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
// // //   removeBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4, display: "flex", flexShrink: 0 },

// // //   helpTxt: { fontSize: 13, color: C.sub, lineHeight: 1.7, marginBottom: 20 },
// // //   code: { fontFamily: "'JetBrains Mono',monospace", background: C.dim, padding: "2px 6px", borderRadius: 4, fontSize: 11, color: C.accent },
// // //   exBox: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 18 },
// // //   exTitle: { fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 700 },
// // //   pre: { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: C.sub, whiteSpace: "pre-wrap", lineHeight: 1.7 },
// // //   fileLabel: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, border: `1px dashed ${C.accentBorder}`, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 14 },
// // //   ta: { width: "100%", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, color: C.text, fontSize: 12, resize: "vertical", lineHeight: 1.7, marginBottom: 16, fontFamily: "'JetBrains Mono',monospace" },
// // //   resBox: { marginTop: 18, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" },
// // //   resHead: { padding: "10px 16px", background: C.dim, fontSize: 12, fontWeight: 700, borderBottom: `1px solid ${C.border}`, color: C.sub },
// // //   resRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderBottom: `1px solid ${C.border}`, fontSize: 13 },

// // //   libHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 },
// // //   searchWrap: { display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px" },
// // //   searchInp: { border: "none", outline: "none", fontSize: 13, color: C.text, background: "none", width: 160 },
// // //   clrBtn: { background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" },
// // //   loadMsg: { color: C.muted, fontSize: 14, textAlign: "center", padding: 40 },

// // //   albumGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14, marginBottom: 10 },
// // //   albumCard: { cursor: "pointer", borderRadius: 12, overflow: "hidden", background: C.card, border: `1px solid ${C.border}`, transition: "border-color 0.2s" },
// // //   albumCardImg: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
// // //   albumCardName: { padding: "9px 10px 3px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // //   albumCardMeta: { padding: "0 10px 9px", fontSize: 11, color: C.sub },

// // //   albumDetailHead: { display: "flex", gap: 18, marginBottom: 22, alignItems: "flex-end", flexWrap: "wrap" },
// // //   albumDetailImg: { width: 100, height: 100, borderRadius: 12, objectFit: "cover", flexShrink: 0 },
// // //   albumDetailName: { fontSize: 22, fontWeight: 800, marginBottom: 4 },
// // //   albumDetailMeta: { fontSize: 13, color: C.sub, marginBottom: 14 },
// // //   delAlbumBtnLg: { display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 8, border: "1px solid rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.07)", color: C.error, fontSize: 13, fontWeight: 600 },

// // //   listHead: { fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "0 4px 10px" },
// // //   songList: { display: "flex", flexDirection: "column", gap: 4 },
// // //   sRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, transition: "background 0.12s", gap: 12 },
// // //   sRowL: { display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 },
// // //   sIdx: { fontSize: 11, color: C.muted, width: 20, textAlign: "center", flexShrink: 0, fontFamily: "monospace" },
// // //   sImg: { width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
// // //   sInfo: { minWidth: 0 },
// // //   sTitle: { fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // //   sMeta: { fontSize: 11, color: C.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
// // //   sActs: { display: "flex", gap: 8, flexShrink: 0 },
// // //   sEdit: { padding: "7px 10px", borderRadius: 7, border: `1px solid ${C.border}`, background: "none", color: C.sub, display: "flex" },
// // //   sDel: { padding: "7px 10px", borderRadius: 7, border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)", color: C.error, display: "flex" },
// // //   empty: { color: C.muted, fontSize: 14, textAlign: "center", padding: 32 },
// // // };
// // import React, { useState, useEffect, useRef, useCallback } from "react";
// // import axios from "axios";
// // import { useTheme } from "../../App";
// // import {
// //   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
// //   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash, FaPalette
// // } from "react-icons/fa";

// // const API = "https://music-app-f9t7.onrender.com/api";

// // const ADMINS = { "admin": "vibe2024", "revanth": "revv@123", "superadmin": "music#999" };

// // let _cache = null;

// // const THEMES = {
// //   Amber: { bg:"#0f0f12",surface:"#18181b",card:"#1f1f23",border:"#2a2a2f",accent:"#f59e0b",accentDim:"rgba(245,158,11,0.08)",accentBorder:"rgba(245,158,11,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// //   Purple: { bg:"#0d0d14",surface:"#16162a",card:"#1e1e35",border:"#2d2d4a",accent:"#a855f7",accentDim:"rgba(168,85,247,0.08)",accentBorder:"rgba(168,85,247,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// //   Cyan:   { bg:"#020f12",surface:"#071a1f",card:"#0c2530",border:"#0e3040",accent:"#06b6d4",accentDim:"rgba(6,182,212,0.08)",accentBorder:"rgba(6,182,212,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// //   Rose:   { bg:"#120a0a",surface:"#1c1010",card:"#261515",border:"#3a1f1f",accent:"#f43f5e",accentDim:"rgba(244,63,94,0.08)",accentBorder:"rgba(244,63,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#fbbf24",success:"#22c55e" },
// //   Green:  { bg:"#090f0a",surface:"#101a10",card:"#162416",border:"#1e3520",accent:"#22c55e",accentDim:"rgba(34,197,94,0.08)",accentBorder:"rgba(34,197,94,0.25)",text:"#f4f4f5",sub:"#a1a1aa",muted:"#52525b",error:"#ef4444",success:"#22c55e" },
// // };
// // const THEME_NAMES = Object.keys(THEMES);

// // const SkeletonRow = ({ C }) => (
// //   <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,marginBottom:3}}>
// //     <div style={{width:20,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //     <div style={{width:40,height:40,borderRadius:6,background:C.border,animation:"shimmer 1.4s infinite",flexShrink:0}}/>
// //     <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
// //       <div style={{width:"60%",height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //       <div style={{width:"40%",height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //     </div>
// //   </div>
// // );

// // const SkeletonAlbum = ({ C }) => (
// //   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:8}}>
// //     <div style={{display:"flex",alignItems:"center",gap:12}}>
// //       <div style={{width:42,height:42,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //       <div style={{display:"flex",flexDirection:"column",gap:6}}>
// //         <div style={{width:120,height:12,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //         <div style={{width:70,height:10,borderRadius:4,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //       </div>
// //     </div>
// //     <div style={{width:80,height:28,borderRadius:8,background:C.border,animation:"shimmer 1.4s infinite"}}/>
// //   </div>
// // );

// // export default function AdminPanel() {
// //   const [themeName, setThemeName] = useState(() => localStorage.getItem("vo_admin_theme") || "Amber");
// //   const [showThemePicker, setShowThemePicker] = useState(false);
// //   const C = THEMES[themeName] || THEMES.Amber;
// //   const pickTheme = (n) => { setThemeName(n); localStorage.setItem("vo_admin_theme", n); setShowThemePicker(false); };

// //   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
// //   const [loginUser, setLoginUser] = useState("");
// //   const [loginPass, setLoginPass] = useState("");
// //   const [showPass, setShowPass] = useState(false);
// //   const [loginErr, setLoginErr] = useState("");

// //   const [songs, setSongs] = useState([]);
// //   const [albums, setAlbums] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [fetchLoading, setFetchLoading] = useState(true);
// //   const [view, setView] = useState("upload");
// //   const [search, setSearch] = useState("");
// //   const [toast, setToast] = useState(null);
// //   const [confirm, setConfirm] = useState(null);
// //   const [editingId, setEditingId] = useState(null);

// //   const [title, setTitle] = useState("");
// //   const [artist, setArtist] = useState("");
// //   const [album, setAlbum] = useState("");
// //   const [newAlbum, setNewAlbum] = useState("");
// //   const [audio, setAudio] = useState(null);
// //   const [image, setImage] = useState(null);
// //   const audioRef = useRef(null);
// //   const imageRef = useRef(null);

// //   const [bulkItems, setBulkItems] = useState([{ title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// //   const [batchLoading, setBatchLoading] = useState(false);
// //   const [batchResults, setBatchResults] = useState([]);
// //   const [batchProgress, setBatchProgress] = useState(0);

// //   const handleLogin = (e) => {
// //     e.preventDefault(); setLoginErr("");
// //     const pass = ADMINS[loginUser.trim().toLowerCase()];
// //     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
// //     else setLoginErr("Invalid username or password.");
// //   };

// //   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };

// //   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

// //   const fetchData = useCallback(async (force = false) => {
// //     setFetchLoading(true);
// //     try {
// //       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
// //       const res = await axios.get(`${API}/`);
// //       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
// //     } catch { showToast("Failed to fetch songs", "error"); }
// //     finally { setFetchLoading(false); }
// //   }, []);

// //   useEffect(() => { if (authed) fetchData(); }, [authed]);

// //   const resetForm = () => {
// //     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
// //     if (audioRef.current) audioRef.current.value = "";
// //     if (imageRef.current) imageRef.current.value = "";
// //   };

// //   const submit = async () => {
// //     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
// //     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
// //     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
// //     const fd = new FormData();
// //     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
// //     if (audio) fd.append("audio", audio);
// //     if (image) fd.append("image", image);
// //     setLoading(true);
// //     try {
// //       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
// //       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } }); showToast("Song uploaded!"); }
// //       resetForm(); _cache = null; fetchData(true);
// //     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
// //     finally { setLoading(false); }
// //   };

// //   const deleteSong = async (id) => {
// //     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
// //     catch { showToast("Delete failed", "error"); }
// //   };

// //   const deleteAlbum = async (name) => {
// //     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
// //     catch { showToast("Album delete failed", "error"); }
// //   };

// //   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

// //   const addBulkItem = () => setBulkItems(p => [...p, { title:"",artist:"",album:"",newAlbum:"",audio:null,image:null }]);
// //   const removeBulkItem = (i) => setBulkItems(p => p.filter((_,idx) => idx !== i));
// //   const updateBulkItem = (i, k, v) => setBulkItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

// //   const runBulkUpload = async () => {
// //     for (let i = 0; i < bulkItems.length; i++) {
// //       const item = bulkItems[i];
// //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// //       if (!item.title || !item.artist || !fa) { showToast(`Item ${i+1}: Title, Artist, Album required`, "error"); return; }
// //       if (!item.audio || !item.image) { showToast(`Item ${i+1}: Audio & Image required`, "error"); return; }
// //     }
// //     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
// //     const results = [];
// //     for (let i = 0; i < bulkItems.length; i++) {
// //       const item = bulkItems[i];
// //       const fa = item.album === "__new__" ? item.newAlbum?.trim() : item.album;
// //       const fd = new FormData();
// //       fd.append("title", item.title.trim()); fd.append("artist", item.artist.trim()); fd.append("album", fa);
// //       fd.append("audio", item.audio); fd.append("image", item.image);
// //       try {
// //         await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
// //         results.push({ title: item.title, status: "ok" });
// //       } catch (err) {
// //         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
// //       }
// //       setBatchProgress(Math.round(((i+1)/bulkItems.length)*100));
// //       setBatchResults([...results]);
// //     }
// //     setBatchLoading(false);
// //     const ok = results.filter(r => r.status === "ok").length;
// //     showToast(`Bulk: ${ok}/${bulkItems.length} uploaded`, ok === bulkItems.length ? "success" : "error");
// //     if (ok > 0) { _cache = null; fetchData(true); }
// //   };

// //   const filtered = songs.filter(s =>
// //     s.title.toLowerCase().includes(search.toLowerCase()) ||
// //     s.artist.toLowerCase().includes(search.toLowerCase()) ||
// //     s.album.toLowerCase().includes(search.toLowerCase())
// //   );
// //   const albumGroups = songs.reduce((acc, s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});
// //   const a = makeStyles(C);

// //   if (!authed) {
// //     return (
// //       <div style={{fontFamily:"'Outfit',sans-serif",minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
// //         <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus{outline:1px solid ${C.accent}!important;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
// //         <div style={{width:"100%",maxWidth:400,background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"36px 32px",animation:"fadeUp 0.35s ease"}}>
// //           <div style={{width:52,height:52,borderRadius:14,background:C.accentDim,border:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}><FaLock size={22} color={C.accent}/></div>
// //           <h1 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:6}}>Admin Access</h1>
// //           <p style={{fontSize:13,color:C.sub,marginBottom:28}}>Enter your credentials to continue</p>
// //           {loginErr && <div style={{background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.3)",color:C.error,fontSize:13,padding:"10px 14px",borderRadius:10,marginBottom:20}}>{loginErr}</div>}
// //           <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:16}}>
// //             {[{label:"Username",type:"text",val:loginUser,set:setLoginUser,icon:<FaUser size={13} color={C.muted}/>},{label:"Password",type:showPass?"text":"password",val:loginPass,set:setLoginPass,icon:<FaLock size={13} color={C.muted}/>}].map(({label,type,val,set,icon},i)=>(
// //               <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// //                 <label style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.6}}>{label}</label>
// //                 <div style={{display:"flex",alignItems:"center",gap:10,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
// //                   {icon}
// //                   <input style={{flex:1,background:"none",border:"none",outline:"none",fontSize:14,color:C.text,fontFamily:"'Outfit',sans-serif"}} type={type} value={val} onChange={e=>set(e.target.value)} autoFocus={i===0}/>
// //                   {i===1&&<button type="button" style={{background:"none",border:"none",cursor:"pointer",display:"flex",padding:0}} onClick={()=>setShowPass(!showPass)}>{showPass?<FaEyeSlash size={13} color={C.muted}/>:<FaEye size={13} color={C.muted}/>}</button>}
// //                 </div>
// //               </div>
// //             ))}
// //             <button type="submit" style={{marginTop:8,padding:"13px",borderRadius:12,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Sign In →</button>
// //           </form>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={a.root}>
// //       <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus,textarea:focus{outline:1px solid ${C.accent}!important;}input::placeholder,textarea::placeholder{color:${C.muted};}select option{background:${C.card};color:${C.text};}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin2{to{transform:rotate(360deg)}}@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}@media(max-width:640px){.al{flex-direction:column!important;}.sb{flex-direction:row!important;width:100%!important;height:auto!important;border-right:none!important;border-bottom:1px solid ${C.border}!important;padding:12px!important;}.sl{display:none!important;}.ss{display:none!important;}.sn{flex-direction:row!important;gap:4px!important;flex:1!important;}.ni{padding:8px 14px!important;font-size:12px!important;}.fg{grid-template-columns:1fr!important;}.ur{flex-direction:column!important;}}`}</style>

// //       {toast&&<div style={{...a.toast,background:toast.type==="error"?C.error:C.success,animation:"slideIn 0.25s ease"}}>{toast.type==="error"?"✗":"✓"} {toast.msg}</div>}

// //       {confirm&&(
// //         <div style={a.overlay} onClick={()=>setConfirm(null)}>
// //           <div style={a.modal} onClick={e=>e.stopPropagation()}>
// //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.text}}>Confirm Delete</h3>
// //             <p style={{fontSize:13,color:C.sub,marginBottom:24,lineHeight:1.6}}>{confirm.msg}</p>
// //             <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
// //               <button style={a.mCancel} onClick={()=>setConfirm(null)}>Cancel</button>
// //               <button style={a.mDelete} onClick={confirm.action}>Delete</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {showThemePicker&&(
// //         <div style={a.overlay} onClick={()=>setShowThemePicker(false)}>
// //           <div style={{...a.modal,maxWidth:320}} onClick={e=>e.stopPropagation()}>
// //             <h3 style={{fontSize:17,fontWeight:700,marginBottom:16,color:C.text}}>Choose Theme</h3>
// //             <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
// //               {THEME_NAMES.map(n=>(
// //                 <button key={n} onClick={()=>pickTheme(n)} style={{padding:"8px 18px",borderRadius:8,border:`2px solid ${themeName===n?THEMES[n].accent:THEMES[n].border}`,background:THEMES[n].surface,color:THEMES[n].accent,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:13}}>{n}</button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div style={a.layout} className="al">
// //         <div style={a.sidebar} className="sb">
// //           <div style={{fontSize:17,fontWeight:700,color:C.accent,padding:"0 8px",marginBottom:16}} className="sl">⚡ Admin</div>
// //           <div style={{display:"flex",gap:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:16,overflow:"hidden"}} className="ss">
// //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{songs.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Songs</span></div>
// //             <div style={{width:1,background:C.border}}/>
// //             <div style={{flex:1,textAlign:"center",padding:"12px 8px"}}><span style={{display:"block",fontSize:18,fontWeight:700,color:C.accent}}>{albums.length}</span><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:0.5}}>Albums</span></div>
// //           </div>
// //           <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}} className="sn">
// //             {[{id:"upload",icon:<FaUpload size={13}/>,label:editingId?"Edit":"Upload"},{id:"library",icon:<FaList size={13}/>,label:"Library"},{id:"batch",icon:<FaCloudUploadAlt size={14}/>,label:"Bulk"}].map(t=>(
// //               <button key={t.id} style={{...a.navItem,...(view===t.id?a.navItemActive:{})}} className="ni" onClick={()=>setView(t.id)}>{t.icon} {t.label}</button>
// //             ))}
// //           </div>
// //           <div style={{display:"flex",flexDirection:"column",gap:6}}>
// //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.accent,fontSize:13,background:C.accentDim,border:`1px solid ${C.accentBorder}`,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setShowThemePicker(true)}><FaPalette size={13}/> Theme</button>
// //             <button style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,background:"none",border:"none",fontFamily:"'Outfit',sans-serif"}} onClick={logout}><FaSignOutAlt size={13}/> Logout</button>
// //           </div>
// //         </div>

// //         <div style={{flex:1,padding:"28px 24px",maxWidth:800,overflowY:"auto"}}>
// //           {view==="upload"&&(
// //             <div style={a.card}>
// //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
// //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
// //                 {editingId&&<button style={a.cancelBtn} onClick={resetForm}>✕ Cancel</button>}
// //               </div>
// //               <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}} className="fg">
// //                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i)=>(
// //                   <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
// //                     <label style={a.label}>{label}</label>
// //                     <input style={a.inp} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
// //                   </div>
// //                 ))}
// //                 <div style={{display:"flex",flexDirection:"column",gap:6}}>
// //                   <label style={a.label}>Album *</label>
// //                   <select style={a.inp} value={album} onChange={e=>setAlbum(e.target.value)}>
// //                     <option value="">Select album</option>
// //                     {albums.map((al,i)=><option key={i} value={al}>{al}</option>)}
// //                     <option value="__new__">+ New Album</option>
// //                   </select>
// //                 </div>
// //                 {album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={newAlbum} onChange={e=>setNewAlbum(e.target.value)}/></div>}
// //               </div>
// //               <div style={{display:"flex",gap:16,marginBottom:24}} className="ur">
// //                 <label style={{...a.dz,...(audio?a.dzF:{})}}>
// //                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
// //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{audio?audio.name:"Upload Audio File"}</span>
// //                   <span style={{fontSize:11,color:C.muted}}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
// //                   <input ref={audioRef} type="file" accept="audio/*" onChange={e=>setAudio(e.target.files[0])} style={{display:"none"}}/>
// //                 </label>
// //                 <label style={{...a.dz,...(image?a.dzF:{})}}>
// //                   {image?<img src={URL.createObjectURL(image)} alt="" style={{width:48,height:48,borderRadius:8,objectFit:"cover"}}/>:<FaUpload size={20} color={C.muted}/>}
// //                   <span style={{fontSize:12,fontWeight:600,color:C.text,textAlign:"center"}}>{image?image.name:"Upload Cover Image"}</span>
// //                   <span style={{fontSize:11,color:C.muted}}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
// //                   <input ref={imageRef} type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} style={{display:"none"}}/>
// //                 </label>
// //               </div>
// //               <button style={{...a.btn,...(loading?a.btnD:{})}} onClick={submit} disabled={loading}>
// //                 {loading?<><span style={a.spin}/>{editingId?"Updating...":"Uploading..."}</>:editingId?"✓ Update Song":"↑ Upload Song"}
// //               </button>
// //             </div>
// //           )}

// //           {view==="library"&&(
// //             <div style={{animation:"fadeUp 0.25s ease"}}>
// //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
// //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>Library</h2>
// //                 <div style={{display:"flex",alignItems:"center",gap:8,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px"}}>
// //                   <FaSearch size={12} color={C.muted}/>
// //                   <input style={{border:"none",outline:"none",fontSize:13,color:C.text,background:"none",fontFamily:"'Outfit',sans-serif",width:160}} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
// //                   {search&&<button style={{background:"none",border:"none",cursor:"pointer",color:C.muted,display:"flex"}} onClick={()=>setSearch("")}><FaTimes size={11}/></button>}
// //                 </div>
// //               </div>
// //               {fetchLoading?(
// //                 <div>
// //                   {[...Array(3)].map((_,i)=><SkeletonAlbum key={i} C={C}/>)}
// //                   <div style={{marginTop:16}}>{[...Array(6)].map((_,i)=><SkeletonRow key={i} C={C}/>)}</div>
// //                 </div>
// //               ):(
// //                 <>
// //                   {!search&&Object.entries(albumGroups).length>0&&(
// //                     <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
// //                       {Object.entries(albumGroups).map(([name,list])=>(
// //                         <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12}}>
// //                           <div style={{display:"flex",alignItems:"center",gap:12}}>
// //                             <img src={list[0]?.imageUrl} alt="" style={{width:42,height:42,borderRadius:8,objectFit:"cover"}} loading="lazy"/>
// //                             <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{name}</div><div style={{fontSize:11,color:C.sub}}>{list.length} songs</div></div>
// //                           </div>
// //                           <button style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",color:C.error,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"}} onClick={()=>setConfirm({msg:`Delete album "${name}" and all ${list.length} songs?`,action:()=>deleteAlbum(name)})}>
// //                             <FaTrash size={11}/> Album
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                   <div style={{display:"flex",flexDirection:"column",gap:3}}>
// //                     <div style={{fontSize:11,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:0.6,padding:"0 4px 10px"}}>{search?`${filtered.length} result${filtered.length!==1?"s":""}`:`All Songs (${songs.length})`}</div>
// //                     {filtered.map((s,i)=>(
// //                       <div key={s._id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:10,background:C.surface,border:`1px solid ${C.border}`,gap:12}}>
// //                         <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0,flex:1}}>
// //                           <span style={{fontSize:11,color:C.muted,width:20,textAlign:"center",flexShrink:0,fontFamily:"monospace"}}>{i+1}</span>
// //                           <img src={s.imageUrl} alt="" style={{width:40,height:40,borderRadius:6,objectFit:"cover",flexShrink:0}} loading="lazy"/>
// //                           <div style={{minWidth:0}}>
// //                             <div style={{fontSize:13,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.title}</div>
// //                             <div style={{fontSize:11,color:C.sub,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.artist} · {s.album}</div>
// //                           </div>
// //                         </div>
// //                         <div style={{display:"flex",gap:8,flexShrink:0}}>
// //                           <button style={{padding:"7px 10px",borderRadius:7,border:`1px solid ${C.border}`,background:"none",cursor:"pointer",color:C.sub,display:"flex"}} onClick={()=>editSong(s)}><FaEdit size={12}/></button>
// //                           <button style={{padding:"7px 10px",borderRadius:7,border:"1px solid rgba(248,113,113,0.2)",background:"rgba(248,113,113,0.06)",cursor:"pointer",color:C.error,display:"flex"}} onClick={()=>setConfirm({msg:`Delete "${s.title}"?`,action:()=>deleteSong(s._id)})}><FaTrash size={12}/></button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                     {filtered.length===0&&<p style={{color:C.muted,fontSize:14,textAlign:"center",padding:32}}>No songs found.</p>}
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           )}

// //           {view==="batch"&&(
// //             <div style={a.card}>
// //               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
// //                 <h2 style={{fontSize:18,fontWeight:700,color:C.text}}>📦 Bulk Upload Songs</h2>
// //                 <button style={a.cancelBtn} onClick={addBulkItem}>+ Add Song</button>
// //               </div>
// //               <p style={{fontSize:13,color:C.sub,lineHeight:1.7,marginBottom:20}}>Add multiple songs below. Each needs title, artist, album, audio file and cover image. Uploaded one-by-one to the server.</p>

// //               {bulkItems.map((item,i)=>(
// //                 <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:14}}>
// //                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
// //                     <span style={{fontSize:12,fontWeight:700,color:C.accent}}>Song {i+1}</span>
// //                     {bulkItems.length>1&&<button onClick={()=>removeBulkItem(i)} style={{background:"none",border:"none",cursor:"pointer",color:C.error,display:"flex"}}><FaTimes size={13}/></button>}
// //                   </div>
// //                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}} className="fg">
// //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Title *</label><input style={a.inp} placeholder="Song title" value={item.title} onChange={e=>updateBulkItem(i,"title",e.target.value)}/></div>
// //                     <div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>Artist *</label><input style={a.inp} placeholder="Artist" value={item.artist} onChange={e=>updateBulkItem(i,"artist",e.target.value)}/></div>
// //                     <div style={{display:"flex",flexDirection:"column",gap:6}}>
// //                       <label style={a.label}>Album *</label>
// //                       <select style={a.inp} value={item.album} onChange={e=>updateBulkItem(i,"album",e.target.value)}>
// //                         <option value="">Select album</option>
// //                         {albums.map((al,ai)=><option key={ai} value={al}>{al}</option>)}
// //                         <option value="__new__">+ New Album</option>
// //                       </select>
// //                     </div>
// //                     {item.album==="__new__"&&<div style={{display:"flex",flexDirection:"column",gap:6}}><label style={a.label}>New Album *</label><input style={a.inp} placeholder="Album name" value={item.newAlbum||""} onChange={e=>updateBulkItem(i,"newAlbum",e.target.value)}/></div>}
// //                   </div>
// //                   <div style={{display:"flex",gap:10}} className="ur">
// //                     <label style={{...a.dz,flex:1,...(item.audio?a.dzF:{})}}>
// //                       <FaMusic size={16} color={item.audio?C.accent:C.muted}/>
// //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.audio?item.audio.name:"Audio File"}</span>
// //                       <span style={{fontSize:10,color:C.muted}}>{item.audio?`${(item.audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV"}</span>
// //                       <input type="file" accept="audio/*" onChange={e=>updateBulkItem(i,"audio",e.target.files[0])} style={{display:"none"}}/>
// //                     </label>
// //                     <label style={{...a.dz,flex:1,...(item.image?a.dzF:{})}}>
// //                       {item.image?<img src={URL.createObjectURL(item.image)} alt="" style={{width:36,height:36,borderRadius:6,objectFit:"cover"}}/>:<FaUpload size={16} color={C.muted}/>}
// //                       <span style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center"}}>{item.image?item.image.name:"Cover Image"}</span>
// //                       <span style={{fontSize:10,color:C.muted}}>{item.image?`${(item.image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG"}</span>
// //                       <input type="file" accept="image/*" onChange={e=>updateBulkItem(i,"image",e.target.files[0])} style={{display:"none"}}/>
// //                     </label>
// //                   </div>
// //                 </div>
// //               ))}

// //               <button style={{...a.cancelBtn,display:"flex",alignItems:"center",gap:8,marginBottom:14,width:"100%",justifyContent:"center",padding:"10px"}} onClick={addBulkItem}>+ Add Another Song</button>

// //               {batchLoading&&(
// //                 <div style={{marginBottom:16}}>
// //                   <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginBottom:6}}><span>Uploading...</span><span>{batchProgress}%</span></div>
// //                   <div style={{height:6,background:C.border,borderRadius:4,overflow:"hidden"}}>
// //                     <div style={{height:"100%",width:`${batchProgress}%`,background:C.accent,borderRadius:4,transition:"width 0.3s ease"}}/>
// //                   </div>
// //                 </div>
// //               )}

// //               <button style={{...a.btn,...(batchLoading?a.btnD:{})}} onClick={runBulkUpload} disabled={batchLoading}>
// //                 {batchLoading?<><span style={a.spin}/>Uploading...</>:`↑ Upload All (${bulkItems.length})`}
// //               </button>

// //               {batchResults.length>0&&(
// //                 <div style={{marginTop:20,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
// //                   <div style={{padding:"10px 16px",background:C.card,fontSize:12,fontWeight:700,color:C.sub,borderBottom:`1px solid ${C.border}`}}>{batchResults.filter(r=>r.status==="ok").length}/{batchResults.length} uploaded</div>
// //                   {batchResults.map((r,i)=>(
// //                     <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,color:C.text,borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}`}}>
// //                       <span style={{color:r.status==="ok"?C.accent:C.error}}>{r.status==="ok"?"✓":"✗"}</span>
// //                       <span style={{flex:1}}>{r.title}</span>
// //                       {r.error&&<span style={{fontSize:11,color:C.error}}>{r.error}</span>}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function makeStyles(C) {
// //   return {
// //     root:{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,position:"relative"},
// //     toast:{position:"fixed",top:80,right:20,padding:"12px 18px",borderRadius:10,color:"#0f0f0f",fontSize:13,fontWeight:700,zIndex:9999,display:"flex",alignItems:"center",gap:8},
// //     overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:20},
// //     modal:{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:28,maxWidth:360,width:"100%"},
// //     mCancel:{padding:"9px 20px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:13,fontFamily:"'Outfit',sans-serif"},
// //     mDelete:{padding:"9px 20px",borderRadius:8,border:"none",background:C.error,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Outfit',sans-serif"},
// //     layout:{display:"flex",minHeight:"100vh"},
// //     sidebar:{width:200,background:C.surface,borderRight:`1px solid ${C.border}`,padding:"24px 14px",display:"flex",flexDirection:"column",gap:8,position:"sticky",top:0,height:"100vh",flexShrink:0},
// //     navItem:{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,cursor:"pointer",color:C.sub,fontSize:13,fontWeight:500,background:"none",border:"none",fontFamily:"'Outfit',sans-serif",textAlign:"left"},
// //     navItemActive:{background:C.accentDim,color:C.accent,border:`1px solid ${C.accentBorder}`},
// //     card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:28,marginBottom:24,animation:"fadeUp 0.25s ease"},
// //     cancelBtn:{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",color:C.sub,cursor:"pointer",fontSize:12,fontFamily:"'Outfit',sans-serif"},
// //     label:{fontSize:11,fontWeight:600,color:C.sub,textTransform:"uppercase",letterSpacing:0.5},
// //     inp:{padding:"11px 14px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:14,fontFamily:"'Outfit',sans-serif",color:C.text,background:C.card},
// //     dz:{flex:1,border:`1.5px dashed ${C.border}`,borderRadius:12,padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer",background:C.bg,transition:"border 0.2s"},
// //     dzF:{borderColor:C.accent,background:C.accentDim},
// //     btn:{width:"100%",padding:14,borderRadius:10,border:"none",background:C.accent,color:"#0f0f0f",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Outfit',sans-serif"},
// //     btnD:{opacity:0.5,cursor:"not-allowed"},
// //     spin:{width:14,height:14,border:"2px solid rgba(0,0,0,0.2)",borderTopColor:"#0f0f0f",borderRadius:"50%",animation:"spin2 0.8s linear infinite",display:"inline-block"},
// //   };
// // }
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import { useTheme } from "../../App";
// import {
//   FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
//   FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
// } from "react-icons/fa";

// const API = "https://music-app-f9t7.onrender.com/api";
// const ADMINS = { "admin":"vibe2024", "revanth":"revv@123", "superadmin":"music#999" };
// let _cache = null;

// const SkeletonRow = ({ C }) => (
//   <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, marginBottom:3 }}>
//     <div style={{ width:20, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//     <div style={{ width:40, height:40, borderRadius:6, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
//     <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
//       <div style={{ width:"60%", height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       <div style={{ width:"40%", height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//     </div>
//   </div>
// );

// const SkeletonAlbum = ({ C }) => (
//   <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:8 }}>
//     <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//       <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//         <div style={{ width:120, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//         <div style={{ width:70, height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//       </div>
//     </div>
//     <div style={{ width:80, height:28, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
//   </div>
// );

// export default function AdminPanel() {
//   const { C } = useTheme();

//   const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
//   const [loginUser, setLoginUser] = useState("");
//   const [loginPass, setLoginPass] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loginErr, setLoginErr] = useState("");

//   const [songs, setSongs] = useState([]);
//   const [albums, setAlbums] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [view, setView] = useState("upload");
//   const [search, setSearch] = useState("");
//   const [toast, setToast] = useState(null);
//   const [confirm, setConfirm] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   const [title, setTitle] = useState("");
//   const [artist, setArtist] = useState("");
//   const [album, setAlbum] = useState("");
//   const [newAlbum, setNewAlbum] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [image, setImage] = useState(null);
//   const audioRef = useRef(null);
//   const imageRef = useRef(null);

//   // ── BULK STATE ──
//   const [batchJson, setBatchJson] = useState("");
//   const [batchMeta, setBatchMeta] = useState([]); // parsed JSON metadata
//   const [batchAudioFiles, setBatchAudioFiles] = useState({}); // { filename: File }
//   const [batchImageFiles, setBatchImageFiles] = useState({}); // { filename: File }
//   const [batchLoading, setBatchLoading] = useState(false);
//   const [batchResults, setBatchResults] = useState([]);
//   const [batchProgress, setBatchProgress] = useState(0);
//   const [batchError, setBatchError] = useState("");
//   const [batchMatched, setBatchMatched] = useState([]); // matched items preview

//   const handleLogin = (e) => {
//     e.preventDefault(); setLoginErr("");
//     const pass = ADMINS[loginUser.trim().toLowerCase()];
//     if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
//     else setLoginErr("Invalid username or password.");
//   };

//   const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };
//   const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

//   const fetchData = useCallback(async (force = false) => {
//     setFetchLoading(true);
//     try {
//       if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
//       const res = await axios.get(`${API}/`);
//       _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
//     } catch { showToast("Failed to fetch songs", "error"); }
//     finally { setFetchLoading(false); }
//   }, []);

//   useEffect(() => { if (authed) fetchData(); }, [authed]);

//   const resetForm = () => {
//     setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
//     if (audioRef.current) audioRef.current.value = "";
//     if (imageRef.current) imageRef.current.value = "";
//   };

//   const submit = async () => {
//     const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
//     if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
//     if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
//     const fd = new FormData();
//     fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
//     if (audio) fd.append("audio", audio);
//     if (image) fd.append("image", image);
//     setLoading(true);
//     try {
//       if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
//       else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } }); showToast("Song uploaded!"); }
//       resetForm(); _cache = null; fetchData(true);
//     } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
//     finally { setLoading(false); }
//   };

//   const deleteSong = async (id) => {
//     try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
//     catch { showToast("Delete failed", "error"); }
//   };

//   const deleteAlbum = async (name) => {
//     try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
//     catch { showToast("Album delete failed", "error"); }
//   };

//   const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

//   // ── BULK: Parse JSON ──
//   const parseJson = (text) => {
//     setBatchError("");
//     setBatchMeta([]);
//     setBatchMatched([]);
//     if (!text.trim()) return;
//     try {
//       const parsed = JSON.parse(text);
//       if (!Array.isArray(parsed)) { setBatchError("JSON must be an array [ ... ]"); return; }
//       setBatchMeta(parsed);
//       recomputeMatches(parsed, batchAudioFiles, batchImageFiles);
//     } catch (e) {
//       setBatchError("Invalid JSON: " + e.message);
//     }
//   };

//   // ── BULK: Match files to metadata by filename ──
//   const recomputeMatches = (meta, audioFiles, imageFiles) => {
//     const matched = meta.map((item, i) => {
//       const audioFile = audioFiles[item.audioFile] || null;
//       const imageFile = imageFiles[item.imageFile] || null;
//       return { ...item, audioFile, imageFile, index: i };
//     });
//     setBatchMatched(matched);
//   };

//   const handleAudioFiles = (files) => {
//     const map = {};
//     Array.from(files).forEach(f => { map[f.name] = f; });
//     setBatchAudioFiles(map);
//     if (batchMeta.length) recomputeMatches(batchMeta, map, batchImageFiles);
//   };

//   const handleImageFiles = (files) => {
//     const map = {};
//     Array.from(files).forEach(f => { map[f.name] = f; });
//     setBatchImageFiles(map);
//     if (batchMeta.length) recomputeMatches(batchMeta, batchAudioFiles, map);
//   };

//   // ── BULK: Upload all ──
//   const runBulkUpload = async () => {
//     if (!batchMatched.length) { showToast("No songs to upload", "error"); return; }
//     const unmatched = batchMatched.filter(i => !i.audioFile || !i.imageFile);
//     if (unmatched.length) { showToast(`${unmatched.length} song(s) missing files. Check matches.`, "error"); return; }

//     setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
//     const results = [];

//     for (let i = 0; i < batchMatched.length; i++) {
//       const item = batchMatched[i];
//       const fd = new FormData();
//       fd.append("title", item.title.trim());
//       fd.append("artist", item.artist.trim());
//       fd.append("album", item.album.trim());
//       fd.append("audio", item.audioFile);
//       fd.append("image", item.imageFile);
//       try {
//         await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } });
//         results.push({ title: item.title, status: "ok" });
//       } catch (err) {
//         results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
//       }
//       setBatchProgress(Math.round(((i+1)/batchMatched.length)*100));
//       setBatchResults([...results]);
//     }

//     setBatchLoading(false);
//     const ok = results.filter(r => r.status === "ok").length;
//     showToast(`Bulk: ${ok}/${batchMatched.length} uploaded`, ok === batchMatched.length ? "success" : "error");
//     if (ok > 0) { _cache = null; fetchData(true); }
//   };

//   const filtered = songs.filter(s =>
//     s.title.toLowerCase().includes(search.toLowerCase()) ||
//     s.artist.toLowerCase().includes(search.toLowerCase()) ||
//     s.album.toLowerCase().includes(search.toLowerCase())
//   );
//   const albumGroups = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

//   // ── LOGIN ──
//   if (!authed) {
//     return (
//       <div style={{ fontFamily:"'Outfit',sans-serif", minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
//         <div style={{ width:"100%", maxWidth:400, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 32px", animation:"fadeUp 0.35s ease" }}>
//           <div style={{ width:52, height:52, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
//             <FaLock size={22} color={C.accent}/>
//           </div>
//           <h1 style={{ fontSize:24, fontWeight:700, color:C.text, marginBottom:6 }}>Admin Access</h1>
//           <p style={{ fontSize:13, color:C.sub, marginBottom:28 }}>Enter your credentials to continue</p>
//           {loginErr && <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:C.error, fontSize:13, padding:"10px 14px", borderRadius:10, marginBottom:20 }}>{loginErr}</div>}
//           <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
//               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
//                 <FaUser size={13} color={C.muted}/>
//                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus/>
//               </div>
//             </div>
//             <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//               <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
//               <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
//                 <FaLock size={13} color={C.muted}/>
//                 <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type={showPass?"text":"password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}/>
//                 <button type="button" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:0 }} onClick={() => setShowPass(!showPass)}>
//                   {showPass ? <FaEyeSlash size={13} color={C.muted}/> : <FaEye size={13} color={C.muted}/>}
//                 </button>
//               </div>
//             </div>
//             <button type="submit" style={{ marginTop:8, padding:"13px", borderRadius:12, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sign In →</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, position:"relative" }}>

//       {toast && (
//         <div style={{ position:"fixed", top:70, right:20, padding:"12px 18px", borderRadius:10, color:"#0f0f0f", fontSize:13, fontWeight:700, zIndex:9999, display:"flex", alignItems:"center", gap:8, background:toast.type==="error"?C.error:C.success, animation:"slideIn 0.25s ease" }}>
//           {toast.type==="error"?"✗":"✓"} {toast.msg}
//         </div>
//       )}

//       {confirm && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setConfirm(null)}>
//           <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, maxWidth:360, width:"100%" }} onClick={e => e.stopPropagation()}>
//             <h3 style={{ fontSize:17, fontWeight:700, marginBottom:8, color:C.text }}>Confirm Delete</h3>
//             <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>{confirm.msg}</p>
//             <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
//               <button style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={() => setConfirm(null)}>Cancel</button>
//               <button style={{ padding:"9px 20px", borderRadius:8, border:"none", background:C.error, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif" }} onClick={confirm.action}>Delete</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div style={{ display:"flex", minHeight:"100vh" }} className="al">
//         {/* Sidebar */}
//         <div style={{ width:200, background:C.surface, borderRight:`1px solid ${C.border}`, padding:"24px 14px", display:"flex", flexDirection:"column", gap:8, position:"sticky", top:0, height:"100vh", flexShrink:0 }} className="sb">
//           <div style={{ fontSize:17, fontWeight:700, color:C.accent, padding:"0 8px", marginBottom:16 }} className="sl">⚡ Admin</div>
//           <div style={{ display:"flex", gap:0, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:16, overflow:"hidden" }} className="ss">
//             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
//               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{songs.length}</span>
//               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Songs</span>
//             </div>
//             <div style={{ width:1, background:C.border }}/>
//             <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
//               <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{albums.length}</span>
//               <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Albums</span>
//             </div>
//           </div>
//           <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }} className="sn">
//             {[
//               { id:"upload", icon:<FaUpload size={13}/>, label:editingId?"Edit":"Upload" },
//               { id:"library", icon:<FaList size={13}/>, label:"Library" },
//               { id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Bulk" },
//             ].map(t => (
//               <button key={t.id}
//                 style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, background:view===t.id?C.accentDim:"none", color:view===t.id?C.accent:C.sub, border:view===t.id?`1px solid ${C.accentBorder}`:"none", fontFamily:"'Outfit',sans-serif", textAlign:"left" }}
//                 className="ni"
//                 onClick={() => setView(t.id)}>
//                 {t.icon} {t.label}
//               </button>
//             ))}
//           </div>
//           <button style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", color:C.sub, fontSize:13, background:"none", border:"none", fontFamily:"'Outfit',sans-serif" }} onClick={logout}>
//             <FaSignOutAlt size={13}/> Logout
//           </button>
//         </div>

//         {/* Content */}
//         <div style={{ flex:1, padding:"28px 24px", maxWidth:800, overflowY:"auto" }}>

//           {/* ── UPLOAD ── */}
//           {view==="upload" && (
//             <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:24, animation:"fadeUp 0.25s ease" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
//                 {editingId && <button style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={resetForm}>✕ Cancel</button>}
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }} className="fg">
//                 {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i) => (
//                   <div key={i} style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
//                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder={ph} value={val} onChange={e => set(e.target.value)}/>
//                   </div>
//                 ))}
//                 <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                   <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album *</label>
//                   <select style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={album} onChange={e => setAlbum(e.target.value)}>
//                     <option value="">Select album</option>
//                     {albums.map((al,i) => <option key={i} value={al}>{al}</option>)}
//                     <option value="__new__">+ New Album</option>
//                   </select>
//                 </div>
//                 {album==="__new__" && (
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>New Album *</label>
//                     <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)}/>
//                   </div>
//                 )}
//               </div>
//               <div style={{ display:"flex", gap:16, marginBottom:24 }} className="ur">
//                 <label style={{ flex:1, border:`1.5px dashed ${audio?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:audio?C.accentDim:C.bg }}>
//                   <FaMusic size={20} color={audio?C.accent:C.muted}/>
//                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{audio?audio.name:"Upload Audio File"}</span>
//                   <span style={{ fontSize:11, color:C.muted }}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
//                   <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display:"none" }}/>
//                 </label>
//                 <label style={{ flex:1, border:`1.5px dashed ${image?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:image?C.accentDim:C.bg }}>
//                   {image ? <img src={URL.createObjectURL(image)} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }}/> : <FaUpload size={20} color={C.muted}/>}
//                   <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{image?image.name:"Upload Cover Image"}</span>
//                   <span style={{ fontSize:11, color:C.muted }}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
//                   <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display:"none" }}/>
//                 </label>
//               </div>
//               <button style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:loading?0.5:1 }} onClick={submit} disabled={loading}>
//                 {loading ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>{editingId?"Updating...":"Uploading..."}</> : editingId?"✓ Update Song":"↑ Upload Song"}
//               </button>
//             </div>
//           )}

//           {/* ── LIBRARY ── */}
//           {view==="library" && (
//             <div style={{ animation:"fadeUp 0.25s ease" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>Library</h2>
//                 <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 14px" }}>
//                   <FaSearch size={12} color={C.muted}/>
//                   <input style={{ border:"none", outline:"none", fontSize:13, color:C.text, background:"none", fontFamily:"'Outfit',sans-serif", width:160 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/>
//                   {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => setSearch("")}><FaTimes size={11}/></button>}
//                 </div>
//               </div>
//               {fetchLoading ? (
//                 <div>
//                   {[...Array(3)].map((_,i) => <SkeletonAlbum key={i} C={C}/>)}
//                   <div style={{ marginTop:16 }}>{[...Array(6)].map((_,i) => <SkeletonRow key={i} C={C}/>)}</div>
//                 </div>
//               ) : (
//                 <>
//                   {!search && Object.entries(albumGroups).length > 0 && (
//                     <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
//                       {Object.entries(albumGroups).map(([name,list]) => (
//                         <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
//                           <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                             <img src={list[0]?.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover" }} loading="lazy"/>
//                             <div>
//                               <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{name}</div>
//                               <div style={{ fontSize:11, color:C.sub }}>{list.length} songs</div>
//                             </div>
//                           </div>
//                           <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", color:C.error, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }}
//                             onClick={() => setConfirm({ msg:`Delete album "${name}" and all ${list.length} songs?`, action:() => deleteAlbum(name) })}>
//                             <FaTrash size={11}/> Album
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
//                     <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, padding:"0 4px 10px" }}>
//                       {search ? `${filtered.length} result${filtered.length!==1?"s":""}` : `All Songs (${songs.length})`}
//                     </div>
//                     {filtered.map((s,i) => (
//                       <div key={s._id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, gap:12 }}>
//                         <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
//                           <span style={{ fontSize:11, color:C.muted, width:20, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{i+1}</span>
//                           <img src={s.imageUrl} alt="" style={{ width:40, height:40, borderRadius:6, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
//                           <div style={{ minWidth:0 }}>
//                             <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title}</div>
//                             <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist} · {s.album}</div>
//                           </div>
//                         </div>
//                         <div style={{ display:"flex", gap:8, flexShrink:0 }}>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", color:C.sub, display:"flex" }} onClick={() => editSong(s)}><FaEdit size={12}/></button>
//                           <button style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", cursor:"pointer", color:C.error, display:"flex" }}
//                             onClick={() => setConfirm({ msg:`Delete "${s.title}"?`, action:() => deleteSong(s._id) })}><FaTrash size={12}/></button>
//                         </div>
//                       </div>
//                     ))}
//                     {filtered.length===0 && <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:32 }}>No songs found.</p>}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           {/* ── BULK UPLOAD ── */}
//           {view==="batch" && (
//             <div style={{ animation:"fadeUp 0.25s ease" }}>

//               {/* HOW TO USE */}
//               <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:24, marginBottom:20 }}>
//                 <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:16 }}>📦 Bulk Upload via JSON</h2>

//                 {/* JSON Format Guide */}
//                 <div style={{ background:C.bg, border:`1px solid ${C.accentBorder}`, borderRadius:12, padding:16, marginBottom:20 }}>
//                   <div style={{ fontSize:11, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>📋 JSON Format</div>
//                   <p style={{ fontSize:12, color:C.sub, marginBottom:10, lineHeight:1.7 }}>
//                     Each item needs: <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>title</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>artist</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>album</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>audioFile</code>, <code style={{ background:C.card, padding:"2px 6px", borderRadius:4, color:C.accent, fontSize:11 }}>imageFile</code>
//                   </p>
//                   <pre style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.sub, background:C.card, padding:14, borderRadius:8, overflowX:"auto", lineHeight:1.8 }}>{`[
//   {
//     "title": "Blinding Lights",
//     "artist": "The Weeknd",
//     "album": "After Hours",
//     "audioFile": "blinding_lights.mp3",
//     "imageFile": "after_hours.jpg"
//   },
//   {
//     "title": "Levitating",
//     "artist": "Dua Lipa",
//     "album": "Future Nostalgia",
//     "audioFile": "levitating.mp3",
//     "imageFile": "future_nostalgia.jpg"
//   }
// ]`}</pre>
//                   <p style={{ fontSize:11, color:C.muted, marginTop:10, lineHeight:1.7 }}>
//                     ⚠️ <strong style={{ color:C.text }}>audioFile</strong> and <strong style={{ color:C.text }}>imageFile</strong> must exactly match the filenames you select below.
//                   </p>
//                 </div>

//                 {/* Step 1: JSON */}
//                 <div style={{ marginBottom:20 }}>
//                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
//                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>1</span>
//                     Paste or upload your JSON
//                   </div>

//                   <label style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:8, border:`1px dashed ${C.accentBorder}`, color:C.accent, cursor:"pointer", fontSize:12, fontWeight:600, marginBottom:10, fontFamily:"'Outfit',sans-serif" }}>
//                     <FaUpload size={11}/> Upload .json file
//                     <input type="file" accept=".json" onChange={e => {
//                       const f = e.target.files[0];
//                       if (!f) return;
//                       const r = new FileReader();
//                       r.onload = ev => { setBatchJson(ev.target.result); parseJson(ev.target.result); };
//                       r.readAsText(f);
//                     }} style={{ display:"none" }}/>
//                   </label>

//                   <textarea
//                     style={{ width:"100%", padding:14, borderRadius:10, border:`1px solid ${batchError?C.error:C.border}`, fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:C.text, resize:"vertical", lineHeight:1.7, background:C.bg, display:"block" }}
//                     rows={8}
//                     placeholder={`[\n  {\n    "title": "Song Name",\n    "artist": "Artist",\n    "album": "Album",\n    "audioFile": "song.mp3",\n    "imageFile": "cover.jpg"\n  }\n]`}
//                     value={batchJson}
//                     onChange={e => { setBatchJson(e.target.value); parseJson(e.target.value); }}
//                   />
//                   {batchError && <div style={{ fontSize:12, color:C.error, marginTop:6 }}>⚠ {batchError}</div>}
//                   {batchMeta.length > 0 && !batchError && <div style={{ fontSize:12, color:C.success, marginTop:6 }}>✓ {batchMeta.length} song(s) parsed from JSON</div>}
//                 </div>

//                 {/* Step 2: Audio Files */}
//                 <div style={{ marginBottom:20 }}>
//                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
//                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>2</span>
//                     Select all audio files
//                   </div>
//                   <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"20px", border:`1.5px dashed ${Object.keys(batchAudioFiles).length?C.accent:C.border}`, borderRadius:12, cursor:"pointer", background:Object.keys(batchAudioFiles).length?C.accentDim:C.bg }}>
//                     <FaMusic size={22} color={Object.keys(batchAudioFiles).length?C.accent:C.muted}/>
//                     <span style={{ fontSize:13, fontWeight:600, color:C.text }}>
//                       {Object.keys(batchAudioFiles).length ? `${Object.keys(batchAudioFiles).length} audio file(s) selected` : "Click to select all MP3/WAV files"}
//                     </span>
//                     <span style={{ fontSize:11, color:C.muted }}>You can select multiple files at once</span>
//                     {Object.keys(batchAudioFiles).length > 0 && (
//                       <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4, justifyContent:"center" }}>
//                         {Object.keys(batchAudioFiles).map(name => (
//                           <span key={name} style={{ fontSize:10, background:C.card, border:`1px solid ${C.border}`, padding:"3px 8px", borderRadius:20, color:C.sub }}>{name}</span>
//                         ))}
//                       </div>
//                     )}
//                     <input type="file" accept="audio/*" multiple onChange={e => handleAudioFiles(e.target.files)} style={{ display:"none" }}/>
//                   </label>
//                 </div>

//                 {/* Step 3: Image Files */}
//                 <div style={{ marginBottom:20 }}>
//                   <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
//                     <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>3</span>
//                     Select all cover images
//                   </div>
//                   <label style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"20px", border:`1.5px dashed ${Object.keys(batchImageFiles).length?C.accent:C.border}`, borderRadius:12, cursor:"pointer", background:Object.keys(batchImageFiles).length?C.accentDim:C.bg }}>
//                     <FaUpload size={22} color={Object.keys(batchImageFiles).length?C.accent:C.muted}/>
//                     <span style={{ fontSize:13, fontWeight:600, color:C.text }}>
//                       {Object.keys(batchImageFiles).length ? `${Object.keys(batchImageFiles).length} image(s) selected` : "Click to select all cover images"}
//                     </span>
//                     <span style={{ fontSize:11, color:C.muted }}>You can select multiple files at once</span>
//                     {Object.keys(batchImageFiles).length > 0 && (
//                       <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4, justifyContent:"center" }}>
//                         {Object.keys(batchImageFiles).map(name => (
//                           <span key={name} style={{ fontSize:10, background:C.card, border:`1px solid ${C.border}`, padding:"3px 8px", borderRadius:20, color:C.sub }}>{name}</span>
//                         ))}
//                       </div>
//                     )}
//                     <input type="file" accept="image/*" multiple onChange={e => handleImageFiles(e.target.files)} style={{ display:"none" }}/>
//                   </label>
//                 </div>

//                 {/* Step 4: Preview matches */}
//                 {batchMatched.length > 0 && (
//                   <div style={{ marginBottom:20 }}>
//                     <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>
//                       <span style={{ background:C.accent, color:"#0f0f0f", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8 }}>4</span>
//                       Preview & verify matches
//                     </div>
//                     <div style={{ border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
//                       <div style={{ padding:"10px 16px", background:C.card, fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 60px 60px", gap:8 }}>
//                         <span>Title</span><span>Artist</span><span>Album</span><span>Audio</span><span>Image</span>
//                       </div>
//                       {batchMatched.map((item, i) => (
//                         <div key={i} style={{ padding:"10px 16px", borderBottom:`1px solid ${C.border}`, display:"grid", gridTemplateColumns:"1fr 1fr 1fr 60px 60px", gap:8, alignItems:"center", background: (!item.audioFile||!item.imageFile) ? "rgba(239,68,68,0.05)" : "transparent" }}>
//                           <span style={{ fontSize:12, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.title}</span>
//                           <span style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.artist}</span>
//                           <span style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.album}</span>
//                           <span style={{ fontSize:16, textAlign:"center" }}>{item.audioFile ? "✅" : "❌"}</span>
//                           <span style={{ fontSize:16, textAlign:"center" }}>{item.imageFile ? "✅" : "❌"}</span>
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{ fontSize:12, color:C.muted, marginTop:8 }}>
//                       ✅ {batchMatched.filter(i => i.audioFile && i.imageFile).length} ready &nbsp;·&nbsp;
//                       ❌ {batchMatched.filter(i => !i.audioFile || !i.imageFile).length} missing files
//                     </div>
//                   </div>
//                 )}

//                 {/* Progress bar */}
//                 {batchLoading && (
//                   <div style={{ marginBottom:16 }}>
//                     <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:6 }}>
//                       <span>Uploading...</span><span>{batchProgress}%</span>
//                     </div>
//                     <div style={{ height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
//                       <div style={{ height:"100%", width:`${batchProgress}%`, background:C.accent, borderRadius:4, transition:"width 0.3s ease" }}/>
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:(batchLoading||!batchMatched.length)?0.5:1 }}
//                   onClick={runBulkUpload}
//                   disabled={batchLoading || !batchMatched.length}>
//                   {batchLoading
//                     ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>Uploading...</>
//                     : `↑ Upload All (${batchMatched.filter(i => i.audioFile && i.imageFile).length} ready)`
//                   }
//                 </button>

//                 {/* Results */}
//                 {batchResults.length > 0 && (
//                   <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
//                     <div style={{ padding:"10px 16px", background:C.card, fontSize:12, fontWeight:700, color:C.sub, borderBottom:`1px solid ${C.border}` }}>
//                       {batchResults.filter(r => r.status==="ok").length}/{batchResults.length} uploaded
//                     </div>
//                     {batchResults.map((r,i) => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.text, borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}` }}>
//                         <span style={{ color:r.status==="ok"?C.accent:C.error }}>{r.status==="ok"?"✓":"✗"}</span>
//                         <span style={{ flex:1 }}>{r.title}</span>
//                         {r.error && <span style={{ fontSize:11, color:C.error }}>{r.error}</span>}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useTheme } from "../../App";
import {
  FaUpload, FaTrash, FaEdit, FaSearch, FaTimes, FaList,
  FaCloudUploadAlt, FaSignOutAlt, FaMusic, FaLock, FaUser, FaEye, FaEyeSlash
} from "react-icons/fa";

const API = "https://music-app-f9t7.onrender.com/api";
const ADMINS = { "admin":"vibe2024", "revanth":"revv@123", "superadmin":"music#999","vyshu":"vyshu@123" };
let _cache = null;

const SkeletonRow = ({ C }) => (
  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, marginBottom:3 }}>
    <div style={{ width:20, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
    <div style={{ width:40, height:40, borderRadius:6, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite", flexShrink:0 }}/>
    <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
      <div style={{ width:"60%", height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
      <div style={{ width:"40%", height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
    </div>
  </div>
);

const SkeletonAlbum = ({ C }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:8 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:42, height:42, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ width:120, height:12, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
        <div style={{ width:70, height:10, borderRadius:4, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
      </div>
    </div>
    <div style={{ width:80, height:28, borderRadius:8, background:`linear-gradient(90deg,${C.card} 25%,${C.border} 50%,${C.card} 75%)`, backgroundSize:"400px 100%", animation:"shimmer 1.4s infinite" }}/>
  </div>
);

export default function adminpanel() {
  const { C } = useTheme();

  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem("vo_admin"));
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [view, setView] = useState("upload");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const audioRef = useRef(null);
  const imageRef = useRef(null);

  // ── BULK STATE ──
  const [batchJson, setBatchJson] = useState("");
  const [batchParsed, setBatchParsed] = useState([]);
  const [batchError, setBatchError] = useState("");
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchResults, setBatchResults] = useState([]);
  const [batchProgress, setBatchProgress] = useState(0);

  // ── MULTI FILE UPLOAD STATE (pick many local audio files at once) ──
  const [muMode, setMuMode] = useState("files"); // files | json
  const [muFiles, setMuFiles] = useState([]); // [{id,file,title}]
  const [muImages, setMuImages] = useState([]); // File[] matched by filename
  const [muDefaultImage, setMuDefaultImage] = useState(null); // fallback cover
  const [muArtist, setMuArtist] = useState("");
  const [muAlbum, setMuAlbum] = useState("");
  const [muNewAlbum, setMuNewAlbum] = useState("");
  const [muLoading, setMuLoading] = useState(false);
  const [muProgress, setMuProgress] = useState(0);
  const [muResults, setMuResults] = useState([]);
  const muAudioRef = useRef(null);
  const muImageRef = useRef(null);
  const muDefaultImageRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault(); setLoginErr("");
    const pass = ADMINS[loginUser.trim().toLowerCase()];
    if (pass && pass === loginPass) { sessionStorage.setItem("vo_admin", loginUser); setAuthed(true); }
    else setLoginErr("Invalid username or password.");
  };

  const logout = () => { sessionStorage.removeItem("vo_admin"); setAuthed(false); setLoginUser(""); setLoginPass(""); };
  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const fetchData = useCallback(async (force = false) => {
    setFetchLoading(true);
    try {
      if (_cache && !force) { setSongs(_cache); setAlbums([...new Set(_cache.map(s => s.album))]); setFetchLoading(false); return; }
      const res = await axios.get(`${API}/`);
      _cache = res.data; setSongs(res.data); setAlbums([...new Set(res.data.map(s => s.album))]);
    } catch { showToast("Failed to fetch songs", "error"); }
    finally { setFetchLoading(false); }
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed]);

  const resetForm = () => {
    setTitle(""); setArtist(""); setAlbum(""); setNewAlbum(""); setAudio(null); setImage(null); setEditingId(null);
    if (audioRef.current) audioRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
  };

  const submit = async () => {
    const finalAlbum = album === "__new__" ? newAlbum.trim() : album;
    if (!title.trim() || !artist.trim() || !finalAlbum) { showToast("Title, Artist, Album required", "error"); return; }
    if (!editingId && (!audio || !image)) { showToast("Audio & Image required", "error"); return; }
    const fd = new FormData();
    fd.append("title", title.trim()); fd.append("artist", artist.trim()); fd.append("album", finalAlbum);
    if (audio) fd.append("audio", audio);
    if (image) fd.append("image", image);
    setLoading(true);
    try {
      if (editingId) { await axios.put(`${API}/${editingId}`, fd); showToast("Song updated!"); }
      else { await axios.post(`${API}/create`, fd, { headers: { "Content-Type":"multipart/form-data" } }); showToast("Song uploaded!"); }
      resetForm(); _cache = null; fetchData(true);
    } catch (err) { showToast(err.response?.data?.message || "Upload failed", "error"); }
    finally { setLoading(false); }
  };

  const deleteSong = async (id) => {
    try { await axios.delete(`${API}/${id}`); showToast("Song deleted"); setConfirm(null); _cache = null; fetchData(true); }
    catch { showToast("Delete failed", "error"); }
  };

  const deleteAlbum = async (name) => {
    try { await axios.delete(`${API}/albums/${encodeURIComponent(name)}`); showToast(`Album "${name}" deleted`); setConfirm(null); _cache = null; fetchData(true); }
    catch { showToast("Album delete failed", "error"); }
  };

  const editSong = (song) => { setEditingId(song._id); setTitle(song.title); setArtist(song.artist); setAlbum(song.album); setView("upload"); window.scrollTo(0,0); };

  // ── PARSE JSON ──
  const parseJson = (text) => {
    setBatchError(""); setBatchParsed([]);
    if (!text.trim()) return;
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) { setBatchError("Must be a JSON array [ ... ]"); return; }
      // Validate each item
      const invalid = parsed.filter(i => !i.title || !i.artist || !i.album || !i.audioUrl || !i.imageUrl);
      if (invalid.length) {
        setBatchError(`${invalid.length} item(s) missing required fields. Each needs: title, artist, album, audioUrl, imageUrl`);
        return;
      }
      setBatchParsed(parsed);
    } catch (e) {
      setBatchError("Invalid JSON: " + e.message);
    }
  };

  // ── BULK UPLOAD (URLs only, no files) ──
  const runBulkUpload = async () => {
    if (!batchParsed.length) { showToast("No songs to upload", "error"); return; }
    setBatchLoading(true); setBatchResults([]); setBatchProgress(0);
    const results = [];
    for (let i = 0; i < batchParsed.length; i++) {
      const item = batchParsed[i];
      try {
        await axios.post(`${API}/create-from-url`, {
          title: item.title.trim(),
          artist: item.artist.trim(),
          album: item.album.trim(),
          audioUrl: item.audioUrl.trim(),
          imageUrl: item.imageUrl.trim(),
        });
        results.push({ title: item.title, status: "ok" });
      } catch (err) {
        results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
      }
      setBatchProgress(Math.round(((i+1)/batchParsed.length)*100));
      setBatchResults([...results]);
    }
    setBatchLoading(false);
    const ok = results.filter(r => r.status === "ok").length;
    showToast(`Bulk: ${ok}/${batchParsed.length} uploaded`, ok === batchParsed.length ? "success" : "error");
    if (ok > 0) { _cache = null; fetchData(true); }
  };

  // ── MULTI FILE UPLOAD HELPERS ──
  const stripExt = (name) => name.replace(/\.[^/.]+$/, "");

  const handleMuAudioChange = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    setMuFiles(prev => [
      ...prev,
      ...picked.map(file => ({ id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`, file, title: stripExt(file.name) }))
    ]);
    if (muAudioRef.current) muAudioRef.current.value = "";
  };

  const handleMuImagesChange = (e) => {
    const picked = Array.from(e.target.files || []);
    setMuImages(prev => [...prev, ...picked]);
    if (muImageRef.current) muImageRef.current.value = "";
  };

  const findMatchingImage = (audioFile) => {
    const base = stripExt(audioFile.name).toLowerCase();
    return muImages.find(img => stripExt(img.name).toLowerCase() === base) || null;
  };

  const removeMuFile = (id) => setMuFiles(prev => prev.filter(f => f.id !== id));
  const updateMuTitle = (id, value) => setMuFiles(prev => prev.map(f => f.id === id ? { ...f, title: value } : f));
  const clearMuAll = () => {
    setMuFiles([]); setMuImages([]); setMuDefaultImage(null); setMuResults([]); setMuProgress(0);
    if (muAudioRef.current) muAudioRef.current.value = "";
    if (muImageRef.current) muImageRef.current.value = "";
    if (muDefaultImageRef.current) muDefaultImageRef.current.value = "";
  };

  // Uploads each selected audio file as its own song into the same album,
  // one at a time (backend only accepts one audio+image per request).
  const runMuUpload = async () => {
    const finalAlbum = muAlbum === "__new__" ? muNewAlbum.trim() : muAlbum;
    if (!muArtist.trim() || !finalAlbum) { showToast("Artist and Album are required", "error"); return; }
    if (!muFiles.length) { showToast("Pick at least one audio file", "error"); return; }
    const missingImage = muFiles.some(f => !findMatchingImage(f.file) && !muDefaultImage);
    if (missingImage) { showToast("Add a cover image (shared or matching filename)", "error"); return; }
    setMuLoading(true); setMuResults([]); setMuProgress(0);
    const results = [];
    for (let i = 0; i < muFiles.length; i++) {
      const item = muFiles[i];
      const img = findMatchingImage(item.file) || muDefaultImage;
      const fd = new FormData();
      fd.append("title", (item.title || stripExt(item.file.name)).trim());
      fd.append("artist", muArtist.trim());
      fd.append("album", finalAlbum);
      fd.append("audio", item.file);
      fd.append("image", img);
      try {
        await axios.post(`${API}/create`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        results.push({ title: item.title, status: "ok" });
      } catch (err) {
        results.push({ title: item.title, status: "fail", error: err.response?.data?.message || "Failed" });
      }
      setMuProgress(Math.round(((i + 1) / muFiles.length) * 100));
      setMuResults([...results]);
    }
    setMuLoading(false);
    const ok = results.filter(r => r.status === "ok").length;
    showToast(`${ok}/${muFiles.length} songs uploaded`, ok === muFiles.length ? "success" : "error");
    if (ok > 0) {
      _cache = null; fetchData(true);
      setMuFiles(prev => prev.filter((_, idx) => results[idx]?.status !== "ok"));
    }
  };

  const filtered = songs.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase()) ||
    s.album.toLowerCase().includes(search.toLowerCase())
  );
  const albumGroups = songs.reduce((acc,s) => { if (!acc[s.album]) acc[s.album] = []; acc[s.album].push(s); return acc; }, {});

  // ── LOGIN ──
  if (!authed) {
    return (
      <div style={{ fontFamily:"'Outfit',sans-serif", minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
        <div style={{ width:"100%", maxWidth:400, background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 32px", animation:"fadeUp 0.35s ease" }}>
          <div style={{ width:52, height:52, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
            <FaLock size={22} color={C.accent}/>
          </div>
          <h1 style={{ fontSize:24, fontWeight:700, color:C.text, marginBottom:6 }}>Admin Access</h1>
          <p style={{ fontSize:13, color:C.sub, marginBottom:28 }}>Enter your credentials to continue</p>
          {loginErr && <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:C.error, fontSize:13, padding:"10px 14px", borderRadius:10, marginBottom:20 }}>{loginErr}</div>}
          <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Username</label>
              <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
                <FaUser size={13} color={C.muted}/>
                <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type="text" placeholder="admin" value={loginUser} onChange={e => setLoginUser(e.target.value)} autoFocus/>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.6 }}>Password</label>
              <div style={{ display:"flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px" }}>
                <FaLock size={13} color={C.muted}/>
                <input style={{ flex:1, background:"none", border:"none", outline:"none", fontSize:14, color:C.text, fontFamily:"'Outfit',sans-serif" }} type={showPass?"text":"password"} placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}/>
                <button type="button" style={{ background:"none", border:"none", cursor:"pointer", display:"flex", padding:0 }} onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash size={13} color={C.muted}/> : <FaEye size={13} color={C.muted}/>}
                </button>
              </div>
            </div>
            <button type="submit" style={{ marginTop:8, padding:"13px", borderRadius:12, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Sign In →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, position:"relative" }}>

      {toast && (
        <div style={{ position:"fixed", top:70, right:20, padding:"12px 18px", borderRadius:10, color:"#0f0f0f", fontSize:13, fontWeight:700, zIndex:9999, display:"flex", alignItems:"center", gap:8, background:toast.type==="error"?C.error:C.success, animation:"slideIn 0.25s ease" }}>
          {toast.type==="error"?"✗":"✓"} {toast.msg}
        </div>
      )}

      {confirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:9998, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setConfirm(null)}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:28, maxWidth:360, width:"100%" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize:17, fontWeight:700, marginBottom:8, color:C.text }}>Confirm Delete</h3>
            <p style={{ fontSize:13, color:C.sub, marginBottom:24, lineHeight:1.6 }}>{confirm.msg}</p>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={{ padding:"9px 20px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }} onClick={() => setConfirm(null)}>Cancel</button>
              <button style={{ padding:"9px 20px", borderRadius:8, border:"none", background:C.error, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Outfit',sans-serif" }} onClick={confirm.action}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", minHeight:"100vh" }} className="al">
        {/* Sidebar */}
        <div style={{ width:200, background:C.surface, borderRight:`1px solid ${C.border}`, padding:"24px 14px", display:"flex", flexDirection:"column", gap:8, position:"sticky", top:0, height:"100vh", flexShrink:0 }} className="sb">
          <div style={{ fontSize:17, fontWeight:700, color:C.accent, padding:"0 8px", marginBottom:16 }} className="sl">⚡ Admin</div>
          <div style={{ display:"flex", gap:0, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:16, overflow:"hidden" }} className="ss">
            <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
              <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{songs.length}</span>
              <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Songs</span>
            </div>
            <div style={{ width:1, background:C.border }}/>
            <div style={{ flex:1, textAlign:"center", padding:"12px 8px" }}>
              <span style={{ display:"block", fontSize:18, fontWeight:700, color:C.accent }}>{albums.length}</span>
              <span style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:0.5 }}>Albums</span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1 }} className="sn">
            {[
              { id:"upload", icon:<FaUpload size={13}/>, label:editingId?"Edit":"Upload" },
              { id:"library", icon:<FaList size={13}/>, label:"Library" },
              { id:"batch", icon:<FaCloudUploadAlt size={14}/>, label:"Bulk" },
            ].map(t => (
              <button key={t.id}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500, background:view===t.id?C.accentDim:"none", color:view===t.id?C.accent:C.sub, border:view===t.id?`1px solid ${C.accentBorder}`:"none", fontFamily:"'Outfit',sans-serif", textAlign:"left" }}
                className="ni"
                onClick={() => setView(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <button style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:8, cursor:"pointer", color:C.sub, fontSize:13, background:"none", border:"none", fontFamily:"'Outfit',sans-serif" }} onClick={logout}>
            <FaSignOutAlt size={13}/> Logout
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"28px 24px", maxWidth:800, overflowY:"auto" }}>

          {/* ── UPLOAD ── */}
          {view==="upload" && (
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:24, animation:"fadeUp 0.25s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>{editingId?"✏️ Edit Song":"🎵 Upload Song"}</h2>
                {editingId && <button style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:"none", color:C.sub, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }} onClick={resetForm}>✕ Cancel</button>}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }} className="fg">
                {[{label:"Song Title *",ph:"e.g. Blinding Lights",val:title,set:setTitle},{label:"Artist *",ph:"e.g. The Weeknd",val:artist,set:setArtist}].map(({label,ph,val,set},i) => (
                  <div key={i} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>{label}</label>
                    <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder={ph} value={val} onChange={e => set(e.target.value)}/>
                  </div>
                ))}
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album *</label>
                  <select style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={album} onChange={e => setAlbum(e.target.value)}>
                    <option value="">Select album</option>
                    {albums.map((al,i) => <option key={i} value={al}>{al}</option>)}
                    <option value="__new__">+ New Album</option>
                  </select>
                </div>
                {album==="__new__" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>New Album *</label>
                    <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="Album name" value={newAlbum} onChange={e => setNewAlbum(e.target.value)}/>
                  </div>
                )}
              </div>
              <div style={{ display:"flex", gap:16, marginBottom:24 }} className="ur">
                <label style={{ flex:1, border:`1.5px dashed ${audio?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:audio?C.accentDim:C.bg }}>
                  <FaMusic size={20} color={audio?C.accent:C.muted}/>
                  <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{audio?audio.name:"Upload Audio File"}</span>
                  <span style={{ fontSize:11, color:C.muted }}>{audio?`${(audio.size/1024/1024).toFixed(1)} MB`:"MP3 · WAV · OGG"}</span>
                  <input ref={audioRef} type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} style={{ display:"none" }}/>
                </label>
                <label style={{ flex:1, border:`1.5px dashed ${image?C.accent:C.border}`, borderRadius:12, padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", background:image?C.accentDim:C.bg }}>
                  {image ? <img src={URL.createObjectURL(image)} alt="" style={{ width:48, height:48, borderRadius:8, objectFit:"cover" }}/> : <FaUpload size={20} color={C.muted}/>}
                  <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{image?image.name:"Upload Cover Image"}</span>
                  <span style={{ fontSize:11, color:C.muted }}>{image?`${(image.size/1024/1024).toFixed(1)} MB`:"JPG · PNG · WEBP"}</span>
                  <input ref={imageRef} type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ display:"none" }}/>
                </label>
              </div>
              <button style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:loading?0.5:1 }} onClick={submit} disabled={loading}>
                {loading ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>{editingId?"Updating...":"Uploading..."}</> : editingId?"✓ Update Song":"↑ Upload Song"}
              </button>
            </div>
          )}

          {/* ── LIBRARY ── */}
          {view==="library" && (
            <div style={{ animation:"fadeUp 0.25s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
                <h2 style={{ fontSize:18, fontWeight:700, color:C.text }}>Library</h2>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 14px" }}>
                  <FaSearch size={12} color={C.muted}/>
                  <input style={{ border:"none", outline:"none", fontSize:13, color:C.text, background:"none", fontFamily:"'Outfit',sans-serif", width:160 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}/>
                  {search && <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex" }} onClick={() => setSearch("")}><FaTimes size={11}/></button>}
                </div>
              </div>
              {fetchLoading ? (
                <div>
                  {[...Array(3)].map((_,i) => <SkeletonAlbum key={i} C={C}/>)}
                  <div style={{ marginTop:16 }}>{[...Array(6)].map((_,i) => <SkeletonRow key={i} C={C}/>)}</div>
                </div>
              ) : (
                <>
                  {!search && Object.entries(albumGroups).length > 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                      {Object.entries(albumGroups).map(([name,list]) => (
                        <div key={name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                            <img src={list[0]?.imageUrl} alt="" style={{ width:42, height:42, borderRadius:8, objectFit:"cover" }} loading="lazy"/>
                            <div>
                              <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{name}</div>
                              <div style={{ fontSize:11, color:C.sub }}>{list.length} songs</div>
                            </div>
                          </div>
                          <button style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:8, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", color:C.error, cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif" }}
                            onClick={() => setConfirm({ msg:`Delete album "${name}" and all ${list.length} songs?`, action:() => deleteAlbum(name) })}>
                            <FaTrash size={11}/> Album
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, padding:"0 4px 10px" }}>
                      {search ? `${filtered.length} result${filtered.length!==1?"s":""}` : `All Songs (${songs.length})`}
                    </div>
                    {filtered.map((s,i) => (
                      <div key={s._id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, gap:12 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0, flex:1 }}>
                          <span style={{ fontSize:11, color:C.muted, width:20, textAlign:"center", flexShrink:0, fontFamily:"monospace" }}>{i+1}</span>
                          <img src={s.imageUrl} alt="" style={{ width:40, height:40, borderRadius:6, objectFit:"cover", flexShrink:0 }} loading="lazy"/>
                          <div style={{ minWidth:0 }}>
                            <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title}</div>
                            <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.artist} · {s.album}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                          <button style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${C.border}`, background:"none", cursor:"pointer", color:C.sub, display:"flex" }} onClick={() => editSong(s)}><FaEdit size={12}/></button>
                          <button style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(248,113,113,0.2)", background:"rgba(248,113,113,0.06)", cursor:"pointer", color:C.error, display:"flex" }}
                            onClick={() => setConfirm({ msg:`Delete "${s.title}"?`, action:() => deleteSong(s._id) })}><FaTrash size={12}/></button>
                        </div>
                      </div>
                    ))}
                    {filtered.length===0 && <p style={{ color:C.muted, fontSize:14, textAlign:"center", padding:32 }}>No songs found.</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── BULK UPLOAD ── */}
          {view==="batch" && (
            <div style={{ animation:"fadeUp 0.25s ease" }}>
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:28, marginBottom:20 }}>
                <h2 style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:6 }}>📦 Bulk Upload</h2>
                <p style={{ fontSize:13, color:C.sub, marginBottom:16, lineHeight:1.7 }}>
                  Add a whole folder of songs into one album in one go — titles are filled in from the file names automatically.
                </p>

                {/* Mode toggle */}
                <div style={{ display:"flex", gap:0, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:22, overflow:"hidden", width:"fit-content" }}>
                  {[{id:"files",label:"🎵 From Files"},{id:"json",label:"📋 From JSON"}].map(m => (
                    <button key={m.id}
                      style={{ padding:"9px 16px", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'Outfit',sans-serif", background:muMode===m.id?C.accentDim:"none", color:muMode===m.id?C.accent:C.sub }}
                      onClick={() => setMuMode(m.id)}>
                      {m.label}
                    </button>
                  ))}
                </div>

                {muMode === "files" && (
                  <div>
                    <p style={{ fontSize:12, color:C.muted, marginBottom:16, lineHeight:1.7 }}>
                      1. Select all your audio files at once (their title = file name, minus the extension) · 2. Pick or create the album · 3. Add a cover — a shared image covers every song that doesn't have its own; an image named the <strong>same as a song file</strong> is matched to it automatically.
                    </p>

                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }} className="fg">
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Artist *</label>
                        <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="e.g. Various Artists" value={muArtist} onChange={e => setMuArtist(e.target.value)}/>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>Album *</label>
                        <select style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} value={muAlbum} onChange={e => setMuAlbum(e.target.value)}>
                          <option value="">Select album</option>
                          {albums.map((al,i) => <option key={i} value={al}>{al}</option>)}
                          <option value="__new__">+ New Album</option>
                        </select>
                      </div>
                      {muAlbum === "__new__" && (
                        <div style={{ display:"flex", flexDirection:"column", gap:6, gridColumn:"1 / -1" }}>
                          <label style={{ fontSize:11, fontWeight:600, color:C.sub, textTransform:"uppercase", letterSpacing:0.5 }}>New Album *</label>
                          <input style={{ padding:"11px 14px", borderRadius:10, border:`1px solid ${C.border}`, fontSize:14, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.card }} placeholder="Album name" value={muNewAlbum} onChange={e => setMuNewAlbum(e.target.value)}/>
                        </div>
                      )}
                    </div>

                    <div style={{ display:"flex", gap:16, marginBottom:16, flexWrap:"wrap" }}>
                      <label style={{ flex:1, minWidth:220, border:`1.5px dashed ${muFiles.length?C.accent:C.border}`, borderRadius:12, padding:"18px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer", background:muFiles.length?C.accentDim:C.bg }}>
                        <FaMusic size={18} color={muFiles.length?C.accent:C.muted}/>
                        <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{muFiles.length ? `${muFiles.length} audio file${muFiles.length!==1?"s":""} selected` : "Select Audio Files"}</span>
                        <span style={{ fontSize:11, color:C.muted }}>Ctrl/Cmd-click to pick many · MP3, WAV, OGG</span>
                        <input ref={muAudioRef} type="file" accept="audio/*" multiple onChange={handleMuAudioChange} style={{ display:"none" }}/>
                      </label>
                      <label style={{ flex:1, minWidth:220, border:`1.5px dashed ${muDefaultImage?C.accent:C.border}`, borderRadius:12, padding:"18px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer", background:muDefaultImage?C.accentDim:C.bg }}>
                        {muDefaultImage ? <img src={URL.createObjectURL(muDefaultImage)} alt="" style={{ width:40, height:40, borderRadius:8, objectFit:"cover" }}/> : <FaUpload size={18} color={C.muted}/>}
                        <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{muDefaultImage ? muDefaultImage.name : "Shared Cover Image"}</span>
                        <span style={{ fontSize:11, color:C.muted }}>Used for any song without its own cover</span>
                        <input ref={muDefaultImageRef} type="file" accept="image/*" onChange={e => setMuDefaultImage(e.target.files[0] || null)} style={{ display:"none" }}/>
                      </label>
                      <label style={{ flex:1, minWidth:220, border:`1.5px dashed ${muImages.length?C.accent:C.border}`, borderRadius:12, padding:"18px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer", background:muImages.length?C.accentDim:C.bg }}>
                        <FaCloudUploadAlt size={18} color={muImages.length?C.accent:C.muted}/>
                        <span style={{ fontSize:12, fontWeight:600, color:C.text, textAlign:"center" }}>{muImages.length ? `${muImages.length} cover(s) added` : "Per-Song Covers (optional)"}</span>
                        <span style={{ fontSize:11, color:C.muted }}>Name each the same as its matching song file</span>
                        <input ref={muImageRef} type="file" accept="image/*" multiple onChange={handleMuImagesChange} style={{ display:"none" }}/>
                      </label>
                    </div>

                    {muFiles.length > 0 && (
                      <div style={{ border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:16 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 16px", background:C.card, fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>
                          <span>{muFiles.length} song{muFiles.length!==1?"s":""} ready — edit any title below</span>
                          <button style={{ background:"none", border:"none", color:C.error, cursor:"pointer", fontSize:11, fontWeight:600, textTransform:"none", letterSpacing:0 }} onClick={clearMuAll}>Clear all</button>
                        </div>
                        <div style={{ maxHeight:360, overflowY:"auto" }}>
                          {muFiles.map((item) => {
                            const matched = findMatchingImage(item.file);
                            const coverSrc = matched || muDefaultImage;
                            return (
                              <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", borderBottom:`1px solid ${C.border}` }}>
                                {coverSrc
                                  ? <img src={URL.createObjectURL(coverSrc)} alt="" style={{ width:36, height:36, borderRadius:6, objectFit:"cover", flexShrink:0 }}/>
                                  : <div title="No cover image yet" style={{ width:36, height:36, borderRadius:6, flexShrink:0, background:C.card, border:`1px dashed ${C.error}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚠</div>
                                }
                                <input style={{ flex:1, padding:"8px 10px", borderRadius:8, border:`1px solid ${C.border}`, fontSize:13, fontFamily:"'Outfit',sans-serif", color:C.text, background:C.bg }} value={item.title} onChange={e => updateMuTitle(item.id, e.target.value)}/>
                                <span style={{ fontSize:10, color:C.muted, flexShrink:0, maxWidth:120, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.file.name}</span>
                                <button style={{ background:"none", border:"none", cursor:"pointer", color:C.muted, display:"flex", flexShrink:0 }} onClick={() => removeMuFile(item.id)}><FaTimes size={12}/></button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {muLoading && (
                      <div style={{ marginBottom:16 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:6 }}>
                          <span>Uploading {muResults.length + 1} of {muFiles.length}...</span>
                          <span>{muProgress}%</span>
                        </div>
                        <div style={{ height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${muProgress}%`, background:C.accent, borderRadius:4, transition:"width 0.3s ease" }}/>
                        </div>
                      </div>
                    )}

                    <button
                      style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:(muLoading || !muFiles.length) ? 0.5 : 1 }}
                      onClick={runMuUpload}
                      disabled={muLoading || !muFiles.length}>
                      {muLoading
                        ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>Uploading...</>
                        : `↑ Upload All (${muFiles.length} songs)`
                      }
                    </button>

                    {muResults.length > 0 && (
                      <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
                        <div style={{ padding:"10px 16px", background:C.card, fontSize:12, fontWeight:700, color:C.sub, borderBottom:`1px solid ${C.border}` }}>
                          {muResults.filter(r => r.status==="ok").length}/{muResults.length} uploaded
                        </div>
                        {muResults.map((r,i) => (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.text, borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}` }}>
                            <span style={{ color:r.status==="ok"?C.accent:C.error }}>{r.status==="ok"?"✓":"✗"}</span>
                            <span style={{ flex:1 }}>{r.title}</span>
                            {r.error && <span style={{ fontSize:11, color:C.error }}>{r.error}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {muMode === "json" && (
                <>
                <h3 style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:6 }}>Bulk Upload via JSON</h3>
                <p style={{ fontSize:13, color:C.sub, marginBottom:20, lineHeight:1.7 }}>
                  Upload songs to <strong style={{ color:C.accent }}>Cloudinary</strong> first to get URLs, then paste JSON here. No file picking needed.
                </p>

                {/* JSON Format */}
                <div style={{ background:C.bg, border:`1px solid ${C.accentBorder}`, borderRadius:12, padding:16, marginBottom:20 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:0.8, marginBottom:10 }}>📋 Required JSON Format</div>
                  <pre style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.sub, background:C.card, padding:14, borderRadius:8, overflowX:"auto", lineHeight:1.9 }}>{`[
  {
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "album": "After Hours",
    "audioUrl": "https://res.cloudinary.com/xxx/songs/audio/song.mp3",
    "imageUrl": "https://res.cloudinary.com/xxx/songs/images/cover.jpg"
  },
  {
    "title": "Levitating",
    "artist": "Dua Lipa",
    "album": "Future Nostalgia",
    "audioUrl": "https://res.cloudinary.com/xxx/songs/audio/levi.mp3",
    "imageUrl": "https://res.cloudinary.com/xxx/songs/images/fn.jpg"
  }
]`}</pre>
                </div>

                {/* Upload .json file */}
                <label style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:8, border:`1px dashed ${C.accentBorder}`, color:C.accent, cursor:"pointer", fontSize:12, fontWeight:600, marginBottom:12, fontFamily:"'Outfit',sans-serif" }}>
                  <FaUpload size={11}/> Upload .json file
                  <input type="file" accept=".json" onChange={e => {
                    const f = e.target.files[0];
                    if (!f) return;
                    const r = new FileReader();
                    r.onload = ev => { setBatchJson(ev.target.result); parseJson(ev.target.result); };
                    r.readAsText(f);
                  }} style={{ display:"none" }}/>
                </label>

                <div style={{ fontSize:11, color:C.muted, marginBottom:8 }}>— or paste JSON below —</div>

                {/* Textarea */}
                <textarea
                  style={{ width:"100%", padding:14, borderRadius:10, border:`1px solid ${batchError?C.error:C.border}`, fontSize:11, fontFamily:"'JetBrains Mono',monospace", color:C.text, resize:"vertical", lineHeight:1.7, background:C.bg, display:"block", marginBottom:8 }}
                  rows={10}
                  placeholder={`[\n  {\n    "title": "...",\n    "artist": "...",\n    "album": "...",\n    "audioUrl": "https://...",\n    "imageUrl": "https://..."\n  }\n]`}
                  value={batchJson}
                  onChange={e => { setBatchJson(e.target.value); parseJson(e.target.value); }}
                />

                {/* Error / success feedback */}
                {batchError && (
                  <div style={{ fontSize:12, color:C.error, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", padding:"10px 14px", borderRadius:8, marginBottom:16 }}>
                    ⚠ {batchError}
                  </div>
                )}
                {batchParsed.length > 0 && !batchError && (
                  <div style={{ fontSize:12, color:C.success, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", padding:"10px 14px", borderRadius:8, marginBottom:16 }}>
                    ✓ {batchParsed.length} song(s) ready to upload
                  </div>
                )}

                {/* Preview table */}
                {batchParsed.length > 0 && !batchError && (
                  <div style={{ border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:20 }}>
                    <div style={{ padding:"10px 16px", background:C.card, fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>
                      Preview — {batchParsed.length} songs
                    </div>
                    {batchParsed.map((item,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", borderBottom:`1px solid ${C.border}` }}>
                        <img src={item.imageUrl} alt="" style={{ width:36, height:36, borderRadius:6, objectFit:"cover", flexShrink:0 }}
                          onError={e => { e.target.style.display="none"; }}/>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.title}</div>
                          <div style={{ fontSize:11, color:C.sub }}>{item.artist} · {item.album}</div>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:2, flexShrink:0, alignItems:"flex-end" }}>
                          <span style={{ fontSize:10, color:C.muted }}>🎵 {item.audioUrl.split("/").pop()}</span>
                          <span style={{ fontSize:10, color:C.muted }}>🖼 {item.imageUrl.split("/").pop()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress */}
                {batchLoading && (
                  <div style={{ marginBottom:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:6 }}>
                      <span>Uploading {batchResults.length + 1} of {batchParsed.length}...</span>
                      <span>{batchProgress}%</span>
                    </div>
                    <div style={{ height:6, background:C.border, borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${batchProgress}%`, background:C.accent, borderRadius:4, transition:"width 0.3s ease" }}/>
                    </div>
                  </div>
                )}

                {/* Upload button */}
                <button
                  style={{ width:"100%", padding:14, borderRadius:10, border:"none", background:C.accent, color:"#0f0f0f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Outfit',sans-serif", opacity:(batchLoading || !batchParsed.length || !!batchError) ? 0.5 : 1 }}
                  onClick={runBulkUpload}
                  disabled={batchLoading || !batchParsed.length || !!batchError}>
                  {batchLoading
                    ? <><span style={{ width:14, height:14, border:"2px solid rgba(0,0,0,0.2)", borderTopColor:"#0f0f0f", borderRadius:"50%", animation:"spin2 0.8s linear infinite", display:"inline-block" }}/>Uploading...</>
                    : `↑ Upload All (${batchParsed.length} songs)`
                  }
                </button>

                {/* Results */}
                {batchResults.length > 0 && (
                  <div style={{ marginTop:20, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
                    <div style={{ padding:"10px 16px", background:C.card, fontSize:12, fontWeight:700, color:C.sub, borderBottom:`1px solid ${C.border}` }}>
                      {batchResults.filter(r => r.status==="ok").length}/{batchResults.length} uploaded
                    </div>
                    {batchResults.map((r,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, color:C.text, borderLeft:`3px solid ${r.status==="ok"?C.accent:C.error}` }}>
                        <span style={{ color:r.status==="ok"?C.accent:C.error }}>{r.status==="ok"?"✓":"✗"}</span>
                        <span style={{ flex:1 }}>{r.title}</span>
                        {r.error && <span style={{ fontSize:11, color:C.error }}>{r.error}</span>}
                      </div>
                    ))}
                  </div>
                )}
                </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}