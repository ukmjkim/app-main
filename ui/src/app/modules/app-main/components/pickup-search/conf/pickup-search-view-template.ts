import { RemoteSearchViewTemplate } from '@ukmjkim/aid-data-table';

export const sortDefault = [
    { 'column': 'pickupId', 'state': 2, 'multisort': false }
];

export const pickupSearchViewTemplatesJson = {
    'Default': {
        predefined: true,
        columns: ['pickupId', 'createdTS', 'pickupDate', 'timeslot', 'numberOfItems', 'status', 'isExpress', 'issues'],
        goTo: '',
        sortBy: sortDefault,
        filterBy: []
    },
    'Event': {
        predefined: true,
        columns: ['pickupId', 'createdTS', 'pickupDate', 'timeslot', 'numberOfItems', 'status', 'isExpress', 'issues'],
        goTo: '',
        sortBy: sortDefault,
        filterBy: []
    }
};

export const PickupSearchDefaultColumnsMap = new Map<string, RemoteSearchViewTemplate>();

Object.keys(pickupSearchViewTemplatesJson).map(templateName => {
    let searchViewTemplate: RemoteSearchViewTemplate = Object.assign(Array(new RemoteSearchViewTemplate()), pickupSearchViewTemplatesJson[templateName]);
    PickupSearchDefaultColumnsMap.set(templateName, searchViewTemplate);
});
