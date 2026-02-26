import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap, startWith, catchError, of } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { JobService } from '../../../jobs/services/job-service';
import { ApplicationService } from '../../../applications/services/application-service';
import { ViewState } from '../../models/view-state';
import { Application } from '../../../applications/models/application';
import { Job } from '../../models/job';
import { RecruiterApplicationsDialog } from '../../../applications/components/recruiter-applications-dialog/recruiter-applications-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';


type JobApplicationsData = {
  job: Job;
  applications: Application[];
};


@Component({
  standalone: true,
  selector: 'app-job-applications',
  templateUrl: './job-applications.html',
  styleUrls: ['./job-applications.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ]
})
export class JobApplications {

  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobService);
  private readonly applicationService = inject(ApplicationService);

  viewState$ = this.route.paramMap.pipe(
    map(params => {const id = params.get('id');
      console.log('Extracted jobId from route:', id);
      return id!;
    }),
    switchMap(jobId =>
      combineLatest([
        this.jobService.getJobById(jobId),
        this.applicationService.applications$
      ]).pipe(
        map(([job, applications]): ViewState<JobApplicationsData> => {
          console.log(job,applications)
          if (!job) {
            return { status: 'error', message: 'Job not found' };
          }

          const jobApplications = applications.filter(
            app => app.jobId === jobId
          );

          if (jobApplications.length === 0) {
            return { status: 'success',  data: { job, applications: [] } };
          }
          console.log('Found applications for job:', jobApplications[0]);
          return {
            status: 'success',
            data: { job, applications: jobApplications }
          };
        }),
        startWith({ status: 'loading' } as ViewState<JobApplicationsData>),
        catchError(() =>
          of({ status: 'error', message: 'Failed to load applications' } as ViewState<JobApplicationsData>)
        )
      )
    )
  );
  openApplication(application: Application): void {
  this.dialog.open(RecruiterApplicationsDialog, {
    width: '1000px',
    maxWidth: '95vw',
    height: '85vh',
    data: { application }
  });
}
}