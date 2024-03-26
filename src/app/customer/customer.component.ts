import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  message: string;

  constructor(private authService : AuthService){

  }

  ngOnInit(){
    this.getMessage();
  }

  getMessage(){
    debugger
    this.authService.getUserMessage().subscribe({
      next: (data: any) => {
          this.message=data +  " without child ";
      },
      error: error => {
          console.log(error);
      }
  });
  }

}
