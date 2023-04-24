import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModelResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);

    console.log('adc',dataModalResult)  
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: <b>{dataModalResult !== undefined? dataModalResult.countTotal : ''}</b></div>
                    <div>Total Correct Answers: <b>{dataModalResult !== undefined? dataModalResult.countCorrect: ''}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show Answer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelResult;