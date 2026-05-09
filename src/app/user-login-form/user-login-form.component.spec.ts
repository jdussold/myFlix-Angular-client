import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { UserLoginFormComponent } from './user-login-form.component';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginFormComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
