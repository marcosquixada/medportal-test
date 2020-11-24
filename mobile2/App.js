import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';

import Routes from './src/routes';

export default class App extends Component{
    constructor(properties) {
        super(properties);
        
    }

    render(){
        return <Routes />;
    }
}
