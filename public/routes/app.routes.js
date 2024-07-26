"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const products_routes_1 = require("./products/products.routes");
const auth_routes_1 = require("./auth/auth.routes");
const category_routes_1 = require("./category/category.routes");
const brands_routes_1 = require("./brands/brands.routes");
const users_routes_1 = require("./users/users.routes");
class AppRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        routes.use("/api/products", products_routes_1.ProductsRoutes.routes);
        routes.use("/api/category", category_routes_1.CategoryRoutes.routes);
        routes.use("/api/brands", brands_routes_1.BrandsRoutes.routes);
        routes.use("/api/users", users_routes_1.UsersRoutes.routes);
        routes.use("/api/auth", auth_routes_1.AuthRoutes.routes);
        return routes;
    }
}
exports.AppRoutes = AppRoutes;
