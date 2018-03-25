import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewFormPage } from './user-project-interview-form';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserProjectInterviewFormPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(UserProjectInterviewFormPage),
  ],
})
export class UserProjectInterviewFormPageModule {}
