import express from "express";
import upload from '../middleware/uploadFile.js'
import { getUniversity, getUniversityById, deleteAllUniversity, createUniveristy, deleteUniversityById, updateUniversity } from '../controllers/univeristyController.js'
const router = express.Router();

router.get('/', getUniversity);
router.put('/:id',upload.fields([{ name: "images", maxCount: 10 }]), updateUniversity);
router.get('/:id', getUniversityById);
router.post('/', upload.fields([{ name: "images", maxCount: 10 }]), createUniveristy);
router.delete("/all", deleteAllUniversity);
router.delete("/:id", deleteUniversityById);

export default router;