import { Router } from "express";
import { AuthController } from "./auth.controller";


export class AuthRoutes {

    static get routes () {

        const routes = Router();
        const authController = new AuthController();
        routes.post("/register" , authController.register);
        routes.get("/user" , authController.user);
        routes.post("/login" , authController.login);
        routes.post("/logout" , authController.logout);
       
        return routes;

    }

}