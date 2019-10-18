import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployesPage } from './employes.page';
import { AddEmployeComponent } from 'src/app/components/add-employe/add-employe.component';

const routes: Routes = [
  {
    path: '',
    component: EmployesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployesPage],
  entryComponents:[AddEmployeComponent]
})
export class EmployesPageModule {}
