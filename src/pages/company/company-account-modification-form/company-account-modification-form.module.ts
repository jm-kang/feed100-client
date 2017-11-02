import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyAccountModificationFormPage } from './company-account-modification-form';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyAccountModificationFormPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyAccountModificationFormPage),
  ],
})
export class CompanyAccountModificationFormPageModule {}
