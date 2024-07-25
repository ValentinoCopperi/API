import { Request, Response } from "express";
import { sql } from "../../database/database";

export class UsersController {


    public getUsers = async (req : Request , res : Response) : Promise<any> => {

        try {
            const data = await sql`SELECT * FROM users_table`;
            if(!data || data.length < 1) return res.status(404).json({msg:"Users not found"});

            return res.status(200).json({data, msg:"Users found correctly"});
        } catch (error) {
            return res.status(500).json({msg:"Error on getting users"});
        }


    }

}