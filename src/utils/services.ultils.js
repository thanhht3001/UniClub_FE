export default function getOptions(accessToken) {
  let headers = {};

  if (accessToken && accessToken !== '') {
    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  const options = { headers };
  return options;
}

export class ultilities {
  // constructor() { }

  isNullOrUndefined(value) {
    if (value === undefined || value === null) return true;
    return false;
  }
}

export function getOptionsForImgur(clientID) {
  let headers = {};

  if (clientID && clientID !== '') {
    headers = {
      Authorization: `Client-ID ${clientID}`,
    };
  }
  const options = { headers };
  return options;
}
