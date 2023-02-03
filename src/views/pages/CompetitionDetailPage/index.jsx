import React, { useEffect, useState } from 'react';
import AdminFooter from 'components/Footers/AdminFooter.js';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { useLocation } from 'react-router-dom';
import routes from 'routes/routes.js';
import CompetitionDetailHeader from './components/CompetitionDetailHeader';
import CompetitionDetailBody from './components/CompetitionDetailBody';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { Col, Modal, Row } from 'reactstrap';
import { warningAlertConstants } from 'constants/alert.constants';
import { updateDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';
import { createDataByPath } from 'services/data.service';
import { deleteDataByPathWithParam } from 'services/data.service';
import Loading from '../components/Loading';
import StatusHistory from './components/StatusHistory';
import RestoreForm from './components/RestoreForm';
import { newDateConvertToFormat } from 'services/formatData';

export default function CompetitionDetailPage(props) {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [alert, setalert] = React.useState(false);
  const [competitionDetail, setCompetitionDetail] = useState(null);
  const [banner, setBanner] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [influencer, setInfluencer] = useState([]);
  const [competitionStatus, setCompetitionStatus] = useState(null);
  const [competitionClubs, setCompetitionClubs] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [historyForm, setHistoryForm] = useState(false);
  const [statusHistoryList, setStatusHistoryList] = useState(null);
  const [restoreForm, setRestoreForm] = useState(false);
  const location = useLocation();
  const mainContentRef = React.useRef(null);

  async function loadDataCompetitionDetail(accessToken, competition_id) {
    setCompetitionStatus(null);
    setCompetitionClubs(null);
    if (accessToken) {
      const path = `api/v1/competitions/${competition_id}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        convertCompetitionEntities(res.data);
        setCompetitionStatus(res.data.status);
        setCompetitionClubs(res.data.clubs_in_competition);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDataStatusHistory(accessToken, clubID, competition_id) {
    setStatusHistoryList(null);
    if (accessToken) {
      const path = `api/v1/competition-histories`;
      const data = `competitionId=${competition_id}&clubId=${clubID}`;
      const res = await getDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        setStatusHistoryList(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const checkValidationRestore = (startTimeRegister, endTimeRegister, startTime, endTime) => {
    if (!compareTime(startTimeRegister, newDateConvertToFormat(new Date()))) {
      warningAlert('Thời gian mở đăng ký phải lớn hơn thời gian hiện tại');
      return false;
    } else if (!compareTime(endTimeRegister, timeUperOneHour(startTimeRegister, 1))) {
      warningAlert('Thời gian đóng đăng ký phải lớn hơn thời gian mở đăng ký ít nhất 1 giờ');
      return false;
    } else if (!compareTime(startTime, timeUperOneHour(endTimeRegister, 1))) {
      warningAlert('Thời gian bắt đầu phải lớn hơn thời gian đóng đăng ký ít nhất 1 giờ');
      return false;
    } else if (!compareTime(endTime, timeUperOneHour(startTime, 1))) {
      warningAlert('Thời gian kết thúc phải lớn hơn thời gian bắt đầu ít nhất 1 giờ');
      return false;
    }
    return true;
  };

  const convertStringToDate = (string) => {
    const arr = string.split('T');
    const day = arr[0].split('-');
    const time = arr[1].split(':');
    let seconds;
    if (time[2]) {
      seconds = time[2].slice(0, 2);
    } else {
      seconds = '00';
    }
    const date = new Date(+day[0], +day[1] - 1, +day[2], +time[0], +time[1], +seconds);
    return date;
  };

  const timeUperOneHour = (time, numberOfHour) => {
    const date = convertStringToDate(time);
    date.setTime(date.getTime() + numberOfHour * 60 * 60 * 1000);
    return newDateConvertToFormat(date);
  };

  const compareTime = (firtTime, secondTime) => {
    const time1 = convertStringToDate(firtTime);
    const time2 = convertStringToDate(secondTime);
    if (time1 > time2) {
      return true;
    }
    return false;
  };

  async function restorePending(startTimeRegister, endTimeRegister, startTime, endTime) {
    if (localStorage.getItem('accessToken') && checkValidationRestore(startTimeRegister, endTimeRegister, startTime, endTime)) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competitions/pending';
      const data = {
        competition_id: parseInt(competitionDetail.id),
        start_time_register: startTimeRegister,
        end_time_register: endTimeRegister,
        start_time: startTime,
        end_time: endTime,
        club_id: parseInt(clubId),
      };
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === statusCode.success) {
        successAlert('Khôi phục thành công');
        loadDataCompetitionDetail(accessToken, props.match.params.id);
        setRestoreForm(false);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const handleShopStatusHistory = () => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubID = localStorage.getItem('clubID');
      loadDataStatusHistory(accessToken, clubID, props.match.params.id);
      setHistoryForm(true);
    }
  };

  async function updatePendingCompetition(accessToken, clubID, status) {
    setLoadingModal(true);
    if (accessToken) {
      const path = `api/v1/competitions/status`;
      const data = {
        id: parseInt(props.match.params.id),
        status: parseInt(status),
        club_id: parseInt(clubID),
      };
      const res = await updateDataByPath(`${path}`, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        if (status === 7) successAlert('Nộp đơn xét duyệt thành công');
        else successAlert('Thao tác thành công');
        loadDataCompetitionDetail(accessToken, parseInt(props.match.params.id));
      } else if (res && res.status === statusCode.badrequest && res.data === 'Date Now < Time Register < Time Start < Time End') {
        warningAlert('Các cột mốc thời gian đã quá hạn vui lòng cập nhật lại');
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
    setLoadingModal(false);
  }

  async function addClubToCompetition(id) {
    setLoadingModal(true);
    if (localStorage && localStorage.getItem('accessToken') && id) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competitions/club';
      const data = {
        club_id_collaborate: parseInt(id),
        competition_id: parseInt(props.match.params.id),
        club_id: parseInt(clubId),
      };
      console.log(data);
      const res = await createDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        successAlert('Thêm câu lạc bộ thành công');
        loadDataCompetitionDetail(accessToken, parseInt(props.match.params.id));
      } else if (res && res.status === 400) {
        warningAlert('Câu lạc bộ đã có trong Cuộc thi hoặc sự kiện');
      } else {
        successAlert('Thêm câu lạc bộ thành công');
        loadDataCompetitionDetail(accessToken, parseInt(props.match.params.id));
      }
    }
    setLoadingModal(false);
  }

  async function removeClubToCompetition(id) {
    setLoadingModal(true);
    if (localStorage && localStorage.getItem('accessToken') && id) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competitions/club';
      const data = `competitionInClubId=${id}&clubId=${clubId}`;
      console.log(data);
      const res = await deleteDataByPathWithParam(path, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        successAlert('Xóa câu lạc bộ khỏi cuộc thi hoặc sự kiện thành công');
        loadDataCompetitionDetail(accessToken, parseInt(props.match.params.id));
      } else if (res && res.status === 400 && res.data === "Can't delete Club Owner Competition") {
        warningAlert('Không thể xóa câu lạc bộ tạo cuộc thi hoặc sự kiện');
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
    setLoadingModal(false);
  }

  async function cancelCompetition(id) {
    setLoadingModal(true);
    if (localStorage && localStorage.getItem('accessToken') && id) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      const path = 'api/v1/competitions/status';
      const data = {
        id: parseInt(id),
        status: 12,
        club_id: parseInt(clubId),
      };
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        successAlert('Hủy cuộc thi thành công');
        loadDataCompetitionDetail(accessToken, parseInt(props.match.params.id));
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
    setLoadingModal(false);
  }

  const convertCompetitionEntities = (array) => {
    const banner = [];
    const sponsor = [];
    const influencer = [];
    array.competition_entities.forEach((e) => {
      switch (e.entity_type_id) {
        case 1:
          banner.push({ image_url: e.image_url });
          break;
        case 2:
          influencer.push({ name: e.name, image_url: e.image_url });
          break;
        case 3:
          sponsor.push({ name: e.name, image_url: e.image_url, email: e.email, website: e.website, description: e.description });
          break;
      }
    });
    setBanner(banner);
    setSponsor(sponsor);
    setInfluencer(influencer);
    setCompetitionDetail(array);
  };

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

  const handleRemoveClub = (id) => {
    console.log(id);
    setalert(
      <ReactBSAlert
        info
        style={{ display: 'block', marginTop: '-100px' }}
        onConfirm={() => removeClubToCompetition(id)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="default"
        confirmBtnText="Có"
        cancelBtnText="Không"
        showCancel={true}
        btnSize=""
      >
        Bạn có chắc sẽ loại bỏ câu lạc bộ này khỏi cuộc thi không
      </ReactBSAlert>
    );
  };

  const handleRemoveCompetition = (id) => {
    setalert(
      <ReactBSAlert
        info
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc hủy cuộc thi hoặc sự kiện này không"
        onConfirm={() => cancelCompetition(id)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="default"
        confirmBtnText="Có"
        cancelBtnText="Không"
        showCancel={true}
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
        showCancel={false}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      if (competitionDetail === null) {
        loadDataCompetitionDetail(accessToken, props.match.params.id);
      }
    }
  }, []);

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
        {competitionDetail ? (
          <>
            <CompetitionDetailHeader
              data={competitionDetail}
              sponsor={sponsor}
              handleRemoveCompetition={handleRemoveCompetition}
              updatePendingCompetition={updatePendingCompetition}
              competitionStatus={competitionStatus}
              handleShopStatusHistory={handleShopStatusHistory}
              setRestoreForm={setRestoreForm}
            />
            <CompetitionDetailBody
              data={competitionDetail}
              banner={banner}
              influencer={influencer}
              updatePendingCompetition={updatePendingCompetition}
              competitionStatus={competitionStatus}
              addClubToCompetition={addClubToCompetition}
              competitionClubs={competitionClubs}
              handleRemoveClub={handleRemoveClub}
            />
          </>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '70%' }} />
            </Col>
          </Row>
        )}
        <AdminFooter />
      </div>
      <Modal className="modal-dialog-centered" size="lg" isOpen={historyForm} toggle={() => setHistoryForm(false)}>
        <div className="modal-body p-0">
          <StatusHistory statusHistoryList={statusHistoryList} setHistoryForm={setHistoryForm} />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="xl" isOpen={restoreForm}>
        <div className="modal-body -p0">
          <RestoreForm competitionDetail={competitionDetail} setRestoreForm={setRestoreForm} restorePending={restorePending} />
        </div>
      </Modal>
      <Modal className="modal-dialog-centered" size="sm" isOpen={loadingModal}>
        <div className="modal-body p-0 bg-transparent">
          <Loading style={{ margin: 'auto' }} />
        </div>
      </Modal>
      {sidenavOpen ? <div className="backdrop d-xl-none" onClick={toggleSidenav} /> : null}
    </>
  );
}
