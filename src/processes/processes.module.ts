import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';

@Module({
  controllers: [ProcessesController],
  providers: [ProcessesService],
  imports: [TypeOrmModule.forFeature([Process])]
})
export class ProcessesModule {}
