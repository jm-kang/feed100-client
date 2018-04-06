import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProjectReportPage } from './admin-project-report';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    AdminProjectReportPage,
  ],
  imports: [
    Ionic2RatingModule,
    ComponentsModule,
    PipesModule,
    MomentModule,
    ChartsModule,
    IonicPageModule.forChild(AdminProjectReportPage),
  ],
})
export class AdminProjectReportPageModule {}
