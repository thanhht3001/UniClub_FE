import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import no_image from 'assets/img/icons/avatar/No_image_available.png';

// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  UncontrolledTooltip,
  Badge,
} from 'reactstrap';
import { convertDateToShowWithTime } from 'services/formatData';
import { useHistory } from 'react-router';
import { CompetitionStatus } from 'constants/competition.status';

export default function CompetitionDetailHeader(data) {
  const [status, setStatus] = useState(null);
  const history = useHistory();
  const covertDatePassed = (date) => {
    const ago = moment(date, 'YYYY-MM-DDThh:mm:ss').fromNow();
    return ago;
  };

  React.useEffect(() => {
    setStatus(data.competitionStatus);
  }, [data.competitionStatus]);

  const checkEditable = (status) => {
    if (status === 2 || status === 3 || status === 4 || status === 10 || status === 11 || status === 12) {
      return false;
    }
    return true;
  };

  const convertStatusOutput = (status) => {
    let output = { text: '', status: 0 };
    switch (status) {
      case 4:
        output.text = 'Kết thúc vòng thi cuối';
        output.status = 10;
        break;
      case 6:
        output.text = 'Yêu cầu xét duyệt';
        output.status = 7;
        break;
      case 8:
        output.text = 'Công khai';
        output.status = 5;
        break;
      case 10:
        output.text = 'Hoàn tất cuộc thi';
        output.status = 11;
        break;
      case 12:
        output.text = 'Khôi phục cuộc thi';
        output.status = 6;
        break;
    }
    return output;
  };

  return (
    <>
      <div className="header header-dark bg-neutral pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                  <BreadcrumbItem>
                    <a className="text-default font-weight-bold" href="/admin/thong-tin-clb">
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a className="text-default font-weight-bold" href="/admin/cuoc-thi">
                      Danh sách
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active" style={{ color: 'grey' }}>
                    Chi tiết
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    <Badge color="success">{CompetitionStatus[data.data.status]}</Badge>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    <span className={data.data.number_of_team === 0 ? 'text-danger' : 'text-info'}>
                      {data.data.number_of_team === 0 ? '@Sự kiện' : '@Cuộc thi'}
                    </span>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                {parseInt(status) === 6 || parseInt(status) === 7 ? (
                  <></>
                ) : (
                  <Button size="sm" outline color="primary" onClick={() => history.push(`/admin/hoat-dong/chi-tiet/${data.data.id}`)}>
                    Danh sách hoạt động
                  </Button>
                )}
                <Button className="btn-info" color="info" size="sm" outline onClick={() => data.handleShopStatusHistory()}>
                  Lịch sử trạng thái
                </Button>
                {checkEditable(status) ? (
                  <>
                    {parseInt(status) !== 7 ? (
                      <Button
                        className="btn-success"
                        color="success"
                        size="sm"
                        outline
                        onClick={() => {
                          if (parseInt(status) === 9) {
                            data.setRestoreForm(true);
                          } else history.push(`/admin/cuoc-thi/chi-tiet/chinh-sua/${data.data.id}`);
                        }}
                      >
                        {parseInt(status) === 9 ? 'Khôi phục' : 'Chỉnh sửa'}
                      </Button>
                    ) : (
                      <Button
                        className="btn-success"
                        color="info"
                        size="sm"
                        outline
                        onClick={() => {
                          if (localStorage && localStorage.getItem('accessToken')) {
                            const accessToken = localStorage.getItem('accessToken');
                            const clubID = localStorage.getItem('clubID');
                            data.updatePendingCompetition(accessToken, clubID, 6);
                          }
                        }}
                      >
                        Hủy xét duyệt
                      </Button>
                    )}
                    {parseInt(status) !== 12 ? (
                      <Button className="btn-warning" color="warning" size="sm" outline onClick={() => data.handleRemoveCompetition(data.data.id)}>
                        Hủy bỏ
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {status && parseInt(status) === 12 ? (
                  <Button
                    className="btn-warning"
                    color="warning"
                    size="sm"
                    outline
                    onClick={() => {
                      if (localStorage && localStorage.getItem('accessToken')) {
                        const accessToken = localStorage.getItem('accessToken');
                        const clubID = localStorage.getItem('clubID');
                        data.updatePendingCompetition(accessToken, clubID, 6);
                      }
                    }}
                  >
                    Khôi phục
                  </Button>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            {data.data ? (
              <Row>
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

                          <Badge
                            color="success"
                            pill
                            style={{ marginLeft: '10px', fontFamily: 'revert-layer', fontWeight: '800', paddingTop: '7px' }}
                          >
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
                    <Row className="text-left">
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
                    <Row className="text-left mt-2">
                      <Col className="col-auto">
                        <i className="fas fa-info-circle text-danger" style={{ marginTop: '3px' }} />
                      </Col>
                      <Col className="col-auto">
                        <Row>
                          <span style={{ fontWeight: '900', fontFamily: 'revert' }}>
                            Trạng thái: <span className="text-success">{CompetitionStatus[data.data.status]}</span>
                          </span>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        {status &&
                        (parseInt(status) === 6 ||
                          parseInt(status) === 4 ||
                          parseInt(status) === 8 ||
                          parseInt(status) === 10 ||
                          parseInt(status) === 12) ? (
                          <Col className="col-auto">
                            <Button
                              className="btn-icon mb-2"
                              color="success"
                              type="button"
                              style={{ margin: 'auto' }}
                              onClick={() => {
                                if (localStorage && localStorage.getItem('accessToken')) {
                                  const accessToken = localStorage.getItem('accessToken');
                                  const clubID = localStorage.getItem('clubID');
                                  data.updatePendingCompetition(accessToken, clubID, convertStatusOutput(status).status);
                                }
                              }}
                            >
                              <span className="btn-inner--icon mr-1">
                                <i className="fas fa-share" />
                              </span>
                              {convertStatusOutput(status).text}
                            </Button>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
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
              </Row>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
