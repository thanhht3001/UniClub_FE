import React, { useState } from 'react';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Media,
} from 'reactstrap';
import { convertDateToShowWithTime } from 'services/formatData';

export default function ShowListTeamBody(props) {
  const [pageNavigate, setPageNavigate] = useState([]);
  const [pageNavigateMember, setPageNavigateMember] = useState([]);
  const renderPage = () => {
    const pageRender = [];
    for (let i = 1; i <= props.teamList.total_pages; i++) {
      pageRender.push(
        <PaginationItem className={i === props.teamList.current_page ? 'active' : ''} key={`page-${i}`}>
          <PaginationLink
            href="#page"
            onClick={(e) => {
              e.preventDefault();
              props.loadTeamList(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setPageNavigate(pageRender);
  };

  const renderPageMember = () => {
    const pageRender = [];
    for (let i = 1; i <= props.memberList.total_pages; i++) {
      pageRender.push(
        <PaginationItem className={i === props.memberList.current_page ? 'active' : ''} key={`page-${i}`}>
          <PaginationLink
            href="#page"
            onClick={(e) => {
              e.preventDefault();
              props.loadMemberList(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setPageNavigateMember(pageRender);
  };

  React.useEffect(() => {
    if (props.teamList && props.teamList.items) {
      renderPage();
    }
    if (props.memberList && props.memberList.items) {
      renderPageMember();
    }
  }, [props]);
  return (
    <>
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            {!props.isEvent ? (
              <Card>
                <CardHeader className="border-0">
                  <h3 className="mb-0">Danh sách các đội dự thi</h3>
                </CardHeader>
                {props.teamList ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col" className="text-center">
                          Thành viên
                        </th>
                        <th scope="col" className="text-center">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {props.teamList.items?.length > 0 ? (
                        props.teamList.items.map((e, value) => {
                          return (
                            <tr key={`team-${value}`}>
                              <td className="text-default">
                                <span className="name" style={{ fontWeight: '700' }}>
                                  {e.name}
                                </span>
                              </td>
                              <td>
                                <Badge color="" className="badge-dot mr-4 font-weight-bold">
                                  <i className={e.status === 1 ? 'bg-warning' : 'bg-success'} />
                                  <span className="status">{e.status === 1 ? 'Đóng' : 'Mở'}</span>
                                </Badge>
                              </td>
                              <td className="text-center">
                                <span className="text-default">{e.number_of_member_in_team}</span>
                              </td>
                              <td className="text-center">
                                <a
                                  className="table-action table-action-delete"
                                  href="#pablo"
                                  id={`tooltipteam-${e.team_id}`}
                                  onClick={(ele) => {
                                    ele.preventDefault();
                                    props.loadTeamDetail(e.team_id);
                                  }}
                                >
                                  <i className="fas fa-eye" />
                                </a>
                                <UncontrolledTooltip delay={0} target={`tooltipteam-${e.team_id}`}>
                                  Xem chi tiết
                                </UncontrolledTooltip>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">
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

                <CardFooter className="py-4">
                  {props.teamList.items && props.teamList.items.length > 0 ? (
                    <nav className="mb-3" aria-label="...">
                      <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                        <PaginationItem className={props.teamList.has_previous === false ? 'disabled' : ''}>
                          <PaginationLink
                            href="#previous"
                            onClick={(e) => {
                              e.preventDefault();
                              props.loadTeamList(props.teamList.current_page - 1);
                            }}
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        {pageNavigate.length > 0 ? pageNavigate : <></>}
                        <PaginationItem className={props.teamList.has_next === false ? 'disabled' : ''}>
                          <PaginationLink
                            href="#next"
                            onClick={(e) => {
                              e.preventDefault();
                              props.loadTeamList(props.teamList.current_page + 1);
                            }}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  ) : (
                    <></>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <></>
            )}
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách thành viên đăng ký</h3>
              </CardHeader>
              {props.memberList ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">MSSV</th>
                      <th scope="col">Tên</th>
                      <th scope="col" className="text-center">
                        Thời gian đăng ký
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {props.memberList.items?.length > 0 ? (
                      props.memberList.items.map((e, value) => {
                        return (
                          <tr key={`team-${value}`}>
                            <td className="text-default">
                              <span style={{ fontWeight: '700' }}>{e.student_code}</span>
                            </td>
                            <td>
                              <Badge color="" className="badge-dot mr-4 font-weight-bold">
                                <Media className="align-items-center">
                                  <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img alt="img" src={e.student_avatar ?? require('assets/img/icons/avatar/No_image_available.png').default} />
                                  </a>
                                  <Media>
                                    <span className="name mb-0 text-sm">{e.student_name}</span>
                                  </Media>
                                </Media>
                              </Badge>
                            </td>
                            <td className="text-center">
                              <span className="text-default">{convertDateToShowWithTime(e.register_time)}</span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">
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
              <CardFooter className="py-4">
                {props.memberList?.items && props.memberList.items.length > 0 ? (
                  <nav className="mb-3" aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem className={props.memberList.has_previous === false ? 'disabled' : ''}>
                        <PaginationLink
                          href="#previous"
                          onClick={(e) => {
                            e.preventDefault();
                            props.loadMemberList(props.memberList.current_page - 1);
                          }}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {pageNavigateMember.length > 0 ? pageNavigateMember : <></>}
                      <PaginationItem className={props.memberList.has_next === false ? 'disabled' : ''}>
                        <PaginationLink
                          href="#next"
                          onClick={(e) => {
                            e.preventDefault();
                            props.loadMemberList(props.memberList.current_page + 1);
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                ) : (
                  <></>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
