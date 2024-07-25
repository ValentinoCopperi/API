"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
class UsersRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const usersController = new users_controller_1.UsersController();
        routes.get("/", usersController.getUsers);
        return routes;
    }
}
exports.UsersRoutes = UsersRoutes;
