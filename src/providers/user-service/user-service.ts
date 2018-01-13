import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { CommonServiceProvider } from '../common-service/common-service';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  alarmNum = 0;
  interviewNum = 0;
  userInterviewPage;
  userMypagePage;
  userAlarmPage;
  userProjectHomePage;
  userProjectInterviewDetailPage;
  userProjectSideMenuPage;
  
  constructor(
    public http: Http,
    public storage: Storage,
    public commonService: CommonServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }
  
  registerDeviceToken(uuid, device_token) {
    let url = this.commonService.getServerUrl() + '/user/api/device-token';
    let data = {
      "uuid" : uuid,
      "device_token" : device_token
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getUserInfo() {
    let url = this.commonService.getServerUrl() + '/user/api/user';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateAccount(avatar_image, nickname, introduction) {
    let url = this.commonService.getServerUrl() + '/user/api/user/account';
    let data = {
      "avatar_image" : avatar_image,      
      "nickname" : nickname,
      "introduction" : introduction
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  updateProfile(gender, age, job, region, marriage, interests, avatar_image) {
    let url = this.commonService.getServerUrl() + '/user/api/user/profile';
    let data = {
      "gender" : gender,
      "age" : age,
      "job" : job,
      "region" : region,
      "marriage" : marriage,
      "interests" : interests,
      "avatar_image" : avatar_image
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getUserHome() {
    let url = this.commonService.getServerUrl() + '/user/api/user/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getUserAndProjectAndParticipation(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/user/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarms() {
    let url = this.commonService.getServerUrl() + '/user/api/user/alarms';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  alarmRead(alarm_id) {
    let url = this.commonService.getServerUrl() + '/user/api/user/alarm/read';
    let data = {
      "alarm_id" : alarm_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAlarmAndInterviewNum() {
    let url = this.commonService.getServerUrl() + '/user/api/user/alarm&interview/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterviews() {
    let url = this.commonService.getServerUrl() + '/user/api/user/interviews';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterview(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/user/interview/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  responseInterview(interview_id, interview_response, interview_response_images) {
    let url = this.commonService.getServerUrl() + '/user/api/user/interview/' + interview_id;
    let data = {
      "interview_response" : interview_response,
      "interview_response_images" : interview_response_images
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  redeem(project_code) {
    let url = this.commonService.getServerUrl() + '/user/api/redeem/' + project_code;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeeds() {
    let url = this.commonService.getServerUrl() + '/user/api/newsfeeds';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeed(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/user/api/newsfeed/' + newsfeed_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  newsfeedLike(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/user/api/newsfeed/like';
    let data = {
      "newsfeed_id" : newsfeed_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
    let url = this.commonService.getServerUrl() + '/user/api/newsfeed/comment';
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
    let url = this.commonService.getServerUrl() + '/user/api/projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectHome(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/home/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getSideMenuData(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/side-menu/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReport(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/report/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  projectReport(project_id, project_report_images, project_report_story_summary_content, project_report_pros_content, project_report_cons_content, project_report_overall_opinion_content) {
    let url = this.commonService.getServerUrl() + '/user/api/project/report/' + project_id;
    let data = {
      "project_report_images" : project_report_images,
      "project_report_story_summary_content" : project_report_story_summary_content,
      "project_report_pros_content" : project_report_pros_content,
      "project_report_cons_content" : project_report_cons_content,
      "project_report_overall_opinion_content" : project_report_overall_opinion_content
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }
  
  getProjectParticipation(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/participation/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  projectParticipation(project_id, project_participation_objective_conditions) {
    let url = this.commonService.getServerUrl() + '/user/api/project/participation';
    let data = {
      "project_id" : project_id,
      "project_participation_objective_conditions" : project_participation_objective_conditions,
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  projectFeedback(project_id, project_feedback, project_feedback_hashtags, project_feedback_images, project_first_impression_rate) {
    let url = this.commonService.getServerUrl() + '/user/api/project/feedback';
    let data = {
      "project_id" : project_id,
      "project_feedback" : project_feedback,
      "project_feedback_hashtags" : project_feedback_hashtags,
      "project_feedback_images" : project_feedback_images,
      "project_first_impression_rate" : project_first_impression_rate
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getFeedback(project_id, feedback_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/' + project_id + '/feedback/' + feedback_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  registerOpinion(feedback_id, is_empathy, opinion, opinion_image) {
    let url = this.commonService.getServerUrl() + '/user/api/project/feedback/opinion';
    let data = {
      "feedback_id" : feedback_id,
      "is_empathy" : is_empathy,
      "opinion" : opinion,
      "opinion_image" : opinion_image
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  reward(project_id, satisfaction_rate, recommendation_rate) {
    let url = this.commonService.getServerUrl() + '/user/api/project/reward/' + project_id;
    let data = {
      "satisfaction_rate" : satisfaction_rate,
      "recommendation_rate" : recommendation_rate
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

}
