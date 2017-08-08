import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullSizeImagePage } from './full-size-image';

@NgModule({
  declarations: [
    FullSizeImagePage,
  ],
  imports: [
    IonicPageModule.forChild(FullSizeImagePage),
  ],
})
export class FullSizeImagePageModule {}
