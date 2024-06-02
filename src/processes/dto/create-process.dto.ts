export class CreateProcessDto {
    id: string;

    title: string;

    companyName: string;

    started: Date;

    finishedAt: Date | null;

    status: 'Offer accepted' | 'Offer declined' | 'No offer received' | 'No response'
    
    appliedBy: string;

    jobDescription: string;
}
