import express from "express";
import pool from "../db";
import {User} from "../types";
import {getUsers, getUserId, createUser, updateUser, deleteUser} from "../controllers/userController";

const router = express.Router();

// Create
router.post("/", createUser);

// Read
router.get("/", getUsers);
router.get("/:id", getUserId);


router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;