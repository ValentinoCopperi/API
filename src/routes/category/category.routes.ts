import { Router } from "express";
import { CategoryController } from './category.controller';

export class CategoryRoutes {


    static get routes () {

        const routes = Router();
        const categoryController = new CategoryController();
        routes.get("/" ,  categoryController.getCategories);

        return routes;

    }

}