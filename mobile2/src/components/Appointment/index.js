import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '../../assets/logo2.png';

import { Container, Left, Avatar, Info, Name } from './styles';

export default function Appointment({ item }) {
  return (
    <Container>
      <Left>
        <Avatar
          source={logo}
        />
        <Info>
          <Name>{item.name}</Name>
        </Info>
      </Left>
      <Icon name={item.check} size={30} color="#f64c75" />
    </Container>
  );
}
