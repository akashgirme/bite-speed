import { Injectable } from '@nestjs/common';
import { ContactDto, ContactResponseDto, CreateContactDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities';
import { Repository } from 'typeorm';
import { LinkPrecedence } from './enum';

@Injectable()
export class IndentityService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}

  async createContact({
    email,
    phoneNumber,
  }: CreateContactDto): Promise<ContactResponseDto> {
    const contact = this.contactRepo.create({
      email,
      phoneNumber,
      linkedId: null,
      linkPrecedence: LinkPrecedence.PRIMARY,
    });

    const duplicate = await this.contactRepo
      .createQueryBuilder('contact')
      .select('contact')
      .where('contact.linkPrecedence = :linkPrecedence', {
        linkPrecedence: LinkPrecedence.PRIMARY,
      })
      .andWhere(
        '(contact.email = :email OR contact.phoneNumber = :phoneNumber)',
        { email, phoneNumber },
      )
      .getOne();

    if (duplicate) {
      contact.linkedId = duplicate.id;
      contact.linkPrecedence = LinkPrecedence.SECONDARY;
    }

    await this.contactRepo.save(contact);

    return await this.getPrimaryContactDetails(email, phoneNumber);
  }

  async getPrimaryContactDetails(email: string, phoneNumber: string) {
    const primaryContact = await this.contactRepo
      .createQueryBuilder('contact')
      .select('contact')
      .where('contact.linkPrecedence = :linkPrecedence', {
        linkPrecedence: LinkPrecedence.PRIMARY,
      })
      .andWhere(
        '(contact.email = :email OR contact.phoneNumber = :phoneNumber)',
        { email, phoneNumber },
      )
      .getOne();

    const secondaryContacts = await this.contactRepo
      .createQueryBuilder('contact')
      .where('contact.linkedId = :primaryContactId', {
        primaryContactId: primaryContact.id,
      })
      .andWhere('contact.linkPrecedence = :linkPrecedence', {
        linkPrecedence: LinkPrecedence.SECONDARY,
      })
      .getMany();

    const emails = new Set<string>([primaryContact.email]);
    const phoneNumbers = new Set<string>([primaryContact.phoneNumber]);
    const secondaryContactIds: number[] = [];

    secondaryContacts.forEach((contact) => {
      if (contact.email) {
        emails.add(contact.email);
      }
      if (contact.phoneNumber) {
        phoneNumbers.add(contact.phoneNumber);
      }
      secondaryContactIds.push(contact.id);
    });

    const contact: ContactDto = {
      primaryContactId: primaryContact.id,
      emails: Array.from(emails).filter(Boolean),
      phoneNumbers: Array.from(phoneNumbers).filter(Boolean),
      secondaryContactIds,
    };

    return { contact };
  }

  getAllContacts(): Promise<Contact[]> {
    return this.contactRepo.find();
  }
}
