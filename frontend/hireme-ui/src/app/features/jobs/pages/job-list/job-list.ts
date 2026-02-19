import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, map, of, startWith } from 'rxjs';

import { JobCard } from '../../components/job-card/job-card';
import { JobService } from '../../services/job-service';
import { ViewState } from '../../models/view-state';
import { Job } from '../../models/job';
import { JobFilters } from '../../models/job-filters';
import { AuthService } from '../../../auth/services/auth-service';

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
applyFilters($event: JobFilters) {
throw new Error('Method not implemented.');
}
openSearchPanel() {
throw new Error('Method not implemented.');
}
clearAppliedFilters() {
throw new Error('Method not implemented.');
}
  private jobService = inject(JobService);

  viewState$ = this.jobService.getJobs().pipe(
    map((jobs: Job[]) => {
      if (!jobs || jobs.length === 0) {
        return { status: 'empty' } as ViewState<Job[]>;
      }

      return { status: 'success', data: jobs } as ViewState<Job[]>;
    }),
    startWith({ status: 'loading' } as ViewState<Job[]>),
    catchError(() =>
      of({ status: 'error', message: 'Failed to load jobs' } as ViewState<Job[]>)
    )
  );

}
