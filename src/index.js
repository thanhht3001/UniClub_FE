import React from 'react';
import ReactDOM from 'react-dom';
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// plugins styles from node_modules
import 'react-notification-alert/dist/animate.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'select2/dist/css/select2.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// plugins styles downloaded
import 'assets/vendor/nucleo/css/nucleo.css';
// core styles
import 'assets/scss/argon-dashboard-pro-react.scss?v1.2.0';

import AdminLayout from 'layouts/Admin.js';
import UniversityLayout from 'layouts/University';
import Homepage from 'views/pages/homepage/index';
import AuthContextProvider from 'contexts/AuthContext';
import LoginPage from 'views/pages/LoginPage/LoginPage';
import CompetitionDetailPage from 'views/pages/CompetitionDetailPage';
import ShowListTeamPage from 'views/pages/ShowListTeamPage';
import ActivityDetailPage from 'views/pages/ActivityDetailPage';
import CompetitionRoundPage from 'views/pages/CompetitionRoundPage';
import SettingPage from 'views/pages/SettingPage';
import CompetitionPublic from 'views/pages/CompetitionPublicPage';
import NotfoundPage from 'views/pages/NotfoundPage';
import CompetitionUpdatePage from 'views/pages/CompetitionUpdatePage';
import CompetitionMorePage from 'views/pages/CompetitionMorePage';
import CompetitionPublicDetailPage from 'views/pages/CompetitionPublicDetailPage';
import UniversityCompetitionDetailPage from 'views/pages/UniversityCompetitionDetailPage';
import ActivityMorePage from 'views/pages/ActivityMorePage';
import ClubSettingPage from 'views/pages/ClubSettingPage';
import SystemLayout from 'layouts/System';

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/admin/cuoc-thi/chi-tiet/quan-ly-nhom/:id" render={(props) => <ShowListTeamPage {...props} />} />
        <Route path="/admin/cuoc-thi/chi-tiet/vong-thi/:id" render={(props) => <CompetitionRoundPage {...props} />} />
        <Route path="/admin/cuoc-thi/chi-tiet/chinh-sua/:id" render={(props) => <CompetitionUpdatePage {...props} />} />
        <Route path="/admin/cuoc-thi/chi-tiet/:id" render={(props) => <CompetitionDetailPage {...props} />} />
        <Route path="/admin/cuoc-thi/danh-sach/:status" render={(props) => <CompetitionMorePage {...props} />} />
        <Route path="/admin/hoat-dong/danh-sach/:status" render={(props) => <ActivityMorePage {...props} />} />
        <Route path="/admin/hoat-dong/chi-tiet/:id" render={(props) => <ActivityDetailPage {...props} />} />
        <Route exact path="/admin/tuy-chinh" render={(props) => <SettingPage {...props} />} />
        <Route exact path="/admin/tuy-chinh-clb" render={(props) => <ClubSettingPage {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/university/xet-duyet/chi-tiet/:id" render={(props) => <UniversityCompetitionDetailPage {...props} />} />
        <Route path="/university" render={(props) => <UniversityLayout {...props} />} />
        <Route path="/system" render={(props) => <SystemLayout {...props} />} />
        <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
        <Route exact path="/cuoc-thi-va-su-kien/chi-tiet/:id" render={(props) => <CompetitionPublicDetailPage {...props} />} />
        <Route exact path="/cuoc-thi-va-su-kien" render={(props) => <CompetitionPublic {...props} />} />
        <Route path="/404-not-found" render={(props) => <NotfoundPage {...props} />} />
        <Route exact path="/" render={(props) => <Homepage {...props} />} />
        <Redirect from="*" to="/404-not-found" />
      </Switch>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
