import classNames from 'classnames/bind';
import styles from './NavCall.module.scss';

import React from 'react';

const cx = classNames.bind(styles);

function NavCall() {
    <>
        <div className={cx('wrapper')}>
            <h1>Nav Call</h1>
            {/* <CallGroupItem /> */}
        </div>
    </>;
}

export default NavCall;
