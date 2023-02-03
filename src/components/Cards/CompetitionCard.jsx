import React from 'react';
import { useHistory } from 'react-router';
import {
  Badge,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { covertDatePassed } from 'services/formatData';
import { findCompetitionBanner } from 'services/formatData';
import { convertDateToShow } from 'services/formatData';
import styled from 'styled-components';

const CardHover = styled.div`
  :hover {
    transform: scale(1.03);
    box-shadow: 0 4px 6px rgb(50 50 93 / 25%), 0 1px 3px rgb(0 0 0 / 8%);
  }
`;

export default function CompetitionCard(props) {
  const history = useHistory();
  const checkCompetitionInClub = (clubID) => {
    if (clubID && props.data && props.data.clubs_in_competition.length > 0) {
      for (let i = 0; i < props.data.clubs_in_competition.length; i++) {
        const element = props.data.clubs_in_competition[i];
        if (parseInt(element.club_id) === parseInt(clubID)) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <Col xl="3" lg="4" md="6" sm="12">
      <CardHover className="card" style={{ height: '95%' }}>
        <CardHeader style={{ fontFamily: 'inherit' }}>
          <Row className="align-items-center mb-0">
            <Col className="col-auto mb-0" style={{ padding: '0px 0px 0px 0px' }}>
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={
                    props.data.clubs_in_competition[0].image
                      ? props.data.clubs_in_competition[0].image
                      : require('assets/img/icons/avatar/No_image_available.png').default
                  }
                />
              </span>
            </Col>
            <div className="col mb-0">
              <h6 className="text-sm font-weight-bold" style={{ margin: 'auto', color: 'black' }}>
                {props.data.clubs_in_competition[0].name} ·{' '}
                <span className="text-sm" style={{ fontWeight: 'lighter', color: 'darkgrey' }}>
                  <i className="fas fa-globe-americas mr-1" />
                  {covertDatePassed(props.data.create_time)}
                </span>
              </h6>
            </div>
            {localStorage && props.data.clubs_in_competition && checkCompetitionInClub(localStorage.getItem('clubID')) ? (
              <Col className="text-right col-auto mb-0">
                <UncontrolledDropdown>
                  <DropdownToggle className="text-default font-weight-bold" size="sm" tag="a">
                    <i className="fas fa-ellipsis-h" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/admin/cuoc-thi/chi-tiet/chinh-sua/${props.data.id}`);
                      }}
                    >
                      <span>Chỉnh sửa</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </CardHeader>
        <a href={`/admin/cuoc-thi/chi-tiet/${props.data.id}`}>
          <CardImg
            alt="..."
            src={
              props.data.competition_entities && props.data.competition_entities.length > 0
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
            <Row>
              <Col className="col-auto pl-0">
                <Badge className="font-weight-bold" color={props.data.is_event ? 'danger' : 'default'} pill style={{ fontFamily: 'sans-serif' }}>
                  {props.data.is_event ? 'Sự Kiện' : 'Cuộc thi'}
                </Badge>
              </Col>
              <Col className="col-auto pl-0">
                <Badge
                  className="font-weight-bold"
                  color={props.data.scope === 0 ? 'info' : props.data.scope === 1 ? 'warning' : 'success'}
                  pill
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {props.data.scope === 0 ? 'Liên Trường' : props.data.scope === 1 ? 'Trong Trường' : 'Trong Câu Lạc Bộ'}
                </Badge>
              </Col>
              {props.data.is_sponsor === true ? (
                <Col className="col-auto pl-0">
                  <Badge className="font-weight-bold" color="success" pill style={{ fontFamily: 'sans-serif' }}>
                    Tài trợ
                  </Badge>
                </Col>
              ) : (
                <></>
              )}
              {props.data.status === 0 ? (
                <Col className="col-auto pl-0">
                  <Badge className="font-weight-bold" color="success" pill style={{ fontFamily: 'sans-serif' }}>
                    Mở đăng ký
                  </Badge>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          </CardBody>
        </a>
      </CardHover>
    </Col>
  );
}
