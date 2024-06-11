import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StepsService } from './steps.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateStepDto } from './dto/create-step.dto';
import { User } from 'src/auth/entities/user.entity';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Post()
  @Auth()
  async create(@Body() createStepDto: CreateStepDto,
    @GetUser() user: User
  ) {
    return await this.stepsService.create(createStepDto);
  }

  @Put(":id")
  @Auth()
  async update(@Body() updateStepDto: UpdateStepDto,
    @Param('id') id: string
  ) {
      return await this.stepsService.update(id, updateStepDto);
  }

  @Get('byProcess/:id')
  @Auth()
  async findAll(@Param('id') id: string) {
    return await this.stepsService.findAllByProcessId(id);
  }

  @Delete(':id')
  @Auth()
  async remove(@Param('id') id: string) {
    return await this.stepsService.remove(id);
  }
}
