import React, { useMemo } from 'react';
//import { parseISO, formatRelative } from 'date-fns';
//import pt from 'date-fns/locale/pt';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Grupo({ data }) {
  return (
    <Container>
      <Text>{data}</Text>
    </Container>
  );
}
