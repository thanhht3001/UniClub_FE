import React, { useEffect, useState } from 'react';
import AdminFooter from 'components/Footers/AdminFooter.js';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { useHistory, useLocation } from 'react-router-dom';
import routes from 'routes/routes.js';
import CompetitionDetailHeader from './components/CompetitionDetailHeader';
import CompetitionDetailBody from './components/CompetitionDetailBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { Col, Modal, Row } from 'reactstrap';
import { warningAlertConstants } from 'constants/alert.constants';
import { statusCode } from 'constants/status.constants';
import { updateDataByPath } from 'services/data.service';
import CompetitionRoundView from '../CompetitionPublicDetailPage/components/CompetitionRoundView';

export default function UniversityCompetitionDetailPage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [alert, setalert] = React.useState(false);
  const [competitionDetail, setCompetitionDetail] = useState(null);
  const [banner, setBanner] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [influencer, setInfluencer] = useState([]);
  const [competitionStatus, setCompetitionStatus] = useState(null);
  const [competitionClubs, setCompetitionClubs] = useState(null);
  const [roundForm, setRoundForm] = useState(false);
  const [competitionRound, setCompetitionRound] = useState(null);
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  const history = useHistory();

  async function loadDataCompetitionDetail(accessToken, competition_id) {
    setCompetitionStatus(null);
    setCompetitionClubs(null);
    if (accessToken) {
      const path = `api/v1/competitions/${competition_id}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      if (res && res.status === statusCode.success) {
        convertCompetitionEntities(res.data);
        setCompetitionStatus(res.data.status);
        setCompetitionClubs(res.data.clubs_in_competition);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const convertCompetitionEntities = (array) => {
    const banner = [];
    const sponsor = [];
    const influencer = [];
    array.competition_entities.forEach((e) => {
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

  async function updateCompetitionsStatus(competitionID, action) {
    console.log(competitionID);
    if (localStorage && localStorage.getItem('accessToken') && competitionID) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/competitions/university-admin';
      let status = 6;
      if (parseInt(action) === 1) {
        status = 8;
      }
      const data = {
        id: competitionID,
        status: status,
      };
      console.log(data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        successAlert(action === 1 ? 'Chấp thuận thành công' : 'Từ chối thành công');
        setTimeout(() => {
          history.push('/university/xet-duyet');
        }, 2000);
      } else {
        warningAlert('Có lỗi xảy ra khi thực hiện hành động');
      }
    }
  }

  const updateAlert = (competitionID, status) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Cảnh báo"
        onConfirm={() => {
          updateCompetitionsStatus(competitionID, status);
          setalert(null);
        }}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="info"
        confirmBtnText="Có"
        showCancel={true}
        cancelBtnBsStyle="default"
        cancelBtnText="Không"
      >
        {status === 1
          ? 'Bạn có chắc chắn muốn chấp thuận cuộc thi hoặc sự kiện này không ?'
          : 'Bạn có chắc chắn muốn từ chối cuộc thi hoặc sự kiện này không ?'}
      </ReactBSAlert>
    );
  };

  const successAlert = (message) => {
    setalert(
      <ReactBSAlert
        success
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

  async function loadCompetitionRound(competitionId) {
    if (competitionId) {
      const path = `api/v1/competition-rounds/search`;
      const data = `competitionId=${competitionId}&pageSize=20&statuses=1&statuses=2&statuses=3`;
      const res = await getDataByPath(path, '', data);
      console.log(res, 'round');
      if (res && res.status === statusCode.success) {
        if (res.data.items && res.data.items.length > 0) {
          setCompetitionRound(res.data.items);
        } else {
          setCompetitionRound([]);
        }
      }
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      if (competitionDetail === null) {
        loadDataCompetitionDetail(accessToken, props.match.params.id);
      }
      if (competitionRound === null) {
        loadCompetitionRound(props.match.params.id);
      }
    }
  }, []);

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
            <CompetitionDetailHeader data={competitionDetail} sponsor={sponsor} />
            <CompetitionDetailBody
              data={competitionDetail}
              banner={banner}
              influencer={influencer}
              competitionStatus={competitionStatus}
              competitionClubs={competitionClubs}
              updateAlert={updateAlert}
              setRoundForm={setRoundForm}
            />
          </>
        ) : (
          <Row>
            <Col md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '100%' }} />
            </Col>
          </Row>
        )}
        <AdminFooter />
      </div>
      <Modal className="modal-dialog-centered" size="lg" isOpen={roundForm} toggle={() => setRoundForm(false)}>
        <div className="modal-body p-0">
          <CompetitionRoundView CompetitionRounds={competitionRound} setRoundForm={setRoundForm} />
        </div>
      </Modal>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
