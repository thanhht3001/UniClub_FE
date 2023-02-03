import { statusCode } from 'constants/status.constants';
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from 'reactstrap';
import { updateDataByPath } from 'services/data.service';
// import { createDataByPath } from 'services/data.service';

export default function TeamInRound(props) {
  // const getValueListCreate = () => {
  //   const scores = document.getElementsByClassName('score');
  //   const data = [];
  //   for (let i = 0; i < scores.length; i++) {
  //     let score = 0;
  //     if (scores[i].value !== '' && scores[i].value >= 0) {
  //       score = scores[i].value;
  //     }
  //     const ele = {
  //       team_id: parseInt(props.teamList[i].team_id),
  //       round_id: parseInt(props.roundId),
  //       scores: parseInt(score),
  //     };
  //     data.push(ele);
  //   }
  //   return data;
  // };

  const convertDataToUpdate = (id, team_id, round_id, number) => {
    const scores = document.getElementsByClassName('score');
    let score = 0;
    if (scores[number].value !== '' && scores[number].value >= 0) {
      score = scores[number].value;
    }
    const data = {
      id: id,
      team_id: team_id,
      round_id: round_id,
      scores: parseInt(score),
      status: true,
    };
    return data;
  };

  // async function createTeamInRound() {
  //   if (localStorage.getItem('accessToken')) {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const path = 'api/v1/teams-in-round';
  //     const data = getValueListCreate();
  //     console.log(data, 'data');
  //     const res = await createDataByPath(path, accessToken, data);
  //     console.log(res);
  //     if (res && res.status === statusCode.success) {
  //       props.successAlert('Cập nhật điểm thi thành công');
  //       props.setTeamInRoundForm(false);
  //     }
  //   } else {
  //     props.warningAlert('Kết nối tới máy chủ thất bại');
  //   }
  // }

  async function updateTeamInRound(id, team_id, round_id, number) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams-in-round';
      const data = convertDataToUpdate(id, team_id, round_id, number);
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật điểm thi thành công');
        props.loadTeamInRound(props.roundDetail.id);
      }
    } else {
      props.warningAlert('Kết nối tới máy chủ thất bại');
    }
  }

  async function updateTeamStatus(status, id, team_id, round_id) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams-in-round';
      const data = {
        id: parseInt(id),
        team_id: parseInt(team_id),
        round_id: parseInt(round_id),
        scores: 0,
        status: status,
      };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật trạng thái thành công');
        props.loadTeamInRound(props.roundDetail.id);
      }
    } else {
      props.warningAlert('Kết nối tới máy chủ thất bại');
    }
  }

  const showButton = (number) => {
    const button = document.getElementsByClassName('save');
    button[number].classList.replace('d-none', 'd-block');
  };

  // const hideButton = (number) => {
  //   const button = document.getElementsByClassName('save');
  //   button[number].classList.replace('d-block', 'd-none');
  // };

  const borderTeam = (status) => {
    if (status) {
      return { borderStyle: 'solid', borderColor: 'lightblue', borderRadius: '10px' };
    }
    return { borderStyle: 'solid', borderColor: 'red', borderRadius: '10px' };
  };

  const isFinish = () => {
    if (props.competitionData.status === 11) {
      return true;
    }
    return false;
  };

  return (
    <Card lg="9">
      <CardHeader>
        <Row className="align-items-center">
          <Col lg="8" md="8">
            <h3 className="font-weight-bold">Danh sách nhóm tham dự</h3>
          </Col>
          <Col lg="4" md="4" className="text-right">
            <Button size="sm" outline color="info" onClick={() => props.handleShowMatchForm(props.roundId)}>
              Danh sách trận đấu <i className="fas fa-clipboard-list" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {props.teamList && props.teamInRoundData && props.roundDetail ? (
          <Row className="align-items-center justify-content-center">
            <Col md="12" className="text-center">
              <h3 className="font-weight-bolder text-blue text-uppercase mb-3">{props.roundDetail.title}</h3>
              {props.roundDetail.round_type_name ? (
                <h4 className="font-weight-bolder text-default mb-3">
                  Thể loại: <span className="text-warning">{props.roundDetail.round_type_name}</span>
                </h4>
              ) : (
                <></>
              )}
              {props.teamList.length > 0 ? (
                props.teamInRoundData.length === 0 ? (
                  <>
                    <h2 className="display-4" style={{ margin: 'auto' }}>
                      Hãy đợi vòng thi trước hoàn thành
                    </h2>
                    <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
                  </>
                ) : (
                  props.teamInRoundData.map((e, value) => {
                    return (
                      <Card key={`team-${value}`}>
                        <CardBody style={borderTeam(e.status)}>
                          <Row>
                            <Col md="3" className="text-left">
                              <h4>Tên:</h4>
                            </Col>
                            <Col md="5" className="text-left">
                              <h4>{e.team_name}</h4>
                            </Col>
                            <Col md="2" className="text-right">
                              <h4>Trạng thái:</h4>
                            </Col>
                            <Col md="2">
                              <label style={{ marginLeft: '10px' }} className="custom-toggle mr-1">
                                <input
                                  disabled={isFinish()}
                                  defaultChecked={e.status}
                                  type="checkbox"
                                  onChange={() => updateTeamStatus(!e.status, e.id, e.team_id, e.round_id)}
                                />
                                <span className="custom-toggle-slider rounded-circle" data-label-off="Loại" />
                              </label>
                            </Col>
                            <Col md="3" className="text-left">
                              <h4>Số trận tham gia:</h4>
                            </Col>
                            <Col md="9" className="text-left">
                              <h4>{e.number_of_participated_matches}</h4>
                            </Col>
                            {props.roundDetail.round_type_id === 2 ? (
                              <>
                                <Col md="3" className="text-left">
                                  <h4>Điểm số:</h4>
                                </Col>
                                <Col md="4" className="text-left">
                                  <Input
                                    className="score font-weight-bold"
                                    type="number"
                                    disabled={isFinish()}
                                    defaultValue={e.scores}
                                    onChange={() => {
                                      showButton(value);
                                    }}
                                    bsSize="sm"
                                    min={0}
                                  ></Input>
                                </Col>
                              </>
                            ) : (
                              <></>
                            )}
                            <Col md="4" className="text-left">
                              <Button
                                className="save d-none"
                                outline
                                color="info"
                                size="sm"
                                onClick={() => {
                                  updateTeamInRound(e.id, e.team_id, e.round_id, value);
                                }}
                              >
                                Lưu thay đổi
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    );
                  })
                )
              ) : (
                <>
                  <h2 className="display-4" style={{ margin: 'auto' }}>
                    Không có nhóm dự thi
                  </h2>
                  <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
                </>
              )}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img
                alt="..."
                src={require('assets/img/icons/Curve-Loading.gif').default}
                style={{ margin: 'auto', weight: '300px', height: '300px' }}
              />
            </Col>
          </Row>
        )}
      </CardBody>
      <CardFooter>
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <Button color="default" onClick={() => props.setTeamInRoundForm(false)}>
              Đóng
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
