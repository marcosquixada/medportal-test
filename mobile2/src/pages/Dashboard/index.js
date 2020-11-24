import React, { useEffect, useState, Component } from 'react';
import { Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import api from '../../service/api';

class Dashboard extends Component {
  //const [grupos, setGrupos] = useState(props.navigation.state.params.groupsAll.groups);
  //let [selectedGroups, setSelectedGroups] = useState(props.navigation.state.params.selectedGroups);
  constructor(props) {
    super(props);

    let { navigation } = this.props;

    this.state = {
      userId: navigation.state.params.id,
      grupos: navigation.state.params.groupsAll.groups,
      selectedGroups: navigation.state.params.selectedGroups,
      accessToken: navigation.state.params.accessToken
    }

    //this.setState({ grupos: items });

    //console.log(userId, grupos, selectedGroups);

    //console.log(navigation.state.params);

    /*this.setState = {
      grupos = navigation.getParam('groupsAll').groups,
      selectedGroups = navigation.getParam('selectedGroups')
    }*/
    
    OneSignal.init("5d6fa2a1-da5c-44ef-8cee-a660f69ee3fd");

    OneSignal.addEventListener('opened', this.onOpened);
  }

  subscribe(group) {
    OneSignal.sendTag(group, "1");
  }

  unsubscribe(group) {
    OneSignal.sendTag(group, "0");
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('openResult: ', openResult);
  }

  componentDidMount(){
    let items = this.state.grupos.map((grupo) => {
        let elem = this.state.selectedGroups.find(e => e.id === id);
        let check = typeof(elem) !== "undefined" ? "check" : "";
        return { ...grupo, "check": check }
      });

    this.setState({grupos: items});
  }

  _onPress = (id) => {
    let items;

    items = this.state.grupos.map((item) => {
      if (item.id === id){
        if (item.check) { 
          item.check = "";
          //enviando para o one signal unsubscribe
          this.unsubscribe(item.tag);
        } else {
          item.check = "check";
          //enviando para o one signal subscribe
          this.subscribe(item.tag);
        }
      }
      return item;
    });
    this.setState({grupos: items});
  }
  
  handleUpdate = () => {
    let data = {
      "userId": this.state.userId,
      "groups": this.state.grupos
    };

    api.post('api/groups', data, {
      headers: { "x-access-token": this.state.accessToken }
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

  render(){
    //let { navigation } = this.props;

    return (
      <Background>
        <Container>
          <Title>Grupos</Title>

          <List
            data={this.state.grupos}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { this._onPress(item.id) }}>
                <Appointment item={item} />
              </TouchableOpacity>
            )}
          />
          <Button onPress={() => this.handleUpdate()} title="Atualizar" />
        </Container>
      </Background>
    );
  }
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
