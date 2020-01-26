export class PickupDashboardStatsLine {
    received: Map<string, number>;
    partiallyReceived: Map<string, number>;
    notReceived: Map<string, number>;

    public static createPickupDashboardStatsLineFromJson(overviewJson): PickupDashboardStatsLine {
        let overview = new PickupDashboardStatsLine();

        let received = new Map();
        Object.keys(overviewJson.received).map(receivedAttr => {
            received.set(receivedAttr, overviewJson.received[receivedAttr]);
        });
        overview.received = received;

        let partiallyReceived = new Map();
        Object.keys(overviewJson.partiallyReceived).map(partiallyReceivedAttr => {
            partiallyReceived.set(partiallyReceivedAttr, overviewJson.partiallyReceived[partiallyReceivedAttr]);
        });
        overview.partiallyReceived = partiallyReceived;

        let notReceived = new Map();
        Object.keys(overviewJson.notReceived).map(notReceivedAttr => {
            notReceived.set(notReceivedAttr, overviewJson.notReceived[notReceivedAttr]);
        });
        overview.notReceived = notReceived;

        return overview;
    }

    public static getPurchaseOrderReceivedLines(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.received.get("line");
        return value === undefined ? 0 : value;
    }

    public static getPurchaseOrderReceivedHeaders(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.received.get("header");
        return value === undefined ? 0 : value;
    }

    public static getPurchaseOrderPartiallyReceivedLines(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.partiallyReceived.get("line");
        return value === undefined ? 0 : value;
    }

    public static getPurchaseOrderPartiallyReceivedHeaders(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.partiallyReceived.get("header");
        return value === undefined ? 0 : value;
    }

    public static getPurchaseOrderNotReceivedLines(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.notReceived.get("line");
        return value === undefined ? 0 : value;
    }

    public static getPurchaseOrderNotReceivedHeaders(overview: PickupDashboardStatsLine) {
        if (overview === undefined) return 0;

        const value = overview.notReceived.get("header");
        return value === undefined ? 0 : value;
    }
}
