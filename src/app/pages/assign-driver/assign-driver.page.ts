import { ActionSheetController } from '@ionic/angular';
import { DriverDTO } from './../../api/models/driver-dto';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { CompanyDTO } from './../../api/models/company-dto';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.page.html',
  styleUrls: ['./assign-driver.page.scss'],
})
export class AssignDriverPage implements OnInit {
  companyDTO: CompanyDTO = {};
  drivers: DriverDTO[] = [];
  constructor(private commonService: CommonService,
              private queryResourceService: QueryResourceService,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {

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
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      },  {
        text: 'Edit',
        icon: 'create',
        handler: () => {
        }
      }, {
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


}
