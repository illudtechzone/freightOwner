import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss'],
})
export class AddEmployeComponent implements OnInit {
  headerName:string;
  constructor(private modalCtrl:ModalController,private navParams:NavParams) { 
    navParams.get('headerName');

  }

  ngOnInit() {}

  dismiss() {
    // console.log('>>>',this.vehicle);
    // console.log('>>>',this.vehicleLookUpDTO)
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      // 'newVehicle':this.vehicle
    });
  }


}
