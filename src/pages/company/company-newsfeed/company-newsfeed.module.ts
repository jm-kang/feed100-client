import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNewsfeedPage } from './company-newsfeed';

@NgModule({
  declarations: [
    CompanyNewsfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyNewsfeedPage),
  ],
})
export class CompanyNewsfeedPageModule {}
