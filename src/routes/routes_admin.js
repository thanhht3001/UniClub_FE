import UniversityClubManager from 'views/pages/UniversityClubManager';
import UniversityCompetition from 'views/pages/UniversityCompetition';
import UniversityDepartmentManager from 'views/pages/UniversityDepartmentPage';
const routes = [
  {
    collapse: true,
    name: 'Trường',
    icon: 'ni ni-briefcase-24 text-primary',
    state: 'dashboardsCollapse',
    views: [
      {
        path: '/quan-ly-clb',
        name: 'Quản lý câu lạc bộ',
        miniName: 'CLB',
        component: UniversityClubManager,
        layout: '/university',
      },
      {
        path: '/quan-ly-chuyen-nganh',
        name: 'Quản lý chuyên ngành',
        miniName: 'CN',
        component: UniversityDepartmentManager,
        layout: '/university',
      },
    ],
  },
  {
    collapse: true,
    name: 'Cuộc thi và sự kiên',
    icon: 'ni ni-world-2 text-warning',
    state: 'competitionCollapse',
    views: [
      {
        path: '/xet-duyet',
        name: 'Xét duyệt',
        miniName: 'XD',
        component: UniversityCompetition,
        layout: '/university',
      },
    ],
  },
];

export default routes;
