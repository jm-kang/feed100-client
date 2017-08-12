import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMypagePage } from './user-mypage';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserMypagePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserMypagePage),
  ],
})
export class UserMypagePageModule {}
