import { Router } from '@angular/router';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



const BASIC_URL="http://localhost:3000/api/"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private router:Router) {

  }
  register(signupRequest:any) {
    return this.http.post<any>("http://localhost:3000/auth/signup",signupRequest);
  }

  login(data: string) {
    return this.http.post("http://localhost:3000/auth/signin",data);
  }

  getAdminMessage(){
    return this.http.get('http://localhost:3000/admin/alone' , { responseType: 'text' as 'json' } );
  }
  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  getUserMessage(){

    return this.http.get('http://localhost:3000/user/alone' , { responseType: 'text' as 'json' } );
  }

  generateRefreshToken(refreshToken: string){
    let obj ={
      token: refreshToken
    }

     var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${refreshToken}`)
    }
    //setHeaders: { Authorization: `Bearer ${token}`}
    /* const httpOptions = {
      headers: new HttpHeaders({

        'Content-Type':  'application/json'

      })
    };
 */
  //  httpOptions.headers =
 // httpOptions.headers.set('Authorization', `Bearer ${refreshToken}`);
 /*  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  */
      /*  console.log(input);
       let myheaders = {
        'Authorization': 'Bearer ' + refreshToken
     }; */
     return this.http.post<any>("http://localhost:3000/auth/refresh", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: obj})

            //return this.http.post<any>("http://localhost:3000/auth/refresh", obj, httpOptions)
           // return this.http.post<any>("http://localhost:3000/auth/refresh", obj, header)


  }

  logout(){
    alert("Your Session has is Expired !")
    localStorage.clear();
    this.router.navigateByUrl('/login');

  }



}
