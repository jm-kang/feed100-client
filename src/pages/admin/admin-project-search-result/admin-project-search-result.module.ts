import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectSearchResultPage } from './admin-project-search-result';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminProjectSearchResultPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(AdminProjectSearchResultPage),
  ],
})
export class AdminProjectSearchResultPageModule {}
