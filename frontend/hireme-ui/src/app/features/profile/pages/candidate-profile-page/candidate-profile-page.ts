import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { switchMap, map } from 'rxjs';
import { User } from '../../../auth/models/user';
import { AuthService } from '../../../auth/services/auth-service';
import { ViewState } from '../../../jobs/models/view-state';
import { CandidateProfile } from '../../models/candidate_profile';
import { CandidateProfileService } from '../../services/candidate-profile-service';
import { CandidateProfileForm } from '../../components/candidate-profile-form/candidate-profile-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface ProfilePageData {
  user: User;
  profile: CandidateProfile;
}

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    CandidateProfileForm,
    MatProgressSpinnerModule,
  ],
  templateUrl: './candidate-profile-page.html',
  styleUrl: './candidate-profile-page.scss',
})
export class CandidateProfilePage {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(CandidateProfileService);
  private readonly dialog = inject(MatDialog);

  readonly editMode = signal(false);

  readonly profileState$ = this.authService.currentUser$.pipe(
    switchMap((user) => {
      if (!user) {
        return [
          {
            status: 'error',
            message: 'User not authenticated',
          } as ViewState<ProfilePageData>,
        ];
      }

      return this.profileService.getProfile(user.id).pipe(
        map(
          (profile) =>
            ({
              status: 'success',
              data: { user, profile },
            }) as ViewState<ProfilePageData>,
        ),
      );
    }),
  );
  enableEdit(): void {
    this.editMode.set(true);
  }

  disableEdit(): void {
    this.editMode.set(false);
  }
  onSave(profile: CandidateProfile): void {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.profileService.updateProfile(profile);
        this.editMode.set(false);
      }
    });
  }

  onCancel(): void {
    this.editMode.set(false);
  }
}
