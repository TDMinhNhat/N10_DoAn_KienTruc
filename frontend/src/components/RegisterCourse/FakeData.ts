export const Year = [
  "2022-2023",
  "2023-2024",
  "2024-2025"
];

export const HK = [
  'HK1',
  "HK2",
  "HK3"
];

export const options = [
  "hoc moi",
  // "hoc cai thien"
];

export type Course = {
  id: number; // ID học phần
  code: string; // Mã học phần
  name: string; // Tên học phần
  year: string; // Năm học
  HK: string; // Học kỳ
  options: string; // Học mới hoặc học cải thiện
  credits: number; // Số tín chỉ
};

// chi tiết học phần
export const courses = [
  {
      id: 1,
      code: "INT1001",
      name: "Introduction to IT",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc moi",
      credits: 3
  },
  {
      id: 2,
      code: "INT1002",
      name: "Introduction to Programming",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc moi",
      credits: 3
  },
  {
      id: 3,
      code: "INT1003",
      name: "Introduction to Web",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc moi",
      credits: 3
  },
  {
      id: 4,
      code: "INT1004",
      name: "Introduction to Database",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc moi",
      credits: 3
  },
  {
      id: 5,
      code: "INT1005",
      name: "Introduction to Network",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc moi",
      credits: 3
  },
  {
      id: 6,
      code: "INT1006",
      name: "Introduction to Security",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc cai thien",
      credits: 3
  },
  {
      id: 7,
      code: "INT1007",
      name: "Introduction to Software Engineering",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc cai thien",
      credits: 3
  },
  {
      id: 8,
      code: "INT1008",
      name: "Introduction to Data Science",
      year: "2019-2020",
      HK: "HK1",
      options: "hoc cai thien",
      credits: 3
  },
  {
    id: 8,
    code: "INT1008",
    name: "Introduction to Data Science",
    year: "2023-2024",
    HK: "HK1",
    options: "hoc cai thien",
    credits: 3
}
];
// chi tiết học phần đã đăng ký
export type RegisterCourse = {
  id: number; // ID học phần
  code: string; // Mã học phần
  name: string; // Tên học phần
  className: string; // Tên lớp học phần
  student: number; // Số sinh viên đã đăng ký
  maxStudent: number; // Số sinh viên tối đa
  status: "open" | "close" | "full"; // Trạng thái mở, đóng, đầy
  teacher: string; // Giáo viên
  time: string; // Thời gian học
  date: string; // Ngày học
  room: string; // Phòng học
  type: string; // Hình thức học
};

// chi tiết học phần đã đăng ký
export const registerCourses: RegisterCourse[] = [
  {
    id: 1,
    code: "INT1001",
    name: "Introduction to IT",
    className: "INT1001-01",
    student: 10,
    maxStudent: 20,
    status: "open",
    teacher: "Nguyễn Văn A",
    type: "TH",
    time: "Thứ 4 (Tiết 1 -> 3)",
    date: "01/01/2020 - 01/06/2020",
    room: "A101"
},
{
    id: 4,
    code: "INT1001",
    name: "Introduction to IT",
    className: "INT1001-02",
    student: 20,
    maxStudent: 100,
    status: "open",
    teacher: "Nguyễn Văn Hien",
    type: "TH",
    time: "Thứ 2 (Tiết 1 -> 3)",
    date: "01/01/2020 - 01/06/2020",
    room: "A102"
},
{
    id: 2,
    code: "INT1002",
    name: "Introduction to Programming",
    className: "INT1002-01",
    student: 15,
    maxStudent: 20,
    status: "open",
    teacher: "Nguyễn Văn B",
    type: "LT",
    time: "Thứ 4 (Tiết 4 -> 6)",
    date: "01/06/2020 - 01/12/2020",
    room: "A102"
},
{
    id: 3,
    code: "INT1003",
    name: "Introduction to Web",
    className: "INT1003-01",
    student: 20,
    maxStudent: 20,
    status: "full",
    teacher: "Nguyễn Văn C",
    type: "TH",
    time: "Thứ 4 (Tiết 7 -> 9)",
    date: "01/12/2020 - 01/06/2021",
    room: "A103"
}
];

// lớp học phần đã đăng ký
export type RegisterClass = {
  id: number; // ID lớp học phần
  code: string; // Mã lớp học phần
  name: string; // Tên học phần
  className: string; // Tên lớp học phần
  credits: number; // Số tín chỉ
  group: number; // Nhóm thực hành
  status: string; // Trạng thái đăng ký
  date: string; // Ngày đăng ký
  registerStatus: "open" | "close" | "full"; // TT lớp HP
  HK: string; // Học kỳ
  Year: string; // Năm học
};

// lớp học phần đã đăng ký
export const registerClasses: RegisterClass[] = [
  {
    id: 1,
    code: "INT1001-01",
    name: "Introduction to IT",
    className: "INT1001-01",
    credits: 3,
    group: 1,
    status: "Đã đăng ký",
    date: "01/01/2020",
    registerStatus: "open",
    HK: "HK1",
    Year: "2019-2020"
},
{
    id: 2,
    code: "INT1002-01",
    name: "Introduction to Programming",
    className: "INT1002-01",
    credits: 3,
    group: 1,
    status: "Đã đăng ký",
    date: "01/01/2020",
    registerStatus: "open",
    HK: "HK1",
    Year: "2019-2020"
},
{
    id: 3,
    code: "INT1003-01",
    name: "Introduction to Web",
    className: "INT1003-01",
    credits: 3,
    group: 1,
    status: "Đã đăng ký",
    date: "01/01/2020",
    registerStatus: "open",
    HK: "HK1",
    Year: "2019-2020"
},
{
    id: 4,
    code: "INT1004-01",
    name: "Introduction to Database",
    className: "INT1004-01",
    credits: 3,
    group: 1,
    status: "Đã đăng ký",
    date: "01/01/2020",
    registerStatus: "open",
    HK: "HK2",
    Year: "2019-2020"
}
];