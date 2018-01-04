import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAlarmPage } from './admin-alarm';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminAlarmPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(AdminAlarmPage),
  ],
})
export class AdminAlarmPageModule {}
