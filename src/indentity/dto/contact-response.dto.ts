import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty()
  primaryContactId: number;

  @ApiProperty({ type: [String] })
  emails: string[];

  @ApiProperty({ type: [String] })
  phoneNumbers: string[];

  @ApiProperty({ type: [Number] })
  secondaryContactIds: number[];
}

export class ContactResponseDto {
  @ApiProperty({ type: () => ContactDto })
  contact: ContactDto;
}
