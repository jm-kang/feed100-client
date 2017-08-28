import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectHomePage } from './user-project-home';

import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserProjectHomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserProjectHomePage),
  ],
})
export class UserProjectHomePageModule {}
