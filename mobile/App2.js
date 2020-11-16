import React from 'react';
import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/pages/login';
import Logged from './src/pages/logged';


const AppStackNavigator = createStackNavigator({
    SignedOut: {
        screen: Login,
        navigationOptions: {
            title: "Entrar"
        }
    }, SignedIn: {
        screen: Logged,
        navigationOptions: {
            title: "Meu perfil"
        }
    }
},
    {
        headerMode: "none",
        mode: "modal",
        initialRouteName: "SignedOut",
        navigationOptions: {
            gesturesEnabled: false
        }
    });

const Apps = createAppContainer(AppStackNavigator)

export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}