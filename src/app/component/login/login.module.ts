import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/global/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,    
    NgbModule,    
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SlickCarouselModule
  ]
})
export class LoginModule { }
