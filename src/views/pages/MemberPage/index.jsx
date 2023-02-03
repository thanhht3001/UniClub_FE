import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service.js';
import ClubMember from './components/ClubMember.jsx';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import SimpleHeader from 'components/Headers/SimpleHeader';
import { Modal } from 'reactstrap';
import ClubMemberDetail from './components/ClubMemberDetail.jsx';
import { warningAlertConstants } from 'constants/alert.constants.js';
import MemberPending from './components/MemberPending.jsx';
import { updateDataByPath } from 'services/data.service.js';
import { deleteDataByPath } from 'services/data.service.js';

function MemberPage() {
  const [alert, setAlert] = useState(null);
  const [members, setMembers] = useState(null);
  const [memberModal, setMemberModal] = useState(false);
  const [pendingModal, setPendingModal] = useState(false);
  const [memberDetail, setMemberDetail] = useState(null);
  const [memberPending, setMemberPending] = useState(null);

  const warningAlert = (message) => {
    setAlert(
      <ReactBSAlert
        danger
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const successAlert = (message) => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const annoucementAlert = (id) => {
    setAlert(
      <ReactBSAlert
        info
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc muốn loại bỏ thành viên này khỏi câu lạc bộ"
        onConfirm={() => {
          removeMember(id);
          setAlert(null);
        }}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Đồng ý"
        showCancel={true}
        cancelBtnBsStyle="default"
        cancelBtnText="Hủy bỏ"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  async function loadDataMemberPending() {
    if (localStorage && localStorage.getItem('accessToken')) {
      setMemberPending(null);
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = `api/v1/members/search`;
      const data = `status=0&clubId=${clubId}&pageSize=10`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        if (res.data.items?.length > 0) {
          setMemberPending(res.data.items);
        } else setMemberPending([]);
      }
    }
  }

  async function loadDataMember(page, search) {
    if (page && localStorage && localStorage.getItem('accessToken')) {
      setMembers(null);
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = `api/v1/members/search`;
      const data = `status=1&clubId=${clubId}&pageSize=10&currentPage=${page}&searchString=${search}`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        setMembers(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function updateStatusPending(member_id, status) {
    if (member_id && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = `api/v1/members/confirm-member`;
      const data = {
        member_id: member_id,
        club_id: parseInt(clubId),
        status: status,
      };
      const res = await updateDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        loadDataMember(1, '');
        successAlert('Thực hiện thành công');
        loadDataMemberPending();
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDataMemberDetail(accessToken, id) {
    if (accessToken) {
      const path = `api/v1/members/${id}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        setMemberDetail(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function removeMember(id) {
    if (id) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/members`;
      const res = await deleteDataByPath(`${path}`, accessToken, id);
      console.log(res);
      if (res && res.status === 204) {
        successAlert('Xóa thành viên thành công');
        setMemberModal(false);
        loadDataMember(1, '');
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function updateMemberRole(id, roleId) {
    if (id) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/members`;
      const data = {
        id: id,
        club_role_id: roleId,
      };
      const res = await updateDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        loadDataMemberDetail(accessToken, id);
        loadDataMember(1, '');
        successAlert('Cập nhật chức vụ thành công');
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const viewMemberDetail = (id) => {
    setMemberDetail(null);
    setMemberModal(true);
    if (id) {
      if (localStorage && localStorage.getItem('accessToken')) {
        const accessToken = localStorage.getItem('accessToken');
        loadDataMemberDetail(accessToken, id);
      }
    }
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      if (members === null) {
        loadDataMember(1, '');
      }
      if (memberPending === null) {
        loadDataMemberPending();
      }
    }
  }, []);

  return (
    <>
      {alert}
      <SimpleHeader name="Thành viên" parentName="Câu lạc bộ" linkParent="/" />
      <ClubMember
        data={members}
        viewMemberDetail={viewMemberDetail}
        loadDataMember={loadDataMember}
        setPendingModal={setPendingModal}
        annoucementAlert={annoucementAlert}
      />
      <Modal className="modal-dialog-centered" size="lg" isOpen={memberModal} toggle={() => setMemberModal(false)}>
        <div className="modal-body p-0">
          <ClubMemberDetail
            data={memberDetail}
            setMemberModal={setMemberModal}
            updateMemberRole={updateMemberRole}
            annoucementAlert={annoucementAlert}
          />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="lg" isOpen={pendingModal} toggle={() => setPendingModal(false)}>
        <div className="modal-body p-0">
          <MemberPending setPendingModal={setPendingModal} memberPending={memberPending} updateStatusPending={updateStatusPending} />
        </div>
      </Modal>
    </>
  );
}

export default MemberPage;
