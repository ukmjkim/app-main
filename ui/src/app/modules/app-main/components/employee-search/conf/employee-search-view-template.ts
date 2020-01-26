import { RemoteSearchViewTemplate } from '@ukmjkim/aid-data-table';

export const sortDefault = [
  {'column': 'ownerLabel', 'state': 1, 'multisort': true}
];

export const employeeSearchViewTemplatesJson = {
  'Default': {
      predefined: true,
      columns: ['ownerLabel', 'ownerCode', 'sellerCompanyName',
        'sellerName', 'territoryManagerName', 'numberOfUnits', 'shootPrice',
        'salesHubContractNumber', 'salesHubContractType', 'contractStatus',
        'contractConfidential', 'currencyCode'],
      goTo: '',
      sortBy: sortDefault,
      filterBy: []
  }
};

export const EmployeeSearchDefaultColumnsMap = new Map<string, RemoteSearchViewTemplate>();

Object.keys(employeeSearchViewTemplatesJson).map(templateName => {
    const searchViewTemplate: RemoteSearchViewTemplate = Object.assign(Array(new RemoteSearchViewTemplate()), employeeSearchViewTemplatesJson[templateName]);
    EmployeeSearchDefaultColumnsMap.set(templateName, searchViewTemplate);
});
