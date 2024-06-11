import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesModule } from './processes/processes.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProcessesModule,
    AuthModule,
    StepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
