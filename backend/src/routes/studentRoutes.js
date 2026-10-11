import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", verifyAdmin, createStudent);
router.put("/:id", verifyAdmin, updateStudent);
router.delete("/:id", verifyAdmin, deleteStudent);

export default router;