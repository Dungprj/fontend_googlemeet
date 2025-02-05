import classNames from 'classnames/bind';
import styles from './ListUserMeeting.module.scss';
import TitleTabMeeting from '../TitleTabMeeting';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPaperPlane,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ListUserMeeting() {
    return (
        <div className={cx('wrap')}>
            <TitleTabMeeting title='Tin nhắn cuộc gọi' />
            <div className={cx('container')}>
                <div className={cx('bltitleListUser')}>
                    <p className={cx('titleListUser')}>Cộng tác viên </p>
                    <p className={cx('soLuongUser')}>1</p>
                </div>
                <ul className={cx('bodyTab')}>
                    <li>
                        <div className={cx('blUser')}>
                            <img
                                className={cx('avatar')}
                                src='https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                                alt='user1'
                            />
                            <div className={cx('blName')}>
                                <h5>Nguyen Tien Dung (Bạn)</h5>
                                <p>Người tổ chức cuộc họp</p>
                            </div>
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                            ></FontAwesomeIcon>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ListUserMeeting;
