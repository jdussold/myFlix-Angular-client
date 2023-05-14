import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * User Login Form Component
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  // Declares the userData object with the Username and Password properties
  userData = { Username: '', Password: '' };

  // Flag to check if there's an error during login
  loginError: boolean = false;
  loginErrorMessage: string = '';
  loading: boolean = false;

  // Defines the login form
  loginForm: FormGroup = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required],
  });

  /**
   * Constructor
   * @param fb - The FormBuilder instance
   * @param fetchApiData - The FetchApiDataService instance
   * @param dialogRef - The MatDialogRef instance
   * @param snackBar - The MatSnackBar instance
   * @param router - The Router instance
   */
  constructor(
    private fb: FormBuilder,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of the component are initialized
   */
  ngOnInit(): void {}

  /**
   * Logs in the user
   */
  loginUser(): void {
    const { Username, Password } = this.loginForm.value;
    this.loading = true;
    this.fetchApiData.userLogin({ Username, Password }).subscribe({
      next: (result: any) => {
        this.loading = false;
        this.loginError = false;
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Logged in successfully!', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      error: (error: any) => {
        this.loading = false;
        this.loginError = true;
        if (error.status === 400) {
          this.loginErrorMessage =
            error.error.message ||
            'Invalid username or password. Please try again.';
        } else {
          const errorMessage = error.error.message || 'Unknown error occurred!';
          this.loginErrorMessage = errorMessage;
        }
      },
      complete: () => {},
    });
  }
}
