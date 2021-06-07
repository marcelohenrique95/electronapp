import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from '../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
