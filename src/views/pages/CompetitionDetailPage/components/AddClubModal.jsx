import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getDataByPath } from 'services/data.service';
import Select2 from 'react-select2-wrapper';

export default function AddClubModal(props) {
  const [universitys, setUniversitys] = useState(null);
  const [clubs, setClubs] = useState(null);
  const [clubsDetail, setClubsDetail] = useState(null);
  const [selectUni, setSelectUni] = useState(0);
  const [selectClub, setSelectClub] = useState(0);
  const [dataClub, setDataClub] = useState(null);
  const [clubInCompetition, setClubInCompetition] = useState(null);

  async function loadDataUniversity() {
    if (localStorage && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/universities/search';
      const data = `status=true&pageSize=50`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        setUniversitys(handleConvertData(res.data.items));
      }
    }
  }

  async function loadDataClub(universityId) {
    if (localStorage && localStorage.getItem('accessToken') && universityId) {
      const clubId = localStorage.getItem('clubID');
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/clubs/club-manager/search';
      const data = `clubId=${clubId}&pageSize=50&universityIds=${universityId}`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res);
      if (res && res.status === 200) {
        setClubs(handleConvertData(res.data.items));
        setDataClub(res.data.items);
      }
    }
  }

  const handleConvertData = (items) => {
    const newUniversit = [];
    for (let index = 0; index < items.length; index++) {
      const element = { id: items[index].id, text: items[index].name };
      newUniversit.push(element);
    }
    return newUniversit;
  };

  const handleSelectClub = (id) => {
    for (let i = 0; i < dataClub.length; i++) {
      const e = dataClub[i];
      if (e.id === parseInt(id)) {
        setClubsDetail(e);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (universitys === null) {
      loadDataUniversity('');
    }
  }, []);

  useEffect(() => {
    setClubInCompetition(props.clubInCompetition);
  }, [props.clubInCompetition]);

  return (
    <Card className="bg-secondary border-0 mb-0" lg="9">
      <CardHeader className="bg-transparent pb-0">
        <div className="text-center">
          <h3>Thêm câu lạc bộ quản trị</h3>
        </div>
      </CardHeader>
      <CardBody className="text-center">
        <CardTitle className="mb-0">
          <h3>Các câu lạc bộ tham gia và tổ chức</h3>
        </CardTitle>
        {clubInCompetition && clubInCompetition.length > 0 ? (
          <Row className="align-items-center mb-3 justify-content-center">
            {clubInCompetition.map((e, value) => {
              return (
                <Col className="col-auto text-center" key={`club-${value}`}>
                  <a
                    href="/"
                    onClick={(ele) => {
                      ele.preventDefault();
                      props.handleRemoveClub(e.id);
                    }}
                    id={`club-${value}`}
                    rel="noreferrer"
                  >
                    <img
                      alt="..."
                      className="img-fluid rounded-circle md"
                      src={e.image ? e.image : require('assets/img/icons/avatar/No_image_available.png').default}
                      style={{ backgroundColor: 'white', width: '60px', height: '60px' }}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target={`club-${value}`}>
                    {e.is_owner === true ? `Câu lạc bộ tạo: ${e.name}` : `${e.name}`}
                  </UncontrolledTooltip>
                </Col>
              );
            })}
          </Row>
        ) : (
          <></>
        )}
        <Row className="justify-content-center" style={{ minHeight: '250px' }}>
          <Col md="8" className="text-left">
            <span className="text-grey">Trường:</span>
            {universitys ? (
              <Select2
                options={{
                  placeholder: 'Tìm kiếm',
                }}
                data={universitys}
                value={selectUni}
                onChange={(e) => {
                  setSelectUni(e.target.value);
                  loadDataClub(e.target.value);
                }}
              />
            ) : (
              <></>
            )}

            {clubs ? (
              <>
                <span className="text-grey mt-3">Câu lạc bộ:</span>
                <Select2
                  options={{
                    placeholder: 'Tìm kiếm',
                  }}
                  data={clubs}
                  value={selectClub}
                  onChange={(e) => {
                    setSelectClub(e.target.value);
                    handleSelectClub(e.target.value);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        {clubsDetail ? (
          <Row className="justify-content-center">
            <Col md="8">
              <Card>
                <CardBody>
                  <Row className="align-items-center">
                    <Col lg="9" xs="10">
                      <Row>
                        <Col className="col-auto">
                          <a className="avatar rounded-circle" href="/" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              src={`${
                                clubsDetail.image !== null ? clubsDetail.image : require('assets/img/icons/avatar/No_image_available.png').default
                              } `}
                            />
                          </a>
                        </Col>
                        <div className="col ml--2 text-left">
                          <h3 className="mb-0 text-default" style={{ fontWeight: '900', fontFamily: 'sans-serif', margin: 'auto' }}>
                            <a href={clubsDetail.club_fanpage} target="blank">
                              {clubsDetail.name}
                            </a>
                          </h3>
                          <span style={{ color: 'grey', fontFamily: 'cursive' }}>{clubsDetail.club_contact}</span>{' '}
                        </div>
                      </Row>
                    </Col>
                    <Col className="text-right" lg="3" xs="2">
                      <p className="font-weight-bold text-default mb-0" style={{ fontFamily: 'cursive', margin: 'auto' }}>
                        {clubsDetail.university_name}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        {clubsDetail ? (
          <Button className="my-4 fixed-bottom" color="success" type="button" onClick={() => props.addClubToCompetition(clubsDetail.id)}>
            Thêm câu lạc bộ
          </Button>
        ) : (
          <></>
        )}
        <Button className="my-4 fixed-bottom" color="danger" type="button" onClick={() => props.setClubModal(false)}>
          Đóng
        </Button>
      </CardBody>
    </Card>
  );
}
