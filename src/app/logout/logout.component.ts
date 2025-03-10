import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

constructor(private authService:AuthService, private router: Router){}

ngOnInit(){
  alert("You log out !")
  localStorage.clear();
  this.router.navigateByUrl('/login')
}

}
