import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  rePassword: string = '';
  newPasswordFieldType: string = 'password';
  rePasswordFieldType: string = 'password';
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
    console.log('Form submitted');
  }
}
