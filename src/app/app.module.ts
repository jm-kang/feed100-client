import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ModalWrapperPageModule } from '../pages/common/modal-wrapper/modal-wrapper.module';

// common //
import { LoginPageModule } from '../pages/common/login/login.module';
  import { RegistrationPageModule } from '../pages/common/registration/registration.module';
  import { UserLoginFormPageModule } from '../pages/common/user-login-form/user-login-form.module';
  import { UserRegistrationFormPageModule } from '../pages/common/user-registration-form/user-registration-form.module';
  import { UserSnsRegistrationFormPageModule } from '../pages/common/user-sns-registration-form/user-sns-registration-form.module';
  import { CompanyLoginFormPageModule } from '../pages/common/company-login-form/company-login-form.module';
  import { CompanyRegistrationFormPageModule } from '../pages/common/company-registration-form/company-registration-form.module';
import { AppIntroPageModule } from '../pages/common/app-intro/app-intro.module';
import { NoticePageModule } from '../pages/common/notice/notice.module';
import { PrivateInfoPolicyPageModule } from '../pages/common/private-info-policy/private-info-policy.module';
import { TermsPageModule } from '../pages/common/terms/terms.module';
// common //

// admin //
import { AdminTabsPageModule } from '../pages/admin/admin-tabs/admin-tabs.module';
  import { AdminHomePageModule } from '../pages/admin/admin-home/admin-home.module';
    import { AdminAlarmPageModule } from '../pages/admin/admin-alarm/admin-alarm.module';
    import { AdminConfigurePageModule } from '../pages/admin/admin-configure/admin-configure.module';
  import { AdminProjectPageModule } from '../pages/admin/admin-project/admin-project.module';
    import { AdminProjectFeedbackPageModule } from '../pages/admin/admin-project-feedback/admin-project-feedback.module';
    import { AdminProjectHomePageModule } from '../pages/admin/admin-project-home/admin-project-home.module';
    import { AdminProjectLinkPageModule } from '../pages/admin/admin-project-link/admin-project-link.module';
    import { AdminProjectPriceStatementPageModule } from '../pages/admin/admin-project-price-statement/admin-project-price-statement.module';
    import { AdminProjectReportPageModule } from '../pages/admin/admin-project-report/admin-project-report.module';
    import { AdminProjectSideMenuPageModule } from '../pages/admin/admin-project-side-menu/admin-project-side-menu.module';
    import { AdminProjectStatsPageModule } from '../pages/admin/admin-project-stats/admin-project-stats.module';
    import { AdminProjectStoryPageModule } from '../pages/admin/admin-project-story/admin-project-story.module';
    import { AdminProjectUserInfoPageModule } from '../pages/admin/admin-project-user-info/admin-project-user-info.module';
    import { AdminProjectUserProfilePageModule } from '../pages/admin/admin-project-user-profile/admin-project-user-profile.module';
    import { AdminProjectSearchPageModule } from '../pages/admin/admin-project-search/admin-project-search.module';
    import { AdminProjectSearchResultPageModule } from '../pages/admin/admin-project-search-result/admin-project-search-result.module';
    import { AdminProjectUserParticipationConditionStatsPageModule } from '../pages/admin/admin-project-user-participation-condition-stats/admin-project-user-participation-condition-stats.module';
    import { AdminProjectUserProfileStatsPageModule } from '../pages/admin/admin-project-user-profile-stats/admin-project-user-profile-stats.module';
    import { AdminProjectUserReportPageModule } from './../pages/admin/admin-project-user-report/admin-project-user-report.module';
  import { AdminNewsfeedPageModule } from '../pages/admin/admin-newsfeed/admin-newsfeed.module';
    import { AdminNewsfeedStoryPageModule } from '../pages/admin/admin-newsfeed-story/admin-newsfeed-story.module';
  import { AdminMypagePageModule } from '../pages/admin/admin-mypage/admin-mypage.module';
    import { AdminAccountModificationFormPageModule } from '../pages/admin/admin-account-modification-form/admin-account-modification-form.module';
  import { AdminInterviewPageModule } from '../pages/admin/admin-interview/admin-interview.module';
    import { AdminProjectInterviewPageModule } from '../pages/admin/admin-project-interview/admin-project-interview.module';
    import { AdminProjectInterviewDetailPageModule } from '../pages/admin/admin-project-interview-detail/admin-project-interview-detail.module';
// admin //

// company //
import { CompanyTutorialPageModule } from '../pages/company/company-tutorial/company-tutorial.module';
import { CompanyProjectRegistrationPageModule } from '../pages/company/company-project-registration/company-project-registration.module';
import { CompanyProjectHomePageModule } from '../pages/company/company-project-home/company-project-home.module';
  import { CompanyConfigurePageModule } from '../pages/company/company-configure/company-configure.module';
    import { CompanyHelpPageModule } from '../pages/company/company-help/company-help.module';
  import { CompanyNotificationPageModule } from '../pages/company/company-notification/company-notification.module';
  import { CompanyProjectStoryHorizontalPageModule } from '../pages/company/company-project-story-horizontal/company-project-story-horizontal.module';
  import { CompanyProjectReportPageModule } from '../pages/company/company-project-report/company-project-report.module';
  import { CompanyProjectInterviewDetailPageModule } from '../pages/company/company-project-interview-detail/company-project-interview-detail.module';
  import { CompanyProjectGroupInterviewPageModule } from '../pages/company/company-project-group-interview/company-project-group-interview.module';
    import { CompanyProjectGroupInterviewQuestionEditorPageModule } from '../pages/company/company-project-group-interview-question-editor/company-project-group-interview-question-editor.module';
// company //

// user //
import { UserConfigurePageModule } from '../pages/user/user-configure/user-configure.module';
  import { UserHelpPageModule } from '../pages/user/user-help/user-help.module';
  import { UserProfileModificationFormPageModule } from '../pages/user/user-profile-modification-form/user-profile-modification-form.module';
import { UserTutorialPageModule } from '../pages/user/user-tutorial/user-tutorial.module';
import { UserTabsPageModule } from '../pages/user/user-tabs/user-tabs.module'
  import { UserProjectPageModule } from '../pages/user/user-project/user-project.module';
    import { UserAllProjectListPageModule } from '../pages/user/user-all-project-list/user-all-project-list.module'
  import { UserProjectInterviewFormPageModule } from '../pages/user/user-project-interview-form/user-project-interview-form.module';
    import { UserProjectStoryHorizontalPageModule } from '../pages/user/user-project-story-horizontal/user-project-story-horizontal.module';
    import { UserProjectParticipationConditionFormPageModule } from '../pages/user/user-project-participation-condition-form/user-project-participation-condition-form.module';
    import { UserProjectRewardFormPageModule } from '../pages/user/user-project-reward-form/user-project-reward-form.module';
    import { UserProjectStoryQuizFormPageModule } from '../pages/user/user-project-story-quiz-form/user-project-story-quiz-form.module';    
    import { UserProjectHomePageModule } from '../pages/user/user-project-home/user-project-home.module';
      import { UserProjectInterviewAnswerPageModule } from '../pages/user/user-project-interview-answer/user-project-interview-answer.module';
        import { UserProjectInterviewDetailPageModule } from '../pages/user/user-project-interview-detail/user-project-interview-detail.module';
        import { UserProjectStoryVerticalPageModule } from '../pages/user/user-project-story-vertical/user-project-story-vertical.module';
  import { UserNotificationPageModule } from '../pages/user/user-notification/user-notification.module';
  import { UserMypagePageModule } from '../pages/user/user-mypage/user-mypage.module';
    import { UserPointExchangePageModule } from '../pages/user/user-point-exchange/user-point-exchange.module';
    import { UserPointUsageHistoryPageModule } from '../pages/user/user-point-usage-history/user-point-usage-history.module';  
// user //

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Badge } from '@ionic-native/badge';
import { CommonServiceProvider } from '../providers/common-service/common-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CompanyServiceProvider } from '../providers/company-service/company-service';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// import { UserProjectStoryQuizPage } from '../pages/user/user-project-story-quiz/user-project-story-quiz';
import { AdminServiceProvider } from '../providers/admin-service/admin-service';

export class MyHammerConfig extends HammerGestureConfig  {
  // swipedown 값을 알아내는 함수
  overrides = <any>{
      // override hammerjs default configuration
      'pan': {threshold: 5},
      'swipe': {
           velocity: 0.4,
           threshold: 20,
           direction: 31 // /!\ ugly hack to allow swipe in all direction
      }
  }
}

@NgModule({
  declarations: [MyApp],
  imports: [
    ModalWrapperPageModule,

    LoginPageModule,
      RegistrationPageModule,
      UserLoginFormPageModule,
      UserRegistrationFormPageModule,
      UserSnsRegistrationFormPageModule,
      CompanyLoginFormPageModule,
      CompanyRegistrationFormPageModule,
    AppIntroPageModule,
    NoticePageModule,
    PrivateInfoPolicyPageModule,
    TermsPageModule,
 
    AdminTabsPageModule,
      AdminHomePageModule,
        AdminAlarmPageModule,
        AdminConfigurePageModule,
      AdminProjectPageModule,
        AdminProjectFeedbackPageModule,
        AdminProjectHomePageModule,
        AdminProjectLinkPageModule,
        AdminProjectPriceStatementPageModule,
        AdminProjectReportPageModule,
        AdminProjectSideMenuPageModule,
        AdminProjectStatsPageModule,
        AdminProjectStoryPageModule,
        AdminProjectUserInfoPageModule,
        AdminProjectUserProfilePageModule,
        AdminProjectSearchPageModule,
        AdminProjectSearchResultPageModule,
        AdminProjectUserParticipationConditionStatsPageModule,
        AdminProjectUserProfileStatsPageModule,
        AdminProjectUserReportPageModule,
      AdminNewsfeedPageModule,
        AdminNewsfeedStoryPageModule,
      AdminMypagePageModule,
        AdminAccountModificationFormPageModule,
      AdminInterviewPageModule,
        AdminProjectInterviewPageModule,
        AdminProjectInterviewDetailPageModule,

    // CompanyHelpPageModule,
    // CompanyTutorialPageModule,
    // CompanyTabsPageModule,
    //   CompanyHomePageModule,
    //     CompanyAlarmPageModule,
    //     CompanyConfigurePageModule,
    //   CompanyProjectPageModule,
    //     CompanyProjectFeedbackPageModule,
    //     CompanyProjectHomePageModule,
    //     CompanyProjectLinkPageModule,
    //     CompanyProjectPriceStatementPageModule,
    //     CompanyProjectRegistrationPageModule,
    //     CompanyProjectReportPageModule,
    //     CompanyProjectSideMenuPageModule,
    //     CompanyProjectStatsPageModule,
    //     CompanyProjectStoryPageModule,
    //     CompanyProjectUserInfoPageModule,
    //     CompanyProjectUserProfilePageModule,
    //     CompanyProjectSearchPageModule,
    //     CompanyProjectSearchResultPageModule,
    //     CompanyProjectUserParticipationConditionStatsPageModule,
    //     CompanyProjectUserProfileStatsPageModule,
    //     CompanyProjectUserReportPageModule,
    //   CompanyNewsfeedPageModule,
    //     CompanyNewsfeedStoryPageModule,
    //   CompanyMypagePageModule,
    //     CompanyAccountModificationFormPageModule,
    //   CompanyInterviewPageModule,
    //     CompanyProjectInterviewPageModule,
    //     CompanyProjectInterviewDetailPageModule,
    //     CompanyProjectInterviewWritingEditorPageModule,

    // UserHelpPageModule,
    // UserTutorialPageModule,
    // UserTabsPageModule,
    //   UserHomePageModule,
    //     UserAlarmPageModule,
    //     UserConfigurePageModule,
    //     UserPointExchangePageModule,
    //     UserPointUsageHistoryPageModule,
    //   UserProjectPageModule,
    //     UserProjectFeedbackPageModule,
    //     UserProjectFeedbackFormPageModule,
    //     UserProjectFeedbackWritingEditorPageModule,
    //     UserProjectFeedbackListPageModule,
    //     UserProjectHomePageModule,
    //     UserProjectLinkPageModule,
    //     UserProjectOpinionWritingEditorPageModule,
    //     UserProjectParticipationConditionFormPageModule,
    //     UserProjectRewardFormPageModule,
    //     UserProjectSideMenuPageModule,
    //     UserProjectStoryPageModule,
    //     UserProjectStoryQuizPageModule,
    //     UserProjectSearchResultPageModule,
    //     UserProjectReportFormPageModule,
    //     UserProjectReportPageModule,
    //   UserNewsfeedPageModule,
    //     UserNewsfeedStoryPageModule,
    //   UserMypagePageModule,
    //     UserAccountModificationFormPageModule,
    //     UserProfileModificationFormPageModule,
    //   UserInterviewPageModule,
    //     UserProjectInterviewDetailPageModule,
    //     UserProjectInterviewWritingEditorPageModule,

    CompanyTutorialPageModule,
    CompanyProjectRegistrationPageModule,
    CompanyProjectHomePageModule,
      CompanyConfigurePageModule,
        CompanyHelpPageModule,
      CompanyNotificationPageModule,
      CompanyProjectStoryHorizontalPageModule,
      CompanyProjectReportPageModule,
      CompanyProjectInterviewDetailPageModule,
      CompanyProjectGroupInterviewPageModule,
        CompanyProjectGroupInterviewQuestionEditorPageModule,
    
    UserConfigurePageModule,
      UserHelpPageModule,
      UserProfileModificationFormPageModule,
    UserTutorialPageModule,
    UserTabsPageModule,
      UserProjectPageModule,
        UserAllProjectListPageModule,
      UserProjectInterviewFormPageModule,
        UserProjectStoryHorizontalPageModule,
        UserProjectParticipationConditionFormPageModule,
        UserProjectRewardFormPageModule,
        UserProjectStoryQuizFormPageModule,
        UserProjectHomePageModule,
          UserProjectInterviewAnswerPageModule,
            UserProjectInterviewDetailPageModule,
            UserProjectStoryVerticalPageModule,
      UserNotificationPageModule,
      UserMypagePageModule,
        UserPointExchangePageModule,
        UserPointUsageHistoryPageModule,

    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        scrollPadding: false,
        scrollAssist: false,
        autoFocusAssist: false,
        swipeBackEnabled: true,
        tabsHideOnSubPages: true,
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    Push,
    Device,
    UniqueDeviceID,
    PhotoViewer,
    Camera,
    File,
    Badge,
    CommonServiceProvider,
    UserServiceProvider,
    CompanyServiceProvider,
    ThemeableBrowser,
    Keyboard,
    ScreenOrientation,
    EmailComposer,
    AppVersion,
    Market,
    OpenNativeSettings,
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    AdminServiceProvider
  ]
})
export class AppModule {}
