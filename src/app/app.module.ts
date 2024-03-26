import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    CustomerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterailModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule



  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : AuthInterceptor,
      multi : true
     }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
