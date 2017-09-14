import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectFeedbackListPage } from './user-project-feedback-list';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectFeedbackListPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectFeedbackListPage),
  ],
})
export class UserProjectFeedbackListPageModule {}
