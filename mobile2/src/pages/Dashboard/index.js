import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


//import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Grupo from '../../components/Grupo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

function Dashboard(props) {
  //const grupos = ;

  /*const [grupos, setGrupos] = useState([
    { key: '1', nome: 'Grupo 1' },
    { key: 'Dan', nome: 'Grupo 2' },
    { key: 'Dominic', nome: 'Grupo 3' },
    { key: 'Jackson', nome: 'Grupo 4' },
  ]);*/

  const [grupos, setGrupos] = useState(props.navigation.state.params.paramName);
  //const { params } = props.navigation.state;

  async function loadGrupos(grupos) {
    //const response = await api.get('grupos');
    console.warn('grupos', props.navigation.state.params.paramName);
    setGrupos(grupos);
  }

  useEffect(() => {
    //if (isFocused) {
    loadGrupos(grupos);
    //}
  }, []);

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

        <FlatList
          data={grupos}
          renderItem={({ item }) => <Grupo data={item} />}
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
