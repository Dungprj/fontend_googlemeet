import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Image from '~/components/Image';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image
                    className={cx('avatar')}
                    src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/9ee2755ca02dde979b49eeda51d66687.jpeg?lk3s=a5d48078&nonce=83095&refresh_token=d1b65720aa8eecee9a5ea3966a5028a3&x-expires=1732719600&x-signature=rUJpvnRvQk4cOzkqhaxnVrFUBUY%3D&shp=a5d48078&shcp=81f88b70'
                    alt=''
                />
                <Button className={cx('follow-btn')} primary small>
                    Follow
                </Button>
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>Quocnguyenphu</strong>
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                </p>
                <p className={cx('name')}>Quoc nguyen phu</p>
            </div>
            <p className={cx('analytics')}>
                <strong className={cx('value')}>8.2M </strong>

                <span className={cx('label')}>Followers</span>

                <strong className={cx('value')}>8.2M </strong>

                <span className={cx('label')}>Followers</span>
            </p>
        </div>
    );
}

export default AccountPreview;
