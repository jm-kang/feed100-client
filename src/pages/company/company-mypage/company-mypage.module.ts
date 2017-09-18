import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyMypagePage } from './company-mypage';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CompanyMypagePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyMypagePage),
  ],
})
export class CompanyMypagePageModule {}
