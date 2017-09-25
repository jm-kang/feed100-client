import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the UserProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-writing-editor',
  templateUrl: 'user-project-interview-writing-editor.html',
})
export class UserProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름";
  interview_id;
  interview_response: String = "";
  contentPlaceholder: String = '성실히 작성해주세요. 한번만 보낼 수 있습니다.';
  minTextLength: number = 20;
  isFold: boolean = true;

  interview_request: String = "어두운 그대로 내비둬 억지로 밝아질거 뭐있어 딱 촛불 하나정도 저 조명따윈 내게 빛이 될 순 없어 눈뜨고 다시 찾아온 아침 혼자만 또 흐리멍텅한 날씨 습기 가득 찬 왼쪽의 눈으로 바라본 내 꿈만은 선명하길";

  interview_request_images = [
    {
      img: "assets/img/feedback-image6.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image2.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image3.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
  ]
  
  interview_response_images = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private photoViewer: PhotoViewer,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewWritingEditorPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectInterviewWritingEditorPage');
    this.projectName = this.navParams.get('projectName');
    this.interview_id = this.navParams.get('interview_id');
    this.interview_request = this.navParams.get('interview_request');
    let temp_interview_request_images = this.navParams.get('interview_request_images');
    for(let i=0; temp_interview_request_images && i<temp_interview_request_images.length; i++) {
      temp_interview_request_images[i] = { "img" : temp_interview_request_images[i].img };
    }
    this.interview_request_images = temp_interview_request_images;
  }

  scrollingFun(e) {
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    console.log("completeEditor() : 완료 버튼");
    let loading = this.httpService.presentLoading();
    for(let i=0; i<this.interview_response_images.length; i++) {
      this.interview_response_images[i] = this.interview_response_images[i].img;
    }

    this.httpService.responseInterview(this.interview_id, this.interview_response, this.interview_response_images)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
        (data) => {
        if(data.success == true) {
          this.viewCtrl.dismiss();      
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.completeEditor();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )  
  }

  dismiss() {
    console.log("dismiss() : 취소 버튼");
    this.viewCtrl.dismiss();
  }

  photoView(url) {
    this.photoViewer.show(url);
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
    this.interview_response_images[i].width = tempWidth;
    this.interview_response_images[i].height = tempHeight;
    this.interview_response_images[i].left = tempLeft;
    this.interview_response_images[i].top = tempTop;
    this.interview_response_images[i].maxHeight = tempMaxHeight;
    this.interview_response_images[i].maxWidth = tempMaxWidth;
  }

  onCompanyImageLoad(img, i) {
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
    this.interview_request_images[i].width = tempWidth;
    this.interview_request_images[i].height = tempHeight;
    this.interview_request_images[i].left = tempLeft;
    this.interview_request_images[i].top = tempTop;
    this.interview_request_images[i].maxHeight = tempMaxHeight;
    this.interview_request_images[i].maxWidth = tempMaxWidth;
  }

  fold() {
    if(this.isFold) {
      this.isFold = false;
    } else {
      this.isFold = true;
    }
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.interview_response_images.splice(i, 1);
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
            this.interview_response_images.push({ "img" : data.data });
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

}
