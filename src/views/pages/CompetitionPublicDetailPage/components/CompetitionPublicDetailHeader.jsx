import React from 'react';
import 'moment/locale/vi';

// reactstrap components
import { Breadcrumb, BreadcrumbItem, Container, Row, Col, Badge, Card, CardBody } from 'reactstrap';
import { CompetitionStatus } from 'constants/competition.status';

export default function CompetitionPublicDetailHeader(data) {
  return (
    <>
      <div className="header header-dark bg-neutral pb-6 content__title content__title--calendar">
        <Container fluid style={{ marginTop: '7rem' }}>
          <Card>
            <CardBody>
              <div className="header-body">
                <Row className="align-items-center">
                  <Col lg="6" xs="7">
                    <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                      <BreadcrumbItem>
                        <a className="text-default font-weight-bold" href="/">
                          <i className="fas fa-home" />
                        </a>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <a className="text-default font-weight-bold" href="/cuoc-thi-va-su-kien">
                          Danh sách
                        </a>
                      </BreadcrumbItem>
                      <BreadcrumbItem aria-current="page" className="active" style={{ color: 'grey' }}>
                        Chi tiết
                      </BreadcrumbItem>
                      <BreadcrumbItem aria-current="page" className="active">
                        <Badge color="success">{CompetitionStatus[data.data.status]}</Badge>
                      </BreadcrumbItem>
                      <BreadcrumbItem aria-current="page" className="active">
                        <span className={data.data.number_of_team === 0 ? 'text-danger' : 'text-info'}>
                          {data.data.number_of_team === 0 ? '@Sự kiện' : '@Cuộc thi'}
                        </span>
                      </BreadcrumbItem>
                    </Breadcrumb>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}
