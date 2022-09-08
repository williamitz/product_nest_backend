import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: true
    })
    email: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: true
    })
    phone: string;
}
