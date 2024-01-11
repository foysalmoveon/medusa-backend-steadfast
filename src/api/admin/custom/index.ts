import { ConfigModule, transformBody } from "@medusajs/medusa";
import cors from "cors";
import { Router } from "express";
import { processIdentifierMiddleware } from "../../middlewares/identifier-existence";
import steaFastCredentials from "./steadFast";
import { AdminSteadFastIntegrations } from "./steadFast/steadfast-create";

export default function adminRoutes(router: Router, options: ConfigModule) {
    const { projectConfig } = options;

    const adminCorsOptions = {
        origin: projectConfig?.admin_cors?.split(","),
        credentials: true,
    };

    // Create a dedicated admin router for better organization
    const adminRouter = Router();

    // Apply CORS middleware for the admin routes
    adminRouter.use(cors(adminCorsOptions));


    adminRouter.post("/steadFast-creadientials/create", processIdentifierMiddleware, transformBody(AdminSteadFastIntegrations), steaFastCredentials.create)
    adminRouter.get("/facebook-creadientials/list", processIdentifierMiddleware, steaFastCredentials.retrieve)

    // Mount the admin router under the "/admin" path
    router.use("/admin/api/v1", adminRouter);
}