import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: new FormControl('', { validators: Validators.required }),
    password: new FormControl('', { validators: Validators.required }),
  });

  incorrectCredentials: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtHelperService
  ) {}
  ngOnInit(): void {
    this.loginForm.get('username')?.markAsDirty();
    this.loginForm.get('password')?.markAsDirty();
  }

  onSubmit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username && password) {
      this.authService.login(username, password).subscribe(
        (resp) => {
          localStorage.setItem('token', resp.body.token);
          const sub: string = this.jwtService.decodeToken(resp.body.token).sub;
          this.authService.sendMessage(sub);
          this.router
            .navigateByUrl(this.authService.urlRedirect ?? '/')
            .then(() => (this.authService.urlRedirect = undefined));
        },
        () => {
          this.incorrectCredentials = true;
          this.loginForm.controls['username'].setValue('');
          this.loginForm.controls['password'].setValue('');
        }
      );
    }
  }
}
