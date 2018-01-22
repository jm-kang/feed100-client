import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Badge } from '@ionic-native/badge';
import { CommonServiceProvider } from '../common-service/common-service';

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
    public storage: Storage,
    private badge: Badge,    
    public commonService: CommonServiceProvider) {
    console.log('Hello CompanyServiceProvider Provider');
  }

  registerDeviceToken(uuid, device_token) {
    let url = this.commonService.getServerUrl() + '/company/api/device-token';
    let data = {
      "uuid" : uuid,
      "device_token" : device_token
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getCompanyInfo() {
    let url = this.commonService.getServerUrl() + '/company/api/company';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateAccount(avatar_image, nickname) {
    let url = this.commonService.getServerUrl() + '/company/api/company/account';
    let data = {
      "avatar_image" : avatar_image,
      "nickname" : nickname
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getCompanyHome() {
    let url = this.commonService.getServerUrl() + '/company/api/company/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getIsMyProject(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarms() {
    let url = this.commonService.getServerUrl() + '/company/api/company/alarms';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  alarmRead(alarm_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/alarm/read';
    let data = {
      "alarm_id" : alarm_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAlarmAndInterviewNum() {
    let url = this.commonService.getServerUrl() + '/company/api/company/alarm&interview/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  reportNewsfeed(newsfeed_id, newsfeed_comment_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/report/newsfeed';
    let data = {
      "newsfeed_id" : newsfeed_id,
      "newsfeed_comment_id" : newsfeed_comment_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  reportProject(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/report/project';
    let data = {
      "project_id" : project_id,
      "project_participant_id" : project_participant_id,
      "feedback_id" : feedback_id,
      "opinion_id" : opinion_id,
      "interview_id" : interview_id,
      "report_id" : report_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  } 

  getInterviews() {
    let url = this.commonService.getServerUrl() + '/company/api/company/interviews';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }
  
  getProjectInterviews(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/project/' + project_id + '/interviews';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterview(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/company/api/company/interview/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  requestInterview(project_participant_id, interview_request, interview_request_images) {
    let url = this.commonService.getServerUrl() + '/company/api/company/interview/' + project_participant_id;
    let data = {
      "interview_request" : interview_request,
      "interview_request_images" : interview_request_images
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeeds() {
    let url = this.commonService.getServerUrl() + '/company/api/newsfeeds';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeed(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/company/api/newsfeed/' + newsfeed_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  newsfeedLike(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/company/api/newsfeed/like';
    let data = {
      "newsfeed_id" : newsfeed_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
    let url = this.commonService.getServerUrl() + '/company/api/newsfeed/comment';
    let data = {
      "newsfeed_id" : newsfeed_id,
      "newsfeed_comment_content" : newsfeed_comment_content
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjects() {
    let url = this.commonService.getServerUrl() + '/company/api/projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectHome(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/home/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getSideMenuData(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/side-menu/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipants(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/participants/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipant(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/participant/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReports(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/reports/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  selectReport(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/report/select/' + project_participant_id;
    let data = {};
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReport(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/report/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getFeedback(project_id, feedback_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/' + project_id + '/feedback/' + feedback_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  setAlarmAndInterviewNum() {
    this.getAlarmAndInterviewNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarmNum = data.data.alarm_num;
          this.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // 내 프로젝트 or not
  accessProjectCard(componentRef, project_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.getIsMyProject(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.is_my_project) {
            this.openCompanyProjectHomePage(componentRef, project_id);
          }
          else {
            this.openCompanyProjectStoryPage(componentRef, project_id);
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, componentRef.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }
  
  openCompanyProjectHomePage(componentRef, project_id) {
    componentRef.navCtrl.push('CompanyProjectHomePage', { "project_id" : project_id });
  }

  openCompanyProjectStoryPage(componentRef, project_id) {
    componentRef.navCtrl.push('CompanyProjectStoryPage', { "project_id" : project_id });
  }

}
