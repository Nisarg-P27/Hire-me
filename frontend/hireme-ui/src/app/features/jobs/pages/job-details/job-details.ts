import { Component, inject } from '@angular/core';
import { Job } from '../../models/job';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job-service';
import { JobDetailsView } from '../../components/job-details-view/job-details-view';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { ApplicationService } from '../../../applications/services/application-service';
import { AuthService } from '../../../auth/services/auth-service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '../../../auth/models/user-role';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [JobDetailsView, CommonModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);
  private readonly authService = inject(AuthService);
  private readonly applicationService = inject(ApplicationService);
  private readonly snackBar = inject(MatSnackBar);
  canApply: boolean = true;

  readonly job$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = String(params.get('id'));
      return this.jobService.getJobById(id);
    }),
  );

  appliedJobIds$: Observable<Set<string>> = combineLatest([
    this.applicationService.applications$,
    this.authService.currentUser$,
  ]).pipe(
    map(
      ([applications, user]) =>
        new Set(applications.filter((app) => app.candidateId === user?.id).map((app) => app.jobId)),
    ),
  );
  onApply(job: Job): void {
    const user = this.authService.currentUser;

    if (!user) {
      this.router.navigate(['auth/login']);
      return;
    }

    this.applicationService.apply(job.id, user).subscribe(() => {
      console.log('Application submitted successfully for job in details:', job.title);
      this.snackBar.open('Application submitted!', 'Close', { duration: 3000 });
    });
  }
    ngOnInit() {
      const user = this.authService.currentUser;
      if (!user) {
        this.canApply = true;
      } else {
        this.canApply = user?.role === UserRole.Candidate;
      }
    }
}
