import {Request, Response} from "express";
import pool from "../db";
import {Book, BookRequest} from "../models/book"


export const getBookId = async (req: Request, res: Response) => {
    const bookId = req.params.id;

    try{
        const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [bookId])
        if(rows.length == 0){
            return res.status(404).json({message: "Book not found."})
        }

        return res.json(rows[0])
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

export const getBooks = async (req:Request, res: Response) => {
    
    try{
        const [rows] = await pool.query("SELECT * FROM books");
        if(rows.length == 0){
            return res.status(404).json({message: "no book yet."})
        }
        return res.json(rows);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}


export const createBook = async (req:Request, res: Response) => {
    
    const bookRequest: BookRequest = req.body.bookRequest;
   
    const createdAt = new Date();
    
    try{
        const result = await pool.query("INSERT INTO books (title, author, modelURL, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?)", [bookRequest.title, bookRequest.author, bookRequest.modelURL, createdAt, createdAt]);
        return res.status(201).json({message: "book created.", bookId: result.insertId})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to create book"});
    }
}


export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const { title, author, modelURL } = req.body;
  
    try {
      await pool.query('UPDATE books SET title = ?, author = ?, modelURL = ?, WHERE id = ?', [title, author, modelURL, bookId]);
      return res.json({ message: 'book updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update book' });
    }
};
  

export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;

    try {
        await pool.query('DELETE FROM books WHERE id = ?', [bookId]);
        return res.json({ message: 'book deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete book' });
    }
};