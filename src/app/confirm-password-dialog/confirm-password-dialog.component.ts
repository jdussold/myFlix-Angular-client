/**
 * Confirm Password Dialog Component
 *
 * This component displays a dialog for confirming password and account deletion.
 */
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrls: ['./confirm-password-dialog.component.scss'],
})
export class ConfirmPasswordDialogComponent {
  /** Indicates whether the delete account option is clicked */
  @Input() deleteClicked = false;
  /** The user's password */
  password = '';
  /** Error message for password verification */
  passwordError = '';

  /**
   * Creates an instance of ConfirmPasswordDialogComponent.
   * @param dialogRef - Reference to the dialog opened by this component
   * @param fetchApiData - Service for fetching API data
   * @param data - Data passed to the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmPasswordDialogComponent>,
    private fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deleteClicked = data.deleteClicked;
  }

  /**
   * Verifies the user's password by making an API call.
   * If the password is correct, the dialog is closed with the password.
   * Otherwise, an error message is displayed.
   */
  verifyPassword(): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    this.fetchApiData
      .verifyPassword(username, this.password)
      .pipe(
        catchError((error) => {
          console.error('Error verifying password:', error);
          this.passwordError = 'Password is incorrect.';
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: () => {
          this.dialogRef.close(this.password);
        },
        complete: () => {},
        error: (error) => {},
      });
  }
}
