import { warningAlertConstants } from 'constants/alert.constants';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from 'reactstrap';
import { createDataByPath } from 'services/data.service';
import { convertDateToShowWithTime } from 'services/formatData';
import { newDateConvertToFormat } from 'services/formatData';

export default function MatchForm(props) {
  const [createForm, setCreateForm] = useState(false);
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(newDateConvertToFormat(new Date()));
  const [endTime, setEndTime] = useState(newDateConvertToFormat(new Date()));
  const [loseMatch, setLoseMatch] = useState(false);

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

  const timeUperMinutes = (time, numberOfMinute) => {
    console.log(time);
    if (time) {
      const date = convertStringToDate(time);
      date.setTime(date.getTime() + numberOfMinute * 60 * 1000);
      return newDateConvertToFormat(date);
    }
  };

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

  const convertDataToCreate = () => {
    if (props.roundDetail.round_type_id !== 3) {
      return {
        round_id: parseInt(props.roundDetail.id),
        address: address,
        title: title,
        description: description,
        start_time: startTime,
        end_time: endTime,
        number_of_team: 0,
      };
    } else {
      return {
        round_id: parseInt(props.roundDetail.id),
        is_lose_match: loseMatch,
        address: address,
        title: title,
        description: description,
        start_time: startTime,
        end_time: endTime,
        number_of_team: 0,
      };
    }
  };

  async function createMatch() {
    if (checkValidationToCreate() && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/matches';
      const data = convertDataToCreate();
      console.log(data, 'data');
      const res = await createDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Tạo trận đấu thành công');
        props.loadMatchs(parseInt(props.roundDetail.id));
        resetCreateForm();
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  const resetCreateForm = () => {
    setCreateForm(false);
    setTitle('');
    setAddress('');
    setDescription('');
    setStartTime(timeUperMinutes(props.roundDetail.start_time, 1));
    setEndTime(timeUperMinutes(props.roundDetail.end_time, -1));
  };

  const compareTime = (firtTime, secondTime) => {
    const time1 = convertStringToDate(firtTime);
    const time2 = convertStringToDate(secondTime);
    if (time1 > time2) {
      return true;
    }
    return false;
  };

  const convertMatchStatus = (status) => {
    switch (status) {
      case 0:
        return { text: 'Chuẩn bị', color: 'info' };
      case 1:
        return { text: 'Diễn ra', color: 'success' };
      case 2:
        return { text: 'Hoàn thành', color: 'success' };
      case 3:
        return { text: 'Đã hủy', color: 'warning' };
    }
  };

  const isFinish = () => {
    console.log(props.competitionData.status);
    if (props.competitionData.status === 11) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.roundDetail) {
      setStartTime(timeUperMinutes(props.roundDetail.start_time, 1));
      setEndTime(timeUperMinutes(props.roundDetail.end_time, -1));
    }
  }, [props.roundDetail]);

  return (
    <>
      <Card lg="9">
        <CardHeader>
          <Row className="align-items-center">
            <Col className="text-center" lg="12" md="12">
              <h3 className="font-weight-bolder">Danh sách trận đấu</h3>
              <h3 className="font-weight-bold">
                Thể loại: <span className="text-warning">{props.roundDetail?.round_type_name}</span>
              </h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {props.matchData && props.roundDetail ? (
            <>
              {props.matchData.length > 0 ? (
                <Row>
                  <Col className="text-center" md="12">
                    {props.matchData.map((e, value) => {
                      if (e.status === 0 || e.status === 1 || e.status === 2 || e.status === 3)
                        return (
                          <Card key={`match-${value}`}>
                            <a
                              href="#match"
                              onClick={(ele) => {
                                ele.preventDefault();
                                props.handleShowMatchDetail(e.id);
                              }}
                            >
                              <CardBody style={{ borderStyle: 'solid', borderColor: 'green', borderRadius: '10px' }}>
                                <Row>
                                  <Col className="mb-3" md="2">
                                    <Badge color={convertMatchStatus(e.status).color}>{convertMatchStatus(e.status).text}</Badge>
                                  </Col>
                                  <Col className="mb-3" md="8">
                                    <h3 className="text-uppercase">{e.title}</h3>
                                  </Col>
                                  <Col className="mb-3" md="2">
                                    {e.is_lose_match ? <Badge color="danger">Nhánh thua</Badge> : <></>}
                                  </Col>
                                  {/* <Col className="mb-3 text-left ml-7" md="12">
                                    <h3 className="text-default">Trạng thái: {convertMatchStatus(e.status)}</h3>
                                  </Col> */}
                                  <Col className="mb-3" md="6">
                                    <Badge className="font-weight-bold" color="success">
                                      Bắt đầu: {convertDateToShowWithTime(e.start_time)}
                                    </Badge>
                                  </Col>
                                  <Col className="mb-3" md="6">
                                    <Badge className="font-weight-bold" color="warning">
                                      Kết thúc: {convertDateToShowWithTime(e.end_time)}
                                    </Badge>
                                  </Col>
                                </Row>
                              </CardBody>
                            </a>
                          </Card>
                        );
                    })}
                    {!createForm ? (
                      !isFinish() ? (
                        <Button color="success" outline onClick={() => setCreateForm(true)}>
                          Tạo trận đấu <i className="fas fa-plus" />
                        </Button>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              ) : !createForm ? (
                <Row className="justify-content-center mt-5 mb-5">
                  <Col className="text-center">
                    <i className="fas fa-info-circle fa-10x text-blue mb-3" />
                    <h3 className="display-2 text-blue " style={{ fontWeight: '900' }}>
                      Không có thông tin
                    </h3>
                    {!isFinish() ? (
                      <Button color="success" outline onClick={() => setCreateForm(true)}>
                        Tạo trận đấu <i className="fas fa-plus" />
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              {createForm ? (
                <Card>
                  <CardBody style={{ borderStyle: 'solid', borderColor: 'green', borderRadius: '10px' }}>
                    <Row>
                      <Col className="mb-3" md="3">
                        Tiêu đề <span className="text-warning">*</span>:
                      </Col>
                      <Col className="mb-3" md="9">
                        <Input
                          className="text-uppercase font-weight-bold text-default"
                          bsSize="sm"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col className="mb-3" md="3">
                        Mô tả:
                      </Col>
                      <Col className="mb-3" md="9">
                        <Input bsSize="sm" value={description} onChange={(e) => setDescription(e.target.value)} />
                      </Col>
                      <Col className="mb-3" md="3">
                        Địa chỉ:
                      </Col>
                      <Col className="mb-3" md="9">
                        <Input bsSize="sm" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </Col>
                      {props.roundDetail.round_type_id === 3 ? (
                        <>
                          <Col className="mb-3" md="3">
                            Nhánh thua:
                          </Col>
                          <Col className="mb-3" md="9">
                            <Row className="ml-4">
                              <Input type="checkbox" value={loseMatch} onChange={() => setLoseMatch(!loseMatch)} />
                              <h4 className="text-gray ml-2">(Tích để tạo trận dành cho các đội thua)</h4>
                            </Row>
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      <Col className="mb-3" md="3">
                        Thời gian bắt đầu:
                      </Col>
                      <Col className="mb-3" md="9">
                        <Input bsSize="sm" type="datetime-local" defaultValue={startTime} />
                      </Col>
                      <Col className="mb-3" md="3">
                        Thời gian kết thúc:
                      </Col>
                      <Col className="mb-3" md="9">
                        <Input bsSize="sm" type="datetime-local" defaultValue={endTime} />
                      </Col>
                      <Col className="text-center" md="6">
                        <Button className="mb-2" size="sm" outline color="warning" onClick={() => setCreateForm(false)}>
                          Đóng
                        </Button>
                      </Col>
                      <Col className="text-center" md="6">
                        <Button className="mb-2" size="sm" color="success" onClick={() => createMatch()}>
                          Tạo
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ) : (
                <></>
              )}
            </>
          ) : (
            <Row>
              <Col className="text-center" lg="12" md="12">
                <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '30%' }} />
              </Col>
            </Row>
          )}
        </CardBody>
        <CardFooter>
          <Row className="justify-content-center">
            <Col md="12" className="text-center">
              <Button color="default" onClick={() => props.setMatchForm(false)}>
                Đóng
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </>
  );
}
