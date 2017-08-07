import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAlarmPage } from './user-alarm';

@NgModule({
  declarations: [
    UserAlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAlarmPage),
  ],
})
export class UserAlarmPageModule {}
