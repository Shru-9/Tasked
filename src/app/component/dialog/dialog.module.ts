import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/global/material/material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    NgModule,
    MaterialModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DialogModule { }
