import { Request, Response } from "express";
import { sql } from "../../database/database";

export class CategoryController {

    public getCategories = async (req: Request, res: Response): Promise<any> => {

        try {
            const data =await  sql`SELECT * FROM category`;

            if (data.length == 0) return res.status(404).json({ msg: "Categories not found " })

            res.status(200).json({ data, msg: "Categories found" });

        } catch (err) {
            res.status(500).json({ msg: "Error getting categories" });
        }

    }

}