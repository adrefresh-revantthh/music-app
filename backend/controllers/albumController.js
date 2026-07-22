import fs from "fs";
import Album from "../models/Album.js";
import Song from "../models/Song.js";
import cloudinary from "../config/cloudinary.js";

/* ================= GET ALBUMS =================
   Returns every album with a cover + song count.
   Any album name that only exists as a Song.album string (legacy data,
   or albums created before this feature existed) gets an Album doc
   backfilled automatically so it shows up with a real id + cover slot. */
export const getAlbums = async (req, res) => {
  try {
    const songs = await Song.find();
    const grouped = {};
    songs.forEach((s) => {
      if (!grouped[s.album]) grouped[s.album] = { count: 0, sampleImage: s.imageUrl };
      grouped[s.album].count++;
    });

    const albumDocs = await Album.find();
    const albumMap = {};
    albumDocs.forEach((a) => { albumMap[a.name] = a; });

    const missing = Object.keys(grouped).filter((name) => !albumMap[name]);
    for (const name of missing) {
      try {
        const created = await Album.create({ name, coverImage: grouped[name].sampleImage || "" });
        albumMap[name] = created;
      } catch {
        // ignore race/duplicate errors, re-fetch below just in case
      }
    }

    const allNames = new Set([...Object.keys(grouped), ...Object.keys(albumMap)]);
    const result = [...allNames]
      .map((name) => ({
        _id: albumMap[name]?._id,
        name,
        coverImage: albumMap[name]?.coverImage || grouped[name]?.sampleImage || "",
        songCount: grouped[name]?.count || 0,
        createdAt: albumMap[name]?.createdAt || null,
      }))
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= CREATE ALBUM =================
   Lets admin create a brand-new, possibly-empty album with its own cover
   so songs can be moved into it afterwards. */
export const createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Album name is required" });
    const trimmed = name.trim();

    const exists = await Album.findOne({ name: trimmed });
    if (exists) return res.status(400).json({ message: "An album with that name already exists" });

    let coverImage = "";
    const imageFile = req.files?.image?.[0];
    if (imageFile) {
      const upload = await cloudinary.uploader.upload(imageFile.path, { folder: "songs/images" });
      try { fs.unlinkSync(imageFile.path); } catch {}
      coverImage = upload.secure_url;
    }

    const album = await Album.create({ name: trimmed, coverImage });
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE ALBUM =================
   Rename and/or replace the cover image. When the cover changes, it is
   cascaded to every song currently in that album so the whole album looks
   consistent (Spotify-style). Renaming cascades the new name to its songs. */
export const updateAlbum = async (req, res) => {
  try {
    const currentName = decodeURIComponent(req.params.name);
    let album = await Album.findOne({ name: currentName });
    if (!album) album = await Album.create({ name: currentName, coverImage: "" });

    const { newName } = req.body;
    const imageFile = req.files?.image?.[0];

    if (imageFile) {
      const upload = await cloudinary.uploader.upload(imageFile.path, { folder: "songs/images" });
      try { fs.unlinkSync(imageFile.path); } catch {}
      album.coverImage = upload.secure_url;
      await Song.updateMany({ album: album.name }, { imageUrl: upload.secure_url });
    }

    if (newName && newName.trim() && newName.trim() !== album.name) {
      const target = newName.trim();
      const clash = await Album.findOne({ name: target });
      if (clash) return res.status(400).json({ message: "An album with that name already exists" });
      await Song.updateMany({ album: album.name }, { album: target });
      album.name = target;
    }

    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
