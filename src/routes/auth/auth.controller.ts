import { Connection } from "mysql";
import { connection } from "../../database/database";
import { Request, Response } from "express";


export class AuthController {

    private db : Connection;

    constructor(){
        this.db = connection;
    }

    public login = (req : Request , res : Response) : any => {

        const { email , password } = req.body;

        const q = "SELECT * FROM user WHERE email = ?";

        this.db.query(q,[email],(err,data) => {
            if(err) return res.status(500).json({error:err.message});

            if(data.length < 1 ) return res.status(400).json({err: "User doesnt exist"});

            const userPassword  = data[0].password;
            if(password == userPassword){
                return res.status(200).json({msg:"Login successfull",data});

                //Crea JWT + COOKIES + AGREGAR HASH COMPARE






            }else{
                return res.status(300).json({msg:"Password wrong"})
            }
        })

    }


    public register = (req : Request , res : Response) : any => {
        const { name , email , password , phone , id_role} = req.body;
        if(
            !name ||
            !email ||
            (!password || password.length > 40) ||
            !phone
        ) { return res.status(500).json({msg:"Must complete all"}) };


        const checkUser = "SELECT * FROM user WHERE email = ?";

        this.db.query(checkUser,[email],(err,data) => {
            if(err) return res.status(500).json({error:err.message});

            if(data.length > 0 ) return res.status(300).json({error:"User already exists"});

            //HASHEAR CONTRASEÑA



            

            const q = "INSERT INTO user (name,email,password,phone,id_role) VALUES (?,?,?,?,?)";
            this.db.query(q,[name,email,password,phone,id_role],(err,data) => {
                if(err) return res.status(500).json({error:err.message});
                return res.status(200).json({msg:"User created succesfull"})
            })


        })



        
    }

}