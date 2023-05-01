import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../service/apiService';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';


const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;
    const { t } = useTranslation();
    
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async() => {
        let data = await deleteUser(dataDelete)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error("The email is already exis");
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('m-user.title-d')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('m-user.confirm')} <b>Email: 
                    {dataDelete && dataDelete.email ? dataDelete.email : " "}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('m-user.cancel')}
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                    {t('m-user.confirm-b')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;