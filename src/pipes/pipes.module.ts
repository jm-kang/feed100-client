import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { SlicetextareaPipe } from './../pipes/slicetextarea/slicetextarea';
import { SlicetextPipe } from './../pipes/slicetext/slicetext';
import { TextcountPipe } from './../pipes/textcount/textcount';
import { DividePipe } from './../pipes/divide/divide';
import { ProgressStatePipe } from './../pipes/progressState/progressState';
import { JsonParsePipe } from './../pipes/json-parse/json-parse';

@NgModule({
	declarations: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    JsonParsePipe,
    SlicetextPipe
    ],
	imports: [],
	exports: [YoutubePipe,
    SlicetextareaPipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    JsonParsePipe,
    SlicetextPipe
    ]
})
export class PipesModule {}
