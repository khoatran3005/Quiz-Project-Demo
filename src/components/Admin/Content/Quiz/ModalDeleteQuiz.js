import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../service/apiService';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataQuizDelete } = props;

    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async() => {
        let data = await deleteQuiz(dataQuizDelete)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
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
                    <Modal.Title>Confirm Delete the User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to deleta this quiz. Quiz<b> id:
                    {dataQuizDelete && dataQuizDelete.id ? dataQuizDelete.id : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;