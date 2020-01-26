import { Injectable } from '@angular/core';
import { FilterTextRangeService } from '@ukmjkim/aid-data-table';

@Injectable()
export class FilterTextRangeOwnerCodeService extends FilterTextRangeService {

  constructor() {
    super();
  }

  validateTextRange(textMin: string, textMax: string): boolean {
    const textRangeMinChar = textMin.substr(0, 1);
    const textRangeMinNum = textMin.substr(1, 2);

    const textRangeMaxChar = textMax.substr(0, 1);
    const textRangeMaxNum = textMax.substr(1, 2);

    if (textRangeMinNum > textRangeMaxNum) {
      return false;
    } else if (textRangeMinNum === textRangeMaxNum && textRangeMinChar > textRangeMaxChar) {
      return false;
    }

    return true;
  }
}
