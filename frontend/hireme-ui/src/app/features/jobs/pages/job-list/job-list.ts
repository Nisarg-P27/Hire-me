import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, combineLatest, map, Observable, of, startWith } from 'rxjs';

import { JobCard } from '../../components/job-card/job-card';
import { JobService } from '../../services/job-service';
import { ViewState } from '../../models/view-state';
import { Job } from '../../models/job';
import { JobFilters } from '../../models/job-filters';
import { AuthService } from '../../../auth/services/auth-service';
import { ApplicationService } from '../../../applications/services/application-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '../../../auth/models/user-role';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    JobCard,
  ],
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.scss'],
})
export class JobList {
  private readonly authService = inject(AuthService);
  private readonly jobService = inject(JobService);
  private readonly applicationService = inject(ApplicationService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  canApply: boolean = true;

  viewState$ = this.jobService.getJobs().pipe(
    map((jobs: Job[]) => {
      if (!jobs || jobs.length === 0) {
        return { status: 'empty' } as ViewState<Job[]>;
      }

      return { status: 'success', data: jobs } as ViewState<Job[]>;
    }),
    startWith({ status: 'loading' } as ViewState<Job[]>),
    catchError(() => of({ status: 'error', message: 'Failed to load jobs' } as ViewState<Job[]>)),
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
    console.log('in onApply method of JobList component with job:', job.title);
    const user = this.authService.currentUser;

    if (!user) {
      console.warn('User not authenticated. Redirecting to login.');
      this.router.navigate(['auth/login']);
      return;
    }

    this.applicationService.apply(job.id, user).subscribe(() => {
      console.log('Application submitted successfully for job:', job.title);
      this.snackBar.open('Application submitted!', 'Close', { duration: 3000 });
    });
  }

  applyFilters(_: JobFilters) {}
  openSearchPanel() {}
  clearAppliedFilters() {}
  ngOnInit() {
    const user = this.authService.currentUser;
    if (!user) {
      this.canApply = true;
    } else {
      this.canApply = user?.role === UserRole.Candidate;
    }
  }
}
