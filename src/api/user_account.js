import axios from "axios";

export const authUser = async payload => {
  
  const res = await axios({
    method: 'POST',
    url: '/users/auth',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
    data: { payload }
  });

  return res;
}

export const checkUser = async payload => {
  const res = await axios({
    method: 'POST',
    url: `/users/check`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
    data: { payload }
  });

  return res;
}

export const readAll = async () => {
  const res = await axios({
    method: 'GET',
    url: '/users',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/"
  });

  return res;
}

export const readAdmin = async ()  => {
  const token = localStorage.getItem("efa_token");

  const res = await axios({
    method: 'GET',
    url: `/users/${token}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
  });

  return res;
}

export const updateAdmin = async payload => {
  const token = localStorage.getItem("efa_token");

  const res = await axios({
    method: 'PUT',
    url: `/users/${token}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
    data: { payload }
  });

  return res;
}

export const readUser = async id => {
  const res = await axios({
    method: 'GET',
    url: `/users/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
  });

  return res;
}

export const createUser = async payload => {

  const res = await axios({
    method: 'POST',
    url: '/users',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
    data: { payload }
  });

  return res;
}

export const updateUser = async payload => {

  const res = await axios({
    method: 'PUT',
    url: `/users/${payload._id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/",
    data: { payload }
  });

  return res;
}

export const deleteUser = async id => {
  const res = await axios({
    method: 'delete',
    url: `/users/${id}`,
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: "http://localhost:3001/"
  });

  return res;
}