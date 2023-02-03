import React from 'react';
import { Container, Row, Col, Card, CardBody, Progress, CardTitle } from 'reactstrap';

export default function ActivityPageHeader(props) {
  return (
    <>
      <Container className="bg-white" fluid>
        <Card>
          <div className="header pb-6">
            <Container fluid>
              <div className="header-body">
                <Row className="align-items-center py-4">
                  <Col lg="6" xs="7">
                    <h6 className="h2 d-inline-block mb-0">Hoạt động câu lạc bộ</h6>{' '}
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          <Container className="mt--6" fluid>
            <Row>
              <Col md="12" xl="4">
                <Card style={{ height: '85%' }} className="bg-gradient-primary border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                          Các hoạt động đã hoàn thành
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">
                          {props.data.total_activity_of_club_complete}/{props.data.total_activity_of_club_create}
                        </span>
                        <Progress
                          className="progress-xs mt-3 mb-0"
                          max={props.data.total_activity_of_club_create}
                          value={props.data.total_activity_of_club_complete}
                          color="success"
                        />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="12" xl="4">
                <Card style={{ height: '85%' }} className="bg-gradient-info border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                          Tổng số hoạt động đã tạo
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">{props.data.total_activity_of_club_create}</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="12" xl="4">
                <Card style={{ height: '85%' }} className="bg-gradient-warning border-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                          Tổng số hoạt động trễ hạn
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0 text-white">{props.data.total_activity_of_club_late}</span>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Card>
      </Container>
    </>
  );
}
