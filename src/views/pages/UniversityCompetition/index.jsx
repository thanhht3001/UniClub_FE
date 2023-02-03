import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useState } from 'react';
import { updateDataByPath } from 'services/data.service';
import { getDataByPath } from 'services/data.service';
import UniversityCompetitionBody from './components/UniversityCompetitionBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import Loading from '../components/Loading';
import { Modal } from 'reactstrap';

export default function UniversityCompetition() {
  const [competitions, setCompetitions] = useState(null);
  const [search, setSearch] = useState('');
  const [formModal, setFormModal] = useState(false);
  const [alert, setalert] = useState(null);

  async function loadListCompetitions(keyword) {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/competitions/university-admin';
      const data = `pageSize=20&name=${keyword}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (res.data && res.data.items && res.data.items.length > 0) {
          setCompetitions(res.data.items);
        } else {
          setCompetitions([]);
        }
      }
    }
  }

  async function updateCompetitionsStatus(competitionID, action) {
    console.log(competitionID);
    setFormModal(true);
    if (localStorage && localStorage.getItem('accessToken') && competitionID) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/competitions/university-admin';
      let status = 6;
      if (parseInt(action) === 1) {
        status = 8;
      }
      const data = {
        id: competitionID,
        status: status,
      };
      console.log(data);
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        successAlert(action === 1 ? 'Chấp thuận thành công' : 'Từ chối thành công');
        loadListCompetitions(search);
      } else {
        warningAlert('Có lỗi xảy ra khi thực hiện hành động');
      }
    }
    setFormModal(false);
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

  const updateAlert = (competitionID, status) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Cảnh báo"
        onConfirm={() => {
          updateCompetitionsStatus(competitionID, status);
          setalert(null);
        }}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="info"
        confirmBtnText="Có"
        showCancel={true}
        cancelBtnBsStyle="default"
        cancelBtnText="Không"
      >
        {status === 1
          ? 'Bạn có chắc chắn muốn chấp thuận cuộc thi hoặc sự kiện này không ?'
          : 'Bạn có chắc chắn muốn từ chối cuộc thi hoặc sự kiện này không ?'}
      </ReactBSAlert>
    );
  };

  const successAlert = (message) => {
    setalert(
      <ReactBSAlert
        success
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

  React.useEffect(() => {
    if (competitions === null) {
      loadListCompetitions(search);
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <UniversityCompetitionBody
        competitions={competitions}
        updateAlert={updateAlert}
        search={search}
        setSearch={setSearch}
        loadListCompetitions={loadListCompetitions}
      />
      <Modal className="modal-dialog-centered" size="sm" isOpen={formModal}>
        <div className="modal-body p-0 bg-transparent">
          <Loading style={{ margin: 'auto' }} />
        </div>
      </Modal>
    </>
  );
}
