import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, PopoverBody, PopoverHeader, Row, UncontrolledPopover } from 'reactstrap';
import { convertDateToShow } from 'services/formatData';
import styled from 'styled-components';

const Role = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 3px;
  font-weight: bold;
  :hover {
    background-color: #7e7e7e6f;
  }
`;

export default function ClubMemberDetail(props) {
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent">
          <div className="text-center">
            <h3>Thông tin chi tiết:</h3>
          </div>
        </CardHeader>
        {props.data ? (
          <CardBody className="px-lg-5 py-lg-5">
            <Row className="mb-2">
              <Col className="text-center" lg="4" md="12" style={{ borderRightStyle: 'solid', borderRightWidth: '2px', width: '95%' }}>
                <img
                  className="mb-2"
                  alt="..."
                  src={props.data.avatar ? props.data.avatar : require('assets/img/icons/avatar/No_image_available.png').default}
                  style={{ width: '85%' }}
                />
              </Col>
              <Col className="text-left ml-3" lg="6" md="12">
                <h3 className="mb-1">Tên: {props.data.name}</h3>
                <h3 className="mb-1">MSSV: {props.data.student_code}</h3>
                <h3 className="mb-1">
                  Chức vụ: <span className="text-gray">{props.data.club_role_name}</span>{' '}
                  {props.data.club_role_id !== 1 ? (
                    <>
                      <Button size="sm" outline color="info" id="roleChange">
                        Thay đổi
                      </Button>
                      <UncontrolledPopover placement="bottom" target="roleChange" trigger="legacy" style={{ maxWidth: '500px', minWidth: '300px' }}>
                        <PopoverHeader className="text-center">Thay đổi chức vụ</PopoverHeader>
                        <PopoverBody>
                          <Row>
                            <Col md="12" className="text-center">
                              <a
                                href="#priority"
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.updateMemberRole(props.data.id, 4);
                                }}
                              >
                                <Role className="font-weight-bold text-default">Thành Viên</Role>
                              </a>
                            </Col>
                            <Col md="12" className="text-center">
                              <a
                                href="#priority"
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.updateMemberRole(props.data.id, 3);
                                }}
                              >
                                <Role className="font-weight-bold text-default">Trưởng Ban</Role>
                              </a>
                            </Col>
                            <Col md="12" className="text-center">
                              <a
                                href="#priority"
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.updateMemberRole(props.data.id, 2);
                                }}
                              >
                                <Role className="font-weight-bold text-default">Phó Chủ Nhiệm</Role>
                              </a>
                            </Col>
                          </Row>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </>
                  ) : (
                    <></>
                  )}
                </h3>
                <h3>
                  Email: <span>{props.data.email}</span>
                </h3>
                <h3>Số điện thoại: {props.data.phone_number ? props.data.phone_number : 'không có'}</h3>
                <h3>Ngày tham gia câu lạc bộ: {convertDateToShow(props.data.join_date)}</h3>
                <Row>
                  <div className="col">
                    <h3>
                      Trạng thái:
                      <span className={`${props.data.is_online === true ? 'text-success' : 'text-danger'} ml-2`}>●</span>{' '}
                      <span className="font-weight-bold">{props.data.is_online === true ? 'Online' : 'Offline'}</span>
                    </h3>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center">
              {props.data.club_role_id !== 1 ? (
                <Col className="text-center" lg="6" md="12">
                  <Button color="warning" outline onClick={() => props.annoucementAlert(props.data.id)}>
                    <i className="fas fa-trash mr-2" />
                    Xóa khỏi câu lạc bộ
                  </Button>
                </Col>
              ) : (
                <></>
              )}
              <Col className="text-center" lg="6" md="12">
                <Button
                  color="warning"
                  onClick={() => {
                    props.setMemberModal(false);
                  }}
                >
                  Đóng
                </Button>
              </Col>
            </Row>
          </CardBody>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '50%' }} />
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}
