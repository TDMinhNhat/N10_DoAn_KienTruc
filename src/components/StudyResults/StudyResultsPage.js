// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './StudyResultsPage.css'; // Import the CSS file

// const studyResults = [
//   {
//     classCode: "420300060501",
//     subjectName: "Lập trình căn bản",
//     credit: 3,
//     creditTH: 1,
//     midterm: 7,
//     lt1: 7, lt2: 6, lt3: 8,
//     practice1: 8, practice2: 9, practice3: 7,
//     finalExam: 8,
//     finalGrade: 7.5,
//     scale4: 3,
//     letterGrade: "B",
//     classification: "Khá",
//     passed: true
//   },
//   {
//     classCode: "420300060502",
//     subjectName: "Lập trình nâng cao",
//     credit: 3,
//     midterm: 8,
//     lt1: 8, lt2: 7, lt3: 9,
//     finalExam: 9,
//     finalGrade: 8.5,
//     scale4: 3.5,
//     letterGrade: "B+",
//     classification: "Giỏi",
//     passed: true
//   },
//   {
//     classCode: "420300060503",
//     subjectName: "Lập trình Java",
//     credit: 3,
//     creditTH: 1,
//     midterm: 8,
//     lt1: 8, lt2: 7, lt3: 9,
//     practice1: 9, practice2: 8, practice3: 8,
//     finalExam: 9,
//     finalGrade: 8.5,
//     scale4: 3.5,
//     letterGrade: "B+",
//     classification: "Giỏi",
//     passed: true
//   },
// ];

// const StudyResultsPage = ({ currentUser }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/");
//     }
//   }, [currentUser, navigate]);


//   return (
//     <div>
//       {currentUser && (
//         <div className="table-responsive container ">
//           <table className="table table-bordered table-sm">
//             <thead>
//               <tr className="text-center bg-primary">
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small"><div>STT</div></th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small"><div>Mã lớp học phần</div></th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray w-25 small"><div>Tên môn học/học phần</div></th>
//                 <th rowSpan="2" colSpan="2" className="text-center text-primary text-gradient color-gray small">Số tín chỉ</th>
//                 <th colSpan="1" rowSpan="3" className="text-center text-primary text-gradient color-gray small">Giữa kỳ</th>
//                 <th colSpan="3" className="text-center text-primary text-gradient color-gray small">Thường xuyên</th>
//                 <th colSpan="3" className="text-center text-primary text-gradient color-gray small">Thực hành</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Cuối kỳ</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Điểm tổng kết</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Thang điểm 4</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Điểm chữ</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Xếp loại</th>
//                 <th rowSpan="3" className="text-center text-primary text-gradient color-gray small">Đạt</th>
//               </tr>
//               <tr>
//                 <th colSpan="3" className="text-center text-primary text-gradient color-gray small">LT Hệ số 1</th>
//                 <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">1</th>
//                 <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">2</th>
//                 <th rowSpan="2" className="text-center text-primary text-gradient color-gray small">3</th>
//               </tr>
//               <tr>
//                 <th className="text-center text-primary text-gradient color-gray small">Tổng</th>
//                 <th className="text-center text-primary text-gradient color-gray small">Thực hành</th>
//                 <th className="text-center text-primary text-gradient color-gray small">1</th>
//                 <th className="text-center text-primary text-gradient color-gray small">2</th>
//                 <th className="text-center text-primary text-gradient color-gray small">3</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="18" className="text-start text-danger text-gradient small bg-light">HK1 (2020-2021)</td>
//               </tr>
//               {studyResults.map((result, index) => (
//                 <tr key={result.classCode} className="text-center">
//                   <td className="small">{index + 1}</td>
//                   <td className="small">{result.classCode}</td>
//                   <td className="small">{result.subjectName}</td>
//                   <td className="small">{result.credit}</td>
//                   <td className="small">{result.creditTH}</td>
//                   <td className="small">{result.midterm}</td>
//                   <td className="small">{result.lt1}</td>
//                   <td className="small">{result.lt2}</td>
//                   <td className="small">{result.lt3}</td>
//                   <td className="small">{result.practice1}</td>
//                   <td className="small">{result.practice2}</td>
//                   <td className="small">{result.practice3}</td>
//                   <td className="small">{result.finalExam}</td>
//                   <td className="small">{result.finalGrade}</td>
//                   <td className="small">{result.scale4}</td>
//                   <td className="small">{result.letterGrade}</td>
//                   <td className="small">{result.classification}</td>
//                   <td className="small">{result.passed ? 'Đạt' : 'Không đạt'}</td>
//                 </tr>

//               ))}

//               <tr>
//                 <td colSpan="3" className="text-start small">Điểm trung bình học kỳ hệ 10: 7,50</td>
//                 <td colSpan="5" className="text-start small">Điểm trung bình học kỳ hệ 4: 3,18	</td>
//                 <td colSpan="10" className="text-start small"></td>
//               </tr>
//               <tr>
//                 <td colSpan="3" className="text-start small">Điểm trung bình tích lũy: 7,50</td>
//                 <td colSpan="5" className="text-start small">Điểm trung bình tích lũy (hệ 4): 3,18</td>
//                 <td colSpan="10" className="text-start small"></td>
//               </tr>
//               <tr>
//                 <td colSpan="3" className="text-start small">Tổng số tín chỉ đã đăng ký: 11</td>
//                 <td colSpan="5" className="text-start small">Tổng số tín chỉ tích lũy: 11</td>
//                 <td colSpan="10" className="text-start small"></td>
//               </tr>
//               <tr>
//                 <td colSpan="3" className="text-start small">Tổng số tín chỉ đạt: 11</td>
//                 <td colSpan="5" className="text-start small">Tổng số tín chỉ nợ tính đến hiện tại: 0</td>
//                 <td colSpan="10" className="text-start small"></td>
//               </tr>
//               <tr>
//                 <td colSpan="3" className="text-start small">Xếp loại học lực tích lũy: Khá</td>
//                 <td colSpan="5" className="text-start small">Xếp loại học lực học kỳ: Khá</td>
//                 <td colSpan="10" className="text-start small"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudyResultsPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './StudyResultsPage.css'; // Import the CSS file
import { studyResults, Term } from "./FakeData"


const StudyResultsPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("HK1 (2020-2021)");
  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setFilteredResults(studyResults.filter(result => result.Term === selectedTerm));
    }
  }, [currentUser, navigate, selectedTerm]);

  return (
    <div>
      {currentUser && (
        <div className="container bg-light mt-4 card">
          <h2 className="mt-2">Kết quả học tập</h2>
          <hr />
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="termSelect" className="form-label me-3">Học kỳ</label>
            <select
              className="form-select me-2 w-25"
              id="termSelect"
              value={selectedTerm}
              onChange={handleTermChange}
            >
              {Term.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
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
                  <tr key={result.classCode} className="text-center">
                    <td className="small">{index + 1}</td>
                    <td className="small">{result.classCode}</td>
                    <td className="small">{result.subjectName}</td>
                    <td className="small">{result.credit}</td>
                    <td className="small">{result.creditTH}</td>
                    <td className="small">{result.midterm}</td>
                    <td className="small">{result.lt1}</td>
                    <td className="small">{result.lt2}</td>
                    <td className="small">{result.lt3}</td>
                    <td className="small">{result.practice1}</td>
                    <td className="small">{result.practice2}</td>
                    <td className="small">{result.practice3}</td>
                    <td className="small">{result.finalExam}</td>
                    <td className="small">{result.finalGrade}</td>
                    <td className="small">{result.scale4}</td>
                    <td className="small">{result.letterGrade}</td>
                    <td className="small">{result.classification}</td>
                    <td className="small">{result.passed ? 'Đạt' : 'Không đạt'}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="3" className="text-start small">Điểm trung bình học kỳ hệ 10: 7,50</td>
                  <td colSpan="5" className="text-start small">Điểm trung bình học kỳ hệ 4: 3,18</td>
                  <td colSpan="10" className="text-start small"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-start small">Điểm trung bình tích lũy: 7,50</td>
                  <td colSpan="5" className="text-start small">Điểm trung bình tích lũy (hệ 4): 3,18</td>
                  <td colSpan="10" className="text-start small"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-start small">Tổng số tín chỉ đã đăng ký: 11</td>
                  <td colSpan="5" className="text-start small">Tổng số tín chỉ tích lũy: 11</td>
                  <td colSpan="10" className="text-start small"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-start small">Tổng số tín chỉ đạt: 11</td>
                  <td colSpan="5" className="text-start small">Tổng số tín chỉ nợ tính đến hiện tại: 0</td>
                  <td colSpan="10" className="text-start small"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-start small">Xếp loại học lực tích lũy: Khá</td>
                  <td colSpan="5" className="text-start small">Xếp loại học lực học kỳ: Khá</td>
                  <td colSpan="10" className="text-start small"></td>
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


