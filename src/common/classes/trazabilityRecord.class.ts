import { Column, JoinColumn, ManyToOne, OneToOne, Timestamp } from "typeorm";
import { User } from '../../user/entities/user.entity';

export abstract class TrazabilityRecord {

    @Column({
        type: Boolean,
        default: true
    })
    active: boolean;
    
    @ManyToOne(
        () => User,
        ( e: any ) => e.user,
    )
    userCreate: Partial<User>;

    @Column({
        type: 'timestamp'
    })
    createAt: Date;

    @ManyToOne(
        () => User,
        ( e: any ) => e.user,
        { nullable: true }
    )
    userUpdate?: Partial<User>;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    updateAt?: Date;

    @ManyToOne(
        () => User,
        ( e: any ) => e.user,
        { nullable: true }
    )
    userDelete?: Partial<User>;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    deleteAt?: Date;

}