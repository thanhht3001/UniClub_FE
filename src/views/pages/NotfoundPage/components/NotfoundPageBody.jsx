import React from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

export default function NotfoundPageBody() {
  const history = useHistory();
  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center align-items-center mb-0">
          <Col className="text-center" lg="10" md="10">
            <Card style={{ borderRadius: '60px' }}>
              <CardHeader className="mb-0" style={{ borderRadius: '50px' }}>
                <i className="far fa-frown fa-10x text-warning" />
                <h1 className="display-1 text-warning mb-0" style={{ fontWeight: '900', fontSize: '100px' }}>
                  404
                </h1>
              </CardHeader>
              <CardBody>
                <Row className="justify-content-center align-items-center">
                  <Col className="text-center" md="8">
                    <span className="display-4">Trang bạn tìm đã hết hạn hoặc không tồn tại</span>
                    <Row className="justify-content-center align-items-center">
                      <Col className="col-auto">
                        <Button className="mt-3" color="info" outline style={{ borderRadius: '20px' }} onClick={() => history.push('/')}>
                          Về trang chủ
                        </Button>
                      </Col>
                      <Col className="col-auto">
                        <Button className="mt-3" color="success" outline style={{ borderRadius: '20px' }} onClick={() => history.goBack()}>
                          Trở lại trang trước
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
