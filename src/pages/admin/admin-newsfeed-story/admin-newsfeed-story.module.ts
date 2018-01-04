import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNewsfeedStoryPage } from './admin-newsfeed-story';

import { ElasticModule } from 'angular2-elastic';
import { ComponentsModule } from './../../../assets/components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AdminNewsfeedStoryPage,
  ],
  imports: [
    ElasticModule,
    PipesModule,
    MomentModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminNewsfeedStoryPage),
  ],
})
export class AdminNewsfeedStoryPageModule {}
