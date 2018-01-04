import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectSearchPage } from './admin-project-search';

@NgModule({
  declarations: [
    AdminProjectSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProjectSearchPage),
  ],
})
export class AdminProjectSearchPageModule {}
