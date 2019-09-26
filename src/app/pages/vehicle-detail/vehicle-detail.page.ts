import { Vehicle } from './../../dtos/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  styleUrls: ['./vehicle-detail.page.scss'],
})
export class VehicleDetailPage implements OnInit {
  vehicle:Vehicle=new Vehicle();
  constructor() { }

  ngOnInit() {
  }

}
