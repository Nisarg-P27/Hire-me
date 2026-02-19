import { NavItem } from '../models/nav-item';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Jobs',
    icon: 'work',
    route: '/jobs'
  },
  {
    label: 'Login',
    icon: 'login',
    route: '/auth/login'
  },
  {
    label: 'About',
    icon: 'info',
    route: '/about'
  }
];
