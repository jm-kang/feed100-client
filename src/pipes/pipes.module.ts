import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { SlicetextPipe } from './../pipes/slicetext/slicetext';
import { TextcountPipe } from './../pipes/textcount/textcount';
import { DividePipe } from './../pipes/divide/divide';
import { ProgressStatePipe } from './../pipes/progressState/progressState';
import { JsonParsePipe } from './../pipes/json-parse/json-parse';
import { ReversePipe } from './../pipes/reverse/reverse';
import { RoundPipe } from './../pipes/round/round';
import { ReplaceBrTagPipe } from './replace-br-tag/replace-br-tag';
import { TypeToTextPipe } from './type-to-text/type-to-text';
import { DDayPipe } from './d-day/d-day';

@NgModule({
	declarations: [YoutubePipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    JsonParsePipe,
    SlicetextPipe,
    ReversePipe,
    RoundPipe,
    ReplaceBrTagPipe,
    TypeToTextPipe,
    DDayPipe
    ],
	imports: [],
	exports: [YoutubePipe,
    TextcountPipe,
    DividePipe,
	ProgressStatePipe,
    JsonParsePipe,
    SlicetextPipe,
    ReversePipe,
    RoundPipe,
    ReplaceBrTagPipe,
    TypeToTextPipe,
    DDayPipe
    ]
})
export class PipesModule {}
