import express from "express";
import { getAlbums, createAlbum, updateAlbum } from "../controllers/albumController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// GET /api/albums - list all albums (with cover + song count)
router.get("/", getAlbums);

// POST /api/albums - create a new (optionally empty) album, optional cover image
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createAlbum);

// PUT /api/albums/:name - rename and/or replace cover (cascades to songs)
router.put("/:name", upload.fields([{ name: "image", maxCount: 1 }]), updateAlbum);

// NOTE: deleting an album is still handled by the existing
// DELETE /api/albums/:albumName route in songRoutes.js (unchanged),
// which now also cleans up the Album document.

export default router;
