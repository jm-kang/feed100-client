import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMypagePage } from './admin-mypage';

@NgModule({
  declarations: [
    AdminMypagePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMypagePage),
  ],
})
export class AdminMypagePageModule {}
