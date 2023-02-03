import SystemMajorManager from 'views/pages/SystemMajorPage';
import SystemUniversityManager from 'views/pages/SystemUniversityPage';
import SystemUserManager from 'views/pages/SystemUserManager';
const routes = [
  {
    collapse: true,
    name: 'Quản lý',
    icon: 'ni ni-briefcase-24 text-primary',
    state: 'dashboardsCollapse',
    views: [
      {
        path: '/nguoi-dung',
        name: 'Quản lý người dùng',
        miniName: 'ND',
        component: SystemUserManager,
        layout: '/system',
      },
      {
        path: '/quan-ly-khoi-nganh',
        name: 'Quản lý khối ngành',
        miniName: 'KN',
        component: SystemMajorManager,
        layout: '/system',
      },
      {
        path: '/quan-ly-truong',
        name: 'Quản lý trường',
        miniName: 'T',
        component: SystemUniversityManager,
        layout: '/system',
      },
    ],
  },
];

export default routes;
