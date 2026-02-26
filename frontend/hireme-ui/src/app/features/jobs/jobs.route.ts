import { Routes } from '@angular/router';
import { JobList } from './pages/job-list/job-list';
import { JobDetails } from './pages/job-details/job-details';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RoleGuard } from '../auth/guards/role-guard';
import { RecruiterDashboard } from './pages/recruiter-dashboard/recruiter-dashboard';

export const JOBS_ROUTES: Routes = [
  {
    path: '',
    component: JobList,
  },
  {
    path: ':id',
    component: JobDetails,
  },

];
