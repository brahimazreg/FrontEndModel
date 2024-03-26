import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message: string;

  constructor(private authService : AuthService){

  }

  ngOnInit(){
    this.getMessage();
  }

  getMessage(){
    debugger
    this.authService.getAdminMessage().subscribe({
      next: (data: any) => {
          this.message=data + " without child ";
      },
      error: error => {
          console.log(error);
      }
  });
  }

}
