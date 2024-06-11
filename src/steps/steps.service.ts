import { Injectable } from '@nestjs/common';
import { UpdateStepDto } from './dto/update-step.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Repository } from 'typeorm';
import { GetStepDto } from './dto/get-step.dto';

@Injectable()
export class StepsService {

    constructor(@InjectRepository(Step)
    private stepsRepository: Repository<Step>) { }

    async findAllByProcessId(id: string): Promise<GetStepDto[]> {
        const steps = await this.stepsRepository.find({
            where: { process: { id } },
        });

        const stepsDtos = steps.map(x => {
            const stepDto = new GetStepDto();
            stepDto.id = x.id;
            stepDto.date = x.date ? x.date.valueOf() : null;
            stepDto.duration = x.duration;
            stepDto.processId = x.processId;
            stepDto.status = x.status;
            stepDto.type = x.type;

            return stepDto;
        })

        return stepsDtos;
    }

    async remove(id: string) {
        const step = await this.stepsRepository.findOne({
            where: { id }
        });


        await this.stepsRepository.remove(step);
        return id;
    }

    async update(id: string, updateStepDto: UpdateStepDto) {
        const updatedStep = new Step();

        updatedStep.date = updateStepDto.date ? new Date(updateStepDto.date) : null;
        updatedStep.duration = updateStepDto.duration;
        updatedStep.processId = updateStepDto.processId;
        updatedStep.status = updateStepDto.status;
        updatedStep.type = updateStepDto.type;


        await this.stepsRepository.update(
            id,
            updatedStep
        );

        const updatedStepDb = await this.stepsRepository.findOne({
            where: { id }
        });

        const newStepDto = new GetStepDto();

        newStepDto.date = updatedStepDb.date ? updatedStepDb.date.valueOf(): null;
        newStepDto.duration = updatedStepDb.duration;
        newStepDto.processId = updatedStepDb.processId;
        newStepDto.status = updatedStepDb.status;
        newStepDto.type = updatedStepDb.type;
        
        return newStepDto;
    }

    async create(createStepDto: CreateStepDto) {
        const newStep = new Step();

        newStep.date = createStepDto.date ? new Date(createStepDto.date) : null;
        newStep.duration = createStepDto.duration;
        newStep.processId = createStepDto.processId;
        newStep.status = createStepDto.status;
        newStep.type = createStepDto.type;
    
        const result = await this.stepsRepository.save(newStep);
    
        return result.id;
    }
}
