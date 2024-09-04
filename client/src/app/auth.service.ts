import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/users/login';
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
    return this.http.post<any>(this.apiUrl,credentials).pipe(
      map(response=>{
        if(response){
          this.setLoginStatus(true);
          return response;
        }
        throw new Error('INVALID CREDENTIALS');
      }),
      catchError(error=>{
        this.setLoginStatus(false);
        return of(null);
      })
    );
  }
}
