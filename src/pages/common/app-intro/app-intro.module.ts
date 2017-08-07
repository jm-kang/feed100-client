import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppIntroPage } from './app-intro';

@NgModule({
  declarations: [
    AppIntroPage,
  ],
  imports: [
    IonicPageModule.forChild(AppIntroPage),
  ],
})
export class AppIntroPageModule {}
