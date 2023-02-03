import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardHeader, CardTitle, Col, Container, Row } from 'reactstrap';

export default function ActivityDetailHeader(props) {
  return (
    <>
      <Container fluid>
        <div className="header-body">
          <Row className="align-items-center py-4">
            <Col lg="6" xs="7">
              <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                <BreadcrumbItem>
                  <a className="text-default" href="/admin/thong-tin-clb" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-home" />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a className="text-default" href="/admin/hoat-dong">
                    Hoạt động
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page" className="active" style={{ color: 'grey' }}>
                  Chi tiết
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-center text-default font-weight-bold">{props.competitionData.name}</CardTitle>
          </CardHeader>
        </Card>
      </Container>
    </>
  );
}
