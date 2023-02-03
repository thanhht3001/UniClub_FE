import { CompetitionStatus } from 'constants/competition.status';
import React from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import { convertDateToShowWithTime } from 'services/formatData';

export default function StatusHistory(props) {
  return (
    <Card className="bg-secondary border-0 mb-0" lg="12">
      <CardHeader className="bg-transparent pb-0">
        <div className="text-center">
          <h3>Lịch sử trạng thái</h3>
        </div>
      </CardHeader>
      <CardBody>
        {props.statusHistoryList ? (
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Người thực hiện</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {props.statusHistoryList.length > 0 ? (
                props.statusHistoryList.map((e, value) => {
                  return (
                    <tr key={`status-${value}`}>
                      <td> {e.changer_name} </td>
                      <td> {convertDateToShowWithTime(e.change_date)} </td>
                      <td>
                        <Badge color="primary">{CompetitionStatus[e.status]}</Badge>{' '}
                      </td>
                      <td> {e.description} </td>
                    </tr>
                  );
                })
              ) : (
                <Col md="12" className="text-center">
                  <h2 className="display-4" style={{ margin: 'auto' }}>
                    Danh sách trống
                  </h2>
                  <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '200px', height: '200px' }} />
                </Col>
              )}
            </tbody>
          </Table>
        ) : (
          <Row>
            <Col className="text-center" md="12">
              <img
                alt="..."
                src={require('assets/img/icons/Curve-Loading.gif').default}
                style={{ margin: 'auto', weight: '200px', height: '200px' }}
              />
            </Col>
          </Row>
        )}
      </CardBody>
      <CardFooter>
        <Row>
          <Col className="text-center" md="12">
            <Button color="default" onClick={() => props.setHistoryForm(false)}>
              Đóng
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
}
