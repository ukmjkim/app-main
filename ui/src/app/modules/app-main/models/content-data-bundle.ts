import { ContentDataType } from './content-data-type.enum';
import { ContentDataItemDto } from './content-data-item-dto';

export interface ContentDataBundle {
  contentDataType: ContentDataType;
  contentDataItemDto: ContentDataItemDto;
}
