import {Request, Response} from "express";
import pool from "../db";
import {Book, BookRequest} from "../models/book"

const fs = require("fs");
const path = require("path");


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

        const newContentURL = await createBookText(bookRequest);
        if(newContentURL != null && newContentURL != ""){
            bookRequest.contentURL = newContentURL;
        }
        const result = await pool.query("INSERT INTO books (title, author, modelURL, contentURL, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?)", [bookRequest.title, bookRequest.author, bookRequest.modelURL, bookRequest.contentURL, createdAt, createdAt]);

        

        return res.status(201).json({message: "book created.", bookId: result.insertId})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to create book"});
    }
}

const createBookText = async (book: BookRequest) => {

    try{
        const url = book.contentURL;
        
        const response = await fetch(url);
        const content = await response.text();

        const fileName = path.basename(url);
        const filePath =  `http://localhost:3001/content/${book.title + fileName}`
        const savePath = path.join(__dirname, `../../uploads/content/${book.title + fileName}`)

        fs.writeFileSync(savePath, "")
        var fd = fs.openSync(savePath, "w");
        fs.writeSync(fd, content);
        fs.closeSync(fd);

        return filePath;

    }catch(error){
        console.error(error);
        return null;
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


export const getBookText = async (req: Request, res: Response) => {
    const {title} = req.query;

    try{
        const [rows] = await pool.query("SELECT * FROM bookText where title = ?", [title])
        if(rows.length == 0){
            return res.status(404).json({message: "Book not found."})
        }else{
            return res.json(rows[0])
        }

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to get content"})
    }
}



