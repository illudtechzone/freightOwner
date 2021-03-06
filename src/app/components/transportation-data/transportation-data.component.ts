import { FreightView } from './../../dtos/freight-view';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FreightDTO, CustomerDTO, QuotationDTO, CompanyDTO } from 'src/app/api/models';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Observable } from 'rxjs';
import { OwnerService } from 'src/app/services/owner.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-transportation-data',
  templateUrl: './transportation-data.component.html',
  styleUrls: ['./transportation-data.component.scss'],
})
export class TransportationDataComponent implements OnInit {
  freightView: FreightView = {freight: {}, isMoreInfo: false, isEdit: false};
  @Input('freight')
  freight: FreightDTO;
  @Input('quotation')
  q: QuotationDTO;
  @Output()
  elementDeleted: EventEmitter<any> = new EventEmitter();
  customer: Observable<CustomerDTO> ;
  quotation: QuotationDTO = {};
 quoatationList: QuotationDTO[];
 quotationObservable: Observable<QuotationDTO[]>;

  companyDto: CompanyDTO = null;
  constructor(private queryResource: QueryResourceService, private commandResource: CommandResourceService
    ,         private ownerService: OwnerService, private utilService: UtilService

    ) { }

 async ngOnInit() {
    this.companyDto = await this.ownerService.getOwner();
    if (this.freight != null) {
   this.getFreight();
    } else {
      console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');

      this.queryResource.findFreightIdUsingGET(this.q.freightId).toPromise().then(
        data => {
         this.freight = data;
         this.getFreight();
        });

    }

  }
getFreight() {
  console.log('is more info', this.freight);
  this.freightView.freight = this.freight;
  this.customer = this.queryResource.findCustomerByIdUsingGET(this.freightView.freight.customerId);
  console.log(this.companyDto.id + 'freight Id  ' + this.freight.id);
  const params:
  QueryResourceService.FindAllQuotationsByCompanyIdAndFreightIdUsingGETParams = {freightId: this.freight.id, companyId: this.companyDto.id};
  // tslint:disable-next-line:max-line-length
  console.log('freight id ' + this.freight.id + '  company Id' + this.companyDto.id);
  this.quotationObservable = this.queryResource.findAllQuotationsByCompanyIdAndFreightIdUsingGET(params);
  this.quotationObservable.subscribe
  (data => {
    console.log('Quatation List  :: ' + data.length);
    this.quoatationList = data; });
}

  moreInfo() {
    console.log('is more info', this.freightView);
    this.freightView.isMoreInfo = !this.freightView.isMoreInfo;
    console.log('is more info', this.freightView.isMoreInfo);

  }
   sendQuotation() {
    this.utilService.createLoader()
    .then(loader => {
      loader.present();
      console.log('Send Quotation' + this.quotation.amount);
      this.quotation.freightId = this.freightView.freight.id;
      this.quotation.deliveryDate = this.freightView.freight.deliveryDate;
      this.quotation.companyId =  this.ownerService.companyDto.id;
      if (this.quotation.amount) {
       this.commandResource.createQuotationUsingPOST(this.quotation).toPromise().then(x => {
         console.log('QUATATION sEND : ' + x);
         loader.dismiss();
         this.quotationObservable.subscribe(data => {
            console.log('Quatation List @@@@@@@@@@@@@  :: ' + data.length);
            this.quoatationList = data;

          });
        }, err => {

          loader.dismiss();
        }
        );

    } else {
      loader.dismiss();
      this.utilService.createToast('Please Enter your Budget');
    }
  });
  }
  deleteElement() {
    this.elementDeleted.emit();
  }

}
