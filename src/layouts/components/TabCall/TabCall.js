import classNames from 'classnames/bind';
import styles from './TabCall.module.scss';

import React, { useContext } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import DetailMeeting from './components/DetailMeeting/DetailMeeting';
import Tab from '~/enums';
import MessageMeeting from './components/MessageMeeting/MessageMeeting';
const cx = classNames.bind(styles);

function TabCall() {
    const { nav, openTab } = useContext(MeetingContext);

    return (
        <div className={cx('wrapper', { close: !nav.TabPanel })}>
            {nav[Tab.Detail] && <DetailMeeting />}
            {nav[Tab.Message] && <MessageMeeting />}
        </div>
    );
}

export default TabCall;
