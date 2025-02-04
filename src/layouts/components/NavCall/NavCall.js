import classNames from 'classnames/bind';
import styles from './NavCall.module.scss';

import Button from '~/components/Button';
import React, { useContext } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import Tab from '~/enums';
const cx = classNames.bind(styles);

function NavCall() {
    // Truy xuất dữ liệu từ MeetingContext
    const { nav, openTab, toggleTabPanel } = useContext(MeetingContext);
    const handleTabDetail = () => {
        openTab(Tab.Detail);
    };
    const handleTabMessage = () => {
        openTab(Tab.Message);
    };

    const handleToggleTabPanel = () => {
        toggleTabPanel();
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <h1>NavCall</h1>

                <Button primary onClick={handleTabDetail}>
                    Open detail
                </Button>

                <Button primary onClick={handleTabMessage}>
                    Open message
                </Button>

                <Button primary onClick={handleToggleTabPanel}>
                    toggle tab
                </Button>
            </div>
        </>
    );
}

export default NavCall;
