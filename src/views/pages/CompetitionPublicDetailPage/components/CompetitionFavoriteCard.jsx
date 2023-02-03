import React from 'react';
import { Badge, Card, CardBody, CardHeader, CardImg, CardTitle, Col, Row } from 'reactstrap';
import { covertDatePassed } from 'services/formatData';
import { findCompetitionBanner } from 'services/formatData';
import { convertDateToShow } from 'services/formatData';
import styled from 'styled-components';

const CardHover = styled.div`
  :hover {
    transform: scale(1.03);
    box-shadow: 0 4px 6px rgb(50 50 93 / 25%), 0 1px 3px rgb(0 0 0 / 8%);
  }
`;

export default function CompetitionFavoriteCard(props) {
  return (
    <Card className="mt--7" style={{ position: 'sticky', top: '120px' }}>
      <CardHeader>
        <Row>
          <Col className="text-center">
            <h4 style={{ fontWeight: '700' }}>
              <i className="fas fa-thumbs-up text-success mr-3" />
              CÓ THỂ BẠN THÍCH
            </h4>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="12">
            {props.competitionFavorite && props.competitionFavorite.length > 0 ? (
              props.competitionFavorite.map((e, value) => {
                return (
                  <CardHover key={`cardFavor-${value}`} className="card">
                    <CardHeader style={{ fontFamily: 'inherit' }}>
                      <Row className="align-items-center mb-0">
                        <Col className="col-auto mb-0" style={{ padding: '0px 0px 0px 0px' }}>
                          <span className="avatar avatar-sm rounded-circle">
                            <img
                              alt="..."
                              src={
                                e.clubs_in_competition[0].image
                                  ? e.clubs_in_competition[0].image
                                  : require('assets/img/icons/avatar/No_image_available.png').default
                              }
                            />
                          </span>
                        </Col>
                        <div className="col mb-0">
                          <h6 className="text-sm font-weight-bold" style={{ margin: 'auto', color: 'black' }}>
                            {e.clubs_in_competition[0].name} ·{' '}
                            <span className="text-sm" style={{ fontWeight: 'lighter', color: 'darkgrey' }}>
                              <i className="fas fa-globe-americas mr-1" />
                              {covertDatePassed(e.create_time)}
                            </span>
                          </h6>
                        </div>
                      </Row>
                    </CardHeader>
                    <a href={`/cuoc-thi-va-su-kien/chi-tiet/${e.id}`}>
                      <CardImg
                        alt="..."
                        src={
                          e.competition_entities && e.competition_entities.length > 0
                            ? findCompetitionBanner(e.competition_entities)
                            : require('assets/img/icons/avatar/No_image_available.png').default
                        }
                        style={{ maxHeight: '250px' }}
                      />
                      <CardBody>
                        <Row>
                          <Col className="text-left" xl="6" md="6" xs="6">
                            <span style={{ fontFamily: 'cursive', color: 'lightsalmon' }}>@ {e.competition_type_name}</span>
                          </Col>
                          <Col className="text-right" xl="6" md="6" xs="6">
                            <label
                              className="text-neutral mb-0 font-weight-bold text-sm"
                              style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px 5px', fontFamily: 'cursive' }}
                            >
                              {convertDateToShow(e.start_time)}
                            </label>
                          </Col>
                        </Row>

                        <CardTitle className="h4 mb-2">{e.name}</CardTitle>
                        <Row>
                          <Col className="col-auto pl-0">
                            <Badge className="font-weight-bold" color={e.is_event ? 'danger' : 'default'} pill style={{ fontFamily: 'sans-serif' }}>
                              {e.is_event ? 'Sự Kiện' : 'Cuộc thi'}
                            </Badge>
                          </Col>
                          {e.is_sponsor === true ? (
                            <Col className="col-auto pl-0">
                              <Badge className="font-weight-bold" color="success" pill style={{ fontFamily: 'sans-serif' }}>
                                Tài trợ
                              </Badge>
                            </Col>
                          ) : (
                            <></>
                          )}
                          {e.status === 0 ? (
                            <Col className="col-auto pl-0">
                              <Badge className="font-weight-bold" color="success" pill style={{ fontFamily: 'sans-serif' }}>
                                Mở đăng ký
                              </Badge>
                            </Col>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </CardBody>
                    </a>
                  </CardHover>
                );
              })
            ) : props.competitionFavorite && props.competitionFavorite.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '250px', height: '250px' }} />
              </Col>
            ) : (
              <Col className="text-center" lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', maxWeight: '200px', maxHeight: '200px', weight: '100%', height: '100%' }}
                />
              </Col>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
