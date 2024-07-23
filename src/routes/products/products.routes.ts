import { Router } from "express";
import { ProductsController } from "./products.controller";


export class ProductsRoutes {

    static get routes () {

        const routes = Router();

        const productsController = new ProductsController();

        routes.get("/" , productsController.getAllProducts);
        routes.get("/:id" , productsController.getProductById);
        // routes.post("/" , productsController.createProduct);
        // routes.delete("/:id" , productsController.deleteProduct);

        return routes;

    }

}