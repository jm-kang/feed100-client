import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { SlicetextareaPipe } from './../pipes/slicetextarea/slicetextarea';
import { TextcountPipe } from './../pipes/textcount/textcount';
import { DividePipe } from './../pipes/divide/divide';
import { ProgressStatePipe } from './../pipes/progressState/progressState';
import { SlicetextPipe } from './../pipes/slicetext/slicetext';

@NgModule({
	declarations: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    SlicetextPipe,
    ],
	imports: [],
	exports: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    SlicetextPipe,
    ]
})
export class PipesModule {}
