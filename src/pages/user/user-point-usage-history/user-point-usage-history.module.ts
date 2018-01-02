import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPointUsageHistoryPage } from './user-point-usage-history';
import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserPointUsageHistoryPage,
  ],
  imports: [
    MomentModule,
    PipesModule,
    IonicPageModule.forChild(UserPointUsageHistoryPage),
  ],
})
export class UserPointUsageHistoryPageModule {}
