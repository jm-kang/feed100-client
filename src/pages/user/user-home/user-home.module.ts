import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePage } from './user-home';

// import { ProgressBarComponent } from '../../../components/progress-bar/progress-bar';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    UserHomePage,
    // ProgressBarComponent,
  ],
  imports: [
    // ProgressBarComponent,
    ComponentsModule,
    IonicPageModule.forChild(UserHomePage),
  ],
})
export class UserHomePageModule {}
