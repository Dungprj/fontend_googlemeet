import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import Button from '~/components/Button';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
    Logo,
    UploadIcon,
    GPTIcon
} from '~/components/Icons';
import SuggestedAcoutnts from '~/components/SuggestedAcoutnts';
import Search from '~/layouts/components/Search/Search';
import { UserContext } from '~/Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function SideBar() {
    const { user, logout } = React.useContext(UserContext);
    const currentUser = user && user.auth;

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('roles') && Cookies.get('roles') !== undefined) {
            let roles_list = JSON.parse(Cookies.get('roles'));

            setRoles(roles_list);
        } else {
        }
    }, []);

    const handleLogout = () => {
        const tokenCurrent = localStorage.getItem('token');

        if (tokenCurrent) {
            logout();
            toast.success('Logout was successful');
            navigate(config.routes.login);
        }
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    className={cx('logo')}
                    to={config.routes.home}
                    icon={<Logo />}
                    activeIcon={<Logo />}
                />
                <Search className={cx('search')} />

                <MenuItem
                    title='For your'
                    to={config.routes.foryou}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />

                <MenuItem
                    title='Following'
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />

                <MenuItem
                    title='LIVE'
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />

                <MenuItem
                    title='Upload'
                    to={config.routes.upload}
                    icon={<UploadIcon />}
                    activeIcon={<UploadIcon />}
                />
                <MenuItem
                    title='GPT'
                    to={config.routes.gpt}
                    icon={<GPTIcon />}
                    activeIcon={<GPTIcon />}
                />
                <MenuItem
                    title='API Checker'
                    to={config.routes.check}
                    icon={<GPTIcon />}
                    activeIcon={<GPTIcon />}
                />

                <MenuItem
                    title='Call'
                    to={config.routes.call}
                    icon={<GPTIcon />}
                    activeIcon={<GPTIcon />}
                />
                {roles.includes('f056236f-2444-48a2-bcb8-7ca47e009744') && (
                    <>
                        <MenuItem
                            title='Quản lý user'
                            to={config.routes.managerUser}
                            icon={<LiveIcon />}
                            activeIcon={<LiveActiveIcon />}
                        />
                        <MenuItem
                            title='Quản lý video'
                            to={config.routes.managerVideo}
                            icon={<LiveIcon />}
                            activeIcon={<LiveActiveIcon />}
                        />
                    </>
                )}

                {!currentUser ? (
                    <Button primary to={config.routes.login}>
                        Đăng nhập
                    </Button>
                ) : (
                    <Button
                        primary
                        to={config.routes.login}
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Đăng suất
                    </Button>
                )}

                {/* them action */}
            </Menu>

            <SuggestedAcoutnts label={'Suggested accounts'} />

            {/* <SuggestedAcoutnts label={'Following accounts'} /> */}
        </aside>
    );
}

export default SideBar;
