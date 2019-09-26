import { CompanyDTO } from './../api/models/company-dto';
import { Injectable } from '@angular/core';
import { Route } from '../dtos/route';
import { QueryResourceService } from '../api/services';
import { CurrentUserService } from './current-user.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  route: Route = new Route();
  companydto: CompanyDTO = {};

  constructor(private queryResource: QueryResourceService,
    private currentUserService: CurrentUserService) { }

  setRoute(route: Route) {
    this.route = route;
  }
  getRoute(): Route {
    return this.route;
  }
  getCompany(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.currentUserService.getCurrentUser(false).then((result: any) => {
        console.log('sucessful geting the user', result);

        console.log('uid ', result.preferred_username);
        this.queryResource.searchCompanyIDPCodeUsingGET(result.preferred_username).subscribe((result2: any) => {
          console.log('got the company ', result2);
          resolve(result2);

        }, err2 => {
            reject();
        });
      }, err => {
        reject();
      });
    });
  }


}
