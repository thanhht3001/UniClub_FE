import { noAvatarBase64 } from 'assets/img/icons/avatar/NoAvatarBase64';
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledPopover,
  UncontrolledTooltip,
} from 'reactstrap';
import { toBase64 } from 'services/formatData';
import styled from 'styled-components';
import MemberCard from './MemberCard';

const AddnewButton = styled.i`
  :hover {
    filter: grayscale(30%);
  }
`;

const ActivityStatus = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 7px;
  color: white;
  :hover {
    filter: grayscale(30%);
  }
`;

const Priority = styled.span`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 3px;
  font-weight: bold;
  :hover {
    background-color: #7e7e7e6f;
  }
`;

export default function ActivityDetailForm(props) {
  const [decriptionEditable, setDecriptionEditable] = useState(false);
  const [changeEnding, setChangeEnding] = useState(false);
  const [image, setImage] = useState(null);
  const [endingTime, setEndingTime] = useState(null);
  const [seeds, setSeeds] = useState(0);
  const [seedChange, setSeedChange] = useState(false);
  const descriptonQuill = useRef(null);
  const title = useRef(null);

  const toolbarOptions = [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ];

  const formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'background',
    'align',
    'image',
    'video',
  ];

  const checkStatus = (status) => {
    switch (status) {
      case 0:
        return { list: 'Triển khai', text: 'Đang mở', color: 'bg-info' };
      case 1:
        return { list: 'Triển khai', text: 'Tiến hành', color: 'bg-blue' };
      case 2:
        return { list: 'Triển khai', text: 'Trì hoãn', color: 'bg-yellow' };
      case 3:
        return { list: 'Chờ duyệt', text: 'Chờ duyệt', color: 'bg-pink' };
      case 4:
        return { list: 'Hoàn thành', text: 'Hoàn thành', color: 'bg-success' };
      default:
        return { list: 'Hủy bỏ', text: 'Hủy bỏ', color: 'bg-danger' };
    }
  };

  const checkPriority = (priority) => {
    switch (priority) {
      case 0:
        return { text: 'Thấp', color: 'bg-success' };
      case 1:
        return { text: 'Trung bình', color: 'bg-info' };
      default:
        return { text: 'Cao', color: 'bg-danger' };
    }
  };

  const handleEditTitle = (condition) => {
    if (condition) {
      title.current.style.borderColor = 'blue';
      title.current.focus();
    } else {
      title.current.style.borderColor = 'white';
      props.updateTitle(title.current.textContent, props.data.id);
    }
  };

  const handleLoadImage = (image) => {
    if (image) {
      setImage(image);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let _convertImageToBase64 = toBase64(e.target.files[0]);
      Promise.all([_convertImageToBase64]).then((values) => {
        setImage(values[0]);
        props.updateImage(values[0], props.data.id);
      });
    }
  };

  React.useEffect(() => {
    if (props.data?.activities_entities?.length > 0) {
      handleLoadImage(props.data.activities_entities[0].image_url);
    }
  }, [props.data]);

  return (
    <Card lg="9">
      {props.data ? (
        <>
          <CardHeader>
            <Row>
              <Col md="11">
                <h3 className="text-default" style={{ fontWeight: '700' }} onClick={() => handleEditTitle(true)}>
                  <i className="fas fa-sticky-note text-default mr-3" />
                  <span
                    ref={title}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    style={{ borderRadius: '5px', border: '2px solid white', paddingLeft: '10px', paddingRight: '10px' }}
                    onBlur={() => handleEditTitle(false)}
                  >
                    {props.data.name}
                  </span>
                </h3>
                <span className="text-gray text-sm">
                  trong danh sách <span className="text-underline">{checkStatus(props.data.competition_activity_status).list}</span> tạo bởi{' '}
                  <span className="font-weight-bold">{props.data.creator_name}</span>
                </span>
              </Col>
              <Col md="1" className="text-right">
                <a
                  href="#close"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setActivityForm(false);
                  }}
                >
                  <i className="fas fa-times text-default" />
                </a>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="mb-4">
              <Col md="6">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="fas fa-info text-default mr-3" />
                  Trạng thái
                </h3>
                <ActivityStatus className={checkStatus(props.data.competition_activity_status).color}>
                  {checkStatus(props.data.competition_activity_status).text}
                </ActivityStatus>
              </Col>
              <Col md="6">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="fas fa-exclamation text-default mr-3" />
                  Độ ưu tiên
                </h3>
                <a
                  id="priorityChange"
                  href="#priority"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <ActivityStatus className={checkPriority(props.data.priority).color}>{checkPriority(props.data.priority).text}</ActivityStatus>
                </a>
                <UncontrolledPopover placement="bottom" target="priorityChange" trigger="legacy" style={{ maxWidth: '500px', minWidth: '300px' }}>
                  <PopoverHeader className="text-center">Thay đổi độ ưu tiên</PopoverHeader>
                  <PopoverBody>
                    <Row>
                      <Col md="12" className="text-center">
                        <a
                          href="#priority"
                          onClick={(e) => {
                            e.preventDefault();
                            props.updatePriority(0, props.data.id);
                          }}
                        >
                          <Priority>Thấp</Priority>
                        </a>
                      </Col>
                      <Col md="12" className="text-center">
                        <a
                          href="#priority"
                          onClick={(e) => {
                            e.preventDefault();
                            props.updatePriority(1, props.data.id);
                          }}
                        >
                          <Priority>Trung bình</Priority>
                        </a>
                      </Col>
                      <Col md="12" className="text-center">
                        <a
                          href="#priority"
                          onClick={(e) => {
                            e.preventDefault();
                            props.updatePriority(2, props.data.id);
                          }}
                        >
                          <Priority>Cao</Priority>
                        </a>
                      </Col>
                    </Row>
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md="12">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="fas fa-user-friends text-default mr-3" />
                  Thành viên
                </h3>
                {props.data.member_takes_activities?.length > 0 ? (
                  props.data.member_takes_activities.map((ele, value) => {
                    return (
                      <React.Fragment key={`member-${ele.id}`}>
                        <a
                          className="mr-1"
                          href="#member"
                          id={`tooltip-member${value}`}
                          onClick={(e) => {
                            e.preventDefault(e);
                          }}
                        >
                          <img alt="..." className="avatar avatar-sm rounded-circle" src={ele.member_img ?? noAvatarBase64} />
                        </a>
                        <UncontrolledTooltip delay={0} target={`tooltip-member${value}`}>
                          {ele.member_name}
                        </UncontrolledTooltip>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <></>
                )}
                <a
                  className="mr-1"
                  href="#member"
                  id="tooltip-memberaddnew"
                  onClick={(e) => {
                    e.preventDefault(e);
                  }}
                >
                  <AddnewButton className="fas fa-plus avatar avatar-sm rounded-circle" />
                </a>
                <UncontrolledTooltip delay={0} target="tooltip-memberaddnew">
                  Thêm mới
                </UncontrolledTooltip>
                <UncontrolledPopover
                  placement="bottom"
                  target="tooltip-memberaddnew"
                  trigger="legacy"
                  style={{ maxWidth: '500px', minWidth: '300px' }}
                >
                  <PopoverHeader className="text-center">Thêm vào hoạt động</PopoverHeader>
                  <PopoverBody>
                    <MemberCard
                      member_takes_activities={props.data.member_takes_activities}
                      activityID={props.data.id}
                      removeMember={props.removeMember}
                      addMember={props.addMember}
                    />
                  </PopoverBody>
                </UncontrolledPopover>
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col className="col-auto">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="fas fa-seedling text-default mr-3" />
                  Điểm thưởng:
                </h3>
              </Col>
              <Col className="col-auto">
                <Input
                  placeholder="điểm thưởng"
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={props.data.seeds_point}
                  onChange={(e) => {
                    setSeeds(e.target.value);
                    setSeedChange(true);
                  }}
                />
              </Col>
              {seedChange ? (
                <Button
                  color="info"
                  size="sm"
                  onClick={() => {
                    props.updateSeeds(seeds, props.data.id);
                    setSeedChange(false);
                  }}
                >
                  Lưu thay đổi
                </Button>
              ) : (
                <></>
              )}
            </Row>
            <Row className="align-items-center mb-3">
              <Col className="col-auto">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="far fa-calendar text-default mr-3" />
                  Thời hạn:
                </h3>
              </Col>
              <Col className="col-auto">
                <Input
                  className="text-default"
                  type="datetime-local"
                  defaultValue={props.data.ending}
                  onChange={(e) => {
                    setChangeEnding(true);
                    setEndingTime(e.target.value);
                  }}
                />
              </Col>
              {changeEnding ? (
                <Col className="col-auto">
                  <Button
                    color="primary"
                    outline
                    size="sm"
                    onClick={() => {
                      props.updateEnding(endingTime, props.data.id);
                      setChangeEnding(false);
                    }}
                  >
                    Lưu thời hạn
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </Row>
            <Row>
              <Col className="col-auto">
                <h3 className="text-default" style={{ fontWeight: '700' }}>
                  <i className="fas fa-align-left text-default mr-3" />
                  Mô tả
                </h3>
              </Col>
              {!decriptionEditable ? (
                <Col className="col-auto">
                  <Button className="bg-lighter" size="sm" onClick={() => setDecriptionEditable(true)}>
                    Chỉnh sửa
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </Row>
            {decriptionEditable ? (
              <>
                <ReactQuill
                  style={{ display: 'block', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                  value={props.data.description}
                  ref={descriptonQuill}
                  clipboard={{
                    matchVisual: false,
                  }}
                  theme="snow"
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                  formats={formats}
                />
                <Row className="mt-3 mb-3">
                  <Col className="col-auto">
                    <Button
                      color="info"
                      onClick={() => {
                        props.updateDescription(descriptonQuill.current.state.value, props.data.id);
                        setDecriptionEditable(false);
                      }}
                    >
                      Lưu
                    </Button>
                  </Col>
                  <Col className="col-auto">
                    <Button color="secondary" outline onClick={() => setDecriptionEditable(false)}>
                      Hủy
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <ReactQuill value={props.data.description} theme="bubble" readOnly />
            )}
            {image ? (
              <>
                <Row>
                  <Col className="col-auto">
                    <h3 className="text-default" style={{ fontWeight: '700' }}>
                      <i className="fas fa-align-left text-default mr-3" />
                      Ảnh minh họa
                    </h3>
                  </Col>
                  <Col className="col-auto">
                    <Input id="projectCoverUploads" type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="text-center">
                    <img alt="picture" src={image} style={{ width: '100%' }} />
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
          </CardBody>
          <CardFooter>
            {props.data.competition_activity_status === 3 ? (
              <Row className="align-items-center justify-content-center">
                <Col className="col-auto">
                  <Button outline color="info" onClick={() => props.updateStatus(4, props.data.id)}>
                    Xét duyệt
                  </Button>
                </Col>
                <Col className="col-auto">
                  <Button outline color="danger" onClick={() => props.updateStatus(0, props.data.id)}>
                    Từ chối
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            {props.data.competition_activity_status === 0 ||
            props.data.competition_activity_status === 1 ||
            props.data.competition_activity_status === 0 ? (
              <Row className="align-items-center justify-content-center">
                <Col className="col-auto">
                  <Button color="danger" onClick={() => props.removeWarningAlert(props.data.id)}>
                    Hủy bỏ
                  </Button>
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </CardFooter>
        </>
      ) : (
        <Row>
          <Col className="text-center" md="12">
            <img alt="..." src={require('assets/img/icons/Curve-Loading.gif').default} style={{ margin: 'auto', width: '100%' }} />
          </Col>
        </Row>
      )}
    </Card>
  );
}
