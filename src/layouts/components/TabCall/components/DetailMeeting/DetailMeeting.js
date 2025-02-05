import classNames from 'classnames/bind';
import styles from './DetailMeeting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TitleTabMeeting from '../TitleTabMeeting';
const cx = classNames.bind(styles);
function DetailMeeting() {
    return (
        <div className={cx('chiTietCuocGoi')}>
            <TitleTabMeeting title='Chi tiết cuộc gọi' />
            <div className={cx('list')}>
                <p>Sao chep lien ket</p>
            </div>
        </div>
    );
}

export default DetailMeeting;
