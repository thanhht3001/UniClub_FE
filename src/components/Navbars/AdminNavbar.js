import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import classnames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import { useAuth } from 'contexts/AuthContext.js';
// reactstrap components
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Navbar, NavItem, Nav, Container } from 'reactstrap';
import { useHistory } from 'react-router';
import { updateDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  const [fullname, setFullname] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function logoutBackEnd() {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/users/logout';
      const res = await updateDataByPath(path, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        return true;
      }
      return false;
    }
    return false;
  }

  const checkRole = () => {
    if (localStorage && localStorage.getItem('accessToken') && localStorage.getItem('roleID')) {
      const roleID = localStorage.getItem('roleID');
      switch (parseInt(roleID)) {
        case 1:
          return false;
        case 3:
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem('accessToken') !== null) {
        const jwtData = jwtDecode(localStorage.getItem('accessToken'));
        setFullname(jwtData.Fullname);
        setAvatar(jwtData.Avatar);
      }
    }
  });

  return (
    <>
      <Navbar
        className={classnames(
          'navbar-top navbar-expand border-bottom',
          { 'navbar-dark bg-gradient-warning': theme === 'dark' },
          { 'navbar-light bg-gradient-warning': theme === 'light' }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames('pr-3 sidenav-toggler', { active: sidenavOpen }, { 'sidenav-toggler-dark': theme === 'dark' })}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              {currentUser !== null && localStorage.getItem('accessToken') !== null && fullname !== null ? (
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={avatar} />
                      </span>
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">{fullname}</span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    {checkRole() ? (
                      <DropdownItem href="/admin/tuy-chinh-clb">
                        <i className="ni ni-single-02" />
                        <span>Chỉnh thông tin CLB</span>
                      </DropdownItem>
                    ) : (
                      <></>
                    )}
                    {checkRole() ? (
                      <DropdownItem href="/admin/tuy-chinh">
                        <i className="ni ni-settings-gear-65" />
                        <span>Tùy chỉnh</span>
                      </DropdownItem>
                    ) : (
                      <></>
                    )}
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={async () => {
                        logout();
                        if (localStorage) {
                          logoutBackEnd();
                          localStorage.clear('accessToken');
                          localStorage.clear('clubID');
                          localStorage.clear('universityID');
                          localStorage.clear('studentID');
                          history.push('/login');
                        }
                      }}
                    >
                      <i className="ni ni-user-run" />
                      <span>Đăng xuất</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <h2 />
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: 'dark',
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
};

export default AdminNavbar;
