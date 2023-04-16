// Importing necessary components and services from Angular Material and our custom FetchApiDataService
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  // Declare the userData object with the Username and Password properties
  @Input() userData: {
    Username: string;
    Password: string;
  } = { Username: '', Password: '' };

  constructor(
    // Inject the FetchApiDataService, MatDialogRef, and MatSnackBar services
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    // Destructure the userData object to get the values of Username and Password
    const { Username, Password } = this.userData;
    // Call the userLogin method from the FetchApiDataService service, passing in the user's login information
    this.fetchApiData.userLogin({ Username, Password }).subscribe(
      // Handle the successful response from the server
      (result: any) => {
        // Save the current user's information and token to localStorage
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        // Close the dialog window
        this.dialogRef.close();
        // Display a success message using the MatSnackBar service
        this.snackBar.open('Logged in successfully!', 'OK', { duration: 2000 });
      },
      // Handle the error response from the server
      (error: any) => {
        // Display the error message (or a default message if none is provided) using the MatSnackBar service
        const errorMessage = error.error.message || 'Unknown error occurred!';
        this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
      }
    );
  }
}
