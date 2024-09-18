import {Request, Response} from "express";
import pool from "../db";


export const getUserId = async (req: Request, res: Response) => {
    const userId = req.params.id;


    try{
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId])
        if(rows.length == 0){
            return res.status(404).json({message: "User not found."})
        }

        return res.json(rows[0])
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
};

export const getUsers = async (req:Request, res: Response) => {
    
    try{
        const [rows] = await pool.query("SELECT * FROM users");
        if(rows.length == 0){
            return res.status(404).json({message: "no User yet."})
        }
        return res.json(rows);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}


export const createUser = async (req:Request, res: Response) => {
    const {name, email} = req.body;
    const createdAt = new Date();

    try{
        const result = await pool.query("INSERT INTO users (name, email, createdAt, updatedAt) VALUES(?, ?, ?, ?)", [name, email, createdAt, createdAt]);
        return res.status(201).json({message: "User created.", userId: result.insertId})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Failed to create user"});
    }
}


export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email } = req.body;
  
    try {
      await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
      return res.json({ message: 'User updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
};
  

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        return res.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};