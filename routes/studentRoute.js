import express from "express";
const router = express.Router();
import upload from '../middleware/uploadFile.js';
import { GetAllStudents, GetStudentById, createStudent, updateStudent, deleteStudentById } from "../controllers/studentController.js";
router.get('/', GetAllStudents);
router.get('/:id', GetStudentById);
router.delete('/:id', deleteStudentById);
router.post('/', upload.single("avatar"), createStudent)
router.put('/:id', upload.single("avatar"), updateStudent)

export default router;