import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAlarmPage } from './user-alarm';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserAlarmPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(UserAlarmPage),
  ],
})
export class UserAlarmPageModule {}
