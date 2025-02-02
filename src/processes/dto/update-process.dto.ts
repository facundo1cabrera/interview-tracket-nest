

export class UpdateProcessDto {
    jobTitle: string;
    companyName: string;
    startDate: number;
    finishDate?: string | null;
    status: string;
    appliedBy?: string | null;
    jobDescription?: string | null;
    timeOff?: string | null;
    salaryRange?: string | null;
    jobSchema?: string | null;
    bonus?: string | null;
    techStack?: string | null;
    stockOptions?: string | null;
    location?: string;
    interviewsSteps: number;
    userId: string;
}
