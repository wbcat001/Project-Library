"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import userRoutes from "./userRoutes";
const db_1 = __importDefault(require("./db"));
// アプリケーションで動作するようにdotenvを設定する
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use("/api", userRoutes)
const PORT = process.env.PORT;
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const [result] = yield db_1.default.query("INSERT INTO users (name, email) VALUES(?, ?)", [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
}));
// Read
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.query("SELECT * FROM users");
    const users = rows;
    res.json(rows);
}));
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const [rows] = yield db_1.default.query("SELECT * FROM users WHERE id = ?", [id]);
    res.status(200).json(rows[0]);
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    yield db_1.default.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    res.status(200).json({ id, name, email });
}));
app.delete("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.default.query("DELETE FROM users WHERE id = ?", [id]);
}));
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // エラーの処理
    throw new Error(error.message);
});
