import { AidJsonMappingUtil } from '@ukmjkim/aid-lib-services';
import { ContactDto } from './contact-dto';
import { SiteInfoDto } from './site-info-dto';
import { EmployeeCostItemDto } from './employee-cost-item-dto';

export class Employee {
  contractId?: number;
  auctionEventId?: number;
  saleOwnerId?: number;
  confidential?: string;
  auctionName?: string;
  saleNumber?: string;
  eventStartTS?: number;
  ownerCode?: string;
  salesHubContractId?: string;
  salesHubContractUrl?: string;
  printedByUserId?: number;
  printedByUserName?: string;
  printedOnTimestamp?: number;
  totalPages?: number;
  currentPage?: number;
  totalCost?: number;
  totalCostPO?: number;
  totalCredit?: number;
  totalCreditPO?: number;
  totalAmount?: number;
  budget?: number;

  @AidJsonMappingUtil.deserializable(EmployeeCostItemDto) items?: EmployeeCostItemDto;
  @AidJsonMappingUtil.deserializable(SiteInfoDto) site?: SiteInfoDto;
  @AidJsonMappingUtil.deserializable(ContactDto) seller?: ContactDto;
  @AidJsonMappingUtil.deserializable(ContactDto) tm?: ContactDto;

  constructor() {
    this.contractId = undefined;
    this.auctionEventId = undefined;
    this.saleOwnerId = undefined;
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
    this.totalCost = undefined;
    this.totalCredit = undefined;
    this.totalAmount = undefined;
    this.items = undefined;
    this.site = undefined;
    this.tm = undefined;
  }

  public static constructFromJson(json): Employee {
    const sellerCostPrintFormDto: Employee = Object.assign(Employee, json);
    return sellerCostPrintFormDto;
  }
}

