import React from 'react'
import Modal from '@mui/material/Modal'
import './Modal.css'
import Close from '@mui/icons-material/Close'

const ModalComponent = ({
  isOpen,
  title,
  description,
  onClose,
  onOk,
  onCancel,
  cancelText = 'Cancel',
  okText = 'OK',
  children,
}) => {
  return (
    <Modal open={isOpen}>
      <div className="modal-container">
        <div className="modal-children">
          <div className="close-button" onClick={onClose}>
            <Close />
          </div>
          <div className="modal-title">{title}</div>
          <div className="modal-description">{description}</div>
          <div className="modal-description">{children}</div>
          <div>
            <button className="ok-button" onClick={onOk}>{okText}</button>
          </div>
          <div>
            <button className="cancel-button" onClick={onCancel}>
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalComponent
