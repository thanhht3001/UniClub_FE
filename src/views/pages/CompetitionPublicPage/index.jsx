import AdminFooter from 'components/Footers/AdminFooter';
import React, { useEffect, useState } from 'react';
import { getDataByPath } from 'services/data.service';
import CompetitionPublicBody from './components/CompetitionPublicBody';
import CompetitionPublicHeader from './components/CompetitionPublicHeader';
import CompetitionPublicNavbar from './components/CompetitionPublicNavbar';

export default function CompetitionPublic(props) {
  const [competitionFavorite, setCompetitionFavorite] = useState(null);
  const [competitionCarol, setCompetitionCarol] = useState(null);
  const [competitionNew, setCompetitionNew] = useState(null);
  const [pages, setPages] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  async function loadDataListCompetitionCarol(currentPage) {
    if (currentPage) {
      const path = 'api/v1/competitions/guest';
      const data = `pageSize=5&mostView=true&currentPage=${currentPage}&nearlyDate=false`;
      const res = await getDataByPath(`${path}`, '', data);
      if (res && (res.status === 200 || res.status === 204)) {
        let newData = [];
        if (res.data.items && res.data.items.length > 0) {
          newData = res.data.items;
        }
        setCompetitionCarol(newData);
      }
    }
  }

  async function loadDataListCompetitionSponsorFavor(currentPage) {
    if (currentPage) {
      const path = 'api/v1/competitions/guest';
      const data = `pageSize=4&currentPage=${currentPage}&sponsor=true&mostView=true&nearlyDate=true`;
      const res = await getDataByPath(`${path}`, '', data);
      if (res && (res.status === 200 || res.status === 204)) {
        let newData = [];
        if (res.data.items && res.data.items.length > 0) {
          newData = res.data.items;
        }
        setCompetitionFavorite(newData);
      }
    }
  }

  async function loadDataListCompetitionNew() {
    const path = 'api/v1/competitions/guest';
    const data = `pageSize=8&currentPage=${pages}&nearlyDate=false`;
    const res = await getDataByPath(`${path}`, '', data);
    console.log(res);
    if (res && (res.status === 200 || res.status === 204)) {
      if (competitionNew === null) {
        let newData = [];
        if (res.data.items && res.data.items.length > 0) {
          newData = res.data.items;
        }
        setCompetitionNew(newData);
      } else {
        let newData = [...competitionNew];
        if (res.data.items && res.data.items.length > 0) {
          newData = [...newData, ...res.data.items];
        } else {
          setLoadMore(false);
        }
        setCompetitionNew(newData);
      }
      setPages(pages + 1);
    }
  }

  useEffect(() => {
    if (competitionFavorite === null) {
      loadDataListCompetitionSponsorFavor(1);
    }
    if (competitionCarol === null) {
      loadDataListCompetitionCarol(1);
    }
    if (competitionNew === null) {
      loadDataListCompetitionNew();
    }

    const loadMore = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        console.log('load');
        loadDataListCompetitionNew();
      }
    };

//     window.addEventListener('scroll', loadMore);
//     return function cleanup() {
//       window.removeEventListener('scroll', loadMore);
//     };
  });

  useEffect(() => {
    console.log(props.location.search.slice(10));
  }, [props]);

  return (
    <>
      <CompetitionPublicNavbar />
      <CompetitionPublicHeader competitionCarol={competitionCarol} />
      <CompetitionPublicBody competitionFavorite={competitionFavorite} competitionNew={competitionNew} loadMore={loadMore} />
      <AdminFooter />
    </>
  );
}
