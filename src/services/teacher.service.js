import axios from 'axios';

const API_URL = 'http://localhost:10000/api/teacher-info';

class TeacherService {
    async getPersonalInfo(id) {
        const response = await axios.get(API_URL + '/get-personal-info/' + id)
        return response;
    }

    async updatePersonalInfo(student) {
        const response = await axios.post(API_URL + '/update', student);
        return response;
    }
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TeacherService();
