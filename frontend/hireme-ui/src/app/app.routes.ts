import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { RecruiterDashboard } from './features/jobs/pages/recruiter-dashboard/recruiter-dashboard';
import { JobApplications } from './features/jobs/pages/job-applications/job-applications';
import path from 'path';
import { CandidateProfilePage } from './features/profile/pages/candidate-profile-page/candidate-profile-page';
import { AuthGuard } from './features/auth/guards/auth-guard';
import { RoleGuard } from './features/auth/guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full',
      },

      // Jobs feature
      {
        path: 'jobs',
        loadChildren: () => import('./features/jobs/jobs.route').then((m) => m.JOBS_ROUTES),
      },
      // Authentication feature
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.route').then((m) => m.AUTH_ROUTES),
      },

      {
        path: 'recruiter/dashboard',
        canActivate: [AuthGuard, RoleGuard],
        component: RecruiterDashboard,
      },
      {
        path: 'recruiter/jobs/:id/applications',
        canActivate: [AuthGuard, RoleGuard],
        component: JobApplications
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: CandidateProfilePage
      }
      
    ],
  },

  // fallback route
  {
    path: '**',
    redirectTo: 'jobs',
  },
];
