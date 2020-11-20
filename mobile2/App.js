import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';

import Routes from './src/routes';

export default class App extends Component{
    constructor(properties) {
        super(properties);
        OneSignal.init("5d6fa2a1-da5c-44ef-8cee-a660f69ee3fd");

        OneSignal.addEventListener('opened', this.onOpened);
    }

    subscribe(group){
        OneSignal.sendTag(group, "1");
    }

    unsubscribe(group){
        OneSignal.sendTag(group, "0");
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('opened', this.onOpened);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('openResult: ', openResult);
    }
    render(){
        return <Routes />;
    }
}
