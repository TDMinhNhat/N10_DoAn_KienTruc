import React, { useEffect, useState, useMemo, useRef } from 'react';
import ModalComponent from '../../modal/Modal';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { IconButton } from '@mui/material';
import { fetchAllSubject, deleteSubject, createSubject, updateSubject } from './post.api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const TableSubject = () => {
  const nameInputRef = useRef(null);
  const prerequisiteInputRef = useRef(null);
  const typeInputRef = useRef(null);

  const [errorField, setErrorField] = useState('');

  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [editingSubject, setEditingSubject] = useState(null);

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
    await deleteSubject(deleteId.toString());
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
    const response = await fetchAllSubject();
    setData(response.data);
  };

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreateSubject = async (data) => {
    try {
      const response = await createSubject({ ...data });
      setData(prevData => [...prevData, response.data]);
      reset();
      toast.success('Create subject successfully');
    } catch (error) {
      toast.error(error.message);
      if (error.field) {
        setErrorField(error.field);
        if (error.field === 'name' && nameInputRef.current) {
          nameInputRef.current?.focus();
        } else if (error.field === 'prerequisite' && prerequisiteInputRef.current) {
          prerequisiteInputRef.current?.focus();
        } else if (error.field === 'type' && typeInputRef.current) {
          typeInputRef.current?.focus();
        }
      }
    }
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setValue('name', subject.name);
    setValue('prerequisite', subject.prerequisite);
    setValue('type', subject.type);
  };

  const handleUpdateSubject = async (data) => {
    if (!editingSubject) return;
    try {
      const response = await updateSubject(editingSubject.id.toString(), { ...data });
      const updatedSubject = response.data;
      setData(prevData => prevData.map(row => row.id === editingSubject.id ? updatedSubject : row));
      setEditingSubject(null);
      reset();
      toast.success('Update subject successfully');
    } catch (error) {
      toast.error(error.message);
      if (error.field) {
        setErrorField(error.field);
        if (error.field === 'name' && nameInputRef.current) {
          nameInputRef.current?.focus();
        } else if (error.field === 'prerequisite' && prerequisiteInputRef.current) {
          prerequisiteInputRef.current?.focus();
        } else if (error.field === 'type' && typeInputRef.current) {
          typeInputRef.current?.focus();
        }
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingSubject(null);
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
    await Promise.all(selectedIds.map(async (id) => await deleteSubject(id.toString())));
    setData((prevData) => prevData.filter((row) => !selectedIds.includes(row.id)));
    setRowSelection({});
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
    toast.success('Delete selected successfully');
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Mã Môn Học',
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
        header: 'Tên Môn Học'
      },
      {
        accessorKey: 'prerequisite',
        header: 'Học Phần Tiên Quyết'
      },
      {
        accessorKey: 'type',
        header: 'Kiểu'
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
            <IconButton color="warning" onClick={() => handleEditSubject(row.original)}>
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
      <form onSubmit={handleSubmit(editingSubject ? handleUpdateSubject : handleCreateSubject)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name">Tên Môn Học</label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 50, message: 'Name must be less than 50 characters' }
              })}
              placeholder="Enter subject name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="prerequisite">Học Phần Tiên Quyết</label>
            <input id="prerequisite"
              {...register('prerequisite', {
                required: 'Prerequisite is required',
                maxLength: { value: 50, message: 'Prerequisite must be less than 50 characters' }
              })}
              placeholder="Enter prerequisite"
              className={`form-control ${errors.prerequisite ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            />
            {errors.prerequisite && <div className="invalid-feedback">{errors.prerequisite.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="type">Kiểu</label>
            <select id="type"
              {...register('type', {
                required: 'Type is required'
              })}
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
              onChange={() => setErrorField('')}
            >
              <option value="">Chọn kiểu</option>
              <option value="Bắt buộc">Bắt buộc</option>
              <option value="Tự chọn">Tự chọn</option>
            </select>
            {errors.type && <div className="invalid-feedback">{errors.type.message}</div>}
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">{editingSubject ? 'Update' : 'Create'}</button>
          {editingSubject && <button type="button" className="btn btn-danger ms-2" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>
      <hr className="my-4" />
      <MaterialReactTable table={table} />
      <ModalComponent
        isOpen={isModalOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete subject ${deleteName}?`}
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
        description={`Are you sure you want to delete ${Object.keys(rowSelection).length} selected subjects?`}
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

export default TableSubject;
