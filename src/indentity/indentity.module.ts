import { Module } from '@nestjs/common';
import { IndentityService } from './indentity.service';
import { IndentityController } from './indentity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [IndentityController],
  providers: [IndentityService],
})
export class IndentityModule {}
