export class PickupDashboardStatsHeader {
    states: Map<string, Map<string, number>>;
    totalPickups: number;
    newPickups: number;
    voidPickups: number;

    public static createPickupDashboardStatsHeaderFromJson(overviewJson): PickupDashboardStatsHeader {
        let overview = new PickupDashboardStatsHeader();

        let statesMap = new Map();
        Object.keys(overviewJson.states).map(state => {
            const oneState: Map<string, number> = overviewJson.states[state];
            let stateAttrMap = new Map();
            Object.keys(oneState).map(stateAttr => {
                stateAttrMap.set(stateAttr, oneState[stateAttr]);
            });
            statesMap.set(state, stateAttrMap);
        });
        overview.states = statesMap;

        overview.totalPickups = overviewJson.totalPickups;
        overview.newPickups = overviewJson.newPickups;
        overview.voidPickups = overviewJson.voidPickups;

        return overview;
    }

    public static getPickupCountByState(overview: PickupDashboardStatsHeader, state: string) {
        if (overview === undefined) return 0;

        const map: Map<string, number> = overview.states.get(state);
        return map === undefined ? 0 : map.get("scheduled") + map.get("express");
    }

    public static getPickupExpressCountByState(overview: PickupDashboardStatsHeader, state: string) {
      if (overview === undefined) return 0;

      const map: Map<string, number> = overview.states.get(state);
      return map === undefined ? 0 : map.get("express");
  }
}
