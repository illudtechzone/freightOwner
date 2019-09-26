import { VehicleDTO } from './../../api/models/vehicle-dto';
import { UtilService } from 'src/app/services/util.service';
import { CommonService } from './../../services/common.service';
import { Company } from './../../api/models/company';
import { Vehicle } from './../../dtos/vehicle';
import { AddVehicleComponent } from './../../components/add-vehicle/add-vehicle.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {  CompanyDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {

  constructor(private modalController:ModalController,
    private queryResource:QueryResourceService,
    private commonService:CommonService,
    private utilService:UtilService) { }
  vehicles:VehicleDTO[]=[];
  company:CompanyDTO={};
  ngOnInit() {
    this.utilService.createLoader()
    .then(loader => {
      loader.present();
    this.commonService.getCompany().then((res:any)=>{
  this.company=res;
  if(this.company===null){
  loader.dismiss();
  this.utilService.createToast('oops! our server might be down ');
  console.log('hoi');
  }
  console.log('company got ',res);
  this.queryResource.findAllvehiclesUsingGET({companyIdpCode:this.company.companyIdpCode}).subscribe((res1:any)=>{
    console.log('vehicles are ',res1);
    this.vehicles=res1;
    loader.dismiss();

  },err=>{
    console.log('err gting compny vehicles ',err);
    loader.dismiss();
    
  });
},err=>{
  console.log('company got error ',err);
  loader.dismiss();
  this.utilService.createToast('oops! our server might be down ');


});

});

}


  async presentModal() {
    let vehicle:VehicleDTO={registerNo:''};
    const modal = await this.modalController.create({
      component: AddVehicleComponent,
      componentProps: {
        'headerName':'Add Vehicle',
        'vehicle': vehicle,
      }
    });

    modal.onDidDismiss().then((data:any)=>{
      console.log('[]<>[]',data.data.newVehicle.registerNo);
      if(data.data.newVehicle.registerNo!='')
       this.vehicles.push(data.data.newVehicle);
       

       });
    return await modal.present();
  }

  async presentEditModal(vehicle:Vehicle) {
    const modal = await this.modalController.create({
      component: AddVehicleComponent,
      componentProps: {
        'headerName':'Edit Vehicle',
        'vehicle': vehicle,
      }
    });
   
    return await modal.present();
  }
  
  deleteVehicle(vehicle:VehicleDTO){

    this.vehicles.splice(this.vehicles.indexOf(vehicle),1);
    console.log('dgdger',this.vehicles);


  }


}
