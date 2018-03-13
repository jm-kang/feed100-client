import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPointUsageHistoryPage } from './user-point-usage-history';

@NgModule({
  declarations: [
    UserPointUsageHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPointUsageHistoryPage),
  ],
})
export class UserPointUsageHistoryPageModule {}
