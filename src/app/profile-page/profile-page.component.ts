import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPasswordDialogComponent } from '../confirm-password-dialog/confirm-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profileForm!: FormGroup;
  favoriteMovies: any[] = [];
  editingProfile = false;
  usernameInvalid = false;
  editingPassword = false;
  deleteClicked = false;
  maskedPassword = '•'.repeat(8);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      Username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
      ],
      Password: ['', Validators.minLength(5)],
      Email: ['', Validators.email],
      Birthday: [null],
    });

    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.profileForm.patchValue({
        Username: user.Username,
        Password: '********', // set the masked password
        Email: user.Email,
        Birthday: user.Birthday,
      });

      // Set the masked password
      this.maskedPassword = '•'.repeat(8);

      // Pass the username to the getFavoriteMovies() method
      this.fetchApiData.getFavoriteMovies(user.Username).subscribe({
        next: (movies) => {
          this.favoriteMovies = movies;
          console.log('Favorite Movies:', this.favoriteMovies);

          // Sort the favoriteMovies array alphabetically
          this.favoriteMovies.sort((a, b) => a.Title.localeCompare(b.Title));

          // Set the isFavorite property of each movie based on whether it's in the user's list of favorite movies
          for (let i = 0; i < this.favoriteMovies.length; i++) {
            const movie = this.favoriteMovies[i];
            movie.isFavorite = true;
          }
        },
      });
    }
  }

  onUsernameChange(): void {
    const usernameControl = this.profileForm.get('Username');
    if (usernameControl) {
      this.usernameInvalid =
        usernameControl.invalid &&
        (usernameControl.dirty || usernameControl.touched);
    }
  }

  togglePasswordEditing(): void {
    this.editingPassword = !this.editingPassword;
    if (this.editingPassword) {
      this.profileForm.patchValue({ Password: '' });
    } else {
      this.profileForm.patchValue({ Password: '********' });
    }
  }

  onSubmit(): void {
    if (this.editingProfile) {
      // Send a blank string for the password if the user hasn't edited the password
      if (!this.editingPassword) {
        this.profileForm.patchValue({ Password: '' });
      }
      this.openConfirmPasswordDialog('edit');
    }
  }

  onDelete(): void {
    this.deleteClicked = true; // Set the deleteClicked property to true
    this.openConfirmPasswordDialog('delete');
  }

  verifyAndUpdateUser(password: string, action: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    this.fetchApiData.verifyPassword(username, password).subscribe({
      next: () => {
        if (action === 'edit') {
          this.fetchApiData.editUser(this.profileForm.value).subscribe({
            next: (response) => {
              console.log(response);
              this.editingProfile = false;

              // update local storage with new user information
              const userJson = localStorage.getItem('user');
              if (userJson) {
                const user = JSON.parse(userJson);
                user.Username = this.profileForm.value.Username;
                user.Email = this.profileForm.value.Email;
                user.Birthday = this.profileForm.value.Birthday;
                localStorage.setItem('user', JSON.stringify(user));
              }
              this.openSnackBar('Profile updated successfully!', 'OK');
            },
          });
        } else if (action === 'delete') {
          this.fetchApiData.deleteUser().subscribe({
            next: () => {
              localStorage.clear();
              this.router.navigate(['/welcome']);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error verifying password:', error);
        this.openSnackBar(
          'Password verification failed. Please try again.',
          'OK'
        );
      },
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  toggleFavorite(movie: any): void {
    this.sharedService.toggleFavorite(movie);
    if (!movie.isFavorite) {
      // Remove the movie card from the favoriteMovies array
      this.favoriteMovies = this.favoriteMovies.filter(
        (favMovie) => favMovie._id !== movie._id
      );
    }
  }

  openDialog(movie: any, type: string): void {
    this.sharedService.openDialog(movie, type, movie.BackdropImage);
  }

  openConfirmPasswordDialog(action: string): void {
    const dialogRef = this.dialog.open(ConfirmPasswordDialogComponent, {
      width: '350px',
      data: { deleteClicked: this.deleteClicked },
    });

    dialogRef.afterClosed().subscribe((password) => {
      if (password) {
        this.verifyAndUpdateUser(password, action);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
