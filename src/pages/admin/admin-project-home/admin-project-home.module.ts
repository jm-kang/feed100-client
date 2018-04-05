import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectHomePage } from './admin-project-home';

@NgModule({
  declarations: [
    AdminProjectHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProjectHomePage),
  ],
})
export class AdminProjectHomePageModule {}
