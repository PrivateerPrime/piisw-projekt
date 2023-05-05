import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

function myValidator(): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    let errors: any = {};
    if (password.length < 6) {
      errors.passwordTooShort = true;
    } else if (password.length > 20) {
      errors.passwordTooLong = true;
    }
    if (!password.match(/[a-z]/)) {
      errors.passwordNoSmallLetters = true;
    }
    if (!password.match(/[A-Z]/)) {
      errors.passwordNoCapitalLetters = true;
    }
    if (!password.match(/\d/)) {
      errors.passwordNoNumbers = true;
    }
    if (!password.match(/[!@#$^&*\\(){}\[\]"':;<,>.?/]/)) {
      errors.passwordNoSpecialCharacter = true;
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ],
    }),
    password: new FormControl('', {
      validators: [Validators.required, myValidator()],
    }),
  });

  successfulRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.registerForm.get('username')?.markAsDirty();
    this.registerForm.get('password')?.markAsDirty();
    // this.registerForm.get('password2')?.markAsDirty();
  }

  onSubmit(): void {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    if (this.registerForm.valid) {
      this.authService.register(username!, password!).subscribe(
        (resp) => {
          this.successfulRegister = true;
          this.registerForm.get('username')?.setValue('');
          this.registerForm.get('password')?.setValue('');
          // this.router.navigate(['/']);
        },
        (error) => {
          window.alert(error.message);
        }
      );
    }
  }
}
