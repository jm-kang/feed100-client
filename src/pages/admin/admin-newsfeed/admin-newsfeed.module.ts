import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNewsfeedPage } from './admin-newsfeed';

@NgModule({
  declarations: [
    AdminNewsfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminNewsfeedPage),
  ],
})
export class AdminNewsfeedPageModule {}
