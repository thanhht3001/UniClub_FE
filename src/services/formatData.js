import moment from 'moment';

export const newDateConvertToFormat = (date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  const newDate = `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${mi < 10 ? '0' + mi : mi}:${
    ss < 10 ? '0' + ss : ss
  }`;
  return newDate;
};

export const formatTitle = (title) => {
  if (title.trim() !== '') {
    let arr = title.split(' ');
    arr = arr.filter((e) => e !== '');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const formated = arr.join(' ');
    return formated;
  }
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertDateToShow = (date) => {
  const arr = date.split('T');
  const day = arr[0].split('-');
  return `${day[2]}/${day[1]}/${day[0]}`;
};

export const convertDateToShowWithTime = (date) => {
  const arr = date.split('T');
  const day = arr[0].split('-');
  const time = arr[1].split(':');
  return `${day[2]}-${day[1]}-${day[0]} ${time[0]}:${time[1]}:${time[2].slice(0, 2)}`;
};

export const ValidateEmail = (email) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const text = email + '';
  if (text.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const covertDatePassed = (date) => {
  const ago = moment(date, 'YYYY-MM-DDThh:mm:ss').fromNow();
  return ago;
};

export const convertURLImageToBase64 = (url) => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  };
  img.src = url;
};

export const findCompetitionBanner = (array) => {
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (parseInt(e.entity_type_id) === 1) {
      return e.image_url;
    }
  }
  return '';
};
