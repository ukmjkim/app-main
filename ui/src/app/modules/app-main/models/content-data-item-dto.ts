import { AidJsonMappingUtil, AidDateFormatPipe } from '@ukmjkim/aid-lib-services';

export class ContentDataItemDto {
  accountNumber: string;
  accountingManagerId: number;
  acres: number;
  action: string;
  bagId: number;
  createdDateTime: number;
  contactId: number;
  desiredMoisture: number;
  downtimeEndDateTime: string;
  downtimeStartDateTime: string;
  dropoffDateTime: string;
  dryWeight: number;
  dryerId: number;
  dryingDateTime: string;
  dryingOrderId: number;
  dryingTime: number;
  dryshopManagerId: number;
  email: string;
  employeeId: number;
  farmId: number;
  farmName: string;
  firstName: string;
  homePhone: string;
  id: number;
  inWarehouseDateTime: string;
  isActive: boolean;
  isChopNeeded: boolean;
  isTestPassed: boolean;
  labSupervisorId: number;
  labTechnicianId: number;
  lastName: string;
  loginName: string;
  mobilePhone: string;
  moisture: number;
  name: string;
  note: string;
  odaLicenseNumber: string;
  officePhone: string;
  password: string;
  phone: string;
  productBreed: string;
  productionManagerId: number;
  productionSupervisorId: number;
  reason: string;
  releaseOrderId: number;
  roleId: number;
  roomMoisture: number;
  roomTemperature: number;
  saleManagerId: number;
  sample: string;
  shiftName: string;
  shippingDateTime: string;
  status: string;
  storageZone: string;
  tagColor: string;
  testDateTime: string;
  testingTemperature: number;
  truckLicensePlate: string;
  warehouseHandlerId: number;
  weightAfterDrying: number;
  weightBeforeDrying: number;
  workDate: number;
  workShiftId: number;
  workedHours: number;

  testedMoisture: number;
  totalBags: number;
  totalWeight: number;

  keyAccountingManager: string;
  keyBag: string;
  keyContact: string;
  keyDryer: string;
  keyDryingOrder: string;
  keyDryshopManager: string;
  keyEmployee: string;
  keyFarm: string;
  keyLabSupervisor: string;
  keyLabTechnician: string;
  keyProductionManager: string;
  keyProductionSupervisor: string;
  keyReleaseOrder: string;
  keyRole: string;
  keySaleManager: string;
  keyWarehouseHandler: string;
  keyWorkShift: string;

  site: string;
  event: string;
  lotRangeFrom: string;
  lotRangeTo: string;
  cucurrentPickups: string;
  blockAdjacentLots: string;
  loadingTime: string;
  
  constructor() {
    this.id = undefined;
  }

  public static constructFromContentDataItemListJson(listJson: any[]): ContentDataItemDto[] {
    const contentDataItemList: ContentDataItemDto[] = [];

    if (!listJson) return contentDataItemList;

    const dateFormatPipe = new AidDateFormatPipe();
    for (const itemJson of listJson) {
      const contentDataItemDto: ContentDataItemDto = ContentDataItemDto.constructFromContentDataItemJson(itemJson, dateFormatPipe);
      contentDataItemList.push(contentDataItemDto);
    }

    return contentDataItemList;
  }

  public static constructFromContentDataItemJson(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): ContentDataItemDto {
    const contentDataItemDto: ContentDataItemDto = Object.assign(new ContentDataItemDto(), contentDataItemJson);

    contentDataItemDto.keyAccountingManager = contentDataItemJson.accountingManagerId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.accountingManager, dateFormatPipe) : '';
    contentDataItemDto.keyLabSupervisor = contentDataItemJson.labSupervisorId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.labSupervisor, dateFormatPipe) : '';
    contentDataItemDto.keyLabTechnician = contentDataItemJson.labTechnicianId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.labTechnician, dateFormatPipe) : '';
    contentDataItemDto.keyProductionManager = contentDataItemJson.productionManagerId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.productionManager, dateFormatPipe) : '';
    contentDataItemDto.keyProductionSupervisor = contentDataItemJson.productionSupervisorId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.productionSupervisor, dateFormatPipe) : '';
    contentDataItemDto.keySaleManager = contentDataItemJson.saleManagerId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.saleManager, dateFormatPipe) : '';
    contentDataItemDto.keyWarehouseHandler = contentDataItemJson.warehouseHandlerId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.warehouseHandler, dateFormatPipe) : '';
    contentDataItemDto.keyDryshopManager = contentDataItemJson.dryshopManagerId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.dryshopManager, dateFormatPipe) : '';
    contentDataItemDto.keyEmployee = contentDataItemJson.employeeId ? ContentDataItemDto.getKeyEmployee(contentDataItemJson.employee, dateFormatPipe) : '';

    contentDataItemDto.keyContact = contentDataItemJson.contactId ? ContentDataItemDto.getKeyContact(contentDataItemJson.contact, dateFormatPipe) : '';

    contentDataItemDto.keyBag = contentDataItemJson.bagId ? ContentDataItemDto.getKeyBag(contentDataItemJson.bag, dateFormatPipe) : '';
    contentDataItemDto.keyDryer = contentDataItemJson.dryerId ? ContentDataItemDto.getKeyDryer(contentDataItemJson.dryer, dateFormatPipe) : '';
    contentDataItemDto.keyDryingOrder = contentDataItemJson.dryingOrderId ? ContentDataItemDto.getKeyDryingOrder(contentDataItemJson.dryingOrder, dateFormatPipe) : '';
    contentDataItemDto.keyFarm = contentDataItemJson.farmId ? ContentDataItemDto.getKeyFarm(contentDataItemJson.farm, dateFormatPipe) : '';
    contentDataItemDto.keyReleaseOrder = contentDataItemJson.releaseOrderId ? ContentDataItemDto.getKeyReleaseOrder(contentDataItemJson.releaseOrder, dateFormatPipe) : '';
    contentDataItemDto.keyRole = contentDataItemJson.roleId ? ContentDataItemDto.getKeyRole(contentDataItemJson.role, dateFormatPipe) : '';
    contentDataItemDto.keyWorkShift = contentDataItemJson.workShiftId ? ContentDataItemDto.getKeyWorkShift(contentDataItemJson.workShift, dateFormatPipe) : '';

    contentDataItemDto.testedMoisture = ContentDataItemDto.getTestedMoisture(contentDataItemJson, dateFormatPipe);
    contentDataItemDto.totalBags = ContentDataItemDto.getTotalBags(contentDataItemJson, dateFormatPipe);
    contentDataItemDto.totalWeight = ContentDataItemDto.getTotalWeight(contentDataItemJson, dateFormatPipe);


    return contentDataItemDto;
  }

  public static getTotalBags(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): number {
    if (contentDataItemJson.releaseOrderBags && contentDataItemJson.releaseOrderBags instanceof Array) {
      return contentDataItemJson.releaseOrderBags.length;
    }
    return 0;
  }

  public static getTotalWeight(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): number {
    if (contentDataItemJson.releaseOrderBags && contentDataItemJson.releaseOrderBags instanceof Array) {
      return contentDataItemJson.releaseOrderBags.filter(bag => bag.bag && bag.bag.dryWeight).map(bag => bag.bag.dryWeight).reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  public static getTestedMoisture(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): number {
    return contentDataItemJson.testingCOALogs && contentDataItemJson.testingCOALogs[0] ? contentDataItemJson.testingCOALogs[0].moisture : -1;
  }

  public static getKeyEmployee(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.firstName + ' ' + contentDataItemJson.lastName;
  }

  public static getKeyContact(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.firstName + ' ' + contentDataItemJson.lastName;
  }

  public static getKeyBag(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.name;
  }

  public static getKeyDryer(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.name;
  }

  public static getKeyDryingOrder(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.farm.farmName + ' ' + dateFormatPipe.transformDate(contentDataItemJson.createdDateTime);
  }

  public static getKeyFarm(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.farmName;
  }

  public static getKeyReleaseOrder(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.farm.farmName + ' ' + dateFormatPipe.transformDate(contentDataItemJson.createdDateTime);
  }

  public static getKeyRole(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return contentDataItemJson.name;
  }

  public static getKeyWorkShift(contentDataItemJson: any, dateFormatPipe: AidDateFormatPipe): string {
    return ContentDataItemDto.getDateOnly(contentDataItemJson.workDate) + ' > ' + contentDataItemJson.shiftName + ' > ' + contentDataItemJson.productionSupervisor.firstName + ' ' + contentDataItemJson.productionSupervisor.lastName;
  }

  public static getDateOnly(datetime: string) {
    return datetime.length > 10 ? datetime.substring(0, 10) : datetime;
  }
}
