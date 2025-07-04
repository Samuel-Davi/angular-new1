import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../core/models/types.models';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit{

  private authService = inject(AuthService)
  private router = inject(Router)

  public user: User | null = null

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  
}
