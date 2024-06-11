export class GetStepDto {
    id: string;
    duration: string;
    type: string;
    date?: number | null
    status: string | null
    processId: string;
}