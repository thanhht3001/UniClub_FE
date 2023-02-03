import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';

export default function AddDepartment(props) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [majorId, setMajorId] = useState(1);

  const handleAddDepartment = () => {
    if (localStorage && localStorage.getItem('universityID')) {
      const universityID = localStorage.getItem('universityID');
      const data = {
        university_id: parseInt(universityID),
        major_id: parseInt(majorId),
        major_code: code,
        name: name,
        description: description,
      };
      props.addDepartment(data);
    }
  };

  React.useEffect(() => {
    setCode('');
    setName('');
    setDescription('');
    setMajorId(1);
  }, [props.addModal]);

  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent">
          <div className="text-center">
            <h3>Tạo chuyên ngành:</h3>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Row className="mb-4">
            <Col className="text-left ml-3" lg="12" md="12">
              <h3 className="mb-1">
                Mã:{' '}
                <Input
                  className="text-uppercase font-weight-bold"
                  bsSize="sm"
                  maxLength={6}
                  minLength={2}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </h3>
              <h3 className="mb-1">
                Tên Ngành Học: <Input bsSize="sm" value={name} onChange={(e) => setName(e.target.value)} />
              </h3>
              <h3 className="mb-1">
                Chi tiết: <Input bsSize="sm" value={description} onChange={(e) => setDescription(e.target.value)} />
              </h3>
              <h3 className="mb-1">Chuyên ngành:</h3>
              <Input className="text-default" value={majorId} type="select" onChange={(e) => setMajorId(e.target.value)}>
                {props.majorList.map((ele) => {
                  return (
                    <option key={`option-${ele.id}`} value={ele.id}>
                      {ele.name}
                    </option>
                  );
                })}
              </Input>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col className="text-center" lg="6" md="12">
              <Button color="success" outline onClick={() => handleAddDepartment()}>
                <i className="fas fa-plus mr-2" />
                Tạo ngành học
              </Button>
            </Col>
            <Col className="text-center" lg="6" md="12">
              <Button
                color="default"
                outline
                onClick={() => {
                  props.setAddModal(false);
                }}
              >
                Đóng
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
