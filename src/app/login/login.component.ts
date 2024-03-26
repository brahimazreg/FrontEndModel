import { AuthService } from './../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword=true;
  responsedata:any

  constructor(private http:HttpClient,
              private fb: FormBuilder,
              private authService : AuthService,
              private snackBar : MatSnackBar,
              private router : Router

              ){}


ngOnInit(){
  this.loginForm=this.fb.group({
    email:[null, [Validators.required]],
    password:[null,[Validators.required]]
  })
}
  onSubmit(){
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(
      (response:any) => {

        this.snackBar.open('Login success.','OK',{duration :5000});
        console.log(response);
        localStorage.setItem('token',response.token) ;
        localStorage.setItem("refreshToken",response.refreshToken);
        localStorage.setItem('role',response.role);
        localStorage.setItem('userId',response.id)

         if(response.role == 'ADMIN'){

          this.router.navigateByUrl('/admin');
        }else {
          //this.router.navigateByUrl('/user');
          this.router.navigateByUrl('/customer');
        }

       /*  console.log("in local storage")
        console.log(localStorage.getItem('token'))
        console.log(localStorage.getItem('refreshToken'))
        console.log(localStorage.getItem('role')) */

      },
      (error) => {
        this.snackBar.open('Bad Credentials.','ERROR',{duration :5000});
      }
     );

  }

  togglePasswordVisibility(){
      this.hidePassword = !this.hidePassword ;
  }
}
