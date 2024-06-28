import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, ForbiddenException, Put, BadRequestException, Query } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { SearchProcessDto } from './dto/search-process.dto';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) { }

  @Post()
  @Auth()
  async create(@Body() createProcessDto: CreateProcessDto,
    @GetUser() user: User
  ) {

    if (createProcessDto.userId !== user.id)
      throw new ForbiddenException();

    return await this.processesService.create(createProcessDto);
  }

  @Put(":id")
  @Auth()
  async update(@Body() updateProcessDto: UpdateProcessDto,
    @GetUser() user: User,
    @Param('id') id: string
  ) {
    if (updateProcessDto.userId !== user.id)
      throw new ForbiddenException();

      return await this.processesService.update(id, updateProcessDto);
  }

  @Get('byUser/:id')
  @Auth()
  async findAll(@Param('id') id: string, @GetUser() user: User, @Query('skip') skip: number = 0, @Query('take') take: number = 30) {
    if (id !== user.id)
      throw new ForbiddenException();

    return await this.processesService.findAllByUserId(user.id, skip, take);
  }

  @Post('search')
  @Auth()
  async search(@Body() SearchProcessDto: SearchProcessDto, @GetUser() user: User, @Query('skip') skip: number = 0, @Query('take') take: number = 30) {
    return await this.processesService.search(SearchProcessDto.search, user.id, skip, take);
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    if (!id)
      throw new BadRequestException();
    return await this.processesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processesService.remove(+id);
  }
}
