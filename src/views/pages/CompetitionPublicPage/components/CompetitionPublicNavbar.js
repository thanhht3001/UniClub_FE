// react library for routing
import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col, Button, UncontrolledTooltip } from 'reactstrap';
import { useHistory } from 'react-router';

function CompetitionPublicNavbar() {
  const history = useHistory();
  return (
    <>
      <Navbar className="fixed-top navbar-horizontal bg-gradient-white" expand="lg" id="navbar-main">
        <Container>
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require('assets/img/brand/Logo.png').default} style={{ height: '50px', width: '50px' }} />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <i className="fas fa-bars" />
          </button>
          <UncontrolledCollapse className="navbar-custom-collapse" navbar toggler="#navbar-collapse">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/admin/thong-tin-clb">
                    <img alt="..." src={require('assets/img/brand/Logo text ngang.png').default} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
              <Row style={{ marginTop: '25px' }}>
                <Col className="collapse-brand" xs="6">
                  <Button className="btn-default btn-icon" href="/auth/login">
                    <span className="btn-inner--icon">
                      <i className="fas fa-sign-in-alt mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Đăng nhập</span>
                  </Button>
                </Col>
              </Row>
            </div>
            <Nav className="navigation-index mr-auto" id="cd-index-nav" navbar>
              <NavItem>
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    history.push('/', 'UNICEC');
                  }}
                  to="#UNICEC"
                  data-number="1"
                  tag={Link}
                >
                  <span style={{ fontSize: '20px', fontWeight: '900' }}>UNICEC</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    history.push('/', 'gioi-thieu');
                  }}
                  to="#gioi-thieu"
                  data-number="2"
                  tag={Link}
                >
                  <span style={{ fontSize: '20px', fontWeight: '900' }}>Giới thiệu</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    history.push('/', 'tinh-nang');
                  }}
                  to="#tinh-nang"
                  data-number="3"
                  tag={Link}
                >
                  <span style={{ fontSize: '20px', fontWeight: '900' }}>Tính năng</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} data-number="4" to="/cuoc-thi-va-su-kien">
                  <span className="text-blue" style={{ fontSize: '20px', fontWeight: '900' }}>
                    Cuộc thi và sự kiện
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-4" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" href="https://www.facebook.com/" id="tooltip601201423" target="_blank">
                  <i className={'fab fa-facebook-square fa-2x'} />
                  <span className="nav-link-inner--text d-lg-none">Facebook</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Trang Fanpage
                </UncontrolledTooltip>
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                {localStorage.getItem('accessToken') && localStorage.getItem('clubID') ? (
                  <Button className="btn-neutral btn-icon" color="default" href="/admin/thong-tin-clb">
                    <span className="btn-inner--icon">
                      <i className="fas fa-sign-in-alt mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Trang quản lý</span>
                  </Button>
                ) : (
                  <Button className="btn-neutral btn-icon" color="default" href="/login">
                    <span className="btn-inner--icon">
                      <i className="fas fa-sign-in-alt mr-2" />
                    </span>
                    <span className="nav-link-inner--text">Đăng nhập</span>
                  </Button>
                )}
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CompetitionPublicNavbar;
