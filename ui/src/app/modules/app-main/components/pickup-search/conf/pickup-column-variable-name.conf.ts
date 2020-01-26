/* values defined here should match TitleIssueSearchDto */
export enum PickupColumnVariableName {
  pickupId = "pickupId",
  saleNumber = "saleNumber",
  createdTS = "createdTS",
  createdDateTime = "createdDateTime",
  pickupDate = "pickupDate",
  timeslot = "timeslot",
  numberOfItems = "numberOfItems",
  status = "status",
  isExpress = "isExpress",
  issues = "issues",
  itemEquipId = "itemEquipId",
  itemLotNumber = "itemLotNumber",
  itemAssetDescription = "itemAssetDescription",
  itemBuyerFullName = "itemBuyerFullName",
  itemBuyerPhone = "itemBuyerPhone",
  itemBuyerEmail = "itemBuyerEmail",
  itemBidderNumber = "itemBidderNumber",
  itemIssue = "itemIssue",
}

export const pickupSearchableFields = [
  "pickupId",
  "pickupDate",
  "status",
  "issues"
];

export const pickupDownloadFields = [
  { field: 'pickupId', header: 'Pickup #' },
  { field: 'saleNumber', header: 'Sale Numer' },
  { field: 'createdTS', header: 'PO Date' },
  { field: 'pickupDate', header: 'Date' },
  { field: 'timeslot', header: 'Timeslot' },
  { field: 'requester', header: 'PO Creator' },
  { field: 'numberOfItems', header: '# of Lots' },
  { field: 'status', header: 'Status' },
  { field: 'serverStatus', header: 'Oracle Status' },
  { field: 'isExpress', header: 'Express' },
  { field: 'issues', header: 'issues' },
  { field: 'itemEquipId', header: 'EquipId' },
  { field: 'itemLotNumber', header: 'LotNumber' },
  { field: 'itemAssetDescription', header: 'Asset Description' },
  { field: 'itemBuyerFullName', header: 'Buyer FullName' },
  { field: 'itemBuyerPhone', header: 'Buyer Phone' },
  { field: 'itemBuyerEmail', header: 'Buye rEmail' },
  { field: 'itemBidderNumber', header: 'Bidder Number' },
  { field: 'itemIssue', header: 'Issue' }
]
