import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent},
    { path:'customer', component:CustomerComponent},
    { path: "logout", component: LogoutComponent},
    { path: "admin", component: AdminComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
