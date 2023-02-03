import UniversityHeader from 'components/Headers/UnicersityHeader';
import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { warningAlertConstants } from 'constants/alert.constants';
import { Modal } from 'reactstrap';
import UniversityDepartmentBody from './components/UniversityDepartmentBody';
import UniversityDepartmentDetail from './components/UniversityDepartmentDetail';
import AddDepartment from './components/AddDepartment';
import { createDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import UpdateDepartment from './components/UpdateDepartment';
import { updateDataByPath } from 'services/data.service';

export default function UniversityDepartmentManager() {
  const [departments, setDepartments] = useState(null);
  const [alert, setalert] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [departmentDetail, setDepartmentDetail] = useState(null);
  const [majorList, setMajorList] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);

  async function loadListDepartment(search, currentPage) {
    if (currentPage && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const universityID = localStorage.getItem('universityID');
      const path = 'api/v1/departments/search';
      const data = `universityId=${universityID}&name=${search}&status=true&currentPage=${currentPage}&pageSize=10`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setDepartments(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDepartmentDetail(id) {
    if (id && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/departments/${id}`;
      const res = await getDataByPath(path, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        setDepartmentDetail(res.data);
      }
    }
  }

  async function removeDepartment(id) {
    if (id && localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/departments`;
      const res = await deleteDataByPath(path, accessToken, id);
      console.log(res);
      if (res && res.status === statusCode.successRemove) {
        successAlert('Xóa chuyên ngành thành công');
        setDepartmentModal(false);
        loadListDepartment('', 1);
      }
    }
  }

  async function loadMajorList() {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = `api/v1/majors/search`;
      const data = 'status=true&pageSize=20';
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'major');
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) {
          setMajorList(res.data.items);
        } else {
          setMajorList([]);
        }
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

  const removeDepartmentHandle = (id) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc muốn xóa chuyên ngành này không"
        onConfirm={() => {
          removeDepartment(id);
          setalert(null);
        }}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Có"
        showCancel={true}
        cancelBtnBsStyle="default"
        cancelBtnText="Không"
      ></ReactBSAlert>
    );
  };

  const annouceAlert = (message) => {
    setalert(
      <ReactBSAlert
        info
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="info"
        confirmBtnText="Ok"
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
        confirmBtnBsStyle="info"
        confirmBtnText="Ok"
      ></ReactBSAlert>
    );
  };

  const validationData = (data) => {
    if (data.major_code.trim() === '' || data.major_code.trim().length < 2 || data.major_code.trim() > 6) {
      annouceAlert('Mã ngành phải từ 2-6 ký tự');
      return false;
    }
    if (data.name.trim() === '') {
      annouceAlert('Tên ngành không được để trống');
      return false;
    }
    if (data.description.trim() === '') {
      annouceAlert('Chi tiết không được để trống');
      return false;
    }
    return true;
  };

  const validationUpdateData = (data) => {
    if (data.department_code.trim() === '' || data.department_code.trim().length < 2 || data.department_code.trim() > 6) {
      annouceAlert('Mã ngành phải từ 2-6 ký tự');
      return false;
    }
    if (data.name.trim() === '') {
      annouceAlert('Tên ngành không được để trống');
      return false;
    }
    if (data.description.trim() === '') {
      annouceAlert('Chi tiết không được để trống');
      return false;
    }
    return true;
  };

  async function addDepartment(data) {
    if (data && validationData(data)) {
      if (localStorage && localStorage.getItem('accessToken')) {
        const accessToken = localStorage.getItem('accessToken');
        const path = `api/v1/departments`;
        const res = await createDataByPath(path, accessToken, data);
        console.log(res);
        if (res && res.status === statusCode.success) {
          successAlert('Tạo chuyên ngành thành công!');
          setAddModal(false);
          loadListDepartment('', 1);
        } else if (res && res.status === statusCode.badrequest && res.data === 'Duplicated DepartmentCode') {
          warningAlert('Mã ngành đã tồn tại vui lòng đổi mã khác');
        }
      }
    }
  }

  async function updateDepartment(data) {
    if (data && validationUpdateData(data)) {
      if (localStorage && localStorage.getItem('accessToken')) {
        const accessToken = localStorage.getItem('accessToken');
        const path = `api/v1/departments`;
        const res = await updateDataByPath(path, accessToken, data);
        console.log(res);
        if (res && res.status === statusCode.success) {
          successAlert('Chỉnh sửa chuyên ngành thành công!');
          setUpdateModal(false);
          loadListDepartment('', 1);
        } else if (res && res.status === statusCode.badrequest && res.data === 'Duplicated DepartmentCode') {
          warningAlert('Mã ngành đã tồn tại vui lòng đổi mã khác');
        }
      }
    }
  }

  const handleUpdateShow = (id) => {
    loadDepartmentDetail(id);
    setUpdateModal(true);
  };

  const handleAddShow = (id) => {
    loadDepartmentDetail(id);
    setDepartmentModal(true);
  };

  useEffect(() => {
    if (departments === null) {
      loadListDepartment('', 1);
    }
    if (majorList === null) {
      loadMajorList();
    }
  }, []);

  return (
    <>
      {alert}
      <UniversityHeader />
      <UniversityDepartmentBody
        data={departments}
        loadListDepartment={loadListDepartment}
        loadDepartmentDetail={loadDepartmentDetail}
        setAddModal={setAddModal}
        removeDepartmentHandle={removeDepartmentHandle}
        handleUpdateShow={handleUpdateShow}
        handleAddShow={handleAddShow}
      />
      <Modal className="modal-dialog-centered" size="md" isOpen={departmentModal} toggle={() => setDepartmentModal(false)}>
        <div className="modal-body p-0">
          <UniversityDepartmentDetail
            data={departmentDetail}
            setDepartmentModal={setDepartmentModal}
            removeDepartmentHandle={removeDepartmentHandle}
          />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="md" isOpen={addModal} toggle={() => setAddModal(false)}>
        <div className="modal-body p-0">
          <AddDepartment addModal={addModal} setAddModal={setAddModal} majorList={majorList} addDepartment={addDepartment} />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="md" isOpen={updateModal} toggle={() => setUpdateModal(false)}>
        <div className="modal-body p-0">
          <UpdateDepartment
            updateModal={updateModal}
            setUpdateModal={setUpdateModal}
            majorList={majorList}
            updateDepartment={updateDepartment}
            data={departmentDetail}
          />
        </div>
      </Modal>
    </>
  );
}
