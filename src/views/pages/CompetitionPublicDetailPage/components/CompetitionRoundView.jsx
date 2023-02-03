import { competitionRoundStatus } from 'constants/competitionRound.constants';
import React from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { convertDateToShowWithTime } from 'services/formatData';

export default function CompetitionRoundView(props) {
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
  return (
    <Card className="bg-secondary border-0 mb-0" lg="9">
      <CardHeader className="bg-transparent pb-0">
        <div className="text-center">
          <h3>Vòng thi</h3>
        </div>
      </CardHeader>
      <CardBody>
        {props.CompetitionRounds?.length > 0 ? (
          props.CompetitionRounds.map((ele, value) => {
            return (
              <Row className="justify-content-center mb-0" key={`round-${value}`}>
                <Col lg="10">
                  <Card className="card">
                    <CardHeader className="mb-0 pb-0">
                      <Row className="mb-0">
                        <Col lg="10" md="12">
                          <CardTitle tag="h5" className="text-uppercase mb-0 text-default" style={{ fontWeight: '800' }}>
                            {ele.title}
                          </CardTitle>
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
                  </Card>
                </Col>
              </Row>
            );
          })
        ) : (
          <Row>
            <Col md="12" className="text-center">
              <i className="fas fa-info-circle fa-10x text-blue mb-3" />
              <h3 className="display-2 text-blue " style={{ fontWeight: '900' }}>
                Chưa có thông tin
              </h3>
            </Col>
          </Row>
        )}
      </CardBody>
      <CardFooter>
        <Row>
          <Col className="text-center" md="12">
            <Button color="danger" onClick={() => props.setRoundForm(false)}>
              Đóng
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
