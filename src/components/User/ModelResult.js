import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next';

const ModelResult = (props) => {
    const { show, setShow, dataModalResult, handleShowAnswer } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('user.result-title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('user.total-q')}<b>{dataModalResult !== undefined ? dataModalResult.countTotal : ''}</b></div>
                    <div>{t('user.correct')}<b>{dataModalResult !== undefined ? dataModalResult.countCorrect : ''}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleClose();
                        props.handleShowAnswer();
                    }}>
                        {t('user.show')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('user.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelResult;