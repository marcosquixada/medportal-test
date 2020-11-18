import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:8080/',
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