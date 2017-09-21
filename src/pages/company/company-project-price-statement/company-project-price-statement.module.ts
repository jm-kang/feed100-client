import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectPriceStatementPage } from './company-project-price-statement';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyProjectPriceStatementPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(CompanyProjectPriceStatementPage),
  ],
})
export class CompanyProjectPriceStatementPageModule {}
