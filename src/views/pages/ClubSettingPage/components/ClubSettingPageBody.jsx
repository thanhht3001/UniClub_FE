import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Container, Input, Row, UncontrolledTooltip } from 'reactstrap';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { warningAlertConstants } from 'constants/alert.constants';
import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import { toBase64 } from 'services/formatData';
import { updateDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';

export default function ClubSettingPageBody() {
  const [clubs, setClubs] = useState(null);
  const [alert, setalert] = useState(false);
  const [image, setImage] = useState(noAvatarBase64);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [club_fanpage, setClub_fanpage] = useState('');
  const [club_contact, setClub_contact] = useState('');
  const imageButton = useRef(null);

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-200px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="xác nhận"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const successAlert = (message) => {
    setalert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-200px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="xác nhận"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  async function getClubData(accessToken, clubID) {
    const res = await getDataByPath(`api/v1/clubs/${clubID}`, accessToken, '');
    console.log(res, 'club');
    if (res && res.status === 200) {
      setClubs(res.data);
      setName(res.data.name);
      setImage(res.data.image);
      setDescription(res.data.description);
      setClub_contact(res.data.club_contact);
      setClub_fanpage(res.data.club_fanpage);
    } else if (res && res.status === 401) {
      warningAlert(warningAlertConstants.accountError);
    } else {
      warningAlert(warningAlertConstants.timeout);
    }
  }

  const handleClickImage = () => {
    imageButton.current.click();
  };

  const convertDataToUpdate = () => {
    let avatar = image;
    if (checkIsBase64(image)) {
      avatar = image.split(',')[1];
    }
    const data = {
      id: clubs.id,
      name: name,
      description: description,
      image: avatar,
      founding: clubs.founding,
      status: true,
      club_fanpage: club_fanpage,
      club_contact: club_contact,
    };
    return data;
  };

  async function updateClubData() {
    if (checkValidation() && localStorage && localStorage.getItem('accessToken')) {
      const path = 'api/v1/clubs';
      const data = convertDataToUpdate();
      const accessToken = localStorage.getItem('accessToken');
      console.log(data, 'data');
      const res = await updateDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === statusCode.success) {
        successAlert('Cập nhật dữ liệu thành công');
      } else warningAlert(warningAlertConstants.timeout);
    }
  }

  const checkValidation = () => {
    if (name.trim() === '') {
      warningAlert('Tên câu lạc bộ không được bỏ trống');
      return false;
    } else if (name.trim().length < 4 || name.trim().length > 50) {
      warningAlert('Tên câu lạc nằm trong khoảng 4 đến 50 ký tự');
      return false;
    }
    return true;
  };

  const checkIsBase64 = (string) => {
    if (string.includes('https')) {
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let _convertImageToBase64 = toBase64(e.target.files[0]);
      Promise.all([_convertImageToBase64]).then((values) => {
        setImage(values[0]);
      });
    }
  };

  React.useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const clubId = localStorage.getItem('clubID');
      if (clubs === null) {
        getClubData(accessToken, clubId);
      }
    }
  }, []);

  return (
    <>
      {alert}
      <Container className="mt--6 bg-neutral" fluid>
        <Card>
          <CardHeader>
            <Row>
              <Col md="12">
                <h3> Thông tin câu lạc bộ</h3>
              </Col>
            </Row>
          </CardHeader>
          {clubs ? (
            <>
              <CardBody>
                <Row className="justify-content-lg-center">
                  <Col md="3" className="text-center" style={{ borderRight: '1px solid gray' }}>
                    <CardTitle>
                      <h3 className="font-weight-bold">Ảnh đại diện</h3>
                    </CardTitle>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={imageButton} onChange={(e) => handleImageChange(e)} />
                    <a
                      className="avatar avatar-xl rounded-circle"
                      href="#pablo"
                      id="tooltip598826101"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClickImage();
                      }}
                    >
                      <img alt="..." src={image ?? require('assets/img/icons/avatar/No_image_available.png').default} />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip598826101">
                      Thay đổi ảnh đại diện
                    </UncontrolledTooltip>
                  </Col>
                  <Col md="9">
                    <h3 className="font-weight-bolder">
                      <i className="far fa-sticky-note mr-1" /> Tên câu lạc bộ <span className="text-warning">*</span>:
                      <Input className="font-weight-bold ml-3" defaultValue={clubs.name} bsSize="sm" />
                    </h3>
                    <h3 className="font-weight-bolder">
                      <i className="far fa-comment-alt mr-1" /> Giới thiệu:
                      <Input className="font-weight-bold ml-3" defaultValue={clubs.description} bsSize="sm" />
                    </h3>
                    <h3 className="font-weight-bolder">
                      <i className="fas fa-info mr-1" /> Thông tin liên lạc:
                      <Input className="font-weight-bold ml-3" defaultValue={clubs.club_contact} bsSize="sm" />
                    </h3>
                    <h3 className="font-weight-bolder">
                      <i className="fas fa-globe-americas mr-1" /> Fanpage:
                      <Input className="font-weight-bold ml-3" defaultValue={clubs.club_fanpage} bsSize="sm" />
                    </h3>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row className="justify-content-center">
                  <Col className="col-auto">
                    <Button color="success" onClick={() => updateClubData()}>
                      Cập nhật thông tin
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </>
          ) : (
            <Row>
              <Col className="text-center" md="12">
                <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '60%' }} />
              </Col>
            </Row>
          )}
        </Card>
      </Container>
    </>
  );
}
