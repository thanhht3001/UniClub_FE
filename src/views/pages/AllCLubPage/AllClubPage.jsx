// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';
// core components
import SimpleHeader from 'components/Headers/SimpleHeader.js';

function Tables() {
  return (
    <>
      <SimpleHeader name="Tables" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Light table</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="name" scope="col">
                      Project
                    </th>
                    <th className="sort" data-sort="budget" scope="col">
                      Budget
                    </th>
                    <th className="sort" data-sort="status" scope="col">
                      Status
                    </th>
                    <th scope="col">Users</th>
                    <th className="sort" data-sort="completion" scope="col">
                      Completion
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/bootstrap.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Argon Design System</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        <span className="status">pending</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip160923422" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip160923422">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip514211229" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip514211229">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip726857513" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip726857513">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip469193676" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip469193676">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">60%</span>
                        <div>
                          <Progress max="100" value="60" color="warning" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/angular.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Angular Now UI Kit PRO</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$1800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip31874212" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip31874212">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip252827779" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip252827779">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip809957233" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip809957233">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip979845150" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip979845150">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/sketch.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Black Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$3150 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        <span className="status">delayed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip728862912" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip728862912">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip578670996" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip578670996">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip890233574" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip890233574">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip681662370" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip681662370">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">72%</span>
                        <div>
                          <Progress max="100" value="72" color="danger" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/react.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">React Material Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$4400 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-info" />
                        <span className="status">on schedule</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip972725183" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip972725183">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip74486040" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip74486040">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip650279481" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip650279481">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip228854968" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip228854968">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">90%</span>
                        <div>
                          <Progress max="100" value="90" color="info" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/vue.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Vue Paper UI Kit PRO</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2200 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip450658649" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip450658649">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip66804543" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip66804543">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip897599395" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip897599395">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip207249319" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip207249319">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                    <PaginationItem className="disabled">
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Card>
          <CardHeader className="border-0">
            <Row>
              <Col xs="6">
                <h3 className="mb-0">Inline actions</h3>
              </Col>
              <Col className="text-right" xs="6">
                <Button
                  className="btn-neutral btn-round btn-icon"
                  color="default"
                  href="#pablo"
                  id="tooltip969372949"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  <span className="btn-inner--icon mr-1">
                    <i className="fas fa-user-edit" />
                  </span>
                  <span className="btn-inner--text">Export</span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip969372949">
                  Edit product
                </UncontrolledTooltip>
              </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th>Author</th>
                <th>Created at</th>
                <th>Product</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-user">
                  <img alt="..." className="avatar rounded-circle mr-3" src={require('assets/img/theme/team-1.jpg').default} />
                  <b>John Michael</b>
                </td>
                <td>
                  <span className="text-muted">10/09/{new Date().getFullYear()}</span>
                </td>
                <td>
                  <a className="font-weight-bold" href="#pablo" onClick={(e) => e.preventDefault()}>
                    Argon Dashboard PRO
                  </a>
                </td>
                <td className="table-actions">
                  <a className="table-action" href="#pablo" id="tooltip564981685" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip564981685">
                    Edit product
                  </UncontrolledTooltip>
                  <a className="table-action table-action-delete" href="#pablo" id="tooltip601065234" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip601065234">
                    Delete product
                  </UncontrolledTooltip>
                </td>
              </tr>
              <tr>
                <td className="table-user">
                  <img alt="..." className="avatar rounded-circle mr-3" src={require('assets/img/theme/team-2.jpg').default} />
                  <b>Alex Smith</b>
                </td>
                <td>
                  <span className="text-muted">08/09/{new Date().getFullYear()}</span>
                </td>
                <td>
                  <a className="font-weight-bold" href="#pablo" onClick={(e) => e.preventDefault()}>
                    Argon Design System
                  </a>
                </td>
                <td className="table-actions">
                  <a className="table-action" href="#pablo" id="tooltip123539273" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip123539273">
                    Edit product
                  </UncontrolledTooltip>
                  <a className="table-action table-action-delete" href="#pablo" id="tooltip397466356" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip397466356">
                    Delete product
                  </UncontrolledTooltip>
                </td>
              </tr>
              <tr>
                <td className="table-user">
                  <img alt="..." className="avatar rounded-circle mr-3" src={require('assets/img/theme/team-3.jpg').default} />
                  <b>Samantha Ivy</b>
                </td>
                <td>
                  <span className="text-muted">30/08/{new Date().getFullYear()}</span>
                </td>
                <td>
                  <a className="font-weight-bold" href="#pablo" onClick={(e) => e.preventDefault()}>
                    Black Dashboard
                  </a>
                </td>
                <td className="table-actions">
                  <a className="table-action" href="#pablo" id="tooltip968903465" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip968903465">
                    Edit product
                  </UncontrolledTooltip>
                  <a className="table-action table-action-delete" href="#pablo" id="tooltip161447542" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip161447542">
                    Delete product
                  </UncontrolledTooltip>
                </td>
              </tr>
              <tr>
                <td className="table-user">
                  <img alt="..." className="avatar rounded-circle mr-3" src={require('assets/img/theme/team-1.jpg').default} />
                  <b>John Michael</b>
                </td>
                <td>
                  <span className="text-muted">10/09/{new Date().getFullYear()}</span>
                </td>
                <td>
                  <a className="font-weight-bold" href="#pablo" onClick={(e) => e.preventDefault()}>
                    Argon Dashboard PRO
                  </a>
                </td>
                <td className="table-actions">
                  <a className="table-action" href="#pablo" id="tooltip874640709" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip874640709">
                    Edit product
                  </UncontrolledTooltip>
                  <a className="table-action table-action-delete" href="#pablo" id="tooltip598568751" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip598568751">
                    Delete product
                  </UncontrolledTooltip>
                </td>
              </tr>
              <tr>
                <td className="table-user">
                  <img alt="..." className="avatar rounded-circle mr-3" src={require('assets/img/theme/team-2.jpg').default} />
                  <b>John Michael</b>
                </td>
                <td>
                  <span className="text-muted">10/09/{new Date().getFullYear()}</span>
                </td>
                <td>
                  <a className="font-weight-bold" href="#pablo" onClick={(e) => e.preventDefault()}>
                    Argon Dashboard PRO
                  </a>
                </td>
                <td className="table-actions">
                  <a className="table-action" href="#pablo" id="tooltip400574648" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-user-edit" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip400574648">
                    Edit product
                  </UncontrolledTooltip>
                  <a className="table-action table-action-delete" href="#pablo" id="tooltip573554853" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-trash" />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip573554853">
                    Delete product
                  </UncontrolledTooltip>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <Row>
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Dark table</h3>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th className="sort" data-sort="name" scope="col">
                      Project
                    </th>
                    <th className="sort" data-sort="budget" scope="col">
                      Budget
                    </th>
                    <th className="sort" data-sort="status" scope="col">
                      Status
                    </th>
                    <th scope="col">Users</th>
                    <th className="sort" data-sort="completion" scope="col">
                      Completion
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="list">
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/bootstrap.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Argon Design System</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2500 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        <span className="status">pending</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip914312677" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip914312677">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip598826101" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip598826101">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip513888794" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip513888794">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip623852194" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip623852194">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">60%</span>
                        <div>
                          <Progress max="100" value="60" color="warning" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/angular.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Angular Now UI Kit PRO</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$1800 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip618294410" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip618294410">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip474050080" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip474050080">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip410290934" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip410290934">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip566837648" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip566837648">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/sketch.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Black Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$3150 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-danger" />
                        <span className="status">delayed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip623199212" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip623199212">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip455324571" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip455324571">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip260755125" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip260755125">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip411542911" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip411542911">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">72%</span>
                        <div>
                          <Progress max="100" value="72" color="danger" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/react.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">React Material Dashboard</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$4400 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-info" />
                        <span className="status">on schedule</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip588805720" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip588805720">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip909993336" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip909993336">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip159728285" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip159728285">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip155983421" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip155983421">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">90%</span>
                        <div>
                          <Progress max="100" value="90" color="info" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/vue.jpg').default} />
                        </a>
                        <Media>
                          <span className="name mb-0 text-sm">Vue Paper UI Kit PRO</span>
                        </Media>
                      </Media>
                    </th>
                    <td className="budget">$2200 USD</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        <span className="status">completed</span>
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip790883729" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-1.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip790883729">
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip71467481" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-2.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip71467481">
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip70486707" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-3.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip70486707">
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm rounded-circle" href="#pablo" id="tooltip651611801" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={require('assets/img/theme/team-4.jpg').default} />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip651611801">
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="completion mr-2">100%</span>
                        <div>
                          <Progress max="100" value="100" color="success" />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Tables;
