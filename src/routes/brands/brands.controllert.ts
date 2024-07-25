import { Request, Response } from "express";
import { sql } from "../../database/database";

export class BrandController {

    public getBrands =  async (req: Request, res: Response): Promise<any> => {

        try {
            const data = await  sql`SELECT * FROM brand`;

            if (data.length == 0) return res.status(404).json({ msg: "Brands not found " })

            return res.status(200).json({ data, msg: "Brands found" });

        } catch (err) {
            return res.status(500).json({ msg: "Error getting Brands" });
        }

    }

}