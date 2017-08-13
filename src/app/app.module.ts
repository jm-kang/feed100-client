import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// common //
import { LoginPageModule } from '../pages/common/login/login.module';
  import { RegistrationPageModule } from '../pages/common/registration/registration.module';
  import { UserLoginFormPageModule } from '../pages/common/user-login-form/user-login-form.module';
  import { UserRegistrationFormPageModule } from '../pages/common/user-registration-form/user-registration-form.module';
  import { UserSnsRegistrationFormPageModule } from '../pages/common/user-sns-registration-form/user-sns-registration-form.module';
  import { CompanyLoginFormPageModule } from '../pages/common/company-login-form/company-login-form.module';
  import { CompanyRegistrationFormPageModule } from '../pages/common/company-registration-form/company-registration-form.module';
import { AppIntroPageModule } from '../pages/common/app-intro/app-intro.module';
import { ContactPageModule } from '../pages/common/contact/contact.module';
import { FaqPageModule } from '../pages/common/faq/faq.module';
import { FullSizeImagePageModule } from '../pages/common/full-size-image/full-size-image.module';
import { ManualPageModule } from '../pages/common/manual/manual.module';
import { NoticePageModule } from '../pages/common/notice/notice.module';
import { PrivateInfoPolicyPageModule } from '../pages/common/private-info-policy/private-info-policy.module';
import { TermsPageModule } from '../pages/common/terms/terms.module';
import { TutorialPageModule } from '../pages/common/tutorial/tutorial.module';
// common //

// company //
import { CompanyTabsPageModule } from '../pages/company/company-tabs/company-tabs.module'
  import { CompanyHomePageModule } from '../pages/company/company-home/company-home.module';
    import { CompanyAlarmPageModule } from '../pages/company/company-alarm/company-alarm.module';
    import { CompanyConfigurePageModule } from '../pages/company/company-configure/company-configure.module';
  import { CompanyProjectPageModule } from '../pages/company/company-project/company-project.module';
    import { CompanyProjectFeedbackPageModule } from '../pages/company/company-project-feedback/company-project-feedback.module';
    import { CompanyProjectHomePageModule } from '../pages/company/company-project-home/company-project-home.module';
    import { CompanyProjectLinkPageModule } from '../pages/company/company-project-link/company-project-link.module';
    import { CompanyProjectPriceStatementPageModule } from '../pages/company/company-project-price-statement/company-project-price-statement.module';
    import { CompanyProjectRegistrationPageModule } from '../pages/company/company-project-registration/company-project-registration.module';
    import { CompanyProjectReportPageModule } from '../pages/company/company-project-report/company-project-report.module';
    import { CompanyProjectSideMenuPageModule } from '../pages/company/company-project-side-menu/company-project-side-menu.module';
    import { CompanyProjectStatsPageModule } from '../pages/company/company-project-stats/company-project-stats.module';
    import { CompanyProjectStoryPageModule } from '../pages/company/company-project-story/company-project-story.module';
    import { CompanyProjectStorySummaryPageModule } from '../pages/company/company-project-story-summary/company-project-story-summary.module';
    import { CompanyProjectUserInfoPageModule } from '../pages/company/company-project-user-info/company-project-user-info.module';
    import { CompanyProjectUserProfilePageModule } from '../pages/company/company-project-user-profile/company-project-user-profile.module';
  import { CompanyNewsfeedPageModule } from '../pages/company/company-newsfeed/company-newsfeed.module';
    import { CompanyNewsfeedStoryPageModule } from '../pages/company/company-newsfeed-story/company-newsfeed-story.module';
  import { CompanyMypagePageModule } from '../pages/company/company-mypage/company-mypage.module';
    import { CompanyAccountModificationFormPageModule } from '../pages/company/company-account-modification-form/company-account-modification-form.module';
  import { CompanyInterviewPageModule } from '../pages/company/company-interview/company-interview.module';
    import { CompanyProjectInterviewPageModule } from '../pages/company/company-project-interview/company-project-interview.module';
    import { CompanyProjectInterviewDetailPageModule } from '../pages/company/company-project-interview-detail/company-project-interview-detail.module';
    import { CompanyProjectInterviewWritingEditorPageModule } from '../pages/company/company-project-interview-writing-editor/company-project-interview-writing-editor.module';
// company //

// user //
import { UserTabsPageModule } from '../pages/user/user-tabs/user-tabs.module'
  import { UserHomePageModule } from '../pages/user/user-home/user-home.module';
    import { UserAlarmPageModule } from '../pages/user/user-alarm/user-alarm.module';
    import { UserConfigurePageModule } from '../pages/user/user-configure/user-configure.module';
    import { UserPointExchangePageModule } from '../pages/user/user-point-exchange/user-point-exchange.module';
    import { UserPointUsageHistoryPageModule } from '../pages/user/user-point-usage-history/user-point-usage-history.module';
  import { UserProjectPageModule } from '../pages/user/user-project/user-project.module';
    import { UserProjectFeedbackPageModule } from '../pages/user/user-project-feedback/user-project-feedback.module';
    import { UserProjectFeedbackFormPageModule } from '../pages/user/user-project-feedback-form/user-project-feedback-form.module';
    import { UserProjectFeedbackModificationEditorPageModule } from '../pages/user/user-project-feedback-modification-editor/user-project-feedback-modification-editor.module';
    import { UserProjectFeedbackWritingEditorPageModule } from '../pages/user/user-project-feedback-writing-editor/user-project-feedback-writing-editor.module';
    import { UserProjectHistoryPageModule } from '../pages/user/user-project-history/user-project-history.module';
    import { UserProjectHomePageModule } from '../pages/user/user-project-home/user-project-home.module';
    import { UserProjectLinkPageModule } from '../pages/user/user-project-link/user-project-link.module';
    import { UserProjectOpinionWritingEditorPageModule } from '../pages/user/user-project-opinion-writing-editor/user-project-opinion-writing-editor.module';
    import { UserProjectParticipationConditionFormPageModule } from '../pages/user/user-project-participation-condition-form/user-project-participation-condition-form.module';
    import { UserProjectRewardFormPageModule } from '../pages/user/user-project-reward-form/user-project-reward-form.module';
    import { UserProjectSideMenuPageModule } from '../pages/user/user-project-side-menu/user-project-side-menu.module';
    import { UserProjectStoryPageModule } from '../pages/user/user-project-story/user-project-story.module';
    import { UserProjectStorySummaryWritingEditorPageModule } from '../pages/user/user-project-story-summary-writing-editor/user-project-story-summary-writing-editor.module';
  import { UserNewsfeedPageModule } from '../pages/user/user-newsfeed/user-newsfeed.module';
    import { UserNewsfeedStoryPageModule } from '../pages/user/user-newsfeed-story/user-newsfeed-story.module';
  import { UserMypagePageModule } from '../pages/user/user-mypage/user-mypage.module';
    import { UserAccountModificationFormPageModule } from '../pages/user/user-account-modification-form/user-account-modification-form.module';
    import { UserProfileModificationFormPageModule } from '../pages/user/user-profile-modification-form/user-profile-modification-form.module';
  import { UserInterviewPageModule } from '../pages/user/user-interview/user-interview.module';
    import { UserProjectInterviewDetailPageModule } from '../pages/user/user-project-interview-detail/user-project-interview-detail.module';
    import { UserProjectInterviewWritingEditorPageModule } from '../pages/user/user-project-interview-writing-editor/user-project-interview-writing-editor.module';
// user //

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [MyApp],
  imports: [
    LoginPageModule,
      RegistrationPageModule,
      UserLoginFormPageModule,
      UserRegistrationFormPageModule,
      UserSnsRegistrationFormPageModule,
      CompanyLoginFormPageModule,
      CompanyRegistrationFormPageModule,
    AppIntroPageModule,
    ContactPageModule,
    FaqPageModule,
    ManualPageModule,
    NoticePageModule,
    PrivateInfoPolicyPageModule,
    TermsPageModule,
    TutorialPageModule,

    CompanyTabsPageModule,
      CompanyHomePageModule,
        CompanyAlarmPageModule,
        CompanyConfigurePageModule,
      CompanyProjectPageModule,
        CompanyProjectFeedbackPageModule,
        CompanyProjectHomePageModule,
        CompanyProjectLinkPageModule,
        CompanyProjectPriceStatementPageModule,
        CompanyProjectRegistrationPageModule,
        CompanyProjectReportPageModule,
        CompanyProjectSideMenuPageModule,
        CompanyProjectStatsPageModule,
        CompanyProjectStoryPageModule,
        CompanyProjectStorySummaryPageModule,
        CompanyProjectUserInfoPageModule,
        CompanyProjectUserProfilePageModule,
      CompanyNewsfeedPageModule,
        CompanyNewsfeedStoryPageModule,
      CompanyMypagePageModule,
        CompanyAccountModificationFormPageModule,
      CompanyInterviewPageModule,
        CompanyProjectInterviewPageModule,
        CompanyProjectInterviewDetailPageModule,
        CompanyProjectInterviewWritingEditorPageModule,

    UserTabsPageModule,
      UserHomePageModule,
        UserAlarmPageModule,
        UserConfigurePageModule,
        UserPointExchangePageModule,
        UserPointUsageHistoryPageModule,
      UserProjectPageModule,
        UserProjectFeedbackPageModule,
        UserProjectFeedbackFormPageModule,
        UserProjectFeedbackModificationEditorPageModule,
        UserProjectFeedbackWritingEditorPageModule,
        UserProjectHistoryPageModule,
        UserProjectHomePageModule,
        UserProjectLinkPageModule,
        UserProjectOpinionWritingEditorPageModule,
        UserProjectParticipationConditionFormPageModule,
        UserProjectRewardFormPageModule,
        UserProjectSideMenuPageModule,
        UserProjectStoryPageModule,
        UserProjectStorySummaryWritingEditorPageModule,
      UserNewsfeedPageModule,
        UserNewsfeedStoryPageModule,
      UserMypagePageModule,
        UserAccountModificationFormPageModule,
        UserProfileModificationFormPageModule,
      UserInterviewPageModule,
        UserProjectInterviewDetailPageModule,
        UserProjectInterviewWritingEditorPageModule,

    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
