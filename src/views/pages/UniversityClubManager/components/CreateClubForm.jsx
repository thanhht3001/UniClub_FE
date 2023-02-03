import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledPopover,
  UncontrolledTooltip,
} from 'reactstrap';
import { toBase64 } from 'services/formatData';
import UserCard from './UserCard';

export default function CreateClubForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(noAvatarBase64);
  const [club_fanpage, setClub_fanpage] = useState('');
  const [club_contact, setClub_contact] = useState('');
  const [user_id, setUser_id] = useState(-1);
  const [userInfo, setUserInfo] = useState(null);

  const handleSelectUser = (name, email, avatar, id) => {
    setUser_id(id);
    const userData = { name: name, email: email, image: avatar };
    setUserInfo(userData);
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

  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent">
          <div className="text-center">
            <h3>Thông tin chi tiết:</h3>
          </div>
        </CardHeader>
        <CardBody>
          <Row className="mb-1">
            <Col className="text-center" md="12">
              <h3 className="mb-1">
                Bổ nhiệm chủ nhiệm câu lạc bộ:
                <Button outline id="tooltip-memberaddnew" color="info" size="sm" className="ml-2">
                  <i className="fas fa-plus mr-2" />
                  Chọn người dùng
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip-memberaddnew">
                  Thêm mới
                </UncontrolledTooltip>
                <UncontrolledPopover
                  placement="bottom"
                  target="tooltip-memberaddnew"
                  trigger="legacy"
                  style={{ maxWidth: '500px', minWidth: '300px' }}
                >
                  <PopoverHeader className="text-center">Thêm vào hoạt động</PopoverHeader>
                  <PopoverBody>
                    <UserCard handleSelectUser={handleSelectUser} />
                  </PopoverBody>
                </UncontrolledPopover>
              </h3>
            </Col>
          </Row>
          {userInfo ? (
            <Row className="justify-content-center align-items-center">
              <Card>
                <CardBody>
                  <Col md="12">
                    <Row className="align-items-center mb-2 justify-content-center">
                      <Col className="col-auto">
                        <a className="avatar rounded-circle" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={userInfo.image ?? noAvatarBase64} />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            {userInfo.name}
                          </a>
                        </h4>
                        <small className="text-muted">{userInfo.email}</small>
                      </div>
                    </Row>
                  </Col>
                </CardBody>
              </Card>
            </Row>
          ) : (
            <></>
          )}
          <Row className="mb-4">
            <Col className="text-left ml-3" lg="12" md="12">
              <h3 className="mb-1">
                Tên câu lạc bộ:{' '}
                <Input className="font-weight-bold" bsSize="sm" minLength={4} maxLength={50} value={name} onChange={(e) => setName(e.target.value)} />
              </h3>
              <h3 className="mb-1">
                Chi tiết: <Input bsSize="sm" value={description} onChange={(e) => setDescription(e.target.value)} />
              </h3>
              <h3 className="mb-1">
                Fanpage câu lạc bộ: <Input bsSize="sm" value={club_fanpage} onChange={(e) => setClub_fanpage(e.target.value)} />
              </h3>
              <h3 className="mb-1">
                Email liên hệ: <Input bsSize="sm" value={club_contact} onChange={(e) => setClub_contact(e.target.value)} />
              </h3>
              <h3 className="mb-1">Ảnh đại điện câu lạc bộ:</h3>
              <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <Button color="success" onClick={() => props.createClub(user_id, name, description, image, club_fanpage, club_contact)}>
                Tạo
              </Button>
            </Col>
            <Col md="6" className="text-center">
              <Button color="default" onClick={() => props.setCreateClubModal(false)}>
                Đóng
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </>
  );
}
