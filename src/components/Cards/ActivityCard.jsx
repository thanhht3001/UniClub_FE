import { CompetitionStatus } from 'constants/competition.status';
import React from 'react';
import { Badge, CardBody, CardImg, CardTitle, Col, Progress, Row } from 'reactstrap';
import { findCompetitionBanner } from 'services/formatData';
import { convertDateToShow } from 'services/formatData';
import styled from 'styled-components';

const CardHover = styled.div`
  :hover {
    transform: scale(1.03);
    box-shadow: 0 4px 6px rgb(50 50 93 / 25%), 0 1px 3px rgb(0 0 0 / 8%);
  }
`;

export default function ActivityCard(props) {
  const progressConvert = (partialValue, totalValue) => {
    if (partialValue === 0 && totalValue === 0) {
      return 'Không có hoạt động';
    } else {
      return `${partialValue}/${totalValue}`;
    }
  };

  return (
    <CardHover className="card" style={{ height: '95%' }}>
      <a href={`/admin/hoat-dong/chi-tiet/${props.data.id}`}>
        <CardImg
          alt="..."
          src={
            props.data.competition_entities?.length > 0
              ? findCompetitionBanner(props.data.competition_entities)
              : require('assets/img/icons/avatar/No_image_available.png').default
          }
          style={{ maxHeight: '250px' }}
        />
        <CardBody>
          <Row>
            <Col className="text-left" xl="6" md="6" xs="6">
              <span style={{ fontFamily: 'cursive', color: 'lightsalmon' }}>@ {props.data.competition_type_name}</span>
            </Col>
            <Col className="text-right" xl="6" md="6" xs="6">
              <label
                className="text-neutral mb-0 font-weight-bold text-sm"
                style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px 5px', fontFamily: 'cursive' }}
              >
                {convertDateToShow(props.data.start_time)}
              </label>
            </Col>
          </Row>

          <CardTitle className="h4 mb-2">{props.data.name}</CardTitle>
          <span className="h5 font-weight-bold mb-0 text-default">
            {props.data.total_competition_activity !== 0 ? 'Tiến độ hoàn thành:' : ''}{' '}
            {progressConvert(props.data.total_competition_activity_completed, props.data.total_competition_activity)}
          </span>
          {props.data.total_competition_activity !== 0 ? (
            <Progress
              className="progress-xs mt-3 mb-0"
              max={props.data.total_competition_activity}
              value={props.data.total_competition_activity_completed}
              color={props.data.total_competition_activity_completed === props.data.total_competition_activity ? 'success' : 'info'}
            />
          ) : (
            <></>
          )}
          <Row>
            <Col className="col-auto">
              <Badge
                className="font-weight-bold"
                color={props.data.status === 11 ? 'success' : props.data.status === 6 ? 'info' : 'warning'}
                pill
                style={{ fontFamily: 'sans-serif' }}
              >
                {CompetitionStatus[props.data.status]}
              </Badge>
            </Col>
          </Row>
        </CardBody>
      </a>
    </CardHover>
  );
}
