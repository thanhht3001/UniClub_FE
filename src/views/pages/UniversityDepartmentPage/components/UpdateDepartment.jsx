import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';

export default function UpdateDepartment(props) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [majorId, setMajorId] = useState(1);

  const handleUpdateDepartment = () => {
    if (localStorage && localStorage.getItem('universityID')) {
      const universityID = localStorage.getItem('universityID');
      const data = {
        id: props.data.id,
        university_id: parseInt(universityID),
        major_id: parseInt(majorId),
        department_code: code,
        name: name,
        description: description,
        status: true,
      };
      props.updateDepartment(data);
    }
  };

  React.useEffect(() => {
    setCode('');
    setName('');
    setDescription('');
    setMajorId(1);
  }, [props.addModal]);

  React.useEffect(() => {
    if (props.data) {
      setCode(props.data.department_code);
      setName(props.data.name);
      setDescription(props.data.description);
      setMajorId(props.data.major_id);
    }
  }, [props.data]);

  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center">
            <h3>Chỉnh sửa chuyên ngành:</h3>
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
              <Button color="success" outline onClick={() => handleUpdateDepartment()}>
                <i className="fas fa-tools mr-2" />
                Chỉnh sửa
              </Button>
            </Col>
            <Col className="text-center" lg="6" md="12">
              <Button
                color="default"
                outline
                onClick={() => {
                  props.setUpdateModal(false);
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
