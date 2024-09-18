import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes"
import {bookRouter} from "./routes/bookRoutes";
import {generateRouter} from "./routes/generateRoutes";
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
// app.use("/api", userRoutes)
const PORT = process.env.PORT;

// app.get("/", (request: Request, response: Response) => { 
//   response.status(200).send("Hello World");
// }); 

// app.post("/users", async (req, res) => {
//   const {name, email} = req.body;
//   const [result] = await pool.query("INSERT INTO users (name, email) VALUES(?, ?)", [name, email]);
//   res.status(201).json({ id: (result as any).insertId, name, email});
// })

// // Read
// app.get("/users", async (req, res) => {
//   const [rows] = await pool.query("SELECT * FROM users");
//   const users: User[] = rows as User[];
//   res.json(rows);
// })

// app.get("/users/:id", async (req, res) => {
//   const {id} = req.params;

//   const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
//   res.status(200).json(rows[0]);
// })


// app.put("/users/:id", async (req, res) => {
//   const {id} = req.params;
//   const {name, email} = req.body;
//   await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
//   res.status(200).json({id, name, email});
// })

// app.delete("/user/:id", async (req, res) => {
//   const {id} = req.params;
//   await pool.query("DELETE FROM users WHERE id = ?", [id])
// })



app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // エラーの処理
  throw new Error(error.message);
});