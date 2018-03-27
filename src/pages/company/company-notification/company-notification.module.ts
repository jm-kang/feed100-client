import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNotificationPage } from './company-notification';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyNotificationPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(CompanyNotificationPage),
  ],
})
export class CompanyNotificationPageModule {}
