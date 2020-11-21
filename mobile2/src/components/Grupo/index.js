import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Grupo({ data, selected }) {
  const [isSelected, setSelection] = useState(selected);

  return (
    <Container>
      <Text>{data}</Text>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
      />
    </Container>
  );
}
