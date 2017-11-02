import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectPage } from './user-project';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserProjectPage,
    // ProgressBarComponent
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectPage),
  ],
})
export class UserProjectPageModule {}
