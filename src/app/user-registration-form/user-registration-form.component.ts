import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      Username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      Password: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Birthday: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  registerUser(): void {
    const { Username, Password, Email, Birthday } = this.registrationForm.value;
    this.fetchApiData
      .userRegistration({ Username, Password, Email, Birthday })
      .subscribe({
        next: (result: any) => {
          this.fetchApiData.userLogin({ Username, Password }).subscribe({
            next: (result: any) => {
              localStorage.setItem('user', JSON.stringify(result.user));
              localStorage.setItem('token', result.token);
              this.dialogRef.close();
              this.snackBar.open('Logged in successfully!', 'OK', {
                duration: 2000,
              });
              this.router.navigate(['movies']);
            },
            error: (error: any) => {
              const errorMessage =
                error.error.message || 'Unknown error occurred!';
              this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
            },
          });
        },
        error: (error: any) => {
          const errorMessage = error.error.message || 'Unknown error occurred!';
          this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
        },
      });
  }
}
