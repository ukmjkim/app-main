export enum EmployeeSearchColumnVariableName {
  id = 'id',
  salesHubContract = 'salesHubContractId',
  salesHubContractNumber = 'salesHubContractNumber',
  salesHubContractUrl = 'salesHubContractUrl',
  salesHubContractType = 'salesHubContractType',
  dashboardContractType = 'dashboardContractType',
  ownerCode = 'ownerCode',
  ownerLabel = 'ownerLabel',
  sellerName = 'sellerName',
  sellerCompanyName = 'sellerCompanyName',
  numberOfUnits = 'numberOfUnits',
  totalNumberOfUnits = 'totalNumberOfUnits',
  shootPrice = 'shootPrice',
  contractStatus = 'contractStatus',
  contractConfidential = 'contractConfidential',
  territoryManagerName = 'territoryManagerName',
  sellerId = 'sellerId',
  currencyCode = 'currencyCode'
}

export const employeeSearchableFields = [
  'salesHubContractType',
  'dashboardContractType',
  'ownerCode',
  'sellerName',
  'sellerCompanyName',
  'contractStatus',
  'territoryManagerName'
];


export const employeeDownloadFields = [
  { field: 'id', header: 'ID' },
  { field: 'ownerCode', header: 'Owner Code' },
  { field: 'sellerName', header: 'Seller Name' },
  { field: 'sellerCompanyName', header: 'Company Name' },
  { field: 'territoryManagerName', header: 'TM' },
  { field: 'salesHubContractNumber', header: 'Contract Number' },
  { field: 'salesHubContractType', header: 'Contract Type' },
  { field: 'dashboardContractType', header: 'Dashboard Type' },
  { field: 'numberOfUnits', header: 'Units in Event' },
  { field: 'totalNumberOfUnits', header: 'Total Units' },
  { field: 'shootPrice', header: 'Shoot Price' },
  { field: 'contractStatus', header: 'Contract Status' },
  { field: 'contractConfidential', header: 'Confidential' },
  { field: 'currencyCode', header: 'Currency' }
];
