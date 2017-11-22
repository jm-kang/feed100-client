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
  alarmNum = 0;
  interviewNum = 0;

  constructor(
    public http: Http,
    public storage: Storage) {
    console.log('Hello CompanyServiceProvider Provider');
  }

  getServerUrl() {
    // return 'http://192.168.0.10:3000';
    // return 'http://localhost:3000';
    return 'http://www.feed100.me';
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

  getCompanyInfo() {
    let url = this.getServerUrl() + '/company/api/company';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateAccount(avatar_image, nickname, introduction) {
    let url = this.getServerUrl() + '/company/api/company/account';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "avatar_image" : avatar_image,
      "nickname" : nickname,
      "introduction" : introduction
    };

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getCompanyHome() {
    let url = this.getServerUrl() + '/company/api/company/home';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });

  }

  getIsMyProject(project_id) {
    let url = this.getServerUrl() + '/company/api/company/project/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarms() {
    let url = this.getServerUrl() + '/company/api/company/alarms';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  alarmRead(alarm_id) {
    let url = this.getServerUrl() + '/company/api/company/alarm/read';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "alarm_id" : alarm_id
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAlarmAndInterviewNum() {
    let url = this.getServerUrl() + '/company/api/company/alarm&interview/num';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterviews() {
    let url = this.getServerUrl() + '/company/api/company/interviews';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }
  
  getProjectInterviews(project_id) {
    let url = this.getServerUrl() + '/company/api/company/project/' + project_id + '/interviews';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterview(project_participant_id) {
    let url = this.getServerUrl() + '/company/api/company/interview/' + project_participant_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  requestInterview(project_participant_id, interview_request, interview_request_images) {
    let url = this.getServerUrl() + '/company/api/company/interview/' + project_participant_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "interview_request" : interview_request,
      "interview_request_images" : interview_request_images
    };

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeeds() {
    let url = this.getServerUrl() + '/company/api/newsfeeds';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeed(newsfeed_id) {
    let url = this.getServerUrl() + '/company/api/newsfeed/' + newsfeed_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  newsfeedLike(newsfeed_id) {
    let url = this.getServerUrl() + '/company/api/newsfeed/like';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "newsfeed_id" : newsfeed_id
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
    let url = this.getServerUrl() + '/company/api/newsfeed/comment';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "newsfeed_id" : newsfeed_id,
      "newsfeed_comment_content" : newsfeed_comment_content
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjects() {
    let url = this.getServerUrl() + '/company/api/projects';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProject(project_id) {
    let url = this.getServerUrl() + '/company/api/project/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectHome(project_id) {
    let url = this.getServerUrl() + '/company/api/project/home/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getSideMenuData(project_id) {
    let url = this.getServerUrl() + '/company/api/project/side-menu/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipants(project_id) {
    let url = this.getServerUrl() + '/company/api/project/participants/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipant(project_participant_id) {
    let url = this.getServerUrl() + '/company/api/project/participant/' + project_participant_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReports(project_id) {
    let url = this.getServerUrl() + '/company/api/project/reports/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  selectReport(project_participant_id) {
    let url = this.getServerUrl() + '/company/api/project/report/select/' + project_participant_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {};

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReport(project_id) {
    let url = this.getServerUrl() + '/company/api/project/report/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getFeedback(project_id, feedback_id) {
    let url = this.getServerUrl() + '/company/api/project/' + project_id + '/feedback/' + feedback_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

}
