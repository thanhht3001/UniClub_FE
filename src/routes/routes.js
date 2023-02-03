import Dashboard from 'views/pages/dashboards/Dashboard.js';
import CreateClubActivity from 'views/pages/CreateClubActivity/CreateClubActivity';
import ShowCompetition from 'views/pages/ShowCompetitionPage/CompetitionPage.jsx';
import CreateCompetionPage from 'views/pages/CreateCompetitionPage';
import MemberPage from 'views/pages/MemberPage';
import ActivityPage from 'views/pages/ActivityPage';
import CreateEventPage from 'views/pages/CreateEventPage';

const routes = [
  {
    collapse: true,
    name: 'Câu lạc bộ',
    icon: 'ni ni-briefcase-24 text-primary',
    state: 'dashboardsCollapse',
    views: [
      {
        path: '/thong-tin-clb',
        name: 'Thông tin câu lạc bộ',
        miniName: 'C',
        component: Dashboard,
        layout: '/admin',
      },
      {
        path: '/hoat-dong',
        name: 'Hoạt động',
        miniName: 'HĐ',
        component: ActivityPage,
        layout: '/admin',
      },
      {
        path: '/tao-hoat-dong',
        name: 'Tạo Hoạt động',
        miniName: 'THĐ',
        component: CreateClubActivity,
        layout: '/admin',
      },
      {
        path: '/thanh-vien',
        name: 'Thành viên',
        miniName: 'TV',
        component: MemberPage,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Cuộc thi và sự kiện',
    icon: 'ni ni-trophy text-orange',
    state: 'examplesCollapse',
    views: [
      {
        path: '/cuoc-thi',
        name: 'Danh sách',
        miniName: 'CT',
        component: ShowCompetition,
        layout: '/admin',
      },
      {
        path: '/tao-cuoc-thi',
        name: 'Tạo cuộc thi',
        miniName: 'TCT',
        component: CreateCompetionPage,
        layout: '/admin',
      },
      {
        path: '/tao-su-kien',
        name: 'Tạo sự kiện',
        miniName: 'TS',
        component: CreateEventPage,
        layout: '/admin',
      },
    ],
  },
];

export default routes;
