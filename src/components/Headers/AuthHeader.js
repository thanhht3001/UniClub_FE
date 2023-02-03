// nodejs library to set properties for components
import PropTypes from 'prop-types';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

function AuthHeader({ title, lead }) {
  return (
    <>
      <div className="header bg-gradient-warning py-7 py-lg-8 pt-lg-9">
        <Container>
          <div className="header-body text-center mb-5">
            <Row className="justify-content-center">
              <Col className="px-5" lg="12" md="12" xl="12">
                {title ? <h1 className="text-white display-3">{title}</h1> : null}
                {lead ? <p className="text-lead text-white display-4">{lead}</p> : null}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default AuthHeader;
