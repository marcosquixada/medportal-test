import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

import api from '../../../service/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    /*
    //funcionando
    axios.get(`http://10.0.2.2:8080`)
      .then(res => {
        const nameList = res.data;
        console.log(nameList);
      })*/

    let data = JSON.stringify({
      username: email,
      password: password
    });

    api.post('api/auth/signin', data, { 
      headers: { "Content-Type": "application/json" } 
    }).catch(error => {
      console.log(error);
    }).then(res => {
      //const nameList = res.data;
      //console.log(nameList);

      const { accessToken, username } = res.data;

      //api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      //delay no loading do button Acessar
      //yield delay(2000);

      //yield put(signInSuccess(accessToken, username));

      console.log('Login efetuado com sucesso.');
    });

    /*axios.post('http://10.0.2.2:8080/api/auth/signin',
      {
        email,
        password,
      }, { "Content-Type": "application/json" }).catch(error => {
        console.log(error);
      }).then(res => {
        const nameList = res.data;
        console.log(nameList);
      });*/

    /*const response = yield call(api.post, 'api/auth/signin', {
      email,
      password,
    });*/
  } catch (err) {
    console.log(err);
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados!' + err.message,
    );

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados!',
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { accessToken } = payload.auth;

  if (accessToken) {
    api.defaults.headers.Authorization = `x-access-token ${accessToken}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
