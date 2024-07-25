import { Router } from "express";
import { UsersController } from "./users.controller";

export class UsersRoutes {

    static get routes () {

        const routes = Router();
        const usersController = new UsersController();
        routes.get("/" , usersController.getUsers);

        return routes;

    }

}