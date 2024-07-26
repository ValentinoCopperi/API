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
exports.CategoryController = void 0;
const database_1 = require("../../database/database");
class CategoryController {
    constructor() {
        this.getCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.sql) `SELECT * FROM category`;
                if (data.length == 0)
                    return res.status(404).json({ msg: "Categories not found " });
                res.status(200).json({ data, msg: "Categories found" });
            }
            catch (err) {
                res.status(500).json({ msg: "Error getting categories" });
            }
        });
    }
}
exports.CategoryController = CategoryController;
