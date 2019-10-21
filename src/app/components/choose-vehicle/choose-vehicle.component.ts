import { FreightDTO } from './../../api/models/freight-dto';
import { Vehicle } from './../../api/models/vehicle';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { ModalController, NavParams } from '@ionic/angular';
import { VehicleDTO } from 'src/app/api/models';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-choose-vehicle',
  templateUrl: './choose-vehicle.component.html',
  styleUrls: ['./choose-vehicle.component.scss'],
})
export class ChooseVehicleComponent implements OnInit {
  vehicles: VehicleDTO []=[];
  freight:any;

  constructor(private vehicleService:VehicleService,
    private utilService:UtilService,
    private modalCtrl:ModalController,
    private commandService:CommandResourceService,
    private navParams:NavParams) { 

      navParams.get('freight');
      console.log('freight is ',this.freight);

    }

  ngOnInit() { 

    this.utilService.createLoader()
    .then(loader => {
      loader.present();

        this.vehicleService.getVehicles().then((res1: any) => {
          console.log('vehicles are ', res1);
          this.vehicles = res1;
          loader.dismiss();

        }, err => {
          console.log('err gting compny vehicles ', err);
          loader.dismiss();

        });
     

    });
  }
  dismiss() {
    // console.log('>>>',this.vehicle);
    // console.log('>>>',this.vehicleLookUpDTO)
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'freight':this.freight
    });
  }

 select(vehicleId:number){
   this.commandService.assignVehicleUsingPOST({vehicleId:vehicleId,freightDTO:this.freight}).subscribe(res=>{
     console.log('vehicle assigned',res);
     this.freight=res;
     this.dismiss();
   },
   err=>{
    console.log('vehicle assign error ',err);

   }
   )
  
 }

}
