import React, { useRef, useState } from 'react';
import { Image, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../assets/logo2.png';
import api from '../../service/api';

import Backgound from '../../components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit () {

    let data = JSON.stringify({
      username: email,
      password: password
    });
    
    api.post('api/auth/signin', data, {
      headers: { "Content-Type": "application/json" }
    }).catch(error => {
      console.log(error);
    }).then(res => {
      api.get('api/groups', {
        headers: { "x-access-token": res.data.accessToken }
      }).catch(error => {
        console.log(error);
      }).then(groupsAll => {
        const { accessToken, id, groups } = res.data;

        navigation.navigate('Dashboard', { id, selectedGroups: groups, groupsAll: groupsAll.data, accessToken: accessToken });

        console.log('Login efetuado com sucesso.');
      });
    });
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
            placeholder="Digite seu Nome de Usuário"
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

          <Button onPress={() => {
            handleSubmit();
          }} title="Acessar">
            Acessar
          </Button>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Backgound>
  );
}
