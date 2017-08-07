import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivateInfoPolicyPage } from './private-info-policy';

@NgModule({
  declarations: [
    PrivateInfoPolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivateInfoPolicyPage),
  ],
})
export class PrivateInfoPolicyPageModule {}
