import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  ngOnInit(): void {
    console.log("pagina inicializada")
  }

  private authService = inject(AuthService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  login(){
    if (this.form.valid){
      const { email, password } = this.form.value;

      if (!email || !password) {
        console.warn('Campos obrigatórios não preenchidos');
        return;
      }

      this.authService.login({ email, password }).subscribe({
        next: (res) => console.log('Logado com sucesso!', res),
        error: (err) => console.error('Erro no login', err),
      });

    }
  }
}
