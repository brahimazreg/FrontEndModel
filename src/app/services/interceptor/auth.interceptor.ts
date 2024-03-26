import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,

} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';






@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    //****************************************** */
    let token = localStorage.getItem('token')  ;
     if(token){
      request= request.clone({
        setHeaders: { Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(request).pipe(
     catchError(errordata => {
       if(errordata.status === 401 || errordata.status === 403){
        //   manage logout
         //this.authService.logout();
        //manage refreshtoken
      return this.handleRefreshToken(request,next);
    /*   let refreshToken =localStorage.getItem('refreshToken');
      this.authService.generateRefreshToken(refreshToken).subscribe(
        data => console.log(data)
      ) */
       }

      return throwError(errordata);
     })

    );

  }

handleRefreshToken(request: HttpRequest<any>, next: HttpHandler){
  let refreshToken =localStorage.getItem('refreshToken');
 return  this.authService.generateRefreshToken(refreshToken).pipe(
  switchMap( (data : any) => {
    console.log("inside switch");
    localStorage.setItem('token',data.token) ;
    localStorage.setItem('refreshToken',data.refreshtoken);
    request= request.clone({
      setHeaders: { Authorization: `Bearer ${data.token}`}
    })
    return next.handle(request);
  }), catchError((err)=> {
      return throwError(() => {
        this.router.navigateByUrl("/login")
      })

  })

  );

}



}
