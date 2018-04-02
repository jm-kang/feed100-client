import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectStoryQuizFormPage } from './user-project-story-quiz-form';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectStoryQuizFormPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectStoryQuizFormPage),
  ],
})
export class UserProjectStoryQuizFormPageModule {}
