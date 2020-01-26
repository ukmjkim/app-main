import { PickupSearchDto } from './pickup-search-dto';

export class PickupSearchResultDto {
    totalResults: number;
    pickups: PickupSearchDto[];
}
