import { IonicModule } from '@ionic/angular';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportationDataComponent } from './transportation-data/transportation-data.component';



@NgModule({
  declarations: [AddVehicleComponent,TransportationDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AddVehicleComponent,TransportationDataComponent]
})
export class SharedModule { }
