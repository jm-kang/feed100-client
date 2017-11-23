import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyTutorialPage } from './company-tutorial';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    CompanyTutorialPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyTutorialPage),
  ],
})
export class CompanyTutorialPageModule {}
