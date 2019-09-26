import { Component } from '@angular/core';
import { FreightView } from 'src/app/dtos/freight-view';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  freightView:FreightView={freight:{},isMoreInfo:false,isEdit:false};
  constructor() {}

}
