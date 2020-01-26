package com.bizrun.appmain.dto;

import java.util.Arrays;

public enum RoleEnum {

    Admin("Admin", true),
    Anonymous("Anonymous", false),
    WarehouseAdmin("Warehouse Admin", true),
    SalesManager("Sales Manager", true),
    DryshopManager("Dryshop Manager", true),
    LabSupervisor("Lab Supervisor", true),
    LabTechnician("Lab Technician", false),
    ProductionSupervisor("Production Supervisor", true),
    AccountingManager("Accounting Manager", true),
    OfficeManager("Office Manager", true),
    Officer("Officer", true),
    WarehouseHandler("Warehouse Handler", true),
    Worker("Worker", false);

    private String name;
    private boolean allowLogin;

    RoleEnum(String name, boolean allowLogin) {
        this.name = name;
        this.allowLogin = allowLogin;
    }

    public boolean canLogin() {
        return this.allowLogin;
    }

    public static RoleEnum fromRoleName(String roleName) {
        return Arrays.stream(RoleEnum.values()).filter(role -> role.name.equalsIgnoreCase(roleName)).findFirst().orElse(RoleEnum.Anonymous);
    }
}
