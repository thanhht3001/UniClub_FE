import { warningAlertConstants } from 'constants/alert.constants';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Row, Table, UncontrolledTooltip } from 'reactstrap';
import { createDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { convertDateToShowWithTime } from 'services/formatData';
import { newDateConvertToFormat } from 'services/formatData';

export default function MatchFormDetail(props) {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(newDateConvertToFormat(new Date()));
  const [endTime, setEndTime] = useState(newDateConvertToFormat(new Date()));
  const [editable, setEditable] = useState(false);
  const [addTeamForm, setAddTeamForm] = useState(false);
  const [selectTeam, setSelectTeam] = useState(0);
  const [changeScore, setChangeScore] = useState(false);

  const checkValidationToCreate = () => {
    if (title.trim() === '') {
      props.warningAlert(warningAlertConstants.titleValidation);
      return false;
    } else if (!compareTime(startTime, props.roundDetail.start_time)) {
      props.warningAlert('Thời gian bắt đầu trận đấu phải lớn hơn thời gian bắt đầu vòng thi');
      return false;
    } else if (!compareTime(props.roundDetail.end_time, startTime)) {
      props.warningAlert('Thời gian bắt đầu trận đấu phải nhỏ hơn thời gian kết thúc vòng thi');
      return false;
    } else if (!compareTime(endTime, startTime)) {
      props.warningAlert('Thời gian kết thúc trận đấu phải lớn hơn thời gian bắt đầu trận đấu');
      return false;
    } else if (!compareTime(props.roundDetail.end_time, endTime)) {
      props.warningAlert('Thời gian kết thúc trận đấu phải nhỏ hơn thời gian kết thúc vòng thi');
      return false;
    }
    return true;
  };

  const convertDataToUpdate = () => {
    return {
      id: parseInt(props.matchDataDetail.id),
      round_id: parseInt(props.matchDataDetail.round_id),
      is_lose_match: props.matchDataDetail.is_lose_match,
      address: address,
      title: title,
      description: description,
      start_time: startTime,
      end_time: endTime,
      number_of_team: parseInt(props.matchDataDetail.number_of_team),
      status: parseInt(props.matchDataDetail.status),
    };
  };

  const convertDataToAddTeam = () => {
    let status = 0;
    if (props.matchDataDetail.is_lose_match) {
      status = 2;
    }
    return [
      {
        match_id: parseInt(props.matchDataDetail.id),
        team_id: parseInt(selectTeam),
        scores: 0,
        status: status,
        description: '',
      },
    ];
  };

  async function updateMatch() {
    if (checkValidationToCreate() && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/matches';
      const data = convertDataToUpdate();
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật trận đấu thành công');
        props.loadMatchs(parseInt(props.roundDetail.id));
        props.loadMatchsDetail(parseInt(props.matchDataDetail.id));
        setEditable(false);
      } else if (res && res.status === statusCode.badrequest) {
        if (res.data === 'Can not update match < 10 mins before round start') {
          props.warningAlert('Chỉ có thể cập nhật vòng đấu trước 10 phút khi vòng thi bắt đầu');
        }
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  async function updateStatusMatch(status) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/matches';
      const data = {
        id: parseInt(props.matchDataDetail.id),
        round_id: parseInt(props.matchDataDetail.round_id),
        status: parseInt(status),
      };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật trạng thái trận đấu thành công');
        props.loadMatchs(parseInt(props.roundDetail.id));
        props.loadMatchsDetail(parseInt(props.matchDataDetail.id));
        props.loadTeamInMatch(parseInt(props.matchDataDetail.id));
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  async function createTeamInMatch() {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams-in-match';
      const data = convertDataToAddTeam();
      console.log(data, 'data');
      const res = await createDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Thêm đội thành công');
        props.loadMatchsDetail(parseInt(props.matchDataDetail.id));
        props.loadTeamInMatch(parseInt(props.matchDataDetail.id));
      } else if (res && res.status === statusCode.badrequest) {
        if (res.data === 'Duplicated team in match') {
          props.warningAlert('Đội đã có sẵn trong trận');
        }
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  const compareTime = (firtTime, secondTime) => {
    const time1 = convertStringToDate(firtTime);
    const time2 = convertStringToDate(secondTime);
    if (time1 > time2) {
      return true;
    }
    return false;
  };

  const convertStringToDate = (string) => {
    const arr = string.split('T');
    const day = arr[0].split('-');
    const time = arr[1].split(':');
    let seconds;
    if (time[2]) {
      seconds = time[2].slice(0, 2);
    } else {
      seconds = '00';
    }
    const date = new Date(+day[0], +day[1] - 1, +day[2], +time[0], +time[1], +seconds);
    return date;
  };

  async function updateStatusTeam(status, id, teamId) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams-in-match';
      const data = [
        {
          id: parseInt(id),
          match_id: parseInt(props.matchDataDetail.id),
          team_id: parseInt(teamId),
          scores: 0,
          status: status,
          description: '',
        },
      ];
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật trạng thái thành công');
        props.loadMatchsDetail(parseInt(props.matchDataDetail.id));
        props.loadTeamInMatch(parseInt(props.matchDataDetail.id));
        props.loadTeamInRound(parseInt(props.matchDataDetail.round_id));
      }
    }
  }

  const convertDataUpdateScore = () => {
    const scores = document.getElementsByClassName('scoreMatch');
    const data = [];
    for (let i = 0; i < scores.length; i++) {
      let score = 0;
      if (scores[i].value !== '' && scores[i].value >= 0) {
        score = scores[i].value;
      }
      const ele = {
        id: props.teamInMatchData[i].id,
        match_id: props.teamInMatchData[i].match_id,
        team_id: props.teamInMatchData[i].team_id,
        scores: parseInt(score),
        status: props.teamInMatchData[i].status,
        description: props.teamInMatchData[i].description,
      };
      data.push(ele);
    }
    return data;
  };

  async function updateScoreTeams() {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams-in-match';
      const data = convertDataUpdateScore();
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật điểm thành công');
        props.loadMatchsDetail(parseInt(props.matchDataDetail.id));
        props.loadTeamInMatch(parseInt(props.matchDataDetail.id));
        props.loadTeamInRound(parseInt(props.matchDataDetail.round_id));
        setChangeScore(false);
      }
    }
  }

  async function removeMatch(id) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/matches';
      const res = await deleteDataByPath(path, accessToken, id);
      if (res && res.status === 204) {
        props.successAlert('Xóa vòng đấu thành công');
        props.setMatchFormDetail(false);
        props.loadMatchs(parseInt(props.roundDetail.id));
      } else {
        props.warningAlert('Không thể xóa trận đấu đã hoàn thành');
      }
    }
  }

  async function removeTeam(id) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/teams-in-match`;
      const res = await deleteDataByPath(path, accessToken, id);
      console.log(res);
      if (res && res.status === 204) {
        props.successAlert('Xóa nhóm khỏi trận thành công');
        props.loadTeamInMatch(parseInt(props.matchDataDetail.id));
        props.loadTeamInRound(parseInt(props.matchDataDetail.round_id));
      }
    }
  }

  const convertTeamInMatchStatus = (status) => {
    switch (status) {
      case 0:
        return { text: 'Hoạt động', color: 'text-success' };
      case 1:
        return { text: 'Đi tiếp', color: 'text-success' };
      case 2:
        return { text: 'Loại', color: 'text-warning' };
      case 3:
        return { text: 'Hòa', color: 'text-info' };
      case 4:
        return { text: 'Hủy', color: 'text-warning' };
    }
  };

  const getTeamLoseList = () => {
    const teamLose = [];
    if (props.teamInRoundData?.length > 0) {
      props.teamInRoundData.forEach((e) => {
        if (!e.status) {
          teamLose.push(e);
        }
      });
    }
    return teamLose;
  };

  const isFinish = () => {
    if (props.competitionData.status === 11) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.matchDataDetail) {
      setTitle(props.matchDataDetail.title);
      setAddress(props.matchDataDetail.address);
      setDescription(props.matchDataDetail.description);
      setStartTime(props.matchDataDetail.start_time);
      setEndTime(props.matchDataDetail.end_time);
      if (props.matchDataDetail.is_lose_match && getTeamLoseList().length > 0) {
        setSelectTeam(getTeamLoseList()[0].team_id);
      }
    }
  }, [props.matchDataDetail]);

  useEffect(() => {
    if (props.teamInRoundData?.length > 0) {
      setSelectTeam(props.teamInRoundData[0].team_id);
    }
  }, [props.teamInRoundData]);

  return (
    <Card lg="10">
      {props.matchDataDetail ? (
        <>
          <CardHeader>
            <Row className="justify-content-center">
              {!editable ? (
                <Col md="8" className="text-center">
                  <h2 className="font-weight-bolder text-uppercase">{title}</h2>
                </Col>
              ) : (
                <>
                  <Col md="2">
                    <h3>
                      Tiêu đề <span className="text-warning">*</span>:
                    </h3>
                  </Col>
                  <Col md="4">
                    <Input
                      className="text-uppercase font-weight-bold text-default"
                      bsSize="sm"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Col>
                </>
              )}
              {!isFinish() ? (
                <Col md="2" className="text-right">
                  <Button color="info" outline size="sm" onClick={() => setEditable(!editable)}>
                    {editable ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </CardHeader>
          <CardBody>
            {editable ? (
              <Row className="justify-content-center">
                <Col md="8">
                  <Row>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Mô tả:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <Input bsSize="sm" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Địa chỉ:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <Input bsSize="sm" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Thời gian bắt đầu:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <Input bsSize="sm" type="datetime-local" defaultValue={startTime} />
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Thời gian kết thúc:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <Input bsSize="sm" type="datetime-local" defaultValue={endTime} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <Row className="justify-content-center">
                <Col md="8">
                  <Row>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Mô tả:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <h3 className="font-weight-bold">{description}</h3>
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Địa chỉ:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <h3 className="font-weight-bold">{address}</h3>
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Thời gian bắt đầu:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <h3 className="font-weight-bold">{convertDateToShowWithTime(startTime)}</h3>
                    </Col>
                    <Col className="mb-3" md="3">
                      <h3 className="font-weight-bold">Thời gian kết thúc:</h3>
                    </Col>
                    <Col className="mb-3" md="9">
                      <h3 className="font-weight-bold">{convertDateToShowWithTime(endTime)}</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {props.teamInMatchData?.length > 0 ? (
              <Row className="justify-content-center">
                <Col md="10">
                  <h3 className="font-weight-bolder">Danh sách đội tham dự</h3>
                  {!addTeamForm && !isFinish() ? (
                    <Button className="mb-3" size="sm" color="success" outline onClick={() => setAddTeamForm(true)}>
                      Thêm đội <i className="fas fa-plus" />
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên nhóm</th>
                        {props.roundDetail.round_type_id === 2 ? (
                          <th scope="col">Điểm số</th>
                        ) : (
                          <th scope="col" className="text-center">
                            Trạng thái
                          </th>
                        )}
                        {!isFinish() ? (
                          <th scope="col" className="text-center">
                            Tùy chỉnh
                          </th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {props.teamInMatchData.map((e, value) => {
                        return (
                          <tr key={`team-${value}`}>
                            <td>
                              <span className="font-weight-bolder">{value + 1}</span>
                            </td>
                            <th scope="row">
                              <span className="font-weight-bold">{e.team_name}</span>
                            </th>
                            {props.roundDetail.round_type_id === 2 ? (
                              <td className="text-center">
                                <Input
                                  className="scoreMatch"
                                  bsSize="sm"
                                  disabled={isFinish()}
                                  defaultValue={e.scores}
                                  min="0"
                                  max="10000"
                                  style={{ maxWidth: '100px' }}
                                  onChange={() => setChangeScore(true)}
                                />
                              </td>
                            ) : (
                              <td className={`text-center font-weight-bolder ${convertTeamInMatchStatus(e.status).color}`}>
                                {convertTeamInMatchStatus(e.status).text}{' '}
                              </td>
                            )}
                            {!isFinish() ? (
                              <td className="text-center">
                                {props.roundDetail.round_type_id === 2 ? (
                                  <></>
                                ) : e.status === 0 || e.status === 1 ? (
                                  <>
                                    <a
                                      className="mr-2"
                                      href="#remove"
                                      id={`tooltip-lose${value}`}
                                      onClick={(ele) => {
                                        ele.preventDefault();
                                        updateStatusTeam(2, e.id, e.team_id);
                                      }}
                                    >
                                      <i className="fas fa-times-circle text-warning" />
                                    </a>
                                    <UncontrolledTooltip delay={0} target={`tooltip-lose${value}`}>
                                      Loại đội thi
                                    </UncontrolledTooltip>
                                  </>
                                ) : (
                                  <>
                                    <a
                                      className="mr-2"
                                      href="#undo"
                                      id={`tooltip-undo${value}`}
                                      onClick={(ele) => {
                                        ele.preventDefault();
                                        if (props.matchDataDetail.is_lose_match) {
                                          updateStatusTeam(1, e.id, e.team_id);
                                        } else updateStatusTeam(0, e.id, e.team_id);
                                      }}
                                    >
                                      <i
                                        className={
                                          props.matchDataDetail.is_lose_match && e.status !== 0
                                            ? 'fas fa-chevron-circle-right text-info'
                                            : 'fas fa-undo text-success'
                                        }
                                      />
                                    </a>
                                    <UncontrolledTooltip delay={0} target={`tooltip-undo${value}`}>
                                      {props.matchDataDetail.is_lose_match ? 'Đi tiếp' : 'Khôi phục đội thi'}
                                    </UncontrolledTooltip>
                                  </>
                                )}
                                {props.matchDataDetail?.is_lose_match && e.status !== 0 ? (
                                  <>
                                    <a
                                      className="mr-2"
                                      href="#remove"
                                      id={`tooltip-lastWin${value}`}
                                      onClick={(ele) => {
                                        ele.preventDefault();
                                        updateStatusTeam(0, e.id, e.team_id);
                                      }}
                                    >
                                      <i className="fas fa-crown text-success" />
                                    </a>
                                    <UncontrolledTooltip delay={0} target={`tooltip-lastWin${value}`}>
                                      Thắng chuỗi thua
                                    </UncontrolledTooltip>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <a
                                  href="#remove"
                                  id={`tooltip-remove${value}`}
                                  onClick={(ele) => {
                                    ele.preventDefault();
                                    removeTeam(e.id);
                                  }}
                                >
                                  <i className="fas fa-trash text-danger" />
                                </a>
                                <UncontrolledTooltip delay={0} target={`tooltip-remove${value}`}>
                                  Xóa khỏi trận đấu
                                </UncontrolledTooltip>
                              </td>
                            ) : (
                              <></>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : !addTeamForm ? (
              <Row className="justify-content-center mt-5 mb-5">
                <Col className="text-center">
                  <i className="fas fa-info-circle fa-5x text-blue mb-3" />
                  <h3 className="display-5 text-blue " style={{ fontWeight: '900' }}>
                    Chưa có đội thi đấu
                  </h3>
                  <Button size="sm" color="success" outline onClick={() => setAddTeamForm(true)}>
                    Thêm đội <i className="fas fa-plus" />
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {addTeamForm ? (
              <Row className="justify-content-center">
                <Col md="8">
                  <Row>
                    <Col md="3">
                      <h3 className="font-weight-bold">Tên đội:</h3>
                    </Col>
                    <Col md="7">
                      <Input
                        className="font-weight-bold text-default"
                        type="select"
                        bsSize="sm"
                        value={selectTeam}
                        onChange={(ele) => setSelectTeam(ele.target.value)}
                      >
                        {props.matchDataDetail.is_lose_match
                          ? getTeamLoseList().map((e) => {
                              return (
                                <option key={`team-${e.team_id}`} value={e.team_id}>
                                  {e.team_name}
                                </option>
                              );
                            })
                          : props.teamInRoundData?.map((e) => {
                              return (
                                <option key={`team-${e.team_id}`} value={e.team_id}>
                                  {e.team_name}
                                </option>
                              );
                            })}
                      </Input>
                    </Col>
                    <Col md="2">
                      {props.matchDataDetail.is_lose_match ? (
                        getTeamLoseList().length > 0 ? (
                          <Button color="info" outline size="sm" onClick={() => createTeamInMatch()}>
                            Thêm đội
                          </Button>
                        ) : (
                          <></>
                        )
                      ) : (
                        <Button color="info" outline size="sm" onClick={() => createTeamInMatch()}>
                          Thêm đội
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </CardBody>
          <CardFooter>
            <Row className="justify-content-center">
              <Col className="text-center" md="3">
                <Button color="default" onClick={() => props.setMatchFormDetail(false)}>
                  Đóng
                </Button>
              </Col>
              {editable ? (
                <Col className="text-center" md="3">
                  <Button color="success" onClick={() => updateMatch()}>
                    Lưu thay đổi
                  </Button>
                </Col>
              ) : (
                <>
                  {!isFinish() ? (
                    <Col className="text-center" md="3">
                      <Button
                        color="warning"
                        onClick={() => {
                          if (props.teamInMatchData?.length > 0) {
                            updateStatusMatch(3);
                          } else removeMatch(props.matchDataDetail.id);
                        }}
                      >
                        {props.teamInMatchData?.length > 0 ? 'Hủy trận' : 'Xóa vòng đấu'}
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {props.roundDetail.round_type_id === 2 && changeScore ? (
                    <Col className="text-center" md="3">
                      <Button color="success" onClick={() => updateScoreTeams()}>
                        Cập nhật điểm
                      </Button>
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Row>
          </CardFooter>
        </>
      ) : (
        <Row>
          <Col className="text-center" lg="12" md="12">
            <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '50%' }} />
          </Col>
        </Row>
      )}
    </Card>
  );
}
