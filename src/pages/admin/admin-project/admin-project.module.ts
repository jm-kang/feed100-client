import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectPage } from './admin-project';

@NgModule({
  declarations: [
    AdminProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProjectPage),
  ],
})
export class AdminProjectPageModule {}
