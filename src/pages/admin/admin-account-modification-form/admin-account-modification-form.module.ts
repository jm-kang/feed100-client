import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAccountModificationFormPage } from './admin-account-modification-form';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminAccountModificationFormPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminAccountModificationFormPage),
  ],
})
export class AdminAccountModificationFormPageModule {}
