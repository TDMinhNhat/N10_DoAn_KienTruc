// api/post/post.api.js
// students: id, name, description, gioi tinh, ngay sinh, chuyen nganh hoc, lop 
let students = [
  {
    id: 1,
    name: 'Student 1',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 2,
    name: 'Student 2',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 3,
    name: 'Student 3',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 4,
    name: 'Student 4',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 5,
    name: 'Student 5',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 6,
    name: 'Student 6',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 7,
    name: 'Student 7',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 8,
    name: 'Student 8',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 9,
    name: 'Student 9',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 10,
    name: 'Student 10',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  }
];

export const fetchAllStudent = async () => {
  return { data: students };
};

export const deleteStudent = async (id) => {
  students = students.filter((student) => student.id !== parseInt(id));
  return { success: true };
};

export const createStudent = async (student) => {
  const newStudent = { ...student, id: students.length + 1 };
  students.push(newStudent);
  return { data: newStudent };
};

export const updateStudent = async (id, updatedStudent) => {
  const index = students.findIndex((student) => student.id === parseInt(id));
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent };
    return { data: students[index] };
  } else {
    throw new Error('Student not found');
  }
};

