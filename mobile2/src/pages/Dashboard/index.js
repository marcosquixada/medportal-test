import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Grupo from '../../components/Grupo';

import api from '../../service/api';

function Dashboard(props) {
  let [selectedGroups, setSelectedGroups] = useState(props.navigation.state.params.selectedGroups);
  const [groupsAll, setGroupsAll] = useState(props.navigation.state.params.groupsAll.groups);

  async function loadSelectedGroups(selectedGroups) {
    console.warn('groups', props.navigation.state.params.selectedGroups);
    setSelectedGroups(selectedGroups);
  }

  async function loadGroupsAll() {
    /*api.get('api/groups', {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": props.navigation.state.params.accessToken
      }
    }).catch((err) => {
      console.log('parece que deu algum erro manolow2');
      console.log(err.message);
    }).then((todosGrupos)=>{
      setGroupsAll(todosGrupos);
    });*/
    console.log(props.navigation.state.params.selectedGroups);
  }

  useEffect(() => {
    loadGroupsAll();
  }, []);

  function findIt(id){
    let elem = selectedGroups.find(e => e.id === id);
    if(elem)
      return true;
    else return false;
  }

  return (
    <Background>
      <Container>
        <Title>Grupos</Title>

        <FlatList
          data={groupsAll}
          renderItem={({ item }) =>
            <View>
              <Grupo data={item.name} selected={findIt(item.id)} />
            </View>
          }
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
