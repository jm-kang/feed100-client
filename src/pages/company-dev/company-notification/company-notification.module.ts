import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNotificationPage } from './company-notification';

@NgModule({
  declarations: [
    CompanyNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyNotificationPage),
  ],
})
export class CompanyNotificationPageModule {}
