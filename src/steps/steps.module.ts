import { Module } from '@nestjs/common';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [StepsController],
  providers: [StepsService],
  imports: [TypeOrmModule.forFeature([Step]), AuthModule]
})
export class StepsModule {}
