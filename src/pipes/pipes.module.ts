import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { SlicetextareaPipe } from './../pipes/slicetextarea/slicetextarea';
import { TextcountPipe } from './../pipes/textcount/textcount';
@NgModule({
	declarations: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe],
	imports: [],
	exports: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe]
})
export class PipesModule {}
