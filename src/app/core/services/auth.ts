import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import { User } from '../models/types.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private currentUser:User | null = null;

  constructor() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  isLoggedIn(){
    const token = localStorage.getItem('token')
    return !!token;
  }

  getCurrentUser(){
    return this.currentUser
  }

  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.currentUser = null
  }

  login(credentials: {email: string; password: string}){
    return this.http.post<{token: string, user: User}>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user));
        this.currentUser = data.user
      })
    )
  }
}
