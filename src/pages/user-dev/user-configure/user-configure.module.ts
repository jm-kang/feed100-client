import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserConfigurePage } from './user-configure';

@NgModule({
  declarations: [
    UserConfigurePage,
  ],
  imports: [
    IonicPageModule.forChild(UserConfigurePage),
  ],
})
export class UserConfigurePageModule {}
