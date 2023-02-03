import SimpleHeader from 'components/Headers/SimpleHeader';
import React from 'react';
import CreateEventBody from './components/CreateEventBody';

export default function CreateEventPage() {
  return (
    <>
      <SimpleHeader name="Tạo sự kiện" parentName="Cuộc thi và sự kiện" linkParent="/" />
      <CreateEventBody />
    </>
  );
}
