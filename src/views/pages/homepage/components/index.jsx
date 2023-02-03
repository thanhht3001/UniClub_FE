import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Badge, Card, CardBody, Container, Row, Col, UncontrolledTooltip } from 'reactstrap';
import ScrollReveal from 'scrollreveal';

function HomepageBody() {
  React.useEffect(() => {
    ScrollReveal().reveal('.gioithieu', { origin: 'bottom' });
    ScrollReveal().reveal('.thetinhnang', { origin: 'bottom' });
    ScrollReveal().reveal('.caulacbo', { origin: 'bottom' });
    ScrollReveal().reveal('.cuocthi', { origin: 'bottom' });
    ScrollReveal().reveal('.thanhvien', { origin: 'bottom' });
    ScrollReveal().reveal('.nentang', { origin: 'bottom' });
  }, []);

  return (
    <>
      <div className="cd-index" id="gioi-thieu">
        <section className="py-6 pb-9 bg-warning">
          <Container className="gioithieu" fluid style={{ paddingTop: '50px' }}>
            <Row className="justify-content-center text-center">
              <Col md="8">
                <h2 className="display-4 text-white font-weight-bold" style={{}}>
                  Giải pháp hoàn hảo cho quản lý câu lạc bộ và cuộc thi
                </h2>
                <p className="lead text-white" style={{ fontWeight: '300' }}>
                  UNICEC là một nền tảng giúp bạn quản lý các thành viên trong câu lạc bộ về các mặt như tuyển thành viên, thông báo và tổ chức hoạt
                  động trong câu lạc bộ. Không chỉ thế đây còn là một sân chơi dành cho các bạn muốn tham gia những cuộc thi được tổ chức và tài trợ
                  bởi các trường đại học hoặc các nhà tài trợ đến từ nhiều doanh nghiệp khác nhau.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12" className="thetinhnang">
                <Row>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">Quản lý câu lạc bộ</h4>
                        <p className="description mt-3">Hỗ trợ quản lý thành viên và hoạt động cho các chủ nhiệm câu lạc bộ.</p>
                        <div>
                          <Badge color="info" pill>
                            CLUB
                          </Badge>
                          <Badge color="info" pill>
                            Nhóm
                          </Badge>
                          <Badge color="info" pill>
                            Hoạt động
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="ni ni-trophy" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">Tổ chức và quản lý cuộc thi</h4>
                        <p className="description mt-3">Hỗ trợ tạo và quản lý các cuộc thi và sự kiện trong và ngoài trường.</p>
                        <div>
                          <Badge color="success" pill>
                            Cuộc thi
                          </Badge>
                          <Badge color="success" pill>
                            Sự kiện
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                          <i className="ni ni-circle-08" />
                        </div>
                        <h4 className="h3 text-warning text-uppercase">Hỗ trợ thành viên câu lạc bộ</h4>
                        <p className="description mt-3">Các thành viên sẽ dễ dàng tiếp cận các thông tin và hoạt đông trong câu lạc bộ.</p>
                        <div>
                          <Badge color="warning" pill>
                            Thành viên
                          </Badge>
                          <Badge color="warning" pill>
                            Ứng tuyển
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <div className="cd-index" id="tinh-nang">
        <section className="py-6">
          <Container className="caulacbo">
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img alt="..." className="img-fluid" src={require('assets/img/icons/club_manager.png').default} />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Quản lý câu lạc bộ</h1>
                  <p>Hỗ trợ quản lý thành viên và hoạt động cho các chủ nhiệm câu lạc bộ.</p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-settings-gear-65" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Dễ dàng theo dõi thành viên</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-ruler-pencil" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Chia hoạt động cho các thành viên nhanh hơn</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-send" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">Hỗ trợ hệ thống tạo phiếu cho việc duyệt thành viên</h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container className="cuocthi">
            <Row className="row-grid align-items-center">
              <Col md="6">
                <img alt="..." className="img-fluid" src={require('assets/img/icons/event_host.png').default} />
              </Col>
              <Col md="6">
                <div className="pr-md-5">
                  <h1>Tổ chức và quản lý cuộc thi</h1>
                  <p>Hỗ trợ tạo và quản lý các cuộc thi và sự kiện trong và ngoài trường.</p>
                  <p>Cùng với nhiều giải thưởng hấp dẫn cho người tham dự.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container className="thanhvien">
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img alt="..." className="img-fluid" src={require('assets/img/icons/support_member.png').default} />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Hỗ trợ thành viên câu lạc bộ</h1>
                  <p>Các thành viên sẽ dễ dàng tiếp cận các thông tin và hoạt đông trong câu lạc bộ.</p>
                  <p>Nhận về cho bản thân điểm rèn luyện trong thi đua.</p>
                  <Link
                    className="font-weight-bold text-info mt-5"
                    to="https://firebasestorage.googleapis.com/v0/b/unics-e46a4.appspot.com/o/assets%2Funicec.apk?alt=media&token=8c269141-a383-49c3-adf7-694948312a7a"
                  >
                    Tải ứng dụng ngay
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <section className="py-7">
        <Container className="nentang">
          <Row className="row-grid justify-content-center">
            <Col className="text-center" lg="10">
              <h2 className="display-3" style={{ color: '#fc4b2cc0' }}>
                Nền tảng quản lý Câu lạc bộ và cuộc thi đáng tin cậy nhất Việt Nam
                <span style={{ color: '#fcb928dd' }}>University Club&apos;s Events and Competitions Platform</span>
              </h2>
              <Row
                style={{
                  marginTop: '20px',
                  backgroundImage:
                    'url("https://img.freepik.com/free-vector/yellow-background-with-center-glowing-light-effect_1017-26185.jpg?w=2000")',
                  padding: '10px 10px 10px 10px',
                  borderStyle: 'groove',
                }}
              >
                <Col className="text-center" lg="4">
                  <Row className="text-center">
                    <h2 className="font-weight-bold" style={{ color: 'orange', margin: 'auto' }}>
                      10 lượt
                    </h2>
                  </Row>
                  <Row className="text-center">
                    <p className="font-weight-bold" style={{ margin: 'auto' }}>
                      Cài đặt
                    </p>
                  </Row>
                </Col>
                <Col className="text-center" lg="4">
                  <Row className="text-center">
                    <h2 className="font-weight-bold" style={{ color: 'orange', margin: 'auto' }}>
                      32
                    </h2>
                  </Row>
                  <Row className="text-center">
                    <p className="font-weight-bold" style={{ margin: 'auto' }}>
                      Người dùng hoạt động hằng ngày
                    </p>
                  </Row>
                </Col>
                <Col className="text-center" lg="4">
                  <Row className="text-center">
                    <h2 className="font-weight-bold" style={{ color: 'orange', margin: 'auto' }}>
                      8
                    </h2>
                  </Row>
                  <Row className="text-center">
                    <p className="font-weight-bold" style={{ margin: 'auto' }}>
                      Câu lạc bộ tham gia
                    </p>
                  </Row>
                </Col>
              </Row>
              <div className="text-center">
                <h4 className="display-4 mb-5 mt-5">Các trường đại học liên kết</h4>
                <Row className="justify-content-center">
                  <Col className="col-auto">
                    <a href="https://hcmuni.fpt.edu.vn/" id="tooltip1" target="blank">
                      <img
                        alt="..."
                        className="img-fluid rounded-circle md"
                        src="https://talentview.asia/wp-content/uploads/FPT-Logo.png"
                        style={{ backgroundColor: 'white', width: '100px', height: '100px' }}
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip1">
                      FPT University
                    </UncontrolledTooltip>
                  </Col>
                  <Col className="col-auto">
                    <a href="https://www.hutech.edu.vn/" id="tooltip2" target="blank">
                      <img
                        alt="..."
                        className="img-fluid rounded-circle md"
                        src="data:image/png;base64,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"
                        style={{ backgroundColor: 'white', width: '100px', height: '100px' }}
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip2">
                      Hutech
                    </UncontrolledTooltip>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomepageBody;
