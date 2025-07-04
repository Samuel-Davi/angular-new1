import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { TypeToast, User } from '../../../core/models/types.models';
import { ToastComponent } from '../../../shared/toast/toast';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  showToast = false
  toastType: TypeToast = 'error'
  toastMessage = '';

  ngOnInit(): void {
    console.log("pagina inicializada")
  }

  private authService = inject(AuthService)
  private router = inject(Router)

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login(){
    if (this.form.valid){
      const { email, password } = this.form.value;

      if (!email || !password) {
        this.showToast = true;
        this.toastMessage = 'Preencha todos os campos!';
        setTimeout(() => this.showToast = false, 3000);
        return;
      }

      this.authService.login({ email, password }).subscribe({
        next: (res:{token: string, user: User}) => {
          this.toastType = 'success'
          this.toastMessage = 'Bem vindo, '  + res.user.name
          this.showToast = true
          setTimeout(() => {
            this.showToast = false
            this.router.navigate(['/dashboard'])
          }, 1000);
          
        },
        error: (err) => {
          this.showToast = true;
          this.toastMessage = 'Email ou senha incorretos!';
          setTimeout(() => this.showToast = false, 3000);
        },
      });

    }
  }
}
