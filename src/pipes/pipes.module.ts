import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { SlicetextareaPipe } from './../pipes/slicetextarea/slicetextarea';
import { TextcountPipe } from './../pipes/textcount/textcount';
import { DividePipe } from './../pipes/divide/divide';
import { ProgressStatePipe } from './../pipes/progressState/progressState';

@NgModule({
	declarations: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    ],
	imports: [],
	exports: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    ]
})
export class PipesModule {}
