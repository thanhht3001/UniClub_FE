import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import ActivityPageHeader from './components/AcitivityPageHeader';
import AcitivityPageBody from './components/ActivityPageBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { Col, Row } from 'reactstrap';
import { warningAlertConstants } from 'constants/alert.constants';
import { statusCode } from 'constants/status.constants';

export default function ActivityPage() {
  const [competitionData1, setCompetitionData1] = useState(null);
  const [competitionData2, setCompetitionData2] = useState(null);
  const [competitionData3, setCompetitionData3] = useState(null);
  const [competitionData4, setCompetitionData4] = useState(null);
  const [clubAcitivity, setClubAcitivity] = useState(null);
  const [alert, setalert] = useState(null);

  async function loadDataCompetitions(accessToken, clubID, cases) {
    let statusString = '';
    switch (cases) {
      case 1:
        statusString = '&statuses=8';
        break;
      case 2:
        statusString = '&statuses=0&statuses=1&statuses=5';
        break;
      case 3:
        statusString = '&statuses=2&statuses=3&statuses=4&statuses=10';
        break;
      case 4:
        statusString = '&statuses=11';
        break;
    }
    if (accessToken) {
      console.log(res);
      const path = 'api/v1/competitions';
      let data = `clubId=${clubID}&pageSize=4${statusString}`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      let items = [];
      if (res && res.status === 200) {
        if (res.data.items) {
          items = res.data.items;
        }
      } else {
        warningAlert(warningAlertConstants.timeout);
        return false;
      }
      switch (cases) {
        case 1:
          setCompetitionData1(items);
          break;
        case 2:
          setCompetitionData2(items);
          break;
        case 3:
          setCompetitionData3(items);
          break;
        case 4:
          setCompetitionData4(items);
          break;
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

  async function loadClubActivity(accessToken, clubID) {
    const path = 'api/v1/clubs/activity-of-club';
    const data = `clubId=${clubID}`;
    const res = await getDataByPath(path, accessToken, data);
    console.log(res);
    if (res && res.status === statusCode.success) {
      setClubAcitivity(res.data);
    } else {
      warningAlert(warningAlertConstants.timeout);
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      if (clubAcitivity === null) {
        loadClubActivity(accessToken, clubId);
      }
      if (competitionData1 === null) {
        loadDataCompetitions(accessToken, clubId, 1);
      }
      if (competitionData2 === null) {
        loadDataCompetitions(accessToken, clubId, 2);
      }
      if (competitionData3 === null) {
        loadDataCompetitions(accessToken, clubId, 3);
      }
      if (competitionData4 === null) {
        loadDataCompetitions(accessToken, clubId, 4);
      }
    }
  }, []);

  return (
    <>
      {alert}
      {clubAcitivity ? <ActivityPageHeader data={clubAcitivity} /> : <></>}
      {competitionData1 && competitionData2 && competitionData3 && competitionData4 ? (
        <>
          <AcitivityPageBody
            competitionData1={competitionData1}
            competitionData2={competitionData2}
            competitionData3={competitionData3}
            competitionData4={competitionData4}
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
