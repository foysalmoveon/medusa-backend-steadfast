import { errorHandler } from "@medusajs/medusa";
import express, { Router } from "express";

import bodyParser from "body-parser";
import adminRoutes from "./admin/custom";


export default function createRouter(
    rootDirectory: string,
    options: any
): Router {
    const router = express.Router();

    router.use(bodyParser.json());
    adminRoutes(router, options);
    router.use(errorHandler());
    module.exports = router;

    return router;
}