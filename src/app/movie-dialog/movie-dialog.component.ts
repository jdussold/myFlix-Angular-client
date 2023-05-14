import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Movie Dialog Component
 */
@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  /**
   * Constructor
   * @param dialogRef - The MatDialogRef instance
   * @param data - The injected data
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Handles the click event when the close button is clicked
   */
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
