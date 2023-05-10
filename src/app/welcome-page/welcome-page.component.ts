import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isDialogOpen: boolean = false; // add a boolean to keep track of whether a dialog is open

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.router.navigate(['movies']);
    }
  }

  openUserRegistrationDialog(): void {
    this.isDialogOpen = true; // set isDialogOpen to true when a dialog is opened
    this.dialog
      .open(UserRegistrationFormComponent, {
        width: '280px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isDialogOpen = false; // set isDialogOpen to false when the dialog is closed
      });
  }

  openUserLoginDialog(): void {
    this.isDialogOpen = true; // set isDialogOpen to true when a dialog is opened
    this.dialog
      .open(UserLoginFormComponent, {
        width: '280px',
      })
      .afterClosed()
      .subscribe(() => {
        this.isDialogOpen = false; // set isDialogOpen to false when the dialog is closed
      });
  }
}