import { Address } from './address';

export class SiteHeadOfficeDto {
  headOfficeName: string;
  headOfficeContactId: number;
  headOfficeId: number;
  isActive: boolean;
  headOfficeStatus: string;
  headOfficeContact: Address;

  public static fromJson(headOfficeJson): SiteHeadOfficeDto {
    const siteHeadOffice: SiteHeadOfficeDto = Object.assign(new SiteHeadOfficeDto(), headOfficeJson);
    if (headOfficeJson.headOfficeContact) {
      siteHeadOffice.headOfficeContact = Object.assign(new Address(), headOfficeJson.headOfficeContact);
    }
    return siteHeadOffice;
  }
}
