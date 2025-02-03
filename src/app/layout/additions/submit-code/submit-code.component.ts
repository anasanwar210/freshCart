import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-submit-code',
  imports: [ReactiveFormsModule],
  templateUrl: './submit-code.component.html',
  styleUrl: './submit-code.component.scss',
})
export class SubmitCodeComponent {
  errMSG!: string;
  dataSent: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  submitCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4,8}$/),
    ]),
  });

  submitCode(): void {
    if (this.submitCodeForm.valid) {
      this.dataSent = true;
      this._AuthService.resetCode(this.submitCodeForm.value).subscribe({
        next: (res) => {
          this.dataSent = false;
          this._Router.navigate(['/setNewPassword']);
        },
        error: (err) => {
          this.dataSent = false;
          this.errMSG = err.error.message;
          console.log(err);
        },
      });
    }
  }
}
