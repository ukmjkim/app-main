export const PICKUP_DASHBOARD_STATE_COLOR = {
    new: '#3F3F3F',
    queued: '#0072C2',
    submitted: '#0072C2',
    open: '#3F3F3F',
    inProcess: '#0072C2',
    approved: '#1B7D42',
    rejected: '#DA461F',
    closed: '#797979',
    closedFinal: '#797979',
    void: '#797979',
};

export const PICKUP_DASHBOARD_STATE_STYLE = {
    new: 'grey',
    queued: 'yellow',
    submitted: 'blue',
    open: 'orange',
    inProcess: 'blue',
    approved: 'green',
    rejected: 'red',
    closed: 'light-grey',
    closedFinal: 'light-grey',
    void: 'yellow',
};

export interface PickupStatue {
    index: number;
    name: string;
    label: string;
    value: string;
    icon: string;
    styleClass: string;
    dashboardColor: string;
    svgIcon?: string;
}

export const poNew = {
    index: 1,
    name: "new",
    label: "New",
    value: "New",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.new,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.new
};

export const poQueued = {
    index: 1,
    name: "queued",
    label: "Queued",
    value: "Queued",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.submitted,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.submitted
};

export const poSubmitted = {
    index: 1,
    name: "submitted",
    label: "Submitted",
    value: "Submitted",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.queued,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.queued
};

export const poOpen = {
    index: 1,
    name: "open",
    label: "Open",
    value: "Open",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.open,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.open
};

export const poInProcess = {
    index: 1,
    name: "inProcess",
    label: "In Process",
    value: "InProcess",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.inProcess,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.inProcess
};

export const poApproved = {
    index: 1,
    name: "approved",
    label: "Approved",
    value: "Approved",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.approved,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.approved
};

export const poRejected = {
    index: 1,
    name: "rejected",
    label: "Rejected",
    value: "Rejected",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.rejected,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.rejected
};

export const poClosed = {
    index: 1,
    name: "closed",
    label: "Closed",
    value: "Closed",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.closed,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.closed
};

export const poClosedFinal = {
    index: 1,
    name: "closedFinal",
    label: "Closed Final",
    value: "Closed Final",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.closed,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.closed
};

export const poVoid = {
    index: 1,
    name: "void",
    label: "Void",
    value: "Void",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.void,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.void
};


export const poReceived = {
    index: 1,
    name: "received",
    label: "Received",
    value: "Received",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.approved,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.approved
};

export const poPartiallyReceived = {
    index: 1,
    name: "partiallyReceived",
    label: "Partially Received",
    value: "Partially Received",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.rejected,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.rejected
};

export const poNotReceived = {
    index: 1,
    name: "partiallyReceived",
    label: "Partially Received",
    value: "Partially Received",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.rejected,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.rejected
};
