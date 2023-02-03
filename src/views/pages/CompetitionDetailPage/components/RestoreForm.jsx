import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from 'reactstrap';
import { newDateConvertToFormat } from 'services/formatData';

export default function RestoreForm(props) {
  const [startTimeRegister, setStartTimeRegister] = useState('');
  const [endTimeRegister, setEndTimeRegister] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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

  const timeUperOneHour = (time, numberOfHour) => {
    const date = convertStringToDate(time);
    date.setTime(date.getTime() + numberOfHour * 60 * 60 * 1000);
    return newDateConvertToFormat(date);
  };

  useEffect(() => {
    if (props.competitionDetail) {
      setStartTime(props.competitionDetail.start_time);
      setEndTime(props.competitionDetail.end_time);
      setStartTimeRegister(props.competitionDetail.start_time_register);
      setEndTimeRegister(props.competitionDetail.end_time_register);
    }
  }, [props.competitionDetail]);

  return (
    <Card className="bg-secondary border-0 mb-0" lg="9">
      <Row className="justify-content-end">
        <Col className="text-right" md="1">
          <Button close onClick={() => props.setRestoreForm(false)} />
        </Col>
      </Row>
      <CardHeader className="bg-transparent pb-0">
        <Row>
          <Col className="text-center" md="12">
            <h3>Tùy chỉnh các mốc thời gian</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="bg-transparent">
        <Row className="mb-3">
          <Col lg="6" md="12">
            <label className="form-control-label" htmlFor="startregisterdaytime">
              Thời gian mở đăng ký <span className="text-warning">*</span>
            </label>
            <Input
              defaultValue={startTimeRegister}
              id="startregisterdaytime"
              type="datetime-local"
              onChange={(e) => {
                setStartTimeRegister(e.target.value);
                if (compareTime(e.target.value, endTimeRegister)) {
                  if (compareTime(e.target.value, startTime)) {
                    if (compareTime(e.target.value, endTime)) {
                      setEndTimeRegister(timeUperOneHour(e.target.value, 2));
                      setStartTime(timeUperOneHour(e.target.value, 4));
                      setEndTime(timeUperOneHour(e.target.value, 6));
                    } else {
                      setEndTimeRegister(timeUperOneHour(e.target.value, 2));
                      setStartTime(timeUperOneHour(e.target.value, 4));
                    }
                  } else {
                    setEndTimeRegister(timeUperOneHour(e.target.value, 2));
                  }
                }
              }}
              min={newDateConvertToFormat(new Date())}
            />
          </Col>

          <Col lg="6" md="12">
            <label className="form-control-label" htmlFor="endregisterdaytime">
              Thời gian kết thúc đăng ký <span className="text-warning">*</span>
            </label>
            <Input
              value={endTimeRegister}
              id="endregisterdaytime"
              type="datetime-local"
              onChange={(e) => {
                setEndTimeRegister(e.target.value);
                if (compareTime(e.target.value, startTime)) {
                  if (compareTime(e.target.value, endTime)) {
                    setStartTime(timeUperOneHour(e.target.value, 2));
                    setEndTime(timeUperOneHour(e.target.value, 4));
                  } else {
                    setStartTime(timeUperOneHour(e.target.value, 6));
                  }
                }
              }}
              min={startTimeRegister}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg="6" md="12">
            <label className="form-control-label" htmlFor="startdaytime">
              Thời gian bắt đầu cuộc thi <span className="text-warning">*</span>
            </label>
            <Input
              value={startTime}
              id="startdaytime"
              type="datetime-local"
              onChange={(e) => {
                setStartTime(e.target.value);
                if (compareTime(e.target.value, endTime)) {
                  setEndTime(timeUperOneHour(e.target.value, 2));
                }
              }}
              min={endTimeRegister}
            />
          </Col>
          <Col lg="6" md="12">
            <label className="form-control-label" htmlFor="enddaytime">
              Thời gian kết thúc cuộc thi <span className="text-warning">*</span>
            </label>
            <Input
              value={endTime}
              id="enddaytime"
              type="datetime-local"
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              min={startTime}
            />
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="bg-transparent">
        <Row className="justify-content-center">
          <Col className="text-center" md="6">
            <Button color="default" onClick={() => props.setRestoreForm(false)}>
              Đóng
            </Button>
          </Col>
          <Col className="text-center" md="6">
            <Button color="success" onClick={() => props.restorePending(startTimeRegister, endTimeRegister, startTime, endTime)}>
              Khôi phục
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
