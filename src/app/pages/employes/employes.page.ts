import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { AddEmployeComponent } from './../../components/add-employe/add-employe.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.page.html',
  styleUrls: ['./employes.page.scss'],
})
export class EmployesPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController,
    private modalController:ModalController,
    private queryResourceService:QueryResourceService) { }

  ngOnInit() {


  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddEmployeComponent,
      componentProps: {
        'headerName': 'Add Employe',
        
      }
    });

    // modal.onDidDismiss().then((data: any) => {
    //   console.log('[]<>[]', data.data.newVehicle.registerNo);
    //   if (data.data.newVehicle.registerNo != '')
    //     this.vehicles.push(data.data.newVehicle);


    // });
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
