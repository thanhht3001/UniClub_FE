/*eslint-disable*/
import React, { useEffect } from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
import LoginNavbar from './component/LoginNavbar.js';

// react component used to create sweet alerts
import ReactBSAlert from 'react-bootstrap-sweetalert';
import Loading from '../components/Loading.js';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
} from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';
import { useAuth } from 'contexts/AuthContext';
import { loginByPath } from 'services/auth.service';
import jwtDecode from 'jwt-decode';
import { getDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { warningAlertConstants } from 'constants/alert.constants.js';

export default function Login() {
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formModal, setformModal] = React.useState(false);

  const { signInWithGoogle } = useAuth();
  const history = useHistory();

  const [alert, setalert] = React.useState(false);

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-200px' }}
        title="Đăng nhập không thành công"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="xác nhận"
        btnSize=""
      >
        {message}
      </ReactBSAlert>
    );
  };

  const successAlert = () => {
    setalert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-200px' }}
        title="Đăng nhập thành công"
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        showCancel={false}
        showConfirm={false}
      >
        {successAlert.loginSuccess}
      </ReactBSAlert>
    );
  };

  async function loginWithAccessToken(accessTokenFirebase) {
    setIsSubmitting(true);
    const res = await loginByPath('api/v1/firebase', accessTokenFirebase);
    console.log(res);
    if (res && res.status === 200) {
      if (localStorage) {
        localStorage.setItem('accessToken', res.data.token);
        console.log(jwtDecode(res.data.token), 'jwt');
        const roleID = jwtDecode(res.data.token).RoleId;
        localStorage.setItem('roleID', roleID);
        localStorage.setItem('universityID', jwtDecode(res.data.token).UniversityId);
        localStorage.setItem('studentID', jwtDecode(res.data.token).Id);
        switch (parseInt(roleID)) {
          case 1:
            successAlert();
            setTimeout(function () {
              history.push('/university/quan-ly-clb');
            }, 1500);
            break;
          case 3:
            successAlert();
            getClubAndUniversity(res.data.token, jwtDecode(res.data.token).Id);
            break;
          case 4:
            successAlert();
            setTimeout(function () {
              history.push('/system/nguoi-dung');
            }, 1500);
            break;
          default:
            warningAlert(warningAlertConstants.accountNotFound);
            setIsSubmitting(false);
            setformModal(false);
            break;
        }
      }
    } else {
      warningAlert(warningAlertConstants.timeout);
      setIsSubmitting(false);
      setformModal(false);
    }
  }

  async function getClubAndUniversity(accessToken, studentID) {
    const res = await getDataByPath(`api/v1/clubs/user/${studentID}`, accessToken, '');
    console.log(res, 'club');
    if (res && res.status === 200) {
      if (res.data.length > 0) {
        localStorage.setItem('clubID', res.data[0].id);
        successAlert();
        setTimeout(function () {
          history.push('/admin/thong-tin-clb');
        }, 1500);
      } else {
        warningAlert(warningAlertConstants.accountNotFound);
      }
    } else if (res && res.status === 401) {
      warningAlert(warningAlertConstants.accountNotFound);
    } else {
      warningAlert(warningAlertConstants.timeout);
    }
    setIsSubmitting(false);
    setformModal(false);
  }

  const handleErrorLogin = (request) => {
    switch (request) {
      case 'Firebase: Error (auth/user-not-found).':
        warningAlert(warningAlertConstants.accountNotFound);
        break;
      default:
        warningAlert(warningAlertConstants.loginFail);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('clubID')) {
      if (parseInt(localStorage.getItem('clubID')) === 3) history.push('/admin/thong-tin-clb');
    }
  }, []);

  return (
    <>
      {alert}
      <LoginNavbar />
      <AuthHeader title="Chào mừng bạn đến với" lead="Nền tảng quản lý thông tin sự kiện và cuộc thi của Câu Lạc Bộ Sinh Viên." />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <span>Đăng nhập với</span>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    disabled={isSubmitting}
                    onClick={() => {
                      signInWithGoogle()
                        .then((response) => {
                          console.log(response);
                          setIsSubmitting(false);
                          setformModal(true);
                          loginWithAccessToken(response.user.accessToken);
                        })
                        .catch((error) => {
                          handleErrorLogin(error.message);
                          setIsSubmitting(false);
                          setformModal(false);
                        });
                    }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img alt="..." src={require('assets/img/icons/common/google.svg').default} />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <span>Đăng nhập với tài khoản</span>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames('mb-3', {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" onFocus={() => setfocusedEmail(true)} onBlur={() => setfocusedEmail(true)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="info" type="button" disabled={isSubmitting}>
                      Đăng nhập
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal className="modal-dialog-centered" size="sm" isOpen={formModal}>
          <div className="modal-body p-0 bg-transparent">
            <Loading style={{ margin: 'auto' }} />
          </div>
        </Modal>
      </Container>
    </>
  );
}
