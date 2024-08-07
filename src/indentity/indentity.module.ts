import { Module } from '@nestjs/common';
import { IndentityService } from './indentity.service';
import { IndentityController } from './indentity.controller';

@Module({
  controllers: [IndentityController],
  providers: [IndentityService],
})
export class IndentityModule {}
