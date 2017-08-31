import { NgModule } from '@angular/core';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { DividePipe } from './../pipes/divide/divide';
import { ProgressStatePipe } from './../pipes/progressState/progressState';

@NgModule({
	declarations: [YoutubePipe,
    DividePipe,
	ProgressStatePipe,
    ],
	imports: [],
	exports: [YoutubePipe,
    DividePipe,
	ProgressStatePipe,
    ]
})
export class PipesModule {}
