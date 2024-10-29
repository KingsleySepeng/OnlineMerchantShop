import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users/login';
  private signUpApiUrl = 'http://localhost:8080/api/users/signup';
  private loggedIn: boolean = false;
  private storageKey = 'isLoggedIn'

  constructor(private http:HttpClient) {
    const storedStatus = localStorage.getItem(this.storageKey);
     this.loggedIn = storedStatus == 'true'; }

  setLoginStatus(status: boolean) {
    this.loggedIn = status;
    localStorage.setItem(this.storageKey,status? 'true': 'false');
  }

  isLoggedIn():Boolean{
    return this.loggedIn;
  }
  logout():void{
    this.setLoginStatus(false);
  }

  login(email:string,password:string):Observable<any>{
    const credentials = {email,password};
    const headers = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<any>(this.apiUrl,credentials,{headers}).pipe(
      map(response=>{
        if(response){
          this.setLoginStatus(true);
          return response;
        }
        throw new Error('INVALID CREDENTIALS');
      }),
      catchError(error=>{
        this.setLoginStatus(false);
        return throwError(()=> new Error(error.error || 'Server error'));
      })
    );
  }

  signup(user:User):Observable<any> {
    const headers = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<any>('http://localhost:8080/api/users/signup',user,{headers}).pipe(
      map(response=>{
        if(response){
          this.setLoginStatus(true);
          return response;
        }
        throw new Error('SIGNUP ERROR');
      }),
      catchError(error=>{
        this.setLoginStatus(false);
        return throwError(()=> new Error(error.error || 'Server error'));
      })
    );
  }
}
