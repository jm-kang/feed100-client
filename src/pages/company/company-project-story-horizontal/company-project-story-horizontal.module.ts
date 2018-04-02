import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectStoryHorizontalPage } from './company-project-story-horizontal';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    CompanyProjectStoryHorizontalPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectStoryHorizontalPage),
  ],
})
export class CompanyProjectStoryHorizontalPageModule {}
