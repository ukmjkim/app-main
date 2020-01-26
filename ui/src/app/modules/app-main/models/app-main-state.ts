import { AppMainPermissionType } from './app-main-permission-type.enum';

export class AppMainState {
  isUXOnly: boolean;
  siteId: number;
  siteName: string;
  sitePageInfo: string;
  eventId: number;
  eventName: string;
  eventPageInfo: string;
  saleNumber: string;
  userId: number;
  userName: string;
  fullName: string;
  id: number;

  linkSet: Map<string, string>;
  permissionSet: Map<string, boolean>;

  dateFormat: string;
  dateTimeFormat: string;

  constructor() {
    this.isUXOnly = false;
    this.userId = 0;
    this.id = 0;
  }

  public isAllowed(permission: AppMainPermissionType): boolean {
    return this.permissionSet.get(permission.type);
  }
}
