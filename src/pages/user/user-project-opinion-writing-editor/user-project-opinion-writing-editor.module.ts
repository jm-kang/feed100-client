import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectOpinionWritingEditorPage } from './user-project-opinion-writing-editor';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectOpinionWritingEditorPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectOpinionWritingEditorPage),
  ],
})
export class UserProjectOpinionWritingEditorPageModule {}
