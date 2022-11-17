import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from '../../product/entities/product.entity';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
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
    
    @Column({
        type: 'boolean',
        default: false
    })
    google: boolean;

    @OneToMany(
        ()     => Product,
        (p)    => p.user
    )
    products: Product[];

    @ManyToOne( 
        () => Country,
        (c) => c.user,
        { eager: true }
    )
    @JoinColumn()
    country: Partial<Country>;
    
    @BeforeInsert()
    beforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
