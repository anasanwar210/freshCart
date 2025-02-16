import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  rePassword: string = '';
  newPasswordFieldType: string = 'password';
  rePasswordFieldType: string = 'password';
  errMsg!: string;
  dataSent: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {}

  changePasswordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][A-z0-9]{7,}$/),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][A-z0-9]{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    this.isPasswordMatch
  );

  isPasswordMatch(formGroup: AbstractControl) {
    const passwordControl = formGroup.get('newPassword');
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

  togglePasswordVisibility(field: string): void {
    if (field === 'newPassword') {
      this.newPasswordFieldType =
        this.newPasswordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'rePassword') {
      this.rePasswordFieldType =
        this.rePasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

  onSubmit(): void {
    const { currentPassword, newPassword, rePassword } =
      this.changePasswordForm.value;
    if (this.changePasswordForm.valid) {
      this.dataSent = true;
      this._AuthService
        .changeCurrentPassword(currentPassword, newPassword, rePassword)
        .subscribe({
          next: (res) => {
            this.dataSent = false;
            this._ToastrService.success(res.message, 'Change Password', {
              progressBar: true,
              positionClass: 'toast-bottom-right',
            });
          },
          error: (err) => {
            this.dataSent = false;
            this.errMsg = err.error.message;
            this._ToastrService.error(err.error.message, 'Change Password', {
              progressBar: true,
              positionClass: 'toast-bottom-right',
            });
          },
        });
    }
  }

  showSuccess() {}
}
