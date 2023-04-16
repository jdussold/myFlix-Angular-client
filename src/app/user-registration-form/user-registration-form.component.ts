// Importing necessary components and services from Angular Material and our custom FetchApiDataService
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Defining the component's selector, template, and styles
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  // Declaring userData object and setting its initial values to empty strings
  @Input() userData: {
    Username: string;
    Password: string;
    Email: string;
    Birthday: string;
  } = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    // Injecting FetchApiDataService, MatDialogRef, and MatSnackBar services into the constructor
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Empty ngOnInit method
  }

  registerUser(): void {
    // Destructuring userData object to get the values of Username, Password, Email, and Birthday
    const { Username, Password, Email, Birthday } = this.userData;
    // Calling the userRegistration method from FetchApiDataService, passing in the user's registration information
    this.fetchApiData
      .userRegistration({ Username, Password, Email, Birthday })
      // Subscribing to the response from the server and handling success and error cases
      .subscribe(
        (result: string) => {
          // Closing the dialog window if registration is successful
          this.dialogRef.close();
          console.log(result);
          // Displaying a success message for 2 seconds using the MatSnackBar service
          this.snackBar.open(result, 'OK', { duration: 2000 });
        },
        (error: { error: { message: string } }) => {
          // Handling error cases by displaying the error message (or a default message if none is provided) using the MatSnackBar service
          const errorMessage = error.error.message || 'Unknown error occurred!';
          this.snackBar.open(errorMessage, 'OK', { duration: 2000 });
        }
      );
  }
}
