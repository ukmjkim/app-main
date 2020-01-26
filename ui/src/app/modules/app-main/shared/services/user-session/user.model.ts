import {UserPreference} from "./user-preference.model";

export class User {

  userId?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  companyName?: string;
  emailAddress?: string;
  jobTitle?: string;
  siteUserType: string;
  greetings?: string;
  permissions?: {};
  userPreference?: UserPreference;
  userTypeId: number;

  public static fromJson(userJson): User {
    if (!userJson) return new User();

    const user: User = Object.assign(new User(), userJson);
    if (userJson.userPreference) {
      user.userPreference = UserPreference.fromJson(window["userPreference"]);
    } else {
      user.userPreference = new UserPreference();
    }
    return user;
  }

  /* for ex.
  "permissions": {
    "canViewAssetPackage": true
  }
  */
  public hasRole(roleName: string): boolean {
    return this.permissions && this.permissions[roleName];
  }

  /* for ex.
  "permissions": {
      "1": {
          "canUpdateSiteConfiguration": true
      }
  }
  */
  public hasSiteRole(siteId: number, roleName: string): boolean {
    if (this.permissions) {
      const thisSitePermission = this.permissions[siteId];
      return thisSitePermission && thisSitePermission[roleName];
    }
    return false;
  }

  /* for ex.
  "permissions": {
      "1": {
          "bidderRegistrationPermission": {
              "canAcceptDebitCardDeposit": true,
              "canActOnBidderNumber": true,
              "canEditBidderName": true,
              "canRegisterBidder": true,
              "canViewRegistration": true
          }
      }
  }
  */
  public hasSiteFeatureRole(siteId: number, featureName: string, roleName: string): boolean {
    if (this.permissions) {
      const thisSitePermission = this.permissions[siteId];
      if (thisSitePermission) {
        const thisSiteFeaturePermission = thisSitePermission[featureName];
        return thisSiteFeaturePermission && thisSiteFeaturePermission[roleName];
      }
    }
    return false;
  }

}
