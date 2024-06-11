export class CreateStepDto {
    duration: string;
    type: string;
    date?: number | null
    status: string | null
    processId: string;
}