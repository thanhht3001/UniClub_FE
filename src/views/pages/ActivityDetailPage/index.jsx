/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import routes from 'routes/routes.js';
import ActivityDetailBody from './components/ActivityDetailBody';
import Sidebar from 'components/Sidebar/Sidebar';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import AdminFooter from 'components/Footers/AdminFooter';
import ActivityDetailHeader from './components/ActivityDetailHeader';
import { statusCode } from 'constants/status.constants';
import { getDataByPath } from 'services/data.service';
import { Col, Modal, Row } from 'reactstrap';
import ActivityDetailForm from './components/ActivityDetailForm';
import { updateDataByPath } from 'services/data.service';
import { createDataByPath } from 'services/data.service';
import { deleteDataByPathWithParam } from 'services/data.service';

export default function ActivityDetailPage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [alert, setalert] = useState(false);
  const [competitionData, setCompetitionData] = useState(null);
  const [activityList, setActivityList] = useState(null);
  const [activityDetail, setActivityDetail] = useState(null);
  const [activityForm, setActivityForm] = useState(false);
  const location = useLocation();
  const mainContentRef = React.useRef(null);

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

  const removeWarningAlert = (id) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc muốn hủy bỏ hoạt động này không ?"
        onConfirm={() => {
          setalert(null);
          removeActivity(id);
        }}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Có"
        cancelBtnText="Không"
        showCancel={true}
        cancelBtnBsStyle="info"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  //toggles collapse between mini sidenav and normal
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
  const getNavbarTheme = () => {
    return location.pathname.indexOf('admin/alternative-dashboard') === -1 ? 'dark' : 'light';
  };

  async function loadCompetitionData(accessToken, compeitionId) {
    if (compeitionId && accessToken) {
      let path = `api/v1/competitions/${compeitionId}`;
      const res = await getDataByPath(path, accessToken, '');
      if (res && res.status === statusCode.success) {
        setCompetitionData(res.data);
      } else {
        warningAlert(warningAlert.timeout);
      }
    }
  }

  async function loadActivityDetail(activityId) {
    const accessToken = localStorage.getItem('accessToken');
    const clubId = localStorage.getItem('clubID');
    if (activityId) {
      let path = `api/v1/competition-activities/${activityId}`;
      const data = `clubId=${clubId}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setActivityDetail(res.data);
      } else {
        warningAlert(warningAlert.timeout);
      }
    }
  }

  async function loadActivityList(accessToken, clubId, compeitionId) {
    if (compeitionId && accessToken) {
      let path = 'api/v1/competition-activities';
      const data = `competitionId=${compeitionId}&clubId=${clubId}&pageSize=60`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (res.data.items?.length > 0) setActivityList(res.data.items);
        else setActivityList([]);
      } else {
        warningAlert(warningAlert.timeout);
      }
    }
  }

  async function updateTitle(title, id) {
    if (title !== '') {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { name: title, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    } else {
      warningAlert('Tiêu đề không được để trống');
    }
  }

  async function updateDescription(description, id) {
    if (description !== '') {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { description: description, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    } else {
      warningAlert('Nội dung không được để trống');
    }
  }

  async function updatePriority(priority, id) {
    if (id) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { priority: priority, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function updateSeeds(seeds, id) {
    if (seeds !== '' && seeds >= 0 && seeds <= 100) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { seeds_point: seeds, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    } else {
      warningAlert('Điểm thưởng phải trong khoảng từ 0 đến 100');
    }
  }

  async function updateStatus(status, id) {
    if (status !== '') {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities/status';
      const data = { status: status, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function removeActivity(id) {
    if (id) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = `competitionActivityId=${id}&clubId=${clubId}`;
      console.log(data, 'data');
      const res = await deleteDataByPathWithParam(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function addMember(memberId, id) {
    if (memberId) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities/assign-member-task';
      const data = { member_id: memberId, club_id: parseInt(clubId), comeptition_activity_id: parseInt(id) };
      console.log(data, 'data');
      const res = await createDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function removeMember(memberId, id) {
    if (memberId) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities/remove-member-task';
      const data = `memberTakesActivityId=${memberId}&clubId=${clubId}`;
      console.log(data, 'data');
      const res = await deleteDataByPathWithParam(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function updateImage(image, id) {
    if (image) {
      const img = image.split(',');
      const list_activities_entities = [
        {
          name: '',
          base64_string_img: img[1],
        },
      ];
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { list_activities_entities: list_activities_entities, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      }
    }
  }

  async function updateEnding(ending, id) {
    if (ending !== '') {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competition-activities';
      const data = { ending: ending, club_id: parseInt(clubId), id: parseInt(id) };
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        loadActivityList(accessToken, clubId, props.match.params.id);
        loadActivityDetail(id);
      } else {
        warningAlert('Ngày giờ không phù hợp');
      }
    }
  }

  const handleLoadActivityDetail = (activityId) => {
    setActivityForm(true);
    setActivityDetail(null);
    loadActivityDetail(activityId);
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      if (competitionData === null) {
        loadCompetitionData(accessToken, props.match.params.id);
      }
      if (activityList === null) {
        loadActivityList(accessToken, clubId, props.match.params.id);
      }
    }
  }, []);

  return (
    <>
      {alert}
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
        <AdminNavbar theme={getNavbarTheme()} toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} brandText={getBrandText(location.pathname)} />
        {competitionData ? <ActivityDetailHeader competitionData={competitionData} /> : <></>}
        {activityList ? (
          <ActivityDetailBody activityList={activityList} handleLoadActivityDetail={handleLoadActivityDetail} competitionID={props.match.params.id} />
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '100%' }} />
            </Col>
          </Row>
        )}
        <Modal className="modal-dialog-centered" size="lg" isOpen={activityForm} toggle={() => setActivityForm(false)}>
          <div className="modal-body p-0">
            <ActivityDetailForm
              data={activityDetail}
              setActivityForm={setActivityForm}
              updateTitle={updateTitle}
              updateDescription={updateDescription}
              updateEnding={updateEnding}
              updatePriority={updatePriority}
              updateImage={updateImage}
              updateSeeds={updateSeeds}
              addMember={addMember}
              removeMember={removeMember}
              updateStatus={updateStatus}
              removeWarningAlert={removeWarningAlert}
            />
          </div>
        </Modal>
        <AdminFooter />
      </div>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
