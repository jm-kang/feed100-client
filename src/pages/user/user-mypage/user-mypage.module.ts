import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMypagePage } from './user-mypage';

@NgModule({
  declarations: [
    UserMypagePage,
  ],
  imports: [
    IonicPageModule.forChild(UserMypagePage),
  ],
})
export class UserMypagePageModule {}
