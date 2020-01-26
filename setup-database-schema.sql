create table roles (
  id bigint(20) not null auto_increment,
  name varchar(255) not null,
  primary key (id)
);
CREATE UNIQUE INDEX roles_name ON roles (name);

create table employees (
  id bigint(20) not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  login_name varchar(255),
  password varchar(255),
  phone varchar(255),
  role_id bigint(20) not null,
  active_yn char(1) DEFAULT 'Y',
  created_dt datetime DEFAULT NOW(),
  primary key (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE UNIQUE INDEX employees_name ON employees (first_name, last_name);

create table dryers (
  id bigint(20) not null auto_increment,
  created_dt datetime DEFAULT NOW(),
  name varchar(255) not null,
  active_yn char(1) DEFAULT 'Y',
  primary key (id)
);
CREATE UNIQUE INDEX dryers_name ON dryers (name);


create table farms (
  id bigint(20) not null auto_increment,
  farm_name varchar(255) not null,
  oda_license_number varchar(255),
  account_number varchar(255),
  created_dt datetime default now(),
  customer_id bigint(20),
  primary key (id)
);
CREATE UNIQUE INDEX farms_name ON farms (farm_name);

create table contacts (
  id bigint(20) not null auto_increment,
  created_dt datetime default now(),
  email varchar(255),
  first_name varchar(255) not null,
  home_phone varchar(255),
  last_name varchar(255),
  mobile_phone varchar(255),
  office_phone varchar(255),
  farm_id bigint(20),
  primary key (id),
  FOREIGN KEY (farm_id) REFERENCES farms(id)
);

create table drying_orders (
  id bigint(20) not null auto_increment,
  acres double,
  created_dt datetime default now(),
  desired_moisture double,
  dropoff_datetime datetime,
  farm_id bigint(20),
  need_chop_yn char(1) default 'N',
  sale_manager_id bigint(20),
  primary key (id),
  FOREIGN KEY (farm_id) REFERENCES farms(id),
  FOREIGN KEY (sale_manager_id) REFERENCES employees(id)
);

create table customers (
  id bigint(20) not null auto_increment,
  created_dt datetime default now(),
  email varchar(255),
  first_name varchar(255) not null,
  home_phone varchar(255),
  last_name varchar(255),
  mobile_phone varchar(255),
  office_phone varchar(255),
  primary key (id)
);

create table work_shifts (
  id bigint(20) not null auto_increment,
  dryshop_manager_id bigint(20),
  production_supervisor_id bigint(20),
  shift_name varchar(255) not null,
  work_date varchar(255) not null,
  created_dt datetime default now(),
  primary key (id),
  FOREIGN KEY (production_supervisor_id) REFERENCES employees(id),
  FOREIGN KEY (dryshop_manager_id) REFERENCES employees(id)
);
CREATE UNIQUE INDEX work_shifts_shiftdate ON work_shifts (shift_name, work_date);

create table work_hours (
  id bigint(20) not null auto_increment,
  employee_id bigint(20),
  work_shift_id bigint(20),
  worked_hours double,
  created_dt datetime default now(),
  primary key (id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (work_shift_id) REFERENCES work_shifts(id)
);
CREATE UNIQUE INDEX work_hours_emp ON work_hours (employee_id, work_shift_id);

create table dryer_logs (
  id bigint(20) not null auto_increment,
  action varchar(255),
  created_dt datetime default now(),
  downtime_end_dt datetime,
  downtime_start_dt datetime,
  dryer_id bigint(20),
  reason varchar(255),
  work_shift_id bigint(20),
  primary key (id),
  FOREIGN KEY (dryer_id) REFERENCES dryers(id),
  FOREIGN KEY (work_shift_id) REFERENCES work_shifts(id)
);

create table bags (
  id bigint(20) not null auto_increment,
  in_warehouse_dt datetime,
  storage_zone varchar(255),
  created_dt datetime DEFAULT NOW(),
  customer_id bigint(20),
  dry_weight double,
  dryer_id bigint(20),
  drying_datetime datetime,
  drying_order_id bigint(20),
  name varchar(255) NOT NULL,
  product_breed varchar(255),
  status varchar(255),
  tag_color varchar(255),
  warehouse_handler_id bigint(20),
  work_shift_id bigint(20),
  primary key (id),
  FOREIGN KEY (dryer_id) REFERENCES dryers(id),
  FOREIGN KEY (warehouse_handler_id) REFERENCES employees(id),
  FOREIGN KEY (work_shift_id) REFERENCES work_shifts(id),
  FOREIGN KEY (drying_order_id) REFERENCES drying_orders(id)
);
CREATE UNIQUE INDEX bags_name ON bags (name);

create table release_orders (
  id bigint(20) not null auto_increment,
  accounting_manager_id bigint(20),
  created_dt datetime default now(),
  farm_id bigint(20),
  production_manager_id bigint(20),
  shipping_dt datetime,
  truck_license_plate varchar(255),
  primary key (id),
  FOREIGN KEY (farm_id) REFERENCES farms(id),
  FOREIGN KEY (production_manager_id) REFERENCES employees(id),
  FOREIGN KEY (accounting_manager_id) REFERENCES employees(id)
);

create table release_order_bags (
  id bigint(20) not null auto_increment,
  bag_id bigint(20),
  release_order_id bigint(20),
  created_dt datetime default now(),
  primary key (id),
  FOREIGN KEY (bag_id) REFERENCES bags(id),
  FOREIGN KEY (release_order_id) REFERENCES release_orders(id)
);
CREATE UNIQUE INDEX release_order_bags_b ON release_order_bags (bag_id, release_order_id);

create table testing_coa_logs (
  id bigint(20) not null auto_increment,
  bag_id bigint(20),
  drying_time double,
  test_passed_yn char(1) default 'Y',
  lab_supervisor_id bigint(20),
  lab_technician_id bigint(20),
  moisture double,
  note varchar(255),
  room_moisture double,
  room_temperature double,
  sample varchar(255),
  test_dt datetime default now(),
  testing_temperature double,
  weight_after_drying double,
  weight_before_drying double,
  primary key (id),
  FOREIGN KEY (lab_supervisor_id) REFERENCES employees(id),
  FOREIGN KEY (lab_technician_id) REFERENCES employees(id),
  FOREIGN KEY (bag_id) REFERENCES bags(id)
);

INSERT INTO roles (name) VALUES ('Warehouse Admin');
INSERT INTO roles (name) VALUES ('Sales Manager');
INSERT INTO roles (name) VALUES ('Lab Supervisor');
INSERT INTO roles (name) VALUES ('Lab Technician');
INSERT INTO roles (name) VALUES ('Dryshop Manager');
INSERT INTO roles (name) VALUES ('Production Supervisor');
INSERT INTO roles (name) VALUES ('Accounting Manager');
INSERT INTO roles (name) VALUES ('Office Manager');
INSERT INTO roles (name) VALUES ('Officer');
INSERT INTO roles (name) VALUES ('Worker');
INSERT INTO roles (name) VALUES ('Warehouse Handler');

INSERT INTO employees (first_name, last_name, login_name, password, phone, role_id, active_yn) VALUES ('Mr.', 'Superuser', 'dryshop', 'hemp321', '1.604.0000000', 9, 'Y');
