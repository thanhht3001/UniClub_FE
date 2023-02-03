import React from 'react';
import 'moment/locale/vi';
import { Button, Card, Col, Container, Input, Row } from 'reactstrap';
import CompetitionCard from 'components/Cards/CompetitionCard';
import { useHistory } from 'react-router';

export default function CompetitionPageBody(data) {
  const history = useHistory();

  return (
    <Container className="mt--6 bg-white" fluid>
      {data.competitionList1 ? (
        <Card className="pl-4">
          <Row className="align-items-center mb-0">
            <Col lg="12" className="mb-0 text-center">
              <h2 className="display-2 text-warning mb-0" style={{ fontFamily: 'sans-serif', paddingTop: '20px' }}>
                Cuộc Thi hoặc Sự Kiện Của Câu Lạc Bộ
              </h2>
              <img
                alt="endline"
                src="https://hoaithanh92.files.wordpress.com/2016/08/transparent-scroll-line.png"
                style={{ transform: 'rotate(180deg)', maxWidth: '60%' }}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col md="9"></Col>
            <Col md="2" className="text-right">
              <Input
                className="text-default font-weight-bold"
                type="select"
                value={data.isEvent}
                onChange={(e) => {
                  data.setIsEvent(parseInt(e.target.value));
                  data.handleChangeEvent(parseInt(e.target.value));
                }}
                bsSize="sm"
              >
                <option value={0}>Tất Cả</option>
                <option value={1}>Cuộc Thi</option>
                <option value={2}>Sự kiện</option>
              </Input>
            </Col>
          </Row>
          {/*status 1*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Bản thảo
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList1 && data.competitionList1.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/ban-thao', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi vừa tạo</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList1 && data.competitionList1.length > 0 ? (
              data.competitionList1.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList1 && data.competitionList1.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col className="text-center" lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 2*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Chờ duyệt
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList2 && data.competitionList2.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/cho-duyet', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đang chờ được duyệt</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList2 && data.competitionList2.length > 0 ? (
              data.competitionList2.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList2 && data.competitionList2.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col className="text-center" lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 3*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Đã duyệt
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList3 && data.competitionList3.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/da-duyet', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đã được xét duyệt</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList3 && data.competitionList3.length > 0 ? (
              data.competitionList3.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList3 && data.competitionList3.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 4*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Công bố
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList4 && data.competitionList4.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/cong-bo', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đã được duyệt và đã mở đăng ký</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList4 && data.competitionList4.length > 0 ? (
              data.competitionList4.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList4 && data.competitionList4.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 5*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Đang diễn ra
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList5 && data.competitionList5.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/dien-ra', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đang diễn ra</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList5 && data.competitionList5.length > 0 ? (
              data.competitionList5.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList5 && data.competitionList5.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 6*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Đã hoàn thành
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList6 && data.competitionList6.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/hoan-thanh', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đã diễn ra và kết thúc</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList6 && data.competitionList6.length > 0 ? (
              data.competitionList6.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList6 && data.competitionList6.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
          {/*status 7*/}
          <Row>
            <Col md="6">
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                Đã hủy
              </h2>
            </Col>
            <Col className="text-right" md="6">
              {data.competitionList7 && data.competitionList7.length > 0 ? (
                <Button
                  className="mr-3"
                  size="sm"
                  color="info"
                  onClick={() => history.push('/admin/cuoc-thi/danh-sach/da-huy', { isEvent: data.isEvent })}
                >
                  Xem thêm
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>Danh sách các cuộc thi đã bị hủy bỏ</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {data.competitionList7 && data.competitionList7.length > 0 ? (
              data.competitionList7.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : data.competitionList7 && data.competitionList7.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            )}
          </Row>
        </Card>
      ) : (
        <></>
      )}
    </Container>
  );
}
