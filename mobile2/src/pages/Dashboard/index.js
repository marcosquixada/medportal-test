import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

//import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Grupo from '../../components/Grupo';

const data = [{
  "id": 1, "nome": "Grupo 1",
  "id": 2, "nome": "Grupo 2",
  "id": 3, "nome": "Grupo 3",
}];

function Dashboard({ isFocused }) {
  const [grupos, setGrupos] = useState([]);

  async function loadGrupos() {
    //const response = await api.get('grupos');

    setGrupos(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadGrupos();
    }
  }, [isFocused]);

  /*async function handleCancel(id) {
    //const response = await api.delete(`grupos/${id}`);

    setGrupos(
      grupos.map(grupo =>
        grupo.id === id
          ? {
              ...grupo,
              //canceled_at: response.data.canceled_at,
            }
          : grupo,
      ),
    );
  }*/

  return (
    <Background>
      <Container>
        <Title>Grupos</Title>

        <List
          data={grupos}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <Grupo data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Grupos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
