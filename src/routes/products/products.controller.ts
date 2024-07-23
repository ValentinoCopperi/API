import { Request, Response } from "express";
import { sql } from "../../database/database";


export class ProductsController {


    public getAllProducts = async (req: Request, res: Response): Promise<any> => {

        try {
            const data = await sql`
                SELECT p.*, c.category_name , b.brand_name FROM product p
                JOIN category c ON c.id_category = p.id_category
                JOIN brand b ON b.id_brand = p.id_brand 
            `;
            if(data.length == 0) return res.status(404).json({msg:"Products not found "})
            res.status(200).json({ data , msg : "Products found" });
        } catch (err) {
            res.status(500).json({ msg: "Error getting products"});
        }
    }


    public getProductById = async (req: Request, res: Response): Promise<any> => {

        const { id } = req.params;

        try {
            const data = await sql`SELECT * FROM product WHERE id_product = ${id}`;
            if(data.length == 0 ) return res.status(404).json({msg:"Product with id " + id + " not found"})
            res.status(200).json({data , msg : "Product with id " + id + " found"});
        } catch (error) {
            res.status(500).json({msg:"Error on getting product"})
        }

        

    }

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