import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectHistoryPage } from './user-project-history';

@NgModule({
  declarations: [
    UserProjectHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectHistoryPage),
  ],
})
export class UserProjectHistoryPageModule {}
