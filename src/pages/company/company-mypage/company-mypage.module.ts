import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyMypagePage } from './company-mypage';

@NgModule({
  declarations: [
    CompanyMypagePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyMypagePage),
  ],
})
export class CompanyMypagePageModule {}
