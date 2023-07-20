import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        ToastrModule.forRoot()
    ],
})
export class SharedModule { }
