import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ProvideFileRoutingModule } from './provide-file-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProvideFileRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProvideFileModule { }
