import PropTypes from 'prop-types';
import React from 'react';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

function CompetitionHeader(props) {
  return (
    <>
      {props.clubData ? (
        <div className="header bg-grey pb-6">
          <Container fluid>
            <Card className="pl-4 pr-4 mb-1">
              <div className="header-body">
                <Row className="align-items-center py-4">
                  <Col lg="9" xs="10">
                    <Row>
                      <Col className="col-auto">
                        <a className="avatar rounded-circle" href={props.clubData.club_fanpage} target="blank">
                          <img alt="..." src={props.clubData.image ?? require('assets/img/icons/avatar/No_image_available.png').default} />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h3 className="mb-0 text-default" style={{ fontWeight: '900', fontFamily: 'sans-serif', margin: 'auto' }}>
                          <a href={props.clubData.club_fanpage} target="blank">
                            {props.clubData.name}
                          </a>
                        </h3>
                        <span style={{ color: 'grey', fontFamily: 'cursive' }}>{props.clubData.club_contact}</span>{' '}
                      </div>
                    </Row>
                  </Col>
                  <Col className="text-right" lg="3" xs="2">
                    <p className="font-weight-bold text-default mb-0" style={{ fontFamily: 'cursive', margin: 'auto' }}>
                      {props.clubData.university_name}
                    </p>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col md="6" xl="3">
                  <Card style={{ height: '80%' }} className="bg-gradient-primary border-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                            Các cuộc thi mở đăng ký
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            {props.competitionProgress.number_competition_registering + props.competitionProgress.number_event_registering}
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card style={{ height: '80%' }} className="bg-gradient-info border-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                            Các cuộc thi chuẩn bị diễn ra
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            {props.competitionProgress.number_competition_upcoming + props.competitionProgress.number_event_upcoming}
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card style={{ height: '80%' }} className="bg-gradient-danger border-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                            Các cuộc thi đang diễn ra
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            {props.competitionProgress.number_competition_ongoing + props.competitionProgress.number_event_ongoing}
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card style={{ height: '80%' }} className="bg-gradient-default border-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0 text-white">
                            Các cuộc thi đã hoàn thành
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0 text-white">
                            {props.competitionProgress.number_competition_completed + props.competitionProgress.number_event_completed}
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

CompetitionHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CompetitionHeader;
