import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectStoryPage } from './user-project-story';

@NgModule({
  declarations: [
    UserProjectStoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectStoryPage),
  ],
})
export class UserProjectStoryPageModule {}
