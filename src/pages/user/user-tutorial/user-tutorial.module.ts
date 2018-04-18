import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTutorialPage } from './user-tutorial';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';
import { ElasticModule } from 'angular2-elastic';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    UserTutorialPage,
  ],
  imports: [
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    MomentModule,
    ElasticModule,
    ChartsModule,
    IonicPageModule.forChild(UserTutorialPage),
  ],
})
export class UserTutorialPageModule {}
