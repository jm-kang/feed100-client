import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyTutorialPage } from './company-tutorial';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';
import { ElasticModule } from 'angular2-elastic';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    CompanyTutorialPage,
  ],
  imports: [
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule,
    MomentModule,
    ElasticModule,
    ChartsModule,
    IonicPageModule.forChild(CompanyTutorialPage),
  ],
})
export class CompanyTutorialPageModule {}
