import { FormsModule } from '@angular/forms';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from 'ngx-mask'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ConfigurationModule { }

