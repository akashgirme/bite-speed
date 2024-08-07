import { Body, Controller, Get, Post } from '@nestjs/common';
import { IndentityService } from './indentity.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ContactResponseDto, CreateContactDto } from './dto';
import { Contact } from './entities';

@Controller('indentity')
export class IndentityController {
  constructor(private readonly indentityService: IndentityService) {}

  @Post('/')
  @ApiOkResponse({ type: () => ContactResponseDto })
  createContact(
    @Body() body: CreateContactDto,
  ): Promise<{ contact: ContactResponseDto }> {
    return this.indentityService.createContact(body);
  }

  @Get('/all-contacts')
  @ApiOkResponse({ type: [Contact] })
  getAllContacts(): Promise<Contact[]> {
    return this.indentityService.getAllContacts();
  }
}
