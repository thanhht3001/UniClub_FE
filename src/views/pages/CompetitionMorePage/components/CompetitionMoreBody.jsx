import React, { useState } from 'react';
import 'moment/locale/vi';
import { Card, Col, Container, Input, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import CompetitionCard from 'components/Cards/CompetitionCard';

export default function CompetitionMoreBody(props) {
  const [search, setSearch] = useState('');
  const [pageNavigate, setPageNavigate] = useState([]);
  const renderPage = () => {
    const pageRender = [];
    for (let i = 1; i <= props.competitionList.total_pages; i++) {
      pageRender.push(
        <PaginationItem className={i === props.competitionList.current_page ? 'active' : ''} key={`page-${i}`}>
          <PaginationLink
            href="#page"
            onClick={(e) => {
              e.preventDefault();
              props.loadDataListCompetition(i, props.checkCase(), search);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setPageNavigate(pageRender);
  };

  const checkTitle = (cases) => {
    switch (cases) {
      case 1:
        return { title: 'Bản thảo', description: 'Danh sách các cuộc thi vừa tạo' };
      case 2:
        return { title: 'Chờ duyệt', description: 'Danh sách các cuộc thi đang chờ được duyệt' };
      case 3:
        return { title: 'Đã duyệt', description: 'Danh sách các cuộc thi đã được xét duyệt' };
      case 4:
        return { title: 'Công bố', description: 'Danh sách các cuộc thi đã được duyệt và đã mở đăng ký' };
      case 5:
        return { title: 'Đang diễn ra', description: 'Danh sách các cuộc thi đang diễn ra' };
      case 6:
        return { title: 'Đã hoàn thành', description: 'Danh sách các cuộc thi đã diễn ra và kết thúc' };
      case 7:
        return { title: 'Đã hủy', description: 'Danh sách các cuộc thi đã bị hủy bỏ' };
    }
  };

  React.useEffect(() => {
    if (props.competitionList && props.competitionList.items) {
      renderPage();
    }
  }, [props]);

  return (
    <Container className="mt--6 bg-white" fluid>
      {props.competitionList ? (
        <Card className="pl-4">
          <Row className="align-items-center mb-0">
            <Col lg="12" className="mb-0 text-center">
              <h2 className="display-2 text-warning mb-0" style={{ fontFamily: 'sans-serif', paddingTop: '20px' }}>
                {props.isEvent === 0 ? 'Danh Sách Cuộc Thi và Sự Kiện' : props.isEvent === 1 ? 'Danh Sách Cuộc Thi' : 'Danh Sách Sự Kiện'}
              </h2>
              <img
                alt="endline"
                src="https://hoaithanh92.files.wordpress.com/2016/08/transparent-scroll-line.png"
                style={{ transform: 'rotate(180deg)', maxWidth: '60%' }}
              />
            </Col>
          </Row>
          <Row className="align-items-center justify-content-lg-between">
            <Col className="text-center" md="8" style={{ margin: 'auto' }}>
              <Input
                placeholder="Tìm kiếm ..."
                style={{ borderRadius: '25px' }}
                onKeyUp={(e) => {
                  setSearch(e.target.value);
                  props.loadDataListCompetition(1, props.checkCase(), e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="mb-0 display-4" style={{ fontFamily: 'sans-serif' }}>
                {checkTitle(props.checkCase()).title}
              </h2>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <span style={{ fontFamily: 'sans-serif' }}>{checkTitle(props.checkCase()).description}</span>
            </Col>
          </Row>
          <Row className="mb-5">
            {props.competitionList.items && props.competitionList.items.length > 0 ? (
              props.competitionList.items.map((e, value) => {
                return <CompetitionCard data={e} key={`CompetitionCard-${value}`} />;
              })
            ) : (
              <Col lg="12" md="12" className="text-center">
                <h2 className="display-4" style={{ margin: 'auto' }}>
                  Danh sách trống
                </h2>
                <img alt="..." src={require('assets/img/icons/empty.jpg').default} style={{ width: '300px', height: '300px' }} />
              </Col>
            )}
          </Row>
          {props.competitionList.items && props.competitionList.items.length > 0 ? (
            <nav className="mb-3" aria-label="...">
              <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                <PaginationItem className={props.competitionList.has_previous === false ? 'disabled' : ''}>
                  <PaginationLink
                    href="#previous"
                    onClick={(e) => {
                      e.preventDefault();
                      props.loadDataListCompetition(props.competitionList.current_page - 1, props.checkCase(), search);
                    }}
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                {pageNavigate.length > 0 ? pageNavigate : <></>}
                <PaginationItem className={props.competitionList.has_next === false ? 'disabled' : ''}>
                  <PaginationLink
                    href="#next"
                    onClick={(e) => {
                      e.preventDefault();
                      props.loadDataListCompetition(props.competitionList.current_page + 1, props.checkCase(), search);
                    }}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          ) : (
            <></>
          )}
        </Card>
      ) : (
        <></>
      )}
    </Container>
  );
}
