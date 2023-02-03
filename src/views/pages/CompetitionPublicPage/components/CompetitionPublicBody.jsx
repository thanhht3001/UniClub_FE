import CompetitionPublicCard from 'components/Cards/CompetitionPublicCard';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

export default function CompetitionPublicBody(props) {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleSearch = (keyword) => {
    if (keyword.trim() !== '') {
      let arr = keyword.split(' ');
      arr = arr.filter((e) => e !== '');
      const formated = arr.join('+');
      history.push(`/cuoc-thi-va-su-kien?tim-kiem=${formated}`);
    } else {
      history.push('/cuoc-thi-va-su-kien?');
    }
  };
  return (
    <Container className="mt--5 " fluid>
      <Card>
        <CardHeader>
          <InputGroup>
            <Input
              className="text-default"
              id="title"
              placeholder="Tìm kiếm ..."
              type="text"
              style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="default"
                outline
                type="button"
                style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}
                onClick={() => {
                  handleSearch(search);
                }}
              >
                <i className="fas fa-search" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </CardHeader>
        <CardHeader className="mb-0 pb-0">
          <CardTitle className="text-default font-weight-bold">CÓ THỂ BẠN SẼ THÍCH</CardTitle>
          <Row>
            {props.competitionFavorite && props.competitionFavorite.length > 0 ? (
              props.competitionFavorite.map((e, value) => {
                return <CompetitionPublicCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : props.competitionFavorite && props.competitionFavorite.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            ) : (
              <Col className="text-center" lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', maxWeight: '200px', maxHeight: '200px', weight: '100%', height: '100%' }}
                />
              </Col>
            )}
          </Row>
        </CardHeader>
        <CardBody>
          <CardTitle className="text-default font-weight-bold">MỚI CẬP NHẬT</CardTitle>
          <Row className="mb-5">
            {props.competitionNew && props.competitionNew.length > 0 ? (
              props.competitionNew.map((e, value) => {
                return <CompetitionPublicCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : props.competitionNew && props.competitionNew.length === 0 ? (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '250px', height: '250px' }} />
              </Col>
            ) : (
              <Col className="text-center" lg="12" md="12">
                <img
                  alt="..."
                  src={require('assets/img/icons/Curve-Loading.gif').default}
                  style={{ margin: 'auto', maxWeight: '200px', maxHeight: '200px', weight: '100%', height: '100%' }}
                />
              </Col>
            )}
          </Row>
          {props.loadMore ? (
            <Row>
              <Col md="12" className="text-center">
                <img alt="loadmore" style={{ maxHeight: '100px' }} src={require('assets/img/icons/Loadmore.gif').default} />
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
