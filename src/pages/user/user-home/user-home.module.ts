import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePage } from './user-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';

@NgModule({
  declarations: [
    UserHomePage,
    // ProgressBarComponent,
  ],
  imports: [ 
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserHomePage),
  ],
})
export class UserHomePageModule {}
