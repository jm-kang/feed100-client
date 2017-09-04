import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectSearchPage } from './user-project-search';

@NgModule({
  declarations: [
    UserProjectSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectSearchPage),
  ],
})
export class UserProjectSearchPageModule {}
