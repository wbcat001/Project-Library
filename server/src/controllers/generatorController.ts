import {Request, Response} from "express";
import pool from "../db";

const fs = require("fs");
const path = require("path");
export const generateModel = (req: Request, res:Response) => {
    const book = req.body.book;

    try{
        const modelURL = `http://localhost:3001/modeldata/${book.title}_model.gltf`//"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf";
   
        fs.copyFileSync(
            path.join(__dirname, "../../uploads/prototype/Beech.gltf"),  
            path.join(__dirname,`../../uploads/modeldata/${book.title}_model.gltf`)
        );
        return res.json({modelURL: modelURL});

    }catch(error){
        console.error("Failed to generate model", error)
        return res.status(500).json({message: "Server error"});
    }
};


