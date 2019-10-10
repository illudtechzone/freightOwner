import { CommonService } from './../../services/common.service';
import { VehicleLookUpDTO } from './../../api/models/vehicle-look-up-dto';
import { CurrentUserService } from './../../services/current-user.service';
import { UtilService } from 'src/app/services/util.service';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { Vehicle } from './../../dtos/vehicle';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VehicleDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit { 
  headerName:string='';
  vehicle:VehicleDTO={registerNo:'',occupied:false,companyId:1};
  vehicleLookUpDTO:VehicleLookUpDTO={};
  companyUid:string='';
  constructor(private modalCtrl:ModalController,
    private navParams:NavParams,
    private commandResourceService:CommandResourceService,
    private utilService:UtilService,
    private currentUserService:CurrentUserService,
    private commonService:CommonService,
    private queryService:QueryResourceService)
     {
    navParams.get('vehicle');
    navParams.get('headerName');



   }
  ngOnInit() {
   
    if(this.headerName==='Edit Vehicle'){
      this.initializingEdit();
      console.log('vehicle to be edited ',this.vehicle);
    }
    else{
      
      this.initializingSave();


    }
   

  }
  initializingSave(){

    this.commonService.getCompany().then(res1=>{
      console.log('got company id ',res1);
      this.vehicle.companyId=res1.id;
    });
  }
initializingEdit(){
  
  //method to get the vehicle lookup becuse only vehicle is passing through navparams
  this.queryService.findVehicleLookUpByIdUsingGET(this.vehicle.vehicleLookupId).subscribe((res:any) => {
    console.log('got vehicleLookup in microservice ', res);
    this.vehicleLookUpDTO=res;
  
  },
  err => {
    console.log('error gettig vehicle lookUp ', err);
    
  });
  // this.queryService.findAllFreightsUsingGET({requestedStatus: 'CONFIRM'}).subscribe();
}


  dismiss() {
    console.log('>>>',this.vehicle);
    console.log('>>>',this.vehicleLookUpDTO)
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'newVehicle':this.vehicle
    });
  }

  // capacityOptions(event){
  //   this.vehicle.capacityType=event.detail.value;
  //   console.log('type is >',this.vehicle.capacityType);
  // }

  // selectTruckType(event){
  //   this.vehicle.vehicleType=event.detail.value;
  //   console.log('type is >',this.vehicle.vehicleType);
  // }
  
  save(){
    console.log(' bc enterd in if');
    if(this.headerName==='Add Vehicle'){
      this.saveVehicle();
    }
    else{
      this.editVehicle();
    }
 
  }

  saveVehicle(){
    this.utilService.createLoader()
    .then(loader => {
      loader.present();
  this.commandResourceService.createVehicleLookUpUsingPOST(this.vehicleLookUpDTO).subscribe((res1:any)=>{
    console.log('created vehicleLookUp ',res1);
    this.vehicle.vehicleLookupId=res1.id
    console.log('vehicle is >> ',this.vehicle)
     this.commandResourceService.createVehicleUsingPOST(this.vehicle).subscribe((res:any) => {
      console.log('created vehicle in microservice ', res);
      this.vehicle=res;
      loader.dismiss()
      this.dismiss();
    },
    err => {
      console.log('error creating vehicle in microservice ', err);
      loader.dismiss()
      this.dismiss();
    });
  },
  err=>{
       console.log('error creating  vehicle look up in microservice ', err);
       loader.dismiss()
       this.dismiss();

  });
  });
}

editVehicle(){
  this.utilService.createLoader()
  .then(loader => {
    loader.present();
this.commandResourceService.updateVehicleLookUpUsingPUT(this.vehicleLookUpDTO).subscribe((res1:any)=>{
  console.log('updated vehicleLookUp ',res1);
  this.vehicle.vehicleLookupId=res1.id
  console.log('vehicle is >> ',this.vehicle)
   this.commandResourceService.updateVehicleUsingPUT(this.vehicle).subscribe(res => {
    console.log('updated vehicle in microservice ', res);
    loader.dismiss()
    this.dismiss();
  },
  err => {
    console.log('error updatging vehicle in microservice ', err);
    loader.dismiss()
    this.dismiss();
  });
},
err=>{
     console.log('error updatging  vehicle look up in microservice ', err);
     loader.dismiss()
     this.dismiss();

});
});
}

}
