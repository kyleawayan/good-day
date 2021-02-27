import React from 'react';
import Modal from 'react-modal';

type ModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalComponent({
  isOpen,
  onClose,
  children,
}: ModalComponentProps) {
  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          backgroundColor: 'rgb(51, 51, 53)',
          border: 0,
          top: '50px',
          left: '50px',
          right: '50px',
          bottom: '50px',
        },
      }}
    >
      {children}
    </Modal>
  );
}
