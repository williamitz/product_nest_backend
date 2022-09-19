import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        type: 'text'
    })
    fullName: string;

    @Column({
        type: 'text',
        nullable: true
    })
    phone?: string;

    @Column({
        type: 'text',
        select: false
    })
    password: string;
    
    @BeforeInsert()
    beforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
