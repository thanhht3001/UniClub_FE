import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

function CardsHeader() {
  const [clubDatas, setClubDatas] = useState(null);

  async function loadDataClubs(accessToken, studentID, clubID) {
    if (accessToken !== null) {
      const path = `api/v1/clubs/user/${studentID}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      console.log(res, 'club');
      if (res && res.status === 200) {
        if (res.data.length > 1) {
          res.data.forEach((e) => {
            if (e.id === clubID) {
              setClubDatas(e);
            }
          });
        } else {
          setClubDatas(res.data[0]);
        }
      }
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const studentID = localStorage.getItem('studentID');
      const clubID = localStorage.getItem('clubID');
      if (clubDatas === null) {
        loadDataClubs(accessToken, studentID, parseInt(clubID));
      }
    }
  }, []);

  return (
    <>
      <div className="header bg-grey pb-6">
        <Container fluid>
          {clubDatas !== null ? (
            <div className="header-body">
              <Card className="card-wrapper mt-3">
                <Row className="align-items-center py-4 ml-2 mr-2">
                  <Col lg="9" xs="10">
                    <Row>
                      <Col className="col-auto">
                        <a className="avatar rounded-circle" href="/" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            src={`${clubDatas.image !== null ? clubDatas.image : require('assets/img/icons/avatar/No_image_available.png').default} `}
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h3 className="mb-0 text-default" style={{ fontWeight: '900', fontFamily: 'sans-serif', margin: 'auto' }}>
                          <a href={clubDatas.club_fanpage} target="blank">
                            {clubDatas.name}
                          </a>
                        </h3>
                        <span style={{ color: 'grey', fontFamily: 'cursive' }}>{clubDatas.club_contact}</span>{' '}
                      </div>
                    </Row>
                  </Col>
                  <Col className="text-right" lg="3" xs="2">
                    <p className="font-weight-bold text-default mb-0" style={{ fontFamily: 'cursive', margin: 'auto' }}>
                      {clubDatas.university_name}
                    </p>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col md="6" xl="3">
                  <Card className="card-stats" style={{ width: '100%', height: '80%' }}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Giới thiệu
                          </CardTitle>
                          <span className="h4 mb-0">{clubDatas.description}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-align-left-2" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats" style={{ width: '100%', height: '80%' }}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Thành Viên
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{clubDatas.total_member}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-badge" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> {clubDatas.member_increase_this_month}
                        </span>{' '}
                        <span className="text-nowrap">trong tháng này</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats" style={{ width: '100%', height: '80%' }}>
                    <CardBody>
                      <Row>
                        <div className="col" style={{ paddingBottom: '20px' }}>
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Sự kiện và cuộc thi đang tổ chức
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{clubDatas.total_event}</span>
                        </div>
                        <Col className="col-auto ">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-trophy" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6" xl="3">
                  <Card className="card-stats" style={{ width: '100%', height: '80%' }}>
                    <CardBody>
                      <Row>
                        <div className="col" style={{ paddingBottom: '35px' }}>
                          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                            Hoạt động đang diễn ra
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{clubDatas.total_activity}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                            <i className="ni ni-satisfied" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
