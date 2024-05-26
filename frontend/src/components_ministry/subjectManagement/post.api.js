// api/post/post.api.js
import ministryService from "../../services/ministry.service";

export const fetchAllSubject = async () => {
  const response = await ministryService.getAllCourseClass();
  return response;
};

export const createSubject = async (subject) => {
  const response = await ministryService.addCourseClass(subject);
  return response;
}

export const createSubjectScheduled = async (subjectScheduled) => {
  try {
    const response = await ministryService.addCourseClassScheduled(subjectScheduled);
    return response;
  } catch (error) {
    console.error("Failed to create subject schedule:", error);
    throw error;
  }
};