import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyAlarmPage } from './company-alarm';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyAlarmPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(CompanyAlarmPage),
  ],
})
export class CompanyAlarmPageModule {}
