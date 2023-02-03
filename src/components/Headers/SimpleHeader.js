// nodejs library to set properties for components
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
// reactstrap components
import { Breadcrumb, BreadcrumbItem, Container, Row, Col } from 'reactstrap';

function TimelineHeader({ name, parentName, linkParent }) {
  const history = useHistory();
  return (
    <>
      <div className="header header-dark bg-neutral pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                  <BreadcrumbItem>
                    <a className="text-default" href="/admin/thong-tin-clb" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a
                      className="text-default"
                      href={linkParent}
                      onClick={(e) => {
                        linkParent === '/' ? e.preventDefault() : history.push(linkParent);
                      }}
                    >
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active" style={{ color: 'grey' }}>
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

TimelineHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default TimelineHeader;
