const warningAlertConstants = {
  timeout: 'Kết nối tới máy chủ quá hạn',
  titleValidation: 'Vui lòng điền tiêu đề',
  contentsValidation: 'Vui lòng điền nội dung bài đăng',
  dateTimeValidation: 'Ngày tháng không phù hợp',
  addressValidation: 'Vui lòng điền địa chỉ',
  addressNameValidation: 'Vui lòng điền tên địa chỉ',
  imageValidation: 'Vui lòng thêm ảnh',
  informationValidation: 'Vui lòng điền đầy đủ thông tin',
  emailValidation: 'Email không đúng định dạng',
  accountNotFound: 'Tài khoản không có trong hệ thống',
  notRegister: 'Tài khoản chưa được đăng ký',
  loginFail: 'Đã có lỗi xảy ra trong quá trình đăng nhập',
  accountError: 'Lỗi tài khoản',
  minNumber: 'Các thông số phải lớn hơn 0',
  seedValidation: 'Điểm thưởng phải lớn hơn hoặc bằng 0',
};

const successAlertConstants = {
  createActivity: 'Tạo hoạt động thành công',
  createCompetition: 'Tạo cuộc thi hoặc sự kiện thành công',
  updateCompetition: 'Cập nhật cuộc thi hoặc sự kiện thành công',
  loginSuccess: 'Chào mừng bạn đến với hệ thống.',
};

export { warningAlertConstants, successAlertConstants };
