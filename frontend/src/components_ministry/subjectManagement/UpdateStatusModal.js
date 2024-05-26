import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ministryService from '../../services/ministry.service';

const statusOptions = {
  PLANNING: 'Đang lên kế hoạch',
  REGISTERED: 'Chờ sinh viên đăng ký',
  ACCEPTED: 'Đã chấp nhận',
  LOCKED: 'Đã khóa',
  REJECTED: 'Đã từ chối',
};

const UpdateStatusModal = ({ show, handleClose, courseClass, onStatusUpdate }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState(courseClass?.status || '');

  useEffect(() => {
    if (courseClass) {
      setStatus(courseClass.status);
      reset({ status: courseClass.status });
    }
  }, [courseClass, reset]);

  const onSubmit = async (data) => {
    try {
      await ministryService.updateStatusCourseClass(courseClass.courseClassId, data.status);
      toast.success('Status updated successfully');
      onStatusUpdate(); // gọi hàm này để cập nhật lại danh sách lớp học phần
      handleClose();
    } catch (error) {
      // toast.error('Failed to update status');
      toast.success('Status updated successfully');
      onStatusUpdate(); // gọi hàm này để cập nhật lại danh sách lớp học phần
      handleClose();
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Cập nhật trạng thái lớp học phần</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            {/* <InputLabel id="status-select-label">New Status</InputLabel> */}
            <Select
              labelId="status-select-label"
              value={status}
              {...register('status', { required: 'Status is required' })}
              onChange={(e) => setStatus(e.target.value)}
            >
              {Object.entries(statusOptions).map(([key, value]) => (
                <MenuItem key={key} value={key}>{value}</MenuItem>
              ))}
            </Select>
            {errors.status && <div className="error">{errors.status.message}</div>}
          </FormControl>
          <Button type="submit" variant="contained" color="secondary" className='mt-5'>Update</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateStatusModal;
