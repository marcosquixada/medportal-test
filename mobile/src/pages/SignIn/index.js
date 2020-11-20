import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
//import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo2.png';
import api from '../../service/api';

import Backgound from '../../components/Background';
//import { signInRequest } from '../../store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  //const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    //dispatch(signInRequest(email, password));

    //const { email, password } = payload;

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
      const { accessToken, username } = res.data;

      navigation.navigate('Dashboard');

      console.log('Login efetuado com sucesso.');
    });
  }

  function teste(){
    Alert.alert("teste", "teste");
  }

  return (
    <Backgound>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SignLink onPress={handleSubmit}>
            <SignLinkText>Acessar</SignLinkText>
          </SignLink>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Backgound>
  );
}
