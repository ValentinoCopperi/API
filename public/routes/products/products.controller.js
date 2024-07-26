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
exports.ProductsController = void 0;
const database_1 = require("../../database/database");
class ProductsController {
    constructor() {
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, database_1.sql) `
                SELECT p.*, c.category_name , b.brand_name FROM product p
                JOIN category c ON c.id_category = p.id_category
                JOIN brand b ON b.id_brand = p.id_brand 
            `;
                if (data.length == 0)
                    return res.status(404).json({ msg: "Products not found " });
                res.status(200).json({ data, msg: "Products found" });
            }
            catch (err) {
                res.status(500).json({ msg: "Error getting products" });
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield (0, database_1.sql) `SELECT * FROM product WHERE id_product = ${id}`;
                if (data.length == 0)
                    return res.status(404).json({ msg: "Product with id " + id + " not found" });
                res.status(200).json({ data, msg: "Product with id " + id + " found" });
            }
            catch (error) {
                res.status(500).json({ msg: "Error on getting product" });
            }
        });
        // public createProduct =  (req: Request, res: Response) : any => {
        //     const { id_product , name , data , price , id_category , id_brand } = req.body;
        //     if(!id_product || !name  || !data  || (price < 0 || !price) || (id_category < 0 || id_brand < 0)){
        //         return res.status(500).json({err : "Must completed all data"});
        //     }
        //     const q = "INSERT INTO product (id_product,name,data,price,id_category,id_brand) VALUES (?,?,?,?,?,?)";
        //     this.db.query(q,[id_product,name,data,price,id_category,id_brand], (err,data) : any => {
        //         if(err) return res.status(500).json({error : err.message});
        //         return res.status(201).json({msg: "Product created" , data})
        //     })
        // }
        // public deleteProduct = (req: Request, res: Response) : any => {
        //     const { id } = req.params;
        //     const q = "DELETE FROM product WHERE id_product = ?";
        //     this.db.query(q,[id],(err,data) => {
        //         if(err) return res.status(500).json({error : err.message});
        //         if(data.affectedRows == 0) return res.status(404).json({error:"Product not found to delete"})
        //         return res.status(201).json({msg: "Product deleted" , id})
        //     })
        // }
    }
}
exports.ProductsController = ProductsController;
