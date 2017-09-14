import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
// import { File } from '@ionic-native/file';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the UserProjectOpinionWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-opinion-writing-editor',
  templateUrl: 'user-project-opinion-writing-editor.html',
})
export class UserProjectOpinionWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;

  feedback_id;

  opinionContent: String = "";
  minTextLength: number = 20;
  contentPlaceholder: String = '피드백을 보시고 공감 비공감에 관한 글을 작성해주세요.';
  nickname: String = "";
  isEmpathy: boolean;
  opinionImage = "";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";

  tempEmpathy: String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private camera: Camera,
    public httpService: HttpServiceProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectOpinionWritingEditorPage');
    this.nickname = this.navParams.get('nickname');
    this.feedback_id = this.navParams.get('feedback_id');
  }

  ionViewDidEnter() {    
    this.opinionContent = this.opinionContent.replace(/<br *\/?>/gi, '\n');
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  dismiss() {
    console.log("dismiss() : 취소 버튼");
    this.viewCtrl.dismiss();
  }

  onOpinionLoad(img) {
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
    this.width = tempWidth;
    this.height = tempHeight;
    this.left = tempLeft;
    this.top = tempTop;
    this.maxHeight = tempMaxHeight;
    this.maxWidth = tempMaxWidth;
  }

  deleteImage() {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.opinionImage = "";
    this.maxHeight = "";
    this.maxWidth = "";
    this.width = "";
    this.height = "";
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.httpService.selectImage()
    .then(this.httpService.readFile)
    .then((formData) => {
      let loading = this.httpService.presentLoading();
      this.httpService.uploadFile(formData)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.opinionImage = data.data;
          }
          else if(data.success == false) {
            this.httpService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.httpService.showBasicAlert('잠시 후 다시 시도해주세요.');
            });
          }
        },
        (err) => {
          console.log(err);
          this.httpService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    })
    .catch((err) => {
      console.log(err);
      this.httpService.showBasicAlert('오류가 발생했습니다.');
    });
  }

  moveFiles() {
    let loading = this.httpService.presentLoading();
    if(this.opinionImage) {
      let images = [];
      images.push(this.opinionImage);
      this.httpService.moveFiles(images)
      .subscribe(
      (data) => {
        if(data.success == true) {
          this.opinionImage = this.opinionImage.replace('tmp', 'images');
          this.registerOpinion(loading);
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.moveFiles();
          })
        }
      },
      (err) => {
        console.log(err);
        alert('오류가 발생했습니다.');
      }
    );

    }
    else {
      this.registerOpinion(loading);
    }
  }

  registerOpinion(loading) {
    this.httpService.registerOpinion(this.feedback_id, this.isEmpathy, this.opinionContent, (this.opinionImage) ? this.opinionImage : null)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.message == 'opinion is already writed') {
            this.httpService.showBasicAlert('이미 토론에 참여했습니다.');
            this.viewCtrl.dismiss();
          }
          else if(data.message == 'project is not proceeding') {
            this.httpService.showBasicAlert('이미 종료된 프로젝트입니다.');
            this.viewCtrl.dismiss();
          }
          else {
            this.httpService.showBasicAlert('성공적으로 등록되었습니다.');
            this.viewCtrl.dismiss();
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.registerOpinion(loading);
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  changeEmpathyRadio() {
    console.log(this.tempEmpathy);
    if(this.tempEmpathy == "empathy") {
      this.isEmpathy = true;
      console.log(this.isEmpathy);
    } else {
      this.isEmpathy = false;
      console.log(this.isEmpathy);
    }
  }
}
