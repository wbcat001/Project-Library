import express from "express"
import {Book} from "../models/book";
import pool from "../db";
import { getGutenbergs } from "../controllers/gutenbergController";

export const gutenbergRouter = express.Router();

gutenbergRouter.get("/", getGutenbergs);




