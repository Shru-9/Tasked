import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialModule } from 'src/app/global/material/material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,    
    NgbModule,
    FormsModule,
    MatIconModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatChipsModule,
    MatExpansionModule,
    MaterialModule
  ]
})
export class TaskModule { }
