import axios from 'axios';

export const createParcel = async payload => {
  const res = await axios({
    method: 'POST',
    url: '/parcels',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: process.env.REACT_APP_API_URI,
    data: { payload }
  });

  return res;
}

export const readAllParcel = async () => {
  const res = await axios({
    method: 'GET',
    url: '/parcels',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://192.168.254.109:3001/"
  });

  return res;
}

export const readParcel = async id => {
  const res = await axios({
    method: 'GET',
    url: `/parcels/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://192.168.254.109:3001/"
  });

  return res;
}

export const updateParcel = async (id, payload)  => {
  
  const res = await axios({
    method: 'PUT',
    url: `/parcels/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://192.168.254.109:3001/",
    data: {payload}
  });

  return res;
}

export const deleteParcel = async id => {
  const res = await axios({
    method: 'delete',
    url: `/parcels/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://192.168.254.109:3001/"
  });

  return res;
}