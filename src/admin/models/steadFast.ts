import {
    BeforeInsert,
    Column,
    Entity, Index
} from "typeorm"
import {BaseEntity, generateEntityId} from "@medusajs/medusa"

@Entity()
export class SteadFast extends BaseEntity {

    @Index()
    @Column({ nullable: false })
    store_id: string;

    @Column({ type: "varchar" })
    api_key: string

    @Column({ type: "varchar" })
    secrecy_key: string

    @BeforeInsert()
    generateId() {
        // Generate the id using the generateEntityId function
        this.id = generateEntityId(this.id, "steadFast");
    }
}