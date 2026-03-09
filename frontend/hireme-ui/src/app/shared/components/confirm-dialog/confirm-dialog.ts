import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
private dialogRef = inject(MatDialogRef<ConfirmDialog>);
readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);


  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}

