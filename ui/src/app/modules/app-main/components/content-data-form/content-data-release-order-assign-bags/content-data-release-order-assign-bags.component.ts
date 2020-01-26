import { Component, Inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AidGlobalConfig, AidDialogService, AidLoggerService, AidDateFormatPipe, AidMessageIndicatorService, AidIndicatorParams, AidUrlUtil } from '@ukmjkim/aid-lib-services';
import { AppMainState } from '../../../models/app-main-state';
import { appMessage } from '../../../shared/app.message';
import { ContentDataType } from '../../../models/content-data-type.enum';
import { ContentDataBundle } from '../../../models/content-data-bundle';
import { ContentDataItemDto } from '../../../models/content-data-item-dto';
import { ContentDataService } from '../../../services/content-data.service';

@Component({
    selector: 'aid-content-data-release-order-assign-bags',
    templateUrl: './content-data-release-order-assign-bags.component.html',
    styleUrls: ['./content-data-release-order-assign-bags.component.scss']
})
export class ContentDataReleaseOrderAssignBagsComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() contentDataType: ContentDataType;
  @Input() appMainState: AppMainState;

  ContentDataItemDto = ContentDataItemDto;
  dateFormatPipe = new AidDateFormatPipe();

  dialogLabel: string;
  releaseOrderBagList: ContentDataItemDto[];
  dryingOrderList: ContentDataItemDto[];
  readyBagList: ContentDataItemDto[];

  selectedBags: {id: number, selected: boolean}[] = [];
  selectedDryingOrders: {id: number, selected: boolean}[] = [];

  constructor(private dialogRef: MatDialogRef<ContentDataReleaseOrderAssignBagsComponent>,
              private logger: AidLoggerService,
              private dialogService: AidDialogService,
              @Inject(MAT_DIALOG_DATA) readonly data: ContentDataBundle,
              private formBuilder: FormBuilder,
              readonly contentDataService: ContentDataService) {
    this.data = data;
    this.logger.info('ContentDataReleaseOrderAssignBagsComponent data', this.data);
  }

  get totalDryWeight() {
    if (this.releaseOrderBagList) {
      return this.releaseOrderBagList.map(bag => {
        let theBag = JSON.parse(JSON.stringify(bag));
        return theBag.bag.dryWeight ? theBag.bag.dryWeight : 0;
      }).reduce((a, b) => a + b, 0);
    }
    return 0;
  }

  get totalBags() {
    if (this.releaseOrderBagList) {
      return this.releaseOrderBagList.length;
    }
    return 0;
  }

  ngOnInit() {
    const apiList: ContentDataType[] = [
      ContentDataType.DryingOrder
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.dryingOrderList = results[0].filter(dryingOrder => dryingOrder.farmId === this.data.contentDataItemDto.farmId);
    });

    this.reloadBags();
  }

  reloadBags() {
    const apiList: ContentDataType[] = [
      ContentDataType.ReleaseOrderBag
    ];

    this.contentDataService.fetchMultipleContentDataList(apiList).subscribe(results => {
      this.logger.info('ContentDataReleaseOrderAssignBagsComponent results', results[0]);
      this.logger.info('ContentDataReleaseOrderAssignBagsComponent releaseOrderId', this.data.contentDataItemDto.id);
      this.releaseOrderBagList = results[0].filter(releaseOrderBag => releaseOrderBag.releaseOrderId === this.data.contentDataItemDto.id);
      this.logger.info('ContentDataReleaseOrderAssignBagsComponent releaseOrderBagList', this.releaseOrderBagList);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.logger.info('ContentDataReleaseOrderAssignBagsComponent data', this.data);
    }
  }

  changeDryingOrder(dryingOrderId) {
    this.logger.info('ContentDataReleaseOrderAssignBagsComponent selectedDryingOrders', this.selectedDryingOrders);
    if (this.selectedDryingOrders.filter(dryingOrder => dryingOrder.id === dryingOrderId).length > 0) {
      this.selectedDryingOrders.forEach(dryingOrder => {
        if (dryingOrder.id === dryingOrderId) {
          dryingOrder.selected = !dryingOrder.selected;
        }
      });
    } else {
      this.selectedDryingOrders.push({'id': dryingOrderId, 'selected': true})
    }
    const apiList: ContentDataType[] = [
      ContentDataType.DryingOrderBag
    ];

    let selectedDryingOrderIds = this.selectedDryingOrders.filter(dryingOrder => dryingOrder.selected)
      .map(dryingOrder => dryingOrder.id);
    if (selectedDryingOrderIds && selectedDryingOrderIds.length > 0) {
      this.contentDataService.fetchMultipleContentDataList(apiList, selectedDryingOrderIds.shift()).subscribe(results => {
        this.readyBagList = results[0].filter(bag => bag.status === 'Tested');
      });
    }
  }

  assignBag(matOption) {
    const filtered = this.selectedBags.filter(selectedWorker => selectedWorker.id === matOption.source.value);
    if (filtered && filtered.length > 0) {
      filtered[0].selected = matOption.source.selected;
      this.selectedBags.forEach((item, index) => {
        if (item.id === matOption.source.value) {
          this.selectedBags.splice(index, 1);
        }
      });
    } else {
      if (matOption.source.selected) {
        this.selectedBags.push({id: matOption.source.value.id, selected: matOption.source.selected});
      }
    }

    this.logger.info('assignWorker this.selectedWorkers', this.selectedBags);
  }

  onAddBags() {
      this.dialogService.showProgress();

      const numberOfWork = this.selectedBags.length;
      let completed = 0;
      this.selectedBags.forEach(bag => {
        const contentDataItemDto = new ContentDataItemDto();
        contentDataItemDto.bagId = bag.id;
        contentDataItemDto.releaseOrderId = this.data.contentDataItemDto.id;

        this.logger.info('onAddBags contentDataItemDto', contentDataItemDto);
        this.contentDataService.submitContentData(true, ContentDataType.ReleaseOrderBag, contentDataItemDto)
        .subscribe(
          bag => {
            completed += 1;
            if (completed >= numberOfWork) {
              this.dialogService.showMessage('Successfully saved!');
              this.dialogService.hideProgress();
              this.reloadBags();
            }
          },
          err => {
            this.dialogService.showMessage('Failed to save');
            this.dialogService.hideProgress();
            this.reloadBags();
          }
        );
      });
  }

  onDeleteReleaseOrderBag(releaseOrderBagId: number) {
    const contentDataItemDto = new ContentDataItemDto();
    contentDataItemDto.id = releaseOrderBagId;
    const confirmationMessage = JSON.parse(JSON.stringify(appMessage.confirmDeletionWorkHourFromWorkShift));
    this.dialogService.showMessageDialog(confirmationMessage)
      .afterClosed()
      .subscribe(result => {
        if (result === 'OK') {
          this.contentDataService.deleteContentData(ContentDataType.ReleaseOrderBag, contentDataItemDto)
            .subscribe(
              item => {
                this.dialogService.showMessage('Successfully deleted!');
                this.reloadBags();
              },
              err => {
                this.dialogService.showMessage('Failed to delete');
              }
            );
        }
      });
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
