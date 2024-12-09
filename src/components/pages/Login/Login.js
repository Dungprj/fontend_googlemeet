import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

import { LoginApi, testAuthor } from '~/Services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { UserContext } from '~/Context/UserContext';
import React from 'react';

import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
function Login() {
    const { loginContext } = React.useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isHandleLogin, setIsHandleLogin] = useState(true);

    useEffect(() => {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate(config.routes.home);

            return;
        }
    }, []);

    const props = {
        primary: email && password ? true : false,
        disable: email && password && loading === false ? false : true
    };

    const handleLogin = async () => {
        setIsHandleLogin(false);
        let res = await LoginApi(email.trim(), password);

        setLoading(true);

        if (res && res.status === 200) {
            let userId = res.data.userId;
            const { accessToken, refreshToken } = res.data.token;

            Cookies.set('token', accessToken);
            Cookies.set('refreshToken', refreshToken);

            loginContext(email.trim(), res.data.accessToken);

            setTimeout(() => {
                setLoading(false);
                toast.success('Login successful');
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

    const handlePressEnter = async e => {
        if (e && e.code === 'Enter' && isHandleLogin) {
            await handleLogin();
        }
    };

    return (
        <>
            <div className={cx('login-container', 'col-sm-6 col-6')}>
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
                        onKeyDown={e => {
                            handlePressEnter(e);
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
                        <i className='fa-solid fa-angles-left'></i>
                        <Link to={config.routes.home}>Go Back Home</Link>
                    </Button>
                </div>

                <div className={cx('bl_nav_register')}>
                    <Button>
                        You don't have account ?{' '}
                        <Link to={config.routes.register}>
                            <span className={cx('txt_register')}>Register</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Login;
