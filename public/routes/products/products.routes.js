"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
class ProductsRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const productsController = new products_controller_1.ProductsController();
        routes.get("/", productsController.getAllProducts);
        routes.get("/:id", productsController.getProductById);
        // routes.post("/" , productsController.createProduct);
        // routes.delete("/:id" , productsController.deleteProduct);
        return routes;
    }
}
exports.ProductsRoutes = ProductsRoutes;
