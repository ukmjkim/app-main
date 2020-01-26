import { EmployeeSearchDto } from './employee-search-dto';

export class EmployeeSearchResultDto {
    totalResults: number;
    contracts: EmployeeSearchDto[];
}
