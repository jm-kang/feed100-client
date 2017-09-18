import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyNewsfeedStoryPage } from './company-newsfeed-story';

import { ElasticModule } from 'angular2-elastic';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CompanyNewsfeedStoryPage,
  ],
  imports: [
    ElasticModule,
    PipesModule,
    MomentModule,
    ComponentsModule,
    IonicPageModule.forChild(CompanyNewsfeedStoryPage),
  ],
})
export class CompanyNewsfeedStoryPageModule {}
