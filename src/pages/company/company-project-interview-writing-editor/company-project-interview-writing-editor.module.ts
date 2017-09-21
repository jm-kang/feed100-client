import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectInterviewWritingEditorPage } from './company-project-interview-writing-editor';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CompanyProjectInterviewWritingEditorPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CompanyProjectInterviewWritingEditorPage),
  ],
})
export class CompanyProjectInterviewWritingEditorPageModule {}
