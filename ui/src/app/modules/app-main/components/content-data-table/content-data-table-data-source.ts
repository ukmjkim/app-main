import { LocalColumnDefinition, LocalDataTableDataSource } from '@ukmjkim/aid-data-table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ContentDataItemDto } from '../../models/content-data-item-dto';

export class ContentDataTableDataSource extends LocalDataTableDataSource<ContentDataItemDto> {
    private _loading = new BehaviorSubject<boolean>(false);
    private _loadedData: ContentDataItemDto[] = [];
    private _localFilter: string;

    constructor(readonly columns: LocalColumnDefinition<ContentDataItemDto>[]) {
        super(columns);
    }

    setLoadedData(loadedData: ContentDataItemDto[]) {
        this._loadedData = loadedData;
        this.setData(loadedData);
    }

    setLocalFilter(filter: string) {
        this._localFilter = filter;
        this.applyFilteredData();
    }

    isRowExpandable(row: ContentDataItemDto, idx: number) {
        return true;
    }

    identify(row: ContentDataItemDto): any {
        return row.id;
    }

    public getFilteredData(): ContentDataItemDto[] {
      return this.filterDataset();
    }

    private applyFilteredData() {
        const filteredData = this.filterDataset();
        this.setData(filteredData);
    }

    private filterDataset(): ContentDataItemDto[] {
      let filteredData = this._loadedData.slice();

      if (this._localFilter !== null && this._localFilter !== undefined && this._localFilter !== '') {
          const normalizedFilter = this._localFilter.toLowerCase().trim();

          filteredData = this._loadedData.filter(item => {
            if (item) {
                const filterResults: boolean[] = [];
                if (item.accountNumber) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.accountNumber));
                if (item.action) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.action));
                if (item.email) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.email));
                if (item.farmName) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.farmName));
                if (item.firstName) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.firstName));
                if (item.homePhone) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.homePhone));
                if (item.lastName) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.lastName));
                if (item.loginName) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.loginName));
                if (item.mobilePhone) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.mobilePhone));
                if (item.name) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.name));
                if (item.note) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.note));
                if (item.odaLicenseNumber) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.odaLicenseNumber));
                if (item.officePhone) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.officePhone));
                if (item.phone) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.phone));
                if (item.productBreed) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.productBreed));
                if (item.reason) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.reason));
                if (item.sample) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.sample));
                if (item.shiftName) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.shiftName));
                if (item.status) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.status));
                if (item.storageZone) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.storageZone));
                if (item.tagColor) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.tagColor));
                if (item.truckLicensePlate) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.truckLicensePlate));

                if (item.keyAccountingManager) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyAccountingManager));
                if (item.keyContact) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyContact));
                if (item.keyDryshopManager) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyDryshopManager));
                if (item.keyEmployee) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyEmployee));
                if (item.keyLabSupervisor) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyLabSupervisor));
                if (item.keyLabTechnician) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyLabTechnician));
                if (item.keyProductionManager) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyProductionManager));
                if (item.keyProductionSupervisor) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyProductionSupervisor));
                if (item.keySaleManager) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keySaleManager));
                if (item.keyWarehouseHandler) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyWarehouseHandler));

                if (item.keyBag) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyBag));
                if (item.keyDryer) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyDryer));
                if (item.keyDryingOrder) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyDryingOrder));
                if (item.keyFarm) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyFarm));
                if (item.keyReleaseOrder) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyReleaseOrder));
                if (item.keyRole) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyRole));
                if (item.keyWorkShift) filterResults.push(this.doesMatchLocalFilter(normalizedFilter, item.keyWorkShift));

                return filterResults.some(val => val);
            }
            return false;
        });
      }

      return filteredData;
    }

    private doesMatchLocalFilter(filter: string, field: string) {
        return field && (field.toLowerCase().trim().indexOf(filter) >= 0);
    }
}
