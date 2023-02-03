import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router';
import { Badge, Button, Card, CardBody, CardHeader, CardImg, CardTitle, Col, Container, Modal, Row, UncontrolledTooltip } from 'reactstrap';
import { covertDatePassed } from 'services/formatData';
import { convertDateToShowWithTime } from 'services/formatData';
import AddClubModal from './AddClubModal';

export default function CompetitionDetailBody(data) {
  const [clubModal, setClubModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [clubInCompetition, setClubInCompetition] = useState(null);
  const history = useHistory();

  const convertFee = (fee) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(fee);
  };

  const checkEditStatus = () => {
    if (status === 6 || status === 8) {
      return false;
    }
    return true;
  };

  const checkShowTeam = () => {
    if (status === 0 || status === 1) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    setStatus(data.competitionStatus);
  }, [data.competitionStatus]);

  React.useEffect(() => {
    setClubInCompetition(data.competitionClubs);
    console.log(data.competitionClubs);
  }, [data.competitionClubs]);

  return (
    <>
      <Container className="mt--6" fluid>
        {data.data ? (
          <Row className="justify-content-center">
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
            <Col className="card-wrapper" lg="4">
              <Card style={{ position: 'sticky', top: '10px' }}>
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
                  {clubInCompetition && clubInCompetition.length > 0 ? (
                    <Row className="align-items-center mb-3">
                      {clubInCompetition.map((e, value) => {
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
                  {status && !checkEditStatus() && status ? (
                    <Button className="mb-2" color="info" size="sm" outline onClick={() => setClubModal(true)}>
                      Quản lý câu lạc bộ
                    </Button>
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
                  {data.data.seeds_point !== 0 ? (
                    <CardTitle className="mb-0">
                      <h3>
                        Hạt giống thưởng:{' '}
                        <span className="text-success">
                          {data.data.seeds_point} <i className="fas fa-seedling" />
                        </span>
                      </h3>
                    </CardTitle>
                  ) : (
                    <></>
                  )}
                  <CardTitle className="mb-0">
                    <h3>
                      Quy mô:{' '}
                      <span className="text-warning">
                        {data.data.scope === 0 ? 'Liên trường' : data.data.scope === 1 ? 'Trong trường' : 'Trong câu lạc bộ'}
                      </span>
                    </h3>
                  </CardTitle>
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
                  {checkShowTeam() ? (
                    <>
                      <CardTitle className="mb-0" style={{ marginTop: '10px' }}>
                        <h3>
                          Số thành viên đã đăng ký: <span className="text-warning">{data.data.number_of_participant_join} người</span>
                        </h3>
                      </CardTitle>
                      {data.data.number_of_team === 0 ? (
                        <CardTitle className="mb-0" style={{ marginTop: '10px' }}>
                          <h3>
                            Số đăng ký cần để bắt đầu:{' '}
                            <span
                              className={data.data.min_team_or_participant > data.data.number_of_participant_join ? 'text-warning' : 'text-success'}
                            >
                              {data.data.min_team_or_participant} người
                            </span>
                          </h3>
                        </CardTitle>
                      ) : (
                        <CardTitle className="mb-0" style={{ marginTop: '10px' }}>
                          <h3>
                            Số nhóm:{' '}
                            <span className={data.data.min_team_or_participant > data.data.number_of_team ? 'text-warning' : 'text-success'}>
                              {data.data.number_of_team !== -1 ? data.data.number_of_team : 0} nhóm
                            </span>{' '}
                            {data.data.min_team_or_participant > data.data.number_of_team ? (
                              <span className="text-blue">(cần {data.data.min_team_or_participant} ít nhất nhóm để bắt đầu.)</span>
                            ) : (
                              <></>
                            )}
                          </h3>
                        </CardTitle>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <Row className="align-items-center justify-content-lg-between mt-3 ml-3">
                    {data.data.number_of_team !== 0 ? (
                      <>
                        <Col md="6">
                          <Button
                            className="btn-icon mb-2"
                            color="warning"
                            type="button"
                            style={{ margin: 'auto' }}
                            onClick={() => {
                              history.push(`/admin/cuoc-thi/chi-tiet/quan-ly-nhom/${data.data.id}`, { isEvent: false });
                            }}
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="fas fa-users" />
                            </span>
                            Quản lý nhóm
                          </Button>
                        </Col>

                        <Col md="6">
                          <Button
                            className="btn-icon mb-2"
                            color="success"
                            type="button"
                            style={{ margin: 'auto' }}
                            onClick={() => {
                              history.push(`/admin/cuoc-thi/chi-tiet/vong-thi/${data.data.id}`);
                            }}
                          >
                            <span className="btn-inner--icon mr-1">
                              <i className="fas fa-flag" />
                            </span>
                            {parseInt(status) === 2 || parseInt(status) === 3 || parseInt(status) === 4 || parseInt(status) === 10
                              ? 'Cập nhật điểm'
                              : parseInt(status) === 11
                              ? 'Xem kết quả'
                              : 'Quản lý vòng thi'}
                          </Button>
                        </Col>
                      </>
                    ) : (
                      <Col className="text-center" md="12">
                        <Button
                          className="btn-icon mb-2"
                          color="warning"
                          type="button"
                          style={{ margin: 'auto' }}
                          onClick={() => {
                            history.push(`/admin/cuoc-thi/chi-tiet/quan-ly-nhom/${data.data.id}`, { isEvent: true });
                          }}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fas fa-users" />
                          </span>
                          Quản lý đăng ký
                        </Button>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
      <Modal className="modal-dialog-centered" size="lg" isOpen={clubModal} toggle={() => setClubModal(false)}>
        <div className="modal-body p-0">
          <AddClubModal
            handleRemoveClub={data.handleRemoveClub}
            clubInCompetition={clubInCompetition}
            setClubModal={setClubModal}
            addClubToCompetition={data.addClubToCompetition}
          />
        </div>
      </Modal>
    </>
  );
}
