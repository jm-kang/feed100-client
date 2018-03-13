import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectHomePage } from './user-project-home';

@NgModule({
  declarations: [
    UserProjectHomePage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectHomePage),
  ],
})
export class UserProjectHomePageModule {}
