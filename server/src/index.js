
import express from "express";
// import userRoutes from ""




const express = require('express');
const app = express();

// app.use(express.json());
// app.use("/api", userRoutes);

app.listen(3001, () => {
    console.log("running on port 3001");
});

// const mysql = require("mysql2");

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "pass",
//     database: "my_db"
// })

// app.get("/", (req, res) => {

//     const sqlSelect = "SELECT * FROM users";
//     db.query(sqlSelect, (err, result) => {
//         res.send(result)
//     });
    
// });






