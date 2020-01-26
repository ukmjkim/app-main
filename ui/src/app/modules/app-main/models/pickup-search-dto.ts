import { AidJsonMappingUtil, AidDateFormatPipe } from '@ukmjkim/aid-lib-services';
import { DataTableDataDto } from '@ukmjkim/aid-data-table';
import { PickupSubItem } from './pickup-sub-item';

export class PickupSearchDto implements DataTableDataDto {
    pickupId: number;
    saleNumber?: string;
    createdTS?: number;
    createdDateTime?: string;
    pickupDate?: string;
    timeslot?: number;
    numberOfItems?: number;
    status?: string;
    isExpress?: boolean;
    issues?: string;

    @AidJsonMappingUtil.deserializable(PickupSubItem) items?: PickupSubItem[];

    constructor() {
        this.pickupId = undefined;
        this.saleNumber = undefined;
        this.createdTS = undefined;
        this.createdDateTime = undefined;
        this.pickupDate = undefined;
        this.timeslot = undefined;
        this.numberOfItems = undefined;
        this.status = undefined;
        this.isExpress = undefined;
        this.issues = undefined;
    }

    public static constructFromSearchListJson(objectListJson: any): PickupSearchDto[] {
        let searchList: PickupSearchDto[] = [];

        if (!objectListJson) return searchList;

        const dateFormatPipe = new AidDateFormatPipe();
        for (let objectJson of objectListJson) {
            let itemDto: PickupSearchDto = PickupSearchDto.constructFromObjectJson(objectJson);
            itemDto.createdDateTime = dateFormatPipe.transform(itemDto.createdTS);
            searchList.push(itemDto);
        }

        return searchList;
    }

    public static constructFromObjectJson(objectJson: any): PickupSearchDto {
        return Object.assign(new PickupSearchDto(), objectJson);
    }

    getNew() {
        return new PickupSearchDto();
    }
}
