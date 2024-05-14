import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import StudentTable from "./StudentTable";

const StudyResultsPage = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [selectedClass, setSelectedClass] = useState("DHKTPM17A");
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [selectedSubject, setSelectedSubject] = useState(
    "Object Oriented Programming"
  );

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSaveClick = () => {
    // Logic to save data here
    alert("Data saved successfully!");
  };

  return (
    <div>
      {currentUser && (
        <div className="App">
          <div className="select-container">
            <select
              className="custom-select"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <option value="Semester 1">Học kì 1</option>
              <option value="Semester 2">học ki 2</option>
              <option value="Summer">Học kì hè</option>
            </select>
            <select
              className="custom-select"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="DHKTPM17A">DHKTPM17A</option>
              <option value="DHKTPM17B">DHKTPM17B</option>
              <option value="DHKTPM17C">DHKTPM17C</option>
              <option value="DHKTPM17D">DHKTPM17D</option>
            </select>
            <select
              className="custom-select"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="Object Oriented Programming">
                Lập trình hướng đối tượng
              </option>
              <option value="Programming Skills">Kỹ thuật lập trình</option>
              <option value="Web Programming">Lập trình WWWW</option>
            </select>
          </div>
          <StudentTable
            selectedClass={selectedClass}
            selectedSemester={selectedSemester}
            selectedSubject={selectedSubject}
          />
          <button className="save-button" onClick={handleSaveClick}>
            Lưu
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyResultsPage;
