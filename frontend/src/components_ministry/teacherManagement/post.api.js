// api/post/post.api.js
// teachers: id, name, description, gioi tinh, ngay sinh, chuyen nganh hoc, lop 
let teachers = [
  {
    id: 1,
    name: 'Teacher 1',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 2,
    name: 'Teacher 2',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 3,
    name: 'Teacher 3',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 4,
    name: 'Teacher 4',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 5,
    name: 'Teacher 5',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 6,
    name: 'Teacher 6',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 7,
    name: 'Teacher 7',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 8,
    name: 'Teacher 8',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 9,
    name: 'Teacher 9',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  },
  {
    id: 10,
    name: 'Teacher 10',
    gender: 'Nam',
    birthday: '1999-07-13',
    major: 'CNTT',
    class: '18TCLC_DT1',
  }
];

export const fetchAllTeacher = async () => {
  return { data: teachers };
};

export const deleteTeacher = async (id) => {
  teachers = teachers.filter((teacher) => teacher.id !== parseInt(id));
  return { success: true };
};

export const createTeacher = async (teacher) => {
  const newTeacher = { ...teacher, id: teachers.length + 1 };
  teachers.push(newTeacher);
  return { data: newTeacher };
};

export const updateTeacher = async (id, updatedTeacher) => {
  const index = teachers.findIndex((teacher) => teacher.id === parseInt(id));
  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...updatedTeacher };
    return { data: teachers[index] };
  } else {
    throw new Error('Teacher not found');
  }
};

