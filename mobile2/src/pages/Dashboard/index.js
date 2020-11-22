import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

//import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import api from '../../service/api';

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Dashboard(props) {
  const [grupos, setGrupos] = useState(props.navigation.state.params.groupsAll.groups);
  let [selectedGroups, setSelectedGroups] = useState(props.navigation.state.params.selectedGroups);

  function loadGrupos(id){
    setGrupos(
      grupos.map((grupo) => {
        let check = isThere(grupo.id) ? "check" : "";
        return { ...grupo, "check": check }
      })
    )
  }

  useEffect(() => {
    loadGrupos();
  }, []);

  function isThere(id) {
    let elem = selectedGroups.find(e => e.id === id);
    if (elem)
      return true;
    else
      return false;
  }

  function _onPress(id) {
    let items;

    items = grupos.map((item) => {
      if (item.id === id){
        if (item.check)
          item.check = "";
        else
          item.check = "check";
      }
      return item;
    });
    setGrupos(items);
  }
  
  async function handleUpdate() {
    /*await grupos.map((grupo)=>{
      if (checked(grupo.id)) {
        //incluir no array a ser enviado
        if(!isThere(grupo.id)){
          //não está no array, incluir
          selectedGroups["id"] = id;
        } 
      } else {
        //não está ticado, se tiver no array, excluir
        if(isThere(grupo.id)){
          setSelectedGroups(
            //manter só quem tem o id diferente daquele
            selectedGroups.filter(grupo =>
              (grupo.id !== id)
            ),
          );
        }
      }
    });*/

    let data = {
      "userId": props.navigation.state.params.id,
      "groups": grupos
    };

    console.log(data);

    api.post('api/groups', data, {
      headers: { "x-access-token": props.navigation.state.params.accessToken }
    }).catch(error => {
      console.log(error);
    }).then(res => {
      if (res.status === 200) {
        alert('Grupos atualizados com sucesso!');
      } else {
        alert('Erro ao atualizar grupos!');
      }
    });
  }

  return (
    <Background>
      <Container>
        <Title>Grupos</Title>

        <List
          data={grupos}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { _onPress(item.id) }}>
              <Appointment item={item} />
            </TouchableOpacity>
          )}
        />
        <Button onPress={() => handleUpdate()} title="Atualizar" />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
