import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { SessionRoutingModule } from './session-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/global/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // MatCarouselModule.forRoot() ,
    ReactiveFormsModule,
    SessionRoutingModule,
    MaterialModule,
  ]
})
export class SessionModule { }
