import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HighlightDirective,
    FilterPipe,
    Error404PageComponent,
  ],
  imports: [
    CommonModule,
    Error404PageComponent
  ]
})
export class SharedModule { }
