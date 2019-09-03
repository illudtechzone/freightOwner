import { AddVehicleComponent } from './../../components/add-vehicle/add-vehicle.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: AddVehicleComponent
    });
    return await modal.present();
  }

}
