import { Component, inject, signal } from '@angular/core';
import { AuthService, User, vTexto } from '../../index'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public varText = vTexto.login;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  messageError = signal<string>("")

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  public authLogin(): void {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        const currentUser: User | any = this.authService.currentUser();
        console.log(currentUser)

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.messageError.set(error)
      }

    });
  }
}
