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
  notificationNum = 0;

  constructor(
    public http: Http,
    public storage: Storage,
    private badge: Badge,    
    public commonService: CommonServiceProvider) {
    console.log('Hello CompanyServiceProvider Provider');
  }

  // 리뉴얼 후
  getProjectHome() {
    let url = this.commonService.getServerUrl() + '/company/api/project/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotifications() {
    let url = this.commonService.getServerUrl() + '/company/api/notifications';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotificationNum() {
    let url = this.commonService.getServerUrl() + '/company/api/notification/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  } 

  // 리뉴얼 후
  getInterviews(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/company/api/interviews/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjectParticipants(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/participants/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }
    
  // 리뉴얼 후
  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjectReport(project_id) {
    let url = this.commonService.getServerUrl() + '/company/api/comprehensive-report/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  readNotification(notification_id) {
    let url = this.commonService.getServerUrl() + '/company/api/notification/' + notification_id + '/read';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, {}, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  likeInterview(interview_id) {
    let url = this.commonService.getServerUrl() + '/company/api/interview/' + interview_id + '/like';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, {}, { headers: headers }).map(res => res.json());
    });
  }
 
  // 리뉴얼 후
  requestInterview(project_id, project_participant_id, interview_question) {
    let url = this.commonService.getServerUrl() + '/company/api/interview/' + project_id + '/' + project_participant_id;
    let data = {
      "interview_question" : interview_question
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  requestGroupInterview(project_id, project_participants_id, interview_question) {
    let url = this.commonService.getServerUrl() + '/company/api/group-interview/' + project_id;
    let data = {
      "project_participants_id" : project_participants_id,
      "interview_question" : interview_question
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
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

  // 리뉴얼 후
  setNotificationNum() {
    this.getNotificationNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.notificationNum = data.data.notification_num;
          this.badge.set(data.data.notification_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  // 내 프로젝트 or not
  // accessProjectCard(componentRef, project_id) {
  //   this.commonService.isLoadingActive = true;
  //   let loading = this.commonService.presentLoading();

  //   this.getIsMyProject(project_id)
  //   .finally(() => {
  //     loading.dismiss();
  //   })
  //   .subscribe(
  //     (data) => {
  //       if(data.success == true) {
  //         if(data.data.is_my_project) {
  //           this.openCompanyProjectHomePage(componentRef, project_id);
  //         }
  //         else {
  //           this.openCompanyProjectStoryPage(componentRef, project_id);
  //         }
  //       }
  //       else if(data.success == false) {
  //         this.commonService.apiRequestErrorHandler(data, componentRef.navCtrl)
  //         .then(() => {
  //           this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
  //         })
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.commonService.showBasicAlert('오류가 발생했습니다.');
  //     }
  //   );
  // }
  
  // openCompanyProjectHomePage(componentRef, project_id) {
  //   componentRef.navCtrl.push('CompanyProjectHomePage', { "project_id" : project_id });
  // }

  // openCompanyProjectStoryPage(componentRef, project_id) {
  //   componentRef.navCtrl.push('CompanyProjectStoryPage', { "project_id" : project_id });
  // }

  // 리뉴얼 전

  // getCompanyInfo() {
  //   let url = this.commonService.getServerUrl() + '/company/api/company';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // updateAccount(avatar_image, nickname) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/account';
  //   let data = {
  //     "avatar_image" : avatar_image,
  //     "nickname" : nickname
  //   };
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getCompanyHome() {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/home';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getIsMyProject(project_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/project/' + project_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // reportNewsfeed(newsfeed_id, newsfeed_comment_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/report/newsfeed';
  //   let data = {
  //     "newsfeed_id" : newsfeed_id,
  //     "newsfeed_comment_id" : newsfeed_comment_id
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // reportProject(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/report/project';
  //   let data = {
  //     "project_id" : project_id,
  //     "project_participant_id" : project_participant_id,
  //     "feedback_id" : feedback_id,
  //     "opinion_id" : opinion_id,
  //     "interview_id" : interview_id,
  //     "report_id" : report_id
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // } 
   
  // getProjectInterviews(project_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/project/' + project_id + '/interviews';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getInterview(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/company/interview/' + project_participant_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }


  // getNewsfeeds() {
  //   let url = this.commonService.getServerUrl() + '/company/api/newsfeeds';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getNewsfeed(newsfeed_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/newsfeed/' + newsfeed_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // newsfeedLike(newsfeed_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/newsfeed/like';
  //   let data = {
  //     "newsfeed_id" : newsfeed_id
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
  //   let url = this.commonService.getServerUrl() + '/company/api/newsfeed/comment';
  //   let data = {
  //     "newsfeed_id" : newsfeed_id,
  //     "newsfeed_comment_content" : newsfeed_comment_content
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getProjects() {
  //   let url = this.commonService.getServerUrl() + '/company/api/projects';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getSideMenuData(project_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/project/side-menu/' + project_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getProjectParticipant(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/project/participant/' + project_participant_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getProjectReports(project_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/project/reports/' + project_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // selectReport(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/project/report/select/' + project_participant_id;
  //   let data = {};
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getFeedback(project_id, feedback_id) {
  //   let url = this.commonService.getServerUrl() + '/company/api/project/' + project_id + '/feedback/' + feedback_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }
}
