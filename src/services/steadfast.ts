import { TransactionBaseService, buildQuery } from "@medusajs/medusa";
import { MedusaError, isDefined } from "medusa-core-utils";
import { EntityManager } from 'typeorm';
import { SteadFast } from '../admin/models/steadFast';

type InjectedDependencies = {
    manager: EntityManager;
    facebookRepository: typeof SteadFast;
};
  
interface ISteadFastIntegration {
    secrecy_key?: string | null;
    api_key?: string | null;
}

class SeadFastService extends TransactionBaseService {
    constructor(container: InjectedDependencies) {
        super(container);
    }

    async list(storeId: string): Promise<SteadFast> {
        return await this.retrieve(storeId)
    }

    async createOrUpdate(
        storeId: string,
        steadFastIntegrations: ISteadFastIntegration
      ): Promise<SteadFast> {
        const steadFastRepository = this.activeManager_.getRepository(
            SteadFast
        );
        try {
          const steadFastConfig = await this.retrieve(storeId);
          if (steadFastConfig) {
            return await this.update(storeId, steadFastIntegrations);
          }
    
          const data = steadFastRepository.create({ ...steadFastIntegrations, store_id: storeId });
          const response = await steadFastRepository.save(data);
    
          if (response) {
            return response
          } else {
            throw new MedusaError(
              MedusaError.Types.NOT_FOUND,
              `Store doesn't exist`,
              "404"
            );
          }
    
        } catch (error: any) {
    
          if (
            error.code === "23503"
          ) {
            throw new MedusaError(
              MedusaError.Types.DB_ERROR,
              `Store with id ${storeId} does not exist`,
              "404"
            );
          } else {
            this.handleErrorResponse(error);
          }
        }
      }
    
      async update(storeId: string,
        steadFastIntegrations: ISteadFastIntegration): Promise<SteadFast | null> {
        const steadFastRepository = this.activeManager_.getRepository(
            SteadFast
        );
        try {
            const steadFastConfig = await this.retrieve(storeId);
    
            if (!steadFastConfig) {
                throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Store with id ${storeId} does not exist`,
                "404"
                );
            }
            if (!this.isFalsy(steadFastIntegrations.api_key)) {
                steadFastConfig.api_key = steadFastIntegrations.api_key;
            }
            
            if (!this.isFalsy(steadFastIntegrations.secrecy_key)) {
                steadFastConfig.secrecy_key = steadFastIntegrations.secrecy_key;
            }
    
          await steadFastRepository.save(steadFastConfig);
    
          return steadFastConfig
        } catch (error: any) {
          this.handleErrorResponse(error);
        }
      }

    async retrieve(storeId: string): Promise<SteadFast> {

        if (!isDefined(storeId)) {
            throw new MedusaError(
              MedusaError.Types.NOT_FOUND,
              `"Store id" must be defined`
            );
        }

        const steadFastRepository = this.activeManager_.getRepository(
            SteadFast
        );

        const query = buildQuery({ store_id: storeId }, {});

        const steadFastConfigQuery = await steadFastRepository.find(query);

        if (!steadFastConfigQuery.length) {
            return null
          }
        
        return steadFastConfigQuery[0]
    }

    private isFalsy(value: any) {
        if (typeof value === "string") {
          return value.trim() === "";
        }
        return value === null || value === undefined || value === false;
    }

    // Reusable error handling function
    private handleErrorResponse(error: any): never {
        if (error.type === "not_found") {
        throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Not found`,
            "404"
        );
        } else if (error.response) {
        throw {
            status: error.response.status,
            data: error,
        };
        } else if (error.request) {
        throw {
            status: 500,
            data: error,
        };
        } else {
        throw {
            status: 500,
            data: error,
        };
        }
    }
    
}

export default SeadFastService;