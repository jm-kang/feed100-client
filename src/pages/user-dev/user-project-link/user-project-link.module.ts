import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectLinkPage } from './user-project-link';

@NgModule({
  declarations: [
    UserProjectLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProjectLinkPage),
  ],
})
export class UserProjectLinkPageModule {}
