import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: String
    })
    name: string;

    @Column({
        type: Boolean
    })
    available: boolean;

    @Column({
        type: 'decimal'
    })
    price: number;

    @Column({
        type: String
    })
    urlImg: string;
    
    // esto solo será para el manejo de la imágen y serán opcionales

    @Column({
        type: String
    })
    publicId: string;
    

    @Column({
        type: String
    })
    signature: string;

    @ManyToOne(
        () => User,
        (p) => p.products,
        { eager: true }
    )
    user: Partial<User>;

}
