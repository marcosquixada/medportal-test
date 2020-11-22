import React, { useState } from 'react';
import { Text, CheckBox } from 'react-native';

import { Container } from './styles';

export default function Grupo({ grupo, selected, updateSelectedGroups }) {
  const [isSelected, setSelection] = useState(selected);

  return (
    <Container>
      <Text>{grupo.name}</Text>
      <CheckBox
        value={isSelected}
        onValueChange={setSelection}
        onPress={updateSelectedGroups(grupo.id)}
      />
    </Container>
  );
}
