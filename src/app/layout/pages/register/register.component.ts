import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('agree') agreeTerms!: ElementRef<HTMLInputElement>;
  isChecked!: boolean;
  errMSG!: string;
  dataSent: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][A-z0-9]{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.isPasswordMatch
  );

  isPasswordMatch(formGroup: AbstractControl) {
    const passwordControl = formGroup.get('password');
    const rePasswordControl = formGroup.get('rePassword');

    if (!passwordControl || !rePasswordControl) {
      return null;
    }

    if (
      passwordControl?.value === rePasswordControl?.value &&
      passwordControl?.value !== null
    ) {
      rePasswordControl?.setErrors(null);
      return null;
    } else {
      rePasswordControl?.setErrors({ misMatch: true });
      return { misMatch: true };
    }
  }
  submitRegister() {
    if (this.registerForm.valid) {
      this.dataSent = true;

      this._AuthService.signup(this.registerForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['home']);
          this.dataSent = false;
          this.resetForm();
        },
        error: (err) => {
          this.dataSent = false;
          this.errMSG = err.error.message;
        },
      });
    }
  }

  checkTerms() {
    if (this.agreeTerms.nativeElement.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  resetForm() {
    this.registerForm.reset();
    this.agreeTerms.nativeElement.checked = false;
  }
}
