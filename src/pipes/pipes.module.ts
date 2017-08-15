import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
@NgModule({
	declarations: [YoutubePipe],
	imports: [],
	exports: [YoutubePipe]
})
export class PipesModule {}
