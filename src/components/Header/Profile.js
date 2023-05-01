import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postUpdateProfile, postChangePassword, getHistory } from '../../service/apiService';
import _ from 'lodash';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment';

const Profile = (props) => {
    const { show, setShow, account } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setKey('profile');
    }
    const [email, setEmail] = useState('');
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
    const [listHistory, setListHistory] = useState([]);

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email)
            setPassword(account.password);
            setUsername(account.username);
            setRole(account.role);
            setImage(account.image);
            if (account.image) {
                setpreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);

    useEffect(() => {
        fetchHistory();
    }, [])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setpreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
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
        let data = await postChangePassword(password, newPassword)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const fetchHistory = async () => {
        let data = await getHistory();
        if (data && data.EC === 0) {
            let newData = data?.DT?.data.map((item) => {
                return {
                    id: item.id,
                    quiz_id: item.quiz_id,
                    total_questions: item.total_questions,
                    total_correct: item.total_correct,
                    date: moment(item.updatedAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if (newData && newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData);
        }

    }
    console.log('history', listHistory);


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
                    <Modal.Title>{key === 'profile' ? `${t('header.up-profile')}` : key === 'password'? `${t('header.up-pass')}`: `${t('history.title')}`}</Modal.Title>
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
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        disabled
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">{t('m-user.role')}</label>
                                    <select className="form-select" onChange={(event) => setRole(event.target.value)}
                                        value={role} disabled>
                                        <option value="USER">{t('m-user.role-u')}</option>
                                        <option value="ADMIN">{t('m-user.role-a')}</option>
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
                        <Tab eventKey="history" title={t('history.title')}>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">{t('history.name')}</th>
                                        <th scope="col">{t('history.t-ques')}</th>
                                        <th scope="col">{t('history.t-correct')}</th>
                                        <th scope="col">{t('history.date')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listHistory && listHistory.length > 0 &&
                                        listHistory.map((item, index) => {
                                            return (
                                                <tr key={`table-users-${index}`}>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.quiz_id}</td>
                                                    <td>{item.total_questions}</td>
                                                    <td>{item.total_correct}</td>
                                                    <td>{item.date}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {listHistory && listHistory.length === 0 &&
                                        <tr>
                                            <td colSpan={'5'}>{t('m-user.not')}</td>
                                        </tr>}

                                </tbody>
                            </table>
                        </Tab>
                        
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('m-user.close')}
                    </Button>
                    {key === "profile" ?
                        <Button variant="primary" onClick={handleSubmitProfile}>
                            {t('m-user.save')}
                        </Button>
                        :
                        key === "password" 
                        ?
                        <Button variant="primary" onClick={handleSubmitPassword}>
                            {t('m-user.save')}
                        </Button>
                        :
                        ""}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Profile;
