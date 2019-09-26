/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Vehicle } from '../models/vehicle';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { Driver } from '../models/driver';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly findAllvehiclesUsingGETPath = '/api/getAllvehicles';
  static readonly searchCompanyIDPCodeUsingGETPath = '/api/getcompany/{companyIdpCode}';
  static readonly searchCustomerIDPCodeUsingGETPath = '/api/getcustomer/{customerIdpCode}';
  static readonly searchDriverIDPCodeUsingGETPath = '/api/getdriver/{driverIdpCode}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `QueryResourceService.FindAllvehiclesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * - `companyIdpCode`: companyIdpCode
   *
   * @return OK
   */
  findAllvehiclesUsingGETResponse(params: QueryResourceService.FindAllvehiclesUsingGETParams): __Observable<__StrictHttpResponse<Array<Vehicle>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.companyIdpCode != null) __params = __params.set('companyIdpCode', params.companyIdpCode.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/getAllvehicles`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Vehicle>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllvehiclesUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * - `companyIdpCode`: companyIdpCode
   *
   * @return OK
   */
  findAllvehiclesUsingGET(params: QueryResourceService.FindAllvehiclesUsingGETParams): __Observable<Array<Vehicle>> {
    return this.findAllvehiclesUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Vehicle>)
    );
  }

  /**
   * @param companyIdpCode companyIdpCode
   * @return OK
   */
  searchCompanyIDPCodeUsingGETResponse(companyIdpCode: string): __Observable<__StrictHttpResponse<Company>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/getcompany/${companyIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Company>;
      })
    );
  }
  /**
   * @param companyIdpCode companyIdpCode
   * @return OK
   */
  searchCompanyIDPCodeUsingGET(companyIdpCode: string): __Observable<Company> {
    return this.searchCompanyIDPCodeUsingGETResponse(companyIdpCode).pipe(
      __map(_r => _r.body as Company)
    );
  }

  /**
   * @param customerIdpCode customerIdpCode
   * @return OK
   */
  searchCustomerIDPCodeUsingGETResponse(customerIdpCode: string): __Observable<__StrictHttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/getcustomer/${customerIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Customer>;
      })
    );
  }
  /**
   * @param customerIdpCode customerIdpCode
   * @return OK
   */
  searchCustomerIDPCodeUsingGET(customerIdpCode: string): __Observable<Customer> {
    return this.searchCustomerIDPCodeUsingGETResponse(customerIdpCode).pipe(
      __map(_r => _r.body as Customer)
    );
  }

  /**
   * @param driverIdpCode driverIdpCode
   * @return OK
   */
  searchDriverIDPCodeUsingGETResponse(driverIdpCode: string): __Observable<__StrictHttpResponse<Driver>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/getdriver/${driverIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Driver>;
      })
    );
  }
  /**
   * @param driverIdpCode driverIdpCode
   * @return OK
   */
  searchDriverIDPCodeUsingGET(driverIdpCode: string): __Observable<Driver> {
    return this.searchDriverIDPCodeUsingGETResponse(driverIdpCode).pipe(
      __map(_r => _r.body as Driver)
    );
  }
}

module QueryResourceService {

  /**
   * Parameters for findAllvehiclesUsingGET
   */
  export interface FindAllvehiclesUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;

    /**
     * companyIdpCode
     */
    companyIdpCode?: string;
  }
}

export { QueryResourceService }
