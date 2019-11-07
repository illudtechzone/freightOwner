import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { VehicleDTO } from 'src/app/api/models';
import { Vehicle } from './../../dtos/vehicle';
import { ActionSheetController } from '@ionic/angular';
import { DriverDTO } from './../../api/models/driver-dto';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { CompanyDTO } from './../../api/models/company-dto';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.page.html',
  styleUrls: ['./assign-driver.page.scss'],
})
export class AssignDriverPage implements OnInit {
  companyDTO: CompanyDTO = {};
  drivers: DriverDTO[] = [];
  vehicle: VehicleDTO = {};
  constructor(private commonService: CommonService,
              private queryResourceService: QueryResourceService,
              private actionSheetController: ActionSheetController,
              private route: ActivatedRoute,
              private commandService:CommandResourceService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.vehicle = JSON.parse(params["vehicle"]);
      console.log('vehicle ',this.vehicle);
      console.log('vehicle ',this.vehicle.id);

  });

    this.commonService.getCompany().then(res1 => {
      console.log('compadegrrgny is ', res1.companyIdpCode);
      this.companyDTO = res1;

      this.queryResourceService.findAllDriversByCompanyIdpCodeUsingGET({companyIdpCode: this.companyDTO.companyIdpCode}).subscribe(res2 => {

        console.log('drivers are  ', res2);
        this.drivers = res2;

       });
    });


  }

  async presentActionSheet(driver: DriverDTO) {
    console.log('driver is ',driver);
    console.log('driver is ',driver.id);


    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Assign',
        role: 'destructive',
        icon: 'checkmark',
        handler: () => {
        this.assign(driver.id);
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  assign(id:number) {
// this.commandService.a
console.log('driver is ',id);

this.commandService.assignVehicleStaffForDriverUsingPOST({vehicleId:this.vehicle.id,staffId:id}).subscribe(
res1=>{
  console.log('sucess assignig driver ',res1);
}
,err1=>{
  console.log('error assignig driver ',err1);

}


);

  }

}
