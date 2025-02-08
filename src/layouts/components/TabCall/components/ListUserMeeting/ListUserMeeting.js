import classNames from 'classnames/bind';
import styles from './ListUserMeeting.module.scss';
import TitleTabMeeting from '../TitleTabMeeting';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CallContext } from '~/Context/CallContext/CallContextfix';
import {
    faPaperPlane,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ListUserMeeting() {
    const { callParticipants, peerId } = useContext(CallContext);

    return (
        <div className={cx('wrap')}>
            <TitleTabMeeting title='Tin nhắn cuộc gọi' />
            <div className={cx('container')}>
                <div className={cx('bltitleListUser')}>
                    <p className={cx('titleListUser')}>Cộng tác viên </p>
                    <p className={cx('soLuongUser')}>
                        {callParticipants.length}
                    </p>
                </div>
                <ul className={cx('bodyTab')}>
                    {callParticipants.map(obj => {
                        return (
                            <li className={cx({ you: obj === peerId })}>
                                <div className={cx('blUser')}>
                                    <div className={cx('blInfo')}>
                                        <img
                                            className={cx('avatar')}
                                            src='https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                                            alt='user1'
                                        />
                                        <div className={cx('blName')}>
                                            <h5>
                                                {obj == peerId ? 'Bạn' : obj}
                                            </h5>
                                            <p>Người tham dự</p>
                                        </div>
                                    </div>
                                    <FontAwesomeIcon
                                        className={cx('btnOption')}
                                        icon={faEllipsisVertical}
                                    ></FontAwesomeIcon>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ListUserMeeting;
