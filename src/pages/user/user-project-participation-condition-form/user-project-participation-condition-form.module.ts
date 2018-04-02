import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectParticipationConditionFormPage } from './user-project-participation-condition-form';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectParticipationConditionFormPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectParticipationConditionFormPage),
  ],
})
export class UserProjectParticipationConditionFormPageModule {}
