import { Router } from "express";
import { BrandController } from "./brands.controllert";


export class BrandsRoutes {


    static get routes () {

        const routes = Router();
        const brandController = new BrandController();
        routes.get("/" ,  brandController.getBrands);

        return routes;

    }

}