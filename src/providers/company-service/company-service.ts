import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';


/*
  Generated class for the CompanyServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CompanyServiceProvider {

  constructor(
    public http: Http,
    public storage: Storage) {
    console.log('Hello CompanyServiceProvider Provider');
  }

  getServerUrl() {
    // return 'http://172.30.1.22:3000';
    return 'http://localhost:3000';
    // return 'http://www.feed100.me';
  } 
  
  registerDeviceToken(uuid, device_token) {
    let url = this.getServerUrl() + '/company/api/device-token';
    let data = {
      "uuid" : uuid,
      "device_token" : device_token
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

}
