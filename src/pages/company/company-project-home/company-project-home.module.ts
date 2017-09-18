import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectHomePage } from './company-project-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CompanyProjectHomePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    IonicPageModule.forChild(CompanyProjectHomePage),
  ],
})
export class CompanyProjectHomePageModule {}
