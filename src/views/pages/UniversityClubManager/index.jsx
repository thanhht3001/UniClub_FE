import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import UniversityClubBody from './components/UniversityClubBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';
import { Modal } from 'reactstrap';
import UniversityClubDetail from './components/UniversityClubDetail';
import CreateClubForm from './components/CreateClubForm';
import { newDateConvertToFormat } from 'services/formatData';
import { createDataByPath } from 'services/data.service';

export default function UniversityClubManager() {
  const [clubs, setClubs] = useState(null);
  const [clubDetail, setClubDetail] = useState(null);
  const [clubModal, setClubModal] = useState(false);
  const [createClubModal, setCreateClubModal] = useState(false);
  const [alert, setalert] = useState(false);

  async function loadListClub(search, currentPage) {
    if (currentPage && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const universityID = localStorage.getItem('universityID');
      const path = 'api/v1/clubs/search';
      const data = `universityId=${universityID}&name=${search}&status=true&currentPage=${currentPage}&pageSize=10`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setClubs(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadClubDetail(id) {
    if (id && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/clubs/${id}`;
      const res = await getDataByPath(path, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        setClubDetail(res.data);
        setClubModal(true);
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

  const convertDataToCreate = (user_id, name, description, image, club_fanpage, club_contact) => {
    const universityID = localStorage.getItem('universityID');
    let avatar = image;
    if (avatar && avatar !== '') {
      avatar = avatar.split(',');
    }
    const data = {
      user_id: parseInt(user_id),
      university_id: parseInt(universityID),
      name: name,
      description: description,
      image: avatar[1],
      founding: newDateConvertToFormat(new Date()),
      status: true,
      club_fanpage: club_fanpage,
      club_contact: club_contact,
    };
    return data;
  };

  const checkValidation = (user_id, name) => {
    if (user_id === -1) {
      warningAlert('Vui l??ng b??? nhi???m ch??? nhi???m c??u l???c b???');
      return false;
    } else if (name.trim() === '') {
      warningAlert('T??n c??u l???c b??? kh??ng ???????c b??? tr???ng');
      return false;
    } else if (name.trim().length < 4 || name.trim().length > 50) {
      warningAlert('T??n c??u l???c n???m trong kho???ng 4 ?????n 50 k?? t???');
      return false;
    }
    return true;
  };

  async function createClub(user_id, name, description, image, club_fanpage, club_contact) {
    if (checkValidation(user_id, name) && localStorage && localStorage.getItem('accessToken')) {
      const data = convertDataToCreate(user_id, name, description, image, club_fanpage, club_contact);
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/clubs';
      const res = await createDataByPath(path, accessToken, data);
      console.log(res);
      console.log(data);
      if (res && res.status === statusCode.success) {
        successAlert('T???o c??u l???c b??? th??nh c??ng');
        loadListClub('', 1);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  useEffect(() => {
    if (clubs === null) {
      loadListClub('', 1);
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <UniversityClubBody clubs={clubs} loadListClub={loadListClub} loadClubDetail={loadClubDetail} setCreateClubModal={setCreateClubModal} />
      <Modal className="modal-dialog-centered" size="lg" isOpen={clubModal} toggle={() => setClubModal(false)}>
        <div className="modal-body p-0">
          <UniversityClubDetail data={clubDetail} setClubModal={setClubModal} />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="lg" isOpen={createClubModal}>
        <div className="modal-body p-0">
          <CreateClubForm createClub={createClub} setCreateClubModal={setCreateClubModal} />
        </div>
      </Modal>
    </>
  );
}
