

import express from "express"
import {Book} from "../models/book";
import pool from "../db";
import {createBook, getBooks, getBookId, updateBook, deleteBook} from "../controllers/bookController";


export const bookRouter = express.Router();

bookRouter.post("/", createBook);

// Read
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookId);


bookRouter.put("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);



