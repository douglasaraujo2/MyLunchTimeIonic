import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  baseKey:String = 'AIzaSyDHCf2HyStY1Mllc4zUZMA-7u16Ji-7JWU';
  baseUrl:String = 'https://maps.googleapis.com/maps/api/geocode/json?key=';

  public jsonResponse: any;

  constructor(public http: HttpClient) {
    // console.log('Hello LocationProvider Provider');
    this.baseUrl = String(this.baseUrl) + this.baseKey;
  }
  // input=Paris
  searchAddress(address){
    var url = this.baseUrl += '&address='+ address;
    return new Promise(resolve => {
      this.http.get<any>(url).subscribe(data => {
        this.jsonResponse =  data;
        resolve(this.jsonResponse);
      });
    });
  }

}
