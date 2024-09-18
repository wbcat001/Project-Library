import {Request, Response} from "express";
import pool from "../db";


export const generateModel = (req: Request, res:Response) => {
    const book = req.body;

    try{
        const modelURL = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf";
        return res.json({modelURL: modelURL});

    }catch(error){
        console.error("Failed to generate model")
        return res.status(500).json({message: "Server error"});
    }
};