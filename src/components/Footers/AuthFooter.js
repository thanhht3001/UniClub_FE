// reactstrap components
import { Link } from 'react-router-dom';
import { NavLink, Container, Row, Col, Card } from 'reactstrap';

function AuthFooter() {
  return (
    <>
      <Card className="mb-0">
        <span className="mask bg-gradient-warning opacity-3" />
        <footer className="py-5 cd-index" id="lien-he">
          <Container>
            <Row className="justify-content-xl-between">
              <Col className="my-2" md="2" lg="4">
                <Row>
                  <img alt="..." src={require('assets/img/brand/Logo with text.png').default} style={{ width: '120px', height: '120px' }} />
                </Row>
                <Row>
                  <span>Nền tảng quản lý thông tin sự kiện và cuộc thi của Câu Lạc Bộ </span>
                </Row>
              </Col>
              <Col className="my-2" md="2" lg="4">
                <Row>
                  <h2 className="font-weight-bold" style={{ padding: '0px 12px' }}>
                    Liên kết
                  </h2>
                </Row>
                <Row>
                  <NavLink to="/" tag={Link}>
                    <span>Đội ngũ phát triển</span>
                  </NavLink>
                </Row>
                <Row>
                  <NavLink to="/" tag={Link}>
                    <span>Điều khoản dịch vụ</span>
                  </NavLink>
                </Row>
                <Row>
                  <NavLink to="/" tag={Link}>
                    <span>Chính sách bảo mật</span>
                  </NavLink>
                </Row>
                <Row>
                  <NavLink to="/" tag={Link}>
                    <span>Liên hệ</span>
                  </NavLink>
                </Row>
              </Col>
              <Col className="my-2" md="2" lg="4">
                <Row>
                  <h2 className="font-weight-bold">Liên hệ</h2>
                </Row>
                <Row>
                  <span>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam</span>
                  <span>unicecflatform@gmail.com</span>
                </Row>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-xl-between">
              <div className="copyright text-muted text-center" style={{ margin: 'auto' }}>
                © {new Date().getFullYear()}{' '}
                <a className="font-weight-bold ml-1" href="/" target="_blank">
                  UNICEC
                </a>
                , FPT University
              </div>
            </Row>
          </Container>
        </footer>
      </Card>
    </>
  );
}

export default AuthFooter;
