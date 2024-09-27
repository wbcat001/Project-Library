import {Request, Response} from "express";
import pool from "../db";
// import { parseStringPromise } from 'xml2js';

const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

export const getGutenbergs = async (req: Request, res:Response) => {
    
    
    

    try{
        const bookList = [];
        // idが11から14までの本を渡す
        for (let i: number = 11; i< 15; i++ ){
            const baseURL = `https://www.gutenberg.org/ebooks/${i}.rdf`;
            const response = await fetch(baseURL);
            // console.log(response.text());
            const xmlData = await response.text();
            // console.log(xmlData)
            const parsedXml = await xml2js.parseStringPromise(xmlData, { explicitArray: false });
            // console.log(parsedXml);
            const title = parsedXml['rdf:RDF']['pgterms:ebook']['dcterms:title'];
            const author = parsedXml['rdf:RDF']['pgterms:ebook']['dcterms:creator']['pgterms:agent']['pgterms:name'];
            const issued = parsedXml['rdf:RDF']['pgterms:ebook']['dcterms:issued']['_'];

            
            const contentURL = `https://www.gutenberg.org/ebooks/${i}.txt.utf-8`;

            bookList.push({title: title, author: author, contentURL: contentURL})
        }
        return res.json(bookList);

    }catch(error){
        console.error("Failed to get data of gutenberg project ", error);
        return res.status(500).json({message: "Server error"});
    }
};


