import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserNewsfeedStoryPage } from './user-newsfeed-story';

import { ElasticModule } from 'angular2-elastic';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserNewsfeedStoryPage,
  ],
  imports: [
    ElasticModule,
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(UserNewsfeedStoryPage),
  ],
})
export class UserNewsfeedStoryPageModule {}
