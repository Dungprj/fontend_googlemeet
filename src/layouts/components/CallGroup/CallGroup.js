import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';

import React from 'react';

const cx = classNames.bind(styles);

function CallGroup() {
    return (
        <div className={cx('wrapper')}>
            <h1>Call Group</h1>
        </div>
    );
}

export default CallGroup;
