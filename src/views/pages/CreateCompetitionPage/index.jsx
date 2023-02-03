import SimpleHeader from 'components/Headers/SimpleHeader';
import React from 'react';
import CreateCompetitionBody from './components/CreateCompetitionBody';

export default function CreateCompetionPage() {
  return (
    <>
      <SimpleHeader name="Tạo cuộc thi" parentName="Cuộc thi và sự kiện" linkParent="/" />
      <CreateCompetitionBody />
    </>
  );
}
