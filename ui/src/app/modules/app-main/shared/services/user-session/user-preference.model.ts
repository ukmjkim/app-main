export class UserPreference {

  sidebarOnCompactMode: boolean;

  static fromJson(userPreferenceJson: any): UserPreference {
    if (!userPreferenceJson) return new UserPreference();

    const userPreference = Object.assign(new UserPreference(), userPreferenceJson);
    userPreference.sidebarOnCompactMode = true;
    return userPreference;
  }
}
