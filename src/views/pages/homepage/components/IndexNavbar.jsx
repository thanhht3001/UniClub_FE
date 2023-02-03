// react library for routing
/*eslint-disable*/
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col, UncontrolledTooltip, Button } from 'reactstrap';

function AdminNavbar(props) {
  const [navbarColor, setNavbarColor] = React.useState('bg-transparent');
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 30 || document.body.scrollTop > 30) {
        setNavbarColor('bg-neutral');
      } else if (document.documentElement.scrollTop < 30 || document.body.scrollTop < 30) {
        setNavbarColor('bg-transparent');
      }
    };

    var href = window.location.href.substring(window.location.href.lastIndexOf('#/') + 2);
    var hrefId = href.substring(href.lastIndexOf('#') + 1);
    if (props.location.state) {
      href = `home#${props.location.state}`;
      hrefId = props.location.state;
    }
    if (href.lastIndexOf('#') > 0) {
      document.getElementById(hrefId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
    const updateView = () => {
      var contentSections = document.getElementsByClassName('cd-index');
      var navigationItems = document.getElementById('cd-index-nav').getElementsByTagName('a');
      for (let i = 0; i < contentSections.length; i++) {
        var activeSection = parseInt(navigationItems[i].getAttribute('data-number'), 10) - 1;
        if (
          contentSections[i].offsetTop - window.innerHeight / 2 < window.pageYOffset &&
          contentSections[i].offsetTop + contentSections[i].scrollHeight - window.innerHeight / 2 > window.pageYOffset
        ) {
          navigationItems[activeSection].classList.add('text-blue');
        } else {
          navigationItems[activeSection].classList.remove('text-blue');
        }
      }
    };

    window.addEventListener('scroll', updateNavbarColor);
    window.addEventListener('scroll', updateView);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
      window.removeEventListener('scroll', updateView);
    };
  });

  React.useEffect(() => {
    const navigationItems = document.getElementById('cd-index-nav').getElementsByTagName('a');
    navigationItems[0].classList.add('text-blue');
  }, []);

  return (
    <>
      <Navbar className={classNames('fixed-top navbar-horizontal', navbarColor)} expand="lg" id="navbar-main">
        <Container>
          <NavbarBrand to="/admin/thong-tin-clb" tag={Link}>
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
                  {localStorage.getItem('accessToken') && (localStorage.getItem('clubID') || parseInt(localStorage.getItem('roleID')) === 1) ? (
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href={parseInt(localStorage.getItem('roleID')) === 1 ? 'university/quan-ly-clb' : '/admin/thong-tin-clb'}
                    >
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
                </Col>
              </Row>
            </div>
            <Nav className="navigation-index mr-auto" id="cd-index-nav" navbar>
              <NavItem>
                <NavLink
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('UNICEC').scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest',
                    });
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
                    document.getElementById('gioi-thieu').scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest',
                    });
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
                    document.getElementById('tinh-nang').scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest',
                    });
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
                  <span style={{ fontSize: '20px', fontWeight: '900' }}>Cuộc thi và sự kiện</span>
                </NavLink>
              </NavItem>
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-4" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" href="https://www.facebook.com/" id="tooltip601201423" target="_blank">
                  <i className="fab fa-facebook-square fa-2x" />
                  <span className="nav-link-inner--text d-lg-none">Facebook</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Trang Fanpage
                </UncontrolledTooltip>
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                {localStorage.getItem('accessToken') && (localStorage.getItem('clubID') || parseInt(localStorage.getItem('roleID')) === 1) ? (
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href={parseInt(localStorage.getItem('roleID')) === 1 ? 'university/quan-ly-clb' : '/admin/thong-tin-clb'}
                  >
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

export default AdminNavbar;
