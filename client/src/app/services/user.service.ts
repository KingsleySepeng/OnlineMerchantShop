import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:String = 'http://localhost:8080/api/users';
  constructor(private http:HttpClient) { }

  signup(user:User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }

  login(user:User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(`this.baseUrl`)
  }
}
