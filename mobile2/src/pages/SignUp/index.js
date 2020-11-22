import React, { useRef, useState } from 'react';
import { Image, Button } from 'react-native';

import logo from '../../assets/logo2.png';

import Backgound from '../../components/Background';

import api from '../../service/api';

import {
  Container,
  Form,
  FormInput,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    let data = JSON.stringify({
      username: name,
      email: email,
      password: password
    });

    api.post('api/auth/signup', data, {
      headers: { "Content-Type": "application/json" }
    }).catch(error => {
      alert('Erro! Contate o administrador!');
    }).then(res => {
      if(res.status === 200){
        alert('Cadastro efetuado com sucesso!');
        navigation.navigate('SignIn');
      }
      else
        alert('Erro ao efetuar cadastro!');
    });
  }

  return (
    <Backgound>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Nome de Usuário"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
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

          <Button onPress={handleSubmit} title="Criar conta" />
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Backgound>
  );
}
