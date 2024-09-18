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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserId = void 0;
const db_1 = __importDefault(require("../db"));
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM users WHERE id = ?", [userId]);
        if (rows.length == 0) {
            return res.status(404).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getUserId = getUserId;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const result = yield db_1.default.query("INSERT INTO users (name, email) VALUES(?, ?)", [name, email]);
        return res.status(201).json({ message: "User created.", userId: result.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        yield db_1.default.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
        res.json({ message: 'User updated' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        yield db_1.default.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
