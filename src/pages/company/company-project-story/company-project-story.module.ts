import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectStoryPage } from './company-project-story';

@NgModule({
  declarations: [
    CompanyProjectStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProjectStoryPage),
  ],
})
export class CompanyProjectStoryPageModule {}
