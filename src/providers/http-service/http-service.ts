import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(public http: Http) {
    console.log('Hello HttpServiceProvider Provider');
  }

  localLogin(username, password, role) {
    let url = 'http://www.feed100.me/auth/login';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  SNSLogin(provider, app_id, role) {
    let url = 'http://www.feed100.me/auth/login-sns';
    let data = {
      "provider" : provider,
      "app_id" : app_id,
      "role" : role
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  localRegister(username, password, role, nickname) {
    let url = 'http://www.feed100.me/auth/registration';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role,
      "nickname" : nickname
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  SNSRegister(username, role, nickname, provider, app_id) {
    let url = 'http://www.feed100.me/auth/registration-sns';
    let data = {
      "username" : username,
      "role" : role,
      "nickname" : nickname,
      "provider" : provider,
      "app_id" : app_id
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

}
