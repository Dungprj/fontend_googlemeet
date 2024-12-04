import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';

import Menu, { MenuItem } from './Menu';
import Button from '~/components/Button';
import React from 'react';
import {
    HomeIcon,
    UserGroupIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
    Logo,
    UploadIcon
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

    const navigate = useNavigate();

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
                    title='Quản lý user'
                    to={config.routes.managerUser}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />

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
