import React from 'react';
import ReactQuill from 'react-quill';
import { Badge, Button, Card, CardBody, CardHeader, CardImg, CardTitle, Col, Container, Row, UncontrolledTooltip } from 'reactstrap';
import { covertDatePassed } from 'services/formatData';
import { convertDateToShowWithTime } from 'services/formatData';
import no_image from 'assets/img/icons/avatar/No_image_available.png';

export default function CompetitionPublicDetailBody(data) {
  const convertFee = (fee) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(fee);
  };
  return (
    <>
      <Container className="mt--7" fluid>
        {data.data ? (
          <Row>
            <Col className="text-left" md="4">
              <Card style={{ height: '100%' }}>
                {data.data.clubs_in_competition && data.data.clubs_in_competition.length > 0 ? (
                  data.data.clubs_in_competition.map((e, value) => {
                    if (e.is_owner) {
                      return (
                        <CardHeader key={`club-${value}`}>
                          <Row className="align-items-center">
                            <Col className="col-auto mb-0" style={{ padding: '0px 0px 0px 0px' }}>
                              <span className="avatar avatar-lg rounded-circle">
                                <img alt="..." src={e.image ? e.image : no_image} />
                              </span>
                            </Col>
                            <Col className="col-auto mb-0">
                              <h3 className="font-weight-bold" style={{ margin: 'auto', color: 'black' }}>
                                {e.name}
                              </h3>
                              <span className="text-lg" style={{ fontWeight: 'lighter', color: 'darkgrey' }}>
                                <i className="fas fa-globe-americas mr-1" />
                                {covertDatePassed(data.data.create_time)}
                              </span>
                            </Col>
                          </Row>
                        </CardHeader>
                      );
                    }
                  })
                ) : (
                  <></>
                )}
                <CardBody>
                  <CardTitle className="font-weight-bold text-default text-lg">Chuyên ngành:</CardTitle>
                  <Row className="align-items-center" style={{ marginBlock: '20px' }}>
                    {data.data.majors_in_competition && data.data.majors_in_competition.length > 0 ? (
                      data.data.majors_in_competition.map((ele, value) => {
                        return (
                          <Col className="col-auto" key={`major-${value}`}>
                            <Badge className="font-weight-bold" color="warning" pill style={{ fontFamily: 'sans-serif' }}>
                              {ele.name}
                            </Badge>
                          </Col>
                        );
                      })
                    ) : (
                      <Col className="text-center col-auto">
                        <Badge className="font-weight-bold" color="success" pill style={{ marginLeft: '10px', fontFamily: 'sans-serif' }}>
                          Tất cả
                        </Badge>
                      </Col>
                    )}
                  </Row>
                  {data.sponsor && data.sponsor.length > 0 ? (
                    <>
                      <CardTitle className="font-weight-bold text-default text-lg">Đơn vị tài trợ</CardTitle>
                      <Row className="align-items-center mb-0">
                        {data.sponsor.map((ele, value) => {
                          return (
                            <Col className="col-auto" key={`sponsor-${value}`}>
                              <a
                                href={ele.website.includes('http') ? ele.website : `https://${ele.website}`}
                                target="_blank"
                                id={`tooltip-sponsor${value}`}
                                rel="noreferrer"
                              >
                                <img
                                  alt="..."
                                  className="img-fluid rounded-circle md"
                                  src={ele.image_url ? ele.image_url : no_image}
                                  style={{ backgroundColor: 'white', width: '80px', height: '80px' }}
                                />
                              </a>
                              <UncontrolledTooltip delay={0} target={`tooltip-sponsor${value}`}>
                                {ele.name}
                                <br />
                                {ele.email}
                              </UncontrolledTooltip>
                            </Col>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col md="8" className="text-left">
              <Card style={{ padding: '25px 25px', height: '100%' }}>
                <Row>
                  <Col md="9" lg="9" sm="9">
                    <h2 className="display-4" style={{ color: 'red', fontWeight: 'bold' }}>
                      @ {data.data.competition_type_name}
                    </h2>
                  </Col>
                  <Col md="3" lg="3" sm="3" className="text-right">
                    <Badge
                      className="font-weight-bold"
                      color={data.data.fee !== 0 ? 'info' : 'success'}
                      pill
                      style={{ marginLeft: '10px', fontFamily: 'sans-serif' }}
                    >
                      {data.data.fee !== 0 ? 'Có phí tham gia' : 'Không phí tham gia'}
                    </Badge>
                  </Col>
                </Row>
                <Row className="text-left" style={{ marginBottom: '20px' }}>
                  <h3 className="display-3">{data.data.name}</h3>
                </Row>
                <Row className="text-left" style={{ marginBottom: '10px' }}>
                  <Col className="col-auto">
                    <i className="far fa-flag text-danger" style={{ marginTop: '3px' }} />
                  </Col>
                  <Col className="col-auto">
                    <Row>
                      <span style={{ fontWeight: '900' }}>Mở đăng ký: </span>
                      <span className="ml-1" style={{ fontWeight: '900', fontFamily: 'sans-serif' }}>
                        {convertDateToShowWithTime(data.data.start_time_register)}
                      </span>
                      <Badge color="success" pill style={{ marginLeft: '10px', fontFamily: 'revert-layer', fontWeight: '800', paddingTop: '7px' }}>
                        {covertDatePassed(data.data.start_time_register)}
                      </Badge>
                    </Row>
                  </Col>
                </Row>
                <Row className="text-left" style={{ marginBottom: '10px' }}>
                  <Col className="col-auto">
                    <i className="ni ni-calendar-grid-58 text-danger" style={{ marginTop: '3px' }} />
                  </Col>
                  <Col className="col-auto">
                    <Row>
                      <span style={{ fontWeight: '900' }}>Bắt đầu: </span>
                      <span className="ml-1" style={{ fontWeight: '900', fontFamily: 'sans-serif' }}>
                        {convertDateToShowWithTime(data.data.start_time)}
                      </span>
                      <Badge color="info" pill style={{ marginLeft: '10px', fontFamily: 'revert-layer', fontWeight: '800', paddingTop: '7px' }}>
                        {covertDatePassed(data.data.start_time)}
                      </Badge>
                    </Row>
                  </Col>
                </Row>
                <Row className="text-left mb-0">
                  <Col className="col-auto">
                    <i className="ni ni-compass-04 text-danger" style={{ marginTop: '3px' }} />
                  </Col>
                  <Col>
                    <Row>
                      <span style={{ fontWeight: '900', fontFamily: 'revert' }}>{data.data.address_name}</span>
                    </Row>
                    <Row>
                      <span style={{ fontWeight: '900', fontFamily: 'revert', color: 'grey' }}>{data.data.address}</span>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        {data.data ? (
          <Row className="justify-content-center mt-3">
            <Col className="card-wrapper mb-5" lg="4">
              <Card style={{ position: 'sticky', top: '120px' }}>
                <CardHeader>
                  <Row className="text-left" style={{ marginBottom: '20px' }}>
                    <h4 className="display-4">{data.data.name}</h4>
                  </Row>
                  <Row className="text-left" style={{ marginBottom: '10px' }}>
                    <Col className="col-auto">
                      <i className="ni ni-calendar-grid-58 text-danger" style={{ marginTop: '3px' }} />
                    </Col>
                    <Col className="col-auto">
                      <Row>
                        <span style={{ fontWeight: '900', fontFamily: 'sans-serif' }}>{convertDateToShowWithTime(data.data.start_time)}</span>

                        <Badge className="font-weight-bold" color="info" pill style={{ marginLeft: '10px', fontFamily: 'sans-serif' }}>
                          {covertDatePassed(data.data.start_time)}
                        </Badge>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="text-left" style={{ marginBottom: '20px' }}>
                    <Col className="col-auto">
                      <i className="ni ni-compass-04 text-danger" style={{ marginTop: '3px' }} />
                    </Col>
                    <Col>
                      <Row>
                        <span style={{ fontWeight: '900', fontFamily: 'revert' }}>{data.data.address_name}</span>
                      </Row>
                      <Row>
                        <span style={{ fontWeight: '900', fontFamily: 'revert', color: 'grey' }}>{data.data.address}</span>
                      </Row>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <CardTitle className="mb-0">
                    <h3>Các câu lạc bộ tham gia và tổ chức</h3>
                  </CardTitle>
                  {data.data && data.data?.clubs_in_competition.length > 0 ? (
                    <Row className="align-items-center mb-3">
                      {data.data?.clubs_in_competition.map((e, value) => {
                        return (
                          <Col className="col-auto" key={`club-${value}`}>
                            <a href="/" onClick={(e) => e.preventDefault()} id={`tooltip-${value}`} rel="noreferrer">
                              <img
                                alt="..."
                                className="img-fluid rounded-circle md"
                                src={e.image ? e.image : require('assets/img/icons/avatar/No_image_available.png').default}
                                style={{ backgroundColor: 'white', width: '60px', height: '60px' }}
                              />
                            </a>
                            <UncontrolledTooltip delay={0} target={`tooltip-${value}`}>
                              {e.is_owner === true ? `Câu lạc bộ tạo: ${e.name}` : `${e.name}`}
                            </UncontrolledTooltip>
                          </Col>
                        );
                      })}
                    </Row>
                  ) : (
                    <></>
                  )}
                  {data.data.fee !== 0 ? (
                    <CardTitle className="mb-0">
                      <h3>
                        Phí tham gia: <span className="text-success">{convertFee(data.data.fee)}</span>
                      </h3>
                    </CardTitle>
                  ) : (
                    <></>
                  )}
                  <CardTitle className="mb-0">
                    <h3>Vòng thi:</h3>
                  </CardTitle>
                  <Row>
                    <Col>
                      <Button color="info" outline size="sm" onClick={() => data.setRoundForm(true)}>
                        Các vòng thi
                      </Button>
                    </Col>
                  </Row>
                  {data.influencer && data.influencer.length > 0 ? (
                    <>
                      <CardTitle className="mb-0">
                        <h3>Ban giám khảo:</h3>
                      </CardTitle>
                      <Row className="align-items-center mb-3">
                        {data.influencer.map((ele, value) => {
                          return (
                            <Col className="col-auto mb-1" key={`influ-${value}`}>
                              <a
                                href="/"
                                id={`tooltip-influ${value}`}
                                onClick={(e) => {
                                  e.preventDefault(e);
                                }}
                              >
                                <img style={{ width: '50px', height: '50px' }} alt="..." className="img-fluid rounded-circle" src={ele.image_url} />
                              </a>
                              <UncontrolledTooltip delay={0} target={`tooltip-influ${value}`}>
                                {ele.name} <br />
                              </UncontrolledTooltip>
                            </Col>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                    <></>
                  )}
                  <CardTitle className="mb-0" style={{ marginTop: '10px' }}>
                    <h3>
                      Số thành viên đã đăng ký: <span className="text-warning">{data.data.number_of_participant_join} người</span>
                    </h3>
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col className="card-wrapper" lg="8">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="6">
                      <h3 className="mb-0">Thông tin cuộc thi</h3>
                    </Col>
                    <Col md="6" className="text-right">
                      <label
                        className="text-neutral mb-0 font-weight-bold text-sm"
                        style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px 5px', fontFamily: 'sans-serif' }}
                      >
                        Hạn cuối đăng ký: {convertDateToShowWithTime(data.data.end_time_register)}
                      </label>
                    </Col>
                  </Row>
                </CardHeader>
                {data.banner.length > 0 ? <CardImg alt="..." src={data.banner[0].image_url} /> : <></>}
                <CardBody>
                  <Row>
                    <Col md="12">
                      <ReactQuill
                        style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                        value={data.data.content}
                        theme="bubble"
                        readOnly
                      />
                    </Col>
                  </Row>
                  {data.data.view ? (
                    <span className="text-sm" style={{ color: 'gray' }}>
                      {data.data.view} lượt xem
                    </span>
                  ) : (
                    <></>
                  )}
                </CardBody>
                <Row></Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
