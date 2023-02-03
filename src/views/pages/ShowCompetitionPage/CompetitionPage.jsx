import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service.js';
import CompetitionHeader from './components/CompetitionHeader.js';
import CompetitionPageBody from './components/CompetitionPageBody.jsx';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { Row, Col } from 'reactstrap';
import { warningAlertConstants } from 'constants/alert.constants.js';
import { statusCode } from 'constants/status.constants.js';

function CompetitionPage() {
  const [alert, setalert] = React.useState(false);
  const [competitionList1, setCompetitionList1] = useState(null);
  const [competitionList2, setCompetitionList2] = useState(null);
  const [competitionList3, setCompetitionList3] = useState(null);
  const [competitionList4, setCompetitionList4] = useState(null);
  const [competitionList5, setCompetitionList5] = useState(null);
  const [competitionList6, setCompetitionList6] = useState(null);
  const [competitionList7, setCompetitionList7] = useState(null);
  const [competitionProgress, setCompetitionProgress] = useState(null);
  const [isEvent, setIsEvent] = useState(0);
  const [clubData, setClubData] = useState(null);

  async function loadDataListCompetition(accessToken, clubId, currentPage, cases, event) {
    let statusString = '';
    switch (cases) {
      case 1:
        statusString = '&statuses=6&statuses=9';
        break;
      case 2:
        statusString = '&statuses=7';
        break;
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
      case 7:
        statusString = '&statuses=12';
        break;
    }
    if (accessToken) {
      const path = 'api/v1/competitions';
      let data = `clubId=${clubId}&pageSize=4&currentPage=${currentPage}${statusString}`;
      if (event && event === 1) {
        data = `clubId=${clubId}&pageSize=4&currentPage=${currentPage}${statusString}&event=false`;
      }
      if (event && event === 2) {
        data = `clubId=${clubId}&pageSize=4&currentPage=${currentPage}${statusString}&event=true`;
      }
      const res = await getDataByPath(`${path}`, accessToken, data);
      if (res && (res.status === 200 || res.status === 204)) {
        let newData = [];
        if (res.data.items && res.data.items.length > 0) {
          newData = res.data.items;
        }
        switch (cases) {
          case 1:
            setCompetitionList1(newData);
            console.log(res);
            break;
          case 2:
            setCompetitionList2(newData);
            break;
          case 3:
            setCompetitionList3(newData);
            break;
          case 4:
            setCompetitionList4(newData);
            break;
          case 5:
            setCompetitionList5(newData);
            break;
          case 6:
            setCompetitionList6(newData);
            break;
          case 7:
            setCompetitionList7(newData);
            break;
        }
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

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

  async function loadCompetitionProgress(clubId, accessToken) {
    if (accessToken) {
      const path = 'api/v1/competitions/process-by-club';
      const data = `clubId=${clubId}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setCompetitionProgress(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const handleChangeEvent = (event) => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      setCompetitionList1(null);
      setCompetitionList2(null);
      setCompetitionList3(null);
      setCompetitionList4(null);
      setCompetitionList5(null);
      setCompetitionList6(null);
      setCompetitionList7(null);
      loadDataListCompetition(accessToken, clubId, 1, 1, event);
      loadDataListCompetition(accessToken, clubId, 1, 2, event);
      loadDataListCompetition(accessToken, clubId, 1, 3, event);
      loadDataListCompetition(accessToken, clubId, 1, 4, event);
      loadDataListCompetition(accessToken, clubId, 1, 5, event);
      loadDataListCompetition(accessToken, clubId, 1, 6, event);
      loadDataListCompetition(accessToken, clubId, 1, 7, event);
    }
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const studentID = localStorage.getItem('studentID');
      if (competitionList1 === null) {
        loadDataListCompetition(accessToken, clubId, 1, 1);
        loadDataListCompetition(accessToken, clubId, 1, 2);
        loadDataListCompetition(accessToken, clubId, 1, 3);
        loadDataListCompetition(accessToken, clubId, 1, 4);
        loadDataListCompetition(accessToken, clubId, 1, 5);
        loadDataListCompetition(accessToken, clubId, 1, 6);
        loadDataListCompetition(accessToken, clubId, 1, 7);
      }
      if (clubData === null) {
        loadDataClubs(accessToken, studentID);
      }
      if (competitionProgress === null) {
        loadCompetitionProgress(clubId, accessToken);
      }
    }
  }, []);

  return (
    <>
      {alert}
      {clubData &&
      competitionProgress &&
      competitionList1 &&
      competitionList2 &&
      competitionList3 &&
      competitionList4 &&
      competitionList5 &&
      competitionList6 &&
      competitionList7 ? (
        <>
          <CompetitionHeader clubData={clubData} competitionProgress={competitionProgress} />
          <CompetitionPageBody
            competitionList1={competitionList1}
            competitionList2={competitionList2}
            competitionList3={competitionList3}
            competitionList4={competitionList4}
            competitionList5={competitionList5}
            competitionList6={competitionList6}
            competitionList7={competitionList7}
            isEvent={isEvent}
            setIsEvent={setIsEvent}
            handleChangeEvent={handleChangeEvent}
          />
        </>
      ) : (
        <Row>
          <Col md="12" className="text-center">
            <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto' }} />
          </Col>
        </Row>
      )}
    </>
  );
}

export default CompetitionPage;
