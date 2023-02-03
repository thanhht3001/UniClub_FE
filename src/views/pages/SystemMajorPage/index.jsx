import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';
import SystemMajorBody from './components/SystemMajorBody';

export default function SystemMajorManager() {
  const [alert, setalert] = useState(false);
  const [majorList, setMajorList] = useState(null);

  async function loadMajorList(search, pageNumber) {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/majors/search`;
      const data = `pageSize=10&name=${search}&currentPage=${pageNumber}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'major');
      if (res && res.status === statusCode.success) {
        setMajorList(res.data);
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
    if (majorList === null) {
      loadMajorList('', 1);
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <SystemMajorBody data={majorList} loadMajorList={loadMajorList} />
    </>
  );
}
