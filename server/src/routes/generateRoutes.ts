import express from "express"
import {Book} from "../models/book";
import pool from "../db";
import {generateModel} from "../controllers/generatorController";

export const generateRouter = express.Router();

generateRouter.post("/", generateModel);




