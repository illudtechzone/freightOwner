import { CommonService } from './../../services/common.service';
import { VehicleLookUpDTO } from './../../api/models/vehicle-look-up-dto';
import { CurrentUserService } from './../../services/current-user.service';
import { UtilService } from 'src/app/services/util.service';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { Vehicle } from './../../dtos/vehicle';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VehicleDTO } from 'src/app/api/models';

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
    private commonService:CommonService) {
    navParams.get('vehicle');
    navParams.get('headerName');



   }
  ngOnInit() {
   
    this.commonService.getCompany().then((result:any) => {
      console.log('sucessful geting the company', result);
     // this.vehicle.companyId=result.id;
     this.vehicle.companyId=3;
      console.log('uid ',this.vehicle.companyId);
    }, error => {
      console.log('error geting the user', error);

    }
    );
    
   

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
      console.log('enterd in if');
      this.saveVehicle();
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
     this.commandResourceService.createVehicleUsingPOST(this.vehicle).subscribe(res => {
      console.log('created vehicle in microservice ', res);
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
this.commandResourceService.createVehicleLookUpUsingPOST(this.vehicleLookUpDTO).subscribe((res1:any)=>{
  console.log('created vehicleLookUp ',res1);
  this.vehicle.vehicleLookupId=res1.id
  console.log('vehicle is >> ',this.vehicle)
   this.commandResourceService.createVehicleUsingPOST(this.vehicle).subscribe(res => {
    console.log('created vehicle in microservice ', res);
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

}
