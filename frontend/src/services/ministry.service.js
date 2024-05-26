import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

class MinistryService {
    async getPersonalInfo(id) {
        const response = await axios.get(API_URL + '/ministry-management/get-by-id/' + id)
        return response;
    }

    async updatePersonalInfo(ministry) {
        const response = await axios.post(API_URL + '/ministry-management/update', ministry);
        return response;
    }
    
    async getAllCourseClass() {
        const response = await axios.get(API_URL + '/course-class/get-all')
        return response;
    }
    async addCourseClass(courseClass) {
        const response = await axios.put(API_URL + '/course-class/add', courseClass)
        return response;
    }

    async addCourseClassScheduled(courseClassScheduled) {
        const response = await axios.put(API_URL + '/course-class-scheduled/add', courseClassScheduled)
        return response;
    }
    async getCourseFaculty(facultyID) {
        const response = await axios.get(API_URL + '/course-faculty/get-by-faculty/' + facultyID)
        return response;
    }
    async getAllCourseClassScheduled() {
        const response = await axios.get(API_URL + '/course-class-scheduled/get-all')
        return response;
    }
    async getAllTeacher() {
        const response = await axios.get(API_URL + '/teacher-mangement/get-all')
        return response;
    }

    async updateStatusCourseClass(courseClassID, status) {
        const response = await axios.get(API_URL + '/course-class/update-status/' + courseClassID + '/' + status)
        return response;
    }
    async getListStatusCourseClass() {
        const response = await axios.get(API_URL + '/course-class/get-list-status')
        return response;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new MinistryService();
