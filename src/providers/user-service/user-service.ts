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
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  notificationNum = 0;
  
  constructor(
    public http: Http,
    public storage: Storage,
    private badge: Badge,
    public commonService: CommonServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }
  
  // 리뉴얼 후
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

  // 리뉴얼 후
  getUserInfo() {
    let url = this.commonService.getServerUrl() + '/user/api/user';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateAccount(avatar_image, nickname) {
    let url = this.commonService.getServerUrl() + '/user/api/user/account';
    let data = {
      "avatar_image" : avatar_image,      
      "nickname" : nickname
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

  // 리뉴얼 후
  getUserAndProjectInfo(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/user&project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotifications() {
    let url = this.commonService.getServerUrl() + '/user/api/notifications';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  readNotification(notification_id) {
    let url = this.commonService.getServerUrl() + '/user/api/notification/' + notification_id + '/read';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, {}, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getNotificationNum() {
    let url = this.commonService.getServerUrl() + '/user/api/notification/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  reportNewsfeed(newsfeed_id, newsfeed_comment_id) {
    let url = this.commonService.getServerUrl() + '/user/api/user/report/newsfeed';
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
    let url = this.commonService.getServerUrl() + '/user/api/user/report/project';
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

  getInterviews(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/user/api/interviews/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getInterview(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/user/api/interview/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  answerInterview(project_id, project_participant_id, interview_id, interview_answer, interview_reward) {
    let url = this.commonService.getServerUrl() + '/user/api/interview/' + project_id + '/' + project_participant_id + '/' + interview_id;
    let data = {
      "interview_answer" : interview_answer,
      "interview_reward" : interview_reward
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
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

  getPointHistory() {
    let url = this.commonService.getServerUrl() + '/user/api/point-history';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  pointExchange(point, bank_name, account_number, account_holder_name) {
    let url = this.commonService.getServerUrl() + '/user/api/point-exchange';
    let data = {
      "point" : point,
      "bank_name" : bank_name,
      "account_number" : account_number,
      "account_holder_name" : account_holder_name
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjects() {
    let url = this.commonService.getServerUrl() + '/user/api/projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getAllProjects() {
    let url = this.commonService.getServerUrl() + '/user/api/all-projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  getProjectHome(project_id) {
    let url = this.commonService.getServerUrl() + '/user/api/project/' + project_id + '/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  // 리뉴얼 후
  checkParticipationCondition(project_id, project_participation_objective_conditions) {
    let url = this.commonService.getServerUrl() + '/user/api/project/' + project_id + '/process/condition';
    let data = {
      "project_participation_objective_conditions" : project_participation_objective_conditions,
      "phone_os" : this.commonService.getDevice().platform,
      "phone_model" : this.commonService.getDevice().model
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
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

  writeProjectReport(project_id, project_report_images, project_report_story_summary_content, project_report_pros_content, project_report_cons_content, project_report_overall_opinion_content) {
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

  reward(project_id, recommendation_rate) {
    let url = this.commonService.getServerUrl() + '/user/api/project/reward/' + project_id;
    let data = {
      "recommendation_rate" : recommendation_rate
    }
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

  // 진행중
  // 	참여o - 프로젝트 홈
  //    completion - 프로젝트 홈
  //    quiz - 인터뷰 폼
  //    condition - 스토리
  //    else - 참여 불가
  // 	참여x
  // 		인원 꽉참 - 스토리
  // 		인원 안참
  // 종료
  // 	참여o
  // 		보상 전
  //      심사중 - 알림
  //      심사끝 - 보상 페이지
  // 		보상 후 - 스토리
  // 	참여x - 스토리
  // 리뉴얼 후
  accessProjectCard(componentRef, project_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    let messages = [
      '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
      '이미 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
      '프로젝트에 참여하려면 우선 몇 가지 질문에 응답해야 합니다!<br/>진행하시겠습니까?',
      '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
      '아직 심사가 진행중입니다!<br/>심사는 프로젝트 종료 후 최대 2일까지 걸릴 수 있습니다.<br/>다음에 다시 시도해주세요.',      
      '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    ]
    // is_end(심사) / is_exceeded / is_proceeding
    this.getUserAndProjectInfo(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.project_info.is_proceeding) {
            if(data.data.project_participation_info) {
              if(data.data.project_participation_info.process_completion) {
                this.commonService.showConfirmAlert(messages[0], 
                  () => {
                    this.openUserProjectHomePage(componentRef, project_id);
                  }
                );
              }
              else if(data.data.project_participation_info.process_quiz) {
                this.commonService.showBasicAlert('퀴즈를 푸셨어요!');
              }
              else if(data.data.project_participation_info.process_condition) {
                this.commonService.showBasicAlert('조건을 통과하셨어요!');
              }
              else {
                this.commonService.showBasicAlert('조건을 충족하지 못해 이 프로젝트에 참여하실 수 없습니다. 다른 프로젝트에 참여해주세요.');
              }
            }
            else {
              if(data.data.project_info.is_exceeded) {
                this.commonService.showConfirmAlert(messages[1], 
                  () => {
                    this.openUserProjectStoryPage(componentRef, project_id);
                  }
                );
              }
              else {
                this.commonService.showConfirmAlert(messages[2], 
                  () => {
                    this.openUserProjectParticipationConditionFormPage(componentRef, project_id);
                  }
                );
              }
            }
          }
          else {
            if(data.data.project_participation_info) {
              if(!data.data.project_participation_info.project_reward_date) {
                this.commonService.showConfirmAlert(messages[3], 
                  () => {
                    if(!data.data.project_info.is_judge_end) {
                      this.commonService.showBasicAlert(messages[4])
                    }
                    else { 
                      this.openUserProjectRewardFormPage(componentRef, project_id);
                    }    
                  }
                );
              }
              else {
                this.commonService.showConfirmAlert(messages[5], 
                  () => {
                    this.openUserProjectStoryPage(componentRef, project_id);
                  }
                );
              }
            }
            else {
              this.commonService.showConfirmAlert(messages[5], 
                () => {
                  this.openUserProjectStoryPage(componentRef, project_id);
                }
              );
            }
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
  
  openUserProjectHomePage(componentRef, project_id) {
    componentRef.navCtrl.push('UserProjectHomePage', { "project_id" : project_id });
  }

  openUserProfileModificationFormPage(componentRef) {
    let userProfileModificationFormModal = componentRef.modalCtrl.create('ModalWrapperPage', {page: 'UserProfileModificationFormPage'});
    userProfileModificationFormModal.present();
    userProfileModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          componentRef.ionViewWillEnter();
        }
      }
    );
  }

  openUserProjectStoryPage(componentRef, project_id) {
    componentRef.navCtrl.push('UserProjectStoryPage', { "project_id" : project_id });
  }

  openUserProjectParticipationConditionFormPage(componentRef, project_id) {
    componentRef.navCtrl.push('UserProjectParticipationConditionFormPage', { 'project_id' : project_id });
  }

  openUserProjectRewardFormPage(componentRef, project_id) {
    componentRef.navCtrl.push('UserProjectRewardFormPage', { 'project_id' : project_id });
  }


}
