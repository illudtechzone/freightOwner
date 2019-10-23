import { UtilService } from './../../services/util.service';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { CommonService } from './../../services/common.service';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { AddEmployeComponent } from './../../components/add-employe/add-employe.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Driver, DriverDTO, CompanyDTO } from 'src/app/api/models';
import { utils } from 'protractor';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.page.html',
  styleUrls: ['./employes.page.scss'],
})
export class EmployesPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private queryResourceService:QueryResourceService,
    private commonService:CommonService,
    private commandService:CommandResourceService,
    private utilService:UtilService) { }


    drivers:DriverDTO[]=[];
    companyDTO:CompanyDTO={};
  ngOnInit() {

    this.commonService.getCompany().then(res1=>{
      console.log('compadegrrgny is ',res1.companyIdpCode);
      this.companyDTO=res1;
       this.queryResourceService.findAllDriversByCompanyIdpCodeUsingGET({companyIdpCode:'c1@gmail.com'}).subscribe(res2=>{

        console.log('drivers are  ',res2);
        this.drivers=res2;

       });
    });
   

  }


  async presentModal() {

    let driver:DriverDTO={name:'',phoneNumber:null,companyId:this.companyDTO.id};

    const modal = await this.modalController.create({
      component: AddEmployeComponent,
      componentProps: {
        'headerName': 'Add Employe',
        'driver':driver,
      }
    });

    modal.onDidDismiss().then((data: any) => {
      console.log('[]<>[]', data.data.newDriver.id);
      if (data.data.newDriver.id !==null)
        this.drivers.push(data.data.newDriver);
      });
    return await modal.present();
  }

  async editPresentModal(driver:DriverDTO) {
    console.log('driver to be edited  ',driver);
    const modal = await this.modalController.create({
      component: AddEmployeComponent,
      componentProps: {
        'headerName': 'Edit Employe',
        'driver':driver
      }
    });

    modal.onDidDismiss().then((data: any) => {
      console.log('[]<>[]', data.data.newDriver.id);
      if (data.data.newDriver.id != null){
        // this.drivers.push(data.data.newVehicle);
        this.drivers.splice(this.drivers.indexOf(driver),1);
        this.drivers.push(data.data.newDriver);
      }


    });
    return await modal.present();
  }


  async presentActionSheet(driver:DriverDTO) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete(driver);
        }
      },  {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.editPresentModal(driver);
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

delete(driver){
  console.log('driver to be deleted  ',driver.id);

  this.commandService.deleteDriverUsingDELETE(driver.id).subscribe(res1=>{
    console.log('deleted driver completed ',res1);
    this.drivers.splice(this.drivers.indexOf(driver),1);
  },
  err1=>{
    console.log('error deleting driver  ',err1);
    this.utilService.createToast('! ops server might be down try agign later ');

  })
}

}
