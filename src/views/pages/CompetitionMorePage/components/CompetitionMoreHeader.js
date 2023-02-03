import React from 'react';
// reactstrap components
import { Container, Row, Col, Card } from 'reactstrap';

function CompetitionMoreHeader(props) {
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
            </Card>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CompetitionMoreHeader;
