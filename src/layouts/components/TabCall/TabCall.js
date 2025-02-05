import classNames from 'classnames/bind';
import styles from './TabCall.module.scss';

import React, { useContext } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import DetailMeeting from './components/DetailMeeting/DetailMeeting';
import ListUserMeeting from './components/ListUserMeeting/ListUserMeeting';

import Tab from '~/enums';
import MessageMeeting from './components/MessageMeeting/MessageMeeting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TabCall() {
    const { nav } = useContext(MeetingContext);

    return (
        <div className={cx('wrapper', { close: !nav.TabPanel })}>
            <div className={cx('container')}>
                {nav[Tab.Detail] && <DetailMeeting />}
                {nav[Tab.Message] && <MessageMeeting />}
                {nav[Tab.ListUser] && <ListUserMeeting />}
            </div>
        </div>
    );
}

export default TabCall;
