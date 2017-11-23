import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTutorialPage } from './user-tutorial';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserTutorialPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserTutorialPage),
  ],
})
export class UserTutorialPageModule {}
