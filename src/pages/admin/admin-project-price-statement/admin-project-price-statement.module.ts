import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectPriceStatementPage } from './admin-project-price-statement';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectPriceStatementPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(AdminProjectPriceStatementPage),
  ],
})
export class AdminProjectPriceStatementPageModule {}
