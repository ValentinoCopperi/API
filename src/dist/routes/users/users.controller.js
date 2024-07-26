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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const database_1 = require("../../database/database");
class UsersController {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.sql) `SELECT * FROM users_table`;
                if (!data || data.length < 1)
                    return res.status(404).json({ msg: "Users not found" });
                return res.status(200).json({ data, msg: "Users found correctly" });
            }
            catch (error) {
                return res.status(500).json({ msg: "Error on getting users" });
            }
        });
    }
}
exports.UsersController = UsersController;
