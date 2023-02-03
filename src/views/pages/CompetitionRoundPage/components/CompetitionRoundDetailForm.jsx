import { warningAlertConstants } from 'constants/alert.constants';
import { statusCode } from 'constants/status.constants';
import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import { deleteDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { newDateConvertToFormat } from 'services/formatData';
import ReactBSAlert from 'react-bootstrap-sweetalert';

export default function CompetitionRoundDetailForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(newDateConvertToFormat(new Date()));
  const [endTime, setEndTime] = useState(newDateConvertToFormat(new Date()));
  const [seed, setSeed] = useState(0);
  const [roundType, setRoundType] = useState(1);
  const [editable, setEditable] = useState(false);

  const convertDataToUpdate = () => {
    return {
      id: parseInt(props.data.id),
      title: title,
      description: description,
      start_time: startTime,
      end_time: endTime,
      number_of_team: 0,
      round_type_id: parseInt(roundType),
      seeds_point: parseInt(seed),
    };
  };

  const checkValidationToUpdate = () => {
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
    } else if (!compareTime(props.CompetitionData.end_time, startTime, endTime)) {
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

  const warningAlertDelete = (message) => {
    props.setalert(
      <ReactBSAlert
        info
        style={{ display: 'block', marginTop: '-100px' }}
        showCancel
        confirmBtnText="Đồng ý"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="info"
        cancelBtnText="Hủy hành động"
        title="Bạn có đồng ý xóa vòng thi không ?"
        onConfirm={() => deleteCompetitionRound()}
        onCancel={() => props.setalert(null)}
        focusCancelBtn
      >
        {message}
      </ReactBSAlert>
    );
  };

  async function deleteCompetitionRound() {
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/competition-rounds`;
      const id = props.data.id;
      const res = await deleteDataByPath(path, accessToken, id);
      if (res && res.status === statusCode.successRemove) {
        props.successAlert('Xóa vòng thi thành công');
        props.loadCompetitionRound(props.competitionId);
        props.setDetailModal(false);
      } else {
        props.warningAlert('Có lỗi xảy ra khi xóa vòng thi');
      }
      console.log(res);
    }
  }

  async function updateCompetitionRound() {
    if (checkValidationToUpdate() && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/competition-rounds';
      const data = convertDataToUpdate();
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        props.successAlert('Cập nhật vòng thi thành công');
        props.loadCompetitionRound(props.competitionId);
      } else if (res && res.status === statusCode.badrequest) {
        props.warningAlert('Thời gian bị trùng so với vòng thi trước');
      } else {
        props.warningAlert('Kết nối tới máy chủ thất bại');
      }
      console.log(res);
    }
  }

  React.useEffect(() => {
    if (props.data) {
      const data = props.data;
      setTitle(data.title);
      setDescription(data.description);
      setStartTime(data.start_time);
      setEndTime(data.end_time);
      setSeed(data.seeds_point);
      setEditable(false);
      setRoundType(parseInt(data.round_type_id));
    }
    console.log(props.data);
  }, [props.data]);

  return (
    <>
      <Card lg="9">
        <CardHeader>
          <Row className="align-items-center">
            <Col lg="6" md="12">
              <Badge className="font-weight-bold" pill color={props.handleStatusShow(props.data.status).color}>
                {props.handleStatusShow(props.data.status).text}
              </Badge>
            </Col>
            {props.CompetitionData && props.checkStatusEditable(props.CompetitionData.status) ? (
              <Col lg="6" md="12" className="text-right">
                <Button
                  color={editable ? 'warning' : 'info'}
                  onClick={() => {
                    setEditable(!editable);
                  }}
                  size="sm"
                >
                  {editable ? 'Tắt chỉnh sửa' : 'Chỉnh sửa'}
                </Button>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </CardHeader>
        <CardHeader className="mb-0 pb-0">
          <Row className="mb-1">
            <Col lg="12" md="12">
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
                  disabled={!editable}
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
            {/* <Col lg="3" md="12">
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
                  disabled={!editable}
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
          <Label className="form-control-label" htmlFor="type">
            Thể loại vòng đấu
          </Label>
          <Input
            value={roundType}
            id="type"
            type="select"
            disabled={!editable}
            onChange={(e) => {
              setRoundType(e.target.value);
            }}
          >
            <option value="1">Đấu loại trực tiếp</option>
            <option value="2">Đấu xoay vòng</option>
            <option value="3">Đấu tổ hợp</option>
          </Input>
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
              disabled={!editable}
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
                value={startTime}
                id="starttime"
                type="datetime-local"
                min={newDateConvertToFormat(new Date())}
                disabled={!editable}
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
                value={endTime}
                id="endtime"
                type="datetime-local"
                min={newDateConvertToFormat(new Date())}
                disabled={!editable}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            {props.CompetitionData && props.checkStatusEditable(props.CompetitionData.status) ? (
              <Col className="text-center" lg="6" md="12">
                {editable ? (
                  <Button
                    color="success"
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      updateCompetitionRound();
                    }}
                  >
                    Lưu
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      warningAlertDelete('Vòng thi đã xóa sẽ không thể hoàn tác');
                    }}
                  >
                    Xóa
                  </Button>
                )}
              </Col>
            ) : (
              <></>
            )}
            <Col className="text-center" lg="6" md="12">
              <Button color="default" style={{ margin: 'auto' }} onClick={() => props.setDetailModal(false)}>
                Đóng
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
