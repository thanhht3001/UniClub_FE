import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

export default function UniversityDepartmentDetail(props) {
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
            <Row className="mb-4">
              <Col className="text-left ml-3" lg="12" md="12">
                <h3 className="mb-1 text-uppercase">Mã: {props.data.department_code}</h3>
                <h3 className="mb-1">Tên: {props.data.name}</h3>
                <h3 className="mb-1">Chi tiết: {props.data.description}</h3>
                <h3 className="mb-1">Chuyên ngành: {props.data.major_name}</h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col className="text-center" lg="6" md="12">
                <Button color="warning" outline onClick={() => props.removeDepartmentHandle(props.data.id)}>
                  <i className="fas fa-trash mr-2" />
                  Xóa ngành học
                </Button>
              </Col>
              <Col className="text-center" lg="6" md="12">
                <Button
                  color="warning"
                  onClick={() => {
                    props.setDepartmentModal(false);
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
              <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '30%' }} />
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
}
