import { CommonService } from './../../services/common.service';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { AddEmployeComponent } from './../../components/add-employe/add-employe.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Driver, DriverDTO, CompanyDTO } from 'src/app/api/models';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.page.html',
  styleUrls: ['./employes.page.scss'],
})
export class EmployesPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private queryResourceService:QueryResourceService,
    private commonService:CommonService) { }


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
      if (data.data.newDriver.id === '')
        this.drivers.push(data.data.newDriver);
      });
    return await modal.present();
  }

  async editPresentModal() {
    const modal = await this.modalController.create({
      component: AddEmployeComponent,
      componentProps: {
        'headerName': 'Edit Employe',
        
      }
    });

    // modal.onDidDismiss().then((data: any) => {
    //   console.log('[]<>[]', data.data.newVehicle.registerNo);
    //   if (data.data.newVehicle.registerNo != '')
    //     this.vehicles.push(data.data.newVehicle);


    // });
    return await modal.present();
  }


  async presentActionSheet() {
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
          this.editPresentModal();
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
