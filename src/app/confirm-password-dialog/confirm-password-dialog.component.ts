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
  @Input() deleteClicked = false;
  password = '';
  passwordError = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmPasswordDialogComponent>,
    private fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deleteClicked = data.deleteClicked;
  }

  // Function to verify the user's password
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
