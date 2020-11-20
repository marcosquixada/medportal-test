//import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.63:8080/',
});
/*
api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@CodeApi:token');

    if (token)
        request.headers['x-access-token'] = token;
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});*/


export default api;