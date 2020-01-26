export class User {
  loginName?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  permission?: {};

  public static fromJson(userJson): User {
    if (!userJson) return new User();

    return Object.assign(new User(), userJson);
  }
}
