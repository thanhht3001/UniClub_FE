import SimpleHeader from 'components/Headers/SimpleHeader';
import React, { useEffect, useState } from 'react';
import AdminFooter from 'components/Footers/AdminFooter';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { useLocation } from 'react-router';
import routes from 'routes/routes.js';
import CompetitionUpdateBody from './components/CompetitionUpdateBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';
import { warningAlertConstants } from 'constants/alert.constants';
import { Col, Row } from 'reactstrap';

export default function CompetitionUpdatePage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [alert, setalert] = React.useState(false);
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  const [competitionDetail, setCompetitionDetail] = useState(null);
  const [banner, setBanner] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [influencer, setInfluencer] = useState([]);

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

  const convertCompetitionEntities = (array) => {
    const banner = [];
    const sponsor = [];
    const influencer = [];
    array?.competition_entities?.forEach((e) => {
      switch (e.entity_type_id) {
        case 1:
          banner.push({ image_url: e.image_url });
          break;
        case 2:
          influencer.push({ name: e.name, image_url: e.image_url });
          break;
        case 3:
          sponsor.push({ name: e.name, image_url: e.image_url, email: e.email, website: e.website, description: e.description });
          break;
      }
    });
    setBanner(banner);
    setSponsor(sponsor);
    setInfluencer(influencer);
    setCompetitionDetail(array);
  };

  async function loadDataCompetitionDetail(accessToken, competition_id) {
    if (accessToken) {
      const path = `api/v1/competitions/${competition_id}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        convertCompetitionEntities(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
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

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      if (competitionDetail === null) {
        loadDataCompetitionDetail(accessToken, props.match.params.id);
      }
    }
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
        {competitionDetail ? (
          <>
            <SimpleHeader
              name={competitionDetail.number_of_team === 0 ? 'Chỉnh sửa sự kiện' : 'Chỉnh sửa cuộc thi'}
              parentName="Cuộc thi và sự kiện"
              linkParent="/"
            />
            <CompetitionUpdateBody competitionDetail={competitionDetail} sponsor={sponsor} banner={banner} influencer={influencer} />
          </>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '100%' }} />
            </Col>
          </Row>
        )}
        <AdminFooter />
      </div>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
