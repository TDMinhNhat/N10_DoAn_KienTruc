import axios from 'axios';

const API_URL = 'http://localhost:9000/api/ministry-management';

class MinistryService {
    async getPersonalInfo(id) {
        const response = await axios.get(API_URL + '/get-by-id/' + id)
        return response;
    }

    async updatePersonalInfo(ministry) {
        const response = await axios.post(API_URL + '/update', ministry);
        return response;
    }
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MinistryService();
