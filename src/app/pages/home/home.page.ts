import { ChooseVehicleComponent } from './../../components/choose-vehicle/choose-vehicle.component';
import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { FreightView } from 'src/app/dtos/freight-view';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { FreightDTO, QuotationDTO, CompanyDTO } from 'src/app/api/models';
import { OwnerService } from 'src/app/services/owner.service';
import { JhiWebSocketService } from 'src/app/services/jhi-web-socket.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  segmentName = 'all';
  freights: FreightDTO[];
 quotations: Observable<QuotationDTO[]>;
 fixedFreights: Observable<FreightDTO[]>;
 companyDto: CompanyDTO = null;

  constructor(private utilService: UtilService, private commandService: CommandResourceService, private queryService: QueryResourceService,
              private ownerService: OwnerService, private notification: JhiWebSocketService,
              private modalController: ModalController) {

  }
  async ngOnInit() {

    const sample = await this.ownerService.getOwner();
    console.log('INit Method working ' + sample.id);
    this.companyDto = await this.ownerService.getOwner();
    this.utilService.createLoader()
    .then(loader => {
      loader.present();
      const fparams: QueryResourceService.FindAllFreightsUsingGET1Params = {companyId: this.companyDto.id, requestedStatus: 'CONFIRM'};
      this.fixedFreights = this.queryService.findAllFreightsUsingGET1(fparams);
      const qparams: QueryResourceService.FindAllQuotationsByCompanyIdUsingGETParams = {companyId: this.companyDto.id};
      this.quotations = this.queryService.findAllQuotationsByCompanyIdUsingGET(qparams);
      const params: QueryResourceService.FindAllFreightsUsingGETParams = { requestedStatus: 'REQUEST' };
      this.queryService.findAllFreightsUsingGET(params).subscribe(data => {
      console.log('working <<<<' + data);
      loader.dismiss();
      this.freights = data;
    }, err => {
      loader.dismiss();

    });
  });

    console.log('Ng on init working');


}

doRefresh(event) {
  console.log('Begin async operation');
  this.utilService.createLoader()
    .then(loader => {
      loader.present();
      const fparams: QueryResourceService.FindAllFreightsUsingGET1Params = {companyId: this.companyDto.id, requestedStatus: 'CONFIRM'};
      this.fixedFreights = this.queryService.findAllFreightsUsingGET1(fparams);
      const qparams: QueryResourceService.FindAllQuotationsByCompanyIdUsingGETParams = {companyId: this.companyDto.id};
      this.quotations = this.queryService.findAllQuotationsByCompanyIdUsingGET(qparams);
      const params: QueryResourceService.FindAllFreightsUsingGETParams = { requestedStatus: 'REQUEST' };
      this.queryService.findAllFreightsUsingGET(params).subscribe(data => {
      console.log('working <<<<' + data);
      loader.dismiss();
      this.freights = data;
    }, err => {
      loader.dismiss();

    });
  });

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}

  deleteElement(index) {
    console.log('Index Value' + index);
    this.freights.splice(index, 1);


  }


  segmentButtonClicked(evnt) {

    console.log('evnt is ', evnt.target.value);
    this.segmentName = evnt.target.value;

  }
  async presentModal(freight) {
    const modal = await this.modalController.create({
      component: ChooseVehicleComponent,
      componentProps: {
        headerName: 'Add Employe',
        freight,
      }
    });

    modal.onDidDismiss().then((data: any) => {
       console.log('[]<>[]', data.data.freight);
       if (data.data.freight.VehicleId != null) {

        this.freights.forEach(res => {
          if (res.id = freight.id) {
            freight.vehicleId = data.data.freight.vehicleId;

          }

        });
        }


     });
    return await modal.present();
  }


}
