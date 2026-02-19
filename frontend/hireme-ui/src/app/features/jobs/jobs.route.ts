import { Routes } from '@angular/router';
import { JobList } from './pages/job-list/job-list';
import { JobDetails } from './pages/job-details/job-details';
import { AuthGuard } from '../auth/guards/auth-guard';

export const JOBS_ROUTES: Routes = [
  {
    path: '',
    component: JobList,
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: JobDetails
  },
];
