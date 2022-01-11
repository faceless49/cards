import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    headers: {},
});

export const authAPI = {
    registration(email: string, password: string) {
        return instance.post('auth/register', {email, password})
    }
}