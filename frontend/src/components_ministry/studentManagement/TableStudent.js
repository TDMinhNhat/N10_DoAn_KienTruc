import React, { useEffect, useState, useMemo, useRef } from 'react';
import ModalComponent from '../../modal/Modal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { IconButton } from '@mui/material';
import { fetchAllStudent, deleteStudent, createStudent, updateStudent } from './post.api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const TableStudent = () => {
  const nameInputRef = useRef(null);
  const genderInputRef = useRef(null);
  const birthdayInputRef = useRef(null);
  const majorInputRef = useRef(null);
  const classInputRef = useRef(null);

  const [errorField, setErrorField] = useState('');

  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState(null);

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsModalOpen(true);
  };

  const handleConfirmDeleteSingle = async () => {
    if (deleteId === null) {
      toast.error('No row selected to delete');
      return;
    }
    await deleteStudent(deleteId.toString());
    setData((prevData) => prevData.filter((row) => row.id !== deleteId));
    if (rowSelection[deleteId]) {
      const newRowSelection = Object.keys(rowSelection).reduce((obj, key) => {
        if (Number(key) !== deleteId) {
          obj[key] = rowSelection[key];
        }
        return obj;
      }, {});
      setRowSelection(newRowSelection);
    }
    setDeleteId(null);
    setIsModalOpen(false);
    toast.success('Delete successfully');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetchAllStudent();
    setData(response.data);
  };

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreateStudent = async (data) => {
    try {
      const response = await createStudent({ ...data });
      setData(prevData => [...prevData, response.data]);
      reset();
      toast.success('Create student successfully');
    } catch (error) {
      toast.error(error.message);
      if (error.field) {
        setErrorField(error.field);
        if (error.field === 'name' && nameInputRef.current) {
          nameInputRef.current?.focus();
        } else if (error.field === 'gender' && genderInputRef.current) {
          genderInputRef.current?.focus();
        } else if (error.field === 'birthday' && birthdayInputRef.current) {
          birthdayInputRef.current?.focus();
        }
        else if (error.field === 'major' && majorInputRef.current) {
          majorInputRef.current?.focus();
        }
        else if (error.field === 'class' && classInputRef.current) {
          classInputRef.current?.focus();
        }
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setValue('name', student.name);
    setValue('gender', student.gender);
    setValue('birthday', formatDateForInput(student.birthday)); // Format the date
    setValue('major', student.major);
    setValue('class', student.class);
  };

  const handleUpdateStudent = async (data) => {
    if (!editingStudent) return;
    try {
      const response = await updateStudent(editingStudent.id.toString(), { ...data });
      const updatedStudent = response.data;
      setData(prevData => prevData.map(row => row.id === editingStudent.id ? updatedStudent : row));
      setEditingStudent(null);
      reset();
      toast.success('Update student successfully');
    } catch (error) {
      toast.error(error.message);
      if (error.field) {
        setErrorField(error.field);
        if (error.field === 'name' && nameInputRef.current) {
          nameInputRef.current?.focus();
        } else if (error.field === 'gender' && genderInputRef.current) {
          genderInputRef.current?.focus();
        } else if (error.field === 'birthday' && birthdayInputRef.current) {
          birthdayInputRef.current?.focus();
        } else if (error.field === 'major' && majorInputRef.current) {
          majorInputRef.current?.focus();
        } else if (error.field === 'class' && classInputRef.current) {
          classInputRef.current?.focus();
        }
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    reset();
  };

  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(rowSelection).map(Number);
    if (selectedIds.length === 0) {
      toast.error('No rows selected');
      return;
    }
    setIsSecondModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const selectedIds = Object.keys(rowSelection).map(Number);
    await Promise.all(selectedIds.map(async (id) => await deleteStudent(id.toString())));
    setData((prevData) => prevData.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    toast.success('Delete selected successfully');
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}`;
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    return `${year}-${month}-${day}`;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'MSSV',
        // enableColumnActions: false, // ẩn cột actions
        // enableColumnDragging: false, // không cho kéo cột
        // enableColumnFilter: false, // không cho filter cột
        // enableColumnOrdering: false, // không cho order cột
        enableEditing: false, // không cho edit cột
        // enableGlobalFilter: false, // không cho filter global
        // enableGrouping: false, // không cho group cột
        // enableHiding: false, // không cho ẩn cột
        // enableResizing: false // không cho resize cột
      },
      {
        accessorKey: 'name',
        header: 'Họ Tên'
      },
      {
        accessorKey: 'gender',
        header: 'Giới Tính'
      },
      {
        accessorKey: 'birthday',
        header: 'Ngày Sinh'
      },
      {
        accessorKey: 'major',
        header: 'Chuyên Ngành Học'
      },
      {
        accessorKey: 'class',
        header: 'Lớp Danh Nghĩa'
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableColumnActions: false,
        enableColumnDragging: false,
        enableColumnFilter: false,
        enableColumnOrdering: false,
        enableEditing: false,
        enableGlobalFilter: false,
        enableGrouping: false,
        enableHiding: false,
        enableResizing: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <div>
            <IconButton color="warning" onClick={() => handleEditStudent(row.original)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.original.id, row.original.name)}>
              <DeleteIcon />
            </IconButton>
          </div>
        )
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    paginationDisplayMode: 'pages',
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 1 },
      sorting: [{ id: 'id', desc: true }], // sắp xếp theo id giảm dần (desc) mặc định khi load trang lần đầu tiên 
      // columnVisibility: { id: false } // ẩn cột id
    },
    positionToolbarAlertBanner: 'top',
    enableFilterMatchHighlighting: false,
    getRowId: (row) => row.id.toString(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    muiSearchTextFieldProps: {
      label: 'Search All Fields'
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex space-x-4 -ml-0.5">
        <IconButton onClick={handleDeleteSelected}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
    autoResetPageIndex: false
  });

  return (
    <>
      <form onSubmit={handleSubmit(editingStudent ? handleUpdateStudent : handleCreateStudent)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">Họ Tên</label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 50, message: 'Name must be less than 50 characters' }
              })}
              placeholder="Enter student name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="gender">Giới Tính</label>
            <select
              id="gender"
              {...register('gender', {
                required: 'Gender is required',
              })}
              className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nu">Nữ</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="birthday">Ngày Sinh</label>
            <input
              type="date"
              id="birthday"
              {...register('birthday', {
                required: 'Birthday is required',
              })}
              className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.birthday && <div className="invalid-feedback">{errors.birthday.message}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="major">Chuyên Ngành Học</label>
            <input
              id="major"
              {...register('major', {
                required: 'Major is required',
              })}
              placeholder="Enter student major"
              className={`form-control ${errors.major ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.major && <div className="invalid-feedback">{errors.major.message}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="class">Lớp Danh Nghĩa</label>
            <input
              id="class"
              {...register('class', {
                required: 'Class is required',
              })}
              placeholder="Enter student class"
              className={`form-control ${errors.class ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.class && <div className="invalid-feedback">{errors.class.message}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">{editingStudent ? 'Update' : 'Create'}</button>
          {editingStudent && <button type="button" className="btn btn-danger ms-2" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>
      <hr className="my-4" />
      <MaterialReactTable table={table}/>
      <ModalComponent
        isOpen={isModalOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete student ${deleteName}?`}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onOk={handleConfirmDeleteSingle}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <ModalComponent
        isOpen={isSecondModalOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete ${Object.keys(rowSelection).length} selected students?`}
        onClose={() => {
          setIsSecondModalOpen(false);
        }}
        onOk={deleteId !== null ? handleConfirmDeleteSingle : handleConfirmDelete}
        onCancel={() => {
          setIsSecondModalOpen(false);
        }}
      />
    </>
  );
};

export default TableStudent;


// BẢN NÀY CÓ FORMAT DATE CHO INPUT FIELD ĐÚNG CÁCH HƠN
// import React, { useEffect, useState, useMemo, useRef } from 'react';
// import ModalComponent from '../../modal/Modal';
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from 'material-react-table';
// import { IconButton } from '@mui/material';
// import { fetchAllStudent, deleteStudent, createStudent, updateStudent } from './post.api';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
// import { useForm } from 'react-hook-form';

// const formatDateForDisplay = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };


// const TableStudent = () => {
//   const nameInputRef = useRef(null);
//   const descriptionTextRef = useRef(null);
//   const genderInputRef = useRef(null);
//   const birthdayInputRef = useRef(null);
//   const majorInputRef = useRef(null);
//   const classInputRef = useRef(null);

//   const [errorField, setErrorField] = useState('');

//   const [data, setData] = useState([]);
//   const [rowSelection, setRowSelection] = useState({});

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

//   const [editingStudent, setEditingStudent] = useState(null);

//   const [deleteId, setDeleteId] = useState(null);
//   const [deleteName, setDeleteName] = useState(null);

//   const handleDelete = (id, name) => {
//     setDeleteId(id);
//     setDeleteName(name);
//     setIsModalOpen(true);
//   };

//   const handleConfirmDeleteSingle = async () => {
//     if (deleteId === null) {
//       toast.error('No row selected to delete');
//       return;
//     }
//     await deleteStudent(deleteId.toString());
//     setData((prevData) => prevData.filter((row) => row.id !== deleteId));
//     if (rowSelection[deleteId]) {
//       const newRowSelection = Object.keys(rowSelection).reduce((obj, key) => {
//         if (Number(key) !== deleteId) {
//           obj[key] = rowSelection[key];
//         }
//         return obj;
//       }, {});
//       setRowSelection(newRowSelection);
//     }
//     setDeleteId(null);
//     setIsModalOpen(false);
//     toast.success('Delete successfully');
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const response = await fetchAllStudent();
//     const formattedData = response.data.map(student => ({
//       ...student,
//       birthday: formatDateForDisplay(student.birthday)
//     }));
//     setData(formattedData);
//   };

//   const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

//   const handleCreateStudent = async (data) => {
//     try {
//       const response = await createStudent({ ...data });
//       setData(prevData => [...prevData, {
//         ...response.data,
//         birthday: formatDateForDisplay(response.data.birthday)
//       }]);
//       reset();
//       toast.success('Create student successfully');
//     } catch (error) {
//       toast.error(error.message);
//       if (error.field) {
//         setErrorField(error.field);
//         if (error.field === 'name' && nameInputRef.current) {
//           nameInputRef.current?.focus();
//         } else if (error.field === 'description' && descriptionTextRef.current) {
//           descriptionTextRef.current?.focus();
//         } else if (error.field === 'gender' && genderInputRef.current) {
//           genderInputRef.current?.focus();
//         } else if (error.field === 'birthday' && birthdayInputRef.current) {
//           birthdayInputRef.current?.focus();
//         }
//         else if (error.field === 'major' && majorInputRef.current) {
//           majorInputRef.current?.focus();
//         }
//         else if (error.field === 'class' && classInputRef.current) {
//           classInputRef.current?.focus();
//         }
//       }
//     }
//   };

//   const handleEditStudent = (student) => {
//     setEditingStudent(student);
//     setValue('name', student.name);
//     setValue('description', student.description);
//     setValue('gender', student.gender);
//     setValue('birthday', formatDateForInput(student.birthday)); // Format the date for input field
//     setValue('major', student.major);
//     setValue('class', student.class);
//   };

//   const handleUpdateStudent = async (data) => {
//     if (!editingStudent) return;
//     try {
//       const response = await updateStudent(editingStudent.id.toString(), { ...data });
//       const updatedStudent = response.data;
//       setData(prevData => prevData.map(row => row.id === editingStudent.id ? {
//         ...updatedStudent,
//         birthday: formatDateForDisplay(updatedStudent.birthday) // Format the date for display
//       } : row));
//       setEditingStudent(null);
//       reset();
//       toast.success('Update student successfully');
//     } catch (error) {
//       toast.error(error.message);
//       if (error.field) {
//         setErrorField(error.field);
//         if (error.field === 'name' && nameInputRef.current) {
//           nameInputRef.current?.focus();
//         } else if (error.field === 'description' && descriptionTextRef.current) {
//           descriptionTextRef.current?.focus();
//         } else if (error.field === 'gender' && genderInputRef.current) {
//           genderInputRef.current?.focus();
//         } else if (error.field === 'birthday' && birthdayInputRef.current) {
//           birthdayInputRef.current?.focus();
//         } else if (error.field === 'major' && majorInputRef.current) {
//           majorInputRef.current?.focus();
//         } else if (error.field === 'class' && classInputRef.current) {
//           classInputRef.current?.focus();
//         }
//       }
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingStudent(null);
//     reset();
//   };

//   const handleDeleteSelected = () => {
//     const selectedIds = Object.keys(rowSelection).map(Number);
//     if (selectedIds.length === 0) {
//       toast.error('No rows selected');
//       return;
//     }
//     setIsSecondModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     const selectedIds = Object.keys(rowSelection).map(Number);
//     await Promise.all(selectedIds.map(async (id) => await deleteStudent(id.toString())));
//     setData((prevData) => prevData.filter((row) => !selectedIds.includes(row.id)));
//     setRowSelection({});
//     setIsModalOpen(false);
//     setIsSecondModalOpen(false);
//     toast.success('Delete selected successfully');
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'ID',
//         enableColumnActions: false,
//         enableColumnDragging: false,
//         enableColumnFilter: false,
//         enableColumnOrdering: false,
//         enableEditing: false,
//         enableGlobalFilter: false,
//         enableGrouping: false,
//         enableHiding: false,
//         enableResizing: false
//       },
//       {
//         accessorKey: 'name',
//         header: 'Name'
//       },
//       {
//         accessorKey: 'description',
//         header: 'Description'
//       },
//       {
//         accessorKey: 'gender',
//         header: 'Gender'
//       },
//       {
//         accessorKey: 'birthday',
//         header: 'Birthday'
//       },
//       {
//         accessorKey: 'major',
//         header: 'Major'
//       },
//       {
//         accessorKey: 'class',
//         header: 'Class'
//       },
//       {
//         accessorKey: 'actions',
//         header: 'Actions',
//         enableColumnActions: false,
//         enableColumnDragging: false,
//         enableColumnFilter: false,
//         enableColumnOrdering: false,
//         enableEditing: false,
//         enableGlobalFilter: false,
//         enableGrouping: false,
//         enableHiding: false,
//         enableResizing: false,
//         enableSorting: false,
//         Cell: ({ row }) => (
//           <div>
//             <IconButton color="warning" onClick={() => handleEditStudent(row.original)}>
//               <EditIcon />
//             </IconButton>
//             <IconButton color="error" onClick={() => handleDelete(row.original.id, row.original.name)}>
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         )
//       }
//     ],
//     []
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data: data,
//     paginationDisplayMode: 'pages',
//     enableRowSelection: true,
//     initialState: {
//       pagination: { pageSize: 5, pageIndex: 1 },
//       sorting: [{ id: 'id', desc: true }],
//       columnVisibility: { id: false }
//     },
//     positionToolbarAlertBanner: 'top',
//     enableFilterMatchHighlighting: false,
//     getRowId: (row) => row.id.toString(),
//     onRowSelectionChange: setRowSelection,
//     state: { rowSelection },
//     muiSearchTextFieldProps: {
//       label: 'Search All Fields'
//     },
//     renderTopToolbarCustomActions: () => (
//       <div className="flex space-x-4 -ml-0.5">
//         <IconButton onClick={handleDeleteSelected}>
//           <DeleteIcon />
//         </IconButton>
//       </div>
//     ),
//     autoResetPageIndex: false
//   });

//   return (
//     <>
//       <form onSubmit={handleSubmit(editingStudent ? handleUpdateStudent : handleCreateStudent)}>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               {...register('name', {
//                 required: 'Name is required',
//                 maxLength: { value: 50, message: 'Name must be less than 50 characters' }
//               })}
//               placeholder="Enter student name"
//               className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             />
//             {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               {...register('description', {
//                 required: 'Description is required',
//                 maxLength: { value: 200, message: 'Description must be less than 200 characters' }
//               })}
//               placeholder="Enter student description"
//               className={`form-control ${errors.description ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             />
//             {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
//           </div>
//           {/* Add more fields here: gender, birthday, major, class */}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               {...register('gender', {
//                 required: 'Gender is required',
//               })}
//               className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             >
//               <option value="">Select gender</option>
//               <option value="Nam">Nam</option>
//               <option value="Nu">Nữ</option>
//             </select>
//             {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label htmlFor="birthday">Birthday</label>
//             <input
//               type="date"
//               id="birthday"
//               {...register('birthday', {
//                 required: 'Birthday is required',
//               })}
//               className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             />
//             {errors.birthday && <div className="invalid-feedback">{errors.birthday.message}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label htmlFor="major">Major</label>
//             <input
//               id="major"
//               {...register('major', {
//                 required: 'Major is required',
//               })}
//               placeholder="Enter student major"
//               className={`form-control ${errors.major ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             />
//             {errors.major && <div className="invalid-feedback">{errors.major.message}</div>}
//           </div>

//           <div className="col-md-6 mb-3">
//             <label htmlFor="class">Class</label>
//             <input
//               id="class"
//               {...register('class', {
//                 required: 'Class is required',
//               })}
//               placeholder="Enter student class"
//               className={`form-control ${errors.class ? 'is-invalid' : ''}`}
//               onChange={() => setErrorField('')}
//             />
//             {errors.class && <div className="invalid-feedback">{errors.class.message}</div>}
//           </div>
//         </div>

//         <div className="d-flex justify-content-end">
//           <button type="submit" className="btn btn-success">{editingStudent ? 'Update' : 'Create'}</button>
//           {editingStudent && <button type="button" className="btn btn-danger ms-2" onClick={handleCancelEdit}>Cancel</button>}
//         </div>
//       </form>
//       <hr className="my-4" />
//       <MaterialReactTable table={table} />
//       <ModalComponent
//         isOpen={isModalOpen}
//         title="Confirm Delete"
//         description={`Are you sure you want to delete student ${deleteName}?`}
//         onClose={() => {
//           setIsModalOpen(false);
//         }}
//         onOk={handleConfirmDeleteSingle}
//         onCancel={() => {
//           setIsModalOpen(false);
//         }}
//       />
//       <ModalComponent
//         isOpen={isSecondModalOpen}
//         title="Confirm Delete"
//         description={`Are you sure you want to delete ${Object.keys(rowSelection).length} selected students?`}
//         onClose={() => {
//           setIsSecondModalOpen(false);
//         }}
//         onOk={deleteId !== null ? handleConfirmDeleteSingle : handleConfirmDelete}
//         onCancel={() => {
//           setIsSecondModalOpen(false);
//         }}
//       />
//     </>
//   );
// };

// export default TableStudent;
