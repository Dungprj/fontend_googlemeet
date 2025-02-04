import classNames from 'classnames/bind';
import styles from './MessageMeeting.module.scss';
import TitleTabMeeting from '../TitleTabMeeting';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function MessageMeeting() {
    return (
        <div className={cx('wrap')}>
            <TitleTabMeeting title='Tin nhắn cuộc gọi' />
            <div className={cx('container')}>
                <ul className={cx('listMessage')}>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>{' '}
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>{' '}
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>{' '}
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
                    <li>
                        <span>Hing : xin chào mọi người </span>
                    </li>
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
