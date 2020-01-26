import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {Subject} from "rxjs";
import {UserPreference} from "./user-preference.model";
import {devSiteUser} from "../../mocks/dev-site-user-data";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private currentUser: User;
  public userChanged: Subject<User> = new Subject<User>();

  constructor() {
    if (window["notDev"]) {
      if (!this.currentUser && window['currentUser']) {
        this.currentUser = User.fromJson(window['currentUser']);
      }
    } else {
      this.currentUser = User.fromJson(devSiteUser);
    }
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
    this.userChanged.next(user);
  }

  public getUserPreference(): UserPreference {
    return this.currentUser ? this.currentUser.userPreference : new UserPreference();
  }

  public resetCurrentUserState(): void {
    this.setCurrentUser(null);
  }
}
