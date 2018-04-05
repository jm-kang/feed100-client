import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNotificationPage } from './admin-notification';

@NgModule({
  declarations: [
    AdminNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminNotificationPage),
  ],
})
export class AdminNotificationPageModule {}
