import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackFormPage } from './user-project-feedback-form';
import { Ionic2RatingModule } from 'ionic2-rating';

import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    UserProjectFeedbackFormPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectFeedbackFormPage),
    Ionic2RatingModule,
    PipesModule,
  ],
})
export class UserProjectFeedbackFormPageModule {}
