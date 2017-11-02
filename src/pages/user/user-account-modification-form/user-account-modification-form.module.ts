import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAccountModificationFormPage } from './user-account-modification-form';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserAccountModificationFormPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserAccountModificationFormPage),
  ],
})
export class UserAccountModificationFormPageModule {}
