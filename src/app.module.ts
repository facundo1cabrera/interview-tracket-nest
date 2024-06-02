import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessesModule } from './processes/processes.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProcessesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
