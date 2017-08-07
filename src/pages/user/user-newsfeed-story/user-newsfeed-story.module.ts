import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserNewsfeedStoryPage } from './user-newsfeed-story';

@NgModule({
  declarations: [
    UserNewsfeedStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserNewsfeedStoryPage),
  ],
})
export class UserNewsfeedStoryPageModule {}
