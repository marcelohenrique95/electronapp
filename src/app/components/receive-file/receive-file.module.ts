import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReceiveFileRoutingModule } from './receive-file-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReceiveFileRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ReceiveFileModule { }
