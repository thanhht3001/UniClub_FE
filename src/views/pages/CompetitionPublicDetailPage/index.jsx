import React, { useEffect, useState } from 'react';
import CompetitionPublicNavbar from '../CompetitionPublicPage/components/CompetitionPublicNavbar';
import { warningAlertConstants } from 'constants/alert.constants';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import { getDataByPath } from 'services/data.service';
import { statusCode } from 'constants/status.constants';
import CompetitionPublicDetailHeader from './components/CompetitionPublicDetailHeader';
import CompetitionPublicDetailBody from './components/CompetitionPublicDetailBody';
import { Col, Modal, Row } from 'reactstrap';
import AdminFooter from 'components/Footers/AdminFooter';
import CompetitionFavoriteCard from './components/CompetitionFavoriteCard';
import CompetitionRoundView from './components/CompetitionRoundView';

export default function CompetitionPublicDetailPage(props) {
  const [alert, setalert] = useState(false);
  const [competitionDetail, setCompetitionDetail] = useState(null);
  const [banner, setBanner] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [influencer, setInfluencer] = useState([]);
  const [competitionFavorite, setCompetitionFavorite] = useState(null);
  const [roundForm, setRoundForm] = useState(false);
  const [competitionRound, setCompetitionRound] = useState(null);

  async function loadDataCompetitionDetail(competition_id) {
    if (competition_id) {
      const path = `api/v1/competitions/${competition_id}`;
      const res = await getDataByPath(`${path}`, '', '');
      console.log(res);
      if (res && res.status === statusCode.success) {
        convertCompetitionEntities(res.data);
      } else {
        warningAlert(warningAlertConstants.timeout);
      }
    }
  }

  const convertCompetitionEntities = (array) => {
    const banner = [];
    const sponsor = [];
    const influencer = [];
    array.competition_entities.forEach((e) => {
      switch (e.entity_type_id) {
        case 1:
          banner.push({ image_url: e.image_url });
          break;
        case 2:
          influencer.push({ name: e.name, image_url: e.image_url });
          break;
        case 3:
          sponsor.push({ name: e.name, image_url: e.image_url, email: e.email, website: e.website, description: e.description });
          break;
      }
    });
    setBanner(banner);
    setSponsor(sponsor);
    setInfluencer(influencer);
    setCompetitionDetail(array);
  };

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  async function loadDataListCompetitionSponsorFavor() {
    const path = 'api/v1/competitions/guest';
    const data = `pageSize=3&sponsor=true&mostView=true&nearlyDate=true`;
    const res = await getDataByPath(`${path}`, '', data);
    if (res && (res.status === 200 || res.status === 204)) {
      let newData = [];
      if (res.data.items && res.data.items.length > 0) {
        newData = res.data.items;
      }
      setCompetitionFavorite(newData);
    }
  }

  async function loadCompetitionRound(competitionId) {
    if (competitionId) {
      const path = `api/v1/competition-rounds/search`;
      const data = `competitionId=${competitionId}&pageSize=20&statuses=1&statuses=2&statuses=3`;
      const res = await getDataByPath(path, '', data);
      console.log(res, 'round');
      if (res && res.status === statusCode.success) {
        if (res.data.items && res.data.items.length > 0) {
          setCompetitionRound(res.data.items);
        } else {
          setCompetitionRound([]);
        }
      }
    }
  }

  useEffect(() => {
    if (competitionDetail === null) {
      loadDataCompetitionDetail(props.match.params.id);
    }
    if (competitionFavorite === null) {
      loadDataListCompetitionSponsorFavor();
    }
    if (competitionRound === null) {
      loadCompetitionRound(props.match.params.id);
    }
  }, []);

  return (
    <>
      {alert}
      <CompetitionPublicNavbar />
      {competitionDetail ? (
        <>
          <CompetitionPublicDetailHeader data={competitionDetail} />
          <Row>
            <Col className="pr-2" md="12" lg="9">
              <CompetitionPublicDetailBody
                data={competitionDetail}
                sponsor={sponsor}
                banner={banner}
                influencer={influencer}
                setRoundForm={setRoundForm}
              />
            </Col>
            <Col className="pl-2" md="12" lg="3">
              <CompetitionFavoriteCard competitionFavorite={competitionFavorite} />
            </Col>
          </Row>
          <Modal className="modal-dialog-centered" size="lg" isOpen={roundForm} toggle={() => setRoundForm(false)}>
            <div className="modal-body p-0">
              <CompetitionRoundView CompetitionRounds={competitionRound} setRoundForm={setRoundForm} />
            </div>
          </Modal>
          <AdminFooter />
        </>
      ) : (
        <Row>
          <Col className="text-center" md="12">
            <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto' }} />
          </Col>
        </Row>
      )}
    </>
  );
}
