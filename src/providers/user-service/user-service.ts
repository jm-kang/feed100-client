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
  alarmNum = 0;
  interviewNum = 0;
  
  constructor(
    public http: Http,
    public storage: Storage,
    private badge: Badge,
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

  // 진행중
  // 	참여o - 프로젝트 홈
  // 	참여x
  // 		인원 꽉참 - 스토리
  // 		인원 안참
  // 			프로필 노등록 - 프로필 수정 후 참여조건 검사 후 스토리
  // 			프로필 등록 - 참여조건 검사 후 스토리
  // 종료
  // 	참여o
  // 		보상 전
  //      심사중 - 알림
  //      심사끝 - 보상 페이지
  // 		보상 후 - 스토리
  // 	참여x - 스토리
  accessProjectCard(componentRef, project_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    let messages = [
      '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
      '아쉽게도 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 프로필을 등록해야 합니다!<br/>프로필 등록 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 간단한 설문조사에 응해야 합니다!<br/>참가하시겠습니까?',
      '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
      '아직 심사가 진행중입니다!<br/>심사는 프로젝트 종료 후 최대 2일까지 걸릴 수 있습니다.<br/>다음에 다시 시도해주세요.',      
      '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    ]

    this.getUserAndProjectAndParticipation(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.project_info.isProceeding) {
            if(data.data.project_participation_info) {
              this.commonService.showConfirmAlert(messages[0], 
                () => {
                  this.openUserProjectHomePage(componentRef, project_id);
                }
              );
            }
            else {
              if(data.data.project_info.participant_num >= data.data.project_info.max_participant_num) {
                this.commonService.showConfirmAlert(messages[1], 
                  () => {
                    this.openUserProjectStoryPage(componentRef, project_id);
                  }
                );
              }
              else {
                if(!data.data.age) {
                  this.commonService.showConfirmAlert(messages[2], 
                    () => {
                      this.openUserProfileModificationFormPage(componentRef);
                    }
                  );
                }
                else {
                  this.commonService.showConfirmAlert(messages[3], 
                    () => {
                      this.openUserProjectParticipationConditionFormPage(componentRef, project_id);
                    }
                  );
                }
              }
            }
          }
          else {
            if(data.data.project_participation_info) {
              if(!data.data.project_participation_info.project_reward_date) {
                this.commonService.showConfirmAlert(messages[4], 
                  () => {
                    if(data.data.project_info.is_judge_proceeding) {
                      this.commonService.showBasicAlert(messages[5])
                    }
                    else { 
                      this.openUserProjectRewardFormPage(componentRef, project_id);
                    }    
                  }
                );
              }
              else {
                this.commonService.showConfirmAlert(messages[6], 
                  () => {
                    this.openUserProjectStoryPage(componentRef, project_id);
                  }
                );
              }
            }
            else {
              this.commonService.showConfirmAlert(messages[6], 
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
    let userProjectParticipationConditionFormModal = componentRef.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectParticipationConditionFormPage', params: { "project_id" : project_id }});
    userProjectParticipationConditionFormModal.present();
  }

  openUserProjectRewardFormPage(componentRef, project_id) {
    let userProjectRewardFormModal = componentRef.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectRewardFormPage', params: { "project_id" : project_id }});
    userProjectRewardFormModal.present();
    userProjectRewardFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          componentRef.ionViewWillEnter();
        }
      }
    );
  }


}
