import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackListPage } from './user-project-feedback-list';

import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    UserProjectFeedbackListPage,
  ],
  imports: [
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(UserProjectFeedbackListPage),
  ],
})
export class UserProjectFeedbackListPageModule {}
