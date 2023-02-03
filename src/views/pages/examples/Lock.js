import React from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';

function Lock() {
  const [focused, setFocused] = React.useState(false);
  return (
    <>
      <AuthHeader title="Lock screen" lead="Better to be safe than sorry." />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="card-profile bg-secondary mt-5">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img alt="..." className="rounded-circle border-secondary" src={require('assets/img/theme/team-4.jpg').default} />
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-7 px-5">
                <div className="text-center mb-4">
                  <h3>Jessica Jones</h3>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames({
                      focused: focused,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-2" color="info" type="button">
                      Unlock
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Lock;
