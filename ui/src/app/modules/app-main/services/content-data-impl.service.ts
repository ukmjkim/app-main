import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AidLoggerService, AidHttpOptions, AidJsonMappingUtil, AidHttpErrorHandler } from '@ukmjkim/aid-lib-services';
import { HttpRequestErrorHandler } from '../shared/utils/http-request-error-handler';
import { ContentDataService } from './content-data.service';
import { ContentDataType } from '../models/content-data-type.enum';
import { ContentDataItemDto } from '../models/content-data-item-dto';
import { MockContentDataService } from '../mocks/mock-content-data.service';

@Injectable({
    providedIn: 'root'
})
export class ContentDataServiceImpl extends ContentDataService {

    constructor(private http: HttpClient, private logger: AidLoggerService) {
        super();
    }

    setUXOnly(isUXOnly: boolean) {
      this.isUXOnly = isUXOnly;
    }

    getContentDataList(appInjector: Injector, contentDataType: ContentDataType): Observable<ContentDataItemDto[]> {
      if (this.isUXOnly) {
        return new MockContentDataService(this.logger).getContentDataList(appInjector, contentDataType);
      }

      console.log('getContentDataList', contentDataType.getOrPostUrl);
      const searchUri = contentDataType.getOrPostUrl;
      return this.http.get(searchUri)
      .pipe(
          map(json => Object.assign([], json)),
          catchError(HttpRequestErrorHandler.handleError(appInjector, 'getContentDataList', null))
      );
    }

    fetchMultipleContentDataList(contentDataTypeList: ContentDataType[], id?: number): Observable<any[]> {
      const httpList = contentDataTypeList.map(contentDataType => {
        let url = contentDataType.getOrPostUrl;
        if (id) {
          url = contentDataType.getOrPostUrl.replace(':id', id.toString());
        }
        return this.http.get(url, AidHttpOptions.json());
      });

      return forkJoin(httpList);
    }

    submitContentData(isNew: boolean, contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto> {
      let url;
      if (isNew) {
        url = contentDataType.getOrPostUrl;
        return this.http.post(url, contentDataItemDto, AidHttpOptions.json())
        .pipe(
          map(json => AidJsonMappingUtil.deserialize(ContentDataItemDto, json)),
          catchError((err: any, caught: Observable<ContentDataItemDto>) => {
            return Observable.throw(err);
          })
        );
      } else {
        url = contentDataType.putOrDeleteUrl.replace(':id', contentDataItemDto.id.toString());
        return this.http.put(url, contentDataItemDto, AidHttpOptions.json())
        .pipe(
          map(json => AidJsonMappingUtil.deserialize(ContentDataItemDto, json)),
          catchError((err: any, caught: Observable<ContentDataItemDto>) => {
            return Observable.throw(err);
          })
        );
      }
    }

    deleteContentData(contentDataType: ContentDataType, contentDataItemDto: ContentDataItemDto): Observable<ContentDataItemDto> {
      const url = contentDataType.putOrDeleteUrl.replace(':id', contentDataItemDto.id.toString());
      return this.http.delete(url)
      .pipe(
        map(json => AidJsonMappingUtil.deserialize(ContentDataItemDto, json)),
        catchError((err: any, caught: Observable<ContentDataItemDto>) => {
          return Observable.throw(err);
        })
      );
    }
}
