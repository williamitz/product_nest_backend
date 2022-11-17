import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrazabilityRecord } from '../../common/classes/trazabilityRecord.class';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Country extends TrazabilityRecord  {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    nameCountry: string;

    @Column({
        type: 'text',
        nullable: false
    })
    timeZone: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    isoAlphaThree: string;

    @Column({
        type: 'text',
        nullable: false
    })
    moneyCode: string;
    
    @Column({
        type: 'text',
        nullable: false
    })
    moneySymbol: string;

    @Column({
        type: 'text',
        nullable: false
    })
    prefixPhone: string
    
    @ManyToOne(
        ()     => User,
        ( u )  => u.country,
    )
    user: User;

}
