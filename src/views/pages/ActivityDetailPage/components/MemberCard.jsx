import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import { statusCode } from 'constants/status.constants';
import React, { useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { getDataByPath } from 'services/data.service';
import styled from 'styled-components';
import '../css/styled.css';

const HoverRow = styled.div`
  :hover {
    background-color: #a1a1a1ab;
  }
`;

export default function MemberCard(props) {
  const [memberList, setMemberList] = useState(null);

  const checkContainMember = (id) => {
    if (props.member_takes_activities?.length > 0) {
      for (let i = 0; i < props.member_takes_activities.length; i++) {
        const e = props.member_takes_activities[i];
        if (e.member_id === id) {
          return true;
        }
      }
    }
    return false;
  };

  async function loadMemberData(searchString) {
    const accessToken = localStorage.getItem('accessToken');
    const clubId = localStorage.getItem('clubID');
    const path = 'api/v1/members/search';
    const data = `clubId=${clubId}&pageSize=5&status=1&searchString=${searchString}`;
    const res = await getDataByPath(path, accessToken, data);
    console.log(res);
    if (res && res.status === statusCode.success) {
      if (res.data.items?.length > 0) {
        setMemberList(res.data.items);
      } else setMemberList([]);
    }
  }

  const fintMemberInActivityId = (memberId) => {
    if (props.member_takes_activities?.length > 0) {
      for (let i = 0; i < props.member_takes_activities.length; i++) {
        const e = props.member_takes_activities[i];
        if (e.member_id === memberId) {
          return e.id;
        }
      }
    }
    return null;
  };

  React.useEffect(() => {
    if (memberList === null) {
      loadMemberData('');
    }
  }, []);

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col md="12">
          <Input
            className="mb-3"
            placeholder="Tìm kiếm các thành viên"
            onChange={(e) => {
              loadMemberData(e.target.value);
            }}
          />
          <span className="text-default font-weight-bold">Thành viên của câu lạc bộ</span>
          {memberList?.length > 0 ? (
            memberList.map((e, value) => {
              return (
                <a
                  key={`member-${value}`}
                  href="#member"
                  onClick={(ele) => {
                    ele.preventDefault();
                    if (checkContainMember(e.id)) {
                      props.removeMember(fintMemberInActivityId(e.id), props.activityID);
                    } else {
                      props.addMember(e.id, props.activityID);
                    }
                  }}
                >
                  <HoverRow className="align-items-center mt-2 pt-1 pb-1 pl-2 pr-2 row">
                    <Col md="2">
                      <img className="avatar avatar-sm rounded-circle" src={e.avatar ?? noAvatarBase64} />
                    </Col>
                    <Col md="10">
                      <span className="text-default">
                        {e.name} {checkContainMember(e.id) ? <i className="fas fa-check" /> : ''}
                      </span>
                    </Col>
                  </HoverRow>
                </a>
              );
            })
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </>
  );
}
