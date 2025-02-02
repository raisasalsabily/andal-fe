import React, { useState } from 'react';
import InputChildUname from '../components/connect/InputChildUname';
import InputConnectCode from '../components/connect/InputConnectCode';
import ShowConnectCodeModal from '../components/connect/ShowConnectCodeModal';
import BasicModal from '../components/modals/BasicModal';
import RedConfirmModal from '../components/modals/RedConfirmModal';

function PopUpTrial() {
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [isInputCodeModalOpen, setIsInputCodeModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const toggleConnectModal = () => {
    setConnectModalOpen(!isConnectModalOpen);
  };
  const toggleCodeModal = () => {
    setCodeModalOpen(!isCodeModalOpen);
  };
  const toggleInputCodeModal = () => {
    setIsInputCodeModalOpen(!isInputCodeModalOpen);
  };

  const toggleDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(!isDeleteConfirmModalOpen);
  };

  return (
    <div>
      <button className="bg-violet-300 w-36" onClick={toggleConnectModal}>
        open input child uname
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleCodeModal}>
        open show connect code
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleInputCodeModal}>
        open input connect code
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleDeleteConfirmModal}>
        delete confirm
      </button>

      {isConnectModalOpen && <InputChildUname toggleModal={toggleConnectModal} />}

      {/* <InputConnectCode /> */}

      {isInputCodeModalOpen && <InputConnectCode toggleModal={toggleInputCodeModal} />}

      {isCodeModalOpen && <ShowConnectCodeModal toggleModal={toggleCodeModal} />}

      {isDeleteConfirmModalOpen && (
        <RedConfirmModal
          title="Apakah Anda yakin ingin menghapus data?"
          detail="Data akan dihapus secara permanen"
          toggleModal={toggleDeleteConfirmModal}
        />
      )}
    </div>
  );
}

export default PopUpTrial;
