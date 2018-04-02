import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAllProjectListPage } from './user-all-project-list';

@NgModule({
  declarations: [
    UserAllProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAllProjectListPage),
  ],
})
export class UserAllProjectListPageModule {}
