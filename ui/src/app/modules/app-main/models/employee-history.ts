export class EmployeeHistory {
    system?: string;
    serverSequenceNumber?: number;
    oldStatus?: string;
    newStatus?: string;
    notes?: string;
    userName?: string;
    createdTS?: number;

    constructor() {
        this.system = undefined;
        this.serverSequenceNumber = undefined;
        this.oldStatus = undefined;
        this.newStatus = undefined;
        this.notes = undefined;
        this.userName = undefined;
        this.createdTS = undefined;
    }
}
