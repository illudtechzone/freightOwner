import { IonicModule } from '@ionic/angular';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportationDataComponent } from './transportation-data/transportation-data.component';
import { QuotedDataComponent } from './quoted-data/quoted-data.component';



@NgModule({
  declarations: [AddVehicleComponent,TransportationDataComponent,QuotedDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AddVehicleComponent,TransportationDataComponent,QuotedDataComponent]
})
export class SharedModule { }
