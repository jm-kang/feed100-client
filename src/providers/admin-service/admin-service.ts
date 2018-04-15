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
  Generated class for the AdminServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AdminServiceProvider {
  notificationNum = 0;

  constructor(
    public http: Http,
    public storage: Storage,
    private badge: Badge,        
    public commonService: CommonServiceProvider) {
    console.log('Hello AdminServiceProvider Provider');
  }

  // 리뉴얼 후
  getProjects() {
    let url = this.commonService.getServerUrl() + '/admin/api/projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getAllProjects() {
    let url = this.commonService.getServerUrl() + '/admin/api/all-projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotifications() {
    let url = this.commonService.getServerUrl() + '/admin/api/notifications';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotificationNum() {
    let url = this.commonService.getServerUrl() + '/admin/api/notification/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjectHome(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjectParticipants(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/participants/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getInterviews(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/interviews/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }
  
  // 리뉴얼 후
  getProjectReport(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/comprehensive-report/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  likeInterview(interview_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/interview/' + interview_id + '/like';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, {}, { headers: headers }).map(res => res.json());
    });
  }
  
  // 리뉴얼 후
  requestInterview(project_id, project_participant_id, interview_question) {
    let url = this.commonService.getServerUrl() + '/admin/api/interview/' + project_id + '/' + project_participant_id;
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
    let url = this.commonService.getServerUrl() + '/admin/api/group-interview/' + project_id;
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
  sendPushNotification(project_participant_id, message) {
    let url = this.commonService.getServerUrl() + '/admin/api/push-notification/' + project_participant_id;
    let data = {
      "message" : message
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  sanctionParticipant(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/sanction/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.delete(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  selectParticipant(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/selection/' + project_participant_id;
    let data = {};
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  endProjectRecommendationRate(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/recommendation-rate/end';
    let data = {};
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }
  
  // 리뉴얼 후
  updateProjectPrivateState(project_id, value) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/private';
    let data = {
      "value" : value
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  endProjectJudge(project_id, value) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/judge/end';
    let data = {
      "value" : value
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  registerDeviceToken(uuid, device_token) {
    let url = this.commonService.getServerUrl() + '/admin/api/device-token';
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
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  // 리뉴얼 전 

  // getAdminInfo() {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // updateAccount(avatar_image, nickname) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/account';
  //   let data = {
  //     "avatar_image" : avatar_image,
  //     "nickname" : nickname
  //   };
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getAdminHome() {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/home';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // sanctionNewsfeed(newsfeed_id, newsfeed_comment_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/sanction/newsfeed/' + newsfeed_id + '/' + newsfeed_comment_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.delete(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // sanctionProject(project_id, user_id, project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/sanction/project/' + project_id + '/' + user_id + '/' + project_participant_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.delete(url, { headers: headers }).map(res => res.json());
  //   });
  // } 

  // getProjectInterviews(project_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/project/' + project_id + '/interviews';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getInterview(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/admin/interview/' + project_participant_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getNewsfeeds() {
  //   let url = this.commonService.getServerUrl() + '/admin/api/newsfeeds';
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getNewsfeed(newsfeed_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/' + newsfeed_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // updateNewsfeedPrivateState(newsfeed_id, value) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/' + newsfeed_id + '/private';
  //   let data = {
  //     "value" : value
  //   };
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // newsfeedLike(newsfeed_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/like';;
  //   let data = {
  //     "newsfeed_id" : newsfeed_id
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/comment';
  //   let data = {
  //     "newsfeed_id" : newsfeed_id,
  //     "newsfeed_comment_content" : newsfeed_comment_content
  //   }
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.post(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // updateProjectPrivateState(project_id, value) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/private';
  //   let data = {
  //     "value" : value
  //   };
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getSideMenuData(project_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/side-menu/' + project_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getProjectParticipant(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/participant/' + project_participant_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // selectReport(project_participant_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/report/select/' + project_participant_id;
  //   let data = {};
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.put(url, data, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getProjectReport(project_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/report/' + project_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

  // getFeedback(project_id, feedback_id) {
  //   let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/feedback/' + feedback_id;
  //   return Observable.fromPromise(this.commonService.getHeaders('access'))
  //   .mergeMap((headers) => {
  //     return this.http.get(url, { headers: headers }).map(res => res.json());
  //   });
  // }

}
