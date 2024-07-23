import { Router } from "express";
import { AuthController } from "./auth.controller";


export class AuthRoutes {

    static get routes () {

        const routes = Router();
        const authController = new AuthController();
        routes.post("/register" , authController.register);
        routes.post("/login" , authController.login);

        return routes;

    }

}