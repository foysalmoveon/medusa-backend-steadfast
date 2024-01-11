import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Request, Response } from "express";
import SteadFastService from "../../../../services/steadfast";

export default async (req: Request, res: Response) => {
    const storeId = req.query.store_id as string;
    const steadFastIntegrations: SteadFastService =
        req.scope.resolve("steadFastService");
  const data = req.validatedBody as AdminSteadFastIntegrations;

  try {
    const response = await steadFastIntegrations.createOrUpdate(storeId, data);
    res.status(200).json({
      result: response,
      statusCode: 200,
      message: "successfully created",
    });
  } catch (error: any) {
    res.status(error.status || Number(error.code) || 500).json({
      error: error,
    });
  }
};


export class AdminQuery {
  @IsString()
  @IsNotEmpty()
  store_id: string;
}

export class AdminSteadFastIntegrations {

  @IsString()
  @IsOptional()
  api_key?: string | null;

  @IsString()
  @IsOptional()
  secrecy_key?: string | null;
    
}