import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';
import SystemUserBody from './components/SystemUserBody';

export default function SystemUserManager() {
  const [users, setUsers] = useState(null);
  const [alert, setalert] = useState(false);

  async function loadUsers(search, currentPage) {
    if (currentPage && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/users/search';
      const data = `searchString=${search}&currentPage=${currentPage}&pageSize=10`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setUsers(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  useEffect(() => {
    if (users === null) {
      loadUsers('', 1);
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <SystemUserBody users={users} loadUsers={loadUsers} />
    </>
  );
}
