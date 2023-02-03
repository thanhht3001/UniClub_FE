import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Activitycard from './ActivityCard';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const AddActivity = styled.a`
  width: 100%;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  margin: auto;
  :hover {
    background-color: #97979737;
  }
`;

export default function ActivityDetailBody(props) {
  const [activityList1, setActivityList1] = useState(null);
  const [activityList2, setActivityList2] = useState(null);
  const [activityList3, setActivityList3] = useState(null);
  const [activityList4, setActivityList4] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const history = useHistory();

  const handleArrangeActivity = (array) => {
    const list1 = [];
    const list2 = [];
    const list3 = [];
    const list4 = [];
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if (e.competition_activity_status === 0 || e.competition_activity_status === 1 || e.competition_activity_status === 2) {
        list1.push(e);
      }
      if (e.competition_activity_status === 3) {
        list2.push(e);
      }
      if (e.competition_activity_status === 4) {
        list3.push(e);
      }
      if (e.competition_activity_status === 5) {
        list4.push(e);
      }
    }
    setActivityList1(list1);
    setActivityList2(list2);
    setActivityList3(list3);
    setActivityList4(list4);
  };
  useEffect(() => {
    handleArrangeActivity(props.activityList);
  }, [props.activityList]);

  return (
    <>
      <Container className="mt--4" fluid>
        <Card>
          <CardBody style={{ minHeight: '75vh' }}>
            <Row className="justify-content-center">
              <Col className="pl-1 pr-2" lg="3" md="6" sm="12">
                <Card>
                  <CardBody className="pb-1 pt-2" style={{ backgroundColor: '#ebecf0', borderRadius: '5px' }}>
                    <h4 className="mb-2" style={{ fontWeight: '800' }}>
                      Triển khai
                    </h4>
                    <Row>
                      <Col className="pl-1 pr-1" md="12">
                        {activityList1 ? (
                          <Activitycard
                            data={activityList1}
                            handleLoadActivityDetail={props.handleLoadActivityDetail}
                            showStatus={showStatus}
                            setShowStatus={setShowStatus}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" className="text-center">
                        <AddActivity
                          href="#createActivity"
                          onClick={(ele) => {
                            ele.preventDefault();
                            history.push('/admin/tao-hoat-dong', { competitionID: props.competitionID });
                          }}
                        >
                          <i className="fas fa-plus text-gray mr-2" />
                          <span className="text-gray font-weight-bold">Thêm hoạt động</span>
                        </AddActivity>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col className="pl-1 pr-2" lg="3" md="6" sm="12">
                <Card>
                  <CardBody className="pb-1 pt-2" style={{ backgroundColor: '#ebecf0', borderRadius: '5px' }}>
                    <h4 className="mb-2" style={{ fontWeight: '800' }}>
                      Chờ duyệt
                    </h4>
                    <Row>
                      <Col className="pl-1 pr-1" md="12">
                        {activityList2 ? (
                          <Activitycard
                            data={activityList2}
                            handleLoadActivityDetail={props.handleLoadActivityDetail}
                            showStatus={showStatus}
                            setShowStatus={setShowStatus}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col className="pl-1 pr-2" lg="3" md="6" sm="12">
                <Card>
                  <CardBody className="pb-1 pt-2" style={{ backgroundColor: '#ebecf0', borderRadius: '5px' }}>
                    <h4 className="mb-2" style={{ fontWeight: '800' }}>
                      Hoàn thành
                    </h4>
                    <Row>
                      <Col className="pl-1 pr-1" md="12">
                        {activityList3 ? (
                          <Activitycard
                            data={activityList3}
                            handleLoadActivityDetail={props.handleLoadActivityDetail}
                            showStatus={showStatus}
                            setShowStatus={setShowStatus}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col className="pl-1 pr-2" lg="3" md="6" sm="12">
                <Card>
                  <CardBody className="pb-1 pt-2" style={{ backgroundColor: '#ebecf0', borderRadius: '5px' }}>
                    <h4 className="mb-2" style={{ fontWeight: '800' }}>
                      Hủy bỏ
                    </h4>
                    <Row>
                      <Col className="pl-1 pr-1" md="12">
                        {activityList4 ? (
                          <Activitycard
                            data={activityList4}
                            handleLoadActivityDetail={props.handleLoadActivityDetail}
                            showStatus={showStatus}
                            setShowStatus={setShowStatus}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
