import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyHomePage } from './company-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CompanyHomePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyHomePage),
  ],
})
export class CompanyHomePageModule {}
