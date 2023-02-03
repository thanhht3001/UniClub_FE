/*eslint-disable*/
import Dropzone from 'dropzone';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import Select2 from 'react-select2-wrapper';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import { getDataByPath } from 'services/data.service';
import { createDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { formatTitle } from 'services/formatData';
import { newDateConvertToFormat } from 'services/formatData';
import { toBase64 } from 'services/formatData';
import Loading from 'views/pages/components/Loading';
import { ValidateEmail } from 'services/formatData';
import { warningAlertConstants } from 'constants/alert.constants';
import { successAlertConstants } from 'constants/alert.constants';

const CompetitionScopes = [
  { id: 0, text: 'Liên Trường' },
  { id: 1, text: 'Trong Trường' },
  { id: 2, text: 'Trong Câu Lạc Bộ' },
];
/*eslint disable*/
export default function CreateEventBody() {
  const [reactQuillText, setReactQuillText] = useState('');
  const [feeCheckbox, setFeeCheckbox] = useState(false);
  const [influencerModal, setinfluencerModal] = useState(false);
  const [imgBase64Influencer, setImgBase64Influencer] = useState(noAvatarBase64);
  const [imgBase64Sponsor, setImgBase64Sponsor] = useState(noAvatarBase64);
  const [fullnameInfluencer, setFullnameInfluencer] = useState('');
  const [competitionTypeId, setCompetitionTypeId] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimeRegister, setEndTimeRegister] = useState('');
  const [startTimeRegister, setStartTimeRegister] = useState('');
  const [major, setMajor] = useState([]);
  const [scopes, setScopes] = useState(0);
  const [address, setAddress] = useState('');
  const [addressName, setAddressName] = useState('');
  const [fees, setFees] = useState(1000);
  const [title, setTitle] = useState('');
  const [Influencer, setInfluencer] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [sponsorName, setSponsorName] = useState('');
  const [numberOfParticipation, setNumberOfParticipation] = useState(100);
  const [sponsorWebsite, setSponsorWebsite] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [sponsorDescription, setSponsorDescription] = useState('');
  const [sponsorForm, setSponsorForm] = useState(false);
  const [sponsorDetailForm, setSponsorDetailForm] = useState(false);
  const [sponsorDetail, setSponsorDetail] = useState({
    index: 0,
    name: '',
    url: noAvatarBase64,
    website: '',
    email: '',
    description: '',
  });
  const [banner, setBanner] = useState('');
  const [seedPoint, setSeedPoint] = useState(0);
  const [majorsList, setMajorsList] = useState([]);
  const [competitionTypeList, setCompetitionTypeList] = useState([]);
  const [minRequire, setMinRequire] = useState(1);
  const [formModal, setFormModal] = useState(false);
  const [alert, setalert] = React.useState(false);
  const history = useHistory();

  const toolbarOptions = [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ];

  const formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'background',
    'align',
    'image',
    'video',
  ];

  async function loadDataMajors(accessToken) {
    if (accessToken) {
      const path = 'api/v1/majors/search';
      const data = 'status=true';
      const res = await getDataByPath(`${path}`, accessToken, data);
      if (res !== null && res !== undefined && res.status === 200) {
        setMajorsList(handleConvertDataMajor(res.data.items));
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  async function loadDataCompetitionTypes(accessToken) {
    if (accessToken) {
      const path = 'api/v1/competition-types/competition-types';
      const res = await getDataByPath(`${path}`, accessToken, '');
      if (res !== null && res !== undefined && res.status === 200) {
        setCompetitionTypeList(handleConvertDataCompetitionTypes(res.data.items));
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const handleConvertDataMajor = (items) => {
    const newMajor = [];
    for (let index = 0; index < items.length; index++) {
      const element = { id: items[index].id, text: items[index].name };
      newMajor.push(element);
    }
    return newMajor;
  };

  const handleConvertDataCompetitionTypes = (items) => {
    const newCompetitionTypes = [];
    for (let index = 0; index < items.length; index++) {
      const element = { id: items[index].id, text: items[index].type_name };
      newCompetitionTypes.push(element);
    }
    return newCompetitionTypes;
  };

  const handleImageSponsorChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let _convertImageToBase64 = toBase64(e.target.files[0]);
      Promise.all([_convertImageToBase64]).then((values) => {
        setImgBase64Sponsor(values[0]);
      });
    }
  };

  const handleShowSponsorDetail = (index) => {
    let newSponsor = [...sponsor];
    newSponsor = { ...newSponsor[index], index: index };
    setSponsorDetail(newSponsor);
    setSponsorDetailForm(true);
  };

  const addSponsor = (name, base64, website, email, description) => {
    const newSponsor = [...sponsor];
    if (base64 !== undefined) {
      newSponsor.push({ name: name, url: base64, website: website, email: email, description: description });
    } else {
      newSponsor.push({
        name: name,
        url: noAvatarBase64,
        website: website,
        email: email,
        description: description,
      });
    }
    setSponsor(newSponsor);
    setSponsorName('');
    setImgBase64Sponsor(noAvatarBase64);
    setSponsorEmail('');
    setSponsorWebsite('');
    setSponsorDescription('');
  };

  const removeSponsor = (index) => {
    setSponsorDetail({
      index: 0,
      name: '',
      url: noAvatarBase64,
      website: '',
      email: '',
      description: '',
    });
    const newSponsor = [...sponsor];
    newSponsor.splice(index, 1);
    setSponsor(newSponsor);
  };

  const handleImageInfluencerChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let _convertImageToBase64 = toBase64(e.target.files[0]);
      Promise.all([_convertImageToBase64]).then((values) => {
        setImgBase64Influencer(values[0]);
      });
    }
  };

  const addInfluencer = (name, base64) => {
    const newInfluencer = [...Influencer];
    if (base64 !== undefined) {
      newInfluencer.push({ name: name, url: base64 });
    } else {
      newInfluencer.push({ name: name, url: noAvatarBase64 });
    }
    setInfluencer(newInfluencer);
    setFullnameInfluencer('');
    setImgBase64Influencer(noAvatarBase64);
  };

  const removeInfluencer = (index) => {
    const newInfluencer = [...Influencer];
    newInfluencer.splice(index, 1);
    setInfluencer(newInfluencer);
    setFullnameInfluencer('');
    setImgBase64Influencer(noAvatarBase64);
  };

  const addMajor = (id) => {
    if (id) {
      const newMajor = major;
      const index = newMajor.indexOf(id);
      if (index === -1) {
        newMajor.push(parseInt(id));
      }
    }
  };

  const removeMajor = (id) => {
    if (id) {
      const newMajor = major;
      const index = newMajor.indexOf(parseInt(id));
      if (index > -1) {
        newMajor.splice(index, 1);
      }
      setMajor(newMajor);
    }
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

  const successAlert = (message) => {
    setalert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        showCancel={false}
        showConfirm={false}
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const checkValidation = () => {
    if (title.trim() === '') {
      warningAlert(warningAlertConstants.titleValidation);
      return false;
    } else if (address.trim() === '') {
      warningAlert(warningAlertConstants.addressValidation);
      return false;
    } else if (addressName.trim() === '') {
      warningAlert(warningAlertConstants.addressNameValidation);
      return false;
    } else if (reactQuillText.trim() === '') {
      warningAlert(warningAlertConstants.contentsValidation);
      return false;
    } else if (banner === '') {
      warningAlert(warningAlertConstants.imageValidation);
      return false;
    } else if (seedPoint === '' || parseInt(seedPoint) < 0 || parseInt(seedPoint) > 100) {
      warningAlert('Điểm thưởng phải trong khoảng từ 0 đến 100');
    } else if (numberOfParticipation === '' || parseInt(numberOfParticipation) <= 0 || parseInt(numberOfParticipation) >= 42000) {
      warningAlert('Tối đa đăng ký phải từ 1 đến 41999 người');
      return false;
    } else if (!compareTime(startTimeRegister, newDateConvertToFormat(new Date()))) {
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
    } else if (parseInt(minRequire) < 1) {
      warningAlert('Tối thiểu người đăng ký phải lớn hơn 0');
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

  const compareTime = (firtTime, secondTime) => {
    const time1 = convertStringToDate(firtTime);
    const time2 = convertStringToDate(secondTime);
    if (time1 > time2) {
      return true;
    }
    return false;
  };

  const timeUperOneHour = (time, numberOfHour) => {
    const date = convertStringToDate(time);
    date.setTime(date.getTime() + numberOfHour * 60 * 60 * 1000);
    return newDateConvertToFormat(date);
  };

  const convertDataToCreate = (clubId) => {
    if (clubId) {
      const name = title;
      const competition_type_id = parseInt(competitionTypeId);
      const number_of_participations = parseInt(numberOfParticipation);
      const min_number_member_in_team = 0;
      const max_number_member_in_team = 0;
      const end_time_register = endTimeRegister;
      const start_time_register = startTimeRegister;
      const start_time = startTime;
      const end_time = endTime;
      const content = reactQuillText;
      let fee = parseInt(fees);
      if (!feeCheckbox) {
        fee = 0;
      }
      const scope = parseInt(scopes);
      const is_event = true;
      const address_name = addressName;
      const seed_point = parseInt(seedPoint);
      const list_major_id = major;
      const bannerBase64 = banner.split(',');
      const list_image = [{ name: '', base64_string_img: bannerBase64[1] }];
      const list_influencer = [];
      if (Influencer.length > 0) {
        for (let i = 0; i < Influencer.length; i++) {
          const InfluencerBase64 = Influencer[i].url.split(',');
          list_influencer.push({ name: Influencer[i].name, base64_string_img: InfluencerBase64[1] });
        }
      }
      const list_sponsor = [];
      if (sponsor.length > 0) {
        for (let i = 0; i < sponsor.length; i++) {
          const SponsorBase64 = sponsor[i].url.split(',');
          list_sponsor.push({
            name: sponsor[i].name,
            base64_string_img: SponsorBase64[1],
            website: sponsor[i].website,
            email: sponsor[i].email,
            description: sponsor[i].description,
          });
        }
      }
      const club_id = parseInt(clubId);
      return {
        name: name,
        competition_type_id: competition_type_id,
        number_of_participations: number_of_participations,
        min_number_member_in_team: min_number_member_in_team,
        max_number_member_in_team: max_number_member_in_team,
        min_team_or_participant: parseInt(minRequire),
        start_time_register: start_time_register,
        end_time_register: end_time_register,
        start_time: start_time,
        end_time: end_time,
        content: content,
        fee: fee,
        scope: scope,
        is_event: is_event,
        address_name: address_name,
        address: address,
        seeds_point: seed_point,
        list_major_id: list_major_id,
        list_image: list_image,
        list_influencer: list_influencer,
        list_sponsor: list_sponsor,
        club_id: club_id,
      };
    }
    return null;
  };

  async function createCompetition() {
    setFormModal(true);
    if (checkValidation()) {
      if (localStorage && localStorage.getItem('accessToken')) {
        const accessToken = localStorage.getItem('accessToken');
        const club_id = localStorage.getItem('clubID');
        const path = 'api/v1/competitions';
        const data = convertDataToCreate(club_id);
        console.log(data);
        if (data) {
          const res = await createDataByPath(path, accessToken, data);
          console.log(res);
          if (res !== null && res.status === 200) {
            successAlert('Tạo sự kiện thành công');
            setTimeout(() => {
              history.push(`/admin/cuoc-thi/chi-tiet/${res.data.id}`);
            }, 2000);
          } else if (res !== null && res.status === 400) {
            if (res.data === 'Date not suitable') {
              warningAlert(warningAlertConstants.dateTimeValidation);
            }
          } else {
            warningAlert(warningAlertConstants.timeout);
          }
        }
      }
    }
    setFormModal(false);
  }

  useEffect(() => {
    let currentSingleFile = undefined;
    Dropzone.autoDiscover = false;

    // single dropzone file - accepts only images
    new Dropzone(document.getElementById('dropzone-single'), {
      url: '/',
      thumbnailWidth: null,
      thumbnailHeight: null,
      autoDiscover: false,
      previewsContainer: document.getElementsByClassName('dz-preview-single')[0],
      previewTemplate: document.getElementsByClassName('dz-preview-single')[0].innerHTML,
      dictDefaultMessage: 'Thả ảnh vào đây hoặc click để chọn',
      maxFiles: 1,
      acceptedFiles: 'image/*',
      init: function () {
        this.on('addedfile', function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
          const reader = new FileReader();
          reader.onload = function (event) {
            const base64String = event.target.result;
            setBanner(base64String);
          };
          reader.readAsDataURL(file);
        });
      },
    });
    document.getElementsByClassName('dz-preview-single')[0].innerHTML = '';

    //First Load API
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      setStartTime(newDateConvertToFormat(new Date()));
      setEndTime(newDateConvertToFormat(new Date()));
      setEndTimeRegister(newDateConvertToFormat(new Date()));
      setStartTimeRegister(newDateConvertToFormat(new Date()));
      if (majorsList.length === 0) {
        loadDataMajors(accessToken);
      }
      if (competitionTypeList.length === 0) {
        loadDataCompetitionTypes(accessToken);
      }
    }
  }, []);

  return (
    <>
      {alert}
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="card-wrapper" lg="8">
              <CardHeader>
                <Row>
                  <Col className="col-auto">
                    <h3 className="mb-0" style={{ marginTop: '10px' }}>
                      Tạo sự kiện của bạn:
                      <span className="text-success" style={{ marginLeft: '10px' }}>
                        Thể loại sự kiện
                      </span>
                    </h3>
                  </Col>
                  {competitionTypeList.length > 0 ? (
                    <Col className="col-auto" style={{ width: '200px' }}>
                      <Select2
                        className="form-control"
                        value={competitionTypeId}
                        options={{
                          placeholder: 'Tìm kiếm',
                        }}
                        data={competitionTypeList}
                        onChange={(e) => {
                          setCompetitionTypeId(e.target.value);
                        }}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="mb-3">
                  <Col md="12">
                    <label className="form-control-label" htmlFor="title">
                      Tiêu đề <span className="text-warning">*</span>
                    </label>
                    <InputGroup>
                      <Input
                        className="text-default"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="default"
                          outline
                          type="button"
                          onClick={() => {
                            setTitle(formatTitle(title));
                          }}
                        >
                          Format
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg="6" md="12">
                    <label className="form-control-label" htmlFor="startregisterdaytime">
                      Thời gian mở đăng ký <span className="text-warning">*</span>
                    </label>
                    <Input
                      defaultValue={newDateConvertToFormat(new Date())}
                      id="startregisterdaytime"
                      type="datetime-local"
                      onChange={(e) => {
                        setStartTimeRegister(e.target.value);
                        if (compareTime(e.target.value, endTimeRegister)) {
                          if (compareTime(e.target.value, startTime)) {
                            if (compareTime(e.target.value, endTime)) {
                              setEndTimeRegister(timeUperOneHour(e.target.value, 1));
                              setStartTime(timeUperOneHour(e.target.value, 2));
                              setEndTime(timeUperOneHour(e.target.value, 3));
                            } else {
                              setEndTimeRegister(timeUperOneHour(e.target.value, 1));
                              setStartTime(timeUperOneHour(e.target.value, 2));
                            }
                          } else {
                            setEndTimeRegister(timeUperOneHour(e.target.value, 1));
                          }
                        }
                      }}
                      min={newDateConvertToFormat(new Date())}
                    />
                  </Col>

                  <Col lg="6" md="12">
                    <label className="form-control-label" htmlFor="endregisterdaytime">
                      Thời gian kết thúc đăng ký <span className="text-warning">*</span>
                    </label>
                    <Input
                      value={endTimeRegister}
                      id="endregisterdaytime"
                      type="datetime-local"
                      onChange={(e) => {
                        setEndTimeRegister(e.target.value);
                        if (compareTime(e.target.value, startTime)) {
                          if (compareTime(e.target.value, endTime)) {
                            setStartTime(timeUperOneHour(e.target.value, 1));
                            setEndTime(timeUperOneHour(e.target.value, 2));
                          } else {
                            setStartTime(timeUperOneHour(e.target.value, 1));
                          }
                        }
                      }}
                      min={startTimeRegister}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg="6" md="12">
                    <label className="form-control-label" htmlFor="startdaytime">
                      Thời gian bắt đầu cuộc thi <span className="text-warning">*</span>
                    </label>
                    <Input
                      value={startTime}
                      id="startdaytime"
                      type="datetime-local"
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        if (compareTime(e.target.value, endTime)) {
                          setEndTime(timeUperOneHour(e.target.value, 1));
                        }
                      }}
                      min={endTimeRegister}
                    />
                  </Col>
                  <Col lg="6" md="12">
                    <label className="form-control-label" htmlFor="enddaytime">
                      Thời gian kết thúc cuộc thi <span className="text-warning">*</span>
                    </label>
                    <Input
                      value={endTime}
                      id="enddaytime"
                      type="datetime-local"
                      onChange={(e) => {
                        setEndTime(e.target.value);
                      }}
                      min={startTime}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md="6">
                    <label className="text-default" htmlFor="location">
                      Địa chỉ <span className="text-warning">*</span>
                    </label>
                    <InputGroup>
                      <Input
                        className="text-default"
                        value={address}
                        type="text"
                        id="location"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-map-marker" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <Col md="6">
                    <label className="text-default" htmlFor="locationname">
                      Tên địa điểm <span className="text-warning">*</span>
                    </label>
                    <InputGroup>
                      <Input
                        className="text-default"
                        value={addressName}
                        type="text"
                        id="locationname"
                        onChange={(e) => {
                          setAddressName(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="12">
                    <label className="form-control-label" htmlFor="startdaytime">
                      Bài viết <span className="text-warning">*</span>
                    </label>
                    <ReactQuill
                      style={{ display: 'block', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                      value={reactQuillText}
                      clipboard={{
                        matchVisual: false,
                      }}
                      onChange={(value) => setReactQuillText(value)}
                      theme="snow"
                      modules={{
                        toolbar: toolbarOptions,
                      }}
                      formats={formats}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="12">
                    <label className="form-control-label" htmlFor="startdaytime">
                      Ảnh bài viết <span className="text-warning">*</span>
                    </label>
                    <br />
                    <small className="mb-3" style={{ color: 'gray' }}>
                      Ảnh có dung lượng dưới 200kb và kích cỡ tiêu chuẩn 700x400px. Các ảnh kích cỡ lớn hơn đều có thể gây chậm hoặc không tải được.
                      Hỗ trợ các định dạng ảnh JPG, PNG, GIF, JPEG. Bạn có thể vào{' '}
                      <a target="_blank" href="https://tool.ybox.vn/resize-image?s=ybox">
                        đây
                      </a>{' '}
                      để giảm kích thước ảnh
                    </small>
                    <div className="dropzone dropzone-single mb-3" id="dropzone-single">
                      <div className="fallback">
                        <div className="custom-file">
                          <input className="custom-file-input" id="projectCoverUploads" type="file" />
                          <label className="custom-file-label" htmlFor="projectCoverUploads">
                            Choose file
                          </label>
                        </div>
                      </div>
                      <div className="dz-preview dz-preview-single">
                        <div className="dz-preview-cover">
                          <img alt="..." className="dz-preview-img" data-dz-thumbnail="" />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-wrapper" lg="4" style={{ position: 'sticky', top: '10px' }}>
              <CardHeader>
                <Row>
                  <Col className="col-auto">
                    <h3>Thông tin bổ sung: </h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="col-auto">
                    <h3>
                      Chọn chuyên ngành: <span className="text-gray">(Để trống để chọn tất cả)</span>
                    </h3>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Select2
                      multiple
                      className="form-control"
                      options={{
                        placeholder: 'Tìm kiếm',
                      }}
                      value={major}
                      data={majorsList}
                      onSelect={(e) => addMajor(e.params.data.id)}
                      onUnselect={(e) => {
                        removeMajor(e.params.data.id);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="col-auto">
                    <h3>
                      Điểm thưởng<span className="text-warning">*</span>:{' '}
                    </h3>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputGroup>
                      <Input type="number" min={0} max={100} value={seedPoint} onChange={(e) => setSeedPoint(e.target.value)} />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-seedling" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <h5 className="text-mute text-gray">Phí tham gia cần {parseInt((seedPoint * 20) / 100, 10)} điểm thưởng</h5>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-auto">
                    <h3>
                      Tối đa đăng ký<span className="text-warning">*</span>:{' '}
                    </h3>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputGroup>
                      <Input
                        type="number"
                        min={1}
                        value={numberOfParticipation}
                        max={41999}
                        onChange={(e) => {
                          setNumberOfParticipation(e.target.value);
                          if (e.target.value < minRequire) {
                            setMinRequire(e.target.value);
                          }
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <label className="form-control-label" htmlFor="max-participant">
                      Tối thiểu người đăng ký<span className="text-warning">*</span>
                    </label>
                    <InputGroup>
                      <Input
                        className="text-default"
                        id="max-participant"
                        type="number"
                        value={minRequire}
                        min={1}
                        max={numberOfParticipation}
                        onChange={(e) => {
                          setMinRequire(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fas fa-minus-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col className="col-auto">
                    <h3>Giám khảo hoặc khách mời:</h3>
                    {Influencer.length > 0 ? (
                      <Row className="align-items-center mb-3">
                        {Influencer.map((ele, value) => {
                          return (
                            <Col className="col-auto mb-1" key={`influ-${value}`}>
                              <a
                                href="/"
                                id={`tooltip-${value}`}
                                onClick={(e) => {
                                  removeInfluencer(value);
                                  e.preventDefault(e);
                                }}
                              >
                                <img style={{ width: '50px', height: '50px' }} alt="..." className="img-fluid rounded-circle" src={ele.url} />
                              </a>
                              <UncontrolledTooltip delay={0} target={`tooltip-${value}`}>
                                {ele.name} <br />
                                Click to Remove
                              </UncontrolledTooltip>
                            </Col>
                          );
                        })}
                      </Row>
                    ) : (
                      <></>
                    )}
                    <Button
                      outline
                      color="info"
                      onClick={() => {
                        setinfluencerModal(true);
                      }}
                    >
                      Thêm danh sách
                    </Button>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col className="col-auto">
                    <h3>Nhà tài trợ:</h3>
                    {sponsor.length > 0 ? (
                      <Row className="align-items-center mb-3">
                        {sponsor.map((ele, value) => {
                          return (
                            <Col className="col-auto mb-1" key={`sponsor-${value}`}>
                              <a
                                href="/"
                                id={`tooltip-sponsor${value}`}
                                onClick={(e) => {
                                  handleShowSponsorDetail(value);
                                  e.preventDefault(e);
                                }}
                              >
                                <img style={{ width: '50px', height: '50px' }} alt="..." className="img-fluid rounded-circle" src={ele.url} />
                              </a>
                              <UncontrolledTooltip delay={0} target={`tooltip-sponsor${value}`}>
                                {ele.name} <br />
                                {ele.email}
                              </UncontrolledTooltip>
                            </Col>
                          );
                        })}
                      </Row>
                    ) : (
                      <></>
                    )}
                    <Button
                      outline
                      color="success"
                      onClick={() => {
                        setSponsorForm(true);
                      }}
                    >
                      Thêm nhà tài trợ
                    </Button>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col className="col-auto">
                    <Row style={{ marginLeft: '5px' }}>
                      <h3>Thu phí tham gia: </h3>
                      <label style={{ marginLeft: '10px' }} className="custom-toggle mr-1">
                        <input
                          defaultChecked={feeCheckbox}
                          type="checkbox"
                          onChange={() => {
                            setFeeCheckbox(!feeCheckbox);
                          }}
                        />
                        <span className="custom-toggle-slider rounded-circle" data-label-on="Có" />
                      </label>
                    </Row>
                    <InputGroup style={{ display: `${feeCheckbox ? 'flex' : 'none'}` }}>
                      <Input
                        value={fees}
                        type="number"
                        id="fee"
                        min={0}
                        onChange={(e) => {
                          setFees(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>vnđ</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-auto">
                    <h3>Quy mô: </h3>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md="12">
                    <Input
                      type="select"
                      value={scopes}
                      onChange={(e) => {
                        setScopes(e.target.value);
                      }}
                    >
                      {CompetitionScopes.map((ele) => {
                        return (
                          <option key={`option-${ele.id}`} value={ele.id}>
                            {ele.text}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-auto">
                    <h3>Tùy chỉnh: </h3>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Button
                    color="success"
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      createCompetition();
                    }}
                  >
                    Hoàn tất
                  </Button>
                  <Button
                    color="info"
                    style={{ margin: 'auto' }}
                    onClick={() => {
                      successAlert(successAlertConstants.createCompetition);
                    }}
                  >
                    Xem trước
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/*Sponsor add form*/}
      <Modal className="modal-dialog-centered" size="md" isOpen={sponsorForm} toggle={() => setSponsorForm(false)}>
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0" lg="9">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-center">
                <h3>Thông tin nhà tài trợ</h3>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-3">
                <img
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  style={{ width: '140px', height: '140px' }}
                  alt="..."
                  src={imgBase64Sponsor}
                />
              </div>
              <label className="form-control-label">
                Họ và tên <span className="text-warning">*</span>
              </label>
              <Input
                value={sponsorName}
                valid={sponsorName !== ''}
                invalid={sponsorName === ''}
                type="text"
                placeholder="Tên nhà tài trợ"
                onChange={(e) => {
                  setSponsorName(e.target.value);
                }}
              />
              <label className="form-control-label">
                Email <span className="text-warning">*</span>
              </label>
              <Input
                value={sponsorEmail}
                valid={sponsorEmail !== '' && ValidateEmail(sponsorEmail)}
                invalid={sponsorEmail === '' || !ValidateEmail(sponsorEmail)}
                type="email"
                placeholder="Địa chỉ email"
                onChange={(e) => {
                  setSponsorEmail(e.target.value);
                }}
              />
              <label className="form-control-label">Website</label>
              <Input
                value={sponsorWebsite}
                type="text"
                placeholder="Địa chỉ website"
                onChange={(e) => {
                  setSponsorWebsite(e.target.value);
                }}
              />
              <label className="form-control-label">Mô tả</label>
              <Input
                value={sponsorDescription}
                type="text"
                placeholder="Tên nhà tài trợ"
                onChange={(e) => {
                  setSponsorDescription(e.target.value);
                }}
              />
              <label className="form-control-label">Ảnh</label>
              <div className="custom-file">
                <input
                  className="custom-file-input"
                  id="customFileLang"
                  lang="en"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSponsorChange(e)}
                />
                <label className="custom-file-label" htmlFor="customFileLang">
                  Select file
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => {
                    if (sponsorName.trim() !== '' && sponsorEmail.trim() !== '') {
                      if (ValidateEmail(sponsorEmail)) {
                        setSponsorForm(false);
                        addSponsor(sponsorName, imgBase64Sponsor, sponsorWebsite, sponsorEmail, sponsorDescription);
                      } else {
                        warningAlert(warningAlertConstants.emailValidation);
                      }
                    } else {
                      warningAlert(warningAlertConstants.informationValidation);
                    }
                  }}
                >
                  Thêm mới +
                </Button>
                <Button className="my-4" color="danger" type="button" onClick={() => setSponsorForm(false)}>
                  Đóng
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Modal>

      {/*sponsor detail*/}
      <Modal className="modal-dialog-centered" size="md" isOpen={sponsorDetailForm} toggle={() => setSponsorDetailForm(false)}>
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0" lg="9">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-center">
                <h3>Thông tin nhà tài trợ</h3>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-3">
                <img
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  style={{ width: '140px', height: '140px' }}
                  alt="..."
                  src={sponsorDetail.url}
                />
              </div>
              <label className="form-control-label">
                Họ và tên <span className="text-warning">*</span>
              </label>
              <Input value={sponsorDetail.name} type="text" disabled />
              <label className="form-control-label">
                Email <span className="text-warning">*</span>
              </label>
              <Input value={sponsorDetail.email} type="email" disabled />
              <label className="form-control-label">Website</label>
              <Input value={sponsorDetail.website} type="text" disabled />
              <label className="form-control-label">Mô tả</label>
              <Input value={sponsorDetail.description} type="text" disabled />
              <div className="text-center">
                <Button
                  className="my-4"
                  outline
                  color="danger"
                  type="button"
                  onClick={() => {
                    setSponsorDetailForm(false);
                    removeSponsor(sponsorDetail.index);
                  }}
                >
                  Xóa
                </Button>
                <Button className="my-4" color="danger" type="button" onClick={() => setSponsorDetailForm(false)}>
                  Đóng
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Modal>

      {/*influent form*/}
      <Modal className="modal-dialog-centered" size="md" isOpen={influencerModal} toggle={() => setInfluencer(false)}>
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0" lg="9">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-center">
                <h3>Thông tin giám khảo hoặc khách mời</h3>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-3">
                <img
                  className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                  style={{ width: '140px', height: '140px' }}
                  alt="..."
                  src={imgBase64Influencer}
                />
              </div>
              <label className="form-control-label" htmlFor="startdaytime">
                Họ và tên <span className="text-warning">*</span>
              </label>
              <Input
                value={fullnameInfluencer}
                valid={fullnameInfluencer !== ''}
                invalid={fullnameInfluencer === ''}
                type="text"
                placeholder="Tên đầy đủ"
                onChange={(e) => {
                  setFullnameInfluencer(e.target.value);
                }}
              />
              <div className="custom-file">
                <input
                  className="custom-file-input"
                  id="customFileLang"
                  lang="en"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageInfluencerChange(e)}
                />
                <label className="custom-file-label" htmlFor="customFileLang">
                  Select file
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => {
                    if (fullnameInfluencer.trim() !== '') {
                      setinfluencerModal(false);
                      addInfluencer(fullnameInfluencer, imgBase64Influencer);
                    } else {
                      warningAlert(warningAlertConstants.informationValidation);
                    }
                  }}
                >
                  Thêm mới +
                </Button>
                <Button className="my-4" color="danger" type="button" onClick={() => setinfluencerModal(false)}>
                  Đóng
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Modal>

      <Modal className="modal-dialog-centered" size="sm" isOpen={formModal}>
        <div className="modal-body p-0 bg-transparent">
          <Loading style={{ margin: 'auto' }} />
        </div>
      </Modal>
    </>
  );
}
