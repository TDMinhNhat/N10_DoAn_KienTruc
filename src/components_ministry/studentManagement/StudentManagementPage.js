import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableStudent from './TableStudent';
const StudentManagementPage = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
    console.log('check cu', currentUser);
  }, [currentUser, navigate]);

  return (
    <div>
      {currentUser && (
        <div className="container" style={{ marginTop: 80,zIndex:20  }}>
          <div className="card bg-light text-black p-4">
            <h3 className="">Quản lý sinh viên</h3>
            <hr></hr>
            <TableStudent></TableStudent>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagementPage;
