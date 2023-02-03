import React from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Media, Row, Table, UncontrolledTooltip } from 'reactstrap';
import { convertDateToShow } from 'services/formatData';

export default function TeamDetailModal(props) {
  return (
    <Card className="bg-secondary border-0 mb-0" lg="9">
      <CardHeader className="bg-transparent">
        <div className="text-center">
          <h3>Thông tin các thành viên trong nhóm:</h3>
        </div>
      </CardHeader>

      {props.teamDetail ? (
        <CardBody>
          <Row className="mb-3">
            <Col md="7">
              <label className="form-control-label mr-3" htmlFor="max-participant">
                Trạng thái
              </label>
              <Badge color="" className="badge-dot mr-4 font-weight-bold">
                <i className={props.teamDetail.status === 1 ? 'bg-warning' : 'bg-success'} />
                <span className="status">{props.teamDetail.status === 1 ? 'Đóng' : 'Mở'}</span>
              </Badge>
            </Col>
            <Col md="5">
              <label className="form-control-label" htmlFor="max-participant">
                Mã mời: {props.teamDetail.invited_code}{' '}
                <a
                  className="text-default"
                  href="#copy"
                  id="copy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(props.teamDetail.invited_code);
                  }}
                >
                  <i className="far fa-copy ml-2" />
                </a>
                <UncontrolledTooltip delay={0} target={`copy`}>
                  Bấm để sao chép
                </UncontrolledTooltip>
              </label>
            </Col>
          </Row>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Họ và tên</th>
                <th scope="col">Vai trò</th>
                <th scope="col">MSSV</th>
                <th scope="col">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {props.teamDetail.list_participant?.length > 0 ? (
                props.teamDetail.list_participant.map((e, value) => {
                  return (
                    <tr key={`${value}`}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img alt="..." src={e.student_avatar ?? require('assets/img/icons/avatar/No_image_available.png').default} />
                          </a>
                          <Media>
                            <span className="name mb-0 text-sm">{e.student_name}</span>
                          </Media>
                        </Media>
                      </th>
                      <td> {e.team_role_id === 1 ? 'Nhóm trưởng' : 'Thành viên'} </td>
                      <td> {e.student_code} </td>
                      <td> {convertDateToShow(e.register_time)} </td>
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
        </CardBody>
      ) : (
        <Row>
          <Col md="12">
            <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '30%' }} />
          </Col>
        </Row>
      )}
      <CardFooter>
        <Row>
          <Col className="text-center" md="12">
            <Button className="my-4" color="danger" type="button" onClick={() => props.setTeamDetailModal(false)}>
              Đóng
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
