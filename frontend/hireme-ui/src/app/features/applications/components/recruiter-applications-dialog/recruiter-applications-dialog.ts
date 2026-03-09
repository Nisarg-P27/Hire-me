import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Application } from '../../models/application';
import { ApplicationStatus } from '../../models/application-status';
import { ApplicationService } from '../../services/application-service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

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
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './recruiter-applications-dialog.html',
  styleUrl: './recruiter-applications-dialog.scss',
})
export class RecruiterApplicationsDialog {
  private readonly dialogRef = inject(MatDialogRef<RecruiterApplicationsDialog>);
  application = inject<{ application: Application }>(MAT_DIALOG_DATA).application;
  private readonly applicationService = inject(ApplicationService);
  private readonly dialog = inject(MatDialog);

  readonly statuses = Object.values(ApplicationStatus);

  onStatusChange(newStatus: ApplicationStatus): void {
    if (newStatus === this.application.status) return;
    if (newStatus === ApplicationStatus.Accepted || newStatus === ApplicationStatus.Rejected) {
      const confirmRef = this.dialog.open(ConfirmDialog, {
        data: {
          title: 'Confirm Status Change',
          message: `Are you sure you want to mark this application as ${status}?`,
        },
      });

      confirmRef.afterClosed().subscribe((confirmed) => {
        if (!confirmed) return;
        this.updateStatus(newStatus);
      });
    } else {
      this.updateStatus(newStatus);
    }
  }
  updateStatus(status: ApplicationStatus): void {
    this.applicationService.updateApplicationStatus(this.application.id, status);
    this.application = { ...this.application, status };
  }
  close(): void {
    this.dialogRef.close();
  }
}
