import React, { useMemo } from 'react';
//import { parseISO, formatRelative } from 'date-fns';
//import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Grupo({ data }) {
  const dateParsed = useMemo(() => {
    /*return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });*/
    return data.date;
  }, [data.date]);

  return (
    <Container>
      <Left>
        <Info>
          <Name>{data.nome}</Name>
        </Info>
      </Left>
    </Container>
  );
}