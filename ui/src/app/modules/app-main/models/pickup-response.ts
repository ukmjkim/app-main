import { AidJsonMappingUtil } from '@ukmjkim/aid-lib-services';
import { Pickup } from './pickup';

export class PickupResponse {
  message?: string;

  @AidJsonMappingUtil.deserializable(Pickup) pickup?: Pickup;

  constructor() {
    this.message = undefined;
    this.pickup = undefined;
  }
}
