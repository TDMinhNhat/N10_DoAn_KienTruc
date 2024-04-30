import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/students';

class AuthService {
    async register(username, password) {
        const response = await axios.post(API_URL + '/register', {
            username,
            password,
        });
        return response;
    }

    async login(username, password) {
        const response = await axios.post(API_URL + '/login', {
            username,
            password,
        });
        return response;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
