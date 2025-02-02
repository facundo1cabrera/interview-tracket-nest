import { Inject, Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './entities/process.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GetProcessDto } from './dto/get-process.dto';

@Injectable()
export class ProcessesService {

  constructor(
    @InjectRepository(Process)
    private processesRepository: Repository<Process>,
  ) { }

  async create(createProcessDto: CreateProcessDto) {
    const newProcess = new Process();

    newProcess.jobTitle = createProcessDto.jobTitle;
    newProcess.companyName = createProcessDto.companyName;
    newProcess.appliedBy = createProcessDto.appliedBy;
    newProcess.jobDescription = createProcessDto.jobDescription;
    newProcess.interviewsSteps = createProcessDto.interviewsSteps;
    newProcess.startDate = new Date(Date.now());
    newProcess.status = 'Applied';
    newProcess.userId = createProcessDto.userId;

    const result = await this.processesRepository.save(newProcess);

    return result.id;
  }

  async findAllByUserId(id: string, skip: number = 0, take: number = 30) {
    const [processes, count] = await this.processesRepository.findAndCount({
      where: { user: { id } },
      relations: {
        steps: true
      },
      skip,
      take
    });

    const processesDto = processes.map(x => {
      const newProcessDto = new GetProcessDto();
      newProcessDto.id = x.id;
      newProcessDto.jobTitle = x.jobTitle;
      newProcessDto.companyName = x.companyName;
      newProcessDto.appliedBy = x.appliedBy;
      newProcessDto.jobDescription = x.jobDescription;
      newProcessDto.interviewsSteps = x.interviewsSteps;
      newProcessDto.startDate = x.startDate.valueOf();
      newProcessDto.status = x.status;
      newProcessDto.userId = x.userId;
      newProcessDto.finishDate = x.finishDate ? x.finishDate.valueOf() : null;
      newProcessDto.jobSchema = x.jobSchema;
      newProcessDto.location = x.location;
      newProcessDto.bonus = x.bonus;
      newProcessDto.salaryRange = x.salaryRange;
      newProcessDto.stockOptions = x.stockOptions;
      newProcessDto.techStack = x.techStack;
      newProcessDto.timeOff = x.timeOff;
      newProcessDto.amountOfSteps = x.steps.length;

      return newProcessDto;
    })

    return {
      metadata: {
        size: count
      },
      processes: processesDto
    };
  }

  async search(search: string, userId: string, skip: number = 0, take: number = 30) {
    const [processes, count] = await this.processesRepository.findAndCount({
      where: { user: { id: userId }, companyName: ILike(`%${search}%`) },
      skip,
      take,
      relations: {
        steps: true
      }
    });

    const processesDto = processes.map(x => {
      const newProcessDto = new GetProcessDto();
      newProcessDto.id = x.id;
      newProcessDto.jobTitle = x.jobTitle;
      newProcessDto.companyName = x.companyName;
      newProcessDto.appliedBy = x.appliedBy;
      newProcessDto.jobDescription = x.jobDescription;
      newProcessDto.interviewsSteps = x.interviewsSteps;
      newProcessDto.startDate = x.startDate.valueOf();
      newProcessDto.status = x.status;
      newProcessDto.userId = x.userId;
      newProcessDto.finishDate = x.finishDate ? x.finishDate.valueOf() : null;
      newProcessDto.jobSchema = x.jobSchema;
      newProcessDto.location = x.location;
      newProcessDto.bonus = x.bonus;
      newProcessDto.salaryRange = x.salaryRange;
      newProcessDto.stockOptions = x.stockOptions;
      newProcessDto.techStack = x.techStack;
      newProcessDto.timeOff = x.timeOff;
      newProcessDto.amountOfSteps = x.steps.length;

      return newProcessDto;
    })


    return {
      metadata: {
        size: count
      },
      processes: processesDto
    };
  }

  async findOne(id: string) {
    const process = await this.processesRepository.findOneBy({ id });

    const newProcessDto = new GetProcessDto();
    newProcessDto.id = process.id;
    newProcessDto.jobTitle = process.jobTitle;
    newProcessDto.companyName = process.companyName;
    newProcessDto.appliedBy = process.appliedBy;
    newProcessDto.jobDescription = process.jobDescription;
    newProcessDto.interviewsSteps = process.interviewsSteps;
    newProcessDto.startDate = process.startDate.valueOf();
    newProcessDto.status = process.status;
    newProcessDto.userId = process.userId;
    newProcessDto.finishDate = process.finishDate ? process.finishDate.valueOf() : null;
    newProcessDto.jobSchema = process.jobSchema;
    newProcessDto.location = process.location;
    newProcessDto.bonus = process.bonus;
    newProcessDto.salaryRange = process.salaryRange;
    newProcessDto.stockOptions = process.stockOptions;
    newProcessDto.techStack = process.techStack;
    newProcessDto.timeOff = process.timeOff;

    return newProcessDto;
  }

  async update(id: string, updateProcessDto: UpdateProcessDto) {

    const updatedProcess = new Process();

    updatedProcess.jobTitle = updateProcessDto.jobTitle;
    updatedProcess.companyName = updateProcessDto.companyName;
    updatedProcess.appliedBy = updateProcessDto.appliedBy;
    updatedProcess.jobDescription = updateProcessDto.jobDescription;
    updatedProcess.interviewsSteps = updateProcessDto.interviewsSteps;
    updatedProcess.startDate = new Date(updateProcessDto.startDate);
    updatedProcess.status = updateProcessDto.status;
    updatedProcess.userId = updateProcessDto.userId;
    updatedProcess.finishDate = updateProcessDto.finishDate ? new Date(updateProcessDto.finishDate) : null;
    updatedProcess.jobSchema = updateProcessDto.jobSchema;
    updatedProcess.location = updateProcessDto.location;
    updatedProcess.bonus = updateProcessDto.bonus;
    updatedProcess.salaryRange = updateProcessDto.salaryRange;
    updatedProcess.stockOptions = updateProcessDto.stockOptions;
    updatedProcess.techStack = updateProcessDto.techStack;
    updatedProcess.timeOff = updateProcessDto.timeOff;

    await this.processesRepository.update(
      id,
      updatedProcess
    );

    const updatedProcessDb = await this.processesRepository.findOne({
      where: { id },
      relations: {
        steps: true
      }
    });

    const newProcessDto = new GetProcessDto();
    newProcessDto.id = updatedProcessDb.id;
    newProcessDto.jobTitle = updatedProcessDb.jobTitle;
    newProcessDto.companyName = updatedProcessDb.companyName;
    newProcessDto.appliedBy = updatedProcessDb.appliedBy;
    newProcessDto.jobDescription = updatedProcessDb.jobDescription;
    newProcessDto.interviewsSteps = updatedProcessDb.interviewsSteps;
    newProcessDto.startDate = updatedProcessDb.startDate.valueOf();
    newProcessDto.status = updatedProcessDb.status;
    newProcessDto.userId = updatedProcessDb.userId;
    newProcessDto.finishDate = updatedProcessDb.finishDate ? updatedProcessDb.finishDate.valueOf() : null;
    newProcessDto.jobSchema = updatedProcessDb.jobSchema;
    newProcessDto.location = updatedProcessDb.location;
    newProcessDto.bonus = updatedProcessDb.bonus;
    newProcessDto.salaryRange = updatedProcessDb.salaryRange;
    newProcessDto.stockOptions = updatedProcessDb.stockOptions;
    newProcessDto.techStack = updatedProcessDb.techStack;
    newProcessDto.timeOff = updatedProcessDb.timeOff;
    newProcessDto.amountOfSteps = updatedProcessDb.steps.length;

    return newProcessDto;
  }

  remove(id: number) {
    return `This action removes a #${id} process`;
  }
}
