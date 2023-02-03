import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { convertDateToShow } from 'services/formatData';

export default function UniversityClubDetail(props) {
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
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
                  src={props.data.image ? props.data.image : require('assets/img/icons/avatar/No_image_available.png').default}
                  style={{ width: '85%' }}
                />
              </Col>
              <Col className="text-left ml-3" lg="6" md="12">
                <h3 className="mb-1">
                  Tên:{' '}
                  <a href={props.data.club_fanpage} target="blank" className="text-default font-weight-bold">
                    {props.data.name}
                  </a>
                </h3>
                <h3 className="mb-1">
                  Liên hệ: <span style={{ color: 'grey', fontFamily: 'monospace' }}>{props.data.club_contact}</span>
                </h3>
                <h3 className="mb-1">
                  Ngày tạo: <span className="text-default">{convertDateToShow(props.data.founding)}</span>
                </h3>
                <h3 className="mb-1">
                  Tổng số thành viên: <span className="text-default">{props.data.total_member}</span>
                </h3>
                <h3 className="mb-1">
                  Tổng số cuộc thi và sự kiện: <span className="text-default">{props.data.total_event}</span>
                </h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col className="text-center" lg="6" md="12">
                <Button color="warning" outline>
                  <i className="fas fa-trash mr-2" />
                  Xóa câu lạc bộ
                </Button>
              </Col>
              <Col className="text-center" lg="6" md="12">
                <Button
                  color="warning"
                  onClick={() => {
                    props.setClubModal(false);
                  }}
                >
                  Đóng
                </Button>
              </Col>
            </Row>
          </CardBody>
        ) : (
          <Row>
            <Col md="12">
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '30%' }} />
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}
