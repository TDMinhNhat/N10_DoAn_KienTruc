// api/post/post.api.js
// subjects: mã môn học, tên môn học, Học phần tiên quyết, Kiểu (Bắt buộc, Tự chọn)
let subjects = [
  { id: 1, name: 'Subject 1', prerequisite: 'None', type: 'Bắt buộc' },
  { id: 2, name: 'Subject 2', prerequisite: 'Subject 1', type: 'Tự chọn' },
  { id: 3, name: 'Subject 3', prerequisite: 'Subject 1', type: 'Bắt buộc' },
  { id: 4, name: 'Subject 4', prerequisite: 'Subject 2', type: 'Tự chọn' },
  { id: 5, name: 'Subject 5', prerequisite: 'Subject 3', type: 'Bắt buộc' },
  { id: 6, name: 'Subject 6', prerequisite: 'Subject 4', type: 'Tự chọn' },
  { id: 7, name: 'Subject 7', prerequisite: 'Subject 5', type: 'Bắt buộc' },
  { id: 8, name: 'Subject 8', prerequisite: 'Subject 6', type: 'Tự chọn' },
  { id: 9, name: 'Subject 9', prerequisite: 'Subject 7', type: 'Bắt buộc' },
  { id: 10, name: 'Subject 10', prerequisite: 'Subject 8', type: 'Tự chọn' },
  { id: 11, name: 'Subject 11', prerequisite: 'Subject 9', type: 'Bắt buộc' },
  { id: 12, name: 'Subject 12', prerequisite: 'Subject 10', type: 'Tự chọn' },
  { id: 13, name: 'Subject 13', prerequisite: 'Subject 11', type: 'Bắt buộc' },
  { id: 14, name: 'Subject 14', prerequisite: 'Subject 12', type: 'Tự chọn' },
  { id: 15, name: 'Subject 15', prerequisite: 'Subject 13', type: 'Bắt buộc' },
  { id: 16, name: 'Subject 16', prerequisite: 'Subject 14', type: 'Tự chọn' },
  { id: 17, name: 'Subject 17', prerequisite: 'Subject 15', type: 'Bắt buộc' },
];

export const fetchAllSubject = async () => {
  return { data: subjects };
};

export const deleteSubject = async (id) => {
  subjects = subjects.filter((subject) => subject.id !== parseInt(id));
  return { success: true };
};

export const createSubject = async (subject) => {
  const newSubject = { ...subject, id: subjects.length + 1 };
  subjects.push(newSubject);
  return { data: newSubject };
};

export const updateSubject = async (id, updatedSubject) => {
  const index = subjects.findIndex((subject) => subject.id === parseInt(id));
  if (index !== -1) {
    subjects[index] = { ...subjects[index], ...updatedSubject };
    return { data: subjects[index] };
  } else {
    throw new Error('Subject not found');
  }
};

