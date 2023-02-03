import getOptions from 'utils/services.ultils';
import authAxios from './authAxios';

export async function getDataByPath(path, accessToken, data) {
  try {
    let endpoint = '';
    let option = {};
    if (accessToken && accessToken !== '') option = getOptions(accessToken);
    if (path !== '') {
      endpoint = `/${path}`;
    }
    if (data !== '') {
      endpoint = `/${path}?${data}`;
    }
    const res = await authAxios(option).get(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function createDataByPath(path, accessToken, data) {
  try {
    let endpoint = '';
    let body = {};
    let option = {};
    if (accessToken && accessToken !== '') option = getOptions(accessToken);
    if (path !== '') {
      endpoint = `/${path}`;
    }
    if (data !== '') {
      body = data;
    }
    const res = await authAxios(option).post(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function deleteDataByPath(path, accessToken, id) {
  try {
    let endpoint = '';
    let option = {};
    if (accessToken && accessToken !== '') option = getOptions(accessToken);
    if (path !== '') {
      endpoint = `/${path}`;
    }
    if (id !== '') {
      endpoint = `/${path}/${id}`;
    }
    const res = await authAxios(option).delete(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function deleteDataByPathWithParam(path, accessToken, data) {
  try {
    let endpoint = '';
    let option = {};
    if (accessToken && accessToken !== '') option = getOptions(accessToken);
    if (path !== '') {
      endpoint = `/${path}`;
    }
    if (data !== '') {
      endpoint = `/${path}?${data}`;
    }
    const res = await authAxios(option).delete(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function updateDataByPath(path, accessToken, data) {
  try {
    let endpoint = '';
    let body = {};
    let option = {};
    if (accessToken && accessToken !== '') option = getOptions(accessToken);
    if (path !== '') {
      endpoint = `/${path}`;
    }
    if (data !== '') {
      body = data;
    }
    const res = await authAxios(option).put(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}
