import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { AidLoggerService } from '@ukmjkim/aid-lib-services';
import { ContentDataService } from '../services/content-data.service';
import { ContentDataType } from '../models/content-data-type.enum';
import { ContentDataItemDto } from '../models/content-data-item-dto';
import { CONTENT_DATA_EMPLOYEE_JSON_STRING } from './mock-content-data-employee';

@Injectable({
  providedIn: 'root'
})
export class MockContentDataService extends ContentDataService {
  constructor(private logger: AidLoggerService) {
    super();
  }

  setUXOnly(isUXOnly: boolean) {
    this.isUXOnly = isUXOnly;
  }

  getContentDataList(appInjector: Injector, contentDataType: ContentDataType): Observable<ContentDataItemDto[]> {
    return of(Object.assign([], CONTENT_DATA_EMPLOYEE_JSON_STRING))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  fetchMultipleContentDataList(contentDataTypeList: ContentDataType[], referenceId?: number): Observable<any[]> {
    return of([], CONTENT_DATA_EMPLOYEE_JSON_STRING)
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  submitContentData(isNew: boolean, contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto> {
    return of(Object.assign({}, contentDataItemDto))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }

  deleteContentData(contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto> {
    return of(Object.assign({}, contentDataItemDto))
      .pipe(
        delay(500),
        map(data => {
          return data;
        })
      );
  }
}
