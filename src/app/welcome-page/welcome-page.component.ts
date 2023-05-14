import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * Welcome Page Component
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isDialogOpen: boolean = false;

  /**
   * Constructor
   * @param dialog - The MatDialog instance
   * @param router - The Router instance
   */
  constructor(public dialog: MatDialog, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of the component are initialized
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.router.navigate(['movies']);
    }
  }

  /**
   * Opens the user registration dialog
   */
  openUserRegistrationDialog(): void {
    this.isDialogOpen = true;
    this.dialog
      .open(UserRegistrationFormComponent, {
        width: '280px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isDialogOpen = false;
      });
  }

  /**
   * Opens the user login dialog
   */
  openUserLoginDialog(): void {
    this.isDialogOpen = true;
    this.dialog
      .open(UserLoginFormComponent, {
        width: '280px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isDialogOpen = false;
      });
  }
}
