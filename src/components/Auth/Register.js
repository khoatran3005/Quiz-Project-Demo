import './Register.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../service/apiService';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Languages from '../Header/Languages';
import { useTranslation, Trans } from 'react-i18next';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const [isVisible, setVisible] = useState(false);

    const { t } = useTranslation();

    const toggle = () => {
        setVisible(!isVisible);
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }

        if (!password) {
            toast.error("Invalid password");
            return;
        }

        //sumbit apis
        let data = await postRegister(email, username, password);
        if (data && data.EC === 0) {
            console.log(data)
            toast.success(data.EM);
            navigate('/login');
        }

        if (data && +data.EC !== 0) {
            console.log(data)
            toast.error(data.EM);
        }
    }

    return (
        <div className="register-container">
            <div className='header'>
                <span>{t('signup.corner')}</span>
                <button onClick={() => { navigate('/login') }}>{t('signup.login')}</button>
                <Languages />
            </div>
            <div className='title col-4 mx-auto'>
                Quiz With Khoa
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('signup.title')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email (*)</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>{t('signup.username')}</label>
                    <input
                        type={"username"}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>{t('signup.password')} (*)</label>
                    <input
                        type={!isVisible ? "password" : "text"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isVisible ?
                        <span className='icon-eye'
                            onClick={() => setVisible(false)}>
                            <AiOutlineEyeInvisible />
                        </span>
                        :
                        <span className='icon-eye'
                            onClick={() => setVisible(true)}>
                            <AiOutlineEye />
                        </span>
                    }
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}>
                        {t('signup.submit')}</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &lt;&lt;{t('signup.back')}</span>
                </div>
            </div>
        </div>
    )
}

export default Register;