import AdminFooter from 'components/Footers/AdminFooter';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { statusCode } from 'constants/status.constants';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Col, Modal, Row } from 'reactstrap';
import routes from 'routes/routes.js';
import { getDataByPath } from 'services/data.service';
import CompetitionRoundBody from './components/CompetitionRoundBody';
import CompetitionRoundHeader from './components/CompetitionRoundHeader';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import TeamInRound from './components/TeamInRound';
import CompetitionResult from './components/CompetitionResult';
import MatchForm from './components/MatchForm';
import MatchFormDetail from './components/MatchFormDetail';

export default function CompetitionRoundPage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  const [competitionRound, setCompetitionRound] = useState(null);
  const [competitionData, setCompetitionData] = useState(null);
  const [roundDetail, setRoundDetail] = useState(null);
  const [teamInRoundForm, setTeamInRoundForm] = useState(null);
  const [teamInRoundData, setTeamInRoundData] = useState(null);
  const [teamList, setTeamList] = useState(null);
  const [roundId, setRoundId] = useState(0);
  const [matchForm, setMatchForm] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [matchFormDetail, setMatchFormDetail] = useState(null);
  const [matchDataDetail, setMatchDataDetail] = useState(null);
  const [teamInMatchData, setTeamInMatchData] = useState(null);
  const [alert, setalert] = useState(false);
  const [showRound, setShowRound] = useState(false);

  async function loadCompetitionRound(competitionId) {
    if (competitionId && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/competition-rounds/search`;
      const data = `competitionId=${competitionId}&pageSize=30&statuses=1&statuses=2&statuses=3`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'list');
      if (res && res.status === statusCode.success) {
        if (res.data.items && res.data.items.length > 0) {
          setCompetitionRound(res.data.items);
        } else {
          setCompetitionRound([]);
        }
      }
    }
  }

  async function loadCompetitionRoundDetail(roundID) {
    setRoundDetail(null);
    if (roundID && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/competition-rounds/${roundID}`;
      const res = await getDataByPath(path, accessToken, '');
      console.log(res, 'detail');
      if (res && res.status === statusCode.success) {
        setRoundDetail(res.data);
        loadTeamInRound(roundID);
      }
    }
  }

  async function loadTeamInRound(roundId) {
    setTeamInRoundData(null);
    if (roundId && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams-in-round/search`;
      const data = `roundId=${roundId}&pageSize=30`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'teamInRound');
      if (res && res.status === statusCode.success) {
        if (res.data.items && res.data.items.length > 0) {
          setTeamInRoundData(res.data.items);
        } else {
          setTeamInRoundData([]);
        }
      }
    }
  }

  async function loadCompetitionDetail(competitionId) {
    if (competitionId && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/competitions/${competitionId}`;
      const res = await getDataByPath(path, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        setCompetitionData(res.data);
      }
    }
  }

  async function loadTeamInMatch(matchId) {
    setTeamInMatchData(null);
    if (matchId && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams-in-match/search`;
      const data = `matchId=${matchId}&pageSize=50`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'team in match');
      if (res && res.status === statusCode.success) {
        if (res.data.items && res.data.items.length > 0) {
          setTeamInMatchData(res.data.items);
        } else {
          setTeamInMatchData([]);
        }
      }
    }
  }

  async function loadTeamList() {
    setTeamList(null);
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams/all`;
      const data = `competitionId=${props.match.params.id}&status=1&pageSize=50`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) setTeamList(res.data.items);
        else setTeamList([]);
      }
    }
  }

  async function loadMatchs(roundId) {
    setMatchData(null);
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/matches/search`;
      const data = `competitionId=${props.match.params.id}&roundId=${roundId}&pageSize=50`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) setMatchData(res.data.items);
        else setMatchData([]);
      }
    }
  }

  async function loadMatchsDetail(matchId) {
    setMatchDataDetail(null);
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/matches/${matchId}`;
      const res = await getDataByPath(path, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        setMatchDataDetail(res.data);
      }
    }
  }

  const handleShowMatchDetail = (matchId) => {
    setMatchFormDetail(true);
    loadTeamInMatch(matchId);
    loadMatchsDetail(matchId);
  };

  const handleShowTeamInRound = (roundId) => {
    setTeamInRoundForm(true);
    setRoundId(roundId);
    loadTeamList();
    loadCompetitionRoundDetail(roundId);
  };

  const handleShowMatchForm = (roundId) => {
    setMatchForm(true);
    loadMatchs(roundId);
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

  React.useEffect(() => {
    if (competitionRound === null) {
      loadCompetitionRound(props.match.params.id);
    }
    if (competitionData === null) {
      loadCompetitionDetail(props.match.params.id);
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
        {competitionData ? <CompetitionRoundHeader showRound={showRound} setShowRound={setShowRound} data={competitionData} /> : <></>}
        {competitionRound && competitionData ? (
          competitionData.status !== 11 ? (
            <CompetitionRoundBody
              CompetitionId={props.match.params.id}
              CompetitionRounds={competitionRound}
              loadCompetitionRound={loadCompetitionRound}
              CompetitionData={competitionData}
              warningAlert={warningAlert}
              successAlert={successAlert}
              setalert={setalert}
              handleShowTeamInRound={handleShowTeamInRound}
            />
          ) : (
            <Row>
              <Col md="12">
                {showRound ? (
                  <CompetitionRoundBody
                    CompetitionId={props.match.params.id}
                    CompetitionRounds={competitionRound}
                    loadCompetitionRound={loadCompetitionRound}
                    CompetitionData={competitionData}
                    warningAlert={warningAlert}
                    successAlert={successAlert}
                    setalert={setalert}
                    handleShowTeamInRound={handleShowTeamInRound}
                  />
                ) : (
                  <></>
                )}
                <CompetitionResult CompetitionId={props.match.params.id} />
              </Col>
            </Row>
          )
        ) : (
          <Row>
            <Col className="text-center" lg="12" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto' }} />
            </Col>
          </Row>
        )}
        <AdminFooter />
        <Modal className="modal-dialog-centered" size="lg" isOpen={teamInRoundForm}>
          <div className="modal-body p-0">
            <TeamInRound
              teamList={teamList}
              setTeamInRoundForm={setTeamInRoundForm}
              roundId={roundId}
              successAlert={successAlert}
              warningAlert={warningAlert}
              teamInRoundData={teamInRoundData}
              roundDetail={roundDetail}
              handleShowMatchForm={handleShowMatchForm}
              loadTeamInRound={loadTeamInRound}
              competitionData={competitionData}
            />
          </div>
        </Modal>
        <Modal className="modal-dialog-centered" size="lg" isOpen={matchForm}>
          <div className="modal-body p-0">
            <MatchForm
              matchData={matchData}
              setMatchForm={setMatchForm}
              roundDetail={roundDetail}
              successAlert={successAlert}
              warningAlert={warningAlert}
              loadMatchs={loadMatchs}
              handleShowMatchDetail={handleShowMatchDetail}
              competitionData={competitionData}
            />
          </div>
        </Modal>

        <Modal className="modal-dialog-centered" size="xl" isOpen={matchFormDetail}>
          <div className="modal-body p-0">
            <MatchFormDetail
              matchDataDetail={matchDataDetail}
              successAlert={successAlert}
              warningAlert={warningAlert}
              setMatchFormDetail={setMatchFormDetail}
              roundDetail={roundDetail}
              loadMatchsDetail={loadMatchsDetail}
              loadTeamInMatch={loadTeamInMatch}
              loadTeamInRound={loadTeamInRound}
              loadMatchs={loadMatchs}
              teamInMatchData={teamInMatchData}
              teamInRoundData={teamInRoundData}
              competitionData={competitionData}
            />
          </div>
        </Modal>
      </div>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
