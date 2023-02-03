import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';
import SystemUniversityBody from './components/SystemUniversityBody';

export default function SystemUniversityManager() {
  const [alert, setalert] = useState(false);
  const [universityList, setUniversityList] = useState(null);

  async function loadUniversityList(search, pageNumber) {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/universities/search`;
      const data = `pageSize=10&name=${search}&currentPage=${pageNumber}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'university');
      if (res && res.status === statusCode.success) {
        setUniversityList(res.data);
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
    if (universityList === null) {
      loadUniversityList('', 1);
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <SystemUniversityBody data={universityList} loadUniversityList={loadUniversityList} />
    </>
  );
}
