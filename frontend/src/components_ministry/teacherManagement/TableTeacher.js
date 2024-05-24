import React, { useEffect, useState, useMemo, useRef } from 'react';
import ModalComponent from '../../modal/Modal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { IconButton } from '@mui/material';
import { fetchAllTeacher, deleteTeacher, createTeacher, updateTeacher } from './post.api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const TableTeacher = () => {
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

  const [editingTeacher, setEditingTeacher] = useState(null);

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
    await deleteTeacher(deleteId.toString());
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
    const response = await fetchAllTeacher();
    setData(response.data);
  };

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreateTeacher = async (data) => {
    try {
      const response = await createTeacher({ ...data });
      setData(prevData => [...prevData, response.data]);
      reset();
      toast.success('Create teacher successfully');
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

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setValue('name', teacher.name);
    setValue('gender', teacher.gender);
    setValue('birthday', formatDateForInput(teacher.birthday)); // Format the date
    setValue('major', teacher.major);
    setValue('class', teacher.class);
  };

  const handleUpdateTeacher = async (data) => {
    if (!editingTeacher) return;
    try {
      const response = await updateTeacher(editingTeacher.id.toString(), { ...data });
      const updatedTeacher = response.data;
      setData(prevData => prevData.map(row => row.id === editingTeacher.id ? updatedTeacher : row));
      setEditingTeacher(null);
      reset();
      toast.success('Update teacher successfully');
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
    setEditingTeacher(null);
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
    await Promise.all(selectedIds.map(async (id) => await deleteTeacher(id.toString())));
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
        header: 'MSGV',
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
        header: 'Chuyên Ngành Dạy'
      },
      {
        accessorKey: 'class',
        header: 'Lớp Chủ Nhiệm'
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
            <IconButton color="warning" onClick={() => handleEditTeacher(row.original)}>
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
      <form onSubmit={handleSubmit(editingTeacher ? handleUpdateTeacher : handleCreateTeacher)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">Họ Tên</label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 50, message: 'Name must be less than 50 characters' }
              })}
              placeholder="Enter teacher name"
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
            <label htmlFor="major">Chuyên Ngành Dạy</label>
            <input
              id="major"
              {...register('major', {
                required: 'Major is required',
              })}
              placeholder="Enter teacher major"
              className={`form-control ${errors.major ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.major && <div className="invalid-feedback">{errors.major.message}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="class">Lớp Chủ Nhiệm</label>
            <input
              id="class"
              {...register('class', {
                required: 'Class is required',
              })}
              placeholder="Enter teacher class"
              className={`form-control ${errors.class ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.class && <div className="invalid-feedback">{errors.class.message}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">{editingTeacher ? 'Update' : 'Create'}</button>
          {editingTeacher && <button type="button" className="btn btn-danger ms-2" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>
      <hr className="my-4" />
      <MaterialReactTable table={table} />
      <ModalComponent
        isOpen={isModalOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete teacher ${deleteName}?`}
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
        description={`Are you sure you want to delete ${Object.keys(rowSelection).length} selected teachers?`}
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

export default TableTeacher;
