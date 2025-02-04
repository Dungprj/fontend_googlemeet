import classNames from 'classnames/bind';
import styles from './CallGroup.module.scss';

import React, { useContext, useState } from 'react';
import { MeetingContext } from '~/Context/MeetingContext';
const cx = classNames.bind(styles);

function CallGroup() {
    const { nav } = useContext(MeetingContext);

    return (
        <div className={cx('wrapper', { close: !nav.TabPanel })}>
            <div
                className={cx(
                    'videos',
                    { maxVideo: !nav.TabPanel },
                    { miniVideo: nav.TabPanel }
                )}
            >
                <iframe
                    width={'100%'}
                    height='100%'
                    src='https://www.youtube.com/embed/7FWQWaLsSuE?si=9BgV2f1jfy6j0MGS'
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerpolicy='strict-origin-when-cross-origin'
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    );
}

export default CallGroup;
