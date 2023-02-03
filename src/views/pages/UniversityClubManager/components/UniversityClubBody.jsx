import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';

export default function UniversityClubBody(props) {
  const [search, setSearch] = useState('');
  const [pageNavigate, setPageNavigate] = useState([]);

  const renderPage = () => {
    const pageRender = [];
    for (let i = 1; i <= props.clubs.total_pages; i++) {
      pageRender.push(
        <PaginationItem className={i === props.clubs.current_page ? 'active' : ''} key={`page-${i}`}>
          <PaginationLink
            href="#page"
            onClick={(e) => {
              e.preventDefault();
              props.loadListClub(search, i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setPageNavigate(pageRender);
  };

  React.useEffect(() => {
    if (props.clubs && props.clubs.items) {
      renderPage();
    }
  }, [props]);

  return (
    <>
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="12" md="12">
            <Card style={{ paddingBottom: '10px' }}>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Câu lạc bộ</h3>
                  </div>
                  <Col className="text-right">
                    <Button color="success" size="sm" onClick={() => props.setCreateClubModal(true)}>
                      Thêm mới
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md="5" className="col-auto text-right">
                    <InputGroup>
                      <Input
                        className="text-default"
                        id="title"
                        placeholder="Tìm kiếm theo tên"
                        type="text"
                        style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="default"
                          outline
                          type="button"
                          style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
                          onClick={() => {
                            props.loadListClub(search, 1);
                          }}
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {props.clubs ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên câu lạc bộ</th>
                        <th scope="col" className="text-center">
                          Thành viên
                        </th>
                        <th scope="col" className="text-center">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.clubs.items ? (
                        props.clubs.items.map((e, value) => {
                          return (
                            <tr key={`member-${value}`}>
                              <td> {(props.clubs.current_page - 1) * 10 + value + 1} </td>
                              <th scope="row">
                                <Media className="align-items-center">
                                  <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img alt="..." src={e.image ?? require('assets/img/icons/avatar/No_image_available.png').default} />
                                  </a>
                                  <Media>
                                    <span className="name mb-0 text-sm">{e.name}</span>
                                  </Media>
                                </Media>
                              </th>
                              <td className="text-center"> {e.total_member} </td>
                              <td className="text-center">
                                <UncontrolledDropdown>
                                  <DropdownToggle className="text-default font-weight-bold" size="md" tag="a">
                                    <i className="fa fa-caret-down fa-2x" />
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(ele) => {
                                        ele.preventDefault();
                                        props.loadClubDetail(e.id);
                                      }}
                                    >
                                      <span>Xem chi tiết</span>
                                    </DropdownItem>
                                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                      <span>Xóa</span>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
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
              {props.clubs && props.clubs.items ? (
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                      <PaginationItem className={props.clubs.has_previous === false ? 'disabled' : ''}>
                        <PaginationLink
                          href="#previous"
                          onClick={(e) => {
                            e.preventDefault();
                            props.loadListClub(search, props.clubs.current_page - 1);
                          }}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {pageNavigate.length > 0 ? pageNavigate : <></>}
                      <PaginationItem className={props.clubs.has_next === false ? 'disabled' : ''}>
                        <PaginationLink
                          href="#next"
                          onClick={(e) => {
                            e.preventDefault();
                            props.loadListClub(search, props.clubs.current_page + 1);
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              ) : (
                <></>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
