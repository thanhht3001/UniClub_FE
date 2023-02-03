import React from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import { covertDatePassed } from 'services/formatData';
import styled from 'styled-components';

const CardHover = styled.div`
  :hover {
    transform: scale(1.03);
    box-shadow: 0 4px 6px rgb(50 50 93 / 25%), 0 1px 3px rgb(0 0 0 / 8%);
  }
`;

const CardLabel = styled.div`
  min-width: 50px;
  min-height: 7px;
  display: inline-block !important;
  border-radius: 25px;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
  :hover {
    filter: grayscale(40%);
  }
`;

const ActivityTitle = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const DeadlineLabel = styled.span`
  background-color: red;
  border-radius: 7px;
  color: white;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding-left: 8px;
  padding-right: 8px;
`;

export default function Activitycard(props) {
  const checkDeadline = (string) => {
    if (string.includes('trước')) {
      return 'bg-red';
    } else {
      return 'bg-info';
    }
  };

  const checkBackground = (status) => {
    switch (status) {
      case 0:
        return { background: 'bg-info', text: 'Đang mở' };
      case 1:
        return { background: 'bg-blue', text: 'Tiến hành' };
      case 2:
        return { background: 'bg-yellow', text: 'Trì hoãn' };
      case 3:
        return { background: 'bg-pink', text: 'Chờ duyệt' };
      case 4:
        return { background: 'bg-success', text: 'Hoàn thành' };
      default:
        return { background: 'bg-danger', text: 'Hủy bỏ' };
    }
  };
  return (
    <>
      {props.data?.length > 0 ? (
        props.data.map((e, value) => {
          return (
            <CardHover className="card mb-2" key={`acti-${value}`} onClick={() => props.handleLoadActivityDetail(e.id)}>
              <a href="#viewDetail" onClick={(ele) => ele.preventDefault()}>
                <CardBody style={{ padding: '10px' }}>
                  <Row>
                    <Col md="12">
                      <CardLabel
                        className={`badge text-neutral font-weight-bold ${checkBackground(e.competition_activity_status).background}`}
                        onClick={() => {
                          props.setShowStatus(!props.showStatus);
                        }}
                      >
                        {props.showStatus ? checkBackground(e.competition_activity_status).text : ''}
                      </CardLabel>
                      <br />
                      <ActivityTitle className="text-default text-sm font-weight-bold">{e.name}</ActivityTitle>
                      <br />
                      {e.competition_activity_status !== 4 && e.competition_activity_status !== 5 ? (
                        <DeadlineLabel className={`text-sm ${checkDeadline(covertDatePassed(e.ending))}`}>
                          Thời hạn: {covertDatePassed(e.ending)}
                        </DeadlineLabel>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </a>
            </CardHover>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}
