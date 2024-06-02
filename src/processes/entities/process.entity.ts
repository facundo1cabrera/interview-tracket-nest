import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Process {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    companyName: string;

    @Column()
    started: Date;

    @Column()
    finishedAt: Date | null;

    @Column()
    status: 'Offer accepted' | 'Offer declined' | 'No offer received' | 'No response'
    
    @Column()
    appliedBy: string;

    @Column()
    jobDescription: string;
}
