import classNames from 'classnames/bind';
import styles from './HeaderGoogle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCommentDots,
    faGear,
    faBraille
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function HeaderGoogle() {
    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('container')}>
                    <div className={cx('header_left')}>
                        <div className={cx('header_logo')}>
                            <img src={images.logoGoogle} alt='Google Meet' />{' '}
                            <Button text className={cx('btnLogoMeet')}>
                                <h4 className={cx('txtMeet')}>Meet</h4>
                            </Button>
                        </div>
                    </div>

                    <div className={cx('header_right')}>
                        <div className={cx('header_rightsub-left')}>
                            <div>21:02</div>
                            <div>CN , 2 thg 2</div>
                        </div>
                        <div className={cx('header_rightsub-center')}>
                            <FontAwesomeIcon
                                className={cx('hotro')}
                                icon={faCircleQuestion}
                            ></FontAwesomeIcon>
                            <FontAwesomeIcon
                                className={cx('baocao')}
                                icon={faCommentDots}
                            ></FontAwesomeIcon>
                            <FontAwesomeIcon
                                className={cx('caidat')}
                                icon={faGear}
                            ></FontAwesomeIcon>
                        </div>
                        <div className={cx('header_rightsub_right')}>
                            <FontAwesomeIcon
                                className={cx('ungdung')}
                                icon={faBraille}
                            ></FontAwesomeIcon>

                            <Image
                                className={cx('avatar')}
                                src={images.avata}
                                alt='avata'
                                circle
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderGoogle;
