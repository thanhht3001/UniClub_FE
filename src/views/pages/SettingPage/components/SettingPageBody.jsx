import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from 'reactstrap';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { warningAlertConstants } from 'constants/alert.constants';

export default function SettingPageBody() {
  const [clubs, setClubs] = useState(null);
  const [clubId, setClubId] = useState(0);
  const [alert, setalert] = useState(false);

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-200px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="xác nhận"
        btnSize=""
      ></ReactBSAlert>
    );
  };
  async function getClubAndUniversity(accessToken, studentID) {
    const res = await getDataByPath(`api/v1/clubs/user/${studentID}`, accessToken, '');
    console.log(res, 'club');
    if (res && res.status === 200) {
      if (res.data.length > 0) {
        setClubs(res.data);
      }
    } else if (res && res.status === 401) {
      warningAlert(warningAlertConstants.accountError);
    } else {
      warningAlert(warningAlertConstants.timeout);
    }
  }

  const handleChangeClub = (id) => {
    if (localStorage) {
      setClubId(parseInt(id));
      localStorage.setItem('clubID', id);
    }
  };

  React.useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const studentID = localStorage.getItem('studentID');
      const accessToken = localStorage.getItem('accessToken');
      if (clubs === null) {
        setClubId(parseInt(localStorage.getItem('clubID')));
        getClubAndUniversity(accessToken, studentID);
      }
    }
  }, []);

  return (
    <>
      {alert}
      <Container className="mt--6 bg-neutral" fluid>
        <Card>
          <CardHeader>
            <Row>
              <Col md="12">
                <h3> Các câu lạc bộ tham gia</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center justify-content-lg-center">
              <Col md="10">
                {clubs ? (
                  clubs.map((e, value) => {
                    return (
                      <Card className={clubId === e.id ? 'bg-gradient-success' : 'bg-gradient-pink'} key={`club-${value}`}>
                        <CardBody>
                          <Row>
                            <Col lg="8" md="12">
                              <CardTitle className="display-4 text-default font-weight-bold">{e.name}</CardTitle>
                              <span className="font-weight-bold text-default">{e.description}</span>
                            </Col>
                            <Col className="text-right" lg="4" md="12">
                              <Button disabled={clubId === e.id ? true : false} color="default" onClick={() => handleChangeClub(e.id)}>
                                {clubId === e.id ? 'Đang chọn' : 'Chuyển'}
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    );
                  })
                ) : (
                  <Col className="text-center">
                    <img
                      alt="..."
                      src={require('assets/img/icons/Curve-Loading.gif').default}
                      style={{ margin: 'auto', weight: '400px', height: '400px' }}
                    />
                  </Col>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
