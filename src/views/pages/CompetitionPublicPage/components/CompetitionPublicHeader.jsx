import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Container, Row } from 'reactstrap';
import '../css/style.css';

export default function CompetitionPublicHeader(props) {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.competitionCarol.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.competitionCarol.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const carouselItemData = props.competitionCarol?.map((item, value) => {
    let banner = '';
    for (let i = 0; i < item.competition_entities.length; i++) {
      const e = item.competition_entities[i];
      if (e.entity_type_id === 1) {
        banner = e.image_url;
      }
    }
    return (
      <CarouselItem key={`carouse-${value}`} onExited={() => setAnimating(false)} onExiting={() => setAnimating(true)}>
        <a
          href="#view"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/cuoc-thi-va-su-kien/chi-tiet/${item.id}`);
          }}
        >
          <img src={banner} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </a>
      </CarouselItem>
    );
  });

  return (
    <>
      <div
        className="header pb-6 d-flex align-items-center"
        style={{
          minHeight: '700px',
          backgroundImage: 'url("' + require('assets/img/theme/login-bg.png').default + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <Container fluid className="mt-6">
          {props.competitionCarol ? (
            <Row className="justify-content-center">
              <Col lg="12" md="12" className="text-center mt-4">
                <CarouselControl directionText="Previous" direction="prev" onClickHandler={previous} style={{ position: 'relative' }} />
                <Carousel previous={previous} next={next} activeIndex={activeIndex}>
                  <CarouselIndicators
                    items={props.competitionCarol}
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                      if (animating) return;
                      setActiveIndex(newIndex);
                    }}
                  />
                  {carouselItemData}
                </Carousel>
                <CarouselControl directionText="Next" direction="next" onClickHandler={next} />
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
}
