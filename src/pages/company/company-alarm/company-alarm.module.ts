import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyAlarmPage } from './company-alarm';

@NgModule({
  declarations: [
    CompanyAlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyAlarmPage),
  ],
})
export class CompanyAlarmPageModule {}
