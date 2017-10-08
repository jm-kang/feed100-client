import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController, ModalController } from 'ionic-angular';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-writing-editor',
  templateUrl: 'company-project-interview-writing-editor.html',
})
export class CompanyProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  project_participant_id;
  nickname: String = "";
  ordinal: number = 1;
  interviewContent: String = "";
  contentPlaceholder: String = '20자 이상 작성해야 인터뷰를 보낼 수 있습니다. 요청 후 수정이 불가능하니 신중히 작성해주시기 바랍니다.';
  minTextLength: number = 20;

  interviewImages = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewWritingEditorPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectInterviewWritingEditorPage');
    this.nickname = this.navParams.get('nickname');
    this.project_participant_id = this.navParams.get('project_participant_id');
    this.ordinal = this.navParams.get('ordinal');
  }

  scrollingFun(e) {
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    console.log("completeEditor() : 완료 버튼");
    let loading = this.commonService.presentLoading();
    for(let i=0; i<this.interviewImages.length; i++) {
      this.interviewImages[i] = this.interviewImages[i].img;
    }

    this.companyService.requestInterview(this.project_participant_id, this.interviewContent, (this.interviewImages.length) ? this.interviewImages : null)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
        (data) => {
        if(data.success == true) {
          if(!data.data) {
            if(data.message == "interview is not available") {
              this.commonService.showBasicAlert('인터뷰를 요청할 수 있는 기간이 아닙니다.');
            }
            else if(data.message == "interview_num is exceeded") {
              this.commonService.showBasicAlert('인터뷰 요청 갯수가 초과되었습니다.');
            }
          }
          this.viewCtrl.dismiss();
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.completeEditor();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )  

  }

  dismiss() {
    console.log("dismiss() : 취소 버튼");
    this.viewCtrl.dismiss();
  }

  onInterviewImageLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width >= img.height) {
      tempHeight = img.width + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.interviewImages[i].width = tempWidth;
    this.interviewImages[i].height = tempHeight;
    this.interviewImages[i].left = tempLeft;
    this.interviewImages[i].top = tempTop;
    this.interviewImages[i].maxHeight = tempMaxHeight;
    this.interviewImages[i].maxWidth = tempMaxWidth;
  }

  deleteImage(target, i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.interviewImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((formData) => {
      let loading = this.commonService.presentLoading();
      this.commonService.uploadFile(formData)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.interviewImages.push({ "img" : data.data });
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            });
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    })
    .catch((err) => {
      console.log(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
    });
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage, { "project_participant_id" : project_participant_id });
    companyProjectUserProfileModal.present();
  }
}
