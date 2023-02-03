import ActivityCard from 'components/Cards/ActivityCard';
import React from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardHeader, Col, Container, Row } from 'reactstrap';

export default function AcitivityPageBody(props) {
  const history = useHistory();
  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Container className="mt-1 bg-white" fluid>
      <Card className="pl-4">
        <CardHeader className="text-center mb-0">
          <h2 className="display-2 text-warning text-center mb-0" style={{ fontFamily: 'sans-serif', paddingTop: '20px' }}>
            Tiến Độ Hoạt Động
          </h2>
          <Row className="align-items-center mb-0 pb-0" style={{ width: '50%', margin: 'auto' }}>
            <Col className="mb-0 pb-0">
              <hr style={{ borderTop: '1px solid black', width: '80%' }} />
            </Col>
            <Col className="mb-0 pb-0" md="8" sm="8">
              <hr style={{ borderTop: '1px solid black', width: '80%' }} />
            </Col>
            <Col className="mb-0 pb-0">
              <hr style={{ borderTop: '1px solid black', width: '80%' }} />
            </Col>
          </Row>
        </CardHeader>
        {/*case 1*/}
        <Row>
          <Col md="6">
            <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
              Đã duyệt
            </h2>
          </Col>
          <Col className="text-right" md="6">
            {props.competitionData1 && props.competitionData1.length > 0 ? (
              <Button className="mr-3" size="sm" color="info" onClick={() => history.push('/admin/hoat-dong/danh-sach/da-duyet')}>
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
          {props.competitionData1 && props.competitionData1.length > 0 ? (
            props.competitionData1.map((e, value) => {
              return (
                <Col xl="3" md="6" key={`ShowCompetition-${value}`}>
                  <ActivityCard data={e} />
                </Col>
              );
            })
          ) : props.competitionData1 && props.competitionData1.length === 0 ? (
            <Col md="12" className="text-center">
              <h2 className="display-4" style={{ margin: 'auto' }}>
                Danh sách trống
              </h2>
              <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
            </Col>
          ) : (
            <Row>
              <Col md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            </Row>
          )}
        </Row>
        {/*case 2*/}
        <Row>
          <Col md="6">
            <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
              Công bố
            </h2>
          </Col>
          <Col className="text-right" md="6">
            {props.competitionData2 && props.competitionData2.length > 0 ? (
              <Button className="mr-3" size="sm" color="info" onClick={() => history.push('/admin/hoat-dong/danh-sach/cong-bo')}>
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
          {props.competitionData2 && props.competitionData2.length > 0 ? (
            props.competitionData2.map((e, value) => {
              return (
                <Col xl="3" md="6" key={`ShowCompetition-${value}`}>
                  <ActivityCard data={e} />
                </Col>
              );
            })
          ) : props.competitionData2 && props.competitionData2.length === 0 ? (
            <Col md="12" className="text-center">
              <h2 className="display-4" style={{ margin: 'auto' }}>
                Danh sách trống
              </h2>
              <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
            </Col>
          ) : (
            <Row>
              <Col md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            </Row>
          )}
        </Row>
        {/*case 3*/}
        <Row>
          <Col md="6">
            <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
              Đang diễn ra
            </h2>
          </Col>
          <Col className="text-right" md="6">
            {props.competitionData3 && props.competitionData3.length > 0 ? (
              <Button className="mr-3" size="sm" color="info" onClick={() => history.push('/admin/hoat-dong/danh-sach/dien-ra')}>
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
          {props.competitionData3 && props.competitionData3.length > 0 ? (
            props.competitionData3.map((e, value) => {
              return (
                <Col xl="3" md="6" key={`ShowCompetition-${value}`}>
                  <ActivityCard data={e} />
                </Col>
              );
            })
          ) : props.competitionData3 && props.competitionData3.length === 0 ? (
            <Col md="12" className="text-center">
              <h2 className="display-4" style={{ margin: 'auto' }}>
                Danh sách trống
              </h2>
              <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
            </Col>
          ) : (
            <Row>
              <Col md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            </Row>
          )}
        </Row>
        {/*case 4*/}
        <Row>
          <Col md="6">
            <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
              Đã hoàn thành
            </h2>
          </Col>
          <Col className="text-right" md="6">
            {props.competitionData4 && props.competitionData4.length > 0 ? (
              <Button className="mr-3" size="sm" color="info" onClick={() => history.push('/admin/hoat-dong/danh-sach/hoan-thanh')}>
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
          {props.competitionData4 && props.competitionData4.length > 0 ? (
            props.competitionData4.map((e, value) => {
              return (
                <Col xl="3" md="6" key={`ShowCompetition-${value}`}>
                  <ActivityCard data={e} />
                </Col>
              );
            })
          ) : props.competitionData4 && props.competitionData4.length === 0 ? (
            <Col md="12" className="text-center">
              <h2 className="display-4" style={{ margin: 'auto' }}>
                Danh sách trống
              </h2>
              <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
            </Col>
          ) : (
            <Row>
              <Col md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', weight: '200px', height: '200px' }}
                />
              </Col>
            </Row>
          )}
        </Row>
      </Card>
    </Container>
  );
}
