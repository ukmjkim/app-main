import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContentDataType } from '../models/content-data-type.enum';
import { ContentDataItemDto } from '../models/content-data-item-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class ContentDataService {
  protected isUXOnly = false;

  protected constructor() { }

  abstract setUXOnly(isUXOnly: boolean);
  abstract getContentDataList(appInjector: Injector, contentDataType: ContentDataType): Observable<ContentDataItemDto[]>;
  abstract fetchMultipleContentDataList(contentDataTypeList: ContentDataType[], referenceId?: number): Observable<any[]>;
  abstract submitContentData(isNew: boolean, contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto>;
  abstract deleteContentData(contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto>;
}
