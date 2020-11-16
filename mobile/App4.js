import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

import MultiSelect from 'react-native-multiple-select';
import api from './src/service/api';

const items = [{
  id: '92iijs7yta',
  name: 'Ondo'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun'
}, {
  id: '16hbajsabsd',
  name: 'Calabar'
}, {
  id: 'nahs75a5sg',
  name: 'Lagos'
}, {
  id: '667atsas',
  name: 'Maiduguri'
}, {
  id: 'hsyasajs',
  name: 'Anambra'
}, {
  id: 'djsjudksjd',
  name: 'Benue'
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna'
}, {
  id: 'suudydjsjd',
  name: 'Abuja'
}
];

class MultiSelectExample extends Component {

  constructor(){
    super();
    this.state = {
      selectedItems: [],
    };
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
  }
}

class Home extends Component {
  state = {
    loggedInUser: null,
    errorMessage: '',
    groups: [],
  };

  saveUser = async (user) => {
    await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(user))
  }

  signIn = async () => {
    try {
      const response = await api.post('http://192.168.15.80:8080/api/auth/signin', {
        username: 'marcosquixada',
        password: '489021'
      });

      console.log(response.data);

      const { accessToken, username } = response.data;

      //await saveUser(user);

      await AsyncStorage.multiSet([
        ['@CodeApi:accessToken', accessToken],
        ['@CodeApi:username', JSON.stringify(username)],
      ]);

      this.setState({ loggedInUser: username });

      Alert.alert('Logado com sucesso!');
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  getGroupsList = async () => {
    try {
      const response = await api.get('http://192.168.15.80:8080/api/groups', {
        headers: {
          "x-access-token": accessToken
        }
      });

      console.log(response.data);

      const { groups } = response.data;

      this.setState({ groups });
    } catch (err) {
      this.setState({ errorMessage: err.data.error });
    }
  };

  async componentDidMount() {
    await AsyncStorage.clear();

    const token = await AsyncStorage.getItem('@CodeApi:token');
    const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user')) || null;

    if (token && user)
      this.setState({ loggedInUser: user });
  }

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        { this.state.loggedInUser
          ? <Button onPress={this.getGroupsList} title="Carregar Grupos" />
          : <Button onPress={this.signIn} title="Entrar" />}

        { this.state.groups.map(grupo => (
          <View key={grupo.id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{grupo.id}</Text>
            <Text style={{ fontWeight: 'bold' }}>{grupo.description}</Text>
          </View>
        ))}
      </View>
    );
  }
}


const NewApp = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Notification One Signal</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("5d6fa2a1-da5c-44ef-8cee-a660f69ee3fd");

    OneSignal.addEventListener('opened', this.onOpened);

    OneSignal.sendTag("grupo-bares", "1");
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('openResult: ', openResult);
  }
  render(){
    return <View>
      
      <Home />
      <MultiSelectExample />
    </View>;
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
