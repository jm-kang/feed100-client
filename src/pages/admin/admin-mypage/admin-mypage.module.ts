import { ComponentsModule } from './../../../assets/components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMypagePage } from './admin-mypage';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminMypagePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminMypagePage),
  ],
})
export class AdminMypagePageModule {}
