import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  Row,
} from 'reactstrap';
import { newDateConvertToFormat } from 'services/formatData';
import { convertDateToShowWithTime } from 'services/formatData';
import styled from 'styled-components';
import { warningAlertConstants } from 'constants/alert.constants';
import { createDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';
import CompetitionRoundDetailForm from './CompetitionRoundDetailForm';
import { competitionRoundStatus } from 'constants/competitionRound.constants';

const CardHover = styled.div`
  :hover {
    box-shadow: 0 4px 6px rgb(50 50 93 / 25%), 0 1px 3px rgb(0 0 0 / 8%);
    transform: scale(1.01);
    background-color: '#4141415c';
  }
`;

export default function CompetitionRoundBody(props) {
  const [inputRoundForm, setInputRoundForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(timeUperMinutes);
  const [endTime, setEndTime] = useState(newDateConvertToFormat(new Date()));
  const [roundType, setRoundType] = useState(1);
  const [seed, setSeed] = useState(0);
  const [detailModal, setDetailModal] = useState(false);
  const [detailData, setDetailData] = useState({
    competition_id: props.CompetitionId,
    description: '',
    end_time: newDateConvertToFormat(new Date()),
    id: -1,
    seeds_point: 50,
    start_time: newDateConvertToFormat(new Date()),
    status: 1,
    title: '',
  });

  // const sumSeedPoints = (arr) => {
  //   let sum = 0;
  //   arr.forEach((ele) => {
  //     sum += ele.seeds_point;
  //   });
  //   return sum;
  // };

  const convertDataToCreate = () => {
    return [
      {
        competition_id: parseInt(props.CompetitionId),
        title: title,
        round_type_id: parseInt(roundType),
        description: description,
        start_time: startTime,
        end_time: endTime,
        seeds_point: parseInt(seed),
      },
    ];
  };

  const handleStatusShow = (status) => {
    switch (status) {
      case 1:
        return { text: competitionRoundStatus.active, color: 'info' };
      case 2:
        return { text: competitionRoundStatus.happening, color: 'success' };
      case 3:
        return { text: competitionRoundStatus.finish, color: 'warning' };
    }
  };

  const checkValidationToCreate = () => {
    if (title.trim() === '') {
      props.warningAlert(warningAlertConstants.titleValidation);
      return false;
    } else if (seed === '' || seed < 0 || seed > 100) {
      props.warningAlert('Điểm thưởng phải trong khoảng từ 0 đến 100');
      return false;
    } else if (!compareTime(startTime, props.CompetitionData.start_time)) {
      props.warningAlert('Thời gian bắt đầu vòng thi phải lớn hơn thời gian bắt đầu cuộc thi');
      return false;
    } else if (!compareTime(props.CompetitionData.end_time, startTime)) {
      props.warningAlert('Thời gian bắt đầu vòng thi phải nhỏ hơn thời gian kết thúc cuộc thi');
      return false;
    } else if (!compareTime(endTime, startTime)) {
      props.warningAlert('Thời gian kết thúc vòng thi phải lớn hơn thời gian bắt đầu vòng thi');
      return false;
    } else if (!compareTime(props.CompetitionData.end_time, endTime)) {
      props.warningAlert('Thời gian kết thúc vòng thi phải nhỏ hơn thời gian kết thúc cuộc thi');
      return false;
    }
    return true;
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

  const compareTime = (firtTime, secondTime) => {
    const time1 = convertStringToDate(firtTime);
    const time2 = convertStringToDate(secondTime);
    if (time1 > time2) {
      return true;
    }
    return false;
  };

  const timeUperMinutes = (time, numberOfMinute) => {
    const date = convertStringToDate(time);
    date.setTime(date.getTime() + numberOfMinute * 60 * 1000);
    return newDateConvertToFormat(date);
  };

  const resetInputForm = () => {
    setInputRoundForm(false);
    setTitle('');
    setDescription('');
    setSeed(0);
    setStartTime(timeUperMinutes(props.CompetitionData.start_time, 1));
    setEndTime(timeUperMinutes(props.CompetitionData.end_time, -1));
  };

  React.useEffect(() => {
    if (props.CompetitionData) {
      setStartTime(timeUperMinutes(props.CompetitionData.start_time, 1));
      setEndTime(timeUperMinutes(props.CompetitionData.end_time, -1));
    }
  }, [props.CompetitionData]);

  async function createCompetitonRound() {
    if (checkValidationToCreate() && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/competition-rounds';
      const data = convertDataToCreate();
      console.log(data, 'data');
      const res = await createDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Tạo vòng thi thành công');
        resetInputForm();
        props.loadCompetitionRound(props.CompetitionId);
      } else if (res && res.status === statusCode.badrequest) {
        props.warningAlert('Thời gian bị trùng so với vòng thi trước');
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  const checkStatusEditable = (status) => {
    if (status === 0 || status === 1 || status === 5 || status === 6 || status === 7 || status === 8 || status === 9) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Container className="mt--6 bg-neutral mb-6" fluid>
        {props.CompetitionData && checkStatusEditable(props.CompetitionData.status) ? (
          <Row className="justify-content-center mb-3">
            <Col lg="10" md="10" className="text-center">
              <span className="font-weight-bold text-lg">
                Các mốc thời gian của vòng thi vui lòng nằm trong khoảng bắt đầu và kết thúc của cuộc thi từ:
                <br />
                <span className="text-warning" style={{ fontWeight: '700' }}>
                  {convertDateToShowWithTime(timeUperMinutes(props.CompetitionData.start_time, 1))}
                </span>{' '}
                tới{' '}
                <span className="text-warning" style={{ fontWeight: '700' }}>
                  {convertDateToShowWithTime(timeUperMinutes(props.CompetitionData.end_time, -1))}
                </span>
              </span>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        {props.CompetitionRounds.length > 0 ? (
          props.CompetitionRounds.map((ele, value) => {
            return (
              <Row className="justify-content-center mb-0" key={`round-${value}`}>
                <Col lg="10">
                  <a href="#round" onClick={(e) => e.preventDefault()}>
                    <CardHover
                      className="card"
                      onClick={() => {
                        if (checkStatusEditable(props.CompetitionData.status)) {
                          setDetailData(ele);
                          setDetailModal(true);
                        } else {
                          props.handleShowTeamInRound(ele.id);
                        }
                      }}
                    >
                      <CardHeader className="mb-0 pb-0">
                        <Row className="mb-3">
                          <Col lg="9" md="12">
                            <CardTitle tag="h5" className="text-uppercase mb-0 text-default" style={{ fontWeight: '800' }}>
                              {ele.title}
                            </CardTitle>
                          </Col>
                          <Col lg="3" md="12">
                            <h4 className="font-weight-bolder">{ele.round_type_name}</h4>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row className="mb-3">
                          <Col lg="12" md="12">
                            <span className="text-default font-weight-bold text-muted">{ele.description}</span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col className="col-auto">
                            <Badge className="font-weight-bold" pill color={handleStatusShow(ele.status).color}>
                              {handleStatusShow(ele.status).text}
                            </Badge>
                          </Col>
                        </Row>
                        <Row className="mb-0">
                          <Col lg="6" className="text-left">
                            <label
                              className="text-neutral mb-0 font-weight-bold text-sm bg-info"
                              style={{ borderRadius: '5px', padding: '2px 5px', fontFamily: 'sans-serif' }}
                            >
                              Bắt đầu: {convertDateToShowWithTime(ele.start_time)}
                            </label>
                          </Col>
                          <Col lg="6" className="text-right">
                            <label
                              className="text-neutral mb-0 font-weight-bold text-sm bg-warning"
                              style={{ borderRadius: '5px', padding: '2px 5px', fontFamily: 'sans-serif' }}
                            >
                              Kết thúc: {convertDateToShowWithTime(ele.end_time)}
                            </label>
                          </Col>
                        </Row>
                      </CardBody>
                    </CardHover>
                  </a>
                </Col>
              </Row>
            );
          })
        ) : props.CompetitionRounds.length === 0 && !inputRoundForm ? (
          <Row className="justify-content-center mt-5 mb-5">
            <Col className="text-center">
              <i className="fas fa-info-circle fa-10x text-blue mb-3" />
              <h3 className="display-2 text-blue " style={{ fontWeight: '900' }}>
                Không có thông tin
              </h3>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        {inputRoundForm === true ? (
          <Row className="justify-content-center mb-0">
            <Col lg="10">
              <Card>
                <CardHeader className="mb-0 pb-0">
                  <Row className="mb-1">
                    <Col lg="9" md="12">
                      <Label className="form-control-label" htmlFor="title">
                        Tên vòng thi <span className="text-warning">*</span>
                      </Label>
                      <InputGroup>
                        <Input
                          className="text-uppercase mb-0 text-default"
                          style={{ fontWeight: '800' }}
                          placeholder="Nhập tên vòng thi"
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fas fa-file-signature" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                    <Col lg="3" md="12">
                      <Label className="form-control-label" htmlFor="type">
                        Thể loại vòng đấu
                      </Label>
                      <Input
                        value={roundType}
                        id="type"
                        type="select"
                        onChange={(e) => {
                          setRoundType(e.target.value);
                        }}
                      >
                        <option value="1">Đấu loại trực tiếp</option>
                        <option value="2">Đấu xoay vòng</option>
                        <option value="3">Đấu tổ hợp</option>
                      </Input>
                    </Col>
                    {/* <Col lg="2" md="12">
                      <Label className="form-control-label" htmlFor="seeds">
                        Điểm thưởng
                      </Label>
                      <InputGroup>
                        <Input
                          className="text-default"
                          type="number"
                          min="0"
                          max={100}
                          id="seeds"
                          value={seed}
                          onChange={(e) => {
                            setSeed(e.target.value);
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className="fas fa-seedling" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Label className="form-control-label" htmlFor="description">
                    Nội dung
                  </Label>
                  <InputGroup className="mb-2">
                    <Input
                      className="text-default text-muted font-weight-bold"
                      placeholder="Nhập nội dung"
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fas fa-paperclip" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Row className="mb-3">
                    <Col lg="6" className="text-left">
                      <label className="form-control-label" htmlFor="starttime">
                        Bắt đầu <span className="text-warning">*</span>
                      </label>
                      <Input
                        defaultValue={timeUperMinutes(props.CompetitionData.start_time, 1)}
                        id="starttime"
                        type="datetime-local"
                        min={newDateConvertToFormat(new Date())}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                        }}
                      />
                    </Col>
                    <Col lg="6" className="text-left">
                      <label className="form-control-label" htmlFor="endtime">
                        Kết thúc <span className="text-warning">*</span>
                      </label>
                      <Input
                        defaultValue={timeUperMinutes(props.CompetitionData.end_time, -1)}
                        id="endtime"
                        type="datetime-local"
                        min={newDateConvertToFormat(new Date())}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center" lg="6" md="12">
                      <Button
                        color="success"
                        style={{ margin: 'auto' }}
                        onClick={() => {
                          createCompetitonRound();
                        }}
                      >
                        Lưu
                      </Button>
                    </Col>
                    <Col className="text-center" lg="6" md="12">
                      <Button
                        color="danger"
                        style={{ margin: 'auto' }}
                        onClick={() => {
                          setInputRoundForm(false);
                        }}
                      >
                        Đóng
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        {props.CompetitionData && checkStatusEditable(props.CompetitionData.status) && !inputRoundForm ? (
          <Row className="justify-content-center mb-0">
            <Col lg="10">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setInputRoundForm(true);
                }}
              >
                <CardHover className="card" style={{ minHeight: '150px', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'gray' }}>
                  <CardBody className="mt-2" style={{ margin: 'auto' }}>
                    <span style={{ fontSize: '3em', color: 'gray' }}>
                      <i className="fas fa-plus-circle " />
                    </span>
                  </CardBody>
                </CardHover>
              </a>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>

      <Modal className="modal-dialog-centered" size="lg" isOpen={detailModal} toggle={() => setDetailModal(false)}>
        <div className="modal-body p-0">
          <CompetitionRoundDetailForm
            data={detailData}
            setDetailModal={setDetailModal}
            handleStatusShow={handleStatusShow}
            warningAlert={props.warningAlert}
            successAlert={props.successAlert}
            setalert={props.setalert}
            loadCompetitionRound={props.loadCompetitionRound}
            competitionId={props.CompetitionId}
            CompetitionData={props.CompetitionData}
            checkStatusEditable={checkStatusEditable}
          />
        </div>
      </Modal>
    </>
  );
}
