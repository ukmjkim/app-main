import { Address } from './address';
import { SiteHeadOfficeDto } from './site-head-office-dto';

export class SiteInfoDto {
  id?: number;
  name?: string;
  address?: Address;
  siteHeadOfficeDto?: SiteHeadOfficeDto;
  defaultCurrency?: string;
  taxNumberDisplay?: string;
}
