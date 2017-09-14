import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectHomePage } from './user-project-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserProjectHomePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectHomePage),
  ],
})
export class UserProjectHomePageModule {}
