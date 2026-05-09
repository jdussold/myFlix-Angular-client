import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmPasswordDialogComponent } from './confirm-password-dialog.component';

describe('ConfirmPasswordDialogComponent', () => {
  let component: ConfirmPasswordDialogComponent;
  let fixture: ComponentFixture<ConfirmPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPasswordDialogComponent],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { deleteClicked: false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
