import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import moment from "moment";
import { format } from "date-fns";

const WeeklySchedulePage = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(moment()); // Sử dụng moment() để lấy thời gian hiện tại

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment()); // Cập nhật thời gian mỗi giây
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const daysOfWeek = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];

  // Hàm để tạo mảng chứa thứ trong tuần từ thứ hai đến chủ nhật
  const generateWeekDays = () => {
    const result = [];
    for (let i = 1; i <= 7; i++) {
      const day = moment(currentDate).day(i);
      result.push(day);
    }
    return result;
  };

  const renderTableHeader = () => {
    const weekDays = generateWeekDays();
    return weekDays.map((day, index) => (
      <th key={index}>{`${daysOfWeek[index]} ${day.format("DD/MM/YYYY")}`}</th>
    ));
  };
  const handleWeekChange = (action) => {
    let newDate;
    if (action === "next") {
      newDate = moment(currentDate).add(7, "days");
    } else if (action === "previous") {
      newDate = moment(currentDate).subtract(7, "days");
    } else if (action === "current") {
      newDate = moment();
    }
    setCurrentDate(newDate);
  };

  const formattedDate = format(currentWeek, "dd/MM/yyyy");

  const formChiTietLichHoc = [{}];
  // Dummy data for table
  const [tableData, setTableData] = useState([
    {
      shift: "Ca sáng",
      Monday: "Lập trình Lập trình Lập trình Lập trình Lập trình",
      Tuesday: "English",
      Wednesday: "Science",
      Thursday: "History",
      Friday: "Art",
      Saturday: "Quẩy",
      Sunday: "Quẩy",
    },
    {
      shift: "Ca chiều",
      Monday: "Hack game Lập trình Lập trình Lập trình Lập trình",
      Tuesday: "Music",
      Wednesday: "PE",
      Thursday: "Math",
      Friday: "English",
      Saturday: "Quẩy",
      Sunday: "Quẩy",
    },
    {
      shift: "Ca tối",
      Monday: "Đập đá Lập trình Lập trình Lập trình",
      Tuesday: "ngủ",
      Wednesday: "Biology",
      Thursday: "Physics",
      Friday: "Chemistry",
      Saturday: "Quẩy",
      Sunday: "",
    },
  ]);

  const handleInputChange = (index, dayOfWeek, value) => {
    const newData = [...tableData];
    newData[index][dayOfWeek] = value;
    setTableData(newData);
  };
  const renderTableRows = () => {
    return tableData.map((row, index) => (
      <tr key={index}>
        <td className="lesson-time">{row.shift}</td>
        <td>
          <span>{row.Monday}</span>
        </td>
        <td>
          <span>{row.Tuesday}</span>
        </td>
        <td>
          <span>{row.Wednesday}</span>
        </td>
        <td>
          <span>{row.Thursday}</span>
        </td>
        <td>
          <span>{row.Friday}</span>
        </td>
        <td>
          <span>{row.Saturday}</span>
        </td>
        <td>
          <span>{row.Sunday}</span>
        </td>
      </tr>
    ));
  };

  const menuData = [
    {
      name: "Trang chủ",
    },
    {
      name: "Thông tin chung",
      subMenus: [
        "Thông tin sinh viên",
        "ghi chú nhắc nhở ",
        "Đề cập xuật cập nhật thông tin",
        "Đề xuất cập nhật thông tin ngân hàng",
      ],
    },
    {
      name: "Đăng ký học phần",
      subMenus: ["Chương trình khung", "Đăng ký học phần"],
    },
    {
      name: "Học phí",
      subMenus: ["Tra cứu công nợ", "Thanh toán", "Phiếu thu tổng"],
    },
  ];

  // Chức năng xử lý lựa chọn menu
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Your logic to show/hide sub-menus
  };
  const handleSubMenuClick = (subMenu) => {
    // Handle sub-menu click here
    console.log("Clicked on sub-menu:", subMenu);
  };

  // Function to handle radio button selection
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // // Function to generate table rows
  // const renderTableRows = () => {
  //   return tableData.map((row, index) => (
  //     <tr   key={index}>
  //       <td className="lesson-time" >{row.shift}</td>
  //       <td>{row.Monday}</td>
  //       <td>{row.Tuesday}</td>
  //       <td>{row.Wednesday}</td>
  //       <td>{row.Thursday}</td>
  //       <td>{row.Friday}</td>
  //       <td>{row.Saturday}</td>
  //       <td>{row.Sunday}</td>
  //     </tr>
  //   ));
  // };

  return (
    <div>
      {currentUser && (
        <div className="App">
          <header>{/* Your header content */}</header>
          <div className="body">
            <div className="menu">
              <ul>
                {menuData.map((menu, index) => (
                  <li key={index} onClick={() => handleMenuClick(menu.name)}>
                    {menu.name}
                    {selectedMenu === menu.name && (
                      <ul className="submenu">
                        {menu.subMenus.map((subMenu, subIndex) => (
                          <li
                            key={subIndex}
                            onClick={() => handleSubMenuClick(subMenu)}
                          >
                            {subMenu}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="right-panel">
              <form className="formLichHoc">
                <div className="header">
                  <div id="weeklyclassSchedulAndExamSchedule">
                    <strong>Lịch học, lịch thi theo tuần</strong>
                  </div>
                  <div className="week-selector">
                    <div className="options">
                      <label>
                        <input
                          type="radio"
                          name="options"
                          value="option1"
                          onChange={() => handleOptionChange("option1")}
                          checked={selectedOption === "option1"}
                        />
                        Tất cả
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="options"
                          value="option2"
                          onChange={() => handleOptionChange("option2")}
                          checked={selectedOption === "option2"}
                        />
                        Lịch học
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="options"
                          value="option3"
                          onChange={() => handleOptionChange("option3")}
                          checked={selectedOption === "option3"}
                        />
                        Lịch thi
                      </label>
                    </div>

                    {/* Time display */}
                    <div className="time-display">
                      <span>{formattedDate}</span>
                    </div>
                    {/* Control buttons */}
                    <span id="button" className="control-buttons">
                      <button onClick={() => handleWeekChange("current")}>
                        Hiện tại
                      </button>
                      <button onClick={() => handleWeekChange("current")}>
                        Trở về{" "}
                      </button>
                      <button onClick={() => handleWeekChange("next")}>
                        Tiếp
                      </button>
                    </span>
                  </div>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr id="tableHeader">
                        <th>Ca học</th>
                        {renderTableHeader()}
                        {/* <th>Thứ Hai {currentWeek.toLocaleDateString()}</th>
                  <th>Thứ Ba {currentWeek.toLocaleDateString()}</th>
                  <th>Thứ Tư {currentWeek.toLocaleDateString()}</th>
                  <th>Thứ Năm {currentWeek.toLocaleDateString()}</th>
                  <th>Thứ Sáu {currentWeek.toLocaleDateString()}</th>
                  <th>Thứ Bảy {currentWeek.toLocaleDateString()}</th>
                  <th>Chủ Nhật {currentWeek.toLocaleDateString()}</th> */}
                      </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedulePage;
