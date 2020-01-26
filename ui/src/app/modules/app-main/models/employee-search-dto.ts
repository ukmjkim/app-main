import { AidJsonMappingUtil, AidDateFormatPipe } from '@ukmjkim/aid-lib-services';
import { DataTableDataDto } from '@ukmjkim/aid-data-table';

export class EmployeeSearchDto implements DataTableDataDto {
  id: number;
  salesHubContract: string;
  salesHubContractNumber: string;
  salesHubContractUrl: string;
  salesHubContractType: string;
  dashboardContractType: string;
  ownerCode: string;
  ownerLabel: string;
  sellerName: string;
  sellerCompanyName: string;
  numberOfUnits: number;
  totalNumberOfUnits: number;
  shootPrice: number;
  contractStatus: string;
  territoryManagerName: string;
  sellerId: number;
  currencyCode: string;
  contractConfidential: boolean;

  public static constructFromSearchListJson(objectListJson: any[]): EmployeeSearchDto[] {
    let searchList: EmployeeSearchDto[] = [];

    if (!objectListJson) {
      return searchList
    }

    const dateFormatPipe = new AidDateFormatPipe();
    for (const objectJson of objectListJson) {
      const itemDto: EmployeeSearchDto = EmployeeSearchDto.constructFromObjectJson(objectJson);
      searchList.push(itemDto);
    }

    return searchList;
  }

  public static constructFromObjectJson(objectJson: any): EmployeeSearchDto {
    return Object.assign(new EmployeeSearchDto(), objectJson);
  }

  getNew() {
    return new EmployeeSearchDto();
  }
}
