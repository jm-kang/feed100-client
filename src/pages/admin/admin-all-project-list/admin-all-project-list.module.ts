import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAllProjectListPage } from './admin-all-project-list';

@NgModule({
  declarations: [
    AdminAllProjectListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAllProjectListPage),
  ],
})
export class AdminAllProjectListPageModule {}
