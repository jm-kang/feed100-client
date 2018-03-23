import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserNotificationPage } from './user-notification';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserNotificationPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(UserNotificationPage),
  ],
})
export class UserNotificationPageModule {}
