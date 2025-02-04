import classNames from 'classnames/bind';
import styles from './TitleTabMeeting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function TitleTabMeeting({ title = '' }) {
    const { nav, closeTabPanel } = useContext(MeetingContext);
    const handleToggleTabPanel = () => {
        closeTabPanel();
    };
    return (
        <div className={cx('titleMeeting')}>
            <div className={cx('container')}>
                <h5>{title}</h5>
                <FontAwesomeIcon
                    className={cx('icon-exit')}
                    icon={faXmark}
                    onClick={closeTabPanel}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
}

export default TitleTabMeeting;
