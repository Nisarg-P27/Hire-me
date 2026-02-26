import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Application } from '../../models/application';

@Component({
  selector: 'app-recruiter-applications-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './recruiter-applications-dialog.html',
  styleUrl: './recruiter-applications-dialog.scss'
})
export class RecruiterApplicationsDialog {

  private readonly dialogRef = inject(MatDialogRef<RecruiterApplicationsDialog>);
  readonly application = inject<{ application: Application }>(MAT_DIALOG_DATA).application;

  close(): void {
    this.dialogRef.close();
  }
}