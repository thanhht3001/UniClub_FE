import AdminFooter from 'components/Footers/AdminFooter';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { Modal } from 'reactstrap';
import routes from 'routes/routes.js';
import { getDataByPath } from 'services/data.service';
import Loading from '../components/Loading';
import ShowListTeamBody from './components/ShowListTeamBody';
import ShowListTeamHeader from './components/ShowListTeamHeader';
import TeamDetailModal from './components/TeamDetailModal';

export default function ShowListTeamPage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [teamList, setTeamList] = useState(null);
  const [teamDetail, setTeamDetail] = useState(null);
  const [teamDetailModal, setTeamDetailModal] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [memberList, setMemberList] = useState(null);
  const mainContentRef = React.useRef(null);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  //toggles collapse between mini sidenav and normal
  const toggleSidenav = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf('admin/alternative-dashboard') === -1 ? 'dark' : 'light';
  };

  async function loadTeamList(currentPage) {
    if (currentPage && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams/all`;
      const data = `competitionId=${props.match.params.id}&currentPage${currentPage}&pageSize=10`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) {
          setTeamList(res.data);
        } else {
          setTeamList([]);
        }
      }
    }
  }

  async function loadMemberList(currentPage) {
    if (currentPage && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = `api/v1/participants/list-participant`;
      const data = `competitionId=${props.match.params.id}&currentPage${currentPage}&pageSize=10&clubId=${clubId}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'member');
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) {
          setMemberList(res.data);
        } else {
          setMemberList([]);
        }
      }
    }
  }

  async function loadTeamDetail(id) {
    setLoadingForm(true);
    setTeamDetail(null);
    if (id && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams/detail`;
      const data = `teamId=${id}&competitionId=${props.match.params.id}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setTeamDetail(res.data);
        setTeamDetailModal(true);
      }
    }
    setLoadingForm(false);
  }

  useEffect(() => {
    if (teamList === null) {
      loadTeamList(1);
      console.log(props);
    }
    if (memberList === null) {
      loadMemberList(1);
    }
  }, []);

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: '/',
          imgSrc: require('assets/img/brand/Logo text ngang.png').default,
          imgAlt: '...',
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar theme={getNavbarTheme()} toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} brandText={getBrandText(location.pathname)} />
        <ShowListTeamHeader {...props} />
        {teamList ? (
          <>
            <ShowListTeamBody
              teamList={teamList}
              loadTeamList={loadTeamList}
              setTeamDetailModal={setTeamDetailModal}
              loadTeamDetail={loadTeamDetail}
              memberList={memberList}
              loadMemberList={loadMemberList}
              isEvent={props.location.state.isEvent}
            />
            <Modal className="modal-dialog-centered" size="lg" isOpen={teamDetailModal} toggle={() => setTeamDetailModal(false)}>
              <div className="modal-body p-0">
                <TeamDetailModal setTeamDetailModal={setTeamDetailModal} teamDetail={teamDetail} />
              </div>
            </Modal>
          </>
        ) : (
          <></>
        )}
        <AdminFooter />
        <Modal className="modal-dialog-centered" size="sm" isOpen={loadingForm}>
          <div className="modal-body p-0 bg-transparent">
            <Loading style={{ margin: 'auto' }} />
          </div>
        </Modal>
      </div>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
