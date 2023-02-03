import React from 'react';
import IndexNavbar from './components/IndexNavbar.jsx';
import IndexHeader from 'components/Headers/IndexHeader.js';
import AuthFooter from 'components/Footers/AuthFooter.js';
import HomepageBody from './components';
import './css/styled.css';

function Homepage(props) {
  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <IndexNavbar {...props} />
      <div className="main-content">
        <IndexHeader />
        <HomepageBody />
      </div>
      <AuthFooter />
    </>
  );
}

export default Homepage;
