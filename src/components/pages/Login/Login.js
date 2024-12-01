import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

import { LoginApi } from '~/Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            navigate(config.routes.home);
            return;
        }
    }, []);

    const props = {
        primary: email && password ? true : false,
        disable: email && password && loading === false ? false : true
    };

    const handleLogin = async () => {
        let res = await LoginApi(email, password);

        setLoading(true);

        if (res && res.token) {
            setTimeout(() => {
                setLoading(false);
                toast.success('Login successful');
                localStorage.setItem('token', res.token);
                navigate(config.routes.home);
            }, 2000);
        } else {
            if (res && res.status === 400) {
                setTimeout(() => {
                    setLoading(false);
                    toast.error(res.data.error);
                }, 2000);
            }
        }
    };

    return (
        <>
            <div className={cx('login-container', 'col-6')}>
                <div className={cx('title')}>Login</div>
                <div className={cx('')}>Email or username</div>
                <input
                    value={email}
                    className={cx('inpUsername')}
                    type='text'
                    placeholder='Email or username'
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <div className={cx('container-password')}>
                    <input
                        value={password}
                        className={cx('inpPassword')}
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder='Password'
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <span className={cx('isshowicon')}>
                        {isShowPassword ? (
                            <i
                                onClick={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                                className='fa-solid fa-eye'
                            ></i>
                        ) : (
                            <i
                                onClick={() => {
                                    setIsShowPassword(!isShowPassword);
                                }}
                                className='fa-solid fa-eye-slash'
                            ></i>
                        )}
                    </span>
                </div>
                <Button
                    onClick={() => {
                        handleLogin();
                    }}
                    className={cx('btn-login')}
                    {...props}
                >
                    {loading && (
                        <i className={cx('loading', 'fas fa-sync fa-spin')}></i>
                    )}
                    Login
                </Button>

                <div>
                    <Button>
                        <i className='fa-solid fa-angles-left'></i> Go Back
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Login;
