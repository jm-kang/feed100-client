import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNotificationPage } from './admin-notification';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminNotificationPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(AdminNotificationPage),
  ],
})
export class AdminNotificationPageModule {}
