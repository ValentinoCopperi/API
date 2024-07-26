import { Router } from "express";
import { ProductsRoutes } from "./products/products.routes";
import { AuthRoutes } from "./auth/auth.routes";
import { CategoryRoutes } from "./category/category.routes";
import { BrandsRoutes } from "./brands/brands.routes";
import { UsersRoutes } from "./users/users.routes";


export class AppRoutes {

    static get routes () {

        const routes = Router();

        routes.use("/api/products" , ProductsRoutes.routes);
        routes.use("/api/category" , CategoryRoutes.routes);
        routes.use("/api/brands" , BrandsRoutes.routes);
        routes.use("/api/users" , UsersRoutes.routes);
         routes.use("/api/auth" , AuthRoutes.routes)

        return routes;

    }

}