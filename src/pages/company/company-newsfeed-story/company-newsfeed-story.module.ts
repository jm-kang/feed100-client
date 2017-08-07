import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNewsfeedStoryPage } from './company-newsfeed-story';

@NgModule({
  declarations: [
    CompanyNewsfeedStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyNewsfeedStoryPage),
  ],
})
export class CompanyNewsfeedStoryPageModule {}
