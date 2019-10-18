import { QuotedDataComponent } from './../../components/quoted-data/quoted-data.component';
import { SharedModule } from 'src/app/components/shared.module';
import { TransportationDataComponent } from './../../components/transportation-data/transportation-data.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ChooseVehicleComponent } from 'src/app/components/choose-vehicle/choose-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  entryComponents:[TransportationDataComponent,QuotedDataComponent,ChooseVehicleComponent]
})
export class HomePageModule {}
