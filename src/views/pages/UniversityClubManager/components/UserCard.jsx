import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import { statusCode } from 'constants/status.constants';
import React, { useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { getDataByPath } from 'services/data.service';
import styled from 'styled-components';

const HoverRow = styled.div`
  :hover {
    background-color: #a1a1a1ab;
  }
`;

export default function UserCard(props) {
  const [memberList, setMemberList] = useState(null);

  async function loadMemberData(searchString) {
    const accessToken = localStorage.getItem('accessToken');
    const universityId = localStorage.getItem('universityID');
    const path = 'api/v1/users/search';
    const data = `universityId=${universityId}&pageSize=5&status=1&searchString=${searchString}`;
    const res = await getDataByPath(path, accessToken, data);
    console.log(res);
    if (res && res.status === statusCode.success) {
      if (res.data.items?.length > 0) {
        setMemberList(res.data.items);
      } else setMemberList([]);
    }
  }

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
          <span className="text-default font-weight-bold">Danh sách học sinh</span>
          {memberList?.length > 0 ? (
            memberList.map((e, value) => {
              return (
                <a
                  key={`member-${value}`}
                  href="#member"
                  onClick={(ele) => {
                    ele.preventDefault();
                    props.handleSelectUser(e.fullname, e.email, e.avatar, e.id);
                  }}
                >
                  <HoverRow className="align-items-center mt-2 pt-1 pb-1 pl-2 pr-2 row">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a className="avatar rounded-circle" href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img alt="..." src={e.avatar ?? noAvatarBase64} />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <h4 className="mb-0">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            {e.fullname}
                          </a>
                        </h4>
                        <small className="text-muted">{e.email}</small>
                      </div>
                    </Row>
                  </HoverRow>
                </a>
              );
            })
          ) : (
            <Col md="12" className="text-center">
              <h2 className="display-4" style={{ margin: 'auto' }}>
                Danh sách trống
              </h2>
              <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '100px', height: '100px' }} />
            </Col>
          )}
        </Col>
      </Row>
    </>
  );
}
