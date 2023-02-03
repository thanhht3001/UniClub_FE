import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Row, Col, Button } from 'reactstrap';

export default function CompetitionRoundHeader(props) {
  return (
    <div className="header header-dark bg-neutral pb-6 content__title content__title--calendar">
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
                  <a className="text-default" href="/admin/cuoc-thi">
                    Cuộc thi
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page" className="active" style={{ color: 'grey' }}>
                  <a className="text-default" href={`/admin/cuoc-thi/chi-tiet/${props.data.id}`}>
                    Chi tiết
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page" className="active" style={{ color: 'gray' }}>
                  {props.data.status !== 11 ? 'Vòng thi' : 'Kết quả'}
                </BreadcrumbItem>
                {props.data.status === 11 ? (
                  <BreadcrumbItem>
                    <Button size="sm" outline color="primary" onClick={() => props.setShowRound(!props.showRound)}>
                      {props.showRound ? 'Ẩn vòng thi' : 'Hiện vòng thi'}
                    </Button>
                  </BreadcrumbItem>
                ) : (
                  <></>
                )}
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
