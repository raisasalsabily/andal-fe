import axios from 'axios';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import { ERRORS, SET_USER } from '../types';
import { setAuth } from '../../utils/setAuth';

export const LoginAction = (form, navigate) => (dispatch) => {
  axios
    .post('http://34.86.158.248:8080/auth/parent/signin', form)
    .then((res) => {
      // console.log(res);
      const { token } = res.data;
      localStorage.setItem('jwt', token);
      const decode = jwt_decode(token);
      // console.log(decode);
      dispatch(setUser(decode));
      // navigate('/beranda/orangtua/v2');
      window.location.href = '/beranda/orangtua/v2';
    })
    .catch((err) => {
      // dispatch({
      //   type: ERRORS,
      //   payload: err.response.data
      // });
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    });
};

export const LogoutAction = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch({
    type: SET_USER,
    payload: {}
  });
};

export const setUser = (decode) => ({
  type: SET_USER,
  payload: decode
});
