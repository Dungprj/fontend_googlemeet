import classNames from 'classnames/bind';
import styles from './MessageMeeting.module.scss';
import TitleTabMeeting from '../TitleTabMeeting';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CallContext } from '~/Context/CallContext/CallContextfix';

const cx = classNames.bind(styles);
function MessageMeeting() {
    const {
        peerId,
        meetingId,
        setMeetingId,
        createMeeting,
        joinMeeting,
        leaveMeeting,
        videoContainerRef,
        localStreamRef,
        callParticipants
    } = useContext(CallContext);
    return (
        <div className={cx('wrap')}>
            <TitleTabMeeting title='Tin nhắn cuộc gọi' />
            <div className={cx('container')}>
                <ul className={cx('listMessage')}>
                    <li>
                        <span>peerId : {peerId} </span>
                    </li>
                    <li>
                        <span>Meeting Id : {meetingId} </span>
                    </li>
                    {callParticipants.map(obj => {
                        return <li key={obj}>peerId : {obj} </li>;
                    })}
                </ul>
                <div className={cx('blSendMessage')}>
                    <input className={cx('inpTinNhan', 'form-control')}></input>
                    <button className={cx('btnSend')}>
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessageMeeting;
