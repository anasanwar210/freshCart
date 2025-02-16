import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  errMSG!: string;
  dataSent: boolean = false;
  currentUser!: string;
  inputDisabled: boolean = true;

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    @Inject(PLATFORM_ID) private id: object
  ) {
    if (isPlatformBrowser(id)) {
      this.currentUser = localStorage.getItem('currentUser') || '';
    }
  }
  setNewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][A-z0-9]{7,}$/),
    ]),
  });

  submitNewPassword() {
    if (this.setNewPasswordForm.valid) {
      this.dataSent = true;
      this._AuthService.newPassword(this.setNewPasswordForm.value).subscribe({
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

  resetForm() {
    this.setNewPasswordForm.reset();
  }

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('currentUser');
    if (savedEmail) {
      this.setNewPasswordForm.patchValue({ email: savedEmail });
    }
  }
}
