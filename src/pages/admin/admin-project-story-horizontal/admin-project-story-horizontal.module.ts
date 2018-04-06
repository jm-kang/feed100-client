import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectStoryHorizontalPage } from './admin-project-story-horizontal';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    AdminProjectStoryHorizontalPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminProjectStoryHorizontalPage),
  ],
})
export class AdminProjectStoryHorizontalPageModule {}
