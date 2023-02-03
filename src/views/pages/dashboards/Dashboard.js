import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, ListGroupItem, ListGroup, Progress, Table, Container, Row, Col } from 'reactstrap';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';

// core components
import CardsHeader from 'components/Headers/CardsHeader.js';
import { getDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';

function Dashboard() {
  const [clubHeadmasters, setClubHeadmasters] = useState(null);
  const [clubEventCompetitions, setClubEventCompetitions] = useState(null);
  const [clubActivity, setClubActivity] = useState(null);
  const [clubMembers, setClubMembers] = useState(null);
  const [alert, setalert] = useState(null);
  const history = useHistory();

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

  async function loadDataHeadmasters(id, accessToken) {
    if (id !== 0) {
      const path = 'api/v1/members/leaders/club';
      const res = await getDataByPath(`${path}/${id}`, accessToken, '');
      if (res && res.status === 200) {
        setClubHeadmasters(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDataMembers(clubId, accessToken) {
    if (clubId !== 0) {
      const path = 'api/v1/members/search';
      const data = `clubId=${clubId}&status=1&pageSize=${10}`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      if (res && res.status === 200) {
        setClubMembers(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDataEventCompetition(club_id, accessToken) {
    if (club_id !== null) {
      const path = 'api/v1/competitions/top';
      const data = `clubId=${club_id}&top=3`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      if (res && res.status === 200) {
        setClubEventCompetitions(res.data);
      } else if (res && res.status === 204) {
        setClubEventCompetitions([]);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadClubActivity(clubId, accessToken) {
    if (clubId !== 0) {
      const path = 'api/v1/competition-activities/top-process';
      const data = `clubId=${clubId}&topCompetition=3&topCompetitionActivity=100`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      console.log(res, 'activity');
      if (res && res.status === 200) {
        setClubActivity(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }
  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const club_id = localStorage.getItem('clubID');
      const accessToken = localStorage.getItem('accessToken');
      if (clubHeadmasters === null) {
        loadDataHeadmasters(club_id, accessToken);
      }
      if (clubEventCompetitions === null) {
        loadDataEventCompetition(club_id, accessToken);
      }
      if (clubActivity === null) {
        loadClubActivity(club_id, accessToken);
      }
      if (clubMembers === null) {
        loadDataMembers(club_id, accessToken);
      }
    }
  }, []);

  return (
    <>
      {alert}
      <CardsHeader name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="4">
            <Card style={{ height: '90%', paddingBottom: '10px' }}>
              <CardHeader>
                <h5 className="h3 mb-0">Ban Quản Lý</h5>
              </CardHeader>
              <CardBody>
                <ListGroup className="list my--3" flush>
                  {clubHeadmasters ? (
                    clubHeadmasters.map((ele, value) => {
                      return (
                        <ListGroupItem className="px-0" key={`Headmasters-${value}`}>
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <a className="avatar rounded-circle" href="#pablo" onClick={(e) => e.preventDefault()}>
                                <img alt="..." src={ele.avatar ? ele.avatar : require('assets/img/icons/avatar/No_image_available.png').default} />
                              </a>
                            </Col>
                            <div className="col ml--2">
                              <h4 className="mb-0">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                  {ele.name}
                                </a>
                                <span className="text-muted ml-2">{`(${ele.club_role_name})`}</span>
                              </h4>
                              <span className={`${ele.is_online === true ? 'text-success' : 'text-danger'}`}>●</span>{' '}
                              <small>{ele.is_online === true ? 'Online' : 'Offline'}</small>
                            </div>
                          </Row>
                        </ListGroupItem>
                      );
                    })
                  ) : (
                    <Row>
                      <Col md="12">
                        <img
                          alt="..."
                          src={require('assets/img/icons/Curve-Loading.gif').default}
                          style={{ margin: 'auto', weight: '200px', height: '200px' }}
                        />
                      </Col>
                    </Row>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card style={{ height: '90%', paddingBottom: '10px' }}>
              <CardHeader>
                <Row>
                  <Col md="8">
                    <h5 className="h3 mb-0">Sự kiện và cuộc thi</h5>
                  </Col>
                  <Col md="4" className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={() => {
                        history.push(`/admin/cuoc-thi`);
                      }}
                    >
                      Xem tất cả
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
                <ListGroup data-toggle="checklist" flush>
                  {clubEventCompetitions ? (
                    clubEventCompetitions.length > 0 ? (
                      clubEventCompetitions.map((e, value) => {
                        return (
                          <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4" key={`Event-${value}`}>
                            <a
                              href="#check"
                              onClick={(ele) => {
                                ele.preventDefault();
                                history.push(`/admin/cuoc-thi/chi-tiet/${e.id}`);
                              }}
                            >
                              <div className="checklist-item-info checklist-item">
                                <div className="checklist-info">
                                  <h5 className="checklist-title mb-0" style={{ fontWeight: '700' }}>
                                    {e.name}
                                  </h5>
                                  <Row>
                                    <Col className="col-auto text-default">
                                      <small>Thể loại: {e.competition_type_name}</small>
                                    </Col>
                                    {e.is_sponsor === true ? (
                                      <Col className="col-auto">
                                        <small className="text-success font-weight-bold">Tài trợ</small>
                                      </Col>
                                    ) : (
                                      <></>
                                    )}
                                  </Row>
                                </div>
                              </div>
                            </a>
                          </ListGroupItem>
                        );
                      })
                    ) : (
                      <Col md="12" className="text-center">
                        <h2 className="display-4" style={{ margin: 'auto' }}>
                          Danh sách trống
                        </h2>
                        <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '200px', height: '200px' }} />
                      </Col>
                    )
                  ) : (
                    <Row>
                      <Col md="12">
                        <img
                          alt="..."
                          src={require('assets/img/icons/Curve-Loading.gif').default}
                          style={{ margin: 'auto', weight: '200px', height: '200px' }}
                        />
                      </Col>
                    </Row>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card style={{ height: '90%', paddingBottom: '10px' }}>
              <CardHeader>
                <Row>
                  <Col md="8">
                    <h5 className="h3 mb-0">Tiến độ hoạt động</h5>
                  </Col>
                  <Col md="4" className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      onClick={() => {
                        history.push(`/admin/hoat-dong`);
                      }}
                    >
                      Xem tất cả
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <ListGroup className="list my--3" flush>
                  {clubActivity ? (
                    clubActivity.length > 0 ? (
                      clubActivity.map((e, value) => {
                        return (
                          <ListGroupItem className="px-0" key={`activity-${value}`}>
                            <a
                              href="#check"
                              onClick={(ele) => {
                                ele.preventDefault();
                                history.push(`/admin/hoat-dong/chi-tiet/${e.competition_id}`);
                              }}
                            >
                              <Row className="align-items-center">
                                <div className="checklist-item-warning checklist-item">
                                  <div className="checklist-warning">
                                    <Col md="12">
                                      <h5 style={{ fontWeight: '700' }}>{e.competition_name}</h5>
                                      <Progress
                                        className="progress-xs mb-0"
                                        color={`${
                                          e.number_activity_completed / e.number_activity_open === 1
                                            ? 'green'
                                            : e.number_activity_completed / e.number_activity_open >= 0.5
                                            ? 'blue'
                                            : 'orange'
                                        }`}
                                        max={e.number_activity_open + e.number_activity_completed + e.number_activity_finished}
                                        value={e.number_activity_completed}
                                      />
                                      <h5>
                                        Tiến độ: {e.number_activity_completed}/
                                        {e.number_activity_open + e.number_activity_completed + e.number_activity_finished}{' '}
                                      </h5>
                                    </Col>
                                  </div>
                                </div>
                              </Row>
                            </a>
                          </ListGroupItem>
                        );
                      })
                    ) : (
                      <Col md="12" className="text-center">
                        <h2 className="display-4" style={{ margin: 'auto' }}>
                          Danh sách trống
                        </h2>
                        <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '200px', height: '200px' }} />
                      </Col>
                    )
                  ) : (
                    <Row>
                      <Col md="12">
                        <img
                          alt="..."
                          src={require('assets/img/icons/Curve-Loading.gif').default}
                          style={{ margin: 'auto', weight: '200px', height: '200px' }}
                        />
                      </Col>
                    </Row>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card style={{ paddingBottom: '10px' }}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Thành viên</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" href="/admin/thanh-vien" size="sm">
                      Xem tất cả
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {clubMembers ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Họ và tên</th>
                      <th scope="col">Chức vụ</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubMembers.items.map((e, value) => {
                      return (
                        <tr key={`member-${value}`}>
                          <td> {value + 1} </td>
                          <td> {e.name} </td>
                          <td> {e.club_role_name} </td>
                          <td> {e.is_online === true ? 'Online' : 'Offline'} </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Row>
                  <Col className="text-center" md="12">
                    <img
                      alt="..."
                      src={require('assets/img/icons/Curve-Loading.gif').default}
                      style={{ margin: 'auto', weight: '200px', height: '200px' }}
                    />
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
