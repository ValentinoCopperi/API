"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
class CategoryRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const categoryController = new category_controller_1.CategoryController();
        routes.get("/", categoryController.getCategories);
        return routes;
    }
}
exports.CategoryRoutes = CategoryRoutes;
