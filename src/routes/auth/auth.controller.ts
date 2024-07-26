import { Connection } from "mysql";
import e, { Request, Response } from "express";
import { sql } from "../../database/database";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'MSKYLEVEL-JWT-SECREYKEY';
export class AuthController {

    public user =  async (req: Request, res: Response): Promise<any> => {

        const token = req.cookies.token_skylevel
        if(!token) return res.status(500).json({msg:"Not logged in yet"})

        try {
            
            const data = jwt.verify(token , JWT_SECRET);
            
            return res.status(200).json({user:data , msg : "User logged in"})

        } catch (error) {
            
            return res.status(400).json({msg:"User not found"})


        }

    }

    public login = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, password } = req.body;
            console.log(email,password)
            // Val  idación de entrada
            if (!email || !password) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            // Verificación de la existencia del usuario
            const checkUser = await sql`SELECT * FROM users_table WHERE email = ${email}`;

            if (checkUser.length === 0) {
                return res.status(404).json({ msg: `User with email ${email} does not exist` });
            }

            // Verificación de la contraseña
            const user = checkUser[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ msg: "Incorrect password" });
            }

            const token = jwt.sign({ id: user.id_user,name: user.name , email: user.email , role : user.id_role }, JWT_SECRET, { expiresIn: "1h" });

            // Si la autenticación es exitosa, envía los datos del usuario (sin la contraseña)
            const { password: userPassword, ...userData } = user;

            // Establecer el token en una cookie segura
            res.cookie('token_skylevel', token, {
                httpOnly: true, // Previene el acceso desde JavaScript
                secure: process.env.NODE_ENV === 'production', // Establece el flag 'Secure' en producción
                sameSite: 'strict', // Previene ataques CSRF
                maxAge: 3600000 // 1 hora en milisegundos
            });


            return res.status(200).json({msg:"Welcome " + email , user : {email:user.email , name : user.name , role : user.id_role , phone : user.phone}});

        } catch (error) {
            console.error("Error on login:", error);
            return res.status(500).json({ msg: "Error on login", err: error });
        }
    }

    public register = async (req: Request, res: Response): Promise<any> => {

        try {
            const { name, email, password, phone, id_role: Null } = req.body;
            // Basic input validation
            if (!name || !email || !password || !phone) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            // Check if user already exists
            const checkUser = await sql`SELECT * FROM users_table WHERE email = ${email}`;
            if (checkUser.length > 0) {
                return res.status(400).json({ msg: `User with email ${email} already exists` });
            }

            const id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1000000;

            const hashedPassword = await bcrypt.hash(password, 10);
            // Insert new user into the database
            const insertedUser = await sql`
            INSERT INTO users_table (id_user,name, email, password, phone) 
            VALUES (${id},${name}, ${email}, ${hashedPassword}, ${phone});`;

            return res.status(200).json({ msg: `${email} registered successfully` });
        } catch (err) {
            console.error("Error on register:", err);
            return res.status(500).json({ msg: "Error on registration", error: err });
        }

    }

    public logout = async (req: Request, res: Response): Promise<any> => {

        try {
            
            res.cookie('token_skylevel', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date(0) // Expira inmediatamente
            });

            return res.status(200).json({msg : "Logout successful"})

        } catch (error) {

            return res.status(500).json({msg: "Error logout" , err : error})

        }

    }

}