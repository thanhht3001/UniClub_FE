import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown } from 'reactstrap';

export default function MemberPending(props) {
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent">
          <Row>
            <Col md="10">
              <h3>Danh sách thành viên đăng ký</h3>
            </Col>
            <Col md="2" className="text-right">
              <Button close color="default" onClick={() => props.setPendingModal(false)} />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Mã sinh viên</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {props.memberPending && props.memberPending.length > 0 ? (
                props.memberPending.map((e, value) => {
                  return (
                    <tr key={`${value}`}>
                      <td>
                        <span>{e.student_code}</span>
                      </td>
                      <td>
                        <span>{e.name}</span>
                      </td>
                      <td className="table-actions ml-3">
                        <UncontrolledDropdown>
                          <DropdownToggle className="text-default font-weight-bold" size="md" tag="a">
                            <i className="fa fa-caret-down fa-2x" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              href="#approve"
                              onClick={(ele) => {
                                ele.preventDefault();
                                props.updateStatusPending(e.id, 1);
                              }}
                            >
                              <span>Chấp thuận</span>
                            </DropdownItem>
                            <DropdownItem
                              href="#deny"
                              onClick={(ele) => {
                                ele.preventDefault();
                                props.updateStatusPending(e.id, 2);
                              }}
                            >
                              <span>Từ chối</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  );
                })
              ) : props.memberPending && props.memberPending.length === 0 ? (
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
              ) : (
                <tr>
                  <td colSpan="5">
                    <Row>
                      <Col md="12">
                        <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '50%' }} />
                      </Col>
                    </Row>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}
