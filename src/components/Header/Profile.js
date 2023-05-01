import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postUpdateProfile, postChangePassword } from '../../service/apiService';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Profile = (props) => {
    const { show, setShow, account } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setKey('profile');
    }

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setpreviewImage] = useState("");
    const newData = {
        username: username,
        image: image
    }
    const [key, setKey] = useState('profile');

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setPassword(account.password);
            setUsername(account.username);
            setRole(account.role);
            setImage(account.image);
            if (account.image) {
                setpreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setpreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
            console.log('pre', previewImage, 'img', image)
        }
    }

    let fetchUpdate = () => {
        Object.assign(account, newData);
    }

    const handleSubmitProfile = async () => {
        let data = await postUpdateProfile(username, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            fetchUpdate();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const handleSubmitPassword = async () => {
        let data = await postChangePassword (password , newPassword)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
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
                    <Modal.Title>{key === 'profile'?`${t('header.up-profile')}` : `${t('header.up-pass')}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title={t('header.profile')}>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">{t('m-user.username')}</label>
                                    <input type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                    />
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
                        </Tab>
                        <Tab eventKey="password" title={t('login.password')}>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">{t('header.current-p')}</label>
                                    <input type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('header.new-p')}</label>
                                    <input type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>
                            </form>
                        </Tab>
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('m-user.close')}
                    </Button>
                    <Button variant="primary" onClick={handleSubmitPassword}>
                        {t('m-user.save')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profile;
