import { LocalColumnDefinition, LocalColumnDefinitionsAsArray, SortPredicates } from '@ukmjkim/aid-data-table';

export const COLUMNS = {
  id: new LocalColumnDefinition(
    'id', SortPredicates.Natural(item => item.id)
  ),
  noteInfo: new LocalColumnDefinition(
    'noteInfo', SortPredicates.Natural(item => item.noteInfo)
  ),
  created: new LocalColumnDefinition(
    'created', SortPredicates.Natural(item => item.createdByUser + ' on ' + item.createdDateTimestamp)
  )
};

export const COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(COLUMNS);
