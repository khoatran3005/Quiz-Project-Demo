import './Register.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../service/apiService';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const [isVisible, setVisible] = useState(false);

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
                <span>Already have an account?</span>
                <button onClick={() => { navigate('/login') }}>Sign Up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Hoi Khoa Dep Trai
            </div>
            <div className='welcome col-4 mx-auto'>
                Get better data with conversational forms, surveys, quizzes & more.
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
                    <label>Username</label>
                    <input
                        type={"username"}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='form-group pass-group'>
                    <label>Password (*)</label>
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
                        Create my new account</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &lt;&lt;Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register;