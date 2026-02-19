import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { JOBS_ROUTES } from './features/jobs/jobs.route';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout, // persistent layout (navbar/sidebar)
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
    ],
  },

  // fallback route
  {
    path: '**',
    redirectTo: '',
  },
];
