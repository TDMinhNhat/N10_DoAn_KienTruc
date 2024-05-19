import axios from 'axios';

const API_URL = 'http://localhost:7000/api';

class StudentService {
    async getPersonalInfo(id) {
        const response = await axios.get(API_URL + '/student-info/get-personal-info/' + id)
        return response;
    }

    async updatePersonalInfo(student) {
        const response = await axios.post(API_URL + '/student-info/update', student);
        return response;
    }
    async getAchieveStudy(id) {
        const response = await axios.get(API_URL + '/student-info/get-achieve-study/' + id)
        return response;
    }
    async getCourseScheduled(id) {
        const response = await axios.get(API_URL + '/course-scheduled/' + id)
        return response;
    }

    async getListCourseScheduled(id) {
        const response = await axios.get(API_URL + '/course-scheduled/list-course-scheduled/' + id)
        return response;
    }

    async getBySemesterYear(id, semesterYear, facultyID) {
        const response = await axios.get(API_URL + '/course-scheduled/get-by-semester-year/' + id + '/' + semesterYear + '/' + facultyID)
        return response;
    }

    async registerTheoryCourse(idStudent, theoryScheduled) {
        const response = await axios.post(API_URL + '/course-scheduled/register/' + idStudent + '/' + theoryScheduled)
        return response;
    }
    async registerPracticeCourse(idStudent, theoryScheduled, practiceGroup) {
        const response = await axios.post(API_URL + '/course-scheduled/register/' + idStudent + '/' + theoryScheduled + '/' + practiceGroup)
        return response;
    }


    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new StudentService();
