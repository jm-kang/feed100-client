import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPointExchangePage } from './user-point-exchange';

@NgModule({
  declarations: [
    UserPointExchangePage,
  ],
  imports: [
    IonicPageModule.forChild(UserPointExchangePage),
  ],
})
export class UserPointExchangePageModule {}
