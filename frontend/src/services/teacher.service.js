import axios from 'axios';

const API_URL = 'http://localhost:10000/api';

class TeacherService {
    async getPersonalInfo(id) {
        const response = await axios.get(API_URL + '/teacher-info/get-info/' + id)
        return response;
    }

    async updatePersonalInfo(student) {
        const response = await axios.post(API_URL + '/teacher-info/update', student);
        return response;
    }

    async getCourseScheduledList(teacherID) {
        const response = await axios.get(API_URL + '/course-scheduled/get-list/' + teacherID);
        return response;
    }
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TeacherService();
