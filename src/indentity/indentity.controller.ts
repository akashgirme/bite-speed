import { Controller } from '@nestjs/common';
import { IndentityService } from './indentity.service';

@Controller('indentity')
export class IndentityController {
  constructor(private readonly indentityService: IndentityService) {}
}
