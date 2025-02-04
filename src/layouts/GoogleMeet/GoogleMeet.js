import CallGroup from '../components/CallGroup';
import NavCall from '../components/NavCall';
import classNames from 'classnames/bind';
import styles from './GoogleMeet.module.scss';
const cx = classNames.bind(styles);
function GoogleMeet({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <CallGroup className={cx('call-group')} />
                <div className={cx('tab-content')}>{children}</div>
            </div>
            <NavCall className={cx('navCall')} />
        </div>
    );
}

export default GoogleMeet;
