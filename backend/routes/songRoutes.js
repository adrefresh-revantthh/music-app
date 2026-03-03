// // import express from "express";
// // import {
// //   createSong,
// //   getSongs,
// //   updateSong,
// //   deleteSong,
// //   deleteAlbum,
// // } from "../controllers/songController.js";

// // const router = express.Router();

// // router.post("/create", createSong);
// // router.get("/songs", getSongs);
// // router.put("/songs/:id", updateSong);
// // router.delete("/songs/:id", deleteSong);
// // router.delete("/albums/:albumName", deleteAlbum);

// // export default router;
// // import express from "express";
// // import {
// //   createSong,
// //   getSongs,
// //   updateSong,
// //   deleteSong,
// //   deleteAlbum,
// // } from "../controllers/songController.js";

// // import { upload } from "../config/multer.js"; // ✅ correct multer

// // const router = express.Router();

// // // CREATE SONG
// // router.post(
// //   "/create",
// //   upload.fields([
// //     { name: "audio", maxCount: 1 },
// //     { name: "image", maxCount: 1 },
// //   ]),
// //   createSong
// // );

// // // GET SONGS
// // router.get("/", getSongs);

// // // UPDATE SONG
// // router.put(
// //   "/:id",
// //   upload.fields([
// //     { name: "audio", maxCount: 1 },
// //     { name: "image", maxCount: 1 },
// //   ]),
// //   updateSong
// // );

// // // DELETE SONG
// // router.delete("/:id", deleteSong);

// // // DELETE ALBUM
// // router.delete("/album/:albumName", deleteAlbum);

// // export default router;
// import express from "express";
// import { generateScript } from "../controllers/songController.js";
// import {
//   createSong,
//   getSongs,
//   updateSong,
//   deleteSong,
//   deleteAlbum,
// } from "../controllers/songController.js";

// import { upload } from "../config/multer.js"; // ✅ correct multer

// const router = express.Router();

// // CREATE SONG
// router.post(
//   "/create",
//   upload.fields([
//     { name: "audio", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//   ]),
//   createSong
// );

// // GET SONGS
// router.get("/", getSongs);

// // UPDATE SONG
// router.put(
//   "/:id",
//   upload.fields([
//     { name: "audio", maxCount: 1 },
//     { name: "image", maxCount: 1 },
//   ]),
//   updateSong
// );

// // DELETE SONG
// router.delete("/:id", deleteSong);
// router.post("/script", generateScript);
// // DELETE ALBUM
// router.delete("/album/:albumName", deleteAlbum);


// export default router;
import express from "express";
import { generateScript } from "../controllers/songController.js";
import {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
  deleteAlbum,
  createSongFromUrl,  // ✅ ADD THIS
} from "../controllers/songController.js";

import { upload } from "../config/multer.js";

const router = express.Router();

// CREATE SONG (file upload)
router.post(
  "/create",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createSong
);

// CREATE SONG FROM URL (JSON bulk) ✅ ADD THIS
router.post("/create-from-url", createSongFromUrl);

// GET SONGS
router.get("/", getSongs);

// UPDATE SONG
router.put(
  "/:id",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  updateSong
);

// DELETE SONG
router.delete("/:id", deleteSong);

// AI SCRIPT
router.post("/script", generateScript);

// DELETE ALBUM
router.delete("/albums/:albumName", deleteAlbum);

export default router;