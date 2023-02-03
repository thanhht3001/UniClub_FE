/*eslint-disable*/
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

function AdminFooter() {
  return (
    <>
      <Container fluid>
        <footer className="footer pt-0">
          <Row className="align-items-center justify-content-lg-between">
            <Col lg="6">
              <div className="copyright text-center text-lg-left text-muted">
                © {new Date().getFullYear()}{' '}
                <a className="font-weight-bold ml-1" href="/" target="_blank">
                  UniCEC
                </a>
              </div>
            </Col>
            <Col lg="6">
              <Nav className="nav-footer justify-content-center justify-content-lg-end">
                <NavItem>
                  <NavLink href="/" target="_blank">
                    Fanpage
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" target="_blank">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" target="_blank">
                    Contact
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" target="_blank">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}

export default AdminFooter;
