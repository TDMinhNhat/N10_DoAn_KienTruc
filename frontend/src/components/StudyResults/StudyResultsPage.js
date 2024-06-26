import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './StudyResultsPage.css';
import StudentService from "../../services/student.service";

const StudyResultsPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [termAverages, setTermAverages] = useState({});

  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  const calculateAverages = (results) => {
    if (!results.length) return { average10: 0, average4: 0, grade: "" };

    const allResultsGraded = results.every(result => 
      result.average !== -1 && 
      result.averageFollow4 !== -1 && 
      result.scoreLetter !== "" && 
      result.ranks !== ""
    );

    if (!allResultsGraded) return { average10: "", average4: "", grade: "" };

    const totalCredits = results.reduce((sum, result) => sum + result.credits, 0);
    const totalPoints10 = results.reduce((sum, result) => sum + (result.average !== -1 ? result.average * result.credits : 0), 0);
    const totalPoints4 = results.reduce((sum, result) => sum + (result.averageFollow4 !== -1 ? result.averageFollow4 * result.credits : 0), 0);

    const average10 = totalPoints10 / totalCredits;
    const average4 = totalPoints4 / totalCredits;

    let grade = "";
    if (average4 >= 3.6) grade = "Xuất sắc";
    else if (average4 >= 3.2) grade = "Giỏi";
    else if (average4 >= 2.5) grade = "Khá";
    else if (average4 >= 2.0) grade = "Trung bình";
    else grade = "Yếu";

    return { average10: average10.toFixed(2), average4: average4.toFixed(2), grade };
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      const fetchStudyResults = async () => {
        try {
          const response = await StudentService.getAchieveStudy(currentUser.data.person.id);
          const studyData = response.data.data.data;
          
          const uniqueTerms = [...new Set(studyData.map(item => `${item.semesterYear} - HK${item.semester}`))];
          setTerms(uniqueTerms);
          setSelectedTerm(uniqueTerms[0]);
          
          const initialFilteredResults = studyData.filter(result => `${result.semesterYear} - HK${result.semester}` === uniqueTerms[0]);
          setFilteredResults(initialFilteredResults);

          const termAverages = uniqueTerms.reduce((acc, term) => {
            const termResults = studyData.filter(result => `${result.semesterYear} - HK${result.semester}` === term);
            acc[term] = calculateAverages(termResults);
            return acc;
          }, {});
          setTermAverages(termAverages);
        } catch (error) {
          console.error("Failed to fetch study results:", error);
        }
      };
      fetchStudyResults();
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (selectedTerm) {
      const fetchFilteredResults = async () => {
        try {
          const response = await StudentService.getAchieveStudy(currentUser.data.person.id);
          const studyData = response.data.data.data;
          const newFilteredResults = studyData.filter(result => `${result.semesterYear} - HK${result.semester}` === selectedTerm);
          setFilteredResults(newFilteredResults);
        } catch (error) {
          console.error("Failed to fetch study results:", error);
        }
      };
      fetchFilteredResults();
    }
  }, [selectedTerm, currentUser]);

  const { average10, average4, grade } = termAverages[selectedTerm] || { average10: 0, average4: 0, grade: "" };

  return (
    <div>
      {currentUser && (
        <div className="container bg-light card study-results-container" style={{ marginTop: 80, zIndex: 20 }}>
          <h2 className="mt-2">Kết quả học tập</h2>
          <hr />
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="termSelect" className="form-label me-3">Học kỳ</label>
            <select
              className="form-select me-2 w-25"
              id="termSelect"
              value={selectedTerm}
              onChange={handleTermChange}
              aria-label="Select Term"
            >
              {terms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <caption>Study Results for {selectedTerm}</caption>
              <thead>
                <tr className="text-center bg-primary">
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small"><div>STT</div></th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small"><div>Mã lớp học phần</div></th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray w-25 small"><div>Tên môn học/học phần</div></th>
                  <th rowSpan="2" colSpan="2" className="text-center text-primary text-gradient color-gray small">Số tín chỉ</th>
                  <th colSpan="1" rowSpan="3" className="text-center text-primary text-gradient color-gray small">Giữa kỳ</th>
                  <th colSpan="3" className="text-center text-primary text-gradient color-gray small">Thường xuyên</th>
                  <th colSpan="3" className="text-center text-primary text-gradient color-gray small">Thực hành</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Cuối kỳ</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Điểm tổng kết</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Thang điểm 4</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Điểm chữ</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Xếp loại</th>
                  <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Đạt</th>
                </tr>
                <tr>
                  <th colSpan="3" className="text-center text-primary text-gradient color-gray small">LT Hệ số 1</th>
                  <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">1</th>
                  <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">2</th>
                  <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">3</th>
                </tr>
                <tr>
                  <th className="text-center text-primary text-gradient color-gray small">Tổng</th>
                  <th className="text-center text-primary text-gradient color-gray small">Thực hành</th>
                  <th className="text-center text-primary text-gradient color-gray small">1</th>
                  <th className="text-center text-primary text-gradient color-gray small">2</th>
                  <th className="text-center text-primary text-gradient color-gray small">3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="18" className="text-start text-danger text-gradient small bg-light"> Học kỳ: {selectedTerm}</td>
                </tr>
                {filteredResults.map((result, index) => (
                  <tr key={`${result.courseClassID}-${index}`} className="text-center">
                    <td className="small">{index + 1}</td>
                    <td className="small">{result.courseClassID}</td>
                    <td className="small text-start ps-2">{result.courseName}</td>
                    <td className="small">{result.credits}</td>
                    <td className="small">{result.creditTH || '-'}</td>
                    <td className="small">{result.middleExam !== -1 ? result.middleExam : '-'}</td>
                    <td className="small">{result.rs1 !== -1 ? result.rs1 : '-'}</td>
                    <td className="small">{result.rs2 !== -1 ? result.rs2 : '-'}</td>
                    <td className="small">{result.rs3 !== -1 ? result.rs3 : '-'}</td>
                    <td className="small">{result.ps1 !== -1 ? result.ps1 : '-'}</td>
                    <td className="small">{result.ps2 !== -1 ? result.ps2 : '-'}</td>
                    <td className="small">{result.ps3 !== -1 ? result.ps3 : '-'}</td>
                    <td className="small">{result.finalExam !== -1 ? result.finalExam : '-'}</td>
                    <td className="small">{result.average !== -1 ? result.average : '-'}</td>
                    <td className="small">{result.averageFollow4 !== -1 ? result.averageFollow4 : '-'}</td>
                    <td className="small">{result.scoreLetter || '-'}</td>
                    <td className="small">{result.ranks || '-'}</td>
                    <td className="small"></td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="3" className="text-start small">Điểm trung bình học kỳ hệ 10: {average10}</td>
                  <td colSpan="5" className="text-start small">Điểm trung bình học kỳ hệ 4: {average4}</td>
                  <td colSpan="10" className="text-start small"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-start small">Xếp loại học lực học kỳ: {grade}</td>
                  <td colSpan="15" className="text-start small"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyResultsPage;
