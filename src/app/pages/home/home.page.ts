import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { FreightView } from 'src/app/dtos/freight-view';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { FreightDTO } from 'src/app/api/models';
import { OwnerService } from 'src/app/services/owner.service';
import { JhiWebSocketService } from 'src/app/services/jhi-web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  segmentName: string = "requests";
  freights: FreightDTO[];
  constructor(private utilService:UtilService,private commandService: CommandResourceService, private queryService: QueryResourceService,
    private ownerService: OwnerService, private notification: JhiWebSocketService) {

  }
  async ngOnInit() {
  
    const sample = await this.ownerService.getOwner();
    console.log('INit Method working ' + sample.id);
    this.utilService.createLoader()
    .then(loader => {
      loader.present();
    const params: QueryResourceService.FindAllFreightsUsingGETParams = { requestedStatus: 'REQUEST' };
    this.queryService.findAllFreightsUsingGET(params).subscribe(data => {
      loader.dismiss();
      this.freights = data;
    },err=>{
      loader.dismiss();

    });
  });

    console.log('Ng on init working');

  
}
  deleteElement(index) {
    console.log("Index Value" + index);
  }


  segmentButtonClicked(evnt) {

    console.log('evnt is ', evnt.target.value);
    this.segmentName = evnt.target.value;

  }

}
