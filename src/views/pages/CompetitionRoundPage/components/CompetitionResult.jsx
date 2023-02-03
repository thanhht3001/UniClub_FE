import { statusCode } from 'constants/status.constants';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getDataByPath } from 'services/data.service';

export default function CompetitionResult(props) {
  const [competitionResult, setCompetitionResult] = useState(null);

  async function loadResult(competitionId) {
    if (competitionId) {
      const accessToken = localStorage.getItem('accessToken');
      const path = 'api/v1/teams/final-result-competition';
      const data = `competitionId=${competitionId}&top=50`;
      const res = await getDataByPath(path, accessToken, data);
      console.log(res, 'top');
      if (res && res.status === statusCode.success) {
        setCompetitionResult(res.data);
      }
    }
  }

  const getColorMedal = (rank) => {
    switch (rank) {
      case 1:
        return { color: 'gold' };
      case 2:
        return { color: 'silver' };
      case 3:
        return { color: 'burlywood' };
    }
  };

  useEffect(() => {
    if (competitionResult === null) {
      loadResult(props.CompetitionId);
    }
  }, []);

  return (
    <Card className="mt--6">
      <CardHeader>
        <Row>
          <Col className="text-center" md="12">
            <h2 className="display-3 font-weight-bolder text-warning">Kết quả cuộc thi</h2>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="12">
            {competitionResult ? (
              <>
                <Row className="justify-content-center mb-3 align-items-end" style={{ height: '400px' }}>
                  <Col md="2" className="text-center mb-3" style={{ height: '70%' }}>
                    <Card style={{ height: '100%', width: '90%' }}>
                      {competitionResult[1] ? (
                        <>
                          <CardHeader className="bg-gradient-warning pt-2 pb-1" style={{ borderRadius: '5px' }}>
                            <h4 className="text-neutral font-weight-bolder">{competitionResult[1]?.name}</h4>
                          </CardHeader>
                          <i
                            className="fas fa-medal fa-4x"
                            style={{ color: 'silver', position: 'absolute', margin: 'auto', left: 0, right: 0, top: 43.5 }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <CardBody className="bg-purple mt-3 text-center" style={{ borderRadius: '5px', height: '100%' }}>
                        <h1 className="text-neutral font-weight-bolder mt-5">{competitionResult[1]?.total_point}</h1>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" className="text-center mb-3" style={{ height: '90%' }}>
                    <Card style={{ height: '100%', width: '90%' }}>
                      {competitionResult[0] ? (
                        <>
                          <CardHeader className="bg-gradient-warning pt-2 pb-1" style={{ borderRadius: '5px' }}>
                            <h4 className="text-neutral font-weight-bolder">{competitionResult[0]?.name}</h4>
                          </CardHeader>
                          <i
                            className="fas fa-medal fa-4x"
                            style={{ color: 'gold', position: 'absolute', margin: 'auto', left: 0, right: 0, top: 43.5 }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <CardBody className="bg-purple mt-3 text-center" style={{ borderRadius: '5px', height: '100%' }}>
                        <h1 className="text-neutral font-weight-bolder mt-5">{competitionResult[0]?.total_point}</h1>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="2" className="text-center mb-3" style={{ height: '50%' }}>
                    <Card style={{ height: '100%', width: '90%' }}>
                      {competitionResult[2] ? (
                        <>
                          <CardHeader className="bg-gradient-warning pt-2 pb-1" style={{ borderRadius: '5px' }}>
                            <h4 className="text-neutral font-weight-bolder">{competitionResult[2]?.name}</h4>
                          </CardHeader>
                          <i
                            className="fas fa-medal fa-4x"
                            style={{ color: 'burlywood', position: 'absolute', margin: 'auto', left: 0, right: 0, top: 43.5 }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <CardBody className="bg-purple mt-3 text-center" style={{ borderRadius: '5px', height: '100%' }}>
                        <h1 className="text-neutral font-weight-bolder mt-5">{competitionResult[2]?.total_point}</h1>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Xếp hạng</th>
                      <th scope="col">Tên nhóm</th>
                      <th scope="col" className="text-center">
                        Số thành viên
                      </th>
                      <th scope="col" className="text-center">
                        Tổng điểm
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitionResult.length > 0 ? (
                      competitionResult.map((e, value) => {
                        return (
                          <tr key={`team-${value}`}>
                            <td>
                              <span className="font-weight-bolder">
                                {!(e.rank === 1 || e.rank === 2 || e.rank === 3) ? (
                                  e.rank
                                ) : (
                                  <i className="fas fa-crown" style={getColorMedal(e.rank)} />
                                )}
                              </span>{' '}
                            </td>
                            <th scope="row">
                              <span className="font-weight-bold">{e.name}</span>
                            </th>
                            <td className="text-center"> {e.number_of_member_in_team} </td>
                            <td className="text-center">
                              <span className="text-success font-weight-bolder">{e.total_point}</span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5">
                          <Row>
                            <Col className="text-center" md="12">
                              <h2 className="display-4 mb-0">Danh sách trống</h2>
                              <img
                                alt="..."
                                src={require('assets/img/icons/empty.jpg').default}
                                style={{ width: '30%', margin: 'auto', maxHeight: '450px' }}
                              />
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </>
            ) : (
              <Row>
                <Col className="text-center" md="12">
                  <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '70%' }} />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
