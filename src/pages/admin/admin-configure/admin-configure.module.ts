import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminConfigurePage } from './admin-configure';

@NgModule({
  declarations: [
    AdminConfigurePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminConfigurePage),
  ],
})
export class AdminConfigurePageModule {}
