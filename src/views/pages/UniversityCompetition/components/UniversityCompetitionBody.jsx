import React from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Table,
  UncontrolledDropdown,
} from 'reactstrap';

export default function UniversityCompetitionBody(props) {
  const history = useHistory();
  return (
    <>
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="12" md="12">
            <Card style={{ paddingBottom: '10px' }}>
              <CardHeader className="border-0">
                <Row className="align-items-center mb-2">
                  <div className="col">
                    <h3 className="mb-0">Duyệt cuộc thi và sự kiện</h3>
                  </div>
                </Row>
                <Row>
                  <Col md="5" className="text-right">
                    <InputGroup>
                      <Input
                        className="text-default"
                        id="title"
                        placeholder="Tìm kiếm ..."
                        type="text"
                        style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
                        onChange={(e) => {
                          props.setSearch(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="default"
                          outline
                          type="button"
                          style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
                          onClick={() => {
                            props.loadListCompetitions(props.search);
                          }}
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              {props.competitions ? (
                <Table className="align-items-center table-flush" responsive style={{ minHeight: '150px' }}>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Tên</th>
                      <th scope="col" className="text-center">
                        Thể loại
                      </th>
                      <th scope="col" className="text-center">
                        Tài trợ
                      </th>
                      <th scope="col" className="text-center">
                        Quy mô
                      </th>
                      <th scope="col" className="text-center">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.competitions.length > 0 ? (
                      props.competitions.map((e, value) => {
                        return (
                          <tr key={`member-${value}`}>
                            <td> {value + 1} </td>
                            <th scope="row">
                              <span className="name mb-0 text-sm">{e.name}</span>
                            </th>
                            <td className="text-center"> {e.competition_type_name} </td>
                            <td className={`text-center font-weight-bold ${e.is_sponsor ? 'text-success' : 'text-info'}`}>
                              {e.is_sponsor ? 'Có tài trợ' : 'Không tài trợ'}{' '}
                            </td>
                            <td className="text-center"> {e.scope === 0 ? 'Liên trường' : e.scope === 1 ? 'Trong trường' : 'Trong câu lạc bộ'} </td>
                            <td className="text-center">
                              <UncontrolledDropdown>
                                <DropdownToggle className="text-default font-weight-bold" size="md" tag="a">
                                  <i className="fa fa-caret-down fa-2x" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem
                                    href="#detail"
                                    onClick={(ele) => {
                                      ele.preventDefault();
                                      history.push(`/university/xet-duyet/chi-tiet/${e.id}`);
                                    }}
                                  >
                                    <span>Xem chi tiết</span>
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#approve"
                                    onClick={(ele) => {
                                      props.updateAlert(e.id, 1);
                                      ele.preventDefault();
                                    }}
                                  >
                                    <span>Chấp thuận</span>
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#deny"
                                    onClick={(ele) => {
                                      props.updateAlert(e.id, 0);
                                      ele.preventDefault();
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
                    ) : (
                      <tr>
                        <td colSpan="6">
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
