import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectPage } from './user-project';

@NgModule({
  declarations: [
    UserProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectPage),
  ],
})
export class UserProjectPageModule {}
