import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredeterminadoComponent } from './predeterminado.component';
import { CustomTimePipe } from './time.pipe';


@NgModule({
  declarations: [
    PredeterminadoComponent,
    CustomTimePipe 
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PredeterminadoComponent
  ]
})
export class PredeterminadoModule { }
