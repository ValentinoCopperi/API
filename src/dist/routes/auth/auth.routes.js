"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
class AuthRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const authController = new auth_controller_1.AuthController();
        routes.post("/register", authController.register);
        routes.get("/user", authController.user);
        routes.post("/login", authController.login);
        routes.post("/logout", authController.logout);
        return routes;
    }
}
exports.AuthRoutes = AuthRoutes;
