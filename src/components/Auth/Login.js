import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../service/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
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
        let data = await postLogin(email, password);
        // dispatch({})
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            navigate('/');
        }

        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/register') }}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Hoi Khoa Dep Trai
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email </label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span>Forgot password</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}>
                        Login to Hoi Khoa Dep Trai</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &lt;&lt;Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;