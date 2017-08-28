import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFilterPage } from './user-project-filter';

@NgModule({
  declarations: [
    UserProjectFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectFilterPage),
  ],
})
export class UserProjectFilterPageModule {}
