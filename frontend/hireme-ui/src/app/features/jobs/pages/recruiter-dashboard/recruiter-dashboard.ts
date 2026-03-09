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
import { RecruiterJobForm } from '../../components/recruiter-job-form/recruiter-job-form';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    RecruiterJobForm,
    MatIcon,
  ],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.scss',
})
export class RecruiterDashboard implements OnInit {
  viewState$!: Observable<ViewState<RecruiterJob[]>>;

  private readonly jobService = inject(JobService);
  private readonly applicationService = inject(ApplicationService);

  isCreatingJob = false;
  editingJob: Job | null = null;

  openCreateForm() {
    this.editingJob = null;
    this.isCreatingJob = true;
    console.log('Opening create form');
  }
  
  openEditForm(job: RecruiterJob) {
    console.log(" in openedit form ")
    // const currentJob = this.jobService.getRecruiterJobById(job.id)
    // currentJob.subscribe(job => console.log("job from subscribe: ", job))
    // currentJob.pipe(map(j => console.log("job from service: ", j)))
    this.jobService.getRecruiterJobById(job.id).subscribe((fullJob) => {
      console.log('Fetched job for editing:', fullJob);
      if (!fullJob) {
        console.log('Job not found, cannot open edit form');
        return;
      }
      console.log('Opening edit form');

      this.editingJob = fullJob;
      this.isCreatingJob = true;
    });
  }

  closeForm() {
    this.isCreatingJob = false;
    this.editingJob = null;
  }

  submitJob(jobData: Partial<Job>) {
    const request$ = this.editingJob
      ? this.jobService.updateJob(this.editingJob.id!, jobData)
      : this.jobService.createJob(jobData);

    request$.subscribe(() => {
      this.closeForm();
      this.ngOnInit(); // reload jobs
    });
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.viewState$ = combineLatest([
      this.jobService.getRecruiterJobs(),
      this.applicationService.applications$,
    ]).pipe(
      map(([jobs, applications]) => {
        console.log('Jobs:', jobs);
        console.log('Applications:', applications);
        const recruiterJobs = jobs.map((job) => ({
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
