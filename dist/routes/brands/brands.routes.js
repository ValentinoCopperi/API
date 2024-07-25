"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsRoutes = void 0;
const express_1 = require("express");
const brands_controllert_1 = require("./brands.controllert");
class BrandsRoutes {
    static get routes() {
        const routes = (0, express_1.Router)();
        const brandController = new brands_controllert_1.BrandController();
        routes.get("/", brandController.getBrands);
        return routes;
    }
}
exports.BrandsRoutes = BrandsRoutes;
