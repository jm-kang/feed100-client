import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectStorySummaryWritingEditorPage } from './user-project-story-summary-writing-editor';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectStorySummaryWritingEditorPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectStorySummaryWritingEditorPage),
  ],
})
export class UserProjectStorySummaryWritingEditorPageModule {}
