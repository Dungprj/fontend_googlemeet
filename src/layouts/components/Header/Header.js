import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/';

import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import 'tippy.js/dist/tippy.css';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';

import Image from '~/components/Image';
import Search from '~/layouts/components/Search';

import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
import { UserContext } from '~/Context/UserContext';
import React from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard shortcuts'
    }
];

function Header() {
    const { user } = React.useContext(UserContext);
    const currentUser = user && user.auth;

    console.log('trang thai', currentUser);
    //handle logic
    const handleMenuChange = menuItem => {
        console.log(menuItem);
        switch (menuItem.type) {
            case 'language':
                // handle language change
                break;
            default:
            // handle other menu items
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
            title: 'View Profile',
            to: '/@Hoaa'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
            title: 'Get coins',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
            title: 'Settings',
            to: '/settings'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
            title: 'Log out',
            separate: true
        }
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt='Tiktok' />
                </Link>

                {/* search */}
                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                delay={[0, 200]}
                                content='Upload video'
                                placement='bottom'
                            >
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>

                            <Tippy
                                delay={[0, 50]}
                                content='Message'
                                placement='bottom'
                            >
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy
                                delay={[0, 50]}
                                content='Inbox'
                                placement='bottom'
                            >
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text disable>
                                Upload
                            </Button>
                            <Button href={config.routes.login} primary>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu
                        items={true ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                src='https3://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/118441977edc639baf728fd892d500b3.jpeg?lk3s=30310797&nonce=42516&refresh_token=8306b6b91df86d67a4bd001a9691712c&x-expires=1731826800&x-signature=aPtt2kKHZlewoulXiEcTPJBZKa8%3D&shp=30310797&shcp=-'
                                className={cx('user-avatar')}
                                alt='Nguyen Van A'
                                // fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                            />
                        ) : (
                            <>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                    />
                                </button>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
