import { ApiProperty } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty()
  primaryContactId: number;

  @ApiProperty({ type: [String] })
  emails: string[];

  @ApiProperty({ type: [String] })
  phoneNumbers: string[];

  @ApiProperty({ type: [Number] })
  secondaryContactIds: number[];
}
