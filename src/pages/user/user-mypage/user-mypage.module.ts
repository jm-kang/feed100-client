import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMypagePage } from './user-mypage';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserMypagePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserMypagePage),
  ],
})
export class UserMypagePageModule {}
