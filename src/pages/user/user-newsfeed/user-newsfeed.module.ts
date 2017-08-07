import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserNewsfeedPage } from './user-newsfeed';

@NgModule({
  declarations: [
    UserNewsfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(UserNewsfeedPage),
  ],
})
export class UserNewsfeedPageModule {}
