import { Process } from "src/processes/entities/process.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Step {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    duration: string;

    @Column()
    type: string;

    @Column({
        nullable: true
    })
    date?: Date | null

    @Column()
    status: string | null

    @ManyToOne(() => Process, (process) => process.steps)
    process: Process

    @Column({type: "uuid"})
    processId: string;
}
