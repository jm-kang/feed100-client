import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectInterviewWritingEditorPage } from './user-project-interview-writing-editor';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectInterviewWritingEditorPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectInterviewWritingEditorPage),
  ],
})
export class UserProjectInterviewWritingEditorPageModule {}
