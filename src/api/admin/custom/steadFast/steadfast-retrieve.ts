import { Request, Response } from "express";
import SteadFastService from "../../../../services/steadfast";

export default async (req: Request, res: Response) => {

    const storeId = req.query.store_id as string;
    const steadFastIntegrations: SteadFastService =
        req.scope.resolve("steadFastService");


    try {
        const response = await steadFastIntegrations.list(storeId)
        res.status(200).json({
            result: response,
            statusCode: 200,
            message: "successfully fetch",
        });
    } catch (error: any) {
        res.status(error.status || Number(error.code) || 500).json({
            error: error,
        });
    }
};
