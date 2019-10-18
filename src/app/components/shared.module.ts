import { ChooseVehicleComponent } from './choose-vehicle/choose-vehicle.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { IonicModule } from '@ionic/angular';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransportationDataComponent } from './transportation-data/transportation-data.component';
import { QuotedDataComponent } from './quoted-data/quoted-data.component';



@NgModule({
  declarations: [AddVehicleComponent,TransportationDataComponent,AddEmployeComponent,ChooseVehicleComponent ,QuotedDataComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AddVehicleComponent,TransportationDataComponent,AddEmployeComponent,QuotedDataComponent,ChooseVehicleComponent]
})
export class SharedModule { }
