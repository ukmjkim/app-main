import { AidUXComponentsModule } from '@ukmjkim/aid-ux-components';
import { AidLibServicesModule } from '@ukmjkim/aid-lib-services';
import { DataTableModule } from '@ukmjkim/aid-data-table';
import { NumberMaskModule } from '@ukmjkim/aid-data-table';
import { AppMainModule } from '@modules/app-main/app-main.module';

export const AppLibraryModules = [
  AidUXComponentsModule,
  AidLibServicesModule.forRoot(),
  DataTableModule.forRoot(),
  NumberMaskModule,
  AppMainModule.forRoot(),
];
