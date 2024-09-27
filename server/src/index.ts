import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes"
import {bookRouter} from "./routes/bookRoutes";
import {generateRouter} from "./routes/generateRoutes";
import {gutenbergRouter} from "./routes/gutenbergRoutes";
import pool from "./db";
import {User} from "./types";


// アプリケーションで動作するようにdotenvを設定する
dotenv.config();
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/users", router );
app.use("/books", bookRouter );
app.use("/generate", generateRouter)
app.use("/gutenberg", gutenbergRouter)
app.use(express.static("uploads"));

const PORT = process.env.PORT;





app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // エラーの処理
  throw new Error(error.message);
});