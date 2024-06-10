import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Process {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    jobTitle: string;

    @Column()
    companyName: string;

    @Column()
    startDate: Date;

    @Column({
        nullable: true
    })
    finishDate?: Date | null;

    @Column()
    status: string;
    
    @Column({
        nullable: true
    })
    appliedBy?: string | null;

    @Column({
        nullable: true
    })
    jobDescription?: string | null;

    @Column({
        nullable: true
    })
    timeOff?: string | null;
    
    @Column({
        nullable: true
    })
    salaryRange?: string | null;

    @Column({
        nullable: true
    })
    jobSchema?: string | null;
    
    @Column({
        nullable: true
    })
    bonus?: string | null;

    @Column({
        nullable: true
    })
    techStack?: string | null;

    @Column({
        nullable: true
    })
    stockOptions?: string | null;

    @Column({
        nullable: true
    })
    location?: string;

    @Column()
    interviewsSteps: number;
    // steps?: Step[]

    @ManyToOne(() => User, (user) => user.processes)
    user: User

    @Column({type: "uuid"})
    userId: string;
}
