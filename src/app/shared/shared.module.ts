import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './components/popover/popover.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ConfirmationModalComponent,
    PopoverComponent,
    SkeletonComponent
  ],
  exports: [ConfirmationModalComponent, TooltipModule, PopoverComponent, SkeletonComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TooltipModule,
    NgxSkeletonLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
})
export class SharedModule { }
