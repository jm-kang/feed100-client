import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectSideMenuPage } from './admin-project-side-menu';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminProjectSideMenuPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(AdminProjectSideMenuPage),
  ],
})
export class AdminProjectSideMenuPageModule {}
