import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {UserResponse} from "../models/user-response";
import {UserRequest} from "../models/user-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  private baseUrl = "http://localhost:8080/api";
  login(userRequest: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/user/login`, userRequest)
  }
}
