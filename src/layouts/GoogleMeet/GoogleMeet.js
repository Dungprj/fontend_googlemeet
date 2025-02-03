import CallGroup from '../components/CallGroup';
import NavCall from '../components/NavCall';
import classNames from 'classnames/bind';
import styles from './GoogleMeet.module.scss';
const cx = classNames.bind(styles);
function GoogleMeet({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <CallGroup />
                <div className='tab-content'>{children}</div>
            </div>
            <NavCall />
        </>
    );
}

export default GoogleMeet;
