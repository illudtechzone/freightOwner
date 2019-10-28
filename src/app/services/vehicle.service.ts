import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { CommonService } from './common.service';
import { CommandResourceService } from 'src/app/api/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  company: any;

  constructor(private commonService: CommonService,
    private queryResource: QueryResourceService
  ) { }


  ngOnInit() {




  }

  getVehicles():Promise<any>{
    return new Promise((resolve, reject) => {

      this.commonService.getCompany().then((res: any) => {
        this.company = res;
        if (this.company !== null) {
          console.log('if is >>>>>>>>>>>> ',this.company !== null);

          this.queryResource.findAllvehiclesUsingGET({ companyIdpCode: this.company.companyIdpCode }).subscribe((res1: any) => {
            console.log('vehicles are ', res1);
            resolve(res1);
    
          }, err => {
            console.log('err gting compny vehicles ', err);
            reject();
          });
        }
        console.log('company got ', res);
     
      }, err => {
        console.log('company got error ', err);
        reject();
  
      });      
    });
  }
}
