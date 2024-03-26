import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup<any>;
  hidePassword=true;

  constructor(
    private fb : FormBuilder,
    private snackBar: MatSnackBar ,
    private authService: AuthService,
    private router : Router){}

    ngOnInit(): void{


        this.signUpForm = this.fb.group({
          firstName: [null, [Validators.required]],
          lastName: [null, [Validators.required]],
          email: [null, [Validators.required ,  Validators.email]],
          password:[null, [Validators.required]],
          confirmPassword: [null, [Validators.required]]

          })

    }

  onSubmit(): void{
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm?.get('confirmPassword').value;
    if(password !== confirmPassword){
      this.snackBar.open('Password do not match.','close',{duration:5000 , panelClass:'error-snacbar'});
      return ;
    }

    this.authService.register(this.signUpForm.value).subscribe(

      (response:any) => {
        if(response.message != "exists"){
          this.snackBar.open('Sign up successfull', 'close',{duration:5000});
          this.router.navigateByUrl("/login");

        }else {
          this.snackBar.open('Email already exists , Please try again', 'close',{duration:5000 , panelClass:'error-snackbar'});
          this.router.navigateByUrl("/signup")
        }


      },
      (error) => {
         console.log(error);
        this.snackBar.open('Sign up faild. Please try again', 'close',{duration:5000 , panelClass:'error-snackbar'});
      }
    )
  }

  togglePasswordVisibility(){
   this.hidePassword=!this.hidePassword;
  }

}
