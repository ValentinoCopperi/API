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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const database_1 = require("../../database/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'MSKYLEVEL-JWT-SECREYKEY';
class AuthController {
    constructor() {
        this.user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token_skylevel;
            if (!token)
                return res.status(500).json({ msg: "Not logged in yet" });
            try {
                const data = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                return res.status(200).json({ user: data, msg: "User logged in" });
            }
            catch (error) {
                return res.status(400).json({ msg: "User not found" });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password);
                // Val  idación de entrada
                if (!email || !password) {
                    return res.status(400).json({ msg: "All fields are required" });
                }
                // Verificación de la existencia del usuario
                const checkUser = yield (0, database_1.sql) `SELECT * FROM users_table WHERE email = ${email}`;
                if (checkUser.length === 0) {
                    return res.status(404).json({ msg: `User with email ${email} does not exist` });
                }
                // Verificación de la contraseña
                const user = checkUser[0];
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ msg: "Incorrect password" });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id_user, name: user.name, email: user.email, role: user.id_role }, JWT_SECRET, { expiresIn: "1h" });
                // Si la autenticación es exitosa, envía los datos del usuario (sin la contraseña)
                const { password: userPassword } = user, userData = __rest(user, ["password"]);
                // Establecer el token en una cookie segura
                res.cookie('token_skylevel', token, {
                    httpOnly: true, // Previene el acceso desde JavaScript
                    sameSite: 'lax', // Previene ataques CSRF
                    maxAge: 3600000 // 1 hora en milisegundos
                });
                return res.status(200).json({ msg: "Welcome " + email, user: { email: user.email, name: user.name, role: user.id_role, phone: user.phone } });
            }
            catch (error) {
                console.error("Error on login:", error);
                return res.status(500).json({ msg: "Error on login", err: error });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, id_role: Null } = req.body;
                // Basic input validation
                if (!name || !email || !password || !phone) {
                    return res.status(400).json({ msg: "All fields are required" });
                }
                // Check if user already exists
                const checkUser = yield (0, database_1.sql) `SELECT * FROM users_table WHERE email = ${email}`;
                if (checkUser.length > 0) {
                    return res.status(400).json({ msg: `User with email ${email} already exists` });
                }
                const id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1000000;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Insert new user into the database
                const insertedUser = yield (0, database_1.sql) `
            INSERT INTO users_table (id_user,name, email, password, phone) 
            VALUES (${id},${name}, ${email}, ${hashedPassword}, ${phone});`;
                return res.status(200).json({ msg: `${email} registered successfully` });
            }
            catch (err) {
                console.error("Error on register:", err);
                return res.status(500).json({ msg: "Error on registration", error: err });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie('token_skylevel', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    expires: new Date(0) // Expira inmediatamente
                });
                return res.status(200).json({ msg: "Logout successful" });
            }
            catch (error) {
                return res.status(500).json({ msg: "Error logout", err: error });
            }
        });
    }
}
exports.AuthController = AuthController;
