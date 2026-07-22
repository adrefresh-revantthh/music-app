// import axios from "axios"
// import Song from "../models/Song.js";
// import cloudinary from "../config/cloudinary.js";
// import fs from "fs";

// export const createSong = async (req, res) => {
//   try {
//     const { title, artist, album } = req.body;
//     if (!title || !artist || !album) return res.status(400).json({ message: "All fields are required" });
//     const audioFile = req.files?.audio?.[0];
//     const imageFile = req.files?.image?.[0];
//     if (!audioFile || !imageFile) return res.status(400).json({ message: "Audio and image required" });
//     const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video", folder: "songs/audio" });
//     const imageUpload = await cloudinary.uploader.upload(imageFile.path, { folder: "songs/images" });
//     fs.unlinkSync(audioFile.path);
//     fs.unlinkSync(imageFile.path);
//     const newSong = await Song.create({ title, artist, album, audioUrl: audioUpload.secure_url, imageUrl: imageUpload.secure_url });
//     res.status(201).json(newSong);
//   } catch (error) {
//     console.log("UPLOAD ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getSongs = async (req, res) => {
//   try {
//     const songs = await Song.find().sort({ createdAt: -1 });
//     res.status(200).json(songs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const updateSong = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const song = await Song.findById(id);
//     if (!song) return res.status(404).json({ message: "Song not found" });
//     const { title, artist, album } = req.body;
//     if (title) song.title = title;
//     if (artist) song.artist = artist;
//     if (album) song.album = album;
//     if (req.files?.audio?.[0]) {
//       const audioUpload = await cloudinary.uploader.upload(req.files.audio[0].path, { resource_type: "video", folder: "songs/audio" });
//       fs.unlinkSync(req.files.audio[0].path);
//       song.audioUrl = audioUpload.secure_url;
//     }
//     if (req.files?.image?.[0]) {
//       const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "songs/images" });
//       fs.unlinkSync(req.files.image[0].path);
//       song.imageUrl = imageUpload.secure_url;
//     }
//     await song.save();
//     res.status(200).json(song);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteSong = async (req, res) => {
//   try {
//     await Song.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Song deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteAlbum = async (req, res) => {
//   try {
//     const albumName = decodeURIComponent(req.params.albumName);
//     await Song.deleteMany({ album: albumName });
//     res.status(200).json({ message: `Album "${albumName}" deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Route: POST /api/bulk-upload  (use upload.any() in router)
// // FormData: metadata = JSON string of [{title,artist,album},...], audio_0, image_0, audio_1, image_1, ...
// export const bulkUploadSongs = async (req, res) => {
//   try {
//     let metadata;
//     try { metadata = JSON.parse(req.body.metadata); }
//     catch { return res.status(400).json({ error: "Invalid metadata JSON" }); }
//     if (!Array.isArray(metadata) || metadata.length === 0)
//       return res.status(400).json({ error: "metadata must be a non-empty array" });

//     const results = [];
//     for (let i = 0; i < metadata.length; i++) {
//       const { title, artist, album } = metadata[i] || {};
//       if (!title || !artist || !album) {
//         results.push({ index: i, title: title || `Item ${i}`, status: "fail", error: "Missing title/artist/album" });
//         continue;
//       }
//       let audioFile, imageFile;
//       if (Array.isArray(req.files)) {
//         audioFile = req.files.find(f => f.fieldname === `audio_${i}`);
//         imageFile = req.files.find(f => f.fieldname === `image_${i}`);
//       } else {
//         audioFile = req.files?.[`audio_${i}`]?.[0];
//         imageFile = req.files?.[`image_${i}`]?.[0];
//       }
//       if (!audioFile || !imageFile) {
//         results.push({ index: i, title, status: "fail", error: `Missing audio_${i} or image_${i}` });
//         continue;
//       }
//       try {
//         const [audioUpload, imageUpload] = await Promise.all([
//           cloudinary.uploader.upload(audioFile.path, { resource_type: "video", folder: "songs/audio" }),
//           cloudinary.uploader.upload(imageFile.path, { folder: "songs/images" }),
//         ]);
//         try { fs.unlinkSync(audioFile.path); } catch {}
//         try { fs.unlinkSync(imageFile.path); } catch {}
//         const song = await Song.create({ title, artist, album, audioUrl: audioUpload.secure_url, imageUrl: imageUpload.secure_url });
//         results.push({ index: i, title, status: "ok", songId: song._id });
//       } catch (err) {
//         try { fs.unlinkSync(audioFile?.path); } catch {}
//         try { fs.unlinkSync(imageFile?.path); } catch {}
//         results.push({ index: i, title, status: "fail", error: err.message });
//       }
//     }
//     const ok = results.filter(r => r.status === "ok").length;
//     res.status(200).json({ message: `${ok}/${metadata.length} uploaded`, results });
//   } catch (error) {
//     console.error("BULK UPLOAD ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export const generateScript = async (req, res) => {
//   try {
//     const { topic } = req.body;
//     if (!topic) return res.status(400).json({ error: "Topic is required" });
//     const prompt = `You are a friendly Indian teacher.\nExplain the topic: ${topic}\nRules:\n- Speak like a teacher.\n- Use storytelling.\n- Give real-life examples.\n- Emotional and conversational tone.\n- No asterisks or emojis.\n- Narrative style.\nEnd with quick revision points. Write in proper Indian English.`;
//     const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
//       { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: prompt }] },
//       { headers: { Authorization: `Bearer ${process.env.OPENROUTER_KEY}`, "Content-Type": "application/json" } }
//     );
//     res.json({ script: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error("AI error:", error.response?.data || error.message);
//     res.status(500).json({ error: "AI generation failed" });
//   }
// };
import axios from "axios"
import Song from "../models/Song.js";
import Album from "../models/Album.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/* ================= CREATE SONG (FILE UPLOAD) ================= */
export const createSong = async (req, res) => {
  try {
    const { title, artist, album } = req.body;
    if (!title || !artist || !album) return res.status(400).json({ message: "All fields are required" });
    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.image?.[0];
    if (!audioFile || !imageFile) return res.status(400).json({ message: "Audio and image required" });
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video", folder: "songs/audio" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { folder: "songs/images" });
    fs.unlinkSync(audioFile.path);
    fs.unlinkSync(imageFile.path);

    let finalImageUrl = imageUpload.secure_url;

    // Keep the Album collection (dynamic albums) in sync: if the album
    // already has a cover set, every song in it should visually match it.
    // If the album doesn't exist yet, this song's cover becomes the album's
    // default cover automatically.
    try {
      let albumDoc = await Album.findOne({ name: album.trim() });
      if (albumDoc?.coverImage) {
        finalImageUrl = albumDoc.coverImage;
      } else if (!albumDoc) {
        albumDoc = await Album.create({ name: album.trim(), coverImage: imageUpload.secure_url });
      }
    } catch {
      // non-fatal: album bookkeeping should never block a song upload
    }

    const newSong = await Song.create({ title, artist, album, audioUrl: audioUpload.secure_url, imageUrl: finalImageUrl });
    res.status(201).json(newSong);
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= CREATE SONG FROM URL (JSON BULK) ================= */
// Route: POST /api/create-from-url
// Body: { title, artist, album, audioUrl, imageUrl }
// Just saves URLs directly to DB — no Cloudinary upload needed
export const createSongFromUrl = async (req, res) => {
  try {
    const { title, artist, album, audioUrl, imageUrl } = req.body;
    if (!title || !artist || !album) return res.status(400).json({ message: "title, artist, album are required" });
    if (!audioUrl || !imageUrl) return res.status(400).json({ message: "audioUrl and imageUrl are required" });

    // Optional: validate URLs
    try { new URL(audioUrl); new URL(imageUrl); }
    catch { return res.status(400).json({ message: "audioUrl and imageUrl must be valid URLs" }); }

    const newSong = await Song.create({ title, artist, album, audioUrl, imageUrl });
    res.status(201).json(newSong);
  } catch (error) {
    console.log("CREATE FROM URL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET SONGS ================= */
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE SONG (also used to MOVE a song to another album) ================= */
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    const { title, artist, album, isFeatured } = req.body;
    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (isFeatured !== undefined) song.isFeatured = isFeatured === true || isFeatured === "true";

    const movingAlbum = album && album.trim() && album.trim() !== song.album;
    if (album) song.album = album.trim();

    if (req.files?.audio?.[0]) {
      const audioUpload = await cloudinary.uploader.upload(req.files.audio[0].path, { resource_type: "video", folder: "songs/audio" });
      fs.unlinkSync(req.files.audio[0].path);
      song.audioUrl = audioUpload.secure_url;
    }

    let explicitImage = false;
    if (req.files?.image?.[0]) {
      explicitImage = true;
      const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path, { folder: "songs/images" });
      fs.unlinkSync(req.files.image[0].path);
      song.imageUrl = imageUpload.secure_url;
    }

    // Moving a song into a different album: unless the admin explicitly
    // uploaded a new cover in this same request, adopt the target album's
    // cover art (creating the Album entry if it's brand new) so the song
    // matches the rest of its new album.
    if (movingAlbum && !explicitImage) {
      try {
        let albumDoc = await Album.findOne({ name: song.album });
        if (albumDoc?.coverImage) {
          song.imageUrl = albumDoc.coverImage;
        } else if (!albumDoc) {
          await Album.create({ name: song.album, coverImage: song.imageUrl });
        }
      } catch {
        // non-fatal
      }
    }

    await song.save();
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE SONG ================= */
export const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE ALBUM ================= */
export const deleteAlbum = async (req, res) => {
  try {
    const albumName = decodeURIComponent(req.params.albumName);
    await Song.deleteMany({ album: albumName });
    try { await Album.deleteOne({ name: albumName }); } catch {}
    res.status(200).json({ message: `Album "${albumName}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= AI TUTOR ================= */
export const generateScript = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });
    const prompt = `You are a friendly Indian teacher.\nExplain the topic: ${topic}\nRules:\n- Speak like a teacher.\n- Use storytelling.\n- Give real-life examples.\n- Emotional and conversational tone.\n- No asterisks or emojis.\n- Narrative style.\nEnd with quick revision points. Write in proper Indian English.`;
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
      { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: prompt }] },
      { headers: { Authorization: `Bearer ${process.env.OPENROUTER_KEY}`, "Content-Type": "application/json" } }
    );
    res.json({ script: response.data.choices[0].message.content });
  } catch (error) {
    console.error("AI error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
};