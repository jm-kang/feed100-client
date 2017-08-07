import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectSideMenuPage } from './user-project-side-menu';

@NgModule({
  declarations: [
    UserProjectSideMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectSideMenuPage),
  ],
})
export class UserProjectSideMenuPageModule {}
