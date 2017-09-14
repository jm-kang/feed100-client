import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectSearchResultPage } from './user-project-search-result';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectSearchResultPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectSearchResultPage),
  ],
})
export class UserProjectSearchResultPageModule {}
