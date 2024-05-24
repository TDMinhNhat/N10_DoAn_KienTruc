import React, { useState } from 'react';
import { Form, Row, Col, Table, Button, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import './ClassListPage.css'; // Import CSS file

const ClassListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // State for view grade modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);

  // Dữ liệu giả cho học kỳ và lớp học
  const semesters = ["Học kì 1", "Học kì 2", "Học kì hè"];
  const classes = ["DHKTPM17A", "DHKTPM17B", "DHKTPM17C"];

  const handleOpenModal = (student) => {
    setShowModal(true);
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenViewModal = (student) => {
    setShowViewModal(true);
    setSelectedStudent(student);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  const handleSaveGrades = () => {
    // Save grades logic
    handleCloseModal();
  };

  const handleClassChange = (classSelected) => {
    setSelectedClass(classSelected);
    // Dummy data for students in selected class
    const studentsData = [];
    for (let i = 1; i <= 4; i++) {
      studentsData.push({
        id: i,
        mssv: `00${i}`,
        name: `Student ${i}`,
        class: classSelected,
        gender: i % 2 === 0 ? "Nam" : "Nữ", // Alternating between "Nam" and "Nữ" bắt buộc chỉnh sửa một chút về sex
        regularPoint1: 10, // Điểm thường kì 1
        regularPoint2: 10, // Điểm thường kì 2
        regularPoint3: 10, // Điểm thường kì 3
        practicePoint1: 10, // Điểm thực hành 1
        practicePoint2: 10, // Điểm thực hành 2
        practicePoint3: 10, // Điểm thực hành 3
        midterm: 10, // Điểm giữa kì
        endOfTerm: 10, // Điểm cuối kì
      });
    }
    setStudents(studentsData);
  };

  // Function to calculate total score for a student
  const calculateTotalScore = (student) => {
    return (
      (student.regularPoint1 +
        student.regularPoint2 +
        student.regularPoint3 +
        student.practicePoint1 +
        student.practicePoint2 +
        student.practicePoint3 +
        student.midterm * 2 +
        student.endOfTerm * 3) /
      11
    );
  };

  // Function to calculate GPA based on total score
  const calculateGPA = (totalScore) => {
    return (totalScore / 10) * 4;
  };

  // Function to get letter grade based on GPA
  const getLetterGrade = (gpa) => {
    if (gpa >= 3.5) return 'A+';
    else if (gpa >= 3) return 'A';
    else if (gpa >= 2.5) return 'B+';
    else if (gpa >= 2) return 'B';
    else if (gpa >= 1.75) return 'C+';
    else if (gpa >= 1.5) return 'C';
    else if (gpa >= 1.25) return 'D+';
    else if (gpa >= 1) return 'D';
    else return 'F';
  };

  // Chức năng xử lý thay đổi điểm của học sinh theo phương thức
  const handleGradeChange = (event, fieldName) => {
    const { value } = event.target;
    setSelectedStudent(prevStudent => ({
      ...prevStudent,
      [fieldName]: parseFloat(value) || 0, // Chuyển đổi giá trị đầu vào thành float hoặc mặc định thành 
    }));
  };

  return (
    <div className="container" style={{ marginTop: 80, zIndex: 20 }}>
    <div className="card bg-light text-black p-4">
    <div style={{ margin: '0 200px' }}>
      <Form>
        <Row className="mb-3 align-items-center form-row">
          <Col xs={3}>
            <Form.Label>Danh sách học kì:</Form.Label>
          </Col>
          <Col xs={3}>
            {/* ComboBox học kỳ */}
            <DropdownButton
              id="dropdown-semesters"
              title={selectedSemester ? selectedSemester : "Chọn kỳ"}
            >
              {semesters.map((semester, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setSelectedSemester(semester)}
                >
                  {semester}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col xs={3}>
            <Form.Label>Danh sách lớp:</Form.Label>
          </Col>
          <Col xs={3}>
            {/* Class ComboBox */}
            <DropdownButton
              id="dropdown-classes"
              title={selectedClass ? selectedClass : "Chọn lớp"}
              onSelect={handleClassChange}
            >
              {classes.map((classItem, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={classItem}
                >
                  {classItem}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">MSSV</th>
            <th className="text-center">Họ tên</th>
            <th className="text-center">Lớp danh nghĩa</th>
            <th className="text-center">Giới tính</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="text-center">{student.mssv}</td>
              <td>{student.name}</td>
              <td className="text-center">{student.class}</td>
              <td className="text-center">{student.gender}</td>
              <td className="text-center action-column">
                <div className="button-container">
                  <Button variant="primary" onClick={() => handleOpenModal(student)}>
                    Nhập điểm
                  </Button>
                  <Button variant="info" onClick={() => handleOpenViewModal(student)}>
                    Xem điểm
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal className="model-point" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập điểm cho sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="student-table" striped bordered hover>
            <thead>
              <tr>
                <th colSpan="3">Thường kì</th>
                <th colSpan="3">Thực hành</th>
                <th>Giữa kì</th>
                <th>Cuối kì</th>
                <th>Tổng điểm</th>
                <th>Thang điểm 4</th>
                <th>Điểm chữ</th>
              </tr>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.regularPoint1 : 0}
                    onChange={(event) => handleGradeChange(event, 'regularPoint1')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.regularPoint2 : 0}
                    onChange={(event) => handleGradeChange(event, 'regularPoint2')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.regularPoint3 : 0}
                    onChange={(event) => handleGradeChange(event, 'regularPoint3')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.practicePoint1 : 0}
                    onChange={(event) => handleGradeChange(event, 'practicePoint1')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.practicePoint2 : 0}
                    onChange={(event) => handleGradeChange(event, 'practicePoint2')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.practicePoint3 : 0}
                    onChange={(event) => handleGradeChange(event, 'practicePoint3')}
                    minLength={2}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.midterm : 0}
                    onChange={(event) => handleGradeChange(event, 'midterm')}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={selectedStudent ? selectedStudent.endOfTerm : 0}
                    onChange={(event) => handleGradeChange(event, 'endOfTerm')}
                  />
                </td>
                <td>
                  {/* Tổng điểm */}
                  <span>
                    {selectedStudent ? calculateTotalScore(selectedStudent).toFixed(2) : 0}
                  </span>
                </td>
                <td>
                  {/* Thang điểm 4 */}
                  <span>
                    {selectedStudent ? calculateGPA(calculateTotalScore(selectedStudent)).toFixed(2) : 0}
                  </span>
                </td>
                <td>
                  {/* Điểm chữ */}
                  <span>
                    {selectedStudent ? getLetterGrade(calculateGPA(calculateTotalScore(selectedStudent))) : ''}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Huỷ bỏ
          </Button>
          <Button variant="primary" onClick={handleSaveGrades}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for viewing grades */}
      <Modal className="model-point" show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xem điểm của sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="student-table" striped bordered hover>
            <thead>
              <tr>
                <th>Thường kì</th>
                <th>Thực hành</th>
                <th>Giữa kì</th>
                <th>Cuối kì</th>
                <th>Tổng điểm</th>
                <th>Thang điểm 4</th>
                <th>Điểm chữ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedStudent ? selectedStudent.regularPoint1 : 0}</td>
                <td>{selectedStudent ? selectedStudent.regularPoint2 : 0}</td>
                <td>{selectedStudent ? selectedStudent.regularPoint3 : 0}</td>
                <td>{selectedStudent ? selectedStudent.practicePoint1 : 0}</td>
                <td>{selectedStudent ? selectedStudent.practicePoint2 : 0}</td>
                <td>{selectedStudent ? selectedStudent.practicePoint3 : 0}</td>
                <td>{selectedStudent ? selectedStudent.midterm : 0}</td>
                <td>{selectedStudent ? selectedStudent.endOfTerm : 0}</td>
                <td>{selectedStudent ? calculateTotalScore(selectedStudent).toFixed(2) : 0}</td>
                <td>{selectedStudent ? calculateGPA(calculateTotalScore(selectedStudent)).toFixed(2) : 0}</td>
                <td>{selectedStudent ? getLetterGrade(calculateGPA(calculateTotalScore(selectedStudent))) : ''}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
    </div>
    </div>
  );
};

export default ClassListPage;
