"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
// MySQLデータベース接続の設定
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'your_database',
});
exports.default = pool;
