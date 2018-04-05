import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMypagePage } from './admin-mypage';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    AdminMypagePage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminMypagePage),
  ],
})
export class AdminMypagePageModule {}
