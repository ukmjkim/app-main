export const PICKUP_DASHBOARD_STATE_COLOR = {
    New: '#3F3F3F',
    InProgress: '#0072C2',
    Completed: '#1B7D42',
    Canceled: '#DA461F',
};

export const PICKUP_DASHBOARD_STATE_STYLE = {
    New: 'grey',
    InProgress: 'blue',
    Completed: 'green',
    Canceled: 'red',
};

export interface PickupStates {
    index: number;
    name: string;
    label: string;
    value: string;
    icon: string;
    styleClass: string;
    dashboardColor: string;
    svgIcon?: string;
}

export const New = {
    index: 1,
    name: "New",
    label: "New",
    value: "New",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.New,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.New
};

export const InProgress = {
    index: 1,
    name: "InProgress",
    label: "InProgress",
    value: "InProgress",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.InProgress,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.InProgress
};

export const Completed = {
    index: 1,
    name: "Completed",
    label: "Completed",
    value: "Completed",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.Completed,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.Completed
};

export const Canceled = {
    index: 1,
    name: "Canceled",
    label: "Canceled",
    value: "Canceled",
    icon: "rate_reviewed",
    styleClass: PICKUP_DASHBOARD_STATE_STYLE.Canceled,
    dashboardColor: PICKUP_DASHBOARD_STATE_COLOR.Canceled
};

