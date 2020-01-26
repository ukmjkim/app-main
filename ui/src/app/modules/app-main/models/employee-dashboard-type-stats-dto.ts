export class EmployeeDashboardTypeStatsDto {
  types: Map<string, number>;
  total: number;

  public static createEmployeeStatsDtoFromJson(overviewJson): EmployeeDashboardTypeStatsDto {
    let overview = new EmployeeDashboardTypeStatsDto();

    let typesMap = new Map();
    Object.keys(overviewJson.types).map(type => {
        const numberOfType: number = overviewJson.types[type];
        typesMap.set(type, numberOfType);
    });
    overview.types = typesMap;
    overview.total = overviewJson.total;

    return overview;
  }

  public static getEmployeeCountByType(overview: EmployeeDashboardTypeStatsDto, type: string) {
    if (overview === undefined) {
      return 0;
    }

    const numberOfType = overview.types.get(type);
    return numberOfType;
  }
}
