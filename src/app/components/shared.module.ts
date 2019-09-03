import { IonicModule } from '@ionic/angular';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AddVehicleComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AddVehicleComponent]
})
export class SharedModule { }
