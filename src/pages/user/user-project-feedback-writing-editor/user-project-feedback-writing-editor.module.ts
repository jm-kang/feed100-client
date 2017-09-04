import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackWritingEditorPage } from './user-project-feedback-writing-editor';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectFeedbackWritingEditorPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectFeedbackWritingEditorPage),
  ],
})
export class UserProjectFeedbackWritingEditorPageModule {}
