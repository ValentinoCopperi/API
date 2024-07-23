import { Router } from "express";
import { ProductsRoutes } from "./products/products.routes";
import { AuthRoutes } from "./auth/auth.routes";


export class AppRoutes {

    static get routes () {

        const routes = Router();

        routes.use("/products" , ProductsRoutes.routes)
        // routes.use("/auth" , AuthRoutes.routes)

        return routes;

    }

}