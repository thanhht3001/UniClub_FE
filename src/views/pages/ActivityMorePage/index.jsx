import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service.js';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import AdminFooter from 'components/Footers/AdminFooter';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes/routes.js';
import { Col, Row } from 'reactstrap';
import { warningAlertConstants } from 'constants/alert.constants.js';
import { useHistory } from 'react-router';
import ActivityMoreHeader from './components/ActivityMoreHeader';
import ActivityMoreBody from './components/ActivityMoreBody';

function ActivityMorePage(props) {
  const [alert, setalert] = React.useState(false);
  const [clubData, setClubData] = useState(null);
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [competitionList, setCompetitionList] = useState(null);
  const mainContentRef = React.useRef(null);
  const history = useHistory();

  async function loadDataClubs(accessToken, studentID) {
    if (accessToken !== null) {
      const path = `api/v1/clubs/user/${studentID}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      if (res && res.status === 200) {
        setClubData(res.data[0]);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const checkCase = () => {
    switch (props.match.params.status) {
      case 'da-duyet':
        return 3;
      case 'cong-bo':
        return 4;
      case 'dien-ra':
        return 5;
      case 'hoan-thanh':
        return 6;
      default:
        history.push('/404-not-found');
    }
  };

  async function loadDataListCompetition(currentPage, cases, search) {
    let statusString = '';
    switch (cases) {
      case 3:
        statusString = '&statuses=8';
        break;
      case 4:
        statusString = '&statuses=0&statuses=1&statuses=5';
        break;
      case 5:
        statusString = '&statuses=2&statuses=3&statuses=4&statuses=10';
        break;
      case 6:
        statusString = '&statuses=11';
        break;
    }
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competitions';
      const data = `clubId=${clubId}&name=${search}&pageSize=20&currentPage=${currentPage}${statusString}`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && (res.status === 200 || res.status === 204)) {
        setCompetitionList(res.data);
      }
    }
  }

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

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

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const studentID = localStorage.getItem('studentID');
      if (clubData === null) {
        loadDataClubs(accessToken, studentID);
      }
      if (competitionList === null) {
        loadDataListCompetition(1, checkCase(), '');
      }
    }
    console.log(props);
  }, []);

  return (
    <>
      {alert}
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
        {clubData && competitionList ? (
          <>
            <ActivityMoreHeader clubData={clubData} />
            <ActivityMoreBody competitionList={competitionList} loadDataListCompetition={loadDataListCompetition} checkCase={checkCase} />
          </>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto' }} />
            </Col>
          </Row>
        )}
        <AdminFooter />
      </div>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}

export default ActivityMorePage;
