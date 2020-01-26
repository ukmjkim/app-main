import { AidJsonMappingUtil } from '@ukmjkim/aid-lib-services';
import { EmployeeCostPrintFormItemDto } from './employee-cost-print-form-item-dto';
import { SiteInfoDto } from './site-info-dto';
import { ContactDto } from './contact-dto';

export class EmployeeCostPrintFormDto {
  contractId?: number;
  auctionName?: string;
  saleNumber?: string;
  eventStartTS?: number;
  ownerCode?: string;
  salesHubContractId?: string;
  printedByUserId?: number;
  printedByUserName?: string;
  printedOnTimestamp?: number;
  totalPages?: number;
  currentPage?: number;
  totalAmount?: number;

  @AidJsonMappingUtil.deserializable(EmployeeCostPrintFormItemDto) items?: EmployeeCostPrintFormItemDto;
  @AidJsonMappingUtil.deserializable(SiteInfoDto) site?: SiteInfoDto;
  @AidJsonMappingUtil.deserializable(ContactDto) seller?: ContactDto;

  constructor() {
    this.contractId = undefined;
    this.auctionName = undefined;
    this.saleNumber = undefined;
    this.eventStartTS = undefined;
    this.ownerCode = undefined;
    this.salesHubContractId = undefined;
    this.printedByUserId = undefined;
    this.printedByUserName = undefined;
    this.printedOnTimestamp = undefined;
    this.totalPages = undefined;
    this.currentPage = undefined;
    this.site = undefined;
    this.seller = undefined;
    this.totalAmount = undefined;
  }

  public static constructFromJson(json): EmployeeCostPrintFormDto {
    const sellerCostPrintFormDto: EmployeeCostPrintFormDto = Object.assign(EmployeeCostPrintFormDto, json);
    return sellerCostPrintFormDto;
  }
}

