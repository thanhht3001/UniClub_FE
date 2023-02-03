import { statusCode } from 'constants/status.constants';
import { useEffect, useState } from 'react';
// reactstrap components
import { Card, Container, Row, Col, Badge } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

function UniversityHeader() {
  const [university, setUniversity] = useState(null);

  async function loadDataUniversity(accessToken, universityID) {
    if (accessToken !== null) {
      const path = `api/v1/universities/${universityID}`;
      const res = await getDataByPath(`${path}`, accessToken, '');
      if (res && res.status === statusCode.success) {
        setUniversity(res.data);
      }
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const universityID = localStorage.getItem('universityID');
      if (university === null) {
        loadDataUniversity(accessToken, universityID);
      }
    }
  }, []);

  return (
    <>
      <div className="header bg-grey pb-6">
        <Container fluid>
          {university !== null ? (
            <div className="header-body">
              <Card className="card-wrapper mt-3">
                <Row className="align-items-center py-4 ml-2 mr-2">
                  <Col md="6">
                    <h3 className="mb-0 text-default" style={{ fontWeight: '900', fontFamily: 'sans-serif', margin: 'auto' }}>
                      {university.name}{' '}
                      <span className="text-mute" style={{ fontWeight: 'initial' }}>
                        ({university.uni_code})
                      </span>
                    </h3>
                    <span style={{ color: 'grey', fontFamily: 'cursive' }}>Email: {university.email}</span>
                    <br />
                    <span style={{ color: 'grey', fontFamily: 'monospace' }}>Liên hệ: {university.phone}</span>
                  </Col>
                  <Col md="6" className="text-right">
                    <Badge className="mb-3" pill color={university.status ? 'success' : 'warning'}>
                      {university.status ? 'Hoạt động' : 'Không khả dụng'}
                    </Badge>
                    <br />
                    <span className="font-weight-bold">{university.city_name}</span>
                    <br />
                    <span className="font-weight-bold">Giờ mở: {`${university.opening} - ${university.closing}`}</span>
                  </Col>
                </Row>
              </Card>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
}

export default UniversityHeader;
