import { Component, inject, OnInit } from '@angular/core';
import { Observable, catchError, combineLatest, map, of, startWith } from 'rxjs';
import { ApplicationService } from '../../../applications/services/application-service';
import { AuthService } from '../../../auth/services/auth-service';
import { Job } from '../../models/job';
import { JobService } from '../../services/job-service';
import { ViewState } from '../../models/view-state';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { RecruiterJob } from '../../models/recruiter-job';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.scss',
})
export class RecruiterDashboard implements OnInit {
  viewState$!: Observable<ViewState<RecruiterJob[]>>;

  private readonly  jobService = inject(JobService);
  private readonly applicationService = inject(ApplicationService);
  private readonly authService = inject(AuthService);


  ngOnInit(): void {
    const recruiter = this.authService.currentUser;

    this.viewState$ = combineLatest([
      this.jobService.getJobs(),
      this.applicationService.applications$,
    ]).pipe(
      map(([jobs, applications]) => {
        const recruiterJobs = jobs
          .filter((job) => job.recruiterId === recruiter?.id)
          .map((job) => ({
            ...job,
            applicationCount: applications.filter((app) => app.jobId === job.id).length,
          }));

        if (recruiterJobs.length === 0) {
          return { status: 'empty' } as ViewState<RecruiterJob[]>;
        }

        return {
          status: 'success',
          data: recruiterJobs,
        } as ViewState<RecruiterJob[]>;
      }),
      startWith({ status: 'loading' } as ViewState<RecruiterJob[]>),
      catchError(() =>
        of({ status: 'error', message: 'Failed to load dashboard.' } as ViewState<RecruiterJob[]>),
      ),
    );
  }
}
