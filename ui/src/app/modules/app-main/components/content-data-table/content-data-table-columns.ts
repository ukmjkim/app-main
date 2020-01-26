import { LocalColumnDefinition, LocalColumnDefinitionsAsArray, SortPredicates } from '@ukmjkim/aid-data-table';

const column_account_number = new LocalColumnDefinition('account_number', SortPredicates.Natural(item => item.accountNumber));
const column_accounting_manager_id = new LocalColumnDefinition('accounting_manager_id', SortPredicates.Natural(item => item.accountingManagerId));
const column_acres = new LocalColumnDefinition('acres', SortPredicates.Natural(item => item.acres));
const column_action = new LocalColumnDefinition('action', SortPredicates.Natural(item => item.action));
const column_bag_id = new LocalColumnDefinition('bag_id', SortPredicates.Natural(item => item.bagId));
const column_created_dt = new LocalColumnDefinition('created_dt', SortPredicates.Natural(item => item.createdDateTime));
const column_contact_id = new LocalColumnDefinition('contact_id', SortPredicates.Natural(item => item.contactId));
const column_desired_moisture = new LocalColumnDefinition('desired_moisture', SortPredicates.Natural(item => item.desiredMoisture));
const column_downtime_end_dt = new LocalColumnDefinition('downtime_end_dtd', SortPredicates.Natural(item => item.downtimeEndDateTime));
const column_downtime_start_dt = new LocalColumnDefinition('downtime_start_dt', SortPredicates.Natural(item => item.downtimeStartDateTime));
const column_dropoff_datetime = new LocalColumnDefinition('dropoff_datetime', SortPredicates.Natural(item => item.dropoffDateTime));
const column_dry_weight = new LocalColumnDefinition('dry_weight', SortPredicates.Natural(item => item.dryWeight));
const column_dryer_id = new LocalColumnDefinition('dryer_id', SortPredicates.Natural(item => item.dryerId));
const column_drying_datetime = new LocalColumnDefinition('drying_datetime', SortPredicates.Natural(item => item.dryingDateTime));
const column_drying_order_id = new LocalColumnDefinition('drying_order_id', SortPredicates.Natural(item => item.dryingOrderId));
const column_drying_time = new LocalColumnDefinition('drying_time', SortPredicates.Natural(item => item.dryingTime));
const column_dryshop_manager_id = new LocalColumnDefinition('dryshop_manager_id', SortPredicates.Natural(item => item.dryshopManagerId));
const column_email = new LocalColumnDefinition('email', SortPredicates.Natural(item => item.email));
const column_employee_id = new LocalColumnDefinition('employee_id', SortPredicates.Natural(item => item.employeeId));
const column_farm_id = new LocalColumnDefinition('farm_id', SortPredicates.Natural(item => item.farmId));
const column_farm_name = new LocalColumnDefinition('farm_name', SortPredicates.Natural(item => item.farmName));
const column_first_name = new LocalColumnDefinition('first_name', SortPredicates.Natural(item => item.firstName));
const column_home_phone = new LocalColumnDefinition('home_phone', SortPredicates.Natural(item => item.homePhone));
const column_id = new LocalColumnDefinition('id', SortPredicates.Natural(item => item.id));
const column_in_warehouse_dt = new LocalColumnDefinition('in_warehouse_dt', SortPredicates.Natural(item => item.inWarehouseDateTime));
const column_is_active = new LocalColumnDefinition('is_active', SortPredicates.Natural(item => item.isActive));
const column_is_chop_needed = new LocalColumnDefinition('is_chop_needed', SortPredicates.Natural(item => item.isChopNeeded));
const column_is_test_passed = new LocalColumnDefinition('is_test_passed', SortPredicates.Natural(item => item.isTestPassed));
const column_lab_supervisor_id = new LocalColumnDefinition('lab_supervisor_id', SortPredicates.Natural(item => item.labSupervisorId));
const column_lab_technician_id = new LocalColumnDefinition('lab_technician_id', SortPredicates.Natural(item => item.labTechnicianId));
const column_last_name = new LocalColumnDefinition('last_name', SortPredicates.Natural(item => item.lastName));
const column_login_name = new LocalColumnDefinition('login_name', SortPredicates.Natural(item => item.loginName));
const column_mobile_phone = new LocalColumnDefinition('mobile_phone', SortPredicates.Natural(item => item.mobilePhone));
const column_moisture = new LocalColumnDefinition('moisture', SortPredicates.Natural(item => item.moisture));
const column_name = new LocalColumnDefinition('name', SortPredicates.Natural(item => item.name));
const column_note = new LocalColumnDefinition('note', SortPredicates.Natural(item => item.note));
const column_oda_license_number = new LocalColumnDefinition('oda_license_number', SortPredicates.Natural(item => item.odaLicenseNumber));
const column_office_phone = new LocalColumnDefinition('office_phone', SortPredicates.Natural(item => item.officePhone));
const column_password = new LocalColumnDefinition('password', SortPredicates.Natural(item => item.password));
const column_phone = new LocalColumnDefinition('phone', SortPredicates.Natural(item => item.phone));
const column_product_breed = new LocalColumnDefinition('product_breed', SortPredicates.Natural(item => item.productBreed));
const column_production_manager_id = new LocalColumnDefinition('production_manager_id', SortPredicates.Natural(item => item.productionManagerId));
const column_production_supervisor_id = new LocalColumnDefinition('production_supervisor_id', SortPredicates.Natural(item => item.productionSupervisorId));
const column_reason = new LocalColumnDefinition('reason', SortPredicates.Natural(item => item.reason));
const column_release_order_id = new LocalColumnDefinition('release_order_id', SortPredicates.Natural(item => item.releaseOrderId));
const column_role_id = new LocalColumnDefinition('role_id', SortPredicates.Natural(item => item.roleId));
const column_room_moisture = new LocalColumnDefinition('room_moisture', SortPredicates.Natural(item => item.roomMoisture));
const column_room_temperature = new LocalColumnDefinition('room_temperature', SortPredicates.Natural(item => item.roomTemperature));
const column_sale_manager_id = new LocalColumnDefinition('sale_manager_id', SortPredicates.Natural(item => item.saleManagerId));
const column_sample = new LocalColumnDefinition('sample', SortPredicates.Natural(item => item.sample));
const column_shift_name = new LocalColumnDefinition('shift_name', SortPredicates.Natural(item => item.shiftName));
const column_shipping_dt = new LocalColumnDefinition('shipping_dt', SortPredicates.Natural(item => item.shippingDateTime));
const column_status = new LocalColumnDefinition('status', SortPredicates.Natural(item => item.status));
const column_storage_zone = new LocalColumnDefinition('storage_zone', SortPredicates.Natural(item => item.storageZone));
const column_tag_color = new LocalColumnDefinition('tag_color', SortPredicates.Natural(item => item.tagColor));
const column_test_dt = new LocalColumnDefinition('test_dt', SortPredicates.Natural(item => item.testDateTime));
const column_testing_temperature = new LocalColumnDefinition('testing_temperature', SortPredicates.Natural(item => item.testingTemperature));
const column_truck_license_plate = new LocalColumnDefinition('truck_license_plate', SortPredicates.Natural(item => item.truckLicensePlate));
const column_warehouse_handler_id = new LocalColumnDefinition('warehouse_handler_id', SortPredicates.Natural(item => item.warehouseHandlerId));
const column_weight_after_drying = new LocalColumnDefinition('weight_after_drying', SortPredicates.Natural(item => item.weightAfterDrying));
const column_weight_before_drying = new LocalColumnDefinition('weight_before_drying', SortPredicates.Natural(item => item.weightBeforeDrying));
const column_work_date = new LocalColumnDefinition('work_date', SortPredicates.Natural(item => item.workDate));
const column_work_shift_id = new LocalColumnDefinition('work_shift_id', SortPredicates.Natural(item => item.workShiftId));
const column_worked_hours = new LocalColumnDefinition('worked_hours', SortPredicates.Natural(item => item.workedHours));
const column_actions = new LocalColumnDefinition('actions');

const column_key_accounting_manager = new LocalColumnDefinition('accounting_manager', SortPredicates.Natural(item => item.keyAccountingManager));
const column_key_contact = new LocalColumnDefinition('contact', SortPredicates.Natural(item => item.keyContact));
const column_key_dryshop_manager = new LocalColumnDefinition('dryshop_manager', SortPredicates.Natural(item => item.keyDryshopManager));
const column_key_lab_supervisor = new LocalColumnDefinition('lab_supervisor', SortPredicates.Natural(item => item.keyLabSupervisor));
const column_key_lab_technician = new LocalColumnDefinition('lab_technician', SortPredicates.Natural(item => item.keyLabTechnician));
const column_key_production_manager = new LocalColumnDefinition('column_production_manager', SortPredicates.Natural(item => item.keyProductionManager));
const column_key_production_supervisor = new LocalColumnDefinition('production_supervisor', SortPredicates.Natural(item => item.keyProductionSupervisor));
const column_key_sale_manager = new LocalColumnDefinition('sale_manager', SortPredicates.Natural(item => item.keySaleManager));
const column_key_warehouse_handler = new LocalColumnDefinition('warehouse_handler', SortPredicates.Natural(item => item.keyWarehouseHandler));

const column_key_bag = new LocalColumnDefinition('bag', SortPredicates.Natural(item => item.keyBag));
const column_key_dryer = new LocalColumnDefinition('dryer', SortPredicates.Natural(item => item.keyDryer));
const column_key_drying_order = new LocalColumnDefinition('drying_order', SortPredicates.Natural(item => item.keyDryingOrder));
const column_key_employee = new LocalColumnDefinition('employee', SortPredicates.Natural(item => item.keyEmployee));
const column_key_farm = new LocalColumnDefinition('farm', SortPredicates.Natural(item => item.keyFarm));
const column_key_release_order = new LocalColumnDefinition('release_order', SortPredicates.Natural(item => item.keyReleaseOrder));
const column_key_role = new LocalColumnDefinition('role_name', SortPredicates.Natural(item => item.keyRole));
const column_key_work_shift = new LocalColumnDefinition('work_shift', SortPredicates.Natural(item => item.keyWorkShift));

const column_linked_moisture = new LocalColumnDefinition('linked_moisture', SortPredicates.Natural(item => item.testedMoisture));
const column_total_bags = new LocalColumnDefinition('total_bags', SortPredicates.Natural(item => item.totalBags));
const column_total_weight = new LocalColumnDefinition('total_weight', SortPredicates.Natural(item => item.totalWeight));

export const CONTENT_DATA_TABLE_COLUMNS = {
  column_account_number,
  column_accounting_manager_id,
  column_acres,
  column_action,
  column_bag_id,
  column_created_dt,
  column_contact_id,
  column_desired_moisture,
  column_downtime_end_dt,
  column_downtime_start_dt,
  column_dropoff_datetime,
  column_dry_weight,
  column_dryer_id,
  column_drying_datetime,
  column_drying_order_id,
  column_drying_time,
  column_dryshop_manager_id,
  column_email,
  column_employee_id,
  column_farm_id,
  column_farm_name,
  column_first_name,
  column_home_phone,
  column_id,
  column_in_warehouse_dt,
  column_is_active,
  column_is_chop_needed,
  column_is_test_passed,
  column_lab_supervisor_id,
  column_lab_technician_id,
  column_last_name,
  column_login_name,
  column_mobile_phone,
  column_moisture,
  column_name,
  column_note,
  column_oda_license_number,
  column_office_phone,
  column_password,
  column_phone,
  column_product_breed,
  column_production_manager_id,
  column_production_supervisor_id,
  column_reason,
  column_release_order_id,
  column_role_id,
  column_room_moisture,
  column_room_temperature,
  column_sale_manager_id,
  column_sample,
  column_shift_name,
  column_shipping_dt,
  column_status,
  column_storage_zone,
  column_tag_color,
  column_test_dt,
  column_testing_temperature,
  column_truck_license_plate,
  column_warehouse_handler_id,
  column_weight_after_drying,
  column_weight_before_drying,
  column_work_date,
  column_work_shift_id,
  column_worked_hours,

  column_key_accounting_manager,
  column_key_bag,
  column_key_contact,
  column_key_dryer,
  column_key_drying_order,
  column_key_dryshop_manager,
  column_key_employee,
  column_key_farm,
  column_key_lab_supervisor,
  column_key_lab_technician,
  column_key_production_manager,
  column_key_production_supervisor,
  column_key_release_order,
  column_key_role,
  column_key_sale_manager,
  column_key_warehouse_handler,
  column_key_work_shift,

  column_linked_moisture,
  column_total_bags,
  column_total_weight,

  column_actions
};

export const BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_name,
  column_key_drying_order,
  column_key_dryer,
  column_dry_weight,
  column_linked_moisture,
  //column_key_contact,
  column_in_warehouse_dt,
  column_storage_zone,
  column_created_dt,
  column_drying_datetime,
  column_product_breed,
  column_status,
  column_tag_color,
  column_key_warehouse_handler,
  column_key_work_shift
};


export const BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY_DOWNLOAD = [
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Name' },
  { field: 'keyDryingOrder', header: 'Drying Order' },
  { field: 'keyDryer', header: 'Dryer' },
  { field: 'dryWeight', header: 'Dry Weight' },
  { field: 'testedMoisture', header: 'Moisture' },
  //{ field: 'keyContact', header: 'Contact' },
  { field: 'inWarehouseDateTime', header: 'In Warehouse Date Time' },
  { field: 'storageZone', header: 'Storage Zone' },
  { field: 'createdDateTime', header: 'Created Date' },
  { field: 'dryingDateTime', header: 'Drying Date Time' },
  { field: 'productBreed', header: 'Product Breed' },
  { field: 'status', header: 'Status' },
  { field: 'tagColor', header: 'Tag Color' },
  { field: 'keyWarehouseHandler', header: 'Warehouse Handler' },
  { field: 'keyWorkShift', header: 'Work Shift' }
];

export const CONTACT_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_farm,
  column_first_name,
  column_last_name,
  column_home_phone,
  column_mobile_phone,
  column_office_phone,
  column_email,
  column_created_dt
};

export const DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_dryer,
  column_key_work_shift,
  column_downtime_start_dt,
  column_downtime_end_dt,
  column_reason,
  column_action,
  column_created_dt
};

export const DRYER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_name,
  column_is_active,
  column_created_dt
};

export const DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_farm,
  column_acres,
  column_is_chop_needed,
  column_key_sale_manager,
  column_desired_moisture,
  column_dropoff_datetime,
  column_created_dt
};

export const EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_first_name,
  column_last_name,
  column_login_name,
  //column_password,
  column_key_role,
  column_phone,
  column_is_active
};

export const FARM_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  //column_key_contact,
  column_farm_name,
  column_oda_license_number,
  column_account_number,
  column_created_dt,
};

export const RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_bag,
  column_key_release_order,
  column_created_dt
};

export const RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_farm,
  column_total_bags,
  column_total_weight,
  column_shipping_dt,
  column_truck_license_plate,
  column_key_accounting_manager,
  column_key_production_manager,
  column_created_dt
};

export const ROLE_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_name
};

export const TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_test_dt,
  column_key_bag,
  column_is_test_passed,
  column_key_lab_supervisor,
  column_key_lab_technician,
  column_drying_time,
  column_room_moisture,
  column_room_temperature,
  column_testing_temperature,
  column_weight_after_drying,
  column_weight_before_drying,
  column_moisture,
  column_note,
  column_sample
};

export const WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_key_employee,
  column_key_work_shift,
  column_worked_hours,
  column_created_dt
};

export const WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_DISPLAY = {
  column_actions,
  column_id,
  column_created_dt,
  column_key_dryshop_manager,
  column_key_production_supervisor,
  column_shift_name,
  column_work_date
};

export const BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const CONTACT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(CONTACT_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(DRYER_LOG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const DRYER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(DRYER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(DRYING_ORDER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(EMPLOYEE_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const FARM_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(FARM_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(RELEASE_ORDER_BAG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(RELEASE_ORDER_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const ROLE_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(ROLE_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(TESTING_COA_LOG_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(WORK_HOUR_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);
export const WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_AS_ARRAY = LocalColumnDefinitionsAsArray(WORK_SHIFT_CONTENT_DATA_TABLE_COLUMNS_DISPLAY);

