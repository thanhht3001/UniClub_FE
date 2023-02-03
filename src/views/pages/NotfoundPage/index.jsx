import React from 'react';
import LoginNavbar from '../LoginPage/component/LoginNavbar';
import NotfoundPageBody from './components/NotfoundPageBody';
import NotfoundPageHeader from './components/NotfoundPageHeader';

export default function NotfoundPage() {
  return (
    <>
      <LoginNavbar />
      <NotfoundPageHeader />
      <NotfoundPageBody />
    </>
  );
}
