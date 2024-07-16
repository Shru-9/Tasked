import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
// import { AngularFireModule } from '@angular/fire/compat';
// import { environment } from '../environments/environment';
// import { FirestoreModule } from '@angular/fire/firestore'
import { AppComponent } from './app.component';
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './global/material/material.module';
import { DialogModule } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './component/session/login/login.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatExpansionModule } from '@angular/material/expansion';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  
  entryComponents: [],
  declarations: [
    AppComponent,LoginComponent,DialogComponent
  ],
  imports: [
    CommonModule,    
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    // SlickCarouselModule,
    RouterModule,
    DialogModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatChipsModule,
    MatExpansionModule,
    // FirestoreModule,
    // AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
