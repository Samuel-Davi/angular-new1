import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)

  login(credentials: {email: string; password: string}){
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials)
  }
}
