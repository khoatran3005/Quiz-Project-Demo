import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../service/apiService'
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next';

const ModalEditQuiz = (props) => {
    const { show, setShow, dataQuizUpdate } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setType('EASY');
        setImage('');
        setpreviewImage("");
        props.resetUpdateQuiz();
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState('');
    const [previewImage, setpreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataQuizUpdate)) {
            setName(dataQuizUpdate.name);
            setDescription(dataQuizUpdate.description);
            setType(dataQuizUpdate.difficulty);
            setImage('');
            if (dataQuizUpdate.image) {
                setpreviewImage(`data:image/jpeg;base64,${dataQuizUpdate.image}`);
            }
        }
    }, [dataQuizUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setpreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }

        let res = await putUpdateQuiz(dataQuizUpdate.id, description, name, type, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setType('');
            setImage(null);
            props.fetchQuiz();
            handleClose();
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal-quiz.up-title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('quiz.des')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('quiz.type-t')}</label>
                            <select className="form-select" onChange={(event) => { setType(event.target.value) }}
                                value={type} >
                                <option value="EASY">{t('quiz.type-e')}</option>
                                <option value="MEDIUM">{t('quiz.type-m')}</option>
                                <option value="HARD">{t('quiz.type-h')}</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labaluploadfile'><FcPlus /> {t('m-user.upload')}</label>
                            <input type='file'
                                id='labaluploadfile'
                                hidden
                                onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className='col-md-12 image-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('m-user.preview')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('m-user.close')}
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
                        {t('m-user.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditQuiz;
