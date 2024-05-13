import React, { useState, useEffect } from 'react';
import './StudentTable.css'; // Import CSS file for styling

function StudentTable({ selectedClass, selectedSemester, selectedSubject }) {
  const [students, setStudents] = useState([]);
  const [editableCell, setEditableCell] = useState(null); // State to track editable cell

  useEffect(() => {
    // Function to generate random grades for a student
    const generateRandomGrades = () => {
      return {
        regularPoint1: Math.floor(Math.random() * 11), // Random between 0 and 10
        regularPoint2: Math.floor(Math.random() * 11),
        regularPoint3: Math.floor(Math.random() * 11),
        practicePoint1: Math.floor(Math.random() * 11),
        practicePoint2: Math.floor(Math.random() * 11),
        practicePoint3: Math.floor(Math.random() * 11),
        midterm: Math.floor(Math.random() * 11),
        endOfTerm: Math.floor(Math.random() * 11),
      };
    };

    // Array of legitimate names
    const legitimateNames = [
      "Nguyễn Văn A",
      "Trần Thị B",
      "Lê Văn C",
      "Phạm Thị D",
      "Hoàng Văn E",
      "Đặng Thị F",
      "Mai Văn G",
      "Vũ Thị H",
      "Đinh Văn I",
      "Lý Thị K",
      "Trịnh Văn L",
      "Ngô Thị M"
    ];

    // Generate random data for 12 students
    const randomStudents = [];
    for (let i = 0; i < 12; i++) {
      randomStudents.push({
        id: i + 1,
        name: legitimateNames[i], // Assign legitimate names here
        class: selectedClass,
        semester: selectedSemester,
        subject: selectedSubject,
        ...generateRandomGrades(),
      });
    }

    setStudents(randomStudents);
  }, [selectedClass, selectedSemester, selectedSubject]); // Rerun when selected values change

  // Function to calculate total score
  const calculateTotalScore = (student) => {
    return (student.regularPoint1 + student.regularPoint2 + student.regularPoint3 +
           student.practicePoint1 + student.practicePoint2 + student.practicePoint3 +
           student.midterm * 2 + student.endOfTerm * 3) / 11;
  };

  // Function to get GPA
  const calculateGPA = (totalScore) => {
    return (totalScore / 10) * 4;
  };

  // Function to get letter grade
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

  // Function to handle cell blur
  const handleCellBlur = () => {
    setEditableCell(null); // Clear editable cell when leaving the input
  };

  // Function to handle cell click
  const handleCellClick = (studentId, field) => {
    setEditableCell({ studentId, field });
  };

  // Function to handle change in grade
  const handleGradeChange = (studentId, field, value) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          [field]: parseInt(value) || 0, // Convert value to integer or default to 0 if not valid
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  // Function to handle save button click

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th rowSpan="2">STT</th>
            <th rowSpan="2">Mã số sinh viên</th>
            <th rowSpan="2">Họ và tên</th>
            <th colSpan="3">Thường kì</th>
            <th colSpan="3">Thực hành</th>
            <th rowSpan="2">Giữa kì</th>
            <th rowSpan="2">Cuối kì</th>
            <th rowSpan="2">Tổng điểm</th>
            <th rowSpan="2">Thang điểm 4</th>
            <th rowSpan="2">Điểm chữ</th>
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
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="STT">{index + 1}</td>
              <td className="MSSV">{student.id}</td>
              <td className="TenSV">{student.name}</td>
              <EditableCell
                value={student.regularPoint1}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'regularPoint1'}
                onClick={() => handleCellClick(student.id, 'regularPoint1')}
                onChange={(e) => handleGradeChange(student.id, 'regularPoint1', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.regularPoint2}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'regularPoint2'}
                onClick={() => handleCellClick(student.id, 'regularPoint2')}
                onChange={(e) => handleGradeChange(student.id, 'regularPoint2', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.regularPoint3}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'regularPoint3'}
                onClick={() => handleCellClick(student.id, 'regularPoint3')}
                onChange={(e) => handleGradeChange(student.id, 'regularPoint3', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.practicePoint1}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'practicePoint1'}
                onClick={() => handleCellClick(student.id, 'practicePoint1')}
                onChange={(e) => handleGradeChange(student.id, 'practicePoint1', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.practicePoint2}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'practicePoint2'}
                onClick={() => handleCellClick(student.id, 'practicePoint2')}
                onChange={(e) => handleGradeChange(student.id, 'practicePoint2', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.practicePoint3}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'practicePoint3'}
                onClick={() => handleCellClick(student.id, 'practicePoint3')}
                onChange={(e) => handleGradeChange(student.id, 'practicePoint3', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.midterm}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'midterm'}
                onClick={() => handleCellClick(student.id, 'midterm')}
                onChange={(e) => handleGradeChange(student.id, 'midterm', e.target.value)}
                onBlur={handleCellBlur}
              />
              <EditableCell
                value={student.endOfTerm}
                isEditable={editableCell && editableCell.studentId === student.id && editableCell.field === 'endOfTerm'}
                onClick={() => handleCellClick(student.id, 'endOfTerm')}
                onChange={(e) => handleGradeChange(student.id, 'endOfTerm', e.target.value)}
                onBlur={handleCellBlur}
              />
              <td>{calculateTotalScore(student).toFixed(2)}</td>
              <td>{calculateGPA(calculateTotalScore(student)).toFixed(2)}</td>
              <td>{getLetterGrade(calculateGPA(calculateTotalScore(student)))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// EditableCell component
function EditableCell({ value, isEditable, onClick, onChange, onBlur }) {
  const handleBlur = () => {
    onBlur(); // Trigger onBlur event when leaving the input
  };

  if (isEditable) {
    return <td><input type="number" value={value} onChange={onChange} onBlur={handleBlur} autoFocus /></td>;
  } else {
    return <td onClick={onClick}>{value}</td>;
  }
}

export default StudentTable;
