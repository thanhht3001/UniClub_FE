import React from 'react';
// react library for routing
import { useLocation, Route, Switch, Redirect, useHistory } from 'react-router-dom';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes/routes_admin.js';

function University() {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const history = useHistory();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    if (checkRole()) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/university') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSidenavOpen(!sidenavOpen);
  };

  const checkRole = () => {
    if (localStorage && localStorage.getItem('accessToken') && localStorage.getItem('roleID')) {
      const roleID = localStorage.getItem('roleID');
      switch (parseInt(roleID)) {
        case 1:
          return true;
        case 3:
          history.push('/admin/thong-tin-clb');
          return false;
        default:
          return false;
      }
    }
    history.push('/404-not-found');
    return false;
  };

  return (
    <>
      {checkRole() ? (
        <>
          <Sidebar
            routes={routes}
            toggleSidenav={toggleSidenav}
            sidenavOpen={sidenavOpen}
            logo={{
              innerLink: '/',
              imgSrc: require('assets/img/brand/Logo text ngang.png').default,
              imgAlt: '...',
            }}
          />
          <div className="main-content" ref={mainContentRef}>
            <AdminNavbar toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} brandText={getBrandText(location.pathname)} />
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/university/quan-ly-clb" />
            </Switch>
            <AdminFooter />
          </div>
          {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default University;
