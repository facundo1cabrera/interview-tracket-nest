import { Process } from "src/processes/entities/process.entity";
import { Admin, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('bool', {
        default: false
    })
    isEmailConfirmed: boolean;

    @Column('text', {
        nullable: true
    })
    confirmationCode?: string | null;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullname: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(type => Process, process => process.user)
    processes: Process[];
}