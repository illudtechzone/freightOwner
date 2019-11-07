import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { QueryResourceService, CommandResourceService, AccountResourceService } from '../api/services';
import { CompanyDTO, UserDTO } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {


  companyDto: CompanyDTO = null;
  user: UserDTO;
  constructor(private oauthService: OAuthService,
              private queryResource: QueryResourceService,
              private commandResource: CommandResourceService,
              private accountResource: AccountResourceService) { }

    async getOwner() {
      if (!(this.companyDto == null)) {
        console.log('company is found');
        return this.companyDto;
      } else {
        console.log('company is not found found');
        this.user = await this.accountResource.getAccountUsingGET().toPromise();
        this.companyDto = await this.queryResource.searchCompanyIDPCodeUsingGET(this.user.login).toPromise();
        return this.companyDto;

  }
}

clearOwnerDetails() {
  console.log('clear all owner details');
  this.companyDto = null;
  this.user = null;

}

}
