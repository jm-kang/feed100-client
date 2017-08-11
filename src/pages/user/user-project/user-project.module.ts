import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectPage } from './user-project';

// import { ProgressBarComponent } from '../../../components/progress-bar/progress-bar';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserProjectPage,
    // ProgressBarComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(UserProjectPage),
  ],
})
export class UserProjectPageModule {}
