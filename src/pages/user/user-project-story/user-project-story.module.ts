import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectStoryPage } from './user-project-story';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserProjectStoryPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectStoryPage),
  ],
})
export class UserProjectStoryPageModule {}
